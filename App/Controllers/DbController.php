<?php

    namespace App\Controllers;

    use App\Connection;
    
    class DbController extends Connection{
        public function Create(){
            if( $this->isAuthenticated("/create") ){
                // $array = json_decode( key($_POST), true);;

                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
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
                                // Cria a query de inserção
                                $sql = "INSERT INTO $tb VALUES (DEFAULT, $user_id,'" . implode("', '", $values) . "')";

                                header('Content-Type: application/json; charset=utf-8');
                                echo(json_encode($sql, JSON_UNESCAPED_UNICODE ) );
                            
                                if ( $this->db->query($sql) ){
                                    $status = true;
                                } else {
                                    $status = false;
                                    header('Content-Type: application/json; charset=utf-8');
                                    echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );
                                }
                            }else {
                                $status =  "Nenhum campo enviado.";
                                header('Content-Type: application/json; charset=utf-8');
                                echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );
                            }
                        } else {
                            $status = "Nenhum dado enviado.";
                            header('Content-Type: application/json; charset=utf-8');
                            echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );
                        }

                    } 
                    
                    
                }     
            }
        }


        public function Read(){
            if( $this->isAuthenticated("/read") ){                
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                $role = filter_var($_SESSION['role'], FILTER_SANITIZE_STRING);
                $edit_column = ($role === "admin") ? "edit" : "noedit";


                if($tb){
                    if($id){
                        $sql = "SELECT t.*, '$edit_column' as role  FROM $tb as t WHERE (user_id = $user_id AND id = $id) OR ( scope='global' AND AND id = $id)";
                    }else{
                        $sql = "SELECT t.*, '$edit_column' as role  FROM $tb as t WHERE user_id = $user_id OR scope='global'";
                    }
                    
                    $answer = $this->db->query($sql);
                    
                   
                    if ( $answer   ){
                        $temp = $answer->fetchAll(\PDO::FETCH_ASSOC);

                        $array = json_encode($temp, JSON_UNESCAPED_UNICODE );
                        header('Content-Type: application/json; charset=utf-8');
                        echo($array);
                        
                    } else {
                        $status = false;
                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );  
                    }
    
                    	
                }
                
                 
            }
        }

        public function Update(){
            if( $this->isAuthenticated("/update") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                if($tb){
                    // Verifica se os dados foram enviados via POST
                    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
                         // Verifica se há campos enviados no POST
                        if (!empty($_POST)) {
                            $fill_fields = array();
                            $values = array();
                        

                            // Cria a query de inserção
                            $sql = "UPDATE `platform_settings` SET ";

                            // Itera sobre os campos enviados via POST
                            foreach ($_POST as $key=> $value) {
                                $temp = $key. "='". $value ;
                            }

                            $sql = $sql . $temp . "' WHERE  `user_id` = $user_id";

                            // $sql = "SELECT * FROM `platform_settings`";

                            

                            // Execute a query (você precisará de uma conexão com o banco de dados estabelecida)
                            if ( $this->db->query($sql) ){
                                $status = "Dados inseridos com sucesso!";
                                
                            } else {
                                $status = "Erro ao inserir os dados: ";
                                
                            }

                            header('Content-Type: application/json; charset=utf-8');
                            echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );   

                         } else {
                             $status = "Nenhum dado enviado.";
                             
                        }
 
                        // header('Content-Type: application/json; charset=utf-8');
                        // echo(json_encode("teste", JSON_UNESCAPED_UNICODE ) );
                    } 
                   
                    
                } 
            }
        }

        public function Delete(){
            if( $this->isAuthenticated("/delete") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                if($tb){
                    if($id){
                        $sql = "DELETE FROM  $tb WHERE user_id = $user_id AND id = $id";
                    }else{
                        $sql = "DELETE FROM  $tb WHERE user_id = $user_id AND id = $id";
                    }

                    $answer = $this->db->query($sql);
                   
                    if ( $answer   ){
                        $status = true;

                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode($status, JSON_UNESCAPED_UNICODE ));
                        
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