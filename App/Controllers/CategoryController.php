<?php

    namespace App\Controllers;

    use App\Connection;
    
    class CategoryController extends Connection{
        public function Create(){
            if( $this->isAuthenticated("/create") ){ 
            }
        }


        public function Read(){
            if( $this->isAuthenticated("/read") ){                
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                if($tb){
                    if($id){
                        $sql = "SELECT * FROM $tb WHERE user_id = $user_id AND id = $id";
                    }else{
                        $sql = "SELECT * FROM $tb WHERE user_id = $user_id OR scope='global'";
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
                
            }
        }

        public function Delete(){
            if( $this->isAuthenticated("/delete") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

              
                $sql = "DELETE FROM `template_text_categories` WHERE user_id = $user_id AND id = $id";
                $temp = $this->db->query($sql);

                if ( $temp->rowCount() > 0 ){
                    $sql = "UPDATE `users_text_models` SET `category`='all' WHERE user_id = $user_id AND `category` = $id";
                    if( $this->db->query($sql) ){
                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode('true', JSON_UNESCAPED_UNICODE ) ); 
                    }else{
                        header('Content-Type: application/json; charset=utf-8');
                        echo(json_encode('false', JSON_UNESCAPED_UNICODE ) ); 
                    }
                    
                }                 
            }
        }


    }//end Dbcontroller




?>