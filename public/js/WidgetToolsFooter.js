function textDefaultForCheckWithSupervidor() {
    // Criar o container "app"
    const appContainer = document.createElement('div');
    appContainer.classList.add('container', "wdg_content", "wdg_window", "wdg_window_50", "mb-3", "item", "float-start"); 
    appContainer.innerHTML = `
    <nav class="d-flex justify-content-between align-items-center">
    <img src="/public/images/maximize.svg" width="12px">
    <h6>PADRÃO PENDÊNCIAS</h6>
    <div>
        <img src="/public/images/arrows-angle-expand.svg" onclick="rezisize(this.parentElement.parentElement)">
        <img onclick="removeElement(this.parentElement.parentElement.parentElement.parentElement)" src="/public/images/x-lg.svg" onclick="rezisize(this.parentElement.parentElement)" >
    </div>
 </nav> `
 
   // Adicione classes Bootstrap conforme necessário

    // Criar os containers para guardar os formulários
    const formContainer1 = document.createElement('div');
    formContainer1.classList.add('mb-3', 'wdg_card'); // Exemplo de classe Bootstrap para espaçamento inferior
    // Adicione outros containers de formulário conforme necessário

    // Criar os elementos de formulário (por exemplo, campos de entrada, botões, etc.)
    const inputField1 = document.createElement('input');
    inputField1.type = 'text';
    inputField1.placeholder = 'Digite algo...'; // Exemplo de campo de entrada

    // Conteiner para os botões
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('d-grid', 'gap-2', 'wdg_card'); // Exemplo de classes Bootstrap para layout de botões

    // Criar botões
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Enviar';
    submitButton.classList.add('btn', 'btn-primary'); // Exemplo de classe Bootstrap para botão primário

    const cancelButton = document.createElement('button');
    cancelButton.textContent = 'Cancelar';
    cancelButton.classList.add('btn', 'btn-secondary'); // Exemplo de classe Bootstrap para botão secundário

    // Adicione os elementos criados aos containers apropriados
    formContainer1.appendChild(inputField1);
    buttonContainer.appendChild(submitButton);
    buttonContainer.appendChild(cancelButton);

    // Adicione os containers ao container "app"
    appContainer.appendChild(formContainer1);
    appContainer.appendChild(buttonContainer);

    // Agora você pode inserir o "appContainer" onde for necessário na sua página HTML.

    // Lembre-se de incluir o Bootstrap 5.3 no seu projeto para que as classes funcionem corretamente.

    // Retorne o container "app" ou faça outras ações necessárias
    return appContainer;
}


function goToHomePage() {
    // Redirecionar para a página inicial
    window.location.href = '/home';
    //window.open('/home', '_blank');
}

function goToSettings() {
    // Redirecionar para a página de configurações
    window.location.href = '/settings';
    //window.open('/settings', '_blank');
}


function goToUsers() {
    // Redirecionar para a página de configurações
    window.location.href = '/community';
    //window.open('/settings', '_blank');
}

function goToReceba() {
    // Redirecionar para a página de configurações
    //window.location.href = '/receba';
    window.open('/receba', '_blank');
}


function decodeHTMLEntities(text) {
    // Cria um elemento temporário para decodificar as entidades HTML
    let tempElement = document.createElement('textarea');
    tempElement.innerHTML = text;
    return tempElement.value;
}

function renderNotificationMessageAsHTML(message) {
    // Cria um container para interpretar e renderizar o HTML
    let container = document.createElement('div');
    container.className = 'small';

   container.innerHTML = decodeHTMLEntities(message)

    return container;
}


function goToNotifications() {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    console.log('Notificações carregadas do localStorage:', notifications);

    let body = '<div class="list-group list-group-flush border-bottom scrollarea">';

    if (notifications.length === 0) {
        body += `<div class="list-group-item">Nenhuma nova notificação.</div>`;
    } else {
        notifications.forEach(notification => {
            let userImage = notification.user_image;
            let userName = notification.user_name;
            let userRole = notification.user_role;

            // Renderiza a mensagem HTML decodificada
            let decodedMessage = renderNotificationMessageAsHTML(notification.message).outerHTML;

            body += `
                <a href="#" class="list-group-item list-group-item-action py-3 lh-sm">
                    <div class="d-flex w-100 align-items-center justify-content-between">
                        <div class="d-flex align-items-center">
                            <img src="${userImage}" alt="${userName}" class="rounded-circle me-2" style="width: 40px; height: 40px;">
                            <div>
                                <strong class="mb-1">${userName}</strong>
                                <small class="text-muted">${userRole}</small>
                                <small>${new Date(notification.created_at).toLocaleString()}</small>
                                ${decodedMessage}
                            </div>
                        </div>
                        
                    </div>
                    <button class="btn btn-sm btn-danger mark-read-btn" onclick="markAllNotificationsAsRead(${notification.id}); updateNotificationCount(); removeElement(this.closest('.list-group-item'));">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1 1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                    </button>
                </a>
            `;
        });
    }

    body += '</div>';

    // Exibir modal com notificações
    createModalEdit("Notificações", body, `deleteModalEdit()`);
}






