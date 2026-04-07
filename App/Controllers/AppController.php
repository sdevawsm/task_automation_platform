<?php
    namespace App\Controllers;

    use App\Connection;

    class AppController extends Connection{

        public function Setting(){            
            if( $this->isAuthenticated("/settings") ){
                if (!$this->isActivated("/home")) {
                    header("Location: /activation");
                    return;
                }

                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);              
                $themeData = $this->getUserThemeData($user_id);

                // echo '<pre>';
                // var_dump($themeData);
                // echo '</pre>';


                $verification_seal = "
                    <span class='verification-seal position-absolute' style='bottom: 10px; right: 10px;'> 
                        <svg width='35' height='35' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                            <circle cx='12' cy='12' r='12' fill='" . $_SESSION['verification_seal'] . "' style='border: solid 5px white;'/>
                            <path d='M7.5 12.5l3 3 5.5-5.5' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' />
                        </svg>                                                      
                    </span>
                ";
 
                

                $img_profile_edit = '
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-primary" onclick="enableFormByProfileEdit(event, \'img_ext\')">Link de uma imagem da internet</button>
                    </div>
                ';

                $img_bg_edit = '
                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                        <button type="button" class="btn btn-primary" onclick="enableFormByProfileEdit(event, \'img_ext\')">Link de uma imagem da internet</button>
                    </div>
                ';

                $scope_shortcuts = '<br>';
                $scope_category  = '<br>';
                $scope_category_Text_Model = '<br>';


                if($_SESSION['role'] == 'admin'){
                    $scope_shortcuts = '
                        <div class="input-group input-group-sm mb-3">
                            <label class="input-group-text" for="selectScopeShortcut">Escopo</label>
                            <select class="form-select selectScopeShortcut" id="selectScopeShortcut">
                                <option value="local" selected>Local</option>
                                <option value="global">Global</option>
                            </select>
                        </div>
                    ';

                    $scope_category = '
                        <div class="input-group input-group-sm mb-3">
                            <label class="input-group-text" for="selectTxtTemplate">Escopo</label>
                            <select class="form-select selectTxtTemplate" id="selectTxtTemplate">
                                <option value="local" selected>Local</option>
                                <option value="global">Global</option>
                            </select>
                        </div>
                    ';

                    $scope_category_Text_Model  = '
                        <div class="input-group input-group-sm mb-3">
                            <label class="input-group-text" for="selectScopeTextModel">Escopo</label>
                            <select class="form-select selectScopeTextModel" id="selectScopeTextModel">
                                <option value="local" selected>Local</option>
                                <option value="global">Global</option>
                            </select>
                        </div>
                    ';
                }



                if($_SESSION['verification_type'] == 'golden' || $_SESSION['verification_type'] == 'blue' ){
                    $img_profile_edit = '
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn btn-primary" onclick="enableFormByProfileEdit(event, \'img_ext\')">Link de uma imagem da internet</button>
                            <button type="button" class="btn btn-outline-primary " onclick="enableFormByProfileEdit(event, \'img_file\')">Envie um arquivo de imagem</button>
                        </div>

                        <div class="input-group input-group-sm mt-3 hide_element img_file in_inputs">
                            <input readonly type="file" class="form-control photo-profile editField" id="name" placeholder="Sua foto">
                            <button class="btn btn-outline-secondary" type="button" onclick="updatePhotoProfile(this.parentElement, \'Profile\')">Salvar</button>
                        </div>
                    ';

                    $img_bg_edit = '
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn btn-primary" onclick="enableFormByProfileEdit(event, \'img_ext\')">Link de uma imagem da internet</button>
                            <button type="button" class="btn btn-outline-primary" onclick="enableFormByProfileEdit(event, \'img_file\')">Envie um arquivo de imagem</button>
                        </div>

                        <div class="input-group input-group-sm mt-3 hide_element img_file in_inputs">
                            <input readonly type="file" class="form-control photo-profile editField" id="name" placeholder="Sua foto">
                            <button class="btn btn-outline-secondary" type="button" onclick="updatePhotoProfile(this.parentElement, \'Background\')">Salvar</button>
                        </div>
                    ';
                }else{
                    $img_profile_edit = '
                        <div class="btn-group btn-group-sm" role="group" aria-label="Basic outlined example">
                            <button type="button" class="btn btn-primary" onclick="enableFormByProfileEdit(event, \'img_ext\')">Link de uma imagem da internet</button>
                            <button type="button" class="btn btn-outline-primary " onclick="enableFormByProfileEdit(event, \'img_file\')">Envie um arquivo de imagem</button>
                        </div>

                        <div class="input-group input-group-sm mt-3 hide_element img_file in_inputs">
                            <input readonly type="file" class="form-control photo-profile editField" id="name" placeholder="Sua foto">
                            <button class="btn btn-outline-secondary" type="button" onclick="updatePhotoProfile(this.parentElement, \'Profile\')">Salvar</button>
                        </div>
                    ';
                }

                $vars = $this->settingVars($themeData);

                $vars += [
                    'user' => $_SESSION['user'],
                    'name' => $_SESSION['name'],
                    'email' => $_SESSION['email'],
                    'password' => $_SESSION['pass'],
                    'verification_seal' => $verification_seal,
                    'final_activation_date' => $_SESSION['final_activation_date'],
                    'img_bg_edit' => $img_bg_edit,
                    'img_profile_edit' => $img_profile_edit,
                    'scope_shortcuts' => $scope_shortcuts,
                    'scope_category' => $scope_category,
                    'scope_category_Text_Model' => $scope_category_Text_Model,
                    'adm_user' => $_SESSION['admUser'],
                    'adm_name' => $_SESSION['admName'],
                    'adm_pass' =>$_SESSION['admPass']
                ];

                $this->Render("Layout", "Settings/Setting", $vars, ["Header", "UserSettings", "WidgetSettings", "Notifications", "Tools"]);
            
            }else{
                header("Location: /");
            }
        }//end  Setting



        public function SettingsAdmin(){            
            if( $this->isAuthenticated("/settingsadmin") ){

                /*if (!$this->isActivated("/home")) {
                    header("Location: /activation");
                    return;
                }*/

                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);              
                $themeData = $this->getUserThemeData($user_id);

                $vars = $this->settingVars($themeData);

                $vars += [
                    'user' => $_SESSION['user'],
                    'name' => $_SESSION['name'],
                    'email' => $_SESSION['email'],
                    'password' => $_SESSION['pass'],
                    'final_activation_date' => $_SESSION['final_activation_date']
                ];

                
                $role = $_SESSION['role'];

                if( in_array($role, ["admin", "dev"] ) ){
                    $this->Render("Layout", "Settings/Setting", $vars, ["Header", "WidgetSettingsAdmin", "Tools"]);
                }else{
                    header("Location: /home");
                }
                
                        
            }else{
                header("Location: /");
            }
        }//end  SettingsAdmin


        public function UpdateUserStatus(){
            if( $this->isAuthenticated("/updateuserstatusplatform") ){
                try{
                    $admin = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';
                    $status_user = filter_var($_GET['status'], FILTER_SANITIZE_STRING);
                    $id_user = filter_var($_GET['id'], FILTER_SANITIZE_STRING);


                    header('Content-Type: application/json; charset=utf-8');

                    if (!$admin || $admin  != 29) {
                        $response = ['status' => 'error', 'message' => 'Usuário incorreto ou não autorizado'];
                        echo json_encode($response, JSON_UNESCAPED_UNICODE);
                    }

                    if ($status_user == 'active' || $status_user == 'inactive') {
                        $query = "UPDATE users SET status = ? WHERE id = ?";
                        $stmt = $this->db->query($query, [$status_user, $id_user]); // Use prepare para passar parâmetros com segurança
                    
                        // Verifica se alguma linha foi afetada
                        if ($stmt->rowCount() > 0) {
                            $response = ['status' => 'success', 'message' => 'Status atualizado com sucesso'];
                        } else {
                            $response = ['status' => 'warning', 'message' => 'Nenhuma linha foi modificada'];
                        }
                    
                        echo json_encode($response, JSON_UNESCAPED_UNICODE);
                    }
                }
                catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }

        function getSessions() {
            $admin = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';
            $role = $_SESSION['role'];
        
            if ($this->isAuthenticated("/settings")) {
                if (in_array($role, ["admin", "dev", "user"]) ) {
                    try {
                        $sql = "SELECT s.id,s.server_domain,s.login_time, u.user FROM `users` u JOIN `sessions` s ON u.id = s.user_id;";
                        $stmt = $this->db->query($sql);
                        
                        header('Content-Type: application/json; charset=utf-8');
                        
                        if ($stmt->rowCount() > 0) {
                            $all_users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                            echo json_encode([
                                'status' => 'success',
                                'data' => $all_users
                            ], JSON_UNESCAPED_UNICODE);
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'message' => 'Erro ao obter dados'
                            ], JSON_UNESCAPED_UNICODE);
                        }
                    } catch (Exception $e) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Erro ao executar a consulta: ' . $e->getMessage()
                        ], JSON_UNESCAPED_UNICODE);
                    }
                }
            }
        }



        function deleteSessions() {
            $admin = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';
            $role = $_SESSION['role'];

            $id_session = filter_var($_GET['id'], FILTER_SANITIZE_STRING);
        
            if ($this->isAuthenticated("/settings")) {
                if (in_array($role, ["admin", "dev", "user"]) ) {
                    try {
                        $sql = "DELETE FROM `sessions` WHERE id = ? ";
                        $stmt = $this->db->query($sql, [$id_session]);
                        
                        header('Content-Type: application/json; charset=utf-8');
                        
                        if ($stmt->rowCount() > 0) {
                            $all_users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                            echo json_encode([
                                'status' => 'success',
                                'data' => $all_users
                            ], JSON_UNESCAPED_UNICODE);
                        } else {
                            echo json_encode([
                                'status' => 'error',
                                'message' => 'Erro ao obter dados'
                            ], JSON_UNESCAPED_UNICODE);
                        }
                    } catch (Exception $e) {
                        echo json_encode([
                            'status' => 'error',
                            'message' => 'Erro ao executar a consulta: ' . $e->getMessage()
                        ], JSON_UNESCAPED_UNICODE);
                    }
                }
            }
        }


    }//end Settings


    


?>