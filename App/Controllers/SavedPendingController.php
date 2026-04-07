<?php

    namespace App\Controllers;

    use App\Connection;
    
    class SavedPendingController extends Connection{
        public function Create(){
            if( $this->isAuthenticated("/create") ){
                // $array = json_decode( key($_POST), true);;

                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? 'saved_pending';
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                // if( filter_input(INPUT_POST, 'newCategory', FILTER_SANITIZE_STRING) ){
                //     $category = strtoupper( filter_input(INPUT_POST, 'newCategory', FILTER_SANITIZE_STRING) );
                // }

                if($tb){
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

                                if($tb=='saved_pending'){
			                        $number_protocol =   $_POST['number_protocol'];
			                        $description = 	 base64_encode( $_POST['description'] ) ;
			                        $adm_protocol =  $_POST['adm_protocol'] ;


                                    $current_date = date("Y-m-d");
				                    $current_time = date("H:i:s");
				
				
				                    $sql= "INSERT INTO `saved_pending` VALUES ('$number_protocol','$description', '$user_id', '$user_id' ,'$adm_protocol', '$current_date', '$current_time')  ON DUPLICATE KEY UPDATE `edited_by`='$user_id', `description`='$description', `chat_protocol`='$number_protocol', `date`='$current_date', `time`='$current_time'";

                                }
                                // Execute a query (você precisará de uma conexão com o banco de dados estabelecida)
                                if ( $this->db->query($sql) ){
                                    $status = ['status'=> 'success', 'description' => $_POST['description'] ];
                                } else {
                                    $status = "false";
                                }
                            } else {
                                $status =  "Nenhum campo enviado.";
                            }
                        } 
                    } 
                    header('Content-Type: application/json; charset=utf-8');
                    echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );
                }     
            }
        }


        public function Read(){
            if( $this->isAuthenticated("/read") ){                
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? 'saved_pending';
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                if($tb && $tb=="saved_pending"){
                    $sql = "SELECT `chat_protocol` as number_protocol,`description`, `created_by` AS user_id, `adm_protocol`, `date`, `time` FROM `saved_pending` WHERE chat_protocol = " . $_POST['number_protocol'] ;
                
                    header('Content-Type: application/json; charset=utf-8');
                    $temp= $this->db->query($sql);
                    $answer = $temp->fetch(\PDO::FETCH_ASSOC);

                    //print_r($answer);

                    if(count($answer) > 0){
                        $answer['number_protocol'] = $answer['number_protocol'];
				        $answer['adm_protocol'] = $answer['adm_protocol'] ;
                   	    $answer['description'] = base64_decode( $answer['description'] );

                        echo(json_encode($answer, JSON_UNESCAPED_UNICODE ));	
                    }else{
                        echo(json_encode("Não há protocolos pendentes", JSON_UNESCAPED_UNICODE ));	
                    }

                    
                }
            }
        }

        public function Update(){
            if( $this->isAuthenticated("/update") ){
                $this->Render("Documentation/Documentation", $vars = [
                    'title' => "Página Settings",
                    'description' => 'update'
                ], ["Header", "Sidebar", "WidgetSettingsVariable"]);
            }
        }

        public function Delete(){
            if( $this->isAuthenticated("/delete") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                if($tb){
                    if($id){
                        $sql = "DELETE FROM  $tb WHERE id = $id";
                    }else{
                        $sql = "DELETE FROM  $tb WHERE user_id = $user_id ";
                    }

                    $answer = $this->db->query($sql);
                    $temp = $answer->fetchAll(\PDO::FETCH_ASSOC);

                    $array = json_encode($temp, JSON_UNESCAPED_UNICODE );
                    header('Content-Type: application/json; charset=utf-8');
                    echo($array);	
                }
            }
        }


        public function getAllPending() {
            if ($this->isAuthenticated("/read")) {
                $page = filter_input(INPUT_GET, 'page', FILTER_VALIDATE_INT) ?? 1;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $items_per_page = 30;
                $offset = ($page - 1) * $items_per_page;
                $user_for_find = filter_input(INPUT_POST, 'user', FILTER_SANITIZE_STRING) ?? 'all';
        
                $number_protocol = filter_input(INPUT_POST, 'number_protocol', FILTER_SANITIZE_STRING) ?? null;
        
                $sql = "SELECT s.`chat_protocol` as number_protocol, s.*, u.name FROM `saved_pending` s JOIN `users` u WHERE s.created_by = u.id ORDER BY s.date DESC, s.time DESC";

                if ($number_protocol) {
                    $sql .= " WHERE number_protocol = $number_protocol ";
                }
                $sql .= " LIMIT $offset , $items_per_page ";

                //echo($sql); 
                
                if ($number_protocol) {
                    $stmt = $this->db->query($sql);
                }else{
                    $stmt = $this->db->query($sql);
                }
                
                $stmt->execute();
                $answer = $stmt->fetchAll(\PDO::FETCH_ASSOC);
        
                header('Content-Type: application/json; charset=utf-8');

                if ($answer) {
                    foreach ($answer as &$protocol) {
                        $protocol['description'] = base64_decode( $protocol['description'] );
                    }
                    $array = json_encode(['status' => 'success', 'pending' => $answer ], JSON_UNESCAPED_UNICODE);
                } else {
                    $array = json_encode(['status' => 'error', 'pending' => 'Não há'], JSON_UNESCAPED_UNICODE);
                }

                echo($array);   
            }
        }
        


    }//end Dbcontroller




?>