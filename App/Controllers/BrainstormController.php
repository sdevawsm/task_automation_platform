<?php
    namespace App\Controllers;

    use App\Connection;

    class BrainstormController extends Connection{

        public function Brainstorm(){            
            if( $this->isAuthenticated("/brainstorm") ){
                $this->Render("Brainstorm/Brainstorm", $vars = [
                    'title' => "Página Tempestade de Ideias",
                    'description' => 'Entrou nas Tempestades de ideias'
                ]);
                
            }else{
                header("Location: /");
            }
        }//end  Setting

    }//end Settings


?>