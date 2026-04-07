<?php
    namespace App\Controllers;

    use App\Connection;

    class DocumentationController extends Connection{

        public function Documentation(){            
            if( $this->isAuthenticated("/documentation") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                $sql = "SELECT * FROM `themes` t WHERE t.user_id  = $user_id ";

                $result_query = $this->db->query($sql);
                $profile = $result_query->fetchAll(\PDO::FETCH_ASSOC);

                if($profile){
                    if ( $this->db->query($sql) ){
                        $photo_location = $profile[0]['background_image_location'];
                        $photo_profile = $profile[0]['photo_profile'];
                    }
                }

                $this->Render("Layout", "Documentation/Documentation", $vars = [
                    'title' => "Página Documentacao",
                    'photo_profile' => $photo_location.$photo_profile
                ], ["Header", "Start"] );
                
            }else{
                header("Location: /");
            }
        }//end  Setting

        public function Changelog(){            
            if( $this->isAuthenticated("/documentation") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                $sql = "SELECT * FROM `themes` t WHERE t.user_id  = $user_id ";

                $result_query = $this->db->query($sql);
                $profile = $result_query->fetchAll(\PDO::FETCH_ASSOC);

                if($profile){
                    if ( $this->db->query($sql) ){
                        $photo_location = $profile[0]['background_image_location'];
                        $photo_profile = $profile[0]['photo_profile'];
                    }
                }

                $this->Render("Layout", "Documentation/Changelog", $vars = [
                    'title' => "Changelog",
                    'photo_profile' => $photo_location.$photo_profile
                ], ["Header", "Changelog"] );
                
            }else{
                header("Location: /");
            }
        }//end  Setting


    }//end Settings


?>