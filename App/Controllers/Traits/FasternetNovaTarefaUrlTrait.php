<?php
namespace App\Controllers\Traits;

trait FasternetNovaTarefaUrlTrait
{
    public function gerarUrlNovaTarefa(array $dados)
    {
        $baseUrl = "http://adm.fasternet.com.br/tarefas_nova.php";

        $parametrosFixos = [
            'submit' => rawurlencode('   incluir novo protocolo   '),
            'continuar' => '1'
        ];

        $parametrosDinamicos = [
            'nome'           => $dados['nome'] ?? '',
            'nomeusuario'    => $dados['nomeusuario'] ?? '',
            'telefone'       => $dados['telefone'] ?? '',
            'tipo'           => $dados['tipo'] ?? 'nome',
            'endereco'       => $dados['endereco'] ?? '',
            'bairro'         => $dados['bairro'] ?? '',
            'aniver'         => $dados['aniver'] ?? '',
            'cidade'         => $dados['cidade'] ?? '',
            'plano'          => $dados['plano'] ?? '',
            'v_ip'           => $dados['v_ip'] ?? '',
            'base'           => $dados['base'] ?? '',
            'fe_extrato'     => $dados['fe_extrato'] ?? '',
            'cobrarjuros'    => $dados['cobrarjuros'] ?? '',
            'semjuros'       => $dados['semjuros'] ?? '',
            'comjuros'       => $dados['comjuros'] ?? '',
            'tipo_pessoa'    => $dados['tipo_pessoa'] ?? '',
            'descricao'      => $dados['descricao'] ?? '',
            'contato'        => $dados['contato'] ?? '',
            'solucao'        => $dados['solucao'] ?? '',
        ];

        // Converte os valores para ISO-8859-1
        array_walk($parametrosDinamicos, function (&$value) {
            $value = mb_convert_encoding($value, 'ISO-8859-1', 'UTF-8');
        });

        $queryParams = array_merge($parametrosFixos, $parametrosDinamicos);

        // Codifica com RFC1738 (mais compatível com servidores antigos)
        $queryString = http_build_query($queryParams, '', '&', PHP_QUERY_RFC1738);

        // Substitui o campo submit manualmente para manter os %A0
        $queryString = preg_replace('/submit=[^&]+/', 'submit=%A0%A0%A0incluir+novo+protocolo%A0%A0%A0', $queryString);

        return $baseUrl . '?' . $queryString;
    }
}
