<?php
    namespace App\Controllers;

    use App\Connection;

    use DateTime;



    class ActivationController extends Connection{

        public function Activate(){            
            if( $this->isAuthenticated("/login") ){
                $vars = ['title' => "Ativação"];
                $components = array();
                $this->Render("Layout2", "Index/Activate", $vars, $components);     
            }else{
                header("Location: /");
            }
        }//end  Setting


        function SaveActivationKey() {
            if ($this->isAuthenticated("/login")) {
                $key = filter_var($_POST["activation_key"], FILTER_SANITIZE_STRING);
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
        
                // Valida a chave de ativação
                $validate = $this->ValidateActivationKey($key);
        
                // Verifica se a validação falhou
                if (isset($validate['status']) && $validate['status'] == 'error' ) {
                    echo json_encode($validate, JSON_UNESCAPED_UNICODE);
                    return; // Sai da função se a validação falhar
                }
        
                // Verifica se a chave de ativação já está sendo usada por outro usuário
                $checkSql = "SELECT user_id FROM activation_keys WHERE activation_key = :activation_key AND user_id != :user_id";
                $checkStmt = $this->db->query($checkSql, ['activation_key' => $key, 'user_id' => $user_id]);
                $existingKeyUser = $checkStmt->fetchColumn();
        
                if ($existingKeyUser) {
                    // Se a chave estiver sendo usada por outro usuário, retornar erro
                    echo json_encode(['status' => 'error', 'message' => 'Esta chave de ativação já está sendo utilizada por outro usuário.'], JSON_UNESCAPED_UNICODE);
                } else {
                    // Verifica se o usuário atual já possui uma chave de ativação
                    $checkUserSql = "SELECT activation_key FROM activation_keys WHERE user_id = :user_id";
                    $checkUserStmt = $this->db->query($checkUserSql, ['user_id' => $user_id]);
                    $existingKey = $checkUserStmt->fetchColumn();
        
                    if ($existingKey) {
                        // Atualiza a chave existente
                        $updateSql = "UPDATE activation_keys SET activation_key = :activation_key, updated_at = NOW() WHERE user_id = :user_id";
                        $updateStmt = $this->db->query($updateSql, ['activation_key' => $key, 'user_id' => $user_id]);
        
                        if ($updateStmt->rowCount() == 1) {
                            echo json_encode(['status' => 'success', 'message' => 'Chave de ativação atualizada com sucesso.'], JSON_UNESCAPED_UNICODE);
                        } else {
                            echo json_encode(['status' => 'error', 'message' => 'Falha ao atualizar a chave de ativação.'], JSON_UNESCAPED_UNICODE);
                        }
                    } else {
                        // Salva uma nova chave se não existir
                        $sql = "INSERT INTO activation_keys (user_id, activation_key, created_at, updated_at) VALUES (:user_id, :activation_key, NOW(), NOW())";
                        $stmt = $this->db->query($sql, ['user_id' => $user_id, 'activation_key' => $key]);
        
                        if ($stmt->rowCount() == 1) {
                            echo json_encode(['status' => 'success', 'message' => 'Chave de ativação salva com sucesso.'], JSON_UNESCAPED_UNICODE);
                        } else {
                            echo json_encode(['status' => 'error', 'message' => 'Falha ao salvar a chave de ativação.'], JSON_UNESCAPED_UNICODE);
                        }
                    }
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Unauthorized'], JSON_UNESCAPED_UNICODE);
            }
        }
        
        
        
        function GenerateActivationKeys() {
            if ($this->isAuthenticated("/login")) {
                $numberOfKeys = isset($_POST["number_of_keys"]) ? (int)$_POST["number_of_keys"] : 1;
                $expiration_at = isset($_POST["expiration_at"]) ? (string)$_POST["expiration_at"] : '+30 minutes';
                $verification_seal = isset($_POST["verification_seal"]) ? (string)$_POST["verification_seal"] : 'none';
                $final_activation_date = isset($_POST["final_activation_date"]) ? (string)$_POST["final_activation_date"] : '+5 days';
                
                $keys = [];
                $secretKey = "peitinho"; // Deve ser armazenada de forma segura
        
                for ($i = 0; $i < $numberOfKeys; $i++) {
                    $creationDate = new DateTime();
                    $expirationDate = (clone $creationDate)->modify($expiration_at);
                    $finalActivationDate = (clone $creationDate)->modify($final_activation_date);
                    
                    // Dados da chave
                    $data = [
                        'created_at' => $creationDate->format('Y-m-d H:i:s'),
                        'expires_at' => $expirationDate->format('Y-m-d H:i:s'),
                        'final_activation_date' => $finalActivationDate->format('Y-m-d H:i:s'),
                        'verification_seal' => $verification_seal
                    ];
        
                    // Serializa os dados para JSON
                    $jsonData = json_encode($data);
        
                    // Gera um IV aleatório de 16 bytes
                    $iv = openssl_random_pseudo_bytes(16);
        
                    // Criptografa com AES-128
                    $encryptedData = openssl_encrypt($jsonData, 'aes-128-cbc', $secretKey, 0, $iv);
        
                    // Converte para base64 para reduzir o tamanho
                    $base64Key = base64_encode($iv . $encryptedData); // Armazena o IV junto com os dados criptografados
                    $keys[] = $base64Key;
                }
        
                echo(json_encode($keys, JSON_UNESCAPED_UNICODE));
            } else {
                echo(json_encode(['error' => 'Unauthorized'], JSON_UNESCAPED_UNICODE));
            }
        }
        
        
        
        
        
        
        
        
        

    }//end Settings


?>