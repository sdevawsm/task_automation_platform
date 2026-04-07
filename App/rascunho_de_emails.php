<?php
namespace App;

use App\Models\UserModel;
use App\Models\DatabaseModel;


use DateTime;

class SendMailsInLote {
    public $db;
    public $user;
    public $isAuth;

    public function __construct() {
        //$this->db = new DatabaseModel;
    }

    public function send_mails_in_lote($recipients) {
        // Caminho absoluto para o arquivo emails_log.txt
        $filePath = __DIR__ . '/emails_log.txt';

        // Abre o arquivo em modo de adição (append)
        $file = fopen($filePath, 'a');

        // Verifica se o arquivo foi aberto com sucesso
        if ($file) {
            foreach ($recipients as $recipient) {
                // Lógica para enviar o e-mail para cada destinatário
                echo "Enviando e-mail para: " . $recipient . "\n";
                // Simular tempo de envio
                sleep(3);

                // Adiciona o e-mail ao final do arquivo
                fwrite($file, $recipient . "\n");
            }

            // Fecha o arquivo
            fclose($file);
        } else {
            echo "Não foi possível abrir o arquivo para escrita.\n";
        }
    }
}

if (isset($argv[1])) { 
    $recipients = explode(',', $argv[1]); 

    // Abre o arquivo em modo de adição (append)
    $file = fopen(__DIR__ . '/teste_log.txt', 'a');

    // Verifica se o arquivo foi aberto com sucesso
    if ($file) {
        foreach ($recipients as $recipient) {
            // Lógica para enviar o e-mail para cada destinatário
            echo "Enviando e-mail para: " . $recipient . "\n";
            // Simular tempo de envio
            //sleep(3);

            // Adiciona o e-mail ao final do arquivo
            fwrite($file, $recipient . "\n");
        }

        // Fecha o arquivo
        fclose($file);
    } 

    // Instancia a classe e chama o método
    $mail_lote = new SendMailsInLote();
    $mail_lote->send_mails_in_lote($recipients);
}
?>



Passo 1: Criar as tabelas no banco de dados
Primeiro, vamos criar as tabelas necessárias no banco de dados para salvar o histórico dos envios e os estados dos e-mails.

Tabela email_queue: Esta tabela armazenará os e-mails que estão na fila para serem enviados, com o status de envio.

sql
Copy
CREATE TABLE email_queue (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    recipients TEXT NOT NULL,
    cc_list TEXT DEFAULT NULL,
    subject VARCHAR(255) NOT NULL,
    body_content TEXT NOT NULL,
    status ENUM('pendente', 'enviando', 'enviado', 'erro', 'cancelado') DEFAULT 'pendente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
Tabela email_history: Esta tabela irá armazenar o histórico de cada e-mail enviado, incluindo o estado de cada e-mail no momento do envio.

sql
Copy
CREATE TABLE email_history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email_queue_id INT NOT NULL,
    status ENUM('pendente', 'enviado', 'erro') DEFAULT 'pendente',
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (email_queue_id) REFERENCES email_queue(id) ON DELETE CASCADE
);
Passo 2: Funções PHP para Envio, Pausa e Cancelamento
Agora, vamos criar a classe que gerencia o envio de e-mails e o controle de seu status (pausar, cancelar).

2.1 Classe PlatformMailController: Funções de Envio, Pausa e Cancelamento
php
Copy
class PlatformMailController extends Connection {

    // Função para iniciar o envio de e-mails
    public function startEmailSending($emailQueueId) {
        // Atualiza o status da fila de e-mails para 'enviando'
        $query = "UPDATE email_queue SET status = 'enviando' WHERE id = :emailQueueId";
        $params = ['emailQueueId' => $emailQueueId];
        $this->db->query($query, $params);

        // Iniciar o envio (essa lógica pode ser processada em um loop)
        $this->sendEmailsFromQueue();
    }

