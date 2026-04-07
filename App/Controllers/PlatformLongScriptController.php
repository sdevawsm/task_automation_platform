<?php

    namespace App\Controllers;

    use App\Connection;
    
    class PlatformTeamsController extends Connection{
        function getLongScripts(){
            echo(json_encode(['status'=>'success', 'message' =>'chamou getLongScripts'], JSON_UNESCAPED_UNICODE ) );  
        }

        function setLongScripts(){
            echo(json_encode(['status'=>'success', 'message' =>'setLongScripts'], JSON_UNESCAPED_UNICODE ) );   
        }

        function getShortScripts(){
            echo(json_encode(['status'=>'success', 'message' =>'getShortScripts'], JSON_UNESCAPED_UNICODE ) );  
        }

        function setShortScripts(){
            echo(json_encode(['status'=>'success', 'message' =>'setShortScripts'], JSON_UNESCAPED_UNICODE ) );  
        }

        function createLongScript(){
            echo(json_encode(['status'=>'success', 'message' =>'CreateLongScript'], JSON_UNESCAPED_UNICODE ) );    
        }



       





    }//end Dbcontroller




?>