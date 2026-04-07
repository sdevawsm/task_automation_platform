<?php
namespace App\Controllers\Traits;

trait FasternetTarefasTrait
{
    public function requisitarTarefasIndexPg()
    {
        $url = "http://adm.fasternet.com.br/tarefas_index_pg.php?estatistica=1";

        $headers = [
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
            "Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Connection: keep-alive",
            "Referer: http://adm.fasternet.com.br/connectdb.php",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
        ];

        $cookies = "login1234=$this->userAdm; password1234=$this->passAdm";

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_COOKIE => $cookies,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_ENCODING => "", // gzip/deflate
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false,
            CURLOPT_HEADER => false
        ]);

        $response = curl_exec($ch);

        if ($response === false) {
            throw new \Exception("Erro na requisição TarefasIndexPg: " . curl_error($ch));
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
