//baseado no receba atual

 function showLoading() {
        document.getElementById('loadingOverlay').style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    function hideLoading() {
        document.getElementById('loadingOverlay').style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    async function adicionarPedido() {
        const pedidoNome = document.getElementById("pedidoInput").value.trim();
        if (pedidoNome === "") {
            alert("Por favor, digite uma descrição para a encomenda");
            return;
        }

        showLoading();
        const formData = new FormData();
        formData.append("nome_pedido", pedidoNome);
        //formData.append("usuario_id", <?php echo $_SESSION['idUser']; ?>);

        try {
            const response = await fetch("/receba-create", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.status === "success") {

                trocarImagemAleatoria()
                const audio = document.getElementById('audioReceba');
                audio.currentTime = 0; // reinicia caso o áudio esteja tocando
                audio.play().catch(error => {
                    console.error("Erro ao tocar o áudio:", error);
                });

                alert("Encomenda cadastrada com sucesso!");
                document.getElementById("pedidoInput").value = "";
                await carregarPedidos();
            } else {
                alert(data.message || "Erro ao cadastrar encomenda");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao cadastrar encomenda");
        } finally {
            hideLoading();
        }
    }

    async function carregarPedidos() {
        try {
            const response = await fetch("/receba-read");
            const data = await response.json();

            if (data.status === "success") {
                const grid = document.getElementById("pedidoGrid");
                grid.innerHTML = "";
                
                data.pedidos.forEach(pedido => {
                    const card = criarCardPedido(pedido);
                    grid.appendChild(card);
                });
            }
        } catch (error) {
            console.error("Erro ao carregar pedidos:", error);
        }
    }

    function criarCardPedido(pedido) {
        const col = document.createElement("div");
        col.className = "col-md-4 mb-3";
        
        const isOwner = pedido.tipo_usuario == "proprietario" ? true : false;
        
        col.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${pedido.nome_pedido}</h5>
                    <p class="usuario-info">Cadastrado por: ${pedido.nome_usuario}</p>
                    
                    <div class="descricao-container" id="descricaoContainer${pedido.id}">
                        ${pedido.descricoes ? pedido.descricoes.map(desc => `
                            <div class="descricao-item">
                                <p class="mb-1">${desc.descricao}</p>
                                <small class="usuario-info">Por: ${desc.nome_usuario} em ${desc.criado_em}</small>
                                ${isOwner ? `
                                    <div class="btn-group-sm">
                                        <button class="btn btn-warning btn-sm" onclick="editarDescricao(${desc.id})">Editar</button>
                                        <button class="btn btn-danger btn-sm" onclick="excluirDescricao(${desc.id})">Excluir</button>
                                    </div>
                                ` : ''}
                            </div>
                        `).join('') : ''}
                    </div>

                    <div class="mb-3">
                        <input type="text" id="novaDescricao${pedido.id}" class="form-control" placeholder="Adicionar atualização">
                        <button class="btn btn-primary btn-sm mt-2" onclick="adicionarDescricao(${pedido.id})">Adicionar</button>
                    </div>

                    <div class="card-actions">
                        ${isOwner ? `
                            <button class="btn btn-warning btn-sm" onclick="editarPedido(${pedido.id})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="excluirPedido(${pedido.id})">Excluir</button>
                        ` : ''}
                        ${pedido.status === 'arquivado' ? 
                            `<button class="btn btn-success btn-sm" onclick="desarquivarPedido(${pedido.id})">Desarquivar</button>` :
                            `<button class="btn btn-secondary btn-sm" onclick="arquivarPedido(${pedido.id})">Arquivar</button>`
                        }
                    </div>
                </div>
            </div>
        `;
        
        return col;
    }

    async function adicionarDescricao(pedidoId) {
        const descricaoTexto = document.getElementById(`novaDescricao${pedidoId}`).value.trim();
        if (descricaoTexto === "") return;

        showLoading();
        const formData = new FormData();
        formData.append("pedido_id", pedidoId);
        formData.append("descricao", descricaoTexto);

        try {
            const response = await fetch("/add-description?action=addDescription", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.status === "success") {
                document.getElementById(`novaDescricao${pedidoId}`).value = "";
                const areaAtiva = document.getElementById('pedidos').style.display !== 'none' ? 'pedidos' : 'arquivados';
                if (areaAtiva === 'pedidos') {
                    await carregarPedidos();
                } else {
                    await carregarPedidosArquivados();
                }
            } else {
                alert(data.message || "Erro ao adicionar descrição");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao adicionar descrição");
        } finally {
            hideLoading();
        }
    }

    async function excluirDescricao(descricaoId) {
        if (!confirm("Tem certeza que deseja excluir esta atualização?")) return;

        showLoading();
        try {
            const response = await fetch(`/delete-description?action=deleteDescription&id=${descricaoId}`);
            const data = await response.json();
            
            if (data.status === "success") {
                const areaAtiva = document.getElementById('pedidos').style.display !== 'none' ? 'pedidos' : 'arquivados';
                if (areaAtiva === 'pedidos') {
                    await carregarPedidos();
                } else {
                    await carregarPedidosArquivados();
                }
            } else {
                alert(data.message || "Erro ao excluir atualização");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao excluir atualização");
        } finally {
            hideLoading();
        }
    }

    async function excluirPedido(pedidoId) {
        if (!confirm("Tem certeza que deseja excluir esta encomenda?")) return;

        showLoading();
        try {
            const response = await fetch(`/receba-delete?id=${pedidoId}`);
            const data = await response.json();
            
            if (data.status === "success") {
                await carregarPedidos();
            } else {
                alert(data.message || "Erro ao excluir encomenda");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao excluir encomenda");
        } finally {
            hideLoading();
        }
    }

    async function arquivarPedido(pedidoId) {
        if (!confirm("Tem certeza que deseja arquivar esta encomenda?")) return;

        showLoading();
        try {
            const response = await fetch(`/receba-archive?action=archiveOrder&id=${pedidoId}`);
            const data = await response.json();
            
            if (data.status === "success") {
                await carregarPedidos();
            } else {
                alert(data.message || "Erro ao arquivar encomenda");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao arquivar encomenda");
        } finally {
            hideLoading();
        }
    }

    async function desarquivarPedido(pedidoId) {
        if (!confirm("Tem certeza que deseja desarquivar esta encomenda?")) return;

        showLoading();
        try {
            const response = await fetch(`/receba-unarchive?action=unarchiveOrder&id=${pedidoId}`);
            const data = await response.json();
            
            if (data.status === "success") {
                alert("Encomenda desarquivada com sucesso!");
                await carregarPedidosArquivados();
            } else {
                alert(data.message || "Erro ao desarquivar encomenda");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao desarquivar encomenda");
        } finally {
            hideLoading();
        }
    }

    async function editarDescricao(descricaoId) {
        const novaDescricao = prompt("Digite a nova descrição:");
        if (novaDescricao === null) return;

        showLoading();
        try {
            const response = await fetch(`/upd-description?action=updateDescription&id=${descricaoId}&descricao=${encodeURIComponent(novaDescricao)}`);
            const data = await response.json();
            
            if (data.status === "success") {
                alert("Atualização editada com sucesso!");
                const areaAtiva = document.getElementById('pedidos').style.display !== 'none' ? 'pedidos' : 'arquivados';
                if (areaAtiva === 'pedidos') {
                    await carregarPedidos();
                } else {
                    await carregarPedidosArquivados();
                }
            } else {
                alert(data.message || "Erro ao editar atualização");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao editar atualização");
        } finally {
            hideLoading();
        }
    }

    function mostrarArea(area) {
        document.getElementById('pedidos').style.display = area === 'pedidos' ? 'block' : 'none';
        document.getElementById('arquivados').style.display = area === 'arquivados' ? 'block' : 'none';
        
        const tabs = document.querySelectorAll('.nav-link');
        tabs.forEach(tab => tab.classList.remove('active'));
        event.target.classList.add('active');
        
        if (area === 'pedidos') {
            carregarPedidos();
        } else {
            carregarPedidosArquivados();
        }
    }

    async function carregarPedidosArquivados() {
        try {
            const response = await fetch("/receba-archived");
            const data = await response.json();

            if (data.status === "success") {
                const grid = document.getElementById("pedidoArquivadoGrid");
                grid.innerHTML = "";
                
                data.pedidos.forEach(pedido => {
                    const card = criarCardPedido(pedido);
                    grid.appendChild(card);
                });
            }
        } catch (error) {
            console.error("Erro ao carregar pedidos arquivados:", error);
        }
    }

    async function editarPedido(pedidoId) {
        const novoNome = prompt("Digite o novo nome da encomenda:");
        if (novoNome === null) return;

        showLoading();
        try {
            const response = await fetch(`/receba-edit?id=${pedidoId}&nome_pedido=${encodeURIComponent(novoNome)}`);
            const data = await response.json();
            
            if (data.status === "success") {
                alert("Encomenda atualizada com sucesso!");
                await carregarPedidos();
            } else {
                alert(data.message || "Erro ao atualizar encomenda");
            }
        } catch (error) {
            console.error("Erro:", error);
            alert("Erro ao atualizar encomenda");
        } finally {
            hideLoading();
        }
    }

    function trocarImagemAleatoria() {
        const numeroAleatorio = Math.floor(Math.random() * 6) + 2; // 2, 3 ou 4
        const novaImagem = `orderImages/imagem${numeroAleatorio}.gif`;
        const elementoImagem = document.querySelector('#imagem_luva img');
        elementoImagem.src = novaImagem;
        // console.log(novaImagem)
    }

    function recarregarPagina() {
        /*setTimeout(function() {
            location.reload();
        }, 60000); // 60000 milissegundos = 1 minuto */
    }

    recarregarPagina(); // Chama a função para iniciar o processo

    // Carregar pedidos ao iniciar
    document.addEventListener('DOMContentLoaded', carregarPedidos);