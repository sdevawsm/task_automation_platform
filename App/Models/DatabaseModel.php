<?php

namespace App\Models;

class DatabaseModel extends BaseModel
{
    private $tableName; // Nome da tabela a ser manipulada
    private $queryParts = []; // Partes da query para construção dinâmica

    /**
     * Define a tabela a ser manipulada.
     *
     * @param string $tableName Nome da tabela.
     * @return self
     */
    public function table($tableName)
    {
        if (!preg_match('/^[a-zA-Z0-9_]+$/', $tableName)) {
            throw new \Exception("Nome da tabela inválido: $tableName");
        }

        $this->tableName = $tableName;
        $this->queryParts = []; // Reseta os filtros da query
        return $this;
    }

    /**
     * Adiciona condições dinâmicas à query.
     *
     * @param string $key Nome da coluna.
     * @param string $operator Operador lógico (=, <>, etc.).
     * @param mixed $value Valor da condição.
     * @return self
     */
    public function where($key, $operator, $value)
    {
        $this->queryParts['where'][] = [
            'key' => $key,
            'operator' => $operator,
            'value' => $value,
        ];
        return $this; // Permite encadeamento
    }

    /**
     * Adiciona uma cláusula ORDER BY.
     *
     * @param string $column Nome da coluna.
     * @param string $direction Direção (ASC ou DESC).
     * @return self
     */
    public function orderBy($column, $direction = 'ASC')
    {
        $this->queryParts['order_by'][] = "{$column} {$direction}";
        return $this;
    }

    /**
     * Define um limite para os registros retornados.
     *
     * @param int $number Número de registros.
     * @return self
     */
    public function limit($number)
    {
        $this->queryParts['limit'] = $number;
        return $this;
    }

    /**
     * Adiciona deslocamento para os registros retornados.
     *
     * @param int $number Número de registros a pular.
     * @return self
     */
    public function offset($number)
    {
        $this->queryParts['offset'] = $number;
        return $this;
    }

    /**
     * Constrói os parâmetros das condições dinâmicas.
     *
     * @return array
     */
    private function buildParams()
    {
        $params = [];
        if (!empty($this->queryParts['where'])) {
            foreach ($this->queryParts['where'] as $condition) {
                $params[$condition['key']] = $condition['value'];
            }
        }
        return $params;
    }

    /**
     * Executa uma consulta dinâmica e retorna os registros.
     *
     * @return Collection
     */
    public function get()
    {
        try {
            $this->validateTable();

            $query = "SELECT * FROM {$this->tableName}";
            $params = $this->buildParams();

            // Adiciona condições WHERE
            if (!empty($this->queryParts['where'])) {
                $whereClauses = [];
                foreach ($this->queryParts['where'] as $condition) {
                    $whereClauses[] = "{$condition['key']} {$condition['operator']} :{$condition['key']}";
                }
                $query .= " WHERE " . implode(' AND ', $whereClauses);
            }

            // Adiciona ORDER BY, LIMIT e OFFSET
            if (!empty($this->queryParts['order_by'])) {
                $query .= " ORDER BY " . implode(', ', $this->queryParts['order_by']);
            }
            if (!empty($this->queryParts['limit'])) {
                $query .= " LIMIT " . $this->queryParts['limit'];
            }
            if (!empty($this->queryParts['offset'])) {
                $query .= " OFFSET " . $this->queryParts['offset'];
            }

            $result = $this->query($query, $params);
            $data = $result->fetchAll(\PDO::FETCH_ASSOC);

            return new Collection($data);
        } catch (\Exception $e) {
            error_log("Erro no método 'get': " . $e->getMessage(), 0);
            return new Collection([]);
        }
    }

    /**
     * Retorna o primeiro registro encontrado.
     *
     * @return array|null
     */
    public function first()
    {
        return $this->limit(1)->get()->get(0);
    }

    /**
     * Lança uma exceção se o registro não for encontrado.
     *
     * @return array
     * @throws \Exception
     */
    public function firstOrFail()
    {
        $result = $this->first();
        if (!$result) {
            throw new \Exception("Registro não encontrado.");
        }
        return $result;
    }

    /**
     * Retorna o último registro baseado na ordenação atual.
     *
     * @return array|null
     */
    public function last()
    {
        return $this->orderBy('id', 'DESC')->first();
    }

    /**
     * Conta o número de registros baseados nos filtros atuais.
     *
     * @return int
     */
    public function count()
    {
        try {
            $this->validateTable();

            $query = "SELECT COUNT(*) as total FROM {$this->tableName}";
            $params = $this->buildParams();

            // Adiciona condições WHERE
            if (!empty($this->queryParts['where'])) {
                $whereClauses = [];
                foreach ($this->queryParts['where'] as $condition) {
                    $whereClauses[] = "{$condition['key']} {$condition['operator']} :{$condition['key']}";
                }
                $query .= " WHERE " . implode(' AND ', $whereClauses);
            }

            $result = $this->query($query, $params);
            $data = $result->fetch(\PDO::FETCH_ASSOC);

            return $data['total'] ?? 0;
        } catch (\Exception $e) {
            error_log("Erro no método 'count': " . $e->getMessage(), 0);
            return 0;
        }
    }

    /**
     * Valida se uma tabela foi definida.
     *
     * @throws \Exception
     */
    private function validateTable()
    {
        if (!$this->tableName) {
            throw new \Exception("Nenhuma tabela foi definida. Use o método 'table' primeiro.");
        }
    }
}




    // Classe Collection personalizada
    class Collection
{
    private $items;

    public function __construct(array $items)
    {
        $this->items = $items;
    }

    // Método para acessar todos os itens
    public function all()
    {
        return $this->items;
    }

    // Método para buscar itens por índice (opcional)
    public function get($index)
    {
        return $this->items[$index] ?? null;
    }

    // Método para contar os itens
    public function count()
    {
        return count($this->items);
    }

    // Método para transformar os itens (exemplo com função de callback)
    public function map(callable $callback)
    {
        return new Collection(array_map($callback, $this->items));
    }

    // Método para filtrar itens baseado em condições (similar ao where do Laravel)
    public function where($key, $operator, $value)
    {
        $filtered = array_filter($this->items, function ($item) use ($key, $operator, $value) {
            if (!isset($item[$key])) {
                return false;
            }

            // Avalia o operador
            switch ($operator) {
                case '=':
                    return $item[$key] === $value;
                case '!=':
                    return $item[$key] !== $value;
                case '>':
                    return $item[$key] > $value;
                case '<':
                    return $item[$key] < $value;
                case '>=':
                    return $item[$key] >= $value;
                case '<=':
                    return $item[$key] <= $value;
                default:
                    return false;
            }
        });

        return new Collection($filtered);
    }

    // Método para filtrar por cláusulas mais complexas
    public function whereCallback(callable $callback)
    {
        $filtered = array_filter($this->items, $callback);

        return new Collection($filtered);
    }

    // Método para converter os itens da coleção para array
    public function toArray()
    {
        return $this->items;
    }

    // Método para converter os itens da coleção para JSON
    public function toJson()
    {
        return json_encode($this->items, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
    }

    // Método pluck (similar ao Laravel)
    public function pluck($column, $key = null)
    {
        if ($key) {
            return new Collection(array_column($this->items, $column, $key));
        }

        return new Collection(array_column($this->items, $column));
    }
}



?>
