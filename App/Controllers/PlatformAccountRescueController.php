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


    
    class PlatformAccountRescueController extends Connection{
        public function RescueAccount(){
            
            $vars = ['title' => "Recuperação de conta"];
            $components = array();
            $this->Render("Layout2", "Index/ResetMail", $vars, $components);     
            

        }//end reset mail

        public function NewPasswordAccount(){
            if(  $_SESSION['portifolio'] ){
                $token =   filter_var($_GET['token'], FILTER_SANITIZE_STRING);

                if($this->isValidToken($token)){
                    $vars = ['title' => "Alteração de senha"];
                    $components = array();
                    $this->Render("Layout2", "Index/RecoverAccount", $vars, $components);  
                }else{
                    $vars = ['title' => "Recuperação de conta"];
                    $components = array();
                    $this->Render("Layout2", "Index/ResetMail", $vars, $components);     
                }
            }else{
                header("Location: /");
            }

        }//end reset mail


        function CreateTeam(){
            echo(json_encode('criado equipe', JSON_UNESCAPED_UNICODE ) );  
        }

        function recover() {
            // Recuperar o token da requisição
            $token = filter_var($_POST['token'], FILTER_SANITIZE_STRING);
            $new_password = filter_var($_POST['new_password'], FILTER_SANITIZE_STRING);
        
            // Validar o token e permitir a alteração da senha
            if ($this->isValidToken($token)) {
                if ($this->updatePassword($token, $new_password)) {
                    echo(json_encode(['status'=>'success','message' => 'Senha alterada com sucesso!'], JSON_UNESCAPED_UNICODE));
                } else {
                    echo(json_encode(['status'=> 'error', 'message'=> 'Erro! Tente colocar uma senha diferente.'], JSON_UNESCAPED_UNICODE));
                }
            } else {
                echo(json_encode(['error' => 'Token inválido!'], JSON_UNESCAPED_UNICODE));
            }
        }
        
        // Função que verifica se o token é válido
        private function isValidToken($token) {
            // SQL para buscar o token no banco de dados e verificar a expiração
            $sql = "SELECT * FROM password_resets WHERE token = ? AND expiry > NOW()";
            // Executar a query passando o token como parâmetro
            $result =  $this->db->query($sql, [$token]);
            // Verificar se o token foi encontrado e ainda é válido
            if ($result && $result->rowCount() > 0) {
                return true; // Token válido
            }
            return false; // Token inválido ou expirado
        }
        
        // Função que atualiza a senha do usuário
        private function updatePassword($token, $new_password) {
            // Lógica para atualizar a senha do usuário no banco de dados
            //$hashedPassword = password_hash($new_password, PASSWORD_BCRYPT); alterar a senha para esse metodo

            // Lógica para atualizar a senha do usuário no banco de dados
            $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
            $hashedPassword = md5($new_password);
            $sql = "UPDATE users SET password = ? WHERE id = ?";
            $result = $this->db->query($sql, [$hashedPassword, $user_id]);

            // Verificar se a atualização foi bem-sucedida
            if ($result && $result->rowCount() > 0) {
                return true;  // Senha foi atualizada com sucesso
            }
            return false;  // Falha ao atualizar a senha
        }


        function getRescueLink3() {
            $email = filter_var($_POST['user_or_mail'], FILTER_SANITIZE_STRING);
            $token = $this->generateToken();
            $isTokenSaved = $this->saveToken($email, $token);
        
            // Obter o esquema (http ou https) e o host (domínio ou localhost)
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
            $host = $_SERVER['HTTP_HOST'];
            
            // Montar a URI completa
            $uri = $protocol . '://' . $host;
        
            // Recupera o tema ativo do usuário
            $themeData = $this->getUserThemeData('29');
        
            // Cabeçalho e rodapé personalizados
            $header = "<div style='background-color: #007bff; color: white; padding: 10px; text-align: center;'>
                            <h1>Recuperação de Senha</h1>
                       </div>";
        
            $footer = "<div style='background-color: #007bff; color: white; padding: 10px; text-align: center;'>
                            <p>&copy; 2024 Silvadevbr. Todos os direitos reservados.</p>
                       </div>";
        
            // Corpo do e-mail com estilo CSS e informações do administrador
            $body = "
            <html>
                <head>
                    <style>
                        .email-body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            background-color: #f4f4f4;
                            padding: 20px;
                            border: 1px solid #ddd;
                        }
                        .email-body a {
                            color: #1a73e8;
                            text-decoration: none;
                        }
                        .admin-card {
                            margin-top: 20px;
                            padding: 10px;
                            border: 1px solid #ddd;
                            border-radius: 5px;
                            background-color: #fff;
                            text-align: center;
                        }
                        .admin-card img {
                            border-radius: 50%;
                            width: 80px;
                            height: 80px;
                        }
                        .admin-card .admin-name {
                            margin: 10px 0;
                            font-size: 16px;
                            font-weight: bold;
                        }
                        .admin-card .admin-socials a {
                            margin: 0 5px;
                            text-decoration: none;
                            color: #1a73e8;
                        }
                    </style>
                </head>
                <body>
                    $header
                    <div class='email-body'>
                        <p>Clique no link abaixo para recuperar sua senha:</p>
                        <a href='{$uri}/newpasswordaccount?token={$token}'>Recuperar Senha</a>
                        <div class='admin-card'>
                            <img src='{$themeData['images']['profile_image']['path']}' alt='Perfil do Administrador'>
                            <div class='admin-name'>Dione Silva - Desenvolvedor</div>
                            <div class='admin-socials'>
                                <a href='youtube.com/@followthebits01'>Youtube</a>
                                <a href='https://www.instagram.com/silvadevbr'>Instagram</a>
                                <!-- <a href='#'>LinkedIn</a> -->
                            </div>
                        </div>
                    </div>
                    $footer
                </body>
            </html>";
        
            if($isTokenSaved){
                $this->send_mail($email, $body);
            } else {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'error', 'message' => 'token não salvo'], JSON_UNESCAPED_UNICODE);
            }
        }
        

        function getRescueLink2() {
            $email = filter_var($_POST['user_or_mail'], FILTER_SANITIZE_STRING);
            $token = $this->generateToken();
            $isTokenSaved = $this->saveToken($email, $token);
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
            $host = $_SERVER['HTTP_HOST'];
            $uri = $protocol . '://' . $host;
        
            $image_url = $uri . "/caminho/para/sua/imagem.jpg";  // URL da sua imagem
        
            $body = "
            <html>
                <head>
                    <style>
                        .email-body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            background-color: #f4f4f4;
                            padding: 20px;
                            border: 1px solid #ddd;
                        }
                        .email-body a {
                            color: #1a73e8;
                            text-decoration: none;
                        }
                    </style>
                </head>
                <body>
                    <div class='email-body'>
                        <h2>Recuperação de Senha</h2>
                        <p>Clique no link abaixo para recuperar sua senha:</p>
                        <a href='{$uri}/newpasswordaccount?token={$token}'>Recuperar Senha</a>
                        <br><br>
                        <img src='{$image_url}' alt='Descrição da Imagem'>
                    </div>
                </body>
            </html>";
        
            if($isTokenSaved){
                $this->send_mail($email, $body);
            } else {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'error', 'message' => 'token não salvo'], JSON_UNESCAPED_UNICODE);
            }
        }

        

        //Gerar um token:
        function generateToken() {
            return bin2hex(random_bytes(50));
        }
        

        //Salvar o token no banco de dados com uma data de expiração:
        function saveToken($email, $token) {
            // Definir a expiração para meia hora a partir do momento atual
            $expiry = date('Y-m-d H:i:s', strtotime('+30 minutes'));
            // Preparar a query para inserir o token no banco de dados
            $sql = "INSERT INTO password_resets (email, token, expiry) VALUES (?, ?, ?)";
            // Executar a query e verificar se foi bem-sucedida
            $result = $this->db->query($sql, [$email, $token, $expiry]);
            // Verificar se a inserção foi bem-sucedida (rowCount retorna o número de linhas afetadas)
            if ($result && $result->rowCount() > 0) {
                return true;  // Token foi salvo com sucesso
            }
            return false;  // Falha ao salvar o token
        }

        //Verificar o token na página de redefinição:
        function verifyToken($token) {
            // Supondo que você tenha uma conexão com o banco de dados $conn
            $stmt = $conn->prepare("SELECT email FROM password_resets WHERE token = ? AND expiry > NOW()");
            $stmt->bind_param('s', $token);
            $stmt->execute();
            $result = $stmt->get_result();
        
            if ($result->num_rows > 0) {
                return $result->fetch_assoc()['email'];
            } else {
                return false;
            }
        }


        
        function getRescueLink() {
            $email = filter_var($_POST['user_or_mail'], FILTER_SANITIZE_STRING);
            $token = $this->generateToken();
            $isTokenSaved = $this->saveToken($email, $token);
        
            // Obter o esquema (http ou https) e o host (domínio ou localhost)
            $protocol = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] === 'on' ? 'https' : 'http';
            $host = $_SERVER['HTTP_HOST'];
            
            // Montar a URI completa
            $uri = $protocol . '://' . $host;
        
            // Recupera o tema ativo do usuário
            $themeData = $this->getUserThemeData('29');
        
            // Cabeçalho e rodapé personalizados
            $header = "<div style='background-color: #6200ee; color: white; padding: 20px; text-align: center; border-radius: 10px;'>
                            <h1>Recuperação de Senha</h1>
                       </div>";
        
            $footer = "<div style='background-color: #6200ee; color: white; padding: 20px; text-align: center; border-radius: 10px;'>
                            <p>&copy; 2024 Silvadevbr. Todos os direitos reservados.</p>
                       </div>";
        
            // Corpo do e-mail com estilo CSS e informações do administrador
            $body = "
            <html>
                <head>
                    <style>
                        .email-body {
                            font-family: Arial, sans-serif;
                            color: #333;
                            background-color: #f4f4f4;
                            padding: 20px;
                            border: 1px solid #ddd;
                            border-radius: 10px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        }
                        .highlight {
                            background-color: #6200ee;
                            color: #fff;
                            padding: 10px;
                            border-radius: 10px;
                            font-weight: bold;
                            display: inline-block;
                            margin: 20px 0;
                            text-align: center;
                        }
                        .email-body a {
                            color: #fff;
                            text-decoration: none;
                            font-size: 18px;
                            display: inline-block;
                            margin: 10px 0;
                            padding: 10px 20px;
                            border-radius: 10px;
                            background-color: #6200ee;
                        }
                        .admin-card {
                            margin-top: 20px;
                            padding: 20px;
                            border: 1px solid #ddd;
                            border-radius: 20px;
                            background-color: rgba(255, 255, 255, 0.8);
                            text-align: center;
                            backdrop-filter: blur(10px);
                        }
                        .admin-card img {
                            border-radius: 50%;
                            width: 100px;
                            height: 100px;
                            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
                        }
                        .admin-card .admin-name {
                            margin: 10px 0;
                            font-size: 18px;
                            font-weight: bold;
                            color: #6200ee;
                        }
                        .admin-card .admin-socials {
                            margin-top: 10px;
                        }
                        .admin-card .admin-socials a {
                            margin: 0 10px;
                            text-decoration: none;
                            color: #fff;
                            display: inline-flex;
                            align-items: center;
                        }
                        .admin-card .admin-socials svg {
                            width: 30px;
                            height: 30px;
                            margin-right: 8px;
                        }
                    </style>
                </head>
                <body>
                    $header
                    <div class='email-body'>
                        <p>Clique no link abaixo para recuperar sua senha:</p>
                        <a href='{$uri}/newpasswordaccount?token={$token}' class='highlight'>Recuperar Senha</a>
                        <div class='admin-card'>
                            <img src='cid:profile_image' alt='Perfil do Administrador'>
                            <div class='admin-name'>Dione Silva - Desenvolvedor</div>
                            <div class='admin-socials '>
                                <a href='https://www.youtube.com/@followthebits01'>
                                    <svg xmlns='http://www.w3.org/2000/svg'   width='16' height='16' fill='currentColor' class='bi bi-youtube' viewBox='0 0 16 16'>
                                    <path d='M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z'/>
                                    </svg>
                                    YouTube
                                </a>
                                <a href='https://www.instagram.com/silvadevbr'>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' class='bi bi-instagram' viewBox='0 0 16 16'>
                                        <path d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334'/>
                                    </svg>
                                    Instagram
                                </a>
                            </div>
                        </div>
                    </div>
                    $footer
                </body>
            </html>";
        
            if ($isTokenSaved) {
                // Preparar os anexos
                $attachments = [
                    ['path' => $themeData['images']['profile_image']['path'], 'cid' => 'profile_image'],
                    // Adicione mais anexos aqui, se necessário
                ];
                
                // Enviar o e-mail com a função send_mail
                $this->send_mail_with_attachments($email, $body, $attachments);
            } else {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'error', 'message' => 'token não salvo'], JSON_UNESCAPED_UNICODE);
            }
        }
        
        
        
        public function send_mail_with_attachments(string $d_email, string $d_body, array $attachments) {
            // Limpa a saída do buffer (caso haja algo antes)
            ob_clean();
            
            header('Content-Type: application/json'); // Adiciona o cabeçalho JSON
            try {
                $mail = new PHPMailer(true);
                $mail->CharSet = 'UTF-8';
                // Configurações do servidor SMTP
                $mail->isSMTP();
                $mail->Host       = 'smtp.gmail.com';
                $mail->SMTPAuth   = true;
                $mail->Username   = 'silvadevbr.recovery@gmail.com';
                $mail->Password   = 'mmpxctgyxdkeaxuq ';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port       = 465;
        
                // Configuração dos destinatários
                $mail->setFrom('silvadevbr.recovery@gmail.com', '@silvadevbr - Recuperação de senha!');
                $mail->addAddress($d_email, $d_email);
        
                // Anexar os arquivos
                foreach ($attachments as $attachment) {
                    if (isset($attachment['cid'])) {
                        $mail->AddEmbeddedImage($attachment['path'], $attachment['cid']);
                    } else {
                        $mail->addAttachment($attachment['path']);
                    }
                }
        
                // Conteúdo do e-mail
                $mail->isHTML(true);
                $mail->Subject = 'Recuperação de senha!';
                $mail->Body    = $d_body;
        
                // Envia o e-mail
                $mail->send();
                
                // Retorna JSON de sucesso
                echo json_encode(['status' => 'success', 'message' => 'Link enviado com sucesso!'], JSON_UNESCAPED_UNICODE);
            } catch (Exception $e) {
                // Retorna JSON de erro
                echo json_encode(['status' => 'error', 'message' => $mail->ErrorInfo], JSON_UNESCAPED_UNICODE);
            }
        }
        


        // public function send_mail(string $d_email, string $d_body) {
        //     // Limpa a saída do buffer (caso haja algo antes)
        //     ob_clean();
            
        //     header('Content-Type: application/json'); // Adiciona o cabeçalho JSON
        //     try {
        //         $mail = new PHPMailer(true);
        //         $mail->CharSet = 'UTF-8';
        //         // Configurações do servidor SMTP
        //         $mail->isSMTP();
        //         $mail->Host       = 'smtp.gmail.com';
        //         $mail->SMTPAuth   = true;
        //         $mail->Username   = 'testeplanilha53@gmail.com';
        //         $mail->Password   = 'vmzbkynpecnrzgrl';
        //         $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
        //         $mail->Port       = 465;
        
        //         // Configuração dos destinatários
        //         $mail->setFrom('ncctools.recovery@gmail.com', 'SDEVBr - Recuperação de senha!');
        //         $mail->addAddress($d_email, $d_email);
        
        //         // Conteúdo do e-mail
        //         $mail->isHTML(true);
        //         $mail->Subject = 'Recuperação de senha!';
        //         $mail->Body    = $d_body;
        
        //         // Envia o e-mail
        //         $mail->send();
                
        //         // Retorna JSON de sucesso
        //         echo json_encode(['status' => 'success', 'message' => 'Link enviado com sucesso!'], JSON_UNESCAPED_UNICODE);
        //     } catch (Exception $e) {
        //         // Retorna JSON de erro
        //         echo json_encode(['status' => 'error', 'message' => $mail->ErrorInfo], JSON_UNESCAPED_UNICODE);
        //     }
        // } 


        function sendStyledEmail($email) {
            $mail = new PHPMailer(true);
        
            try {
                // Configurações do servidor
                $mail->isSMTP();
                $mail->Host = 'smtp.example.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'seu-email@example.com';
                $mail->Password = 'sua-senha';
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;
        
                // Remetente e destinatário
                $mail->setFrom('seu-email@example.com', 'Nome do Remetente');
                $mail->addAddress($email);
        
                // Conteúdo do e-mail
                $mail->isHTML(true);
                $mail->Subject = 'E-mail Personalizado';
                $mail->Body = '
                    <html>
                    <head>
                        <style>
                            .header {
                                background-color: #f8f8f8;
                                padding: 20px;
                                text-align: center;
                            }
                            .content {
                                padding: 20px;
                                font-family: Arial, sans-serif;
                            }
                            .button {
                                display: inline-block;
                                padding: 10px 20px;
                                margin: 20px 0;
                                text-decoration: none;
                                color: #ffffff;
                                background-color: #007bff;
                                border-radius: 5px;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="header">
                            <h1>Bem-vindo!</h1>
                            <img src="https://via.placeholder.com/150" alt="Logo">
                        </div>
                        <div class="content">
                            <p>Obrigado por se cadastrar. Clique no botão abaixo para verificar seu e-mail:</p>
                            <a href="https://seusite.com/verify" class="button">Verificar E-mail</a>
                        </div>
                    </body>
                    </html>';
        
                $mail->send();
                echo 'E-mail enviado com sucesso';
            } catch (Exception $e) {
                echo "Erro ao enviar e-mail: {$mail->ErrorInfo}";
            }
        }
    

        
        

    }//end Dbcontroller
?>