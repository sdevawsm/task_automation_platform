<?php

    namespace App\Controllers;

    use App\Connection;
    
    class PlatformCategoriesController extends Connection{

        function CreateScriptCategory(){
            if( $this->isAuthenticated("/settingsadmin") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $role = $_SESSION['role'];
                $name_category = $_POST['name'];
                $scope = $_POST['scope'];
                $id_team = $_POST['team'];

                $sql = "INSERT INTO `template_text_categories`(`user_id`, `name`, `scope`, `id_team`) 
                        SELECT  '$user_id', '$name_category',  '$scope', '$id_team'
                        WHERE NOT EXISTS (SELECT 1 FROM `template_text_categories` WHERE `name` = '$name_category');";

                echo json_encode($sql, JSON_UNESCAPED_UNICODE);

                if($role == "admin" || $role == "dev"){
                    $stmt = $this->db->query($sql);
                    if ($stmt->rowCount() > 0) {
                        header('Content-Type: application/json; charset=utf-8');
                        echo json_encode(['message' => 'Category registered successfully'], JSON_UNESCAPED_UNICODE);
                    } else {
                        echo json_encode(['message' => 'Category already exists'], JSON_UNESCAPED_UNICODE);
                    }
                }
                //print_r(json_encode($_POST, JSON_UNESCAPED_UNICODE ));
   
            } 
        }


        function getScriptCategory(){
            if( $this->isAuthenticated("/settingsadmin") ){
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                $role = $_SESSION['role'];
                
                $sql = "SELECT c.*, IFNULL(t.name, 'sem equipe') as name_team, u.user FROM template_text_categories c LEFT JOIN teams t ON t.id = c.id_team LEFT JOIN users u ON u.id = c.user_id WHERE c.user_id = $user_id";

                $stmt = $this->db->query($sql);
                $category = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                if ($category > 0) {
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode($category, JSON_UNESCAPED_UNICODE);
                } else {
                    echo json_encode(['message' => 'Nenhuma categoria cadastrada'], JSON_UNESCAPED_UNICODE);
                }
            }
        }

        
        
    
        function UpdateScriptCategory(){
            //error_log("UpdateScriptCategory chamada");
            $role = $_SESSION['role'];
            if( $this->isAuthenticated("/settingsadmin") ){
                if($role == "admin" || $role == "dev" || $role == "user"){
                    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
                    $name = filter_var($_POST['name'], FILTER_SANITIZE_STRING);
                    $team = filter_var($_POST['team'], FILTER_SANITIZE_STRING);
                    $scope = filter_var($_POST['scope'], FILTER_SANITIZE_STRING);


                   $sql = "UPDATE `template_text_categories` SET `name` = ?, `scope` = ?, `id_team` = ? WHERE `id` = ?";
                    
                    //header('Content-Type: application/json; charset=utf-8');
                    //echo json_encode( $sql, JSON_UNESCAPED_UNICODE);
                    $stmt = $this->db->query($sql, [$name, $scope, $team, $id]);

                    header('Content-Type: application/json; charset=utf-8');
                    if ($stmt->rowCount() > 0) {
                        echo json_encode(['message'  => 'Atualizado equipe com sucesso'], JSON_UNESCAPED_UNICODE);
                    } else {
                        echo json_encode(['message' => 'Erro ao atualizar'], JSON_UNESCAPED_UNICODE);
                    }
                }
                
            }
        }

        function DeleteScriptCategory(){
            if( $this->isAuthenticated("/settingsadmin") ){
                $role = $_SESSION['role'];
                if( in_array($role, ["admin", "dev", "user"] ) ){
                    $id = filter_var($_POST['id'], FILTER_SANITIZE_NUMBER_INT);
                    $sql = "DELETE FROM `template_text_categories` WHERE `id` = ?";
                    $stmt = $this->db->query($sql, [$id]);

                    if ($stmt->rowCount() > 0) {
                        $sql = "UPDATE `users_text_models` SET `category`='all' WHERE `category` = ?";
                        $stmt = $this->db->query($sql, [$id]);
                        if( $stmt->rowCount() > 0 ){
                            header('Content-Type: application/json; charset=utf-8');
                            echo json_encode([ 'status' => 'success','message'  => 'Excluído e atualizado scripts que usam essa categoria para categoria todos'], JSON_UNESCAPED_UNICODE);
                        }else{
                            header('Content-Type: application/json; charset=utf-8');
                            echo json_encode([ 'status' => 'success','message'  => 'Falha ao atualizar scripts para categoria todos'], JSON_UNESCAPED_UNICODE);
                        }
                    } else {
                        echo json_encode([ 'status' => 'success','message'  => 'Falha ao excluir'], JSON_UNESCAPED_UNICODE);
                    }
                }
            }
        }//end del

   




    }//end Dbcontroller




?>