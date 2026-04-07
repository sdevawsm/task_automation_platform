<?php
namespace App\Controllers;

use App\Connection;

class AdmController extends Connection
{
    private $cookieFile;
    private $cccCookie;

    public function __construct()
    {
        $this->cookieFile = __DIR__ . "/cookies.txt";
    }

    public function exibirPesquisaCliente()
    {
        if (!isset($_GET['cpf']) || empty($_GET['cpf'])) {
            echo "CPF não informado.";
            return;
        }

        $cpfOuNome = $_GET['cpf'];
        $incluirCancelado = isset($_GET['cancelado']) && $_GET['cancelado'] == '1';

        $html = $this->pesquisarCliente($cpfOuNome, $incluirCancelado);
        echo $html;
    }


    public function pesquisarCliente($nomeOuCpf, $incluirCancelado = false)
    {
        $this->autenticarFasternet();

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
            "usuariologin" => "dionemourao_ncc",
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
            "Referer: http://www2.fasternet.com.br/pesquisa/pesquisa_cliente.asp?url=adm.fasternet.com.br&g={$this->cccCookie}&usuariologin=dionemourao_ncc",
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

        return $response;
    }

    private function autenticarFasternet()
    {
        $urlLogin = "http://adm.fasternet.com.br/connectdb.php";
        $boundary = "----WebKitFormBoundaryic9ZP1zaclI4xCnh";

        $postData = <<<EOD
            --$boundary\r
            Content-Disposition: form-data; name="usuario"\r
            \r
            dionemourao_ncc\r
            --$boundary\r
            Content-Disposition: form-data; name="senha"\r
            \r
            Dione5\r
            --$boundary\r
            Content-Disposition: form-data; name="ip"\r
            \r
            187.60.36.201\r
            --$boundary\r
            Content-Disposition: form-data; name="submit"\r
            \r
            logar\r
            --$boundary--\r
            EOD;

        $headersLogin = [
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8",
            "Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Cache-Control: max-age=0",
            "Connection: keep-alive",
            "Content-Type: multipart/form-data; boundary=$boundary",
            "Origin: http://adm.fasternet.com.br",
            "Referer: http://adm.fasternet.com.br/index_login.php?ip=187.60.36.201",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
        ];

        $ch = curl_init($urlLogin);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => $postData,
            CURLOPT_HTTPHEADER => $headersLogin,
            CURLOPT_COOKIEJAR => $this->cookieFile,
            CURLOPT_COOKIEFILE => $this->cookieFile,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HEADER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        ]);
        $responseLogin = curl_exec($ch);
        curl_close($ch);

        // Estabiliza sessão
        $this->executarRequisicaoGet("http://adm.fasternet.com.br/index.php?acao=1578&v=...");
        $this->executarRequisicaoGet("http://adm.fasternet.com.br/index_login.php?ip=187.60.36.201");
        $this->executarRequisicaoGet("http://adm.fasternet.com.br/index_comunicado.php");

        // Requisição final com cookies manuais
        $cookies = "ccc=11483346; cookie_usuario=dionemourao_ncc; ASPSESSIONIDAQBARDBB=HLDCKECCNLOAOEOIILPHBDLM; ASPSESSIONIDASDBSAAA=JPNMPGACPFGDJLDDDKHHHEJM";
        $this->executarRequisicaoComCookies("http://www2.fasternet.com.br/fasteradm/blank.asp?usuariologin=dionemourao_ncc&g=11483346", $cookies);

        // Captura cookie ccc
        $this->cccCookie = $this->extrairCookie("ccc");

        return $responseLogin;
    }

    private function executarRequisicaoGet($url)
    {
        $headers = [
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8",
            "Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Connection: keep-alive",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
        ];

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_COOKIEJAR => $this->cookieFile,
            CURLOPT_COOKIEFILE => $this->cookieFile,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HEADER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        return $response;
    }

    private function executarRequisicaoComCookies($url, $cookies)
    {
        $headers = [
            "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/*,*/*;q=0.8",
            "Accept-Language: pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
            "Connection: keep-alive",
            "Referer: http://adm.fasternet.com.br/",
            "Upgrade-Insecure-Requests: 1",
            "User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36"
        ];

        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_COOKIE => $cookies,
            CURLOPT_COOKIEJAR => $this->cookieFile,
            CURLOPT_COOKIEFILE => $this->cookieFile,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_HEADER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_SSL_VERIFYHOST => false
        ]);

        $response = curl_exec($ch);
        curl_close($ch);

        // Extrair cookies do cabeçalho da resposta
        preg_match_all('/^Set-Cookie:\s*([^;]*)/mi', $response, $matches);
        foreach ($matches[1] as $cookie) {
            $this->salvarCookieManual($cookie);
        }

        return $response;
    }

    private function salvarCookieManual($cookieString)
    {
        list($nome, $valor) = explode('=', $cookieString, 2);
        $linha = "www2.fasternet.com.br\tFALSE\t/\tFALSE\t0\t$nome\t$valor\n";

        $conteudo = file_exists($this->cookieFile) ? file_get_contents($this->cookieFile) : '';
        if (strpos($conteudo, "\t$nome\t") === false) {
            file_put_contents($this->cookieFile, $linha, FILE_APPEND);
        }
    }

    private function extrairCookie($nome)
    {
        if (!file_exists($this->cookieFile)) return null;

        $linhas = file($this->cookieFile);
        foreach ($linhas as $linha) {
            if (strpos($linha, "\t") !== false) {
                $partes = explode("\t", $linha);
                if (isset($partes[5]) && trim($partes[5]) === $nome && isset($partes[6])) {
                    return trim($partes[6]);
                }
            }
        }

        return null;
    }







}//fim da classe 