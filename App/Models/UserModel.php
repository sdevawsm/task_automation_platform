<?php

namespace App\Models;

use DateTime;

class UserModel {

    private $db;
    
    public function __construct($db) {
        $this->db = $db;
    }

    public function isAuthenticated($currentPath = "/") {
        if (isset($_SESSION['user']) && isset($_SESSION['pass'])) {
            date_default_timezone_set('America/Fortaleza');


            return $this->authenticate($_SESSION['user'], $_SESSION['pass']);

            $deviceSignature = ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown') . '|' . ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');

            // Verifica se há sessão ativa para este usuário
            $sql = "SELECT device_signature FROM sessions WHERE user_id = (
                        SELECT id FROM users WHERE (user = ? OR mail = ?) AND password = md5(?)
                    )";
            $stmt = $this->db->query($sql, [$_SESSION['user'], $_SESSION['user'], $_SESSION['pass']]);
            $session = $stmt->fetch(\PDO::FETCH_ASSOC);

            if ($session) {
                if ($session['device_signature'] === $deviceSignature) {
                    // Sessão válida para este dispositivo
                    return $this->authenticate($_SESSION['user'], $_SESSION['pass']);
                } else {
                    // Sessão foi sobrescrita por outro computador
                    session_destroy(); // Opcional: limpa sessão local
                    header("Location: /"); // Redireciona para home
                    exit;
                }
            }
        }

        return false;
    }



    public function isActivated() {
        // Verifica se o usuário está autenticado
        if (isset($_SESSION['user']) && isset( $_SESSION['pass'])  ) {
            return $this->activated($_SESSION['user_id']);
        } else {
            return false;
        }
    }

    public function authenticate($username, $password) {
        $serverDomain = $_SERVER['HTTP_HOST'] ?? 'unknown-server';
        date_default_timezone_set('America/Fortaleza');
    
        $deviceSignature = ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown') . '|' . ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
        $limiteTempo = date('Y-m-d H:i:s', time() - 7200); // 6 horas
    
        // 🔥 Remove sessões inativas
        $sql = "DELETE FROM sessions WHERE login_time < ?";
        $this->db->query($sql, [$limiteTempo]);
    
        // 🔐 Verifica usuário
        $sql = "SELECT * FROM users WHERE (user = ? OR mail = ?) AND password = md5(?) AND status = 'active'";
        $stmt = $this->db->query($sql, [$username, $username, $password]);
        $user = $stmt->fetch(\PDO::FETCH_ASSOC);
    
        if (!$user) {
            return ['status' => 'error', 'message' => 'Credenciais inválidas'];
        }
    
        $userId = $user['id'];

        // 🔑 Obtém credenciais do ADM
        $sql = "SELECT c.user, c.name, c.pass FROM adm_credencials c WHERE user_id = ? LIMIT 1";
        $stmt = $this->db->query($sql, [$userId]);
        $admCredenciais = $stmt->fetch(\PDO::FETCH_ASSOC);

        if (!$admCredenciais) {
            $admCredenciais = [
                'user' => 'nouser',
                'name' => 'noname',
                'pass' => 'nopass'
            ];
        }
    
        // 🔍 Verifica todas as sessões ativas do usuário
        // $sql = "SELECT * FROM sessions WHERE user_id = ?";
        // $stmt = $this->db->query($sql, [$userId]);
        // $sessions = $stmt->fetchAll(\PDO::FETCH_ASSOC);
    
        // if (count($sessions) > 1) {
        //     return [
        //         'status' => 'error',
        //         'message' => 'Mais de uma sessão ativa detectada para este usuário',
        //         'sessions' => $sessions
        //     ];
        // }
    
        // 🧮 Verifica limite de sessões por servidor
        $sql = "SELECT COUNT(*) FROM sessions WHERE server_domain = ?";
        $stmt = $this->db->query($sql, [$serverDomain]);
        $sessionCount = $stmt->fetchColumn();
    
        if ($sessionCount >= 7 && empty($sessions)) {
            return ['status' => 'error', 'message' => 'Limite de sessões atingido para este servidor'];
        }
    
        // 💾 Salva nova sessão
        $agora = date('Y-m-d H:i:s');
        $sql = "INSERT INTO sessions (user_id, server_domain, login_time, device_signature)
                VALUES (?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE login_time = ?, device_signature = ?";
        $this->db->query($sql, [$userId, $serverDomain, $agora, $deviceSignature, $agora, $deviceSignature]);
    
         return ['status' => 'success', 'user' => $user, 'adm' => $admCredenciais ];
        //return ['status' => 'success', 'user' => $user];
    }
    




    
    

    /*public function updateStatus($id){
        try {
            $query = "UPDATE `users` SET `status` = 'active' WHERE id = ?";
            $stmt = $this->db->query($query, [$id]);
        } catch (PDOException $Exception) {
            echo $Exception->getMessage();
            echo (int)$Exception->getCode();
        }
    }*/



    public function activated($user_id) {
        // Busca a chave de ativação do usuário
        $sql = "SELECT activation_key FROM activation_keys WHERE user_id = ?";
        $stmt = $this->db->query($sql, [$user_id]);
        $result = $stmt->fetch(\PDO::FETCH_ASSOC);
    
        if ($result) {
            $encryptedKey = $result['activation_key'];
            $secretKey = "peitinho"; // A mesma chave usada para criptografar
    
            // Descriptografa a chave de ativação
            $decodedData = base64_decode($encryptedKey);
            $iv = substr($decodedData, 0, 16); // Extrai o IV dos primeiros 16 bytes
            $encryptedData = substr($decodedData, 16); // O restante são os dados criptografados
    
            // Descriptografa os dados
            $jsonData = openssl_decrypt($encryptedData, 'aes-128-cbc', $secretKey, 0, $iv);
            $data = json_decode($jsonData, true);


            // $filePath = 'dados.json';
            // $file = fopen($filePath, 'w');

            // if (fwrite($file, json_encode($data, JSON_PRETTY_PRINT)) === false) { 
            //     die('Erro ao escrever no arquivo.'); 
            // }

            // fclose($file);
    
            // Verifica se a data de expiração e a data final de ativação estão dentro do permitido
            if (isset($data['expires_at'], $data['final_activation_date'])) {
                $currentDate = new DateTime();
                $expirationDate = new DateTime($data['expires_at']);
                $finalActivationDate = new DateTime($data['final_activation_date']);
    
                if ( $finalActivationDate >= $currentDate) {
                    // Armazena o selo de verificação na sessão
                    if ($data['verification_seal'] == 'golden') {
                        $_SESSION['verification_seal'] = '#FFD700';
                        $_SESSION['verification_type'] = $data['verification_seal'];

                    } elseif ($data['verification_seal'] == 'blue') {
                        $_SESSION['verification_seal'] = '#3498DB';
                        $_SESSION['verification_type'] = $data['verification_seal'];
                    }elseif ($data['verification_seal'] == 'green') {
                        $_SESSION['verification_seal'] = '#0cba2f';
                        $_SESSION['verification_type'] = $data['verification_seal'];
                    } 
                    else {
                        $_SESSION['verification_seal'] = 'none';
                        $_SESSION['verification_type'] = $data['verification_seal'];
                    }
                    
                    $formattedFinalActivationDate = $finalActivationDate->format('d/m/Y');
                    $_SESSION['final_activation_date'] = $formattedFinalActivationDate;
    
                    return true; // Retorna true se a chave não expirou e está dentro do período ativo
                } else {
                    return false;
                }
            }
        }
        
        return false; // Retorna false se não houver chave ou se a chave estiver expirada ou fora do período permitido
    }
    
    


    public function logout() {
        if (isset($_SESSION['user']) && isset($_SESSION['pass'])) {
            date_default_timezone_set('America/Fortaleza');
    
            $deviceSignature = ($_SERVER['HTTP_USER_AGENT'] ?? 'unknown') . '|' . ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');
    
            // Busca o ID do usuário
            $sql = "SELECT id FROM users WHERE (user = ? OR mail = ?) AND password = md5(?)";
            $stmt = $this->db->query($sql, [$_SESSION['user'], $_SESSION['user'], $_SESSION['pass']]);
            $user = $stmt->fetch(\PDO::FETCH_ASSOC);
    
            if ($user) {
                $userId = $user['id'];
    
                // Remove a sessão específica do dispositivo
                $sql = "DELETE FROM sessions WHERE user_id = ? AND device_signature = ?";
                $this->db->query($sql, [$userId, $deviceSignature]);
            }
        }
    
        // Limpa sessão local
        session_destroy();
    
        // Redireciona para home
        //header("Location: /");
        //exit;
    }
    

}

?>