    // Função para enviar os e-mails da fila
    public function sendEmailsFromQueue() {
        // Seleciona todos os e-mails pendentes
        $query = "SELECT * FROM email_queue WHERE status = 'pendente'";
        $emails = $this->db->query($query)->fetchAll(PDO::FETCH_ASSOC);

        foreach ($emails as $email) {
            if ($this->checkStopCondition()) {
                break; // Parar o envio se a condição de stop for atendida
            }

            // Simulando o envio do e-mail (chamar a lógica de envio)
            $this->sendEmail($email);

            // Atualizando o status do e-mail
            $this->updateEmailStatus($email['id'], 'enviado');

            // Inserir histórico de envio
            $this->insertEmailHistory($email['id'], 'enviado');
        }
    }

    // Função para atualizar o status do e-mail
    public function updateEmailStatus($emailQueueId, $status) {
        $query = "UPDATE email_queue SET status = :status WHERE id = :emailQueueId";
        $params = ['status' => $status, 'emailQueueId' => $emailQueueId];
        $this->db->query($query, $params);
    }

    // Função para inserir o histórico de envio de e-mail
    public function insertEmailHistory($emailQueueId, $status) {
        $query = "INSERT INTO email_history (email_queue_id, status) VALUES (:emailQueueId, :status)";
        $params = ['emailQueueId' => $emailQueueId, 'status' => $status];
        $this->db->query($query, $params);
    }

    // Função para verificar se o envio deve ser interrompido
    public function checkStopCondition() {
        // Aqui você pode verificar um status de variável para pausar ou cancelar
        return isset($_SESSION['stopSending']) && $_SESSION['stopSending'] === true;
    }

    // Função para enviar o e-mail real
    public function sendEmail($email) {
        // Lógica de envio de e-mail real
        // Exemplo simples com a função mail do PHP
        mail($email['recipients'], $email['subject'], $email['body_content']);
    }

    // Função para pausar o envio de e-mails
    public function pauseEmailSending() {
        $_SESSION['stopSending'] = true;
    }

    // Função para cancelar o envio de e-mails
    public function cancelEmailSending() {
        $_SESSION['stopSending'] = true;
        // Alterar o status dos e-mails restantes para 'cancelado'
        $query = "UPDATE email_queue SET status = 'cancelado' WHERE status = 'enviando'";
        $this->db->query($query);
    }

    // Função para reiniciar o envio de e-mails
    public function resumeEmailSending() {
        $_SESSION['stopSending'] = false;
    }
}
Explicação:
startEmailSending: Inicia o envio dos e-mails da fila.

sendEmailsFromQueue: Função que envia os e-mails um a um, verificando a condição de parada (caso haja algum controle de pausa ou cancelamento).

updateEmailStatus: Atualiza o status do e-mail na tabela email_queue (enviado, erro, etc.).

insertEmailHistory: Insere o status do e-mail na tabela email_history.

checkStopCondition: Verifica se o envio deve ser interrompido (caso a variável de sessão indique que o envio foi pausado ou cancelado).

sendEmail: Função fictícia para simular o envio de e-mails (aqui você pode usar PHPMailer ou outra biblioteca).

pauseEmailSending: Define que o envio de e-mails deve ser pausado.

cancelEmailSending: Cancela o envio de todos os e-mails restantes, alterando seu status.

resumeEmailSending: Retoma o envio dos e-mails.

Passo 3: Arquivo HTML para Monitoramento e Controle
Agora, vamos criar a interface HTML para o controle e visualização do status dos e-mails.

html
Copy
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Controle de Envio de E-mails</title>
    <style>
        /* Exemplo de estilo */
        #status { font-size: 20px; }
    </style>
