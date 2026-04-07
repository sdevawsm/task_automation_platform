<?php

namespace App\Controllers;

use App\Controllers\Repositories\FasternetRepository;

class AdmController
{
    private $repo;

    public function __construct()
    {
        $this->repo = new FasternetRepository();
    }

    public function exibirPesquisaCliente()
    {
        if (!isset($_GET['cpf']) || empty($_GET['cpf'])) {
            echo "CPF não informado.";
            return;
        }

        $cpfOuNome = $_GET['cpf'];
        $incluirCancelado = isset($_GET['cancelado']) && $_GET['cancelado'] == '1';

        $html = $this->repo->pesquisarCliente($cpfOuNome, $incluirCancelado);
        
        echo $html;
         
    }
 


    public function obterCadastroCliente()
    {
        if (!isset($_GET['cpf']) || empty($_GET['cpf'])) {
            echo "CPF não informado.";
            return;
        }

        $cpfOuNome = $_GET['cpf'];
        $incluirCancelado = isset($_GET['cancelado']) && $_GET['cancelado'] == '1';

        $incluirDescricao = $_POST['txtArea'] ?? '';
        $incluirContato   = $_POST['userName'] ?? 'contato';
        $incluirTelefone  = $_POST['phoneNumber'] ?? '';

        // Inicia buffer para capturar qualquer echo/print inadvertido
        ob_start();

        $html = $this->repo->pesquisarCliente($cpfOuNome, $incluirCancelado);
        $clientes = $this->extrairDadosClienteDoHtml($html);
        $clientesComDados = [];

        foreach ($clientes as $cliente) {
            $resultado = $this->repo->conferirCliente($cliente);
            $contatos = $this->extrairDadosDeContatoDoClienteDoHtml($resultado);
            $dadosConexaoHTML = $this->repo->requisitarDhcpComCookie($cliente);

            $cliente['descricao'] = $incluirDescricao;
            $cliente['contato'] = $incluirContato;
            $cliente['num_contato'] = $incluirTelefone;
            $cliente['solucao'] = $this->repo->nameAdm . ' resolvendo';

            $linkTarefa = $this->repo->gerarUrlNovaTarefa($cliente);
            $linkLGPD = $this->repo->gerarUrlConfereTarefa($cliente);
            $dadosConexao = $this->extrairDadosDeConexaoDoHtml($dadosConexaoHTML);
            $tarefas = $this->extrairTarefas($this->repo->requisitarTesteTarefa($cliente));

            $clientesComDados[] = [
                'cliente'   => $cliente,
                'contatos'  => $contatos,
                'linkTarefa'=> $linkTarefa,
                'linkLGPD'  => $linkLGPD,
                'conexao'   => $dadosConexao,
                'tarefas'   => $tarefas
            ];
        }

        // Limpa qualquer saída gerada por var_dump, echo etc.
        ob_end_clean();

        header('Content-Type: application/json; charset=utf-8');
        echo json_encode(
            ['status' => 'success', 'clientes' => $clientesComDados],
            JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES
        );
        exit;
    }




    public function exibirAuth2(){
        // $this->repo->requisitarTarefasIndexPg();
        //$this->repo->autenticarFasternet();

        //$this->repo->conferirCliente();

        if (!isset($_GET['cpf']) || empty($_GET['cpf'])) {
            echo "CPF não informado.";
            return;
        }

        $cpfOuNome = $_GET['cpf'];
        $incluirCancelado = isset($_GET['cancelado']) && $_GET['cancelado'] == '1';
    
        $html = $this->repo->pesquisarCliente($cpfOuNome, $incluirCancelado);

        $dadosCliente = $this->extrairDadosClienteDoHtml($html);
        $clientes = $this->extrairDadosClienteDoHtml($html);

        foreach ($clientes as $cliente) {
            $resultado = $this->repo->conferirCliente($cliente);
            echo($resultado);
            echo "\n\n"; // separador entre clientes
        }
        // $htmlUtf8 = mb_convert_encoding($html, 'UTF-8', 'auto');
        // echo '<pre>' . htmlspecialchars($htmlUtf8) . '</pre>';

    }


    public function exibirTarefaConfere()
    {
        $cpfOuNome = $_GET['cpf'] ?? '';
        $incluirCancelado = isset($_GET['cancelado']) && $_GET['cancelado'] == '1';
    
        // 1. Pesquisa cliente e obtém HTML
        $html = $this->repo->pesquisarCliente($cpfOuNome, $incluirCancelado);
    
        // 2. Extrai dados do HTML (exemplo fictício, você deve adaptar ao seu HTML real)
        $dadosCliente = $this->extrairDadosDoHtml($html);
    
        if (!$dadosCliente) {
            echo "Não foi possível extrair os dados do cliente.";
            return;
        }
    
        // 3. Consulta LGPD com os dados extraídos
        $respostaLgpd = $this->repo->consultarDadosLgpd($dadosCliente[0]);
    
        echo $respostaLgpd;
    }
    