async function getAllNotifications() {
    try {
        // Faz a requisição ao backend
        const response = await fetch('/getallnotifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        // Verifica se a resposta foi bem-sucedida
        if (response.ok) {
            const result = await response.json(); // Aguarda a resolução do JSON
            if (result.status === 'success') {
                console.log('Novas notificações recebidas:', result.notifications);
                console.log('Quantidade de notificações:', result.notifications.length);
                return result.notifications || [];
            } else {
                console.error('Erro ao buscar notificações:', result.message);
                return [];
            }
        } else {
            console.error('Erro ao buscar notificações:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        return [];
    }
}





async function fetchNotifications(lastId=null) {
    try {
        let response = await fetch('/getnotifications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ last_id: lastId })  // Enviar o último ID recebido
        });

        if (response.ok) {
            let result = await response.json();
            if (result.status === 'success') {
                console.log('Novas notificações recebidas:', result.notifications);
                console.log(result.notifications.length);
                return result.notifications || [];
            } else {
                console.error('Erro ao buscar notificações:', result.message);
                return [];
            }
        } else {
            console.error('Erro ao buscar notificações:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Erro:', error);
        return [];
    }
}



async function createNotification(title, message, notificationFor, targetUserId = null) {
    
    console.log(title)
    try {
        // Valida os campos obrigatórios
        if(title, message && notificationFor) {
            // Adiciona um container vazio ao final da mensagem
            message = message + '<div></div>';

            // Monta os dados a serem enviados
            const data = new URLSearchParams();
            data.append("title", title);
            data.append("message", message);
            data.append("notification_for", notificationFor);
            if (targetUserId) {
                data.append("target_user_id", targetUserId);
            }

            // Faz a requisição para salvar a notificação
            const url = '/savenotification';
            const method = 'POST';

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: data
            });

            if (response.ok) {
                let result = await response.json();
                console.log('Notificação salva:', result);
                updateNotificationContainer()
                showNotification("NOTIFICAÇÃO INSERIDA COM SUCESSO!", "bg-success");
            } else {
                console.error('Erro ao salvar notificação:', response.statusText);
                showNotification("ERRO AO SALVAR NOTIFICAÇÃO!", "bg-danger");
            }
        } else {
            // Se algum campo obrigatório estiver vazio
            showNotification("ALGUM CAMPO OBRIGATÓRIO ESTÁ VAZIO!", "bg-danger");
        }
    } catch (error) {
        console.error('Erro:', error);
        showNotification("ERRO AO EXECUTAR AÇÃO!", "bg-danger");
    }
}







/*async function saveNotification(message, notificationFor, targetUserId = null) {
    try {
        let response = await fetch('/savenotification', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message: message, notification_for: notificationFor, target_user_id: targetUserId })
        });

        if (response.ok) {
            let result = await response.json();
            console.log('Notificação salva:', result);
        } else {
            console.error('Erro ao salvar notificação:', response.statusText);
        }
    } catch (error) {
        console.error('Erro:', error);
    }
}*/




async function loadInitialNotifications() {
    console.log('Carregando notificações iniciais...');

    // Obter notificações do localStorage
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    let lastId = notifications.length > 0 ? notifications[notifications.length - 1].id : 0;

    // Buscar novas notificações
    let newNotifications = await fetchNotifications(lastId);

    // Processar e adicionar apenas novas notificações
    newNotifications.forEach(notification => {
        let existingNotification = notifications.find(n => n.id === notification.id);

        if (!existingNotification) {
            notifications.push({
                id: notification.id,
                user_id: notification.user_id,
                message: notification.message || 'Sem mensagem',
                created_at: notification.created_at,
                user_name: notification.user_name || 'Nome do Usuário',
                user_role: notification.user_role || 'Função não especificada',
                user_image: notification.user_image || '/public/images/profile/_4e04ee6b-823f-4708-9517-5bbe1fecab8e.jpg',
                is_new: true // Marcar como nova notificação
            });
        } else {
            existingNotification.is_new = false;
        }
    });

    // Atualizar localStorage e exibir notificações
    if (newNotifications.length > 0) {
        localStorage.setItem('notifications', JSON.stringify(notifications));
        console.log('Notificações armazenadas:', JSON.parse(localStorage.getItem('notifications')));
        updateNotificationCount();
    } else {
        console.log('Nenhuma nova notificação encontrada ao carregar a página.');
    }
}

function startNotificationPolling() {
    console.log('Polling iniciado');

    setInterval(async () => {
        console.log('Verificando novas notificações...');

        // Obter notificações do localStorage
        let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
        let lastId = notifications.length > 0 ? notifications[notifications.length - 1].id : 0;

        // Buscar novas notificações
        let newNotifications = await fetchNotifications(lastId);

        newNotifications.forEach(notification => {
            let existingNotification = notifications.find(n => n.id === notification.id);

            if (!existingNotification) {
                notifications.push({
                    id: notification.id,
                    user_id: notification.user_id,
                    message: notification.message || 'Sem mensagem',
                    created_at: notification.created_at,
                    user_name: notification.user_name || 'Nome do Usuário',
                    user_role: notification.user_role || 'Função não especificada',
                    user_image: notification.user_image || '/public/images/profile/_4e04ee6b-823f-4708-9517-5bbe1fecab8e.jpg',
                    is_new: true
                });
            } else {
                existingNotification.is_new = false;
            }
        });

        if (newNotifications.length > 0) {
            localStorage.setItem('notifications', JSON.stringify(notifications));
            console.log('Notificações armazenadas após polling:', JSON.parse(localStorage.getItem('notifications')));
            updateNotificationCount();
        } else {
            console.log('Nenhuma nova notificação encontrada.');
        }
    }, 30000); // 30 segundos
}

// Executar carregamento inicial e iniciar polling
(async () => {
    // Esperar 7 segundos antes de carregar notificações iniciais
    await new Promise(resolve => setTimeout(resolve, 7000));
    await loadInitialNotifications();
    startNotificationPolling();
})();





// Função de exemplo para atualizar o contador de notificações
// function updateNotificationCount() {
//     let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
//     let unreadCount = notifications.filter(notification => notification.is_new).length;
//     console.log('Contador de notificações não lidas:', unreadCount);
//     // Aqui você pode atualizar o contador na interface, se necessário.
// }




document.getElementById('notification-icon').addEventListener('click', () => {
    //markAllNotificationsAsRead();

    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];

    // Remover a notificação marcada como lida
    for (let i = 0; i < notifications.length; i++) {
        console.log(notifications[i])
        notifications[i].is_new = false
    }

    localStorage.setItem('notifications', JSON.stringify(notifications));
    updateNotificationCount();
});



