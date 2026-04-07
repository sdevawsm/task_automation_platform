<?php

    namespace App\Controllers;

    use App\Connection;
    
    class AuthController extends Connection{


         

        public function backup() {
            try {
                $filename = 'backup_' . date('Ymd_His') . '.sql';
                $sqlDump = '';

                // Desativa verificação de chaves estrangeiras
                $sqlDump .= "-- Desativando verificação de chaves estrangeiras\n";
                $sqlDump .= "SET FOREIGN_KEY_CHECKS=0;\n";

                // Obter todas as tabelas
                $tablesResult = $this->db->query("SHOW TABLES");
                $tables = $tablesResult->fetchAll(\PDO::FETCH_COLUMN);

                foreach ($tables as $table) {
                    // Estrutura da tabela
                    $createTableResult = $this->db->query("SHOW CREATE TABLE `$table`");
                    $createTableRow = $createTableResult->fetch(\PDO::FETCH_ASSOC);
                    $sqlDump .= "\n\n-- Estrutura da tabela `$table`\n";
                    $sqlDump .= $createTableRow['Create Table'] . ";\n";

                    // Dados da tabela
                    $dataResult = $this->db->query("SELECT * FROM `$table`");
                    $rows = $dataResult->fetchAll(\PDO::FETCH_ASSOC);

                    if (!empty($rows)) {
                        $sqlDump .= "\n-- Dados da tabela `$table`\n";
                        foreach ($rows as $row) {
                            if (!empty($row)) {
                                $columns = array_keys($row);
                                $values = array_map(function ($value) {
                                    if (is_null($value)) return 'NULL';
                                    return "'" . str_replace(
                                        ["\\", "'", "\n", "\r"],
                                        ["\\\\", "\\'", "\\n", "\\r"],
                                        $value
                                    ) . "'";
                                }, array_values($row));

                                // Garante que número de colunas e valores coincidem
                                if (count($columns) === count($values)) {
                                    $sqlDump .= "INSERT INTO `$table` (`" . implode("`, `", $columns) . "`) VALUES (" . implode(", ", $values) . ");\n";
                                } else {
                                    $sqlDump .= "-- Registro ignorado por inconsistência de colunas em `$table`\n";
                                }
                            }
                        }
                    }
                }

                // Reativa verificação de chaves estrangeiras
                $sqlDump .= "\n-- Reativando verificação de chaves estrangeiras\n";
                $sqlDump .= "SET FOREIGN_KEY_CHECKS=1;\n";

                // Enviar como download
                header('Content-Type: application/sql');
                header('Content-Disposition: attachment; filename="' . $filename . '"');
                echo $sqlDump;
                exit;
            } catch (\Exception $e) {
                echo "❌ Erro ao gerar backup: " . $e->getMessage();
            }
        }





        public function Portifolio(){
            $_SESSION['portifolio'] = true;
            // $_SESSION['role'] = 'user';
            $vars = ['title' => "Portifolio"];
            $components = array();
            $this->Render("Layout4", "Portifolio/Portifolio", $vars, $components);                
            // require_once("../App/Views/Index/LoginView.html");
        }//end Index

        public function portifolio_two(){
            $_SESSION['portifolio'] = true;
            // $_SESSION['role'] = 'user';
            $vars = ['title' => "Portifolio 2"];
            $components = array();
            $this->Render("Layout4", "Portifolio/Portifolio2", $vars, $components);                
            // require_once("../App/Views/Index/LoginView.html");
        }//end Index

        public function isSectionActive(){
            header('Content-Type: application/json; charset=utf-8');
            if( $this->isAuthenticated("/login") ){
                echo json_encode(['status'=>'success','message' => 'Logado'], JSON_UNESCAPED_UNICODE);
            }else{
                echo json_encode(['status'=>'error','message' => 'Deslogado'], JSON_UNESCAPED_UNICODE);
            }
        }


        public function Login() {
            if ($this->isAuthenticated("/login")) {
                if (!$this->isActivated("/login")) {
                    header("Location: /activation");
                    return;
                }
        
                // Obtém o ID do usuário da sessão
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                
                // Recupera o tema ativo do usuário
                $themeData = $this->getUserThemeData($user_id);
                
                $vars = $this->settingVars($themeData);
        
                // Renderiza a página com o tema
                $this->Render("Layout", "Index/Home", $vars, ["Header", "Tools", "WidgetTextEdit"]);
        
            } else if (isset($_SESSION['portifolio']) && $_SESSION['portifolio']) {
                $this->Render("Layout", "Index/Login", ['title' => "Login"], []);
            } else {
                $_SESSION['portifolio'] = true;
                $this->Render("Layout2", "Portifolio/Portifolio", ['title' => "Portifolio"], []);
            }
        }//login
        


        //Não está sendo usada
        public function Index() {
            if ($this->isAuthenticated("/home")) {
                if (!$this->isActivated("/home")) {
                    header("Location: /activation");
                    return;
                }
        
                // Obtém o ID do usuário da sessão
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                
                // Obtém o tema ativo do usuário
                $themeData = $this->getUserThemeData($user_id);
        
                $vars = $this->settingVars($themeData);
        
                // Renderiza a página com o tema do usuário
                $this->Render("Layout", "Index/Home", $vars, ["Header", "Tools", "WidgetTextEdit"]);
        
            } else {
                // Renderiza a página de login caso o usuário não esteja autenticado
                $this->Render("Index/Login", ['title' => "Página Index"], []);
            }
        }//end index
        
        

        public function Home() {
            if ($this->isAuthenticated("/home") && isset($_SESSION['portifolio']) && $_SESSION['portifolio']) {
        
                
                if (!$this->isActivated("/home")) {
                    header("Location: /activation");
                    return;
                }
        
                // Obtém o ID do usuário da sessão
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                
                // Obtém o tema ativo do usuário
                $themeData = $this->getUserThemeData($user_id);


                $vars = $this->settingVars($themeData);
        
                // Renderiza a página com o tema do usuário
                $this->Render("Layout", "Index/Home", $vars, ["Header", "Tools", "WidgetTextEdit"]);
                
            } else {
                // Redireciona para a página inicial caso o usuário não tenha permissão
                header("Location: /");
            }
        }//end home
        


        public function Community(){
            if( $this->isAuthenticated("/community") ){

                if( !$this->isActivated("/login")){
                    header("Location: /activation");
                    return;
                }

                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                // Obtém o tema ativo do usuário
                $themeData = $this->getUserThemeData($user_id);

                $vars = $this->settingVars($themeData);


                $this->Render("Layout" ,"Index/Community", $vars, ["Header", "Tools", "Community"]);         
                                  
                
            }else if( isset( $_SESSION['portifolio'] ) &&  $_SESSION['portifolio']){
                $this->Render("Layout", "Index/Login",  ['title' => "Login"], array());
            }else{
                $_SESSION['portifolio'] = true;
                $this->Render("Layout2", "Portifolio/Portifolio", ['title' => "Portifolio"], array());
            }
            
        }//Community


        public function Report(){
            if( $this->isAuthenticated("/relatorio") ){

                if( !$this->isActivated("/relatorio")){
                    header("Location: /activation");
                    return;
                }

                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);

                // Obtém o tema ativo do usuário
                $themeData = $this->getUserThemeData($user_id);

                $vars = $this->settingVars($themeData);

                $this->Render("Layout" ,"Report/report", $vars, ["Header", "Tools", "Report"]);         
                                  
                
            }else if( isset( $_SESSION['portifolio'] ) &&  $_SESSION['portifolio']){
                $this->Render("Layout", "Index/Login",  ['title' => "Login"], array());
            }else{
                $_SESSION['portifolio'] = true;
                $this->Render("Layout2", "Portifolio/Portifolio", ['title' => "Portifolio"], array());
            }
            
        }//Community

        

        public function Logout(){
            
            $this->insertLog('logout');
            $this->user->logout();

            unset($_SESSION['user']);
            unset($_SESSION['pass']);
            unset($_SESSION);

            

            $this->Render("Layout", "Index/Login", $vars = [
                'title' => "Login",
            ], array());

        }//end Logout


    }




?>