</head>
<body>
    <div id="status">Status do envio: <span id="statusText">Aguardando...</span></div>
    <button id="startBtn">Iniciar Envio</button>
    <button id="pauseBtn">Pausar Envio</button>
    <button id="stopBtn">Cancelar Envio</button>

    <div id="history">
        <h2>Histórico de Envios</h2>
        <table border="1">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Assunto</th>
                    <th>Status</th>
                    <th>Data</th>
                </tr>
            </thead>
            <tbody id="historyTable">
                <!-- O histórico será carregado aqui -->
            </tbody>
        </table>
    </div>

    <script>
        let sendingInProgress = false;

        // Iniciar o envio de e-mails
        document.getElementById('startBtn').addEventListener('click', function() {
            if (!sendingInProgress) {
                startEmailSending();
            }
        });

        // Pausar o envio
        document.getElementById('pauseBtn').addEventListener('click', function() {
            if (sendingInProgress) {
                pauseEmailSending();
            }
        });

        // Parar o envio
        document.getElementById('stopBtn').addEventListener('click', function() {
            stopEmailSending();
        });

        function startEmailSending() {
            sendingInProgress = true;
            document.getElementById('statusText').innerText = "Enviando...";

            // Enviar AJAX para iniciar o envio no servidor
            fetch('/start_email_sending.php', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    updateEmailStatus();
                });
        }

        function pauseEmailSending() {
            sendingInProgress = false;
            document.getElementById('statusText').innerText = "Pausado.";

            // Enviar AJAX para pausar o envio no servidor
            fetch('/pause_email_sending.php', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    updateEmailStatus();
                });
        }

        function stopEmailSending() {
            sendingInProgress = false;
            document.getElementById('statusText').innerText = "Cancelado.";

            // Enviar AJAX para parar o envio no servidor
            fetch('/stop_email_sending.php', { method: 'POST' })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    updateEmailStatus();
                });
        }

        function updateEmailStatus() {
            // Atualiza o status de envio
            fetch('/get_email_status.php')
                .then(response => response.json())
                .then(data => {
                    document.getElementById('statusText').innerText = data.status;
                    loadEmailHistory();
                });
        }

        function loadEmailHistory() {
            // Carregar histórico de envios
            fetch('/get_email_history.php')
                .then(response => response.json())
                .then(data => {
                    const historyTable = document.getElementById('historyTable');
                    historyTable.innerHTML = '';
                    data.history.forEach(email => {
                        const row = `<tr>
                            <td>${email.id}</td>
                            <td>${email.subject}</td>
                            <td>${email.status}</td>
                            <td>${email.timestamp}</td>
                        </tr>`;
                        historyTable.innerHTML += row;
                    });
                });
        }

        // Atualiza o status de envio a cada 2 segundos
        setInterval(updateEmailStatus, 2000);
    </script>
</body>
</html>
Passo 4: Implementar Scripts PHP para Controlar o Envio e Obter Status
4.1 start_email_sending.php (Inicia o envio)
php
Copy
<?php
// Inicia o envio de e-mails
require_once 'PlatformMailController.php';
$controller = new PlatformMailController();
$controller->startEmailSending($_POST['emailQueueId']);
echo json_encode(['status' => 'Envio iniciado']);
?>
4.2 pause_email_sending.php (Pausa o envio)
php
Copy
<?php
// Pausa o envio de e-mails
require_once 'PlatformMailController.php';
$controller = new PlatformMailController();
$controller->pauseEmailSending();
echo json_encode(['status' => 'Envio pausado']);
?>
4.3 stop_email_sending.php (Cancela o envio)
php
Copy
<?php
// Cancela o envio de e-mails
require_once 'PlatformMailController.php';
$controller = new PlatformMailController();
$controller->cancelEmailSending();
echo json_encode(['status' => 'Envio cancelado']);
?>
4.4 get_email_status.php (Obtém o status do envio)
php
Copy
<?php
// Retorna o status do envio
require_once 'PlatformMailController.php';
$controller = new PlatformMailController();

// Pode ser uma consulta para obter o status atual do envio
echo json_encode(['status' => 'Envio pendente']);
?>
4.5 get_email_history.php (Obtém o histórico de envios)
php
Copy
<?php
// Retorna o histórico dos envios
require_once 'PlatformMailController.php';
$controller = new PlatformMailController();

$query = "SELECT * FROM email_history ORDER BY timestamp DESC";
$history = $controller->db->query($query)->fetchAll(PDO::FETCH_ASSOC);

echo json_encode(['history' => $history]);
?>
Conclusão
Este guia fornece uma solução completa para gerenciar o envio de e-mails, incluindo:

Banco de dados: Tabelas para armazenar e-mails em fila e seu histórico.

PHP: Funções para enviar e-mails, pausar, cancelar e monitorar o status.

HTML/JavaScript: Interface interativa para controlar o envio e exibir o status e histórico.

Esta solução não depende de cron jobs ou execuções externas e funciona inteiramente com PHP e AJAX para garantir que o envio seja controlado em tempo real.