    public function extrairCodigoG()
    {
        // Chama a função que retorna o HTML da página
        $html = $this->requisitarTarefasIndexPg();

        // Expressão regular para capturar o valor de g=...
        preg_match('/blank\.asp\?usuariologin=dionemourao_ncc&g=(\d+)/', $html, $matches);

        if (isset($matches[1])) {
            $codigoG = $matches[1];
            $urlFinal = "http://www2.fasternet.com.br/fasteradm/blank.asp?usuariologin=dionemourao_ncc&g={$codigoG}";

            echo "<pre>URL extraída: " . htmlspecialchars($urlFinal) . "</pre>";
            return $urlFinal;
        } else {
            echo "<pre>Não foi possível extrair o código 'g'.</pre>";
            return null;
        }
    }


    public function extrairDadosClienteDoHtml(string $html): array
{
    libxml_use_internal_errors(true);

    $dom = new \DOMDocument();
    $dom->loadHTML($html);
    $xpath = new \DOMXPath($dom);

    $linhas = $xpath->query("//tr");
    $contratos = [];

    foreach ($linhas as $tr) {
        // Inicializa como ATIVO
        $statusContrato = 'ATIVO';

        // Verifica todos os <td> do <tr> para encontrar status visual
        $tds = $xpath->query(".//td", $tr);
        foreach ($tds as $td) {
            $tdText = strtoupper(trim($td->textContent));
            if (preg_match('/^(CANCELADO|BLOQUEADO|MIGRADO)/', $tdText, $match)) {
                $statusContrato = $match[1];
                break;
            }
        }

        // Extrai o link da tarefa_confere_pd.asp
        $linkTarefa = $xpath->query(".//a[contains(@href, 'tarefa_confere_pd.asp')]", $tr)->item(0);
        if (!$linkTarefa) continue;

        $href = $linkTarefa->getAttribute('href');
        if (empty($href)) continue;

        parse_str(html_entity_decode(parse_url($href, PHP_URL_QUERY)), $params);

        // Nome limpo
        $nomeBruto = $params['nome'] ?? trim($linkTarefa->textContent);
        $nomeLimpo = preg_replace('/\s+/', ' ', $nomeBruto);

        // Plano limpo e detecção de DHCP/PPPoE
        $planoColuna = $xpath->query(".//td[4]", $tr)->item(0);
        $planoHtml = '';
        $tipoConexao = 'PPPoE'; // padrão
        if ($planoColuna) {
            $planoHtml = $planoColuna->textContent;
            if (stripos($planoHtml, 'DHCP') !== false) {
                $tipoConexao = 'DHCP';
            }
        }

        $planoBruto = $params['plano'] ?? '';
        $planoLimpo = preg_replace("/','usuario2'.*/", '', $planoBruto);

        // Endereço completo
        $cidadeColuna = $xpath->query(".//td[3]", $tr)->item(0);
        $enderecoCompleto = '';
        if ($cidadeColuna) {
            $cidadeLink = $xpath->query(".//a", $cidadeColuna)->item(0);
            if ($cidadeLink && $cidadeLink->hasAttribute('title')) {
                $enderecoCompleto = $cidadeLink->getAttribute('title');
            }
        }

        $contratos[] = [
            'nome'              => $nomeLimpo,
            'status_contrato'   => $statusContrato,
            'nomeusuario'       => $params['nomeusuario'] ?? '',
            'telefone'          => $params['telefone'] ?? '',
            'endereco'          => $params['endereco'] ?? '',
            'endereco_completo' => $enderecoCompleto,
            'cidade'            => $params['cidade'] ?? '',
            'bairro'            => $params['bairro'] ?? '',
            'plano'             => $planoLimpo,
            'tipo_conexao'      => $tipoConexao,
            'v_ip'              => $params['v_ip'] ?? '',
            'base'              => $params['base'] ?? '',
            'g'                 => $params['g'] ?? '',
            'acao'              => $params['acao'] ?? 'telefone',
            'fc_cliente'        => $params['fc_cliente'] ?? '',
            'url'               => $params['url'] ?? '',
            'email_responsavel' => $params['email_responsavel'] ?? '',
            'aniver'            => $params['aniver'] ?? '',
            'sms_responsavel'   => $params['sms_responsavel'] ?? '',
            'tipo_pessoa'       => $params['tipo_pessoa'] ?? '',
            'status'            => strtoupper($params['status'] ?? '')
        ];
    }

    return $contratos;
}



    

