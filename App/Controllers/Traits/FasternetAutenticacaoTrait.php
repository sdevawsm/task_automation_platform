<?php
namespace App\Controllers\Traits;

trait FasternetAutenticacaoTrait
{
    public function autenticarViaConnectDB()
    {
        $url = "http://adm.fasternet.com.br/connectdb.php";

        $postFields = [
            'usuario' => $this->userAdm,
            'senha' => $this->passAdm,
            'ip' => '187.60.36.201',
            'submit' => 'logar'
        ];

        $headers = [
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8",
            "Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Origin: http://adm.fasternet.com.br",
            "Referer: http://adm.fasternet.com.br/index_login.php?ip=187.60.36.201",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
        ];

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postFields,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_COOKIEJAR => $this->cookieFile,
            CURLOPT_COOKIEFILE => $this->cookieFile,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "", // gzip/deflate
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HEADER => true
        ]);

        $response = curl_exec($ch);

        if ($response === false) {
            throw new \Exception("Erro na autenticação ConnectDB: " . curl_error($ch));
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
