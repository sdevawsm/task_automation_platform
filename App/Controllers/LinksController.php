<?php

    namespace App\Controllers;

    use App\Connection;
    
    class LinksController extends Connection{
        public function Create(){
            if( $this->isAuthenticated("/create") ){
                 // $array = json_decode( key($_POST), true);;

                 $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                 $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                 // if( filter_input(INPUT_POST, 'newCategory', FILTER_SANITIZE_STRING) ){
                 //     $category = strtoupper( filter_input(INPUT_POST, 'newCategory', FILTER_SANITIZE_STRING) );
                 // }
 
                //  $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING) ?? null;
                //  $url = filter_input(INPUT_POST, 'url', FILTER_SANITIZE_STRING) ?? null;
                //  $username = filter_input(INPUT_POST, 'username', FILTER_SANITIZE_STRING) ?? null;
                //  $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING) ?? null;
                //  $scope = filter_input(INPUT_POST, 'scope', FILTER_SANITIZE_STRING) ?? null;
                    
                if($id){
                    $sql = "SELECT * FROM `links` l, groups g, links_groups lg WHERE l.id = lg.id_link AND g.id = lg.id_group;";
                }else{
                    $sql = "SELECT * FROM `links` l, groups g, links_groups lg WHERE l.id = lg.id_link AND g.id = lg.id_group AND (l.scope = \'global\' || l.user_id = $user_id);";
                }    

                

                header('Content-Type: application/json; charset=utf-8');
                echo(json_encode('chamou', JSON_UNESCAPED_UNICODE ) );
    

                //Execute a query (você precisará de uma conexão com o banco de dados estabelecida)
                // if ( $this->db->query($sql) ){
                //     $status = "Dados inseridos com sucesso!";
                // } else {
                //     $status = "Erro ao inserir os dados: ";
                // }

                // $status = "Nenhum dado enviado.";
                // header('Content-Type: application/json; charset=utf-8');
                // echo(json_encode($status, JSON_UNESCAPED_UNICODE ) );     
                  
            }
        }


        public function Read(){
            if( $this->isAuthenticated("/read") ){                
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);


                if($id){
                    $sql = "SELECT DISTINCT l.id, l.user_id, l.name as label ,l.url, l.username, l.password, lg.*, g.name as 'group' FROM links l LEFT JOIN links_groups lg ON l.id = lg.id_link LEFT JOIN groups g ON lg.id_group = g.id where l.user_id = $user_id WHERE u.role = 'admin'";
                }else{
                    // $sql = "SELECT l.*, g.name FROM `links` l, groups g, links_groups lg WHERE l.id = lg.id_link AND g.id = lg.id_group AND (l.scope = 'global' || l.user_id = $user_id);";
                    // SELECT DISTINCT l.*, lg.*, g.name FROM links l LEFT JOIN links_groups lg ON l.id = lg.id_link LEFT JOIN groups g ON lg.id_group = g.id;
                    $sql = "SELECT DISTINCT l.id, l.user_id, l.name as label ,l.url, l.username, l.password, lg.*, g.name as 'group' FROM links l LEFT JOIN links_groups lg ON l.id = lg.id_link LEFT JOIN groups g ON lg.id_group = g.id where l.user_id=$user_id";
                }    
                
                $temp= $this->db->query($sql);
                $answer = $temp->fetchAll(\PDO::FETCH_ASSOC);

                $array = json_encode($answer, JSON_UNESCAPED_UNICODE );
                header('Content-Type: application/json; charset=utf-8');
                echo($array);	
                
                
                 
            }
        }

        public function Update(){
            if( $this->isAuthenticated("/update") ){
                $tb = filter_input(INPUT_GET, 'tb', FILTER_SANITIZE_STRING) ?? null;
                $id = filter_input(INPUT_GET, 'id', FILTER_SANITIZE_STRING) ?? null;
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                $sql = "UPDATE `platform_settings` SET `state`='". $_POST['state'] . "' WHERE  `user_id` = $user_id";

                // UPDATE `platform_settings` SET `state`='disable' WHERE `user_id`= 29


                // Execute a query (você precisará de uma conexão com o banco de dados estabelecida)
                if ( $this->db->query($sql) ){
                    $status = "Dados inseridos com sucesso!";
                    
                } else {
                    $status = "Erro ao inserir os dados: ";
                    
                }

                header('Content-Type: application/json; charset=utf-8');
                echo(json_encode($sql, JSON_UNESCAPED_UNICODE ) );   

                    
                // header('Content-Type: application/json; charset=utf-8');
                // echo(json_encode("teste", JSON_UNESCAPED_UNICODE ) );
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
                    $temp = $answer->fetchAll(\PDO::FETCH_ASSOC);

                    $array = json_encode($temp, JSON_UNESCAPED_UNICODE );
                    header('Content-Type: application/json; charset=utf-8');
                    echo($array);	
                }
            }
        }


    }//end Dbcontroller




?>