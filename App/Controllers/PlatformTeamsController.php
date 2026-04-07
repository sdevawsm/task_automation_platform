<?php

    namespace App\Controllers;

    use App\Connection;
    
    class PlatformTeamsController extends Connection{
        function CreateTeam(){
            if( $this->isAuthenticated("/settingsadmin") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $role = $_SESSION['role'];
                $name_team = $_POST['name'];

                $sql = "INSERT INTO `teams`(`name`, `registered_by`) 
                        SELECT '$name_team', '$user_id' 
                        WHERE NOT EXISTS (SELECT 1 FROM `teams` WHERE `name` = '$name_team');";

                

                if($role == "admin" || $role == "dev"){
                    $stmt = $this->db->query($sql);
                    if ($stmt->rowCount() > 0) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode(['message' => 'Team registered successfully'], JSON_UNESCAPED_UNICODE);
                    } else {
                        echo json_encode(['message' => 'Team already exists'], JSON_UNESCAPED_UNICODE);
                    }
                
                }
                
   
            }
            
        }

        function UpdateTeam(){
            if( $this->isAuthenticated("/settingsadmin") ){
                $role = $_SESSION['role'];
                if($role == "admin" || $role == "dev"){
                    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
                    $name = $_POST['name'];
                    $sql = "UPDATE `teams` SET `name`= '$name' WHERE `id`  = $id";
                    
                    $stmt = $this->db->query($sql);
                    if ($stmt->rowCount() > 0) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode(['message'  => 'Atualizado equipe com sucesso'], JSON_UNESCAPED_UNICODE);
                    } else {
                        echo json_encode(['message' => 'Erro ao atualizar'], JSON_UNESCAPED_UNICODE);
                    }
                    //echo json_encode($sql, JSON_UNESCAPED_UNICODE);
                }
                
            }
        }


        function DeleteTeam(){
            if( $this->isAuthenticated("/settingsadmin") ){
                $role = $_SESSION['role'];
                if($role == "admin" || $role == "dev"){
                    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
                    $sql = "DELETE FROM `teams` WHERE `id` = ?";
                    $stmt = $this->db->query($sql, [$id]);

                    if ($stmt->rowCount() > 0) {
                        $sql = "UPDATE `template_text_categories` SET `id_team`='1' WHERE `id_team` = ?";
                        $stmt = $this->db->query($sql, [$id]);

                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode(['message'  => 'Deletado equipe com sucesso'], JSON_UNESCAPED_UNICODE);
                    } else {
                        echo json_encode(['message' => 'Nenhuma Equipe cadastrada'], JSON_UNESCAPED_UNICODE);
                    }
                }
                
            }
        }

        function getTeam(){
            if( $this->isAuthenticated("/settingsadmin") ){
                $role = $_SESSION['role'];
                
                $sql = "SELECT t.id, t.name, u.user AS 'registered_by' FROM `teams` t JOIN `users` u ON t.registered_by = u.id;";

                $stmt = $this->db->query($sql);
                $teams = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                if ($teams > 0) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode($teams, JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['message' => 'Nenhuma Equipe cadastrada'], JSON_UNESCAPED_UNICODE);
                }
            }
        }





    }//end Dbcontroller




?>