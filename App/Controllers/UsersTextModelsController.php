<?php

    namespace App\Controllers;

    use App\Connection;
    
    class UsersTextModelsController extends Connection{
        public function Create(){
            if( $this->isAuthenticated("/create") ){
                // $array = json_decode( key($_POST), true);;

                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? 'users_text_models';
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                // if( filter_input(INPUT_POST, 'newCategory', FILTER_SANITIZE_STRING) ){
                //     $category = strtoupper( filter_input(INPUT_POST, 'newCategory', FILTER_SANITIZE_STRING) );
                // }

                // Verifica se os dados foram enviados via POST
                if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                    // Verifica se há campos enviados no POST
                    if (!empty($_POST)) {
                        $fill_fields = array();
                        $values = array();
                        
                        // Itera sobre os campos enviados via POST
                        foreach ($_POST as $key=> $value) {
                            // Adiciona o nome do campo ao array de campos
                            $fill_fields[] = $key;
                            $values[] = $value;
                        }
                        
                        // Verifica se há campos e valores
                        if (!empty($fill_fields) && !empty($values)) {
                            $sql = "INSERT INTO $tb VALUES (DEFAULT, $user_id,'" . implode("', '", $values) . "')";
                            
                            // Execute a query (você precisará de uma conexão com o banco de dados estabelecida)
                            if ( $this->db->query($sql) ){
                                $status = true;
                                header('Content-Type: application/json; charset=utf-8');
                                echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );
                            } else {
                                $status = false;
                                header('Content-Type: application/json; charset=utf-8');
                                echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );
                            }

                            
                        } 
                    } 
                } 

                
               
            }
        }


        public function Read(){
            if( $this->isAuthenticated("/read") ){                
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? "users_text_models";
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $catId = filter_input(INPUT_GET, 'catId', FILTER_SANITIZE_STRING) ?? null;
                $extern = filter_input(INPUT_GET, 'extern', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
              
                $extern = false;

                $role = filter_var($_SESSION['role'], FILTER_SANITIZE_STRING);

                $role = filter_var($_SESSION['role'], FILTER_SANITIZE_STRING);
                $edit_column = ($role === "admin") ? "edit" : "noedit";

                if ($id) {
                    $sql = "SELECT id, category, shortcut, title, model, scope, '$edit_column' as role, 'users_text_models' AS platform FROM $tb WHERE user_id = $id";
                } else if ($catId) {
                    $sql = "SELECT id, category, shortcut, title, model, scope, '$edit_column' as role, 'users_text_models' AS platform FROM $tb WHERE category = $catId AND user_id = $user_id";
                } else if ($extern === 'true') {
                    $sql = "SELECT id, category, shortcut, title, model, scope, '$edit_column' as role, 'users_text_models' AS platform FROM $tb WHERE user_id = $user_id OR scope = 'global'";
                } else {
                    $sql = "SELECT id, category, shortcut, title, model, scope, '$edit_column' as role, 'users_text_models' AS platform FROM $tb WHERE user_id = $user_id OR scope = 'global'";
                }

                $answer = $this->db->query($sql);
                $temp = $answer->fetchAll(\PDO::FETCH_ASSOC);

                $array = json_encode($temp, JSON_UNESCAPED_UNICODE );
                header('Content-Type: application/json; charset=utf-8');
                echo($array);	
            
                 
            }
        }

        public function Update(){
            if( $this->isAuthenticated("/update") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? 'users_text_models';
                $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                $category = filter_input(INPUT_POST, 'category', FILTER_SANITIZE_STRING);
                $shortcut = filter_input(INPUT_POST, 'shortcut', FILTER_SANITIZE_STRING);
                $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
                $model = filter_input(INPUT_POST, 'model', FILTER_UNSAFE_RAW);

                $sql = "UPDATE `$tb` SET `category`='$category', `shortcut`='$shortcut', `title`='$title', `model`='$model', `scope`='local' WHERE `user_id` = $user_id AND `id` = $id";

                if($_SESSION['role'] == 'admin'){
                    $scope = filter_input(INPUT_POST, 'scope', FILTER_SANITIZE_STRING);
                    $sql = "UPDATE `$tb` SET `category`='$category', `shortcut`='$shortcut', `title`='$title', `model`='$model', `scope`='$scope' WHERE `user_id` = $user_id AND `id` = $id";
                }
                
                // Executa a query
                $result = $this->db->query($sql);

                if ($result) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode("Atualizado com sucesso", JSON_UNESCAPED_UNICODE);
                } else {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode("Erro ao atualizar", JSON_UNESCAPED_UNICODE);
                }
            }
        }

        public function Delete(){
            if( $this->isAuthenticated("/delete") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? 'users_text_models';
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                if($tb){
                    if($id){
                        $sql = "DELETE FROM  $tb WHERE user_id = $user_id AND id = $id";
                    }else{
                        $sql = "DELETE FROM  $tb WHERE user_id = $user_id AND id = $id";
                    }

                    if ( $this->db->query($sql) ){
                        $status = true;
                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );   
                        
                    } else {
                        $status = false;
                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );   
                    }   
                }
            }
        }


    }//end Dbcontroller




?>