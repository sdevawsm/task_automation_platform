<?php

    namespace App\Controllers;

    use App\Connection;
    
    class AdedonhaController extends Connection{

        public function Index() {
            if ($this->isAuthenticated("/adedonha")) {
                if (!$this->isActivated("/adedonha")) {
                    header("Location: /activation");
                    return;
                }
        
                // Obtém o ID do usuário da sessão
                $user_id = filter_var($_SESSION['user_id'], FILTER_SANITIZE_NUMBER_INT);
                
                // Obtém o tema ativo do usuário
                $themeData = $this->getUserThemeData($user_id);
        
                $vars = $this->settingVars($themeData);
        
                // Renderiza a página com o tema do usuário
                $this->Render("Layout5", "Receba/adedonha", $vars, ["Adedonha"]);
        
            } else {
                // Renderiza a página de login caso o usuário não esteja autenticado
                $this->Render("Index/Login", ['title' => "Página Index"], []);
                //$this->Render("Layout", "Receba/adedonha", $vars, ["Header", "Tools", "Receba"]);
            }
        }//end index update


        public function getPlayer(){
            if( $this->isAuthenticated("/receba") ){
                try{
                     $id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

                    $query = "SELECT u.id, u.name, u.mail from users u";
                    $stmt = $this->db->query($query);
                    $users = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                    

                    $response = ['status' => 'success', 'users' => $users];
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode($response, JSON_UNESCAPED_UNICODE);
                }
                catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }

        public function enviarPalavra() {
            if ($this->isAuthenticated("/enviar-palavra")) {
                try {
                    $input = json_decode(file_get_contents("php://input"), true);
                    $palavra    = trim($input['palavra'] ?? '');
                    $categoria  = trim($input['categoria'] ?? '');
                    $letra      = strtoupper(trim($input['letra'] ?? ''));
                    $id_user    = $_SESSION['user_id'] ?? null;

                    if ($palavra && $categoria && $letra && $id_user) {
                        $palavraValida = strtoupper($palavra[0]) === $letra;
                        $pontos = $palavraValida ? 10 : 0;

                        $query = "INSERT INTO placar (id_jogador, palavra, pontos, categoria, letra)
                                VALUES (?, ?, ?, ?, ?)";
                        
                        $stmt = $this->db->query($query, [$id_user, $palavra, $pontos, $categoria, $letra]);
                        $pontos = $stmt->fetchAll(\PDO::FETCH_ASSOC);

                        echo json_encode(['status' => 'success', 'pontos' => $pontos]);
                    } else {
                        echo json_encode(['status' => 'error', 'message' => 'Dados incompletos']);
                    }
                } catch (Exception $e) {
                    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
                }
            }
        }


        public function buscarPalavra() {
            if ($this->isAuthenticated("/buscar-palavra")) {
                try {
                    $query = "SELECT u.name, p.palavra, p.pontos, p.categoria, p.letra, p.enviada_em
                            FROM placar p
                            JOIN users u ON u.id = p.id_jogador
                            ORDER BY p.enviada_em DESC LIMIT 1";

                    $stmt = $this->db->query($query);
                    $palavra = $stmt->fetch(\PDO::FETCH_ASSOC);

                    echo json_encode(['palavra' => $palavra ?? []]);
                } catch (Exception $e) {
                    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
                }
            }
        }








    }//end Dbcontroller



    /*



    CREATE TABLE palavras (
        id INT AUTO_INCREMENT PRIMARY KEY,
        id_jogador INT NOT NULL,
        palavra VARCHAR(100) NOT NULL,
        enviada_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );


        CREATE TABLE placar (
            id INT AUTO_INCREMENT PRIMARY KEY,
            id_jogador INT NOT NULL,
            palavra VARCHAR(100) NOT NULL,
            pontos INT NOT NULL DEFAULT 0,
            categoria VARCHAR(50),
            letra CHAR(1),
            enviada_em DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (id_jogador) REFERENCES users(id)
        );




    */

?>

