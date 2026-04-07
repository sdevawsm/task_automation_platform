<?php
namespace App\Controllers\Traits;

trait FasternetClienteTrait
{
    public function pesquisarCliente($nomeOuCpf, $incluirCancelado = false)
    {
        $this->cccCookie = $this->extrairCodigoG();

        if (empty($this->cccCookie)) {
            echo "Erro: Cookie 'ccc' não foi capturado após login.";
            return;
        }

        $url = "http://www2.fasternet.com.br/pesquisa/pesquisa_cliente.asp";

        $postFields = [
            "acao" => "pesquisar",
            "url" => "adm.fasternet.com.br",
            "g" => $this->cccCookie,
            "tipo" => "nome",
            "nome" => $nomeOuCpf,
            "cpfonly" => "cpfonly",
            "usuariologin" => $this->userAdm,
            "submit" => "pesquisar"
        ];

        if ($incluirCancelado) {
            $postFields["cancelado"] = "cancelado";
        }

        $headers = [
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8",
            "Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cache-Control: max-age=0",
            "Connection: keep-alive",
            "Content-Type: application/x-www-form-urlencoded",
            "Origin: http://www2.fasternet.com.br",
            "Referer: http://www2.fasternet.com.br/pesquisa/pesquisa_cliente.asp?url=adm.fasternet.com.br&g={$this->cccCookie}&usuariologin={$this->userAdm}",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
        ];

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => http_build_query($postFields),
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
}
