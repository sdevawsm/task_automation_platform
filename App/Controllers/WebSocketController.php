<?php

    namespace App\Controllers;

    use App\Connection;
    use Ratchet\Server\EchoServer;

    
    class WebSocketController extends Connection{

        // $server = new WebSocketServer("0.0.0.0", 8080);

        // $clients = [];

        // while (true) {
        //     $server->run(function ($message, $client) use (&$clients) {
        //         global $clients;

        //         if ($message === null) {
        //             // Cliente desconectado
        //             unset($clients[$client->getId()]);
        //         } else {
        //             // Enviar a mensagem para todos os outros clientes
        //             foreach ($clients as $id => $c) {
        //                 if ($id !== $client->getId()) {
        //                     $c->send($message);
        //                 }
        //             }
        //         }
        //     });
        // }


    }
