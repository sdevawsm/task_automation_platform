<?php
    namespace App;
    
    use App\Models\UserModel;
    use App\Models\DatabaseModel;
    
    use DateTime;

    class Connection{
        public $db;
        public $user;
        public $isAuth;

        public function __construct(){
            $this->db = new DatabaseModel;
            $this->user = new UserModel( $this->db );
            // $this->isAuth = $this->isAuthenticated();
        }

        public function isAuthenticated(){
            return  $this->user->isAuthenticated();
        }

        public function isActivated(){
            return  $this->user->isActivated();
        }


        public function authenticate($route = "/home") {
            $user = filter_input(INPUT_POST, 'user', FILTER_SANITIZE_STRING);
            $pass = filter_input(INPUT_POST, 'pass', FILTER_SANITIZE_STRING);
            $response = $this->user->authenticate($user, $pass);
        
            if ($response['status'] === 'success' && $response['user']['status'] === 'active') {
                $userData = $response['user'];
                $admData = $response['adm'];

                $_SESSION['user'] = $userData["user"];
                $_SESSION['pass'] = $pass;
                $_SESSION['user_id'] = $userData["id"];
                $_SESSION['role'] = $userData["role"];
                $_SESSION['name'] = $userData["name"];
                $_SESSION['email'] = $userData["mail"];

                $_SESSION['admUser'] = $admData["user"];//dados para o adm
                $_SESSION['admName'] = $admData["name"];//dados para o adm
                $_SESSION['admPass'] = $admData["pass"];//dados para o adm

                $user_id = $userData["id"];
                $sql = "SELECT * FROM `themes` t WHERE t.user_id = $user_id";
                $result_query = $this->db->query($sql);
                $profile = $result_query->fetchAll(\PDO::FETCH_ASSOC);
        
                if (count($profile) == 0) {
                    $stmt = $this->applyDefaultTheme($user_id, 'asda');
                    sleep(1);
                    if ($stmt) {
                        $result_query = $this->db->query($sql);
                        $profile = $result_query->fetchAll(\PDO::FETCH_ASSOC);
                        header("Location: " . $route);
                    }
                } else {
                    header("Location: " . $route);
                }
            } else {
                header("Location: /login");
            }
        }
        



        public function loginForUser($route = "/home") {
            $user = filter_input(INPUT_POST, 'user', FILTER_SANITIZE_STRING);
            $pass = filter_input(INPUT_POST, 'pass', FILTER_SANITIZE_STRING);
            $response = $this->user->authenticate($user, $pass);
        
            header('Content-Type: application/json');
        
            if ($response['status'] === 'success' && $response['user']['status'] === 'active') {
                $userData = $response['user'];
                $admData = $response['adm'];

                $_SESSION['user'] = $userData["user"];
                $_SESSION['pass'] = $pass;
                $_SESSION['user_id'] = $userData["id"];
                $_SESSION['role'] = $userData["role"];
                $_SESSION['name'] = $userData["name"];
                $_SESSION['email'] = $userData["mail"];

                $_SESSION['admUser'] = $admData["user"];//dados para o adm
                $_SESSION['admName'] = $admData["name"];//dados para o adm
                $_SESSION['admPass'] = $admData["pass"];//dados para o adm
        
                $this->insertLog('login');
        
                echo json_encode(['status' => 'success', 'message' => 'Login executado com sucesso!'], JSON_UNESCAPED_UNICODE);
            } else {
                echo json_encode([
                    'status' => $response['status'],
                    'message' => $response['message'] ?? 'Usuário ou senha inválido!'
                ], JSON_UNESCAPED_UNICODE);
            }
        }
        


        public function insertLog($type) {
            // Definir o fuso horário para Fortaleza, Ceará
            date_default_timezone_set('America/Fortaleza');
        
            // Sanitizar o ID do usuário
            $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
            

            //$this->db->query("SET time_zone = 'America/Fortaleza'");

            // Obter a data e hora atual
            $date = date("Y-m-d");
            $time = date("H:i:s");
        
            // Criar a consulta SQL com placeholders nomeados
            $sql = "INSERT INTO `logs`(`id`, `user_id`, `action`, `date`, `time`) VALUES (DEFAULT, :user_id, :type, :date, :time)";
            
            // Parâmetros para a consulta
            $params = [
                'user_id' => $user_id,
                'date' => $date,
                'time' => $time,
                'type' => $type
            ];
        
            // Executar a consulta e tratar possíveis exceções
            try {
                $this->db->query($sql, $params);
            } catch (Exception $exception) {
                echo "error: " . $exception->getMessage();
            }
        }
        
        



        public function ValidateActivationKey($key) {
            $secretKey = getenv('ENCRYPTION_SECRET') ?: 'default-insecure-key'; // Use variável de ambiente ENCRYPTION_SECRET
            $decodedData = base64_decode($key);
        
            // Extrai o IV e os dados criptografados
            $iv = substr($decodedData, 0, 16);
            $encryptedData = substr($decodedData, 16);
        
            $decryptedData = openssl_decrypt($encryptedData, 'aes-128-cbc', $secretKey, 0, $iv);
            
            if ($decryptedData) {
                $data = json_decode($decryptedData, true);
                $currentDate = new DateTime();
                $expirationDate = DateTime::createFromFormat('Y-m-d H:i:s', $data['expires_at']);
        
                if ($currentDate > $expirationDate) {
                    return ['status' => 'error', 'message' => 'Key expired'];
                } else {
                    return [
                        'status' =>'success',
                        'message' => 'Key is valid',
                        'data' => [
                            'created_at' => $data['created_at'],
                            'expires_at' => $data['expires_at'],
                            'final_activation_date' => $data['final_activation_date'],
                            'verification_seal' => $data['verification_seal'] // Inclui o selo de verificação
                        ]
                    ];
                }
            } else {
                return ['status' =>'error', 'message' => 'Invalid key'];
            }
        }
        
        




        public function Render( $layout, $view, $vars, $components ){
            // echo '<pre>';
            // // print_r($vars);
            // var_dump($_SESSION['admUser']);
            // echo '<pre/>';
            $layoutContent = file_get_contents(LEVEL . "App/Views/Components/" . $layout . "View.html");
            $viewContent = file_get_contents(LEVEL . "App/Views/" . $view . "View.html");


            if( empty( $components )  ){
                $layoutContent = str_replace('{{view}}', $viewContent , $layoutContent);
                // $layoutContent = str_replace('{{content}}', $viewContent , $layoutContent);

                $layoutContent = $this->replaceVariables($layoutContent, $vars);
            
            }else{
                $stringComponents = '';
                foreach ($components as $component){
                    // echo $component;
                    $stringComponents = $stringComponents.file_get_contents(LEVEL . "App/Views/Components/" . $component . "View.html");
                }

                $viewContent = str_replace('{{content}}', $stringComponents, $viewContent );
                // $adminContent = $this->extractContentBetweenTags($viewContent, "start_".$_SESSION['role'], "end_".$_SESSION['role']);
                $layoutContent = str_replace('{{view}}', $viewContent , $layoutContent);
                // $layoutContent = str_replace('{{content}}', $viewContent , $layoutContent);

                $layoutContent = $this->replaceVariables($layoutContent, $vars);
            }
                
           
            echo $layoutContent;


        }//end Render


        public function getUserVerificationSeal($key) {
            $encryptedKey = $key;
            $secretKey = getenv('ENCRYPTION_SECRET') ?: 'default-insecure-key'; // Use variável de ambiente ENCRYPTION_SECRET
        
            // Descriptografa a chave de ativação
            $decodedData = base64_decode($encryptedKey);
            if ($decodedData === false) {
                throw new Exception('Erro ao decodificar a chave.');
            }
        
            $iv = substr($decodedData, 0, 16); // Extrai o IV dos primeiros 16 bytes
            $encryptedData = substr($decodedData, 16); // O restante são os dados criptografados
            
            if ($iv === false || $encryptedData === false) {
                throw new Exception('Erro ao extrair IV ou dados criptografados.');
            }
        
            // Descriptografa os dados
            $jsonData = openssl_decrypt($encryptedData, 'aes-128-cbc', $secretKey, 0, $iv);
            if ($jsonData === false) {
                throw new Exception('Erro ao descriptografar os dados.');
            }
        
            $data = json_decode($jsonData, true);
            if ($data === null && json_last_error() !== JSON_ERROR_NONE) {
                throw new Exception('Erro ao decodificar os dados JSON: ' . json_last_error_msg());
            }
        
            if (!isset($data['verification_seal'])) {
                throw new Exception('Selo de verificação não encontrado nos dados.');
            }
        
            $verificationSeal = $data['verification_seal'];
        
            return $verificationSeal;
        }



        function replaceVariables($layoutContent, $vars){
            $pattern = '/{{(.*?)}}/'; // Expressão regular para localizar o conteúdo dentro dos colchetes
            preg_match_all($pattern, $layoutContent, $matches);
            
    
            // substituindo variáveis encontradas dentro do Layout:
            foreach ($matches[1] as $variable) {
                // echo $variable . "<br>";
                if ( array_key_exists( $variable, $vars) ) {
                    //print_r($variable);
                    // Realiza a substituição no layoutContent e atribui o resultado à variável $layoutContent
                    $layoutContent = str_replace('{{' . $variable . '}}', $vars[$variable], $layoutContent);
                }
            }
    
            return $layoutContent;
        }


        function removeRestrictedContent($content, $userPermission) {
            $pattern = '/@start_(.*?)\n(.*?)\n@end_(.*?)\n/s';
        
            // Substitui o conteúdo entre as tags com base nas permissões do usuário
            $filteredContent = preg_replace_callback($pattern, function ($matches) use ($userPermission) {
                $startTag = $matches[1];
                $contentBetweenTags = $matches[2];
                $endTag = $matches[3];
        
                if ($startTag === $userPermission || $userPermission === 'admin') {
                    return $contentBetweenTags . "\n";
                } else {
                    return $matches[0]; // Mantém as tags e o conteúdo não permitido
                }
            }, $content);
        
            return $filteredContent;
        }




        public function getUserThemeData($user_id) {
            // Obtém o tema do usuário utilizando a função checkUserTheme
            $theme = $this->checkUserTheme($user_id);
        
            $url =  $this->db->getCleanedHost();//  $this->getCleanedHost();

            // Se o tema não for encontrado, aplica o padrão e tenta novamente
            if (!$theme) {
                $this->applyDefaultTheme($user_id, $url);
                $theme = $this->checkUserTheme($user_id);
            }

            // echo "<pre>";
            // var_dump($theme);
            // echo "</pre>";
        
            // Certifique-se de que as chaves esperadas realmente existem
            $themeData =  [
    
                'color_scheme' => [
                    'primary_color' => $theme['color_scheme']['primary_color'] ?? '#FFFFFF',
                    'secondary_color' => $theme['color_scheme']['secondary_color'] ?? '#000000',
                    'neutral_color' => $theme['color_scheme']['neutral_color'] ?? '#CCCCCC',
                    'highlight_color' => $theme['color_scheme']['highlight_color'] ?? '#FFD700',
                    'background_color' => $theme['background_color'] ?? '#FFFFFF',
                    'text_color' => $theme['color_scheme']['text_color'] ?? '#000000',
                ],
                'theme' => [
                    'theme_mode' => $theme['theme']['theme_mode'] ?? 'light',
                    'bg_img_status' => $theme['theme']['bg_img_status'] ?? true,
                ],
                'font' => [
                    'family' => $theme['font']['family'] ?? 'Arial',
                    'style' => $theme['font']['style'] ?? 'normal',
                    'weight' => isset($theme['font']['weight']) ? (int)$theme['font']['weight'] : 400,
                ],
                'images' => [
                    'profile_image' => [
                        'path' => $this->buildImagePath(
                            $theme['images']['profile_image']['path'] ?? null,
                            $theme['images']['profile_image']['name'] ?? 'default-profile.jpg',
                            $theme['images']['profile_image']['source'] ?? 'local'
                        ),
                        'source_type' => $theme['images']['profile_image']['source'] ?? 'local',
                    ],
                    'background_image' => [
                        'path' => $this->buildImagePath(
                            $theme['images']['background_image']['path'] ?? null,
                            $theme['images']['background_image']['name'] ?? 'default-background.jpg',
                            $theme['images']['background_image']['source'] ?? 'local'
                        ),
                        'source_type' => $theme['images']['background_image']['source'] ?? 'local',
                    ],
                ],
            ];

            return $themeData;
        }


        public function settingVars($themeData){

            $settings_admin =  '';

                $report = '';

                $popup =  '';
                $add = '';


                if( $_SESSION['role'] == 'admin' || $_SESSION['role'] == 'dev' ){
                    $settings_admin =  '<li><a class="dropdown-item" href="/settingsadmin">Administrador</a></li>';
                    $report = '<li><a class="dropdown-item" href="/relatorio">Pendências</a></li>';
                }
                
                if(
                     $_SESSION['verification_seal'] == '#FFD700'
                     ){
                        
                    $add = '';
                }else if(
                    $_SESSION['verification_seal'] == '#3498DB'  

                    ){
                       
                   $add = '';
               }else{
                    //$add = $add.$popup;
                    $add = $add;
               }

                
                $vars = [
                    'title' => "Página de relatório",
                    'photo_profile' => $themeData['images']['profile_image']['path'] ?? 'default-profile.jpg',
                    'background_image' => $themeData['images']['background_image']['path'] ?? 'default-background.jpg',
                    'theme_mode' => $themeData['theme_mode'] ?? 'light',
                    'color_scheme' => $themeData['color_scheme'] ?? [
                        'primary_color' => '#FFFFFF',
                        'secondary_color' => '#000000',
                        'neutral_color' => '#CCCCCC',
                        'highlight_color' => '#FFD700',
                        'background_color' => '#FFFFFF',
                        'text_color' => '#000000'
                    ],
                    'font' => $themeData['font'] ?? [
                        'family' => 'Arial',
                        'style' => 'normal',
                        'weight' => '400'
                    ],
                    'settings_admin' => $settings_admin,
                    'report' => $report,
                    'add' => $add
                    
                ];

            return $vars;
        }

        
        // Função auxiliar para construir caminhos de imagens
        private function buildImagePath($path, $name, $sourceType) {
            if ($sourceType === 'web') {
                return $path; // Se for de origem web, retorne apenas a URL
            }
            return rtrim($path, '/') . '/' . $name; // Concatene o caminho e o nome do arquivo
        }
        
        


        function checkUserTheme($userId) {
            try {
                $url =  $this->db->getCleanedHost();  // $this->getCleanedHost(); antigo
        
                // SQL para verificar se o usuário possui um tema ativo
                $sql = "
                    SELECT 
                        ut.theme_mode, 
                        ut.background_image_enabled,
                        cs.primary_color, 
                        cs.secondary_color, 
                        cs.neutral_color, 
                        cs.highlight_color, 
                        cs.background_color, 
                        cs.text_color,
                        f.font_family, 
                        f.font_style, 
                        f.font_weight,
                        pi.file_path AS profile_image_path, 
                        pi.new_file_name AS profile_image_name, 
                        pi.source_type AS profile_image_source,
                        bi.file_path AS background_image_path, 
                        bi.new_file_name AS background_image_name, 
                        bi.source_type AS background_image_source
                    FROM active_user_themes aut
                    INNER JOIN user_themes ut ON aut.user_theme_id = ut.id 
                    LEFT JOIN color_schemes cs ON ut.color_scheme_id = cs.id
                    LEFT JOIN fonts f ON ut.font_id = f.id
                    LEFT JOIN images pi ON ut.profile_image_id = pi.id
                    LEFT JOIN images bi ON ut.background_image_id = bi.id
                    WHERE aut.user_id = :user_id AND aut.source_url = :source_url  
                    ORDER BY aut.activated_at DESC
                    LIMIT 1;

                ";
        
                // Executa a consulta com parâmetros
                $stmt = $this->db->query($sql, ['user_id' => $userId, 'source_url' => $url]);
                $theme = $stmt->fetch(\PDO::FETCH_ASSOC);
        
                // Se o usuário não tiver um tema ativo, aplica o tema padrão e tenta novamente
                if (!$theme) {
                    $this->applyDefaultTheme($userId, $url);
        
                    // Reexecuta a consulta para obter o tema padrão recém-aplicado
                    $stmt = $this->db->query($sql, ['user_id' => $userId, 'source_url' => $url ]);
                    $theme = $stmt->fetch(\PDO::FETCH_ASSOC);
                }

  
        
                // Monta o array com os dados completos do tema do usuário
                $themeData = [
                    'theme' => [
                        'theme_mode' => $theme['theme_mode'] ?? 'light',
                        'bg_img_status' => isset($theme['background_image_enabled']) ? $theme['background_image_enabled'] == '1' : false,
                    ],
                    'color_scheme' => [
                        'primary_color' => $theme['primary_color'] ?? '#FFFFFF',
                        'secondary_color' => $theme['secondary_color'] ?? '#000000',
                        'neutral_color' => $theme['neutral_color'] ?? '#CCCCCC',
                        'highlight_color' => $theme['highlight_color'] ?? '#FFD700',
                        'background_color' => $theme['background_color'] ?? '#FFFFFF',
                        'text_color' => $theme['text_color'] ?? '#000000',
                    ],
                    'font' => [
                        'family' => $theme['font_family'] ?? 'Arial',
                        'style' => $theme['font_style'] ?? 'normal',
                        'weight' => isset($theme['font_weight']) ? (int)$theme['font_weight'] : 400, // Converta para número
                    ],
                    'images' => [
                        'profile_image' => [
                            'path' => $theme['profile_image_path'] ?? 'default-profile.jpg',
                            'name' => $theme['profile_image_name'] ?? 'default-profile.jpg', // Inclua o nome do arquivo
                            'source' => $theme['profile_image_source'] ?? 'local',
                        ],
                        'background_image' => [
                            'path' => $theme['background_image_path'] ?? 'default-background.jpg',
                            'name' => $theme['background_image_name'] ?? 'default-background.jpg', // Inclua o nome do arquivo
                            'source' => $theme['background_image_source'] ?? 'local',
                        ],
                    ]
                ];
        
                // Fecha a declaração
                $stmt = null;
        
                return $themeData;
        
            } catch (PDOException $e) {
                // Trata possíveis erros
                echo "Erro ao verificar o tema do usuário: " . $e->getMessage();
                return [];
            }
        }
        
        //agora está sendo trazido do databaseMOdel
        /*function getCleanedHost() {
            $host = $_SERVER['HTTP_HOST'];
        
            // Remove a porta, se existir
            $host = preg_replace('/:\d+$/', '', $host);
        
            // Obter o nome principal do host
            $mainHost = $this->getMainHost($host);
        
            return $mainHost;
        }
        
        // Função para obter o nome principal do host
        function getMainHost($host) {
            if ($host === 'localhost') {
                return $host;
            }
        
            $hostParts = explode('.', $host);
            $numParts = count($hostParts);
        
            if ($numParts > 2) {
                // Remove os dois últimos elementos (subdomínio e TLD)
                array_pop($hostParts); // Remove TLD
                array_pop($hostParts); // Remove subdomínio
            }
        
            return implode('.', $hostParts);
        }*/
 
        
        
        

        public function applyDefaultTheme($user_id, $source_url) {
            $defaultProfileImage = [
                "_4e04ee6b-823f-4708-9517-5bbe1fecab8e.jpg", "_5d5575ae-ee8b-4d79-b5f4-5494f680e937.jpeg ","_980b1f4e-710e-474b-87a4-ff98d1544a39.jpeg",      
                "_5da1cfb2-76d7-4aa0-955d-baad190c9825.jpg",       "_9ca6f510-11e6-40c0-af98-4e5308971e01.jpeg",
                "_073f4da9-33dc-4cc8-8d12-db77963c8bf1.jpeg",      "_5e1307c6-dea8-4658-bc7f-8ca4e11c8227.jpeg" ,     "_a0d79560-3d22-40d9-abbb-c677f16b1e6b.jpeg",
                "_0a89193a-9c94-43f9-9d2b-d01e67f92aaa.jpeg",      "_5e535aa2-b0f8-4d6c-97da-0ca5ae99ea19.jpeg"  ,    "_abb55139-a908-4bc2-bec2-ee66929fca1e.jpeg",
                "_0f5977b8-4965-448b-9a94-09e3245e878e.jpeg",      "_5eb6b2fa-d841-44d4-89e2-9d8734e0faf9.jpg"    ,   "_b1406e4a-646b-4cb6-aeec-81aba1d61194.jpeg",
                "_1051cf00-1652-4568-9af8-6e744f330b48.jpeg",     "_609ada2b-b9ed-491b-8474-032b14b242eb.jpeg"     , "_b69cd7a8-8100-4b39-bcc7-564dd5781d0d.jpeg",
                "_1380b998-5b49-4899-93a9-b734d5543874.jpeg",     "_62d484ba-dbaa-4d06-b9d7-ae15781f0029.jpeg",      "_b6aa74d0-0c49-483e-99fb-b3f8a4b1dd42.jpg",
                "_1675300c-de3b-4d6d-b0ee-d00daec139b5.jpeg" ,     "_62ec53dc-4727-445b-9a32-f2256bc10254.jpeg",      "_b8826fd8-62f7-4180-a474-c0381934e6ca.jpeg",
                "_194a6927-cf6d-4883-9349-1892ca9848b1.jpeg"  ,    "_642059e2-fba8-4f4a-95c5-c9786ca0d394.jpg"  ,     "_bfa17642-0a3a-4ff1-bb9b-58d90df2a00d.jpg",
                "_1ae45778-864f-4731-86ba-a8080170b5d0.jpeg"   ,   "_65ce0860-bb49-4972-a519-b47f4a7125b9.jpeg"  ,    "_c2406b4f-3a3d-4054-a4cc-0e194896f277.jpg",
                "_2254933d-2bae-4ec5-942c-15c71fea4d6b.jpeg"    ,  "_6b43ad9c-3ee4-485a-ab59-d15bca371090.jpeg"   ,   "_c907c0d3-b9b9-4227-a526-138b16cd64a3.jpg",
                "_23987cf0-c55a-439c-a203-26a379502ff5.jpeg"     , "_6c49a4a1-7267-483a-966f-e85ad91fe83a.jpeg",     "_c9dd38d5-b70a-4aaa-a5f4-4622d2d1c934.jpeg",
                "_27e43318-c388-4bb9-97a9-51dc56008f80.jpeg",      "_6cce718d-bb98-4763-89ea-2d8f0f0815f3.jpeg" ,     "_cef42939-4b8d-46c7-b5e4-8d36e94c8fb4.jpg",
                "_2c564bb4-3f55-4567-8294-b2ce8e8e477a.jpg"  ,     "_7082b548-f04f-4f70-ae3c-ba7798767472.jpg"   ,    "_d486a17b-dbfd-4029-978a-0c1c05a0d1b7.jpeg",
                "_2e68057b-7e09-422a-82b8-3cc98d1ad10d.jpg"   ,    "_75e578ba-9f49-4948-a89d-1550e89c8160.jpeg"   ,   "_d6e9d6f6-2a75-445b-b331-5f0b1b897659.jpg",
                "_300abdfd-aa1e-4af3-b938-59c43e4bbc7c.jpg"    ,   "_774ec150-d990-4aa3-8972-674833db8544.jpeg",      "_dacede14-be6c-48bb-85f5-9f51da1926d5.jpeg",
                "_318fc6a8-3278-44fc-bba2-b31b6cbf1e5a.jpeg"    ,  "_790a94f3-427e-44fd-9198-d3874e48efab.jpeg" ,     "_e329e94d-5085-4f9f-99ae-9f698575e798.jpg",
                "_3602adcf-4258-484d-9bd2-e9ea7157bd97.jpg" ,      "_7adc4481-cefa-4037-8d22-693579ea978f.jpg"   ,    "_eb152da8-b54b-4d6c-88bd-33f0ab2c1bb1.jpeg",
                "_3627fb74-c3a7-40fd-9f71-d9df1d662d08.jpeg" ,    "_7e5c7a33-e8d3-4db4-87df-e7cdd269dd33.jpeg"    ,  "_f6814e18-a338-4ab7-baef-fe1e07607f82.jpg",
                "_3d6bd8b1-0904-4041-9688-451cdc457967.jpeg"  ,    "_7ef1458f-1775-4730-9c3f-bc57920ac80e.jpeg",      "_f758529f-75c1-41b9-9772-913cd45dafe9.jpeg",
                "_471d5ca7-cca8-4b06-81ce-3934aa1ebdab.jpeg"   ,   "_8049f7cb-2dfc-4117-8b89-df0f028e22a3.jpeg" ,     "_f8064763-5ff6-4700-9627-47bb748c2ba8.jpg",
                "_4e04ee6b-823f-4708-9517-5bbe1fecab8e.jpg"     ,  "_83fae5c3-f074-4544-a71e-5c9eb85e9989.jpeg"  ,    "_f9d12534-c6b5-4efa-a4b9-e1e5b6c447b7.jpeg",
                "_4f4cbb91-bc9d-4a16-bddd-deb2923c38bf.jpg" ,      "_8b7b72ed-5e6f-4eee-b386-2aca3aa58de8.jpg"    ,  "_ff428b57-f497-4cbe-8c71-142991dc73f5.jpeg",
                "_58bc2e9a-d366-4448-93ce-4110af5bca16.jpeg" ,     "_91c9d2ec-d2ed-4ca1-8947-e7cce34b3828.jpeg",     
                "_5bf20204-cce9-4277-b12c-e34760768049.jpg"   ,    "_9586b2f3-4200-43cc-9cbb-4e37feedaf72.jpeg",
                "_5cfbc706-470b-48de-a167-8722c8fd9dbc.jpeg"   ,   "_964b03df-78a0-47af-902e-969420db5540.jpeg"
            
            
            ];
            $backgroundImages = [
                "https://images.pexels.com/photos/2781760/pexels-photo-2781760.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/2049422/pexels-photo-2049422.jpeg",
                "https://images.pexels.com/photos/2670898/pexels-photo-2670898.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/459203/pexels-photo-459203.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/1450360/pexels-photo-1450360.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/1643403/pexels-photo-1643403.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/33545/sunrise-phu-quoc-island-ocean.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/2834219/pexels-photo-2834219.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/2582905/pexels-photo-2582905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/8093445/pexels-photo-8093445.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/1548111/pexels-photo-1548111.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/2693036/pexels-photo-2693036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/4067727/pexels-photo-4067727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/2203062/pexels-photo-2203062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/2837572/pexels-photo-2837572.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/8986019/pexels-photo-8986019.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/46178/teddy-bear-bear-children-toys-forest-46178.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/2860705/pexels-photo-2860705.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/1322444/pexels-photo-1322444.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/7723276/pexels-photo-7723276.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
                "https://images.pexels.com/photos/3509971/pexels-photo-3509971.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            ];

            // Seleciona uma imagem de perfil e de fundo aleatoriamente
            $profileImageFileName = $defaultProfileImage[array_rand($defaultProfileImage)];
            $backgroundImageUrl = $backgroundImages[array_rand($backgroundImages)];
        
            // Seleciona um esquema de cores e uma fonte padrão
            // $colorSchemeId = $this->db->query("SELECT id FROM color_schemes WHERE scope = 'global' ORDER BY RAND() LIMIT 1")->fetchColumn();
            $colorSchemeId = 1;

            //$fontId = $this->db->query("SELECT id FROM fonts WHERE scope = 'global' ORDER BY RAND() LIMIT 1")->fetchColumn();
            $fontId = 12;
        
            // Insere imagem de perfil se não existir
            $profileImageId = $this->db->query("SELECT id FROM images WHERE user_id = :user_id AND source_url = :source_url AND application_name = :application_name", [
                'user_id' => $user_id,
                'source_url' => $source_url,
                'application_name' => 'Profile'
            ])->fetchColumn();
        
            if (!$profileImageId) {
                $this->db->query(
                    "INSERT INTO images (
                        user_id, 
                        image_type, 
                        original_file_name, 
                        new_file_name, 
                        file_path, 
                        source_url, 
                        source_type, 
                        application_name
                    ) VALUES (
                        :user_id, 
                        :image_type, 
                        :original_file_name, 
                        :new_file_name, 
                        :file_path, 
                        :source_url, 
                        :source_type, 
                        :application_name
                    )", 
                    [
                        'user_id' => $user_id,
                        'image_type' => 'global',
                        'original_file_name' => $profileImageFileName,
                        'new_file_name' => $profileImageFileName,
                        'file_path' => 'public/images/profile',
                        'source_url' => $source_url,
                        'source_type' => 'local',
                        'application_name' => 'Profile'
                    ]
                );
                $profileImageId = $this->db->lastInsertId();
            }
            
        
            // Insere imagem de fundo se não existir
            $backgroundImageId = $this->db->query("SELECT id FROM images WHERE user_id = :user_id AND source_url = :source_url AND application_name = :application_name", [
                'user_id' => $user_id,
                'source_url' => $source_url,
                'application_name' => 'Background'
            ])->fetchColumn();
        
            if (!$backgroundImageId) {
                $this->db->query("INSERT INTO images (`user_id`, `image_type`, `original_file_name`, `new_file_name`, `file_path`, `source_url`, `source_type`, `application_name`) 
                    VALUES (:user_id, :image_type, :original_file_name, :new_file_name, :file_path, :source_url, :source_type, :application_name)", [
                    'user_id' => $user_id,
                    'image_type' => 'local',  // Definindo o tipo da imagem como 'web'
                    'original_file_name' => 'NULL',
                    'new_file_name' => 'NULL',
                    'file_path' => $backgroundImageUrl,
                    'source_url' => $source_url,
                    'source_type' => 'web', // Fonte 'web'
                    'application_name' => 'Background'  // Nome da aplicação 'Background'
                ]);
                $backgroundImageId = $this->db->lastInsertId();
            }
                        
        
            // Verifica se um tema para o usuário já existe e cria ou atualiza o registro
            $existingThemeId = $this->db->query("SELECT id FROM user_themes WHERE user_id = :user_id AND source_url = :source_url", [
                'user_id' => $user_id,
                'source_url' => $source_url,
            ])->fetchColumn();
        
            if ($existingThemeId) {
                $this->db->query("UPDATE user_themes 
                                  SET profile_image_id = :profile_image_id, 
                                      background_image_id = :background_image_id, 
                                      color_scheme_id = :color_scheme_id, 
                                      font_id = :font_id, 
                                      theme_mode = :theme_mode, 
                                      background_image_enabled = :background_image_enabled 
                                  WHERE id = :id", [
                    'profile_image_id' => $profileImageId,
                    'background_image_id' => $backgroundImageId,
                    'color_scheme_id' => $colorSchemeId,
                    'font_id' => $fontId,
                    'theme_mode' => 'light',
                    'background_image_enabled' => true, // Novo campo
                    'id' => $existingThemeId
                ]);
            } else {
                $this->db->query("INSERT INTO user_themes (user_id, profile_image_id, background_image_id, color_scheme_id, font_id, theme_mode, background_image_enabled, source_url) 
                                  VALUES (:user_id, :profile_image_id, :background_image_id, :color_scheme_id, :font_id, :theme_mode, :background_image_enabled, :source_url)", [
                    'user_id' => $user_id,
                    'profile_image_id' => $profileImageId,
                    'background_image_id' => $backgroundImageId,
                    'color_scheme_id' => $colorSchemeId,
                    'font_id' => $fontId,
                    'theme_mode' => 'light',
                    'background_image_enabled' => true, // Novo campo
                    'source_url' => $source_url
                ]);
                $existingThemeId = $this->db->lastInsertId();
            }
            
        
            // Define o tema como ativo para o usuário
            $this->db->query("INSERT INTO active_user_themes (user_id, user_theme_id, source_url) VALUES (:user_id, :user_theme_id, :source_url)", [
                'user_id' => $user_id,
                'user_theme_id' => $existingThemeId,
                'source_url' => $source_url
            ]);
        }
        
    

        
    }//end class connection


    

    

    

?>