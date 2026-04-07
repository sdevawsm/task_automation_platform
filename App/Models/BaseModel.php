<?php

namespace App\Models;

class BaseModel
{
    protected $pdo; // Instância do objeto PDO
    protected $flag = false;

    private $db_primary = [];
    private $db_terciary = [];
    private $db_docker = [];


    public function __construct()
    {
        $this->db_primary = [
            "host" => getenv('DB_HOST') ?: 'localhost',
            "name" => getenv('DB_NAME') ?: 'sdev_app',
            "user" => getenv('DB_USER') ?: 'root',
            "password" => getenv('DB_PASSWORD') ?: '',
        ];

        $this->db_terciary = [
            "host" => getenv('DB_HOST_THIRD') ?: 'sql113.infinityfree.com',
            "name" => getenv('DB_NAME_THIRD') ?: 'sdev_app',
            "user" => getenv('DB_USER_THIRD') ?: 'user',
            "password" => getenv('DB_PASSWORD_THIRD') ?: '',
        ];

        $this->db_docker = [
            "host" => getenv('DB_HOST_DOCKER') ?: 'mariadb',
            "name" => getenv('DB_NAME_DOCKER') ?: 'response_builder',
            "user" => getenv('DB_USER_DOCKER') ?: 'root',
            "password" => getenv('DB_PASSWORD_DOCKER') ?: '',
        ];

        // Detecta se está rodando no Docker
        if ($this->isRunningInDocker()) {
            $this->db_primary = $this->db_docker;
        } else {
            // Usa o método herdado da classe BaseModel
            if ($this->getCleanedHost() === 'localhost') {
                $this->flag = true;
            }

            if (!$this->flag) {
                $this->db_primary = $this->db_terciary;
            }
        }

        try {
            $host = $this->db_primary['host'];
            $name = $this->db_primary['name'];
            $dsn = 'mysql:host=' . $host . ';dbname=' . $name . ';charset=utf8mb4';
            $this->pdo = new \PDO($dsn, $this->db_primary["user"], $this->db_primary["password"]);
            $this->pdo->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
        } catch (\PDOException $Exception) {
            error_log("Erro ao conectar ao banco: " . $Exception->getMessage(), 0);
        }
    }

    /**
     * Verifica se a aplicação está rodando dentro de um container Docker.
     *
     * @return bool True se estiver rodando no Docker, false caso contrário.
     */
    private function isRunningInDocker()
    {
        // Verifica se existe o arquivo .dockerenv (indicador padrão do Docker)
        if (file_exists('/.dockerenv')) {
            return true;
        }

        // Verifica se está definida a variável de ambiente DB_HOST (definida no docker-compose)
        if (getenv('DB_HOST') !== false) {
            return true;
        }

        // Verifica se o hostname contém "docker" ou se está em uma rede Docker
        $hostname = gethostname();
        if (strpos($hostname, 'docker') !== false || strpos($hostname, 'container') !== false) {
            return true;
        }

        return false;
    }

    /**
     * Obtém o host limpo (sem porta) a partir de $_SERVER['HTTP_HOST'].
     *
     * @return string O nome do host principal.
     */
    public function getCleanedHost()
    {
        $host = $_SERVER['HTTP_HOST'];

        // Remove a porta, se existir
        $host = preg_replace('/:\d+$/', '', $host);

        // Obter o nome principal do host
        $mainHost = $this->getMainHost($host);

        return $mainHost;
    }

    /**
     * Extrai o nome principal do host (exclui subdomínios e TLD, exceto 'localhost').
     *
     * @param string $host O nome do host completo.
     * @return string O nome principal do host.
     */
    public function getMainHost($host)
    {
        if ($host === 'localhost') {
            return $host;
        }

        $hostParts = explode('.', $host);
        $numParts = count($hostParts);

        // Remove subdomínio e TLD se existirem mais de 2 partes no host
        if ($numParts > 2) {
            array_pop($hostParts); // Remove TLD
            array_pop($hostParts); // Remove subdomínio
        }

        return implode('.', $hostParts);
    }

    /**
     * Executa uma query SQL preparada.
     */
    public function query($sql, $params = [])
    {
        $stmt = $this->pdo->prepare($sql);

        $isNamedPlaceholders = strpos($sql, ':') !== false;

        if ($isNamedPlaceholders) {
            foreach ($params as $key => $value) {
                $stmt->bindValue(':' . $key, $value);
            }
        } else {
            foreach ($params as $index => $value) {
                $stmt->bindValue($index + 1, $value); // $index + 1 porque os placeholders posicionais começam em 1
            }
        }

        $stmt->execute();
        return $stmt;
    }

    /**
     * Obtém o ID da última inserção.
     */
    public function lastInsertId()
    {
        return $this->pdo->lastInsertId();
    }


    function getDatetimeFortaleza() {
        date_default_timezone_set('America/Fortaleza');
        return date('Y-m-d H:i:s');
    }
}
?>
