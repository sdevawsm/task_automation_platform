<?php

    namespace App\Controllers;

    use App\Connection;
    
    class PlatformSettingsController extends Connection{
        //updateplatformsettings
        //applyplatformsettings
        //getplatformsettings


        public function GetPlatformSettings(){
            if( $this->isAuthenticated("/getplatformsettings") ){
                //echo(json_encode('getplatformsettings', JSON_UNESCAPED_UNICODE ) );
           
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $sql = "SELECT * FROM `platform_settings` WHERE `user_id` = $user_id";

                $result_query = $this->db->query($sql);
                $profile = $result_query->fetchAll(\PDO::FETCH_ASSOC);

                if( sizeof($profile) === 0){
                    $this->ApplyPlatformSettings($user_id);
                    $result_query = $this->db->query($sql);
                    $profile = $result_query->fetchAll(\PDO::FETCH_ASSOC);
                    header('Content-Type: application/json; charset=utf-8');
                    print_r(json_encode($profile, JSON_UNESCAPED_UNICODE ) ); 
                }else{
                    $result_query = $this->db->query($sql);
                    $profile = $result_query->fetchAll(\PDO::FETCH_ASSOC);
                    header('Content-Type: application/json; charset=utf-8');
                    print_r(json_encode($profile, JSON_UNESCAPED_UNICODE ) );   
                }    
            }
        }

        public function ApplyPlatformSettings($user_id){
            if( $this->isAuthenticated("/applyplatformsettings") ){
                $chatStatus = 'disable';
                $textModelStatus = 'enable';
                $sql = "INSERT INTO platform_settings VALUES(DEFAULT, $user_id, '$chatStatus', '$textModelStatus')";
                $this->db->query($sql);
            }
        }

        public function UpdatePlatformSettings($col = '', $value = ''){
            if( $this->isAuthenticated("/updateplatformsettings") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $value ;
                $key;

                foreach ($_POST as $chave => $valor) {
                    switch ($chave) {
                        case "chat_status":
                            $sql = "UPDATE `platform_settings` SET `chat_status` = '$valor' WHERE `user_id` = $user_id ";
                            break;
                        default:
                            print_r(json_encode( false, JSON_UNESCAPED_UNICODE ) ); 
                            // Lógica para lidar com chaves desconhecidas (se necessário)
                            break;
                    }
                }

                if(true) {
                    if ( $this->db->query($sql) ){
                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode($sql, JSON_UNESCAPED_UNICODE ) );   
                    } else {
                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode(false, JSON_UNESCAPED_UNICODE ) );      
                    }
                }else{
                    header('Content-Type: application/json; charset=utf-8');
                    echo(json_encode(false, JSON_UNESCAPED_UNICODE ) ); 
                }

            }
        }


        public function TextModelScriptStore(){
            if ($this->isAuthenticated("/updateplatformsettings")) {
                if (!isset($_SESSION['user_id']) || !isset($_POST['status'])) {
                    http_response_code(400);
                    echo(json_encode(['status' => 'error', 'message' => 'Dados incompletos ou usuário não autenticado!'], JSON_UNESCAPED_UNICODE));
                    return;
                }
        
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $default_script_models = $_POST['status'];
        
                $allowed_status = ['enable', 'disable'];
                if (in_array($default_script_models, $allowed_status, true)) {
                    $sql = "UPDATE `platform_settings` SET `default_script_models` = ? WHERE `user_id` = ?";
        
                    if ($this->db->query($sql, [$default_script_models, $user_id])) {
                        echo(json_encode(['status' => 'success', 'message' => 'Valor alterado com sucesso!'], JSON_UNESCAPED_UNICODE));
                    } else {
                        http_response_code(500);
                        echo(json_encode(['status' => 'error', 'message' => 'Valor não alterado!'], JSON_UNESCAPED_UNICODE));
                    }
                } else {
                    http_response_code(400);
                    echo(json_encode(['status' => 'error', 'message' => 'Valor não permitido!'], JSON_UNESCAPED_UNICODE));
                }
            }
        }
        


        public function UploadImageMisc(){
            if( $this->isAuthenticated("/imagemisc") ){
                try {
                    // Verificar se o arquivo foi enviado
                    if (!isset($_FILES['image']) || $_FILES['image']['error'] !== UPLOAD_ERR_OK) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'error', 
                            'message' => 'Nenhum arquivo foi enviado ou erro no upload.'
                        ], JSON_UNESCAPED_UNICODE);
                        return;
                    }

                    $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                    $uploadedFile = $_FILES['image'];
                    $originalName = filter_var($_POST['original_name'] ?? $uploadedFile['name'], FILTER_SANITIZE_STRING);
                    $category = filter_var($_POST['category'] ?? 'misc', FILTER_SANITIZE_STRING);
                    $description = filter_var($_POST['description'] ?? '', FILTER_SANITIZE_STRING);

                    // Validar tipo de arquivo
                    $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
                    $fileInfo = finfo_open(FILEINFO_MIME_TYPE);
                    $mimeType = finfo_file($fileInfo, $uploadedFile['tmp_name']);
                    finfo_close($fileInfo);

                    if (!in_array($mimeType, $allowedTypes)) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'error', 
                            'message' => 'Tipo de arquivo não permitido. Apenas JPG, JPEG, PNG e GIF são aceitos.'
                        ], JSON_UNESCAPED_UNICODE);
                        return;
                    }

                    // Validar tamanho do arquivo (máximo 5MB)
                    $maxSize = 5 * 1024 * 1024; // 5MB
                    if ($uploadedFile['size'] > $maxSize) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'error', 
                            'message' => 'Arquivo muito grande. Tamanho máximo permitido: 5MB.'
                        ], JSON_UNESCAPED_UNICODE);
                        return;
                    }

                    // Definir diretório de destino
                    $targetDir = 'App/src/images/misc/';
            
                    // Criar diretório se não existir
                    if (!is_dir($targetDir)) {
                        if (!mkdir($targetDir, 0755, true)) {
                            header('Content-Type: application/json; charset=utf-8');
                            echo json_encode([
                                'status' => 'error', 
                                'message' => 'Erro ao criar diretório de destino.'
                            ], JSON_UNESCAPED_UNICODE);
                            return;
                        }
                    }

                    // Obter extensão do arquivo
                    $pathInfo = pathinfo($originalName);
                    $extension = strtolower($pathInfo['extension'] ?? '');
            
                    // Validar extensão
                    $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                    if (!in_array($extension, $allowedExtensions)) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'error', 
                            'message' => 'Extensão de arquivo não permitida. Apenas jpg, jpeg, png e gif são aceitos.'
                        ], JSON_UNESCAPED_UNICODE);
                        return;
                    }

                    // Gerar nome único para o arquivo
                    $newFileName = uniqid() . '_' . time() . '_' . mt_rand(1000, 9999) . '.' . $extension;
                    $targetPath = $targetDir . $newFileName;

                    // Mover arquivo para o diretório de destino
                    if (move_uploaded_file($uploadedFile['tmp_name'], $targetPath)) {
                
                        // Salvar informações no banco de dados
                        $imageId = $this->saveImageToDatabase(
                            $user_id, 
                            $originalName, 
                            $newFileName, 
                            $targetDir, 
                            $category, 
                            $description
                        );

                        if ($imageId) {
                            header('Content-Type: application/json; charset=utf-8');
                            echo json_encode([
                                'status' => 'success',
                                'message' => 'Imagem enviada com sucesso!',
                                'data' => [
                                    'image_id' => $imageId,
                                    'original_name' => $originalName,
                                    'new_file_name' => $newFileName,
                                    'file_path' => $targetPath,
                                    'category' => $category,
                                    'file_size' => $uploadedFile['size'],
                                    'mime_type' => $mimeType
                                ]
                            ], JSON_UNESCAPED_UNICODE);
                        } else {
                            // Se falhou ao salvar no banco, remover arquivo
                            unlink($targetPath);
                            header('Content-Type: application/json; charset=utf-8');
                            echo json_encode([
                                'status' => 'error', 
                                'message' => 'Erro ao salvar informações da imagem no banco de dados.'
                            ], JSON_UNESCAPED_UNICODE);
                        }

                    } else {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'error', 
                            'message' => 'Erro ao mover arquivo para o diretório de destino.'
                        ], JSON_UNESCAPED_UNICODE);
                    }

                } catch (Exception $e) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode([
                        'status' => 'error', 
                        'message' => 'Erro interno: ' . $e->getMessage()
                    ], JSON_UNESCAPED_UNICODE);
                }
            } else {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode([
                    'status' => 'error', 
                    'message' => 'Usuário não autenticado.'
                ], JSON_UNESCAPED_UNICODE);
            }
        }

        private function saveImageToDatabase($user_id, $originalName, $newFileName, $filePath, $category, $description) {
            try {
                // SQL ajustado para usar apenas os campos que existem na tabela images
                $sql = "INSERT INTO images (
                    user_id, 
                    image_type, 
                    original_file_name, 
                    new_file_name, 
                    file_path, 
                    source_url, 
                    source_type, 
                    application_name
                ) VALUES (
                    :user_id, 
                    :image_type, 
                    :original_file_name, 
                    :new_file_name, 
                    :file_path, 
                    :source_url, 
                    :source_type, 
                    :application_name
                )";

                $params = [
                    'user_id' => $user_id,
                    'image_type' => 'local',
                    'original_file_name' => $originalName,
                    'new_file_name' => $newFileName,
                    'file_path' => $filePath,
                    'source_url' => $_SESSION['user'] ?? 'misc_upload', // Usando source_url como identificador
                    'source_type' => 'local',
                    'application_name' => $category
                ];

                $stmt = $this->db->query($sql, $params);
        
                if ($stmt) {
                    return $this->db->lastInsertId();
                }
        
                return false;

            } catch (Exception $e) {
                error_log("Erro ao salvar imagem no banco: " . $e->getMessage());
                return false;
            }
        }

        // Função adicional para listar imagens misc do usuário
        public function GetImagesMisc() {
            if( $this->isAuthenticated("/getimagesmisc") ){
                try {
                    $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
            
                    $sql = "SELECT 
                                id,
                                original_file_name,
                                new_file_name,
                                file_path,
                                application_name as category,
                                source_url,
                                source_type,
                                CONCAT(file_path, new_file_name) as full_path
                            FROM images 
                            WHERE user_id = :user_id 
                            AND application_name = 'misc' 
                            ORDER BY id DESC";

                    $stmt = $this->db->query($sql, ['user_id' => $user_id]);
                    $images = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode([
                        'status' => 'success',
                        'data' => $images,
                        'count' => count($images)
                    ], JSON_UNESCAPED_UNICODE);

                } catch (Exception $e) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode([
                        'status' => 'error', 
                        'message' => 'Erro ao buscar imagens: ' . $e->getMessage()
                    ], JSON_UNESCAPED_UNICODE);
                }
            }
        }

        // Função para deletar imagem misc
        public function DeleteImageMisc() {
            if( $this->isAuthenticated("/deleteimagesmisc") ){
                try {
                    $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                    $image_id = filter_var($_POST['image_id'] ?? 0, FILTER_SANITIZE_NUMBER_INT);

                    if (!$image_id) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'error', 
                            'message' => 'ID da imagem não fornecido.'
                        ], JSON_UNESCAPED_UNICODE);
                        return;
                    }

                    // Buscar informações da imagem
                    $sql = "SELECT file_path, new_file_name FROM images 
                            WHERE id = :image_id AND user_id = :user_id AND application_name = 'misc'";
            
                    $stmt = $this->db->query($sql, [
                        'image_id' => $image_id,
                        'user_id' => $user_id
                    ]);
            
                    $image = $stmt->fetch(\PDO::FETCH_ASSOC);

                    if (!$image) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'error', 
                            'message' => 'Imagem não encontrada.'
                        ], JSON_UNESCAPED_UNICODE);
                        return;
                    }

                    // Deletar arquivo físico
                    $fullPath = $image['file_path'] . $image['new_file_name'];
                    if (file_exists($fullPath)) {
                        unlink($fullPath);
                    }

                    // Deletar registro do banco
                    $deleteSql = "DELETE FROM images WHERE id = :image_id AND user_id = :user_id";
                    $deleteStmt = $this->db->query($deleteSql, [
                        'image_id' => $image_id,
                        'user_id' => $user_id
                    ]);

                    if ($deleteStmt) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'success',
                            'message' => 'Imagem deletada com sucesso!'
                        ], JSON_UNESCAPED_UNICODE);
                    } else {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode([
                            'status' => 'error', 
                            'message' => 'Erro ao deletar imagem do banco de dados.'
                        ], JSON_UNESCAPED_UNICODE);
                    }

                } catch (Exception $e) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode([
                        'status' => 'error', 
                        'message' => 'Erro ao deletar imagem: ' . $e->getMessage()
                    ], JSON_UNESCAPED_UNICODE);
                }
            }
        }



        public function updateAdmCredentials() {
            // Define o timezone para Fortaleza
            date_default_timezone_set('America/Fortaleza');
        
            if ($this->isAuthenticated("/settings")) {
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                // $user_id = 30;
    
                $new_user = filter_var($_GET['new_user'] ?? '', FILTER_SANITIZE_STRING);
                $new_pass = filter_var($_GET['new_pass'] ?? '', FILTER_SANITIZE_STRING);
                $new_name = filter_var($_GET['new_name'] ?? '', FILTER_SANITIZE_STRING);
        
                // Verifica se todos os campos foram preenchidos
                if (empty($new_user) || empty($new_pass) || empty($new_name)) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode( ['status' => 'error', 'message' => 'Todos os campos são obrigatórios'], JSON_UNESCAPED_UNICODE);
                    return;
                }
        
                $created_at = date('Y-m-d H:i:s');
                $updated_at = date('Y-m-d H:i:s');
        
                $sql = "INSERT INTO adm_credencials (user_id, user, pass, name, created_at, updated_at)
                        VALUES (?, ?, ?, ?, ?, ?)
                        ON DUPLICATE KEY UPDATE
                            user = VALUES(user),
                            pass = VALUES(pass),
                            name = VALUES(name),
                            updated_at = VALUES(updated_at)";
        
                $success = $this->db->query($sql, [$user_id, $new_user, $new_pass, $new_name, $created_at, $updated_at]);
         
        
                header('Content-Type: application/json; charset=utf-8');
                if ($success) {

                    $_SESSION['admUser'] = $new_user;
                    $_SESSION['admName'] = $new_name;
                    $_SESSION['admPass'] = $new_pass;

                    echo json_encode(['status' => 'success',  'message' => 'Credenciais atualizadas com sucesso'], JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar credenciais'], JSON_UNESCAPED_UNICODE);
                }
            }
        }

        public function alterAdmCredentials() {
    
            $sql = "ALTER TABLE adm_credencials ADD UNIQUE (user_id);";
    
            $success = $this->db->query($sql);
     
    
            header('Content-Type: application/json; charset=utf-8');
            if ($success) {
                echo json_encode(['status' => 'success',  'message' => 'Tabela atualizada com sucesso'], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar tabela'], JSON_UNESCAPED_UNICODE);
            }
        
        }


        public function deleteAdmCredentials() {
    
            $sql = "DELETE FROM adm_credencials WHERE id > 0";
    
            $success = $this->db->query($sql);
     
    
            header('Content-Type: application/json; charset=utf-8');
            if ($success) {
                echo json_encode(['status' => 'success',  'message' => 'Credenciais deletadas com sucesso'], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Erro ao deletar credenciais'], JSON_UNESCAPED_UNICODE);
            }
        
        }

        
    }//end Clas

 



?>