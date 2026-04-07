<?php

    namespace App\Controllers;

    use App\Connection;
    
    class MessageController extends Connection{

        public function index() {
            if ($this->isAuthenticated("/receba")) {
                if (!$this->isActivated("/receba")) {
                    header("Location: /activation");
                    return;
                }
        
                // Obtém o ID do usuário da sessão
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                
                // Obtém o tema ativo do usuário
                $themeData = $this->getUserThemeData($user_id);
        
                $vars = $this->settingVars($themeData);
        
                // Renderiza a página com o tema do usuário
                $this->Render("LayoutMessage", "Message/Message", $vars, []);
        
            } else {
                // Renderiza a página de login caso o usuário não esteja autenticado
                $this->Render("Index/Login", ['title' => "Página Index"], []);
                
            }
        }//end index update





    }//end controller




?>