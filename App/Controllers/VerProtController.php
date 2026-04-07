<?php
    namespace App\Controllers;

    use App\Connection;

    class VerProtController extends Connection{

        public function verProt(){            
            if( $this->isAuthenticated("/verprot") ){

                $vars = [
                    'title' => "Verificação de protocolo",
                    'inputUser' =>  $_SESSION['user'] // Removi a função str() desnecessária
                ];

                $this->Render("Layout3", "VerProt/VerProt", $vars, array() );
                
            }else{
                header("Location: /");
            }
        }//end  Setting

    }//end Settings


?>