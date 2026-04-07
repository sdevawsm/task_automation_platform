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


    
    class PlatformCommunityController extends Connection{

        public function getUsers() {
            if ($this->isAuthenticated("/getplatformusers")) {
                try {
                    // SQL para buscar as informações dos usuários e seus temas
                    $sql = "
                        WITH filtered_themes AS (
                            SELECT
                                aut.user_id,
                                aut.user_theme_id,
                                aut.source_url
                            FROM
                                active_user_themes aut
                            WHERE
                                aut.source_url = :source_url
                        )
                        SELECT
                            u.id AS user_id,
                            CONCAT(SUBSTRING_INDEX(u.name, ' ', 1), ' ', SUBSTRING_INDEX(SUBSTRING_INDEX(u.name, ' ', -2), ' ', -1)) AS user_name,
                            img1.file_path AS profile_image_path,
                            img1.new_file_name AS profile_image_name,
                            img1.source_type AS profile_image_source_type,
                            img1.source_url AS profile_image_source_url,
                            img2.file_path AS background_image_path,
                            img2.new_file_name AS background_image_name,
                            img2.source_type AS background_image_source_type,
                            img2.source_url AS background_image_source_url,
                            cs.primary_color,
                            cs.secondary_color,
                            cs.neutral_color,
                            cs.highlight_color,
                            cs.background_color,
                            cs.text_color,
                            f.font_family,
                            f.font_style,
                            f.font_weight,
                            ut.theme_mode,
                            ut.background_image_enabled,
                            ak.activation_key
                        FROM
                            users u
                        LEFT JOIN
                            filtered_themes ft ON u.id = ft.user_id
                        LEFT JOIN
                            user_themes ut ON ft.user_theme_id = ut.id
                        LEFT JOIN
                            images img1 ON ut.profile_image_id = img1.id
                        LEFT JOIN
                            images img2 ON ut.background_image_id = img2.id
                        LEFT JOIN
                            color_schemes cs ON ut.color_scheme_id = cs.id
                        LEFT JOIN
                            fonts f ON ut.font_id = f.id
                        LEFT JOIN
                            activation_keys ak ON u.id = ak.user_id
                        WHERE
                            ft.source_url = :source_url
                        OR
                            ft.source_url IS NULL
                    ";

                    $url = $this->db->getCleanedHost();
                    $stmt = $this->db->query($sql, ['source_url' => $url] );
                    $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
                    // Processa os resultados
                    foreach ($users as &$user) {
                        // Selo de verificação
                        $user['verification_seal'] = !empty($user['activation_key'])
                            ? $this->getUserVerificationSeal($user['activation_key'])
                            : null;
                    
                        // Caminho completo para a imagem de perfil
                        if (isset($user['profile_image_source_type'], $user['profile_image_name']) && $user['profile_image_source_type'] === 'web') {
                            $user['profile_image_url'] = rtrim($user['profile_image_source_url'], '/');
                        } else {
                            $user['profile_image_url'] = rtrim($user['profile_image_path'], '/') . '/' . ltrim($user['profile_image_name'], '/');
                        }
                    
                        // Caminho completo para a imagem de fundo
                        if (isset($user['background_image_source_type'], $user['background_image_name']) && $user['background_image_source_type'] === 'web') {
                            $user['background_image_url'] = rtrim($user['background_image_path'], '/');
                        } else {
                            $user['background_image_url'] = rtrim($user['background_image_path'], '/') . '/' . ltrim($user['background_image_name'], '/');
                        }
                    
                        // Garantir que não há barra final nas URLs finais
                        $user['profile_image_url'] = rtrim($user['profile_image_url'], '/');
                        $user['background_image_url'] = rtrim($user['background_image_url'], '/');
                    
                        // Remove chaves desnecessárias
                        unset(
                            $user['profile_image_path'], $user['profile_image_name'], $user['profile_image_source_type'], $user['profile_image_source_url'],
                            $user['background_image_path'], $user['background_image_name'], $user['background_image_source_type'], $user['background_image_source_url']
                        );
                    }
                    
                    // Retorna o JSON dos usuários
                    header('Content-Type: application/json; charset=utf-8');
                    if (count($users) > 0) {
                        echo json_encode($users, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES); // Adiciona JSON_UNESCAPED_SLASHES para evitar barras invertidas
                    } else {
                        echo json_encode(['message' => 'Nenhum usuário encontrado'], JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
                    }
                    
                    
                } catch (PDOException $e) {
                    echo json_encode(['error' => 'Erro ao buscar usuários: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
                }
            } else {
                echo json_encode(['message' => 'Unauthorized'], JSON_UNESCAPED_UNICODE);
            }
        }
        

        public function getUsersLogs(){
            if ($this->isAuthenticated("/getplatformlogs")) {

                $role = $_SESSION['role'];
                $offset = isset($_GET['offset']) ? filter_var($_GET['offset'], FILTER_SANITIZE_NUMBER_INT) : 0;

                if($role == "admin" || $role == "dev"){
                    try {
                         
                        // SQL para buscar as informações dos usuários e seus temas
                        $sql = "SELECT l.action, l.date, l.time, u.name FROM `logs` l, `users` u WHERE l.user_id = u.id ORDER by l.date desc, l.time desc limit 20 OFFSET $offset; ";
                    
                        $stmt = $this->db->query($sql);
                        $logs = $stmt->fetchAll(\PDO::FETCH_ASSOC);
            
                        // Retorna o JSON dos usuários
                        header('Content-Type: application/json; charset=utf-8');
                        if (count($logs) > 0) {
                            echo json_encode($logs, JSON_UNESCAPED_UNICODE);
                        } else {
                            echo json_encode(['message' => 'Nenhum usuário encontrado'], JSON_UNESCAPED_UNICODE);
                        }
                    } catch (PDOException $e) {
                        echo json_encode(['error' => 'Erro ao buscar usuários: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
                    }
                }
            } else {
                echo json_encode(['message' => 'Unauthorized'], JSON_UNESCAPED_UNICODE);
            }
        }
        

        
    }//end Dbcontroller
?>