    public function extrairDadosDeContatoDoClienteDoHtml(string $html): array
    {
        $telefones = [];

        // Lista dos campos de telefone em ordem
        $camposTelefone = [
            ['ddd' => 'v_telefone_ddd', 'numero' => 'v_telefone', 'nome' => 'v_telefone_nome'],
            ['ddd' => 'v_celular_ddd', 'numero' => 'v_celular', 'nome' => 'v_celular_nome'],
            ['ddd' => 'v_fax_ddd', 'numero' => 'v_fax', 'nome' => 'v_fax_nome'],
            ['ddd' => 'v_telalt_ddd', 'numero' => 'v_telalt', 'nome' => 'v_telalt_nome'],
            ['numero' => 'sms_responsavel2'] // sem DDD ou nome
        ];

        foreach ($camposTelefone as $index => $campos) {
            $ddd = null;
            $numero = null;
            $contato = null;

            if (isset($campos['ddd'])) {
                preg_match('/name="' . $campos['ddd'] . '"[^>]*value="([^"]*)"/', $html, $matchDdd);
                $ddd = trim($matchDdd[1] ?? '') ?: null;
            }

            if (isset($campos['numero'])) {
                preg_match('/name="' . $campos['numero'] . '"[^>]*value="([^"]*)"/', $html, $matchNumero);
                $numero = trim($matchNumero[1] ?? '') ?: null;
            }

            if (isset($campos['nome'])) {
                preg_match('/name="' . $campos['nome'] . '"[^>]*value="([^"]*)"/', $html, $matchNome);
                $contato = trim($matchNome[1] ?? '') ?: null;
            }

            $numeroFormatado = $numero ? ($ddd ? "($ddd)$numero" : $numero) : null;

            // Limita a 4 telefones
            if ($index < 4) {
                $telefones["telefone" . ($index + 1)] = [
                    'numero' => $numeroFormatado,
                    'contato' => $contato
                ];
            }
        }

        // Garante que todas as 4 posições existam
        for ($i = 1; $i <= 4; $i++) {
            if (!isset($telefones["telefone$i"])) {
                $telefones["telefone$i"] = [
                    'numero' => null,
                    'contato' => null
                ];
            }
        }

        // Captura o e-mail
        $email = null;
        if (preg_match('/name="email_responsavel2"[^>]*value="([^"]+)"/', $html, $matchEmail)) {
            $emailCapturado = trim($matchEmail[1]);
            $email = filter_var($emailCapturado, FILTER_VALIDATE_EMAIL) ? $emailCapturado : null;
        }

        $telefones['email'] = $email;

        return $telefones;
    }


    public function extrairDadosDeConexaoDoHtml(string $html): array
    {
        $dados = [];

        // MAC ONU
        preg_match('/MAC ONU::\s*([A-Za-z0-9\-]+)/', $html, $matchMac);
        $dados['mac_onu'] = $matchMac[1] ?? null;

        // OLT-PON
        preg_match('/OLT-PON:\s*([0-9\-]+)/', $html, $matchOlt);
        $dados['olt_pon'] = $matchOlt[1] ?? null;

        // Chassi
        preg_match('/Chassi:\s*([0-9\.]+)/', $html, $matchChassi);
        $dados['chassi'] = $matchChassi[1] ?? null;

        // Modelo
        preg_match('/Modelo:\s*([A-Za-z0-9\-]+)/', $html, $matchModelo);
        $dados['modelo'] = $matchModelo[1] ?? null;

        // Data de ativação
        preg_match('/Ativo:\s*([0-9\-:\s]+)/', $html, $matchAtivo);
        $dados['data_ativacao'] = isset($matchAtivo[1]) ? trim($matchAtivo[1]) : null;

        // Usuário de conexão (DHCPv4)
        preg_match('/Usuario de conexao:\s*([^\s<]+)/', $html, $matchUsuario);
        $dados['usuario_conexao'] = $matchUsuario[1] ?? null;

        // Status de conexão
        preg_match('/<b>CLIENTE DHCP<\/b><br><br>(.*?)<br><br>/', $html, $matchStatus);
        $dados['status_conexao'] = isset($matchStatus[1]) ? strip_tags(trim($matchStatus[1])) : null;

        return $dados;
    }


    public function extrairTarefas(string $html): array
    {
        libxml_use_internal_errors(true);

        $dom = new \DOMDocument();
        @$dom->loadHTML($html);
        $xpath = new \DOMXPath($dom);

        // Seleciona todas as linhas de tarefas
        $linhas = $xpath->query("//tr[contains(@class, 'link1')]");
        $tarefas = [];

        foreach ($linhas as $tr) {
            $tds = $xpath->query(".//td", $tr);

            if ($tds->length >= 5) {
                // Extrai textos de cada coluna
                $assunto        = trim($tds->item(0)->textContent ?? '');
                $descricao      = trim($tds->item(1)->textContent ?? '');
                $status         = trim($tds->item(2)->textContent ?? '');
                $dataAbertura   = trim(str_replace("\xC2\xA0", ' ', $tds->item(3)->textContent ?? ''));
                $dataFechamento = trim(str_replace("\xC2\xA0", ' ', $tds->item(4)->textContent ?? ''));

                // Extrai link da primeira <a> (Assunto)
                $aTag = $xpath->query(".//a", $tds->item(0))->item(0);
                $href = $aTag ? $aTag->getAttribute('href') : '';

                // Extrai a URL real do openWindow('...')
                $url = '';
                if (preg_match("/openWindow\\('([^']+)'/", $href, $match)) {
                    $url = $match[1];
                }

                $tarefas[] = [
                    'assunto'        => $assunto,
                    'descricao'      => $descricao,
                    'status'         => $status,
                    'data_abertura'  => $dataAbertura,
                    'data_fechamento'=> $dataFechamento,
                    'url'            => $url,
                ];
            }
        }

        return $tarefas;
    }


    
    
}//end class
