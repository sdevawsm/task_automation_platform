<?php
    namespace App\Controllers;

    use App\Connection;

    class ProfileController extends Connection
    {


        function setUser() {
            

            if ($this->isAuthenticated("/settings")) {
                $role = $_SESSION['role'];
        
                if (in_array($role, ["admin", "dev", "user"])) {
                    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
                    $mail = filter_var($_POST['mail'], FILTER_SANITIZE_EMAIL);
                    $pass = filter_var($_POST['pass'], FILTER_SANITIZE_STRING);
                    $user = filter_var($_POST['user'], FILTER_SANITIZE_STRING);
                    $status = 'active'; // ou qualquer valor padrão que você precise
                    $config = NULL; // exemplo de configuração padrão
                    $tags_enable = 1; // ou qualquer valor padrão que você precise
                    $role = filter_var($_POST['role'], FILTER_SANITIZE_STRING);
        
                    $hashedPass = md5($pass); // Hash da senha
        
                    // Verificação de usuário e e-mail duplicados
                    $checkSQL = "SELECT COUNT(*) FROM `users` WHERE `user` = ? OR `mail` = ?";
                    $checkStmt = $this->db->query($checkSQL, [$user, $mail]);

                    header('Content-Type: application/json');
                    if ($checkStmt->fetchColumn() > 0) {
                        
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Usuário ou e-mail já cadastrado'
                        ], JSON_UNESCAPED_UNICODE);
                        return;
                    }
        
                    $sql = "INSERT INTO `users` (`status`, `role`, `name`, `user`, `password`, `mail`, `config`, `tags_enable`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
                    $stmt = $this->db->query($sql, [$status, $role, $name, $user, $hashedPass, $mail, $config, $tags_enable]);
        
                    
                    if ($stmt->rowCount() > 0) {
                        error_log("Falha ao inserir usuário");
                        echo json_encode([
                            'status' => 'success',
                            'message' => 'Usuário inserido com sucesso'
                        ], JSON_UNESCAPED_UNICODE);
                    } else {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Falha ao inserir usuário'
                        ], JSON_UNESCAPED_UNICODE);
                    }
                }
            }
        }


        function getUsers() {
            $role = $_SESSION['role'];
        
            if ($this->isAuthenticated("/settings")) {
                if (in_array($role, ["admin", "dev", "user"])) {
                    try {
                        $sql = "SELECT * FROM `users` ORDER BY id DESC";
                        $stmt = $this->db->query($sql);
                        
                        header('Content-Type: application/json; charset=utf-8');
                        
                        if ($stmt->rowCount() > 0) {
                            $all_users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                            echo json_encode([
                                'status' => 'success',
                                'data' => $all_users
                            ], JSON_UNESCAPED_UNICODE);
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'message' => 'Erro ao obter dados'
                            ], JSON_UNESCAPED_UNICODE);
                        }
                    } catch (Exception $e) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Erro ao executar a consulta: ' . $e->getMessage()
                        ], JSON_UNESCAPED_UNICODE);
                    }
                }
            }
        }

        function getFonts(){
            $role = $_SESSION['role'];
        
            if ($this->isAuthenticated("/settings")) {
                if (in_array($role, ["admin", "dev", "user"])) {
                    try {
                        $sql = "SELECT * FROM `fonts` where scope ='global' ";
                        $stmt = $this->db->query($sql);
                        
                        header('Content-Type: application/json; charset=utf-8');
                        
                        if ($stmt->rowCount() > 0) {
                            $all_fonts = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                            echo json_encode([
                                'status' => 'success',
                                'data' => $all_fonts
                            ], JSON_UNESCAPED_UNICODE);
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'message' => 'Erro ao obter dados'
                            ], JSON_UNESCAPED_UNICODE);
                        }
                    } catch (Exception $e) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Erro ao executar a consulta: ' . $e->getMessage()
                        ], JSON_UNESCAPED_UNICODE);
                    }
                }
            }
        }

        function getColorSchemes(){
            $role = $_SESSION['role'];
        
            if ($this->isAuthenticated("/settings")) {
                if (in_array($role, ["admin", "dev", "user"])) {
                    try {
                        $sql = "SELECT * FROM `color_schemes` where scope ='global' ";
                        $stmt = $this->db->query($sql);
                        
                        header('Content-Type: application/json; charset=utf-8');
                        
                        if ($stmt->rowCount() > 0) {
                            $all_fonts = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                            echo json_encode([
                                'status' => 'success',
                                'data' => $all_fonts
                            ], JSON_UNESCAPED_UNICODE);
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'message' => 'Erro ao obter dados'
                            ], JSON_UNESCAPED_UNICODE);
                        }
                    } catch (Exception $e) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Erro ao executar a consulta: ' . $e->getMessage()
                        ], JSON_UNESCAPED_UNICODE);
                    }
                }
            }
        }


        public function updateFont(){
            if( $this->isAuthenticated("/userprofile") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $source_url = $this->db->getCleanedHost();

                $sql = "UPDATE user_themes SET font_id = ?  WHERE  user_id =  ? AND  source_url = ? ";

                $font = filter_var($_POST['font'], FILTER_SANITIZE_STRING);
                $stmt = $this->db->query($sql, [$font, $user_id, $source_url ]);
                
                //theme_status', 'dark'
                if ($stmt->rowCount() > 0) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode(['message' => 'Alterado modo de thema'], JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['message' => 'Não alterado modo de tema'], JSON_UNESCAPED_UNICODE);
                    //echo json_encode(['message' => 'Category already exists'], JSON_UNESCAPED_UNICODE);
                }
            }
        }

        public function updateColorScheme(){
            if( $this->isAuthenticated("/userprofile") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $source_url = $this->db->getCleanedHost();

                $sql = "UPDATE user_themes SET color_scheme_id = ?  WHERE  user_id =  ? AND  source_url = ? ";

                $scheme = filter_var($_POST['color_scheme'], FILTER_SANITIZE_STRING);
                $stmt = $this->db->query($sql, [$scheme, $user_id, $source_url ]);
                
                //theme_status', 'dark'
                if ($stmt->rowCount() > 0) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode(['message' => 'Alterado modo de thema'], JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['message' => 'Não alterado modo de tema'], JSON_UNESCAPED_UNICODE);
                    //echo json_encode(['message' => 'Category already exists'], JSON_UNESCAPED_UNICODE);
                }
            }
        }


        public function update(){      
            //print_r(json_encode($_POST['name'].'ret', JSON_UNESCAPED_UNICODE ) );    

            if( $this->isAuthenticated("/create") ){

                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $value;
                $key;
                $date = date("Y-m-d");
                $time = date("H:i:s");   

                foreach ($_POST as $chave => $valor) {
                    switch ($chave) {
                        case "status":
                            $sql = "UPDATE `users` SET `status` = ? WHERE id = ?";
                            $value = $valor;
                            $key = $chave;
                            break;
                        case "role":
                            $sql = "UPDATE `users` SET `role` = ? WHERE id = ?";
                            $value = $valor;
                            $key = $chave;
                            break;
                        case "name":
                            $sql = "UPDATE `users` SET `name` = ? WHERE id = ?";
                            $value = $valor;
                            $key = $chave;
                            break;
                        case "user":

                            $checkSQL = "SELECT COUNT(*) FROM `users` WHERE `user` = ? AND `id` != ?";
                            $checkStmt = $this->db->query($checkSQL,[$valor, $user_id]);

                            if ($checkStmt->fetchColumn()  > 0) {
                                echo json_encode([
                                    'status' => 'error',
                                    'message' => 'Usuário já está cadastrado'
                                ], JSON_UNESCAPED_UNICODE);
                                return;
                            }

                            $sql = "UPDATE `users` SET `user` = ? WHERE id = ?";
                            $value = $valor;
                            $key = $chave;
                            break;
                        case "password":
                            $sql = "UPDATE `users` SET `password` = MD5(?) WHERE id = ?";
                            $value = $valor;
                            $key = $chave;
                            break;
                        case "email":

                            $checkSQL = "SELECT COUNT(*) FROM `users` WHERE `user` = ? AND `id` != ?";
                            $checkStmt = $this->db->query($checkSQL,[$valor, $user_id]);

                            if ($checkStmt->fetchColumn() > 0) {
                                echo json_encode([
                                    'status' => 'error',
                                    'message' => $checkSQL
                                ], JSON_UNESCAPED_UNICODE);
                                return;
                            }


                            $sql = "UPDATE `users` SET `mail` = ? WHERE id = ?";
                            $value = $valor;
                            $key = $chave;
                            break;
                        default:
                            print_r(json_encode( false, JSON_UNESCAPED_UNICODE ) ); 
                            // Lógica para lidar com chaves desconhecidas (se necessário)
                            break;
                    }
                }

                $stmt = $this->db->query($sql, [ $value, $user_id]);

                if ($stmt->rowCount() > 0) {
                    header('Content-Type: application/json; charset=utf-8');
                    $_SESSION[$key] = $value;
                    echo json_encode([
                        'status' => 'succcess',
                        'message' => 'Executado com sucesso!'
                    ], JSON_UNESCAPED_UNICODE); 
                } else {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode([
                        'status' => 'error',
                        'message' => 'Fala ao executar'
                    ], JSON_UNESCAPED_UNICODE);      
                }
                       
            }
        }//end  Setting



        public function updateThemeModestatus(){
            if( $this->isAuthenticated("/userprofile") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $source_url = $this->db->getCleanedHost();

                $sql = "UPDATE user_themes SET theme_mode= ?  WHERE  user_id =  ? AND  source_url = ? ";

                $theme_status = filter_var($_POST['theme_status'], FILTER_SANITIZE_STRING);
                $stmt = $this->db->query($sql, [$theme_status, $user_id, $source_url ]);
                
                //theme_status', 'dark'
                if ($stmt->rowCount() > 0) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode(['message' => 'Alterado modo de thema'], JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['message' => 'Não alterado modo de tema'], JSON_UNESCAPED_UNICODE);
                    //echo json_encode(['message' => 'Category already exists'], JSON_UNESCAPED_UNICODE);
                }
            }
        }


        public function updateBgStatus(){
            if( $this->isAuthenticated("/userprofile") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $source_url = $this->db->getCleanedHost();
                $bg_status = filter_var($_POST['bg_image_status'], FILTER_SANITIZE_STRING);

                $sql = '';

                if($bg_status == 'disable'){
                    $sql = "UPDATE user_themes SET background_image_enabled = FALSE  WHERE  user_id =  ? AND  source_url = ? ";
                    
                }else{ 
                    $sql = "UPDATE user_themes SET background_image_enabled = TRUE WHERE  user_id =  ? AND  source_url = ? ";
                }
                
                $stmt = $this->db->query($sql, [$user_id, $source_url ]);
                
                //theme_status', 'dark'
                if ($stmt->rowCount() > 0) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode(['message' => 'Altereado status do background'], JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['message' => $bg_status], JSON_UNESCAPED_UNICODE);
                    //echo json_encode(['message' => 'Category already exists'], JSON_UNESCAPED_UNICODE);
                } 
            }
        }


        //INSERT INTO `themes` VALUES (DEFAULT, `29`, `Tema1`, `#254`, `#245`, `http://google.com`, `dark_theme`)
        public function getUserProfile(){
            if( $this->isAuthenticated("/userprofile") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                $themeData = $this->getUserThemeData($user_id);

                header('Content-Type: application/json; charset=utf-8');
                //$_SESSION[$key] = $value;
                echo(json_encode($themeData, JSON_UNESCAPED_UNICODE ) );   
            }
        }



        public function updateImageWeb(){
            if( $this->isAuthenticated("/updateusertheme") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                $source_url = $this->db->getCleanedHost();
                $file_path = $_POST['image'];
                $local = $_POST['local']; //local seignifica arquivo e web significa imagem da web
                $action = $_POST['action']; //significa se será profile ou background


                $themeData = $this->getUserThemeData($user_id);

                // Deletando a imagem antiga para manter apenas a imagem nova
                if (!empty($themeData)) {
                    $oldImage = '';

                    if($action == 'Profile'){
                        $oldImage = dirname(__FILE__).'/../src/images/profile/'. basename($themeData['images']['profile_image']['path']) ;
                    }else{
                        $oldImage = dirname(__FILE__).'/../src/images/profile/'. basename($themeData['images']['background_image']['path']) ;
                    }     
                    
                    if (file_exists($oldImage)) {
                        unlink($oldImage);
                    } 
                }

         
                $sql = "UPDATE `images` SET `file_path`= ?, original_file_name = null, new_file_name = null, source_type = 'web'   WHERE user_id = ? AND source_url = ? AND application_name = ? ";
                $stmt = $this->db->query($sql, [$file_path, $user_id, $source_url, $action]);

                //echo json_encode(['message' => $sql], JSON_UNESCAPED_UNICODE);
                
                if ($stmt->fetchColumn() > 0) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode(['message' => $_POST], JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['message' => $_POST], JSON_UNESCAPED_UNICODE);
                    //echo json_encode(['message' => 'Category already exists'], JSON_UNESCAPED_UNICODE);
                }

            }
        }//end Update theme


        function UpdatePhotoProfile(){
            //print_r( json_encode("ola", JSON_UNESCAPED_UNICODE) );
            if( $this->isAuthenticated("/updatephotoprofile") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                $themeData = $this->getUserThemeData($user_id);
                $source_url = $this->db->getCleanedHost();
                $action = filter_var($_POST['action'], FILTER_SANITIZE_STRING);
                

                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    if (isset($_FILES['photo_profile_file']) && $_FILES['photo_profile_file']['error'] === UPLOAD_ERR_OK) {
                        
                        // Verificar se o tamanho da imagem é no máximo 512KB (524288 bytes)
                        if ($_FILES['photo_profile_file']['size'] <= 524288) {

                            // Diretório onde as imagens serão salvas
                            $targetDir = dirname(__FILE__) . '/../src/images/profile/';

                            // Deletando a imagem antiga para manter apenas a imagem nova
                            if (!empty($themeData)) {
                                $oldImage = '';

                                if($action == 'Profile'){
                                    $oldImage = dirname(__FILE__).'/../src/images/profile/'. basename($themeData['images']['profile_image']['path']) ;
                                }else{
                                    $oldImage = dirname(__FILE__).'/../src/images/profile/'. basename($themeData['images']['background_image']['path']) ;
                                }     
                                
                                if (file_exists($oldImage)) {
                                    unlink($oldImage);
                                }  
                            }


                            // Nome original do arquivo
                            $originalName = $_FILES['photo_profile_file']['name'];

                            // Obter a extensão da imagem
                            $extensao = pathinfo($originalName, PATHINFO_EXTENSION);


                            $extensoesPermitidas = ['jpg', 'jpeg', 'png'];
                            
                            if (!in_array($extensao, $extensoesPermitidas)) {
                                die(json_encode("Extensão de arquivo não permitida. Apenas jpg, jpeg e png são aceitos.", JSON_UNESCAPED_UNICODE));
                            }


                            // Gerar um nome aleatório para a imagem com a extensão
                            $newName = uniqid() . '_' . time() . '_' . mt_rand(1000, 9999) . '.' . $extensao;

                            // Caminho completo para o novo arquivo
                            $newFilePath = $targetDir . $newName;

                            $sql = "UPDATE `images` SET `new_file_name`= '$newName', `original_file_name` = '$originalName' ,`file_path`='App/src/images/profile/', source_type = 'local'  WHERE user_id = $user_id AND source_url = '$source_url' AND application_name = '$action'"; 

                            if (move_uploaded_file($_FILES['photo_profile_file']['tmp_name'], $newFilePath)) {
                                // Arquivo enviado com sucesso!
                            
                                $this->db->query($sql);
                                print_r( json_encode($sql, JSON_UNESCAPED_UNICODE) );
                            } else {
                                // Erro ao mover o arquivo
                                echo json_encode('Erro ao mover o arquivo: ' . $targetFile, JSON_UNESCAPED_UNICODE);
                                print_r( json_encode($sql, JSON_UNESCAPED_UNICODE) );
                            }

                        } else {
                            print_r(json_encode('O arquivo é muito grande. O tamanho máximo permitido é 512KB.', JSON_UNESCAPED_UNICODE));
                        }
                        
                    } else {
                        print_r(json_encode( 'Erro no upload do arquivo.', JSON_UNESCAPED_UNICODE ) ); 
                    }
                }
            }

        }





    }//end Settings


?>

