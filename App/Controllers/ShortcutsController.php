<?php

    namespace App\Controllers;

    use App\Connection;
    
    class ShortcutsController extends Connection{
        public function Create(){
            if( $this->isAuthenticated("/create") ){
                 // $array = json_decode( key($_POST), true);;

                 $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                 $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                
                  //...
                  
            }
        }


        public function Read(){
            if( $this->isAuthenticated("/read") ){                
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);


                if($id){
                    $sql = "SELECT s.*, 'action' as 'edit' FROM `shortcuts` s WHERE user_id = $user_id ORDER BY `shortcuts`.`color` DESC";
                }else{
                    $sql = "
                        (SELECT s.*, 'edit' AS action
                            FROM `shortcuts` s
                            WHERE s.user_id = $user_id)

                            UNION

                            (SELECT sa.*, 'noedit' AS action
                            FROM `shortcuts` sa
                            WHERE sa.scope = 'global'
                            AND NOT EXISTS (
                                SELECT 1
                                FROM `shortcuts` s2
                                WHERE s2.user_id = $user_id AND s2.id = sa.id
                            ))

                            ORDER BY color DESC;
                    ";
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

        public function Update(){
            if( $this->isAuthenticated("/update") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

            }
        }

        public function Delete(){
            if( $this->isAuthenticated("/delete") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                //...
            }
        }


    }//end Dbcontroller




?>