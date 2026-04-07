<?php

    namespace App\Controllers;

    use App\Connection;
    
    class SuggestionsController extends Connection{
        public function Create(){
            if( $this->isAuthenticated("/create") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $title = filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING) ?? null;
                $type = filter_input(INPUT_POST, 'type', FILTER_SANITIZE_STRING) ?? null;
                $suggestion = filter_input(INPUT_POST, 'suggestion', FILTER_SANITIZE_STRING) ?? null;
                $date = date("Y-m-d");
                $time = date("H:i:s");   
                
                $sql = "INSERT INTO `suggestions` VALUES (DEFAULT, $user_id,'$title','$type','$suggestion','$date', '$time', 0, 0, 0, NULL )";

                    // header('Content-Type: application/json; charset=utf-8');
                    // echo(json_encode($sql, JSON_UNESCAPED_UNICODE ) ); 

                if(!empty($suggestion) && !empty($type)) {
                    

                    if ( $this->db->query($sql) ){
                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode(true, JSON_UNESCAPED_UNICODE ) );      
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


        public function Read(){
            if( $this->isAuthenticated("/read") ){                
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                if($id){
                    $sql = "SELECT  s.id, s.user_id, s.title, s.type, s.suggestion, s.date, s.time, s.emotion1, s.emotion2, s.emotion3, s.admin_response,
                        CONCAT(SUBSTRING_INDEX(u.name, ' ', 1), ' ') AS first_name, SUBSTRING_INDEX(u.name, ' ', -1) AS last_name 
                        FROM suggestions s 
                        INNER JOIN users u ON s.user_id  = u.id AND s.user_id = $id";

                }else{
                    $sql = "SELECT s.id, s.user_id, s.title, s.type, s.suggestion, s.date, s.time, s.emotion1, s.emotion2, s.emotion3, s.admin_response,
                            CONCAT(SUBSTRING_INDEX(u.name, ' ', 1), ' ') AS first_name, SUBSTRING_INDEX(u.name, ' ', -1) AS last_name
                             FROM suggestions s
                            INNER JOIN users u ON s.user_id = u.id ORDER BY s.date DESC, s.time DESC";

                }
                
                $temp = $this->db->query($sql);
                $answer = $temp->fetchAll(\PDO::FETCH_ASSOC);

                foreach ($answer as &$element) {
                    $element['user_id_session'] = $user_id;
                    $element['user_id_role'] = $_SESSION['role'];
                }
                unset($element); // Remove a referência após o loop para evitar comportamentos inesperados
                


                // echo "<pre>";
                // var_dump($answer);
                // echo "</pre>";

                $array = json_encode($answer, JSON_UNESCAPED_UNICODE );
                header('Content-Type: application/json; charset=utf-8');
                echo($array);	
            }
        }

        public function Update(){
            if( $this->isAuthenticated("/update") ){
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $emotion1 = filter_input(INPUT_POST, 'emotion1', FILTER_SANITIZE_STRING) ?? null;
                $emotion2 = filter_input(INPUT_POST, 'emotion2', FILTER_SANITIZE_STRING) ?? null;
                $emotion3 = filter_input(INPUT_POST, 'emotion3', FILTER_SANITIZE_STRING) ?? null;
                $admin_response = filter_input(INPUT_POST, 'admin_response', FILTER_SANITIZE_STRING) ?? null;

                if($id){
                    $sql = "UPDATE `suggestions` SET `emotion1`=  $emotion1,`emotion2`= $emotion2,`emotion3`= $emotion3  WHERE `id` =  $id";

                    $temp = $this->db->query($sql);

                    // header('Content-Type: application/json; charset=utf-8');
                    //     $array = json_encode($sql, JSON_UNESCAPED_UNICODE );
                    //     echo($array);
                    
                    if($temp->rowCount() > 0){
                        header('Content-Type: application/json; charset=utf-8');
                        $array = json_encode(true, JSON_UNESCAPED_UNICODE );
                         echo($array);
                    }else{
                        header('Content-Type: application/json; charset=utf-8');
                        $array = json_encode(false, JSON_UNESCAPED_UNICODE );
                        echo($array);
                    }

                }else{
                    header('Content-Type: application/json; charset=utf-8');
                    $array = json_encode(false, JSON_UNESCAPED_UNICODE );
                    echo($array);	
                }
            }
        }


        public function updateAdminResponse() {
            if ($this->isAuthenticated("/update-admin-response")) {
                // Obter e sanitizar parâmetros de entrada
                $id = filter_input(INPUT_POST, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $admin_response = filter_input(INPUT_POST, 'admin_response', FILTER_SANITIZE_STRING) ?? null;
        
                // Verificar se o ID e a resposta estão presentes
                if ($id && $admin_response && ( $_SESSION['role'] == 'admin' || $_SESSION['role'] == 'dev') ) {
                    // Atualizar apenas a coluna 'admin_response' na tabela
                    $sql = "UPDATE `suggestions` SET `admin_response` = ? WHERE `id` = ?";
        
                    // Preparar a consulta
                    $stmt =  $this->db->query($sql, [$admin_response, $id]);
        
                    // Executar a consulta e verificar resultado
                    if ( $stmt->rowCount() > 0) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode(['success' => true, 'message' => 'Resposta do administrador atualizada com sucesso!'], JSON_UNESCAPED_UNICODE);
                    } else {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode(['success' => false, 'message' => 'Falha ao atualizar a resposta do administrador ou nenhum registro foi modificado.'], JSON_UNESCAPED_UNICODE);
                    }
                } else {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode(['success' => false, 'message' => 'ID ou resposta do administrador inválido.'], JSON_UNESCAPED_UNICODE);
                }
            } else {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['success' => false, 'message' => 'Usuário não autenticado para esta ação.'], JSON_UNESCAPED_UNICODE);
            }
        }
        


        public function Delete(){
            if( $this->isAuthenticated("/delete") ){
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                if($id){
                    $sql = $sql = "DELETE FROM suggestions WHERE id AND user_id = $user_id AND id = $id";

                    $temp = $this->db->query($sql);

                    // header('Content-Type: application/json; charset=utf-8');
                    //     $array = json_encode($sql, JSON_UNESCAPED_UNICODE );
                    //     echo($array);
                    
                    if($temp->rowCount() > 0){
                        header('Content-Type: application/json; charset=utf-8');
                        $array = json_encode(true, JSON_UNESCAPED_UNICODE );
                         echo($array);
                    }else{
                        header('Content-Type: application/json; charset=utf-8');
                        $array = json_encode(false, JSON_UNESCAPED_UNICODE );
                        echo($array);
                    }

                }else{
                    header('Content-Type: application/json; charset=utf-8');
                    $array = json_encode(false, JSON_UNESCAPED_UNICODE );
                    echo($array);	
                }



            }
        }


    }//end Dbcontroller




?>