async function markAllNotificationsAsRead(notificationId) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    
    // Log para exibir o localStorage antes da remoção
    console.log('Antes de remover:', notifications);

    // Remover a notificação marcada como lida
    for (let i = 0; i < notifications.length; i++) {
        notifications[i].is_new = false
        if (notifications[i].id == notificationId) {
            notifications.splice(i, 1);
            break;
        }
    }

    // Atualizar o localStorage
    localStorage.setItem('notifications', JSON.stringify(notifications));

    // Log para exibir o localStorage após a remoção
    console.log('Após remover:', notifications);

    try {
        let response = await fetch('/marknotificationsasread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ notification_ids: [notificationId] })
        });

        if (!response.ok) {
            console.error('Erro ao marcar notificações como lidas no backend:', response.statusText);
        } else {
            console.log('Notificação marcada como lida no backend.');
        }
    } catch (error) {
        console.error('Erro ao comunicar-se com o backend:', error);
    }

    updateNotificationCount(); // Atualizar contador de notificações
}



function updateNotificationCount() {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    let newCount = notifications.filter(notification => notification.is_new).length; // Filtra apenas as novas notificações

    let notificationCountElement = document.getElementById('notification-count');
    if (newCount > 0) {
        notificationCountElement.innerText = newCount;
        notificationCountElement.style.display = 'block';
    } else {
        notificationCountElement.style.display = 'none';
    }
}





