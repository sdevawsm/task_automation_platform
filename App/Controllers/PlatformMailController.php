<?php

    namespace App\Controllers;

    use App\Connection;

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    
    require 'vendor/autoload.php';

    //use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\SMTP;
    //use PHPMailer\PHPMailer\Exception;

    //require 'PHPMailer/src/Exception.php';
    //require 'PHPMailer/src/PHPMailer.php';
    //require 'PHPMailer/src/SMTP.php';


    
    class PlatformMailController extends Connection{
        function CreateTeam(){
            echo(json_encode('criado equipe', JSON_UNESCAPED_UNICODE ) );  
        }

        function CreateScriptCategory(){
            echo(json_encode('criado equipe', JSON_UNESCAPED_UNICODE ) );  
        }


        public function deleteEmailQueue() {
            try {
                // Apaga registros dependentes primeiro
                $sqlSent = "DELETE FROM email_sent";
                $this->db->query($sqlSent);

                // Depois apaga da fila
                $sqlQueue = "DELETE FROM email_queue";
                $this->db->query($sqlQueue);

                // Por fim, apaga do histórico
                $sqlHistory = "DELETE FROM email_history";
                $this->db->query($sqlHistory);

                echo json_encode([
                    'status' => 'success',
                    'message' => 'Fila de e-mails e histórico apagados com sucesso.'
                ]);
            } catch (\Exception $e) {
                echo json_encode([
                    'status' => 'error',
                    'message' => $e->getMessage()
                ]);
            }
        }








        public function send_mail(string $d_email, string $d_body) {
            //var_dump($this->d_email, $this->d_password);
            try {
                $mail = new PHPMailer(true);
                $mail->CharSet = 'UTF-8';
        
                // Server settings
                $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      // Enable verbose debug output
                $mail->isSMTP();                                            // Send using SMTP
                $mail->Host       = 'smtp.gmail.com';                       // Set the SMTP server to send through
                $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
                $mail->Username   = 'testeplanilha53@gmail.com';            // SMTP username
                $mail->Password   = 'vmzbkynpecnrzgrl';                     // SMTP password
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            // Enable implicit TLS encryption
                $mail->Port       = 465;                                    // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        
                // Recipients
                $mail->setFrom('ncctools.recovery@gmail.com', 'TelChat - Recuperação de senha!');
                $mail->addAddress($d_email, $d_email);                     // Add a recipient
        
                // Content
                $mail->isHTML(true);                                        // Set email format to HTML
                $mail->Subject = 'Recuperação de senha!';
                $mail->Body    = $d_body;
        
                $mail->send();
                return true;
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
                return false;
            }
        }


    
        public function sendMailWithAttachments(
            string $recipients, 
            string $emailBody, 
            array $attachments, 
            string $subject, 
            $ccList
        ) {
            ob_clean();
            header('Content-Type: application/json');
            
            try {
                // Inicia o PHPMailer
                $mail = new PHPMailer(true);
                $mail->CharSet = 'UTF-8';
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = getenv('GMAIL_USER') ?: 'scripttools.recovery@gmail.com';
                $mail->Password   = getenv('GMAIL_PASSWORD') ?: 'your_app_password';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port       = 465;
        
                // De onde vem o e-mail
                $mail->setFrom(getenv('GMAIL_USER') ?: 'scripttools.recovery@gmail.com', 'Silvadevbr');
                
                // Adiciona os destinatários
                $recipientsArray = explode(',', $recipients);
                foreach ($recipientsArray as $recipient) {
                    $recipient = trim($recipient);
                    if (!empty($recipient)) {
                        $mail->addAddress($recipient);
                    }
                }
                
                // Adiciona a lista de CC (cópia)
                if (!empty($ccList)) {
                    $ccArray = explode(',', $ccList);
                    foreach ($ccArray as $cc) {
                        $cc = trim($cc);
                        if (!empty($cc)) {
                            $mail->addCC($cc);
                        }
                    }
                }


                // Anexos
                foreach ($attachments as $attachment) {
                    // Verificar se o caminho é uma URL externa
                    if (filter_var($attachment['path'], FILTER_VALIDATE_URL)) {
                        // Se for uma URL externa, apenas não anexa, já está embutida no HTML com src="URL"
                        continue;
                    }
                
                    // Se não for uma URL, trata como anexo ou imagem embutida
                    if (isset($attachment['cid'])) {
                        // Adiciona a imagem embutida com CID
                        $mail->AddEmbeddedImage($attachment['path'], $attachment['cid']);
                    } else {
                        // Caso seja um arquivo normal, adiciona como anexo
                        $mail->addAttachment($attachment['path']);
                    }
                }
                

                
                // Definir o conteúdo do e-mail
                $mail->isHTML(true);
                $mail->Subject = $subject;
                $mail->Body    = $emailBody;
                
                // Enviar o e-mail
                $mail->send();

                
                
                // Após o envio com sucesso, registrar no banco de dados
                return ['status' => 'success', 'message' => 'Email sent successfully!'];
                
            } catch (Exception $e) {
                // Se ocorrer um erro, capturamos e retornamos o erro
                return ['status' => 'error', 'message' => $mail->ErrorInfo];
            }
        }
        



        //inicicio dos envios



        // Esta função será chamada no endpoint '/sendmail'
        public function sendMailHandler() {
            // Verificar se os dados do formulário foram enviados
            if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                // Captura e sanitiza os dados do formulário
                $recipients = filter_var($_POST['destinatarios'], FILTER_SANITIZE_STRING);
                $ccList = filter_var($_POST['copias'], FILTER_SANITIZE_STRING);
                $subject = filter_var($_POST['assunto'], FILTER_SANITIZE_STRING);
                $bodyContent = $_POST['corpo']; // HTML permitido
                $attachments = isset($_FILES['anexos']) ? $_FILES['anexos'] : [];
                
                // Verificar se o checkbox "Enviar para todos" está marcado
                $sendToAll = isset($_POST['sendToAll']) && $_POST['sendToAll'] === 'true'; // Verifica se foi marcado
                

                if ($sendToAll) {
                    // Se "Enviar para todos" estiver marcado, buscar todos os usuários ativos
                    try {
                        // Busca todos os usuários com status ativo
                        $activeUsers = $this->db->table('users')
                        ->where('status', '=', 'active')
                        ->get()->pluck('mail');

                        // Extrai os e-mails dos usuários
                        $emails = $activeUsers->toArray(); // Converte a coleção em um array de e-mails

                        // Caminho do arquivo de log
                        $debugFile = 'a2.txt';

                        $emails2 = $activeUsers->toJson();

                        // Gera a mensagem de log com os e-mails (usando print_r para garantir a legibilidade do array)
                        $debugMessage =  $emails2;

                        // Log de entrada para verificar se a função foi chamada
                        file_put_contents($debugFile, $debugMessage, FILE_APPEND);

                        // Concatena os e-mails separados por vírgula
                        $recipients = implode(',', $emails);

                    } catch (\Exception $e) {
                        // Retorna erro caso algo dê errado
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Erro ao buscar usuários: ' . $e->getMessage()
                        ]);
                        return;
                    }
                }
                

                // Obter o ID do usuário
                if (session_status() === PHP_SESSION_NONE) {
                    session_start();
                }
                
                $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 29; // ou outro valor padrão

                // Salvar os dados na fila de e-mails
                $emailQueueId = $this->saveEmailQueue($user_id, $recipients, $ccList, $subject, $bodyContent, $attachments);

                // Iniciar o envio de e-mails
                $this->startEmailSending($emailQueueId);

                // Retornar uma resposta JSON ao cliente
                echo json_encode([
                    'status' => 'success',
                    'message' => 'E-mail enfileirado e envio iniciado.',
                    'emailQueueId' => $emailQueueId
                ]);
            } else {
                // Retornar erro caso não seja um POST
                echo json_encode([
                    'status' => 'error',
                    'message' => 'Requisição inválida.'
                ]);
            }
        }



        //função para teste de envio de e-mail
        public function email_loop()
        {
            //$allUsers = $this->db->table('users')->all(); // Retorna uma coleção de todos os usuários
            //print_r($allUsers->get(5)); // Acessa o usuário na posição de índice 5

            // Busca apenas a coluna 'mail' dos usuários ativos
            /*$activeEmails = $this->db->table('users')
                ->all(['status' => 'active'])
                ->map(function ($user) {
                    return $user['mail']; // Retorna apenas o campo 'mail'
                });*/

            /*$users = $this->db->table('users')
            ->limit(6) // Traz 6 registros (de 10 a 15, inclusive)
            ->offset(10) // Começa no registro 10
            ->all();

            print_r($users->toJson());*/


            echo '<pre>';
            
            $activeUsers = $this->db->table('users')
            ->where('status', '=', 'active')
            ->get()->pluck('mail');
            print_r($activeUsers->toJson());
        


            echo '<pre>';
        }



        // Função para iniciar o envio de e-mails
    public function startEmailSending($emailQueueId) {
        // Atualiza o status da fila de e-mails para 'enviando'
        $query = "UPDATE email_queue SET status = 'sending' WHERE id = :emailQueueId";
        $params = ['emailQueueId' => $emailQueueId];
        $this->db->query($query, $params);

        // Iniciar o envio (essa lógica pode ser processada em um loop)
        $this->sendEmailsFromQueue();
    }



    public function saveEmailQueue($user_id, $recipients, $ccList, $subject, $bodyContent, $attachments, $cancelFlag = 0) {
        // Modificando a query para incluir o cancel_flag
        $query = "INSERT INTO email_queue (user_id, recipients, cc_list, subject, body_content, attachments, cancel_flag) 
                  VALUES (:user_id, :recipients, :cc_list, :subject, :body_content, :attachments, :cancel_flag)";
        
        // Preparando os parâmetros para o binding
        $params = [
            'user_id' => $user_id,
            'recipients' => $recipients,
            'cc_list' => $ccList,
            'subject' => $subject,
            'body_content' => $bodyContent,
            'attachments' => json_encode($attachments), // Convertendo os anexos para JSON
            'cancel_flag' => $cancelFlag // Passando o valor de cancel_flag
        ];
        
        // Executando a query
        $stmt = $this->db->query($query, $params);
        
        // Obtendo o ID do e-mail inserido
        $emailQueueId = $this->db->lastInsertId(); // Usa o lastInsertId() para pegar o ID do último registro inserido
        return $emailQueueId;
    }
    
    


    // Função para enviar os e-mails da fila
    public function sendEmailsFromQueue() {
        // Seleciona todos os e-mails pendentes da fila
        $query = "SELECT * FROM email_queue WHERE status = 'sending' LIMIT 60"; // Limitar a 60 e-mails por vez
        $emails = $this->db->query($query)->fetchAll(\PDO::FETCH_ASSOC);
        
    
        foreach ($emails as $email) {
            if ($this->checkStopCondition()) {
                break; // Parar o envio se a condição de stop for atendida
            }
    
            // Processa o envio para cada destinatário individualmente
            $recipients = explode(',', $email['recipients']);  // Assume que os destinatários são separados por vírgula
            foreach ($recipients as $recipient) {
                $recipient = trim($recipient);  // Remover espaços extras
    
                // Enviar o e-mail individualmente
                $emailData = [
                    'recipient' => $recipient,
                    'cc_list' => $email['cc_list'],
                    'subject' => $email['subject'],
                    'body_content' => nl2br($email['body_content']),
                    'attachments' => $email['attachments']
                ];

                

    
                $this->sendEmail($emailData, $email['id']);
            }
    
            // Atualizando o status do e-mail para 'enviado' após tentar enviar
            $this->updateEmailStatus($email['id'], 'sent');
        }
    }
    

    // Função para verificar se o envio deve ser interrompido
    public function checkStopCondition() {
        // Verifica quantos e-mails foram enviados na última hora
        $query = "SELECT COUNT(*) AS sent_count FROM email_sent WHERE sent_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)";
        $result = $this->db->query($query)->fetch(\PDO::FETCH_ASSOC);
    
        // Se já enviamos 60 e-mails na última hora, retornamos true para parar
        if ($result['sent_count'] >= 60) {
            return true;
        }
        //return false;
        return false;
    }
    

    // Função para enviar o e-mail real
    public function sendEmail_OLD($email) {
        // Lógica de envio de e-mail real
        // Exemplo simples com a função mail do PHP
        mail($email['recipients'], $email['subject'], $email['body_content']);
    }

    // Função refatorada para enviar o e-mail
    public function sendEmail($emailData, $queueId) {
        //usuário da sessão atual
        $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
    
        // Obtendo os dados do e-mail
        $recipients = $emailData['recipient'];  // Destinatário(s)
        $ccList = $emailData['cc_list'];  // Lista de CC
        $subject = $emailData['subject'];  // Assunto do e-mail
        $bodyContent = $emailData['body_content'];  // Corpo do e-mail
        $attachments = $emailData['attachments'];  // Anexos (caso necessário)
    
        // A variável para o status de envio
        $emailSent = false;
    
        // Caso os destinatários sejam um array, vamos enviar para cada um separadamente.
        $recipientsArray = explode(',', $recipients);
    
        // Inicia o envio para cada destinatário
        foreach ($recipientsArray as $recipient) {
            // Verificar se o e-mail já foi enviado para esse destinatário
            if ($this->checkEmailAlreadySent($queueId, $recipient)) {
                // Se o e-mail já foi enviado, não tenta reenviar
                continue;
            }
    
            try {
                // Verificar a flag de cancelamento antes de continuar
                $query = "SELECT cancel_flag FROM email_queue WHERE id = :queueId";
                $params = ['queueId' => $queueId];
                $result = $this->db->query($query, $params)->fetch(\PDO::FETCH_ASSOC);
    
                // Se a flag de cancelamento estiver ativada, interrompe o envio
                if (isset($result['cancel_flag']) && $result['cancel_flag'] == 1) {
                    // Atualiza o status do e-mail como "cancelado"
                    $this->saveEmailSentHistory($queueId, $recipient, $subject, $bodyContent, 'cancelled', null, 1);
                    return false;  // Interrompe a execução
                }
    
                // Gerar o corpo do e-mail e anexos usando a função generateEmailBody
                $emailDataProcessed = $this->generateEmailBody($subject, $bodyContent, $user_id);
    
                // Verificar se o 'body' e 'attachments' existem no array
                $emailBody = isset($emailDataProcessed['body']) ? $emailDataProcessed['body'] : '';  // Corpo gerado
                $attachments = isset($emailDataProcessed['attachments']) && is_array($emailDataProcessed['attachments']) 
                    ? $emailDataProcessed['attachments'] 
                    : [];  // Garantir que seja um array
    
                // Mesclar os anexos, se houver
                $attachments = array_merge($attachments, $attachments);  // Isso ainda pode ser um bug se você estiver passando os anexos duas vezes
    
                // Envia o e-mail usando a função sendMailWithAttachments
                $emailSent = $this->sendMailWithAttachments($recipient, $emailBody, $attachments, $subject, $ccList);
    
                // Se o envio for bem-sucedido, salva o histórico
                if ($emailSent) {
                    // Evita sobrecarga no servidor
                    sleep(15);
    
                    $this->saveEmailSentHistory($queueId, $recipient, $subject, $bodyContent, 'sent', null, 0);
                }
            } catch (Exception $e) {
                // Se ocorrer um erro, salva a falha na tabela email_sent
                $this->saveEmailSentHistory($queueId, $recipient, $subject, $bodyContent, 'failed', $e->getMessage(), 0);
            }
        }
    
        // Retorna o status final do envio (true ou false)
        return $emailSent;
    }
    

    public function checkEmailAlreadySent($queueId, $recipient) {
        // Consulta para verificar se o e-mail já foi enviado para o destinatário
        $checkQuery = "SELECT COUNT(*) FROM email_sent WHERE email_queue_id = :queueId AND recipient = :recipient AND status = 'sent'";
        $checkParams = ['queueId' => $queueId, 'recipient' => $recipient];
        
        // Executa a consulta e retorna o resultado
        $existingEmail = $this->db->query($checkQuery, $checkParams)->fetchColumn();
        
        return $existingEmail > 0;  // Retorna true se o e-mail já foi enviado
    }
    
    
    
    public function saveEmailSentHistory($queueId, $recipient, $subject, $bodyContent, $status, $errorMessage = null, $cancelFlag = 0) {
        // Insere os dados de e-mail enviado ou falhado na tabela email_sent
        $query = "INSERT INTO email_sent (email_queue_id, recipient, subject, body_content, status, error_message, cancel_flag)
                  VALUES (:queue_id, :recipient, :subject, :body_content, :status, :error_message, :cancel_flag)";
        
        $stmt = $this->db->query($query, 
         [
            'queue_id' => $queueId,
            'recipient' => $recipient,
            'subject' => $subject,
            'body_content' => $bodyContent,
            'status' => $status,
            'error_message' => $errorMessage,
            'cancel_flag' => $cancelFlag // Agora inclui o cancel_flag na inserção
        ]);
    }
    
    
    
    


    // Função que gera o corpo do e-mail a partir do template
    function generateEmailBody($subject, $bodyContent, $user_id) {
        // Recuperar o tema do usuário
        $themeData = $this->getUserThemeData(29);  // Dados do usuário padrão
        $themeDataUser = $this->getUserThemeData($user_id);  // Dados do usuário que envia
        
        // Inicializa a lista de anexos
        $attachments = [];
    
        // Gerar o HTML da imagem de perfil
        // Para o perfil padrão
        $profileImageHTML = $this->generateProfileImageHTML($themeData['images']['profile_image'], 'profile-default-img');
        // Para o perfil do usuário que envia
        $profileImageHTMLUser = $this->generateProfileImageHTML($themeDataUser['images']['profile_image'], 'profile-user-img');
        
        // Preparar os anexos, incluindo a imagem de perfil
        $attachments[] = ['path' => $themeData['images']['profile_image']['path'], 'cid' => 'profile_image'];
    
        // Corpo do e-mail com estilo CSS e informações do administrador
        $emailTemplate = file_get_contents('App/Views/Mail/_layouts/mail.default.html'); // Carregar o template HTML padrão
        
		// Processar tokens de imagem inline no corpo do texto antes de inserir no template
		$bodyContentProcessed = $this->parseInlineImageTokens($bodyContent, $attachments);

		// Substituir variáveis no template
        $vars = [
            'subject' => $subject,
			'bodyContent' => nl2br($bodyContentProcessed),
            'profileImageHTMLUser' => $profileImageHTMLUser,
            'name' => $_SESSION['name'],
            'email' => $_SESSION['email'],
            'profileImageHTML' => $profileImageHTML
        ];
    
        // Substituir as variáveis do template
        $emailBody = $this->replaceVariables($emailTemplate, $vars);
    
        // Verificar imagens no corpo do e-mail (anexar imagens internas e manter links de imagens externas)
		$emailBody = preg_replace_callback('/<img[^>]+src=["\']([^"\']+)["\'][^>]*>/i', function($matches) use ($themeData, &$attachments) {
            $imageSrc = $matches[1];
    
			// Se já for um CID, não fazer nada
			if (stripos($imageSrc, 'cid:') === 0) {
				return $matches[0];
			}

            // Verificar se a imagem é externa (URL)
            if (filter_var($imageSrc, FILTER_VALIDATE_URL)) {
                // A imagem é externa, apenas retorna o HTML da imagem com a URL
                return $matches[0]; // Retorna o código HTML da imagem externa sem modificações
            } else {
				// A imagem é interna (armazenada na plataforma), então deve ser anexada ao e-mail
				$imagePath = isset($themeData['images'][$imageSrc]) ? $themeData['images'][$imageSrc] : $imageSrc; // Caminho
    
                // Verifica se o caminho da imagem é válido
                if (file_exists($imagePath)) {
                    // Adiciona a imagem como anexo
                    $attachments[] = [
                        'path' => $imagePath,
                        'cid' => $imageSrc // O CID pode ser utilizado para exibição correta no corpo do e-mail
                    ];
    
                    // Substitui o src da imagem para usar o CID
                    return preg_replace('/src=["\']([^"\']+)["\']/', 'src="cid:' . $imageSrc . '"', $matches[0]);
                }
            }
    
            // Retorna a tag de imagem sem modificações se não for encontrado um caminho válido
            return $matches[0];
        }, $emailBody);
    
        // Retorna o corpo do e-mail final, com anexos e links ajustados
        return [
            'body' => $emailBody,
            'attachments' => $attachments
        ];
    }

	/**
	 * Interpreta tokens do tipo {{img:/caminho/para/imagem.ext}} no corpo do texto,
	 * substitui por <img src="cid:..."> e adiciona o anexo correspondente.
	 *
	 * Regras de resolução de caminho:
	 * - Se iniciar com '/public/', será resolvido a partir da raiz do projeto.
	 * - Se iniciar com 'public/', idem.
	 * - Caso contrário, se for URL, mantém como está (não embute).
	 */
	private function parseInlineImageTokens(string $text, array &$attachments): string {
		$projectRoot = dirname(__DIR__, 2); // .../response_builder_old
		$pattern = '/\{\{\s*img\s*:\s*([^}]+)\s*\}\}/i';

		return preg_replace_callback($pattern, function ($matches) use (&$attachments, $projectRoot) {
			$raw = trim($matches[1]);
			// Suporta propriedades adicionais separadas por '|': {{img:/path|width:400|height:300|border-radius:5px|alt:Texto|class:rounded}}
			$parts = array_map('trim', explode('|', $raw));
			$rawPath = array_shift($parts);

			$stylePairs = [];
			$imgAttrs = ['alt' => null, 'class' => null];

			foreach ($parts as $part) {
				if ($part === '') { continue; }
				$kv = preg_split('/\s*[:=]\s*/', $part, 2);
				if (count($kv) !== 2) { continue; }
				[$key, $value] = $kv;
				$key = trim($key);
				$value = trim($value);

				// Atributos especiais
				if (strcasecmp($key, 'alt') === 0) {
					$imgAttrs['alt'] = $value;
					continue;
				}
				if (strcasecmp($key, 'class') === 0) {
					$imgAttrs['class'] = $value;
					continue;
				}
				if (strcasecmp($key, 'style') === 0) {
					// Aceita style bruto e mescla com demais propriedades
					$decls = array_filter(array_map('trim', explode(';', $value)), function($d){ return $d !== ''; });
					foreach ($decls as $decl) {
						$stylePairs[] = $decl;
					}
					continue;
				}

				// Converter números para px em propriedades comuns
				$pxProps = [
					'width','height','border-radius','margin','margin-top','margin-right','margin-bottom','margin-left',
					'padding','padding-top','padding-right','padding-bottom','padding-left','top','right','bottom','left',
					'font-size','line-height','letter-spacing','max-width','min-width','max-height','min-height'
				];
				if (in_array(strtolower($key), $pxProps, true) && preg_match('/^\d+$/', $value)) {
					$value .= 'px';
				}

				$stylePairs[] = $key . ':' . $value;
			}

			// Se for URL, não converter para CID; apenas retorna uma tag <img src="..."> com atributos
			if (filter_var($rawPath, FILTER_VALIDATE_URL)) {
				$styleAttr = count($stylePairs) ? ' style="' . htmlspecialchars(implode(';', $stylePairs), ENT_QUOTES, 'UTF-8') . '"' : '';
				$altAttr = $imgAttrs['alt'] !== null ? ' alt="' . htmlspecialchars($imgAttrs['alt'], ENT_QUOTES, 'UTF-8') . '"' : '';
				$classAttr = $imgAttrs['class'] !== null ? ' class="' . htmlspecialchars($imgAttrs['class'], ENT_QUOTES, 'UTF-8') . '"' : '';
				return '<img src="' . htmlspecialchars($rawPath, ENT_QUOTES, 'UTF-8') . '"' . $altAttr . $classAttr . $styleAttr . '>';
			}

			// Normalizar caminhos que apontam para a pasta public
			$normalized = $rawPath;
			if (strpos($normalized, '/public/') === 0) {
				$absolutePath = $projectRoot . $normalized; // já inclui '/public/...'
			} elseif (strpos($normalized, 'public/') === 0) {
				$absolutePath = $projectRoot . '/' . $normalized;
			} elseif ($normalized !== '' && $normalized[0] === '/') {
				$absolutePath = $projectRoot . $normalized;
			} else {
				$absolutePath = $projectRoot . '/' . $normalized;
			}

			// Se o caminho for um diretório, não é possível embutir; apenas ignora
			if ($absolutePath !== '' && is_dir($absolutePath)) {
				return '';
			}

			if ($absolutePath === '' || !file_exists($absolutePath)) {
				// Caminho inválido: mantém vazio para não quebrar o layout
				return '';
			}

			// Gerar um CID estável por caminho
			$cid = 'img_' . md5($absolutePath);

			// Evitar anexar duplicado (mesmo CID)
			$alreadyAdded = false;
			foreach ($attachments as $att) {
				if (isset($att['cid']) && $att['cid'] === $cid) {
					$alreadyAdded = true;
					break;
				}
			}
			if (!$alreadyAdded) {
				$attachments[] = [
					'path' => $absolutePath,
					'cid' => $cid
				];
			}

			$styleAttr = count($stylePairs) ? ' style="' . htmlspecialchars(implode(';', $stylePairs), ENT_QUOTES, 'UTF-8') . '"' : '';
			$altAttr = $imgAttrs['alt'] !== null ? ' alt="' . htmlspecialchars($imgAttrs['alt'], ENT_QUOTES, 'UTF-8') . '"' : '';
			$classAttr = $imgAttrs['class'] !== null ? ' class="' . htmlspecialchars($imgAttrs['class'], ENT_QUOTES, 'UTF-8') . '"' : '';
			return '<img src="cid:' . $cid . '"' . $altAttr . $classAttr . $styleAttr . '>';
		}, $text);
	}
    
    


    public function generateProfileImageHTML($imageData, $cssClass) {
        // Recupera os dados da imagem
        $imagePath = $imageData['path'];
        $imageType = $imageData['source_type']; // 'web' ou 'local'
    
        // Verificar se o tipo de imagem é 'web' ou 'local'
        if ($imageType === 'web') {
            // Se for uma imagem da web, usa o caminho direto
            return "<img src='{$imagePath}' alt='Perfil' class='{$cssClass}'>";
        } else {
            // Caso seja uma imagem local, utiliza o CID para incluir como anexo no e-mail
            return "<img src='cid:profile_image' alt='Perfil' class='{$cssClass}'>";
        }
    }
    
    

    // Função para atualizar o status do e-mail
    public function updateEmailStatus($emailQueueId, $status) {
        $query = "UPDATE email_queue SET status = :status WHERE id = :emailQueueId";
        $params = ['status' => $status, 'emailQueueId' => $emailQueueId];
        $this->db->query($query, $params);
    }

    
    public function getMailStatus() {
        // Opção 1: Busca por emails com qualquer status
        $query = "SELECT * FROM `email_sent` ORDER BY `id` DESC";
        $stmt = $this->db->query($query);
    
        $all_mails = $stmt->fetchAll(\PDO::FETCH_ASSOC);
    
        echo json_encode([
            'status' => 'success',
            'mails' => $all_mails
        ]);
    }
    
    


    /*

    

    // Função para inserir o histórico de envio de e-mail
    public function insertEmailHistory($emailQueueId, $status) {
        $query = "INSERT INTO email_history (email_queue_id, status) VALUES (:emailQueueId, :status)";
        $params = ['emailQueueId' => $emailQueueId, 'status' => $status];
        $this->db->query($query, $params);
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


        //fim dos envios de e-mail
        

    }//end Dbcontroller


*/    
    } //fim da classe
?>