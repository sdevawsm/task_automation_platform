<?php

    namespace App\Controllers;

    use App\Connection;
    
    class PlatformRelatorioController extends Connection{
        function protocolos_pendentes(){
            echo(json_encode('Protocolos_Pendentes', JSON_UNESCAPED_UNICODE ) );  
        }



    }//end Dbcontroller




?>