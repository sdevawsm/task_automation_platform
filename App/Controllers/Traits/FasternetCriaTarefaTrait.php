<?php
namespace App\Controllers\Traits;

trait FasternetCriaTarefaTrait
{
    public function criarTarefa(array $dadosTarefa)
    {
        $url = "http://adm.fasternet.com.br/tarefas_i_tarefa.php";

        $headers = [
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Connection: keep-alive",
            "Referer: http://adm.fasternet.com.br/tarefas_nova.php",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
        ];

        // Cookies dinâmicos vindos da classe principal
        $cookies = "login1234={$this->userAdm}; password1234={$this->passAdm}";

        $postFields = http_build_query([
            'nome'             => $dadosTarefa['nome'] ?? '',
            'nomeusuario'      => $dadosTarefa['nomeusuario'] ?? '',
            'telefone'         => $dadosTarefa['telefone'] ?? '',
            'tipo'             => $dadosTarefa['tipo'] ?? 'nome',
            'endereco'         => $dadosTarefa['endereco'] ?? '',
            'bairro'           => $dadosTarefa['bairro'] ?? '',
            'cidade'           => $dadosTarefa['cidade'] ?? '',
            'plano'            => $dadosTarefa['plano'] ?? '',
            'v_ip'             => $dadosTarefa['v_ip'] ?? '',
            'base'             => $dadosTarefa['base'] ?? '',
            'ntarefa'          => $dadosTarefa['ntarefa'] ?? '',
            'retorno'          => $dadosTarefa['retorno'] ?? '',
            'aniver'           => $dadosTarefa['aniver'] ?? '',
            'tipo_pessoa'      => $dadosTarefa['tipo_pessoa'] ?? '',
            'sms_responsavel'  => $dadosTarefa['sms_responsavel'] ?? '',
            'g'                => $this->cccCookie ?? '',
            'url'              => 'adm.fasternet.com.br',
            'acao'             => 'telefone',
            'fc_cliente'       => $dadosTarefa['fc_cliente'] ?? '',
            'email_responsavel'=> $dadosTarefa['email_responsavel'] ?? '',
            'status'           => $dadosTarefa['status'] ?? ''
        ]);

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postFields,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_COOKIE => $cookies,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "",
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HEADER => false
        ]);

        // return $postFields;
        // die;
        $response = curl_exec($ch);

        if ($response === false) {
            throw new \Exception("Erro na requisição criarTarefa: " . curl_error($ch));
        }

        curl_close($ch);

        // Captura e salva cookies manualmente
        preg_match_all('/^Set-Cookie:\s*([^=]+)=([^;]*)/mi', $response, $matches);
        foreach ($matches[1] as $index => $nome) {
            $valor = $matches[2][$index];
            $this->atualizarOuAdicionarCookie('adm.fasternet.com.br', trim($nome), trim($valor));
        }

        return $response;
    }
}
