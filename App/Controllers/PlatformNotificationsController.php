<?php

    namespace App\Controllers;

    use App\Connection;
    
    class PlatformNotificationsController extends Connection{
        function getUnreadNotifications(){
            if ($this->isAuthenticated("/notifications")) {
                // Ler e decodificar os dados JSON enviados
                $data = json_decode(file_get_contents('php://input'), true);
            
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $last_id = filter_var($data['last_id'], FILTER_SANITIZE_NUMBER_INT); // Obter o último ID recebido

                $url = $this->db->getCleanedHost();
            
                $sql = "SELECT 
                    n.id,
                    n.title,
                    n.message,
                    n.created_at,
                    u.name AS user_name,
                    u.role AS user_role,
                    u.id AS user_id,
                    CONCAT(i.profile_image_path) AS user_image -- Usa apenas o caminho completo da imagem
                FROM 
                    notifications n
                LEFT JOIN 
                    users u ON n.created_by = u.id
                LEFT JOIN 
                    (
                        SELECT 
                            ut.user_id,
                            CONCAT(pi.file_path, '/', pi.new_file_name) AS profile_image_path,
                            ut.source_url
                        FROM 
                            user_themes ut
                        LEFT JOIN 
                            images pi ON ut.profile_image_id = pi.id -- Relacionamento para a imagem de perfil
                    ) AS i ON u.id = i.user_id AND i.source_url = ? -- Relaciona user_themes e valida source_url
                LEFT JOIN 
                    read_notifications rn ON n.id = rn.notification_id AND rn.user_id = ?
                WHERE 
                    (n.notification_type = 'all' OR n.user_id = ?) -- Inclui notificações globais ou destinadas ao usuário
                    AND rn.notification_id IS NULL 
                    AND n.source <> 'ncctools' -- Somente notificações não lidas
                ORDER BY 
                    n.created_at DESC 
                LIMIT 15;";


                $stmt = $this->db->query($sql, [$url, $user_id, $user_id]);
                $notifications = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['status' => 'success', 'notifications' => $notifications], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Unauthorized'], JSON_UNESCAPED_UNICODE);
            }
        }

        public function getAllNotifications() {
            if ($this->isAuthenticated("/notifications")) {
                // Obter o ID do usuário autenticado e sanitizá-lo
                $userId = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $userRole = filter_var($_SESSION['role'], FILTER_SANITIZE_STRING); // Variável renomeada para maior clareza
        
                // SQL para buscar notificações específicas do usuário ou globais
                $sql = "SELECT * FROM `notifications`";
        
                // Chamar a função query que já realiza o bind dos parâmetros
                $stmt = $this->db->query($sql);
                $notifications = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
                // Adicionar o papel (role) ao JSON retornado
                foreach ($notifications as &$notification) {
                    $notification['userRole'] = $userRole; // Inclui a role no retorno
                }
        
                // Retornar as notificações como JSON
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['status' => 'success', 'notifications' => $notifications], JSON_UNESCAPED_UNICODE);
            } else {
                // Caso o usuário não esteja autenticado
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['status' => 'error', 'message' => 'Unauthorized'], JSON_UNESCAPED_UNICODE);
            }
        }
        
        
        
        
        
        function markNotificationsAsRead() {
            if ($this->isAuthenticated("/notifications")) {
                // Ler os dados de entrada
                $data = json_decode(file_get_contents('php://input'), true);
        
                // Sanitizar os IDs do usuário e das notificações
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $notification_ids = array_map('intval', $data['notification_ids']); // Sanitizar cada ID
        
                // Contador de notificações lidas
                $count = 0;
        
                // Preparar a inserção para cada notificação, se ela ainda não estiver marcada como lida e existir
                foreach ($notification_ids as $notification_id) {
                    // Verificar se a notificação existe na tabela notifications
                    $existsSql = "SELECT COUNT(*) FROM notifications WHERE id = ?";
                    $existsStmt = $this->db->query($existsSql, [$notification_id]);
                    $exists = $existsStmt->fetchColumn();
        
                    if ($exists > 0) { // Somente processa notificações existentes
                        // Verificar se a notificação já foi marcada como lida pelo usuário
                        $checkSql = "SELECT COUNT(*) FROM read_notifications WHERE notification_id = ? AND user_id = ?";
                        $checkStmt = $this->db->query($checkSql, [$notification_id, $user_id]);
                        $alreadyRead = $checkStmt->fetchColumn();
        
                        if ($alreadyRead == 0) {
                            // Inserir a notificação na tabela read_notifications
                            $sql = "INSERT INTO read_notifications (notification_id, user_id, read_at) VALUES (?, ?, NOW())";
                            $stmt = $this->db->query($sql, [$notification_id, $user_id]);
                            if ($stmt->rowCount() > 0) {
                                $count++;
                            }
                        }
                    }
                }
        
                // Retornar o resultado do processamento
                if ($count > 0) {
                    echo json_encode(['status' => 'success', 'message' => 'Notificações marcadas como lidas.']);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Nenhuma notificação foi marcada como lida.']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Usuário não autenticado.'], JSON_UNESCAPED_UNICODE);
            }
        }
        
        
        

        function saveNotification() {
            if ($this->isAuthenticated("/notifications")) {
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $source = "sdevtools";
        
                // Verificar se a solicitação usa o método POST
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    // Obter e filtrar os dados enviados via POST
                    $title = isset($_POST['title']) ? filter_var($_POST['title'], FILTER_UNSAFE_RAW) : null;
                    $message = isset($_POST['message']) ? filter_var($_POST['message'], FILTER_UNSAFE_RAW) : null;
                    $notification_for = isset($_POST['notification_for']) ? filter_var($_POST['notification_for'], FILTER_SANITIZE_STRING) : null;
                    $target_user_id = isset($_POST['target_user_id']) ? filter_var($_POST['target_user_id'], FILTER_SANITIZE_NUMBER_INT) : null;
        
                    // Validar os campos obrigatórios
                    if ($message && $notification_for) {
                        // Determinar o tipo de notificação
                        $notification_type = ($notification_for === 'id' && $target_user_id) ? 'id' : 'all';
        
                        // Inserir a notificação na tabela `notifications`
                        $sql = "INSERT INTO notifications (title,message, notification_type, source, created_by, user_id, created_at, updated_at) VALUES (?,?, ?, ?, ?, ?, NOW(), NOW())";
                        $stmt = $this->db->query($sql, [$title, $message, $notification_type, $source, $user_id, $target_user_id]);
        
                        // Verificar se a inserção foi bem-sucedida
                        if ($stmt->rowCount() == 1) {
                            echo json_encode(['status' => 'success', 'message' => 'Notificação salva com sucesso.']);
                        } else {
                            echo json_encode(['status' => 'error', 'message' => 'Falha ao salvar a notificação.']);
                        }
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Dados incompletos fornecidos.']);
                    }
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Unauthorized']);
            }
        }
        
        

        function deleteNotification() {
            if ($this->isAuthenticated("/notifications")) {
                // Obter o ID do usuário autenticado e o papel
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $userRole = filter_var($_SESSION['role'], FILTER_SANITIZE_STRING); // Variável renomeada para maior clareza
        
                // Verificar se o método da solicitação é POST
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    // Obter e filtrar os dados enviados via POST
                    $notification_id = isset($_POST['id']) ? filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT) : null;
        
                    // Verificar se o papel do usuário é 'admin' ou 'dev'
                    if ($userRole === 'admin' || $userRole === 'dev') {
                        if ($notification_id) {
                            try {
                                // Excluir primeiro as referências na tabela read_notifications
                                $sqlReadNotifications = "DELETE FROM `read_notifications` WHERE `notification_id` = :notification_id";
                                $this->db->query($sqlReadNotifications, ['notification_id' => $notification_id]);
        
                                // Excluir a notificação na tabela notifications
                                $sqlNotifications = "DELETE FROM `notifications` WHERE `id` = :notification_id";
                                $stmt = $this->db->query($sqlNotifications, ['notification_id' => $notification_id]);
        
                                // Verificar se alguma notificação foi excluída
                                if ($stmt->rowCount() > 0) {
                                    echo json_encode(['status' => 'success', 'message' => 'Notificação excluída com sucesso.']);
                                } else {
                                    echo json_encode(['status' => 'error', 'message' => 'Nenhuma notificação encontrada para exclusão.']);
                                }
                            } catch (Exception $e) {
                                // Tratamento de erros durante a execução do SQL
                                echo json_encode(['status' => 'error', 'message' => 'Erro ao excluir a notificação: ' . $e->getMessage()]);
                            }
                        } else {
                            echo json_encode(['status' => 'error', 'message' => 'ID de notificação inválido ou ausente.']);
                        }
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Usuário não autorizado a excluir notificações.']);
                    }
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Usuário não autenticado.']);
            }
        }
        


        function updateNotification() {
            if ($this->isAuthenticated("/notifications")) {
                // Obter o papel do usuário e verificar autorização
                $userRole = filter_var($_SESSION['role'], FILTER_SANITIZE_STRING); // Papel do usuário ('admin' ou 'dev')
        
                // Permitir atualização apenas para administradores ou desenvolvedores
                if ($userRole === 'admin' || $userRole === 'dev') {
                    // Verificar se o método é POST
                    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                        // Capturar os dados diretamente do POST
                        $notification_id = isset($_POST['id']) ? filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT) : null;
                        $title = isset($_POST['title']) ? filter_var($_POST['title'], FILTER_SANITIZE_STRING) : null;
                        $message = isset($_POST['message']) ? filter_var($_POST['message'], FILTER_SANITIZE_STRING) : null;
        
                        // Verificar se os campos obrigatórios estão presentes
                        if ($notification_id && $title && $message) {
                            try {
                                // Atualizar a notificação no banco de dados
                                $sql = "UPDATE notifications SET title = :title, message = :message, updated_at = NOW() WHERE id = :id";
                                $stmt = $this->db->query($sql, [
                                    'id' => $notification_id,
                                    'title' => $title,
                                    'message' => $message,
                                ]);
        
                                // Verificar se a atualização foi bem-sucedida
                                if ($stmt->rowCount() > 0) {
                                    echo json_encode(['status' => 'success', 'message' => 'Notificação atualizada com sucesso.']);
                                } else {
                                    echo json_encode(['status' => 'error', 'message' => 'Nenhuma notificação encontrada para atualizar ou os dados não foram alterados.']);
                                }
                            } catch (Exception $e) {
                                // Tratamento de erros durante a execução do SQL
                                echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar a notificação: ' . $e->getMessage()]);
                            }
                        } else {
                            echo json_encode(['status' => 'error', 'message' => 'Dados inválidos ou incompletos para atualização.']);
                        }
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Método não permitido.']);
                    }
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Usuário não autorizado a atualizar notificações.']);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Usuário não autenticado.']);
            }
        }
        
        




    }//end Dbcontroller




?>