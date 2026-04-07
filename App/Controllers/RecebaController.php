<?php

    namespace App\Controllers;

    use App\Connection;
    
    class RecebaController extends Connection{

        public function Index() {
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
                $this->Render("Layout", "Receba/receba", $vars, ["Header", "Tools", "Receba"]);
        
            } else {
                // Renderiza a página de login caso o usuário não esteja autenticado
                //$this->Render("Index/Login", ['title' => "Página Index"], []);
                $this->Render("Layout", "Receba/receba", $vars, ["Header", "Tools", "Receba"]);
            }
        }//end index update


        public function Create(){
            if( $this->isAuthenticated("/receba") ){
                try {
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

					$criado_em = $this->db->getDatetimeFortaleza();

					if (isset($_POST['nome_pedido'])) {
						$query = "INSERT INTO pedidos (usuario_id, nome_pedido, criado_em,status) VALUES (?, ?, ?,'ativo')";
						$stmt = $this->db->query($query, [$id_user, $_POST['nome_pedido'], $criado_em]);
						

						$response = ['status' => 'success', 'message' => 'Encomenda cadastrada com sucesso!'];
						echo json_encode($response);
					}
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }


        public function Read(){
            if( $this->isAuthenticated("/receba") ){                
                try {
                    $id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : null;
                
                    $query = "SELECT p.*, 
                              SUBSTRING_INDEX(u.name, ' ', 2) as nome_usuario 
                              FROM pedidos p 
                              JOIN users u ON p.usuario_id = u.id 
                              WHERE p.status = 'ativo' 
                              ORDER BY p.criado_em DESC";
                
                    $stmt = $this->db->query($query);
                    $pedidos = $stmt->fetchAll(\PDO::FETCH_ASSOC);
                
                    foreach ($pedidos as &$pedido) {
                        // Verifica se o usuário da sessão é o mesmo que cadastrou o pedido
                        $pedido['tipo_usuario'] = ($id_user !== null && $id_user == $pedido['usuario_id']) 
                            ? 'proprietario' 
                            : 'outro';
                
                        $queryDesc = "SELECT d.*, 
                                      SUBSTRING_INDEX(u.name, ' ', 2) as nome_usuario 
                                      FROM descricoes_pedidos d 
                                      JOIN users u ON d.usuario_id = u.id 
                                      WHERE d.pedido_id = ? 
                                      ORDER BY d.criado_em DESC";
                
                        $pedido_id = $pedido['id']; 
                        $stmtDesc = $this->db->query($queryDesc, [$pedido_id]);
                        $pedido['descricoes'] = $stmtDesc->fetchAll(\PDO::FETCH_ASSOC);
                    }
                
                    $response = ['status' => 'success', 'pedidos' => $pedidos];
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode($response, JSON_UNESCAPED_UNICODE);
                
                } catch (Exception $e) {
                    $response = ['status' => 'error', 'message' => $e->getMessage()];
                    header('Content-Type: application/json; charset=utf-8');
                    echo json_encode($response, JSON_UNESCAPED_UNICODE);
                }
                
                 
            }
        }


		public function ReadArchived(){
            if( $this->isAuthenticated("/receba") ){                
				try {
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

					$query = "SELECT p.*, 
							SUBSTRING_INDEX(u.name, ' ', 2) as nome_usuario 
							FROM pedidos p 
							JOIN users u ON p.usuario_id = u.id 
							WHERE p.status = 'arquivado' 
							ORDER BY p.criado_em DESC";
					$stmt = $this->db->query($query);
	
					$pedidos = $stmt->fetchAll(\PDO::FETCH_ASSOC);

					foreach ($pedidos as &$pedido) {
						$queryDesc = "SELECT d.*, 
									SUBSTRING_INDEX(u.name, ' ', 2) as nome_usuario 
									FROM descricoes_pedidos d 
									JOIN users u ON d.usuario_id = u.id 
									WHERE d.pedido_id = ?
									ORDER BY d.criado_em DESC";
						$stmtDesc = $this->db->query($queryDesc, [ $pedido['id'] ]);
						$pedido['descricoes'] = $stmtDesc->fetchAll(\PDO::FETCH_ASSOC);
					}

					$response = ['status' => 'success', 'pedidos' => $pedidos];
					echo json_encode($response);
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }



        public function Delete(){
            if( $this->isAuthenticated("/receba") ){
                try {
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

					if (isset($_GET['id'])) {
						// Verifica se o usuário é o dono da encomenda
						$queryCheck = "SELECT usuario_id FROM pedidos WHERE id = ?";
						$stmtCheck =  $this->db->query($queryCheck, [$_GET['id']]);
						$pedido = $stmtCheck->fetch(\PDO::FETCH_ASSOC);

						if ($pedido && $pedido['usuario_id'] == $id_user) {
							// Primeiro exclui todas as descrições relacionadas
							$queryDeleteDesc = "DELETE FROM descricoes_pedidos WHERE pedido_id = ?";
							$stmtDeleteDesc = $this->db->query($queryDeleteDesc, [$_GET['id']]);
	
							// Depois exclui o pedido
							$query = "DELETE FROM pedidos WHERE id = ?";
							$stmt = $this->db->query($query, [$_GET['id']]);

							$response = ['status' => 'success', 'message' => 'Encomenda excluída com sucesso!'];
						} else {
							$response = ['status' => 'error', 'message' => 'Você não tem permissão para excluir esta encomenda!'];
						}
						echo json_encode($response);
					} else {
						$response = ['status' => 'error', 'message' => 'ID da encomenda não fornecido'];
						echo json_encode($response);
					}
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }




        public function Archive(){
            if( $this->isAuthenticated("/receba") ){                
                try {
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

					if (isset($_GET['id'])) {
						$query = "UPDATE pedidos SET status = 'arquivado' WHERE id = ?";
                        $id = $_GET['id'];
						$stmt = $this->db->query($query, [$id]);

						if ($stmt->rowCount() > 0) {
							$response = ['status' => 'success', 'message' => 'Encomenda arquivada com sucesso!'];
						} else {
							$response = ['status' => 'error', 'message' => 'Encomenda não encontrada ou já arquivada'];
						}
						echo json_encode($response, JSON_UNESCAPED_UNICODE);
					} else {
						$response = ['status' => 'error', 'message' => 'ID da encomenda não fornecido'];
                        header('Content-Type: application/json; charset=utf-8');
						echo json_encode($response, JSON_UNESCAPED_UNICODE);
					}
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
                    header('Content-Type: application/json; charset=utf-8');
					echo json_encode($response,JSON_UNESCAPED_UNICODE);
				}  
            }
        }

        public function Unarchive(){
            if( $this->isAuthenticated("/receba") ){                
				try {
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

					if (isset($_GET['id'])) {
						$query = "UPDATE pedidos SET status = 'ativo' WHERE id = ?";
						$stmt = $this->db->query($query, [$_GET['id']]);

						if ($stmt->rowCount() > 0) {
							$response = ['status' => 'success', 'message' => 'Encomenda desarquivada com sucesso!'];
						} else {
							$response = ['status' => 'error', 'message' => 'Encomenda não encontrada ou já está ativa'];
						}
						echo json_encode($response);
					} else {
						$response = ['status' => 'error', 'message' => 'ID da encomenda não fornecido'];
						echo json_encode($response);
					}
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }




        public function Update(){
            if( $this->isAuthenticated("/receba") ){
                try {
					 
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

					if (isset($_GET['id']) && isset($_GET['nome_pedido'])) {
						// Verifica se o usuário é o dono da encomenda
						$queryCheck = "SELECT usuario_id FROM pedidos WHERE id = ?";
						$stmtCheck = $this->db->query($queryCheck, [$_GET['id']]);
			
						$pedido = $stmtCheck->fetch(\PDO::FETCH_ASSOC);

						if ($pedido && $pedido['usuario_id'] == $id_user) {
							$query = "UPDATE pedidos SET nome_pedido = ? WHERE id = ?";
							$stmt = $this->db->query($query, [ $_GET['nome_pedido'], $_GET['id'] ]);

							if ($stmt->rowCount() > 0) {
								$response = ['status' => 'success', 'message' => 'Encomenda atualizada com sucesso!'];
							} else {
								$response = ['status' => 'error', 'message' => 'Nenhuma alteração foi feita'];
							}
						} else {
							$response = ['status' => 'error', 'message' => 'Você não tem permissão para editar esta encomenda!'];
						}
						echo json_encode($response);
					} else {
						$response = ['status' => 'error', 'message' => 'Dados incompletos para atualização'];
						echo json_encode($response);
					}
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }



		public function addDescription(){
            if( $this->isAuthenticated("/receba") ){                
				try {
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';


					$criado_em = $this->db->getDatetimeFortaleza();

					if (isset($_POST['pedido_id']) && isset($_POST['descricao'])) {
						$query = "INSERT INTO descricoes_pedidos (pedido_id, usuario_id, descricao, criado_em) VALUES (?, ?, ?, ?)";
						$stmt = $this->db->query($query, [$_POST['pedido_id'], $id_user, $_POST['descricao'], $criado_em]);

						$response = ['status' => 'success', 'message' => 'Atualização adicionada com sucesso!'];
						echo json_encode($response);
					}
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }


		public function deleteDescription(){
            if( $this->isAuthenticated("/receba") ){                
				try {
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

					if (isset($_GET['id'])) {
						// Verifica se o usuário é o dono da descrição
						$queryCheck = "SELECT usuario_id FROM descricoes_pedidos WHERE id = ?";
						$stmtCheck = $this->db->query($queryCheck, [$_GET['id']]);
						$descricao = $stmtCheck->fetch(\PDO::FETCH_ASSOC);

						if ($descricao && $descricao['usuario_id'] == $id_user) {
							$query = "DELETE FROM descricoes_pedidos WHERE id = ?";
							$stmt = $this->db->query($query, [$_GET['id']]);

							$response = ['status' => 'success', 'message' => 'Atualização excluída com sucesso!'];
						} else {
							$response = ['status' => 'error', 'message' => 'Você não tem permissão para excluir esta atualização!'];
						}
						echo json_encode($response);
					} else {
						$response = ['status' => 'error', 'message' => 'ID da descrição não fornecido'];
						echo json_encode($response);
					}
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }


		public function updateDescription(){
            if( $this->isAuthenticated("/receba") ){                
				try {
					$id_user = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'NULL';

					if (isset($_GET['id']) && isset($_GET['descricao'])) {
						// Verifica se o usuário é o dono da descrição
						$queryCheck = "SELECT usuario_id FROM descricoes_pedidos WHERE id = ?";
						$stmtCheck = $this->db->query($queryCheck, [$_GET['id']]);
						$descricao = $stmtCheck->fetch(\PDO::FETCH_ASSOC);

						if ($descricao && $descricao['usuario_id'] == $id_user) {
							$query = "UPDATE descricoes_pedidos SET descricao = ? WHERE id = ?";
							$stmt = $this->db->query($query, [ $_GET['descricao'], $_GET['id'] ]);

							if ($stmt->rowCount() > 0) {
								$response = ['status' => 'success', 'message' => 'Atualização editada com sucesso!'];
							} else {
								$response = ['status' => 'error', 'message' => 'Nenhuma alteração foi feita'];
							}
						} else {
							$response = ['status' => 'error', 'message' => 'Você não tem permissão para editar esta atualização!'];
						}
						echo json_encode($response);
					} else {
						$response = ['status' => 'error', 'message' => 'Dados incompletos para atualização'];
						echo json_encode($response);
					}
				} catch (Exception $e) {
					$response = ['status' => 'error', 'message' => $e->getMessage()];
					echo json_encode($response);
				}
            }
        }





    }//end Dbcontroller




?>