function updateNotificationContainer() {
    fetch('/getallnotifications', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.status === 'success') {
                const notifications = result.notifications;
                console.log('Notificações carregadas do servidor:', notifications);

                const container = document.querySelector('.notification-container');
                container.innerHTML = ''; // Limpa o container antes de adicionar novas notificações

                if (notifications.length === 0) {
                    container.innerHTML = '<div class="list-group-item">Nenhuma nova notificação.</div>';
                    return;
                }

                notifications.forEach(notification => {
                    // Renderiza a mensagem e o título decodificados
                    const decodedMessage = renderNotificationMessageAsHTML(notification.message).outerHTML;
                    const notificationTitle = notification.title || "Sem título"; // Fallback caso o título seja nulo

                    // Cria o elemento HTML da notificação
                    const notificationElement = document.createElement('div');
                    notificationElement.id = `notification_${notification.id}`; // Adiciona um ID único para edição
                    notificationElement.classList.add('list-group-item', 'list-group-item-action', 'py-3', 'lh-sm');
                    notificationElement.innerHTML = `
                        <div class="d-flex w-100 align-items-center">
                            <div>
                                <h5 class="mb-1">${notificationTitle}</h5>
                                <strong class="mb-1">${notification.id}</strong>
                                <small>${new Date(notification.created_at).toLocaleString()}</small>
                                <div>${decodedMessage}</div>
                            </div>
                        </div>
                        ${
                            // Exibir botões apenas para administradores ou desenvolvedores
                            (notification.userRole === 'admin' || notification.userRole === 'dev') 
                            ? `
                            <div class="d-flex justify-content-end mt-3"> <!-- Ajusta os botões para baixo -->
                                <button class="btn btn-sm btn-warning me-2" onclick="editNotification(${notification.id}, '${encodeURIComponent(notification.title)}', '${encodeURIComponent(notification.message)}')">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 3L13 4.793 14.793 3 13 1.207 11.207 3zm1.586 2.207L10.5 6.5l-.793-.793 2.293-2.293L12.793 5.5z"/>
                                    </svg>
                                </button>
                                <button class="btn btn-sm btn-danger" onclick="deleteNotification(${notification.id});">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                    </svg>
                                </button>
                            </div>
                            ` : ''
                        }
                    `;
                    container.appendChild(notificationElement);
                });
            } else {
                console.error('Erro ao carregar notificações:', result.message);
            }
        })
        .catch(error => {
            console.error('Erro ao comunicar com o servidor:', error);
        });
}






function editNotification(id, currentTitle, currentMessage) {
    // Decodifica os dados atuais para garantir que os caracteres especiais sejam tratados corretamente
    const decodedTitle = decodeURIComponent(currentTitle);
    const decodedMessage = decodeURIComponent(currentMessage);

    // Seleciona o container da notificação que será editado
    const notificationElement = document.getElementById(`notification_${id}`);

    if (notificationElement) {
        // Substitui o conteúdo atual por um editor para título e mensagem
        notificationElement.innerHTML = `
            <input type="text" class="form-control mb-2" placeholder="Edite o título da notificação..." id="editNotificationTitle_${id}" value="${decodedTitle}">
            <textarea class="form-control mb-2" placeholder="Edite a mensagem da notificação..." id="editNotification_${id}">${decodedMessage}</textarea>
            <button type="button" onclick="saveNotification(${id})" class="btn btn-primary">Salvar Notificação</button>
        `;
    }
}


// Função para salvar as alterações feitas na notificação
function saveNotification(id) {
    // Obter o novo título e mensagem da notificação (adicionado suporte ao título)
    const newTitle = document.getElementById(`editNotificationTitle_${id}`).value.trim();
    const newMessage = document.getElementById(`editNotification_${id}`).value.trim();


    if (newTitle !== "" && newMessage !== "") {
        // Configurar os dados para envio ao backend
        const url = "/edit-notification";
        const method = "POST";
        const data = new URLSearchParams();
        data.append("id", id);
        data.append("title", newTitle);
        data.append("message", newMessage);

        fetch(url, {
            method: method,
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao salvar a notificação. Código HTTP: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                if (result.status === "success") {
                    alert("Notificação atualizada com sucesso!");
                    updateNotificationContainer(); // Atualiza o container após a edição
                } else {
                    console.error("Erro ao salvar a notificação:", result.message);
                    alert(result.message || "Erro ao salvar a notificação.");
                }
            })
            .catch(error => {
                console.error("Erro ao comunicar com o servidor:", error);
                alert("Erro na comunicação com o servidor. Por favor, tente novamente mais tarde.");
            });
    } else {
        alert("O título e a mensagem da notificação não podem estar vazios!");
    }
}




function deleteNotification(id) {
    if (confirm("Tem certeza de que deseja excluir esta notificação?")) {
        const url = "/delete-notification";
        const method = "POST";
        const data = new URLSearchParams();
        data.append("id", id);

        fetch(url, {
            method: method,
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Erro ao excluir a notificação. Código HTTP: " + response.status);
                }
                return response.json();
            })
            .then(result => {
                if (result.status === "success") {
                    alert("Notificação excluída com sucesso!");
                    updateNotificationContainer(); // Atualiza o container após a exclusão
                } else {
                    console.error("Erro ao excluir a notificação:", result.message);
                    alert(result.message || "Erro ao excluir a notificação.");
                }
            })
            .catch(error => {
                console.error("Erro ao comunicar com o servidor:", error);
                alert("Erro na comunicação com o servidor. Por favor, tente novamente mais tarde.");
            });
    }
}

