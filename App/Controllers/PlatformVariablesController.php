<?php

    namespace App\Controllers;

    use App\Connection;
    
    class PlatformTeamsController extends Connection{
        function CreateTeam(){
            echo(json_encode('criado equipe', JSON_UNESCAPED_UNICODE ) );  
        }

        function CreateScriptCategory(){
            echo(json_encode('criado equipe', JSON_UNESCAPED_UNICODE ) );  
        }

        function CreateScriptVariable(){
            echo(json_encode('criado variável', JSON_UNESCAPED_UNICODE ) );  
        }

        function CreateShortScript(){
            echo(json_encode('criado script curto', JSON_UNESCAPED_UNICODE ) );  
        }

        function CreateLongScript(){
            echo(json_encode('criado script longo', JSON_UNESCAPED_UNICODE ) );  
        }



        function UpdateTeam(){
            echo(json_encode('criado equipe', JSON_UNESCAPED_UNICODE ) );  
        }

        function UpdateScriptCategory(){
            echo(json_encode('criado categoria', JSON_UNESCAPED_UNICODE ) );  
        }

        function UpdateScriptVariable(){
            echo(json_encode('criado variável', JSON_UNESCAPED_UNICODE ) );  
        }

        function UpdateShortScript(){
            echo(json_encode('criado script curto', JSON_UNESCAPED_UNICODE ) );  
        }

        function UpdateLOngScript(){
            echo(json_encode('criado script longo', JSON_UNESCAPED_UNICODE ) );  
        }



        function DeleteTeam(){
            echo(json_encode('Delete equipe', JSON_UNESCAPED_UNICODE ) );  
        }

        function DeleteScriptCategory(){
            echo(json_encode('Delete categoria', JSON_UNESCAPED_UNICODE ) );  
        }

        function DeleteScriptVariable(){
            echo(json_encode('Delete variável', JSON_UNESCAPED_UNICODE ) );  
        }

        function DeleteShortScript(){
            echo(json_encode('Delete script curto', JSON_UNESCAPED_UNICODE ) );  
        }

        function DeleteLOngScript(){
            echo(json_encode('Delete script longo', JSON_UNESCAPED_UNICODE ) );  
        }




    }//end Dbcontroller




?>