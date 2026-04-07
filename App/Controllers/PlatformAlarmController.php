<?php

    namespace App\Controllers;

    use App\Connection;
    
    class PlatformAlarmController extends Connection{
        function setAlarm(){
            //echo(json_encode(['status'=>'success', 'message'=>'cadastrado com sucesso!'], JSON_UNESCAPED_UNICODE ) );  

            if ($this->isAuthenticated("/settings")) {
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $hour = filter_var($_POST['hour'], FILTER_SANITIZE_NUMBER_INT);
                $minute = filter_var($_POST['minute'], FILTER_SANITIZE_NUMBER_INT);
                $second = filter_var($_POST['second'], FILTER_SANITIZE_NUMBER_INT);
                $days = json_decode($_POST['days'], true); // Decodifica a string JSON para um array
                $title = filter_var($_POST['title'], FILTER_SANITIZE_STRING);
        
                /*if ($days === null) {
                    echo json_encode(['message' => 'Formato de dados inválido para os dias'], JSON_UNESCAPED_UNICODE);
                    return;
                }*/
        
                // Prepara a consulta SQL usando placeholders para evitar SQL injection
                $sql = "INSERT INTO alarms (user_id, hour, minute, second, title, days) VALUES (?, ?, ?, ?, ?, ?)";
                $params = [$user_id, $hour, $minute, $second, $title, json_encode($days)]; // Codifica o array novamente para JSON
        
                $stmt = $this->db->query($sql, $params);
        
                header('Content-Type: application/json; charset=utf-8');
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['status'=>'success','message' => 'Alarme registrado com sucesso'], JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['status'=>'success','message' => 'Falha ao registrar alarme'], JSON_UNESCAPED_UNICODE);
                }
            }
        }

        function getAlarm() {
            if ($this->isAuthenticated("/settings")) {
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
        
                // Prepara a consulta SQL para buscar os alarmes do usuário
                $sql = "SELECT id, hour, minute, second, title, days FROM alarms WHERE user_id = ?";
                $params = [$user_id];
                
                $stmt = $this->db->query($sql, $params);
                
                header('Content-Type: application/json; charset=utf-8');
                if ($stmt->rowCount() > 0) {
                    $alarms = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    echo json_encode(['status' => 'success', 'data' => $alarms], JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['status' => 'success', 'message' => 'Nenhum alarme encontrado'], JSON_UNESCAPED_UNICODE);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Usuário não autenticado'], JSON_UNESCAPED_UNICODE);
            }
        }

        function updateAlarm(){
            echo(json_encode(['status'=>'success', 'message'=>'atualizado com sucesso!'], JSON_UNESCAPED_UNICODE ) );  
        }


        function deleteAlarm() {
            if ($this->isAuthenticated("/settings")) {
                $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
        
                // Prepara a consulta SQL para deletar o alarme
                $sql = "DELETE FROM alarms WHERE id = ?";
                $params = [$id];
        
                $stmt = $this->db->query($sql, $params);
        
                header('Content-Type: application/json; charset=utf-8');
                if ($stmt->rowCount() > 0) {
                    echo json_encode(['status' => 'success', 'message' => 'Alarme deletado com sucesso'], JSON_UNESCAPED_UNICODE);
                }else {
                    echo json_encode(['status' => 'error', 'message' => 'Falha ao deletar o alarme'], JSON_UNESCAPED_UNICODE);
                }
            } else {
                echo json_encode(['status' => 'error', 'message' => 'Usuário não autenticado'], JSON_UNESCAPED_UNICODE);
            }
        }


    }//end Dbcontroller




?>