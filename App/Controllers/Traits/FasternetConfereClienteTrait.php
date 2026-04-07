<?php
namespace App\Controllers\Traits;

trait FasternetConfereClienteTrait
{
    public function conferirCliente(array $dadosCliente)
    {
        $this->cccCookie = $this->extrairCodigoG();

        if (empty($this->cccCookie)) {
            echo "Erro: Cookie 'ccc' não foi capturado após login.";
            return;
        }

        $queryParams = http_build_query([
            'nome' => $dadosCliente['nome'] ?? '',
            'nomeusuario' => $dadosCliente['nomeusuario'] ?? '',
            'telefone' => $dadosCliente['telefone'] ?? '',
            'tipo' => 'nome',
            'endereco' => $dadosCliente['endereco'] ?? '',
            'cidade' => $dadosCliente['cidade'] ?? '',
            'bairro' => $dadosCliente['bairro'] ?? '',
            'plano' => $dadosCliente['plano'] ?? '',
            'v_ip' => '',
            'base' => '',
            'g' => $this->cccCookie,
            'acao' => 'telefone',
            'fc_cliente' => $dadosCliente['fc_cliente'] ?? '',
            'url' => 'adm.fasternet.com.br',
            'email_responsavel' => $dadosCliente['email_responsavel'] ?? '',
            'aniver' => $dadosCliente['aniver'] ?? '',
            'sms_responsavel' => $dadosCliente['sms_responsavel'] ?? '',
            'tipo_pessoa' => $dadosCliente['tipo_pessoa'] ?? '',
            'status' => $dadosCliente['status'] ?? ''
        ]);

        $url = "http://www2.fasternet.com.br/fasteradm/tarefa_confere_pd.asp?" . $queryParams;

        $headers = [
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8",
            "Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Connection: keep-alive",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
        ];

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_COOKIEJAR => $this->cookieFile,
            CURLOPT_COOKIEFILE => $this->cookieFile,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HEADER => false,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        // Captura e salva cookies manualmente
        preg_match_all('/^Set-Cookie:\s*([^=]+)=([^;]*)/mi', $response, $matches);
        foreach ($matches[1] as $index => $nome) {
            $valor = $matches[2][$index];
            $this->atualizarOuAdicionarCookie('www2.fasternet.com.br', trim($nome), trim($valor));
        }


        return $response;
    }

    public function gerarUrlConfereTarefa(array $dados)
    {
        $baseUrl = "http://www2.fasternet.com.br/fasteradm/tarefa_confere_pd.asp";

        $parametros = [
            'nome'              => $dados['nome'] ?? '',
            'nomeusuario'       => $dados['nomeusuario'] ?? '',
            'telefone'          => $dados['telefone'] ?? '',
            'tipo'              => $dados['tipo'] ?? 'nome',
            'endereco'          => $dados['endereco'] ?? '',
            'cidade'            => $dados['cidade'] ?? '',
            'bairro'            => $dados['bairro'] ?? '',
            'plano'             => $dados['plano'] ?? '',
            'v_ip'              => $dados['v_ip'] ?? '',
            'base'              => $dados['base'] ?? '',
            'g'                 => $dados['g'] ?? '',
            'acao'              => $dados['acao'] ?? '',
            'fc_cliente'        => $dados['fc_cliente'] ?? '',
            'url'               => $dados['url'] ?? '',
            'email_responsavel' => $dados['email_responsavel'] ?? '',
            'aniver'            => $dados['aniver'] ?? '',
            'sms_responsavel'   => $dados['sms_responsavel'] ?? '',
            'tipo_pessoa'       => $dados['tipo_pessoa'] ?? '',
            'status'            => $dados['status'] ?? '',
        ];

        // Converte os valores para ISO-8859-1
        array_walk($parametros, function (&$value) {
            $value = mb_convert_encoding($value, 'ISO-8859-1', 'UTF-8');
        });

        // Codifica com RFC1738 (mais compatível com servidores IIS)
        $queryString = http_build_query($parametros, '', '&', PHP_QUERY_RFC1738);

        return $baseUrl . '?' . $queryString;
    }

}
