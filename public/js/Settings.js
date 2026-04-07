window.addEventListener("load", function() {
    // Seu código aqui
    //getCategory()
    //getUsers();
    //getTeam();
    //getLongScript();
    
});






// Modifique o DOMContentLoaded existente no início do arquivo
document.addEventListener('DOMContentLoaded', function() { 
    checkBtn(document.getElementById('btn-theme-mode-config'), 'theme_mode'); 
    checkBtn(document.getElementById('btn-bg-config'), 'background'); 
    getPlatformFonts();
    getPlatformColorSchemes();
    
    // Carregar imagens misc se o container existir
    loadImagesMiscIfContainerExists();

    // Reexecuta a cada 5 minutos (300.000 milissegundos)
    //setInterval(checkSession, 300000);
  
    // Reexecuta a cada 1 minuto (60.000 milissegundos)
});

// Função para verificar se o container existe e carregar as imagens
function loadImagesMiscIfContainerExists() {
    const container = document.querySelector('.container-image-misc');
    if (container) {
        console.log("Container encontrado, carregando imagens...");
        getImagesMisc();
    } else {
        console.log("Container '.container-image-misc' não encontrado na página");
    }
}

// Função para buscar imagens do banco de dados
async function getImagesMisc() {
    const url = "/getimagesmisc";
    const method = "POST";
    const data = new URLSearchParams();
    
    try {
        const response = await fetchAPI(url, method, data);
        console.log("Imagens encontradas:", response);
        
        if (response.status === 'success') {
            populateImagesMiscContainer(response.data);
        } else {
            console.error("Erro ao buscar imagens:", response.message);
            if (typeof showNotification === 'function') {
                showNotification("Erro ao carregar imagens", "bg-danger");
            }
        }
    } catch (error) {
        console.error("Error fetching images:", error);
        if (typeof showNotification === 'function') {
            showNotification("Erro ao carregar imagens", "bg-danger");
        }
    }
}

// Função para popular o container com as imagens
function populateImagesMiscContainer(images) {
    const container = document.querySelector('.container-image-misc');
    
    if (!container) {
        console.error("Container '.container-image-misc' não encontrado");
        return;
    }
    
    // Limpar o container antes de popular
    container.innerHTML = '';
    
    if (!images || images.length === 0) {
        container.innerHTML = '<p class="text-muted text-center">Nenhuma imagem encontrada</p>';
        return;
    }
    
    images.forEach(image => {
        const imageElement = createImageElement(image);
        container.appendChild(imageElement);
    });
}

// Função para criar elemento de imagem individual
function createImageElement(image) {
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('image-item', 'mb-3', 'p-2', 'border', 'rounded');
    
    // Determinar o caminho da imagem baseado no source_type
    const imagePath = image.source_type === 'web' ? image.source_url : image.file_path;
    
    imageDiv.innerHTML = `
        <div class="row align-items-center">
            <div class="col-md-3">
                <img src="${imagePath}" 
                     alt="${image.original_file_name}" 
                     class="img-thumbnail" 
                     style="max-width: 100px; max-height: 100px; object-fit: cover;"
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iI2VlZSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LXNpemU9IjEyIiBmaWxsPSIjYWFhIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+SW1hZ2VtPC90ZXh0Pjwvc3ZnPg==';">
            </div>
            <div class="col-md-6">
                <h6 class="mb-1">${image.original_file_name || 'Sem nome'}</h6>
                <small class="text-muted">
                    Enviado em: ${formatDate(image.created_at)}<br>
                    Tipo: ${image.source_type === 'web' ? 'Web' : 'Local'}
                </small>
            </div>
            <div class="col-md-3">
                <div class="btn-group-vertical w-100">
                    <button type="button" 
                            class="btn btn-sm btn-outline-primary mb-1" 
                            onclick="copyImageUrl('${imagePath}')">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                        </svg>
                        Copiar
                    </button>
                    <button type="button" 
                            class="btn btn-sm btn-outline-danger" 
                            onclick="deleteImageMisc(${image.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1z"/>
                        </svg>
                        Deletar
                    </button>
                </div>
            </div>
        </div>
    `;
    
    return imageDiv;
}

// Função para copiar URL da imagem
function copyImageUrl(imageUrl) {
    navigator.clipboard.writeText(imageUrl).then(() => {
        if (typeof showNotification === 'function') {
            showNotification("URL copiada!", "bg-success");
        } else {
            console.log("URL copiada: " + imageUrl);
        }
    }).catch(err => {
        console.error('Failed to copy: ', err);
        if (typeof showNotification === 'function') {
            showNotification("Erro ao copiar URL", "bg-danger");
        }
    });
}

// Função para deletar imagem
async function deleteImageMisc(imageId) {
    if (!confirm('Tem certeza que deseja deletar esta imagem?')) {
        return;
    }
    
    const url = "/deleteimagesmisc";
    const method = "POST";
    const data = new URLSearchParams();
    data.append("image_id", imageId);
    
    try {
        const response = await fetchAPI(url, method, data);
        
        if (response.status === 'success') {
            if (typeof showNotification === 'function') {
                showNotification("Imagem deletada com sucesso!", "bg-success");
            }
            // Recarregar as imagens
            getImagesMisc();
        } else {
            if (typeof showNotification === 'function') {
                showNotification("Erro ao deletar imagem: " + response.message, "bg-danger");
            }
        }
    } catch (error) {
        console.error("Error deleting image:", error);
        if (typeof showNotification === 'function') {
            showNotification("Erro ao deletar imagem", "bg-danger");
        }
    }
}

// Função auxiliar para formatar data
function formatDate(dateString) {
    if (!dateString) return 'Data não disponível';
    
    try {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    } catch (error) {
        return 'Data inválida';
    }
}

// Função para recarregar as imagens manualmente (pode ser chamada de qualquer lugar)
function refreshImagesMisc() {
    console.log("Recarregando imagens...");
    loadImagesMiscIfContainerExists();
}


async function generateKeysForActivate(event) {
    let numberOfKeys = event.target.parentElement.parentElement.querySelector('#numberOfKeys').value;
    let final_activation_date = event.target.parentElement.parentElement.querySelector('#final_activation_date').value;
    let expirationAt = event.target.parentElement.parentElement.querySelector('#expirationAt').value;
    let verification_seal = event.target.parentElement.parentElement.querySelector('#verification_seal').value;
    
    console.log("Keys = " + numberOfKeys);
    console.log("final_activation_dates = " + final_activation_date);
    console.log("Verification_seal = " + verification_seal);
    console.log("expirationAt = " + expirationAt);
    
    
    try {
        const keys = await generateKeys(numberOfKeys, final_activation_date, verification_seal, expirationAt);
        insertKeysIntoTable(event, keys)
        console.log("Generated keys:", keys);
    } catch (error) {
        console.error("Error generating keys:", error);
    }
}

async function generateKeys(numberOfKeys = 1, final_activation_date = '+1 year', verification_seal = 'green', expirationAt = '+3 days') {
    const url = "/generatekeys";
    const method = "POST";
    const data = new URLSearchParams();
    data.append("number_of_keys", numberOfKeys);
    data.append("final_activation_date", final_activation_date);
    data.append("verification_seal", verification_seal);
    data.append("expiration_at", expirationAt);
    
    
    try {
        const response = await fetchAPI(url, method, data);
        return response;
    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
}



function insertKeysIntoTable(event, keys) {
    let container = findClassPerName(event.target, "rowKeys", "showContent")
    var tableBody = container.querySelector(".table tbody");
    tableBody.innerHTML = ''; // Limpar as chaves existentes

    keys.forEach(key => {
        var row = document.createElement("tr");
        row.classList.add("w-100", "d-block");

        var cell = document.createElement("td");
        cell.classList.add("border-top", "w-100", "d-block");

        var inputGroup = document.createElement("div");
        inputGroup.classList.add("input-group");

        var btnGroup = document.createElement("div");
        btnGroup.classList.add("btn-group");
        btnGroup.style.width = "100%";

        var button = document.createElement("button");
        button.type = "button";
        button.classList.add("btn", "btn-outline-secondary");
        button.setAttribute("onclick", "copyKey(this)");

        var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
        svg.setAttribute("width", "16");
        svg.setAttribute("height", "16");
        svg.setAttribute("fill", "currentColor");
        svg.classList.add("bi", "bi-copy");
        svg.setAttribute("viewBox", "0 0 16 16");

        var path1 = document.createElementNS("http://www.w3.org/2000/svg", "path");
        path1.setAttribute("fill-rule", "evenodd");
        path1.setAttribute("d", "M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z");

        var span = document.createElement("span");
        span.classList.add("visually-hidden");
        span.textContent = "Button";

        var input = document.createElement("input");
        input.type = "text";
        input.style.width = "100%";
        input.style.display = "block";
        input.readOnly = true;
        input.value = key;

        svg.appendChild(path1);
        button.appendChild(svg);
        button.appendChild(span);

        btnGroup.appendChild(button);
        btnGroup.appendChild(input);

        inputGroup.appendChild(btnGroup);

        cell.appendChild(inputGroup);
        row.appendChild(cell);

        tableBody.appendChild(row);
    });
}

function copyKey(el) {
    let container = el.parentElement;
    let key = container.querySelector('input').value;

    navigator.clipboard.writeText(key).then(() => {
        // console.log('Key copied to clipboard: ', key);
        showNotification("Copiado", "bg-success")
    }).catch(err => {
        // console.error('Failed to copy: ', err);
        showNotification("Erro", "bg-danger")
    });
}




async function setUsers(event) {
    let container = findClassPerName(event.target, "cont-new-user", "showContent");
    let name = container.querySelector(".name").value;
    let pass = container.querySelector(".pass").value;
    let mail = container.querySelector(".mail").value;
    let user = container.querySelector(".user").value;
    let type_user = container.querySelector("#name_type").value;
    
    const url = "/setuser";
    const method = "POST";
    const data = new URLSearchParams();
    
    data.append("name", name);
    data.append("pass", pass);
    data.append("mail", mail);
    data.append("user", user);
    data.append("role", type_user);

    let options = {
        method: method,
        mode: "cors",
        headers: {"Content-Type": "application/x-www-form-urlencoded"},
        body: data
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }

        const value = await response.json();
        if (value.status === 'error') {
            alert("Erro ao cadastrar! " + value.message);
        } else if (value.status === 'success') {
            alert(value.message);
        }
    } catch (error) {
        console.error('Erro:', error);
        alert("Erro ao cadastrar! " + error.message);
    }
}


function getUsers() {
    const url = "/getusers";
    const method = "POST";
    const data = new URLSearchParams();

    fetchAPI(url, method, data).then(value => {
        console.log(value)
        if(value.status == "success"){
            insertIntoUsersContainer(value.data)
        }
    });
}


function insertIntoUsersContainer(users) {
    const tableBody = document.querySelector(".table_users tbody");
    tableBody.innerHTML = ''; // Limpar o conteúdo existente

    // Adicionar classe de overflow e altura máxima com Bootstrap
    tableBody.style.maxHeight = '400px';
    tableBody.style.overflowY = 'auto';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.classList.add('border-bottom', 'd-flex', 'flex-row'); // Adiciona borda inferior e flex layout

        const emailCell = document.createElement('td');
        emailCell.classList.add('col'); // Adiciona classe de coluna
        emailCell.textContent = user.mail;

        const userCell = document.createElement('td');
        userCell.classList.add('col'); // Adiciona classe de coluna
        userCell.textContent = user.user;

        const statusCell = document.createElement('td');
        statusCell.classList.add('col'); // Adiciona classe de coluna
        const statusDiv = document.createElement('div');
        statusDiv.className = "form-check form-switch";
        statusDiv.onclick = function() {
            if(user.status == 'active'){
                setUserStatusPlatform( 'inactive', user.id);
                statusDiv.querySelector('.form-check-label').textContent = 'Inativo';
            }else{
                setUserStatusPlatform( 'active', user.id);
                statusDiv.querySelector('.form-check-label').textContent = 'Ativo';
            }
        };
        
        const statusInput = document.createElement('input');
        statusInput.className = "form-check-input";
        statusInput.type = "checkbox";
        statusInput.role = "switch";
        statusInput.id = `flexSwitchCheckChecked${user.id}`;
        statusInput.checked = user.status === 'active';

        const statusLabel = document.createElement('label');
        statusLabel.className = "form-check-label";
        statusLabel.htmlFor = statusInput.id;
        statusLabel.textContent = user.status === 'active' ? 'Ativo' : 'Inativo';

        statusDiv.appendChild(statusInput);
        statusDiv.appendChild(statusLabel);
        statusCell.appendChild(statusDiv);

        row.appendChild(emailCell);
        row.appendChild(userCell);
        row.appendChild(statusCell);

        tableBody.appendChild(row);
    });
}


function getLogs(event) {
    var off = event.target.parentElement.querySelector('.offset').value

    const url = "/getplatformlogs?offset="+(off * 20);
    const method = "POST";
    const data = new URLSearchParams();

    fetchAPI(url, method, data).then(value => {
        console.log(value)
         
            insertIntoLogsContainer(value)
        
    });
}

function insertIntoLogsContainer(logs) {
    const tableBody = document.querySelector(".table_logs tbody");
    tableBody.innerHTML = ''; // Limpar o conteúdo existente

    console.log("chamou")

    // Adicionar classe de overflow e altura máxima com Bootstrap
    tableBody.style.maxHeight = '400px';
    tableBody.style.overflowY = 'auto';

    logs.forEach(log => {
        const row = document.createElement('tr');
        row.classList.add('border-bottom', 'd-flex', 'flex-row'); // Adiciona borda inferior e layout flex

        const dateCell = document.createElement('td');
        dateCell.classList.add('col'); // Adiciona classe de coluna
        dateCell.textContent = log.date; // Data do log

        const timeCell = document.createElement('td');
        timeCell.classList.add('col'); // Adiciona classe de coluna
        timeCell.textContent = log.time; // Hora do log

        const actionCell = document.createElement('td');
        actionCell.classList.add('col'); // Adiciona classe de coluna
        actionCell.textContent = log.action; // Hora do log

        const userCell = document.createElement('td');
        userCell.classList.add('col'); // Adiciona classe de coluna
        userCell.textContent = log.name; // Usuário do log

        row.appendChild(dateCell);
        row.appendChild(timeCell);
        row.appendChild(actionCell);
        row.appendChild(userCell);

        tableBody.appendChild(row);
    });
}



function updateUsername(parent) {
    const url = "/updateusername";
    const method = "POST";
    const data = new URLSearchParams();

    var newUsername = parent.firstElementChild.value

    if (!typeof newUsername !== 'undefined' && newUsername != null) {
        data.append("user", newUsername);



        fetchAPI(url, method, data).then(value => {
            showModalSpinner()
            if (value.status == 'error') {
                alert("Erro ao cadastrar! " + value.message)
            }
            if (value.status == 'success') {
                alert(value.message)
            }
        });


    }
}

function updateName(parent) {
    const url = "/updatename";
    const method = "POST";
    const data = new URLSearchParams();

    var newUsername = parent.firstElementChild.value
    console.log("Nome")

    if (!typeof newUsername !== 'undefined' && newUsername != null) {
        data.append("name", newUsername);

        fetchAPI(url, method, data).then(value => {
            showModalSpinner()
            if (value.status == 'error') {
                alert("Erro ao cadastrar! " + value.message)
            }
            if (value.status == 'success') {
                alert(value.message)
            }
        });
    }
}

function updateEmail(parent) {
    const url = "/updateemail";
    const method = "POST";
    const data = new URLSearchParams();

    var newUsername = parent.firstElementChild.value

    if (!typeof newUsername !== 'undefined' && newUsername != null) {
        data.append("email", newUsername);

        fetchAPI(url, method, data).then(value => {
            showModalSpinner()
            if (value.status == 'error') {
                alert("Erro ao cadastrar! " + value.message)
            }
            if (value.status == 'success') {
                alert(value.message)
            }
        });
    }
}


function updatePassword(passInput) {
    const url = "/updatepassword";
    const method = "POST";
    const data = new URLSearchParams();

    var newUsername = passInput.parentElement.querySelector('#password').value

    console.log(newUsername)

    if (!typeof newUsername !== 'undefined' && newUsername != null) {
        data.append("password", newUsername);

        fetchAPI(url, method, data).then(value => {
            showModalSpinner()
            if (value.status == 'error') {
                alert("Erro ao cadastrar! " + value.message)
            }
            if (value.status == 'success') {
                alert(value.message)
            }
        });
    }
}


/*
    function updatePhotoProfile(parent) {
    // Crie um objeto FormData
    const formData = new FormData();
    
    var fileInput = parent.querySelectorAll('.photo-profile')[0];
    var file = fileInput.files[0];

    // Verifique se o tamanho do arquivo é menor ou igual a 512KB
    if (file.size <= 512 * 1024) { // 512KB = 512 * 1024 bytes
        formData.append("photo_profile_file", file);
        formData.append("photo_profile", file.name);

        // Faça uma solicitação POST usando a Fetch API
        fetch('/updatephotoprofile', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                showModalSpinner();
                window.location.reload();
            } else {
                console.error('Erro ao atualizar a foto do perfil');
            }
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
        });
    } else {
        alert('O arquivo deve ter no máximo 512KB.');
    }
}


*/


function updatePhotoProfile(parent, action = 'Profile') {
    // Crie um objeto FormData
    const formData = new FormData();
    
    var fileInput = parent.querySelectorAll('.photo-profile')[0];
    var file = fileInput.files[0];
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

    // Verifique se o tamanho do arquivo é menor ou igual a 512KB e se a extensão é permitida
    if (file.size <= 512 * 1024 && allowedExtensions.test(file.name)) { // 512KB = 512 * 1024 bytes
        formData.append("photo_profile_file", file);
        formData.append("photo_profile", file.name);
        formData.append("action", action);

        // Faça uma solicitação POST usando a Fetch API
        fetch('/updatephotoprofile', {
            method: 'POST',
            body: formData,
        })
        .then(response => {
            if (response.ok) {
                showModalSpinner();
                window.location.reload();
            } else {
                console.error('Erro ao atualizar a foto do perfil');
            }
        })
        .catch(error => {
            console.error('Erro na solicitação:', error);
        });
    } else {
        alert('O arquivo deve ter no máximo 512KB e ser uma imagem nos formatos JPG, JPEG ou PNG.');
    }
}


//Equipes ----------------------

//Scripts Edit
function setTeam(child) {
    var teamName = findClassPerName(child, 'teamInput', 'app')

    //console.log(teamName.value)

    const url = "/setteam";
    const method = "POST";
    const data = new URLSearchParams();

    data.append('name', teamName.value)

    var status = handlingDataOnDB(url, method, data)
    showModalSpinner()
    status.then(value => {
        console.log(value)
        getTeam()
    })
}


function getTeam() {
    const url = "/getteam";
    const method = "POST";
    const data = new URLSearchParams();

    console.log('chamou get team')

    var status = handlingDataOnDB(url, method, data)
 
    status.then(value => {
       // Converter o array de objetos em uma string JSON
        const arrayDeObjetosString = JSON.stringify(value);

        // Salvar a string JSON no localStorage
        localStorage.setItem('teams', arrayDeObjetosString);
        populateTableTeam(value)
        populateSelecTeamOnCategories(value)
    })
 }



 function populateTableTeam(teams){
    if (!teams ) {
        throw new Error("Parâmetros inválidos.");
        return
    }
    var teamTable = document.querySelectorAll('.tableTeams')[0]
    if(teamTable){
        teamTable.innerHTML = ""

    teams.forEach( (team) => {
        // console.log(team)
        var tr = document.createElement('tr')
        tr.innerHTML = 
        `
            <td>
                <label for="" class="${team.id}-id-team">${team.name}</label>
            </td>
            <td class="border-top">
                <div class="input-group mb-3">
                    <div class="btn-group" id="${team.id}-id-team">
                        <button type="button" class="btn btn-outline-secondary" onclick="updateTeam(this, ${team.id} )">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                <path
                                    d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001">
                                </path>
                            </svg>
                            <span class="visually-hidden">Button</span>
                        </button>
                        <button type="button" class="btn btn-outline-secondary"  onclick="deleteTeam(${team.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                <path
                                    d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                            </svg>
                            <span class="visually-hidden">Button</span>
                        </button>
                    </div>
                </div>
            </td>
            <td>${team.registered_by}</td>
        `;
        
        teamTable.appendChild(tr)
                        
    });
    }
    
 }




                        

function updateTeam(child, id) {
    console.log(child)
    var teamId = child.parentElement.id
    var teamName = document.getElementsByClassName(teamId)[0].textContent
    var body = `
    <div class="row">
        <div class="col-md-6 mt-3">
            <div class="mb-3">
                <label for="name" class="form-label">Equipe: ${teamName}</label>
                <div class="input-group input-group-sm">
                    <input type="text" class="form-control editField nameTeam" id="name" placeholder="Seu usuário" value="${teamName}" pattern="[a-zA-Z0-9]+" readonly="true">
                    <button class="btn btn-outline-secondary" type="button" onclick="enableFieldEditing(this.parentElement)">Editar</button>
                </div>
            </div>
        </div>
    </div>
    `
    //var nameTeam = findClassPerName(child, 'teamInput', 'app')
    console.log(teamName)

    deleteModalEdit()
    createModalEdit("Editar equipe", body, `updateNameTeam(this, ${id})`)
}


function updateNameTeam(child, idTeam){
    var nameTeam =  findClassPerName(child, "nameTeam", "row").value
    var id = idTeam

    console.log(nameTeam)
    console.log(id)
    if(!nameTeam || !id){
        return
    }

    const url = "/updateteam";
    const method = "POST";
    const data = new URLSearchParams();

    data.append('name', nameTeam)
    data.append('id', id)

    var status = handlingDataOnDB(url, method, data)
    showModalSpinner()
    status.then(value => {
        console.log(value)
        getTeam()

        setTimeout(() => {
            getCategory();
        }, 500);
    })
}


function deleteTeam(id) {
    const url = "/deleteteam";
    const method = "POST";
    const data = new URLSearchParams();

    if(!id){
        return
    }
    data.append('id', id)

    var status = handlingDataOnDB(url, method, data)
    showModalSpinner()
    status.then(value => {
        console.log(value)
        getTeam()
        
        setTimeout(() => {
            getCategory();
        }, 500);
        
    })
}


//Categorias ----------------------





function setCategories(child) {
    var categoryInput = findClassPerName(child, 'categoryInput', 'app').value
    var categoryScope = findClassPerName(child, 'categoryScope', 'app').value
    var categoryTeam = findClassPerName(child, 'categoryTeam', 'app').value

    console.log(categoryInput)
    console.log(categoryTeam)
    console.log(categoryScope)

    if (categoryTeam != 'Equipes') {
        let valor = parseInt(categoryTeam, 10);
        
        // O valor é um inteiro e maior que 0
        console.log('O valor é um inteiro e maior que 0')

        const url = "/setcategory";
        const method = "POST";
        const data = new URLSearchParams();

        data.append('name', categoryInput)
        data.append('scope', categoryScope)
        data.append('team', categoryTeam)

        var status = handlingDataOnDB(url, method, data)
        showModalSpinner()
        status.then(value => {
            //var vl = JSON.parse(value)
            console.log(value)
            getCategory()
        })
    }

}



function getCategory() {
    const url = "/getcategory";
    const method = "POST";
    const data = new URLSearchParams();

    //console.log('chamou get category')

    var status = handlingDataOnDB(url, method, data)
 
    status.then(value => {
        //console.log(value)
        populateTableCategory(value)
    })
 }

//Adiciona as equipes no select de gategorias
function populateSelecTeamOnCategories(teams){
    if (!teams ) {
        throw new Error("Parâmetros inválidos.");
        return
    }
    var teamSelect = document.querySelectorAll('.categoryTeam')[0]
    if(teamSelect){
        teamSelect.innerHTML = ""

        var opt = document.createElement('option')
        opt.innerHTML = "Padrão"
        opt.value = "1"
        teamSelect.appendChild(opt)
        
        teams.forEach( (team) => {
            // console.log(team)
            opt = document.createElement('option')
            opt.innerHTML = `${team.name}`
            opt.value = `${team.id}`
            teamSelect.appendChild(opt)
        })
    }
 }

 function populateTableCategory(categories){
    if (!categories ) {
        throw new Error("Parâmetros inválidos.");
        return
    }
    var categoryTable = document.querySelectorAll('.tableCategories')[0]
    if(categoryTable){
        categoryTable.innerHTML = ""

        categories.forEach( (category) => {
            // console.log(team)
            var tr = document.createElement('tr')
            tr.innerHTML = 
                `
                        <td>
                            <label for="" class="${category.id}-id-category">${category.name}</label>
                        </td>

                        <td class="border-top">
                            <div class="input-group mb-3">
                                <div class="btn-group" id="${category.id}-id-category">
                                    <button type="button" class="btn btn-outline-secondary" onclick="updateCategory(this, ${category.id})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-pen-fill" viewBox="0 0 16 16">
                                            <path
                                                d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001">
                                            </path>
                                        </svg>
                                        <span class="visually-hidden">Button</span>
                                    </button>
                                    <button type="button" class="btn btn-outline-secondary"  onclick="deleteCategory(this, ${category.id})">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                            fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                                            <path
                                                d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                                        </svg>
                                        <span class="visually-hidden">Button</span>
                                    </button>
                                </div>
                            </div>
                        </td>

                        <td class="${category.id}-id-category">${category.name_team}</td>
                        <td class="${category.id}-id-category">${category.scope}</td>

                        <td>${category.user}</td>
                    </tr>
                
                `
            
            categoryTable.appendChild(tr)
                            
        });
    }
 }


function updateCategory(child, id) {
    if(!child){
        return

    }
    
    var catId = child.parentElement.id
    var catName = document.getElementsByClassName(catId)[0].textContent
    var catTeam = document.getElementsByClassName(catId)[1].textContent
    var catScope = document.getElementsByClassName(catId)[2].textContent 
    var selectScope = ''

    // Recuperar a string JSON do localStorage
    const teamsRescue = localStorage.getItem('teams');

    // Converter a string JSON de volta para um array de objetos
    const teams = JSON.parse(teamsRescue);

    // Cria o elemento select
    const selectTeam = document.createElement('select');
    selectTeam.classList.add('form-select', 'categoryTeam', 'editField');
    selectTeam.disabled = true;
    selectTeam.setAttribute('aria-label', 'Default select example');

    teams.forEach(team =>{
        const option = document.createElement('option');
        option.value = team.id;
        option.text = team.name;
        
        if(catTeam === team.name){
            console.log(catTeam +" sada "+ team.name)
            option.setAttribute('selected', 'selected');
            option.selected = true
        }
        selectTeam.appendChild(option)
    })


    if(catScope == 'local'){
        selectScope = `
        <select class="form-select categoryScope editField" disabled="true" aria-label="Default select example">
            <option value="local" selected>Pessoal(local)</option>
            <option value="global">Global</option>
        </select>
        `
    }else if(catScope == 'global'){
        selectScope = `
        <select class="form-select categoryScope editField" disabled="true" aria-label="Default select example">
            <option value="local">Pessoal(local)</option>
            <option value="global" selected>Global</option>
        </select>
        `
    }


    var body = `
    <div class="row">
        <div class="col mt-3">
            <!--Nome-->
            <label>Nome da Categoria: ${catName}</label><br>
            <label>Equipe: ${catTeam}</label><br>
            <label>Escopo: ${catScope}</label><br><br>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Nome da Categoria</span>
                <input type="text" class="form-control categoryName editField" aria-label="Sizing example input"  pattern="[a-zA-Z0-9]+" readonly="true"
                    aria-describedby="inputGroup-sizing-sm" value="${catName}">
                <button class="btn btn-outline-secondary" type="button" onclick="enableFieldEditing(this.parentElement)">Editar</button>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Equipe</span>
                ${selectTeam.outerHTML}
                <button class="btn btn-outline-secondary" type="button" onclick="enableFieldEditingSelect(this.parentElement)">Editar</button>
            </div>
            <div class="input-group input-group-sm mb-3">
                <span class="input-group-text" id="inputGroup-sizing-sm">Escopo</span>
                    ${selectScope}
                <button class="btn btn-outline-secondary" type="button" onclick="enableFieldEditingSelect(this.parentElement)">Editar</button>
            </div>
        </div>
    </div>
    `
    //var nameTeam = findClassPerName(child, 'teamInput', 'app')
    //console.log(document.getElementsByClassName(catId))

    deleteModalEdit()
    createModalEdit("Editar Categoria", body, `updateCategoryData(event, ${id})` ) 
}


async function updateCategoryData(event, id) {
    if (!event) {
        return;
    }

    let container = findClassPerName(event.target, "col", "row");
    let categoryName = container.querySelector('.categoryName').value;
    let categoryTeam = container.querySelector('.categoryTeam').value;
    let categoryScope = container.querySelector('.categoryScope').value;

    const url = "/updatecategory";
    const method = "POST";
    const data = new URLSearchParams();
    data.append('id', id);
    data.append('name', categoryName);
    data.append('team', categoryTeam);
    data.append('scope', categoryScope);

    showModalSpinner();

    try {
        const response = await fetch(url, {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log("Resultado retornado:", result);
        getCategory();
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
    }
}

async function deleteCategory(child, id){
    if(!child){
        return

    }
    
    var catId = id

    console.log(catId)

    const url = "/deletecategory";
    const method = "POST";
    const data = new URLSearchParams();

    data.append('id', catId)

    try {
        const response = await fetch(url, {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        console.log("Resultado retornado:", result);
        getCategory();
    } catch (error) {
        console.error("Erro ao atualizar categoria:", error);
    }

}




//
function handlingDataOnDB(url, method, data) {
    return (
        fetchAPI(url, method, data)
    )
}



async function getShortScript(){
    
    const url = "/getlongscript";
    const method = "POST";
    const data = new URLSearchParams();
 
    try {
        const response = await fetchAPI(url, method, data);
        console.log(response);
    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
 
}

async function setShortScript(){
    
    const url = "/getlongscript";
    const method = "POST";
    const data = new URLSearchParams();
 
    try {
        const response = await fetchAPI(url, method, data);
        console.log(response);
    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
 
}

async function updateShortScript(){
    
    const url = "/getlongscript";
    const method = "POST";
    const data = new URLSearchParams();
 
    try {
        const response = await fetchAPI(url, method, data);
        console.log(response);
    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
 
}

async function removeShortScript(){
    
    const url = "/getlongscript";
    const method = "POST";
    const data = new URLSearchParams();
 
    try {
        const response = await fetchAPI(url, method, data);
        console.log(response);
    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
 
}




async function getLongScript(){
    
    const url = "/getlongscript";
    const method = "POST";
    const data = new URLSearchParams();
 
    try {
        const response = await fetchAPI(url, method, data);
        console.log(response);

    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
 
}


async function getPlatformFonts(){
    const url = "/getplatformfonts";
    const method = "POST";
    const data = new URLSearchParams();
 
    try {
        const response = await fetchAPI(url, method, data);
        //console.log(response);
        populatePlatformFonts(response)

    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
}

async function getPlatformColorSchemes(){
    const url = "/getplatformcolorschemes";
    const method = "POST";
    const data = new URLSearchParams();
 
    try {
        const response = await fetchAPI(url, method, data);

        //cria um select group e adiciona os itens como options do select

        //console.log(response);
        populatePlatformColorSchemes(response)

    } catch (error) {
        console.error("Error fetching API:", error);
        throw error;
    }
}


// function populatePlatformFonts(data) {
//     const fonts = data.data || []; // Garante que fonts seja um array

//     let container = document.querySelector('.container-fonts');
//     container.innerHTML = ''; // Limpa o container antes de popular

//     fonts.forEach(font => {
//         let fontElement = document.createElement('div');
//         fontElement.style.fontFamily = font.font_family;
//         fontElement.style.fontStyle = font.font_style;
//         fontElement.style.fontWeight = font.font_weight;
//         fontElement.classList.add('d-flex', 'align-items-center', 'w-100', 'mb-2');

//         let inputGroup = document.createElement('div');
//         inputGroup.classList.add('input-group', 'input-group-sm', 'w-100');

//         let input = document.createElement('input');
//         input.type = 'text';
//         input.classList.add('form-control');
//         input.placeholder = font.name;
//         input.disabled = true;

//         let applyButton = document.createElement('button');
//         applyButton.classList.add('btn', 'btn-outline-secondary');
//         applyButton.type = 'button';
//         applyButton.textContent = 'Aplicar';
//         applyButton.onclick = function() {
//             applyGlobalFont(font.font_family, font.font_style, font.font_weight);
//             saveFontToDatabase(font.id); // Função para salvar no banco de dados
//         };

//         inputGroup.appendChild(input);
//         inputGroup.appendChild(applyButton);
//         fontElement.appendChild(inputGroup);
//         container.appendChild(fontElement);
//     });
// }

function populatePlatformFonts(data) {
    const fonts = data.data || []; // Garante que fonts seja um array

    let container = document.querySelector('.container-fonts');
    container.innerHTML = ''; // Limpa o container antes de popular

    fonts.forEach(font => {
        let fontElement = document.createElement('div');
        fontElement.style.fontFamily = font.font_family;
        fontElement.style.fontStyle = font.font_style;
        fontElement.style.fontWeight = font.font_weight;
        fontElement.classList.add('d-flex', 'align-items-center', 'w-100', 'mb-2');

        let inputGroup = document.createElement('div');
        inputGroup.classList.add('input-group', 'input-group-sm', 'w-100');

        let input = document.createElement('input');
        input.type = 'text';
        input.classList.add('form-control');
        input.placeholder = font.name;
        input.style.fontFamily = font.font_family; // Aplica a fonte ao texto do input
        input.disabled = true;

        let applyButton = document.createElement('button');
        applyButton.classList.add('btn', 'btn-outline-secondary');
        applyButton.type = 'button';
        applyButton.textContent = 'Aplicar';
        applyButton.onclick = function() {
            applyGlobalFont(font.font_family, font.font_style, font.font_weight); // Aplica a fonte globalmente
            saveFontToDatabase(font.id); // Função para salvar no banco de dados
        };

        inputGroup.appendChild(input);
        inputGroup.appendChild(applyButton);
        fontElement.appendChild(inputGroup);
        container.appendChild(fontElement);
    });
}


function populatePlatformColorSchemes(data) {
    const colorSchemes = data.data || []; // Garante que colorSchemes seja um array

    let container = document.querySelector('.container-schemes');
    container.innerHTML = ''; // Limpa o container antes de popular

    colorSchemes.forEach(scheme => {
        let schemeElement = document.createElement('div');
        schemeElement.classList.add('color-scheme', 'd-flex', 'flex-column', 'align-items-center', 'w-100', 'mb-3', 'p-2', 'border', 'rounded');

        let name = document.createElement('div');
        name.textContent = scheme.name;
        name.classList.add('mb-2', 'fw-bold');

        let primaryColor = document.createElement('div');
        primaryColor.style.backgroundColor = scheme.primary_color;
        primaryColor.classList.add('color-box', 'w-100', 'mb-1');
        primaryColor.textContent = `Primária: ${scheme.primary_color}`;

        let secondaryColor = document.createElement('div');
        secondaryColor.style.backgroundColor = scheme.secondary_color;
        secondaryColor.classList.add('color-box', 'w-100', 'mb-1');
        secondaryColor.textContent = `Secundária: ${scheme.secondary_color}`;

        let neutralColor = document.createElement('div');
        neutralColor.style.backgroundColor = scheme.neutral_color;
        neutralColor.classList.add('color-box', 'w-100', 'mb-1');
        neutralColor.textContent = `Neutra: ${scheme.neutral_color}`;

        let highlightColor = document.createElement('div');
        highlightColor.style.backgroundColor = scheme.highlight_color;
        highlightColor.classList.add('color-box', 'w-100', 'mb-1');
        highlightColor.textContent = `Destaque: ${scheme.highlight_color}`;

        let backgroundColor = document.createElement('div');
        backgroundColor.style.backgroundColor = scheme.background_color;
        backgroundColor.classList.add('color-box', 'w-100', 'mb-1');
        backgroundColor.textContent = `Fundo: ${scheme.background_color}`;

        let textColor = document.createElement('div');
        textColor.style.color = scheme.text_color;
        textColor.classList.add('color-box', 'w-100', 'mb-1');
        textColor.textContent = `Texto: ${scheme.text_color}`;

        let applyButton = document.createElement('button');
        applyButton.classList.add('btn', 'btn-outline-secondary', 'mt-2');
        applyButton.type = 'button';
        applyButton.textContent = 'Aplicar';
        applyButton.onclick = function() {
            applyGlobalFontColorScheme(scheme)
            saveColorSchemeToDatabase(scheme.id); // Função para salvar no banco de dados
        };

        schemeElement.appendChild(name);
        schemeElement.appendChild(primaryColor);
        schemeElement.appendChild(secondaryColor);
        schemeElement.appendChild(neutralColor);
        schemeElement.appendChild(highlightColor);
        schemeElement.appendChild(backgroundColor);
        schemeElement.appendChild(textColor);
        schemeElement.appendChild(applyButton);

        container.appendChild(schemeElement);
    });
}

// Exemplo de função para salvar a fonte no banco de dados
function saveFontToDatabase(fontId) {
    console.log('Salvar fonte com ID:', fontId);
    // Adicione aqui a lógica para salvar a fonte no banco de dados

    const url = "/updateplatformfonts";
    const method = "POST";
    const data = new URLSearchParams();


    if (!typeof fontId !== 'undefined' && fontId != null) {
        data.append("font", fontId);

        fetchAPI(url, method, data).then(value => {
            showModalSpinner()
            if (value.status == 'error') {
                alert("Erro ao cadastrar! " + value.message)
            }
            if (value.status == 'success') {
                alert(value.message)
            }
        });
    }

}

// Exemplo de função para salvar o esquema de cores no banco de dados
function saveColorSchemeToDatabase(schemeId) {
    console.log('Salvar esquema de cores com ID:', schemeId);
    // Adicione aqui a lógica para salvar o esquema de cores no banco de dados

    const url = "/updateplatformcolorschemes";
    const method = "POST";
    const data = new URLSearchParams();


    if (!typeof schemeId !== 'undefined' && schemeId != null) {
        data.append("color_scheme", schemeId);

        fetchAPI(url, method, data).then(value => {
            showModalSpinner()
            if (value.status == 'error') {
                alert("Erro ao cadastrar! " + value.message)
            }
            if (value.status == 'success') {
                alert(value.message)
            }
        });
    }
}



// function findClassPerName(child, targetClass, stopClass) {
//     if (!child || !targetClass) {
//         throw new Error("Parâmetros inválidos.");
//     }
//     let currentElement = child.parentElement;
//     while (currentElement) {
//         const elements = currentElement.querySelectorAll("."+targetClass);

//         if (elements.length > 0) {
//             return elements[0];
//         }

//         if (currentElement.classList.contains(stopClass)) {
//             return null;
//         }

//         currentElement = currentElement.parentElement;
//     }

//     return null;
// }


// document.addEventListener('DOMContentLoaded', function () {
//     // Função para abrir um modal
//     function openModal(modalId) {
//         const modal = document.getElementById(modalId);
//         if (modal) {
//             modal.classList.add('show');
//             modal.style.display = 'block';
//             modal.removeAttribute('aria-hidden');
//             modal.setAttribute('aria-modal', 'true');
//         }
//     }

//     // Função para fechar um modal
//     function closeModal(modalId) {
//         const modal = document.getElementById(modalId);
//         if (modal) {
//             modal.classList.remove('show');
//             modal.style.display = 'none';
//             modal.setAttribute('aria-hidden', 'true');
//             modal.removeAttribute('aria-modal');
//         }
//     }

//     // Adiciona eventos aos botões de abrir modal
//     document.querySelectorAll('[data-bs-toggle="modal"]').forEach(button => {
//         button.addEventListener('click', function () {
//             const targetModalId = button.getAttribute('data-bs-target').substring(1);
//             const currentModal = button.closest('.modal');
//             if (currentModal) {
//                 closeModal(currentModal.id);
//             }
//             openModal(targetModalId);
//         });
//     });

//     // Adiciona eventos aos botões de fechar modal
//     document.querySelectorAll('[data-bs-dismiss="modal"]').forEach(button => {
//         button.addEventListener('click', function () {
//             const modal = button.closest('.modal');
//             if (modal) {
//                 closeModal(modal.id);
//             }
//         });
//     });
// });


function enableFormByProfileEdit(event, serv){
    let container = event.target.parentElement
    let in_data = container.parentElement.querySelectorAll(".in_inputs")

    let parent = container ;
    let btns = parent.querySelectorAll('.btn');

    btns.forEach(btn => {
        btn.classList.toggle('btn-primary', btn === event.target);
        btn.classList.toggle('btn-outline-primary', btn !== event.target);
    });

    console.log(container)
    if (in_data.length > 0) {
        // A quantidade de elementos é maior que zero.
        // console.log("Existe pelo menos um elemento correspondente.");

        in_data.forEach(inp=>{
            // console.log(!inp.classList.contains(serv))
            if ( inp.classList.contains('input_active') && !inp.classList.contains(serv) && !inp.classList.contains('hide_element') ){
                inp.classList.add('hide_element');
                inp.classList.remove('input_active');0
                // console.log("hide_element adicionada:", inp.classList);
                // console.log('chamou1')
            }else if( inp.classList.contains('hide_element') && !inp.classList.contains('input_active') && inp.classList.contains(serv)  ){
                inp.classList.remove('hide_element');
                inp.classList.add('input_active');
                // console.log("hide_element adicionada:", inp.classList);
                // console.log('chamou2')
            }
        })
    }

}


function send_image_misc(event) {
    var container = event.target.parentElement.parentElement;
    let inputMisc = container.querySelector('#send_image_misc_file');
    const preview = container.querySelector('.container-image-misc');
    uploadImageExample(inputMisc, preview)
        .then(() => refreshImagesMisc())
        .catch(() => {});
}

// Versão corrigida usando fetchAPI
async function uploadImageExample(inputMisc, preview = null) {
    const input = inputMisc;
    
    try {
        // Validar se o input foi fornecido e tem arquivo
        if (!input || !input.files || input.files.length === 0) {
            throw new Error('Nenhum arquivo selecionado');
        }

        const file = input.files[0];
        
        // Validar tipo de arquivo
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.type)) {
            throw new Error('Tipo de arquivo não permitido. Apenas JPG, JPEG, PNG e GIF são aceitos.');
        }

        // Validar tamanho do arquivo (máximo 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            throw new Error(`Arquivo muito grande. Tamanho máximo: 5MB`);
        }

        // Mostrar preview se container foi fornecido
        if (preview) {
            const reader = new FileReader();
            reader.onload = function(e) {
                preview.innerHTML = `
                    <img src="${e.target.result}" 
                         alt="Preview" 
                         style="max-width: 200px; max-height: 200px; object-fit: cover; border-radius: 8px;">
                `;
            };
            reader.readAsDataURL(file);
        }

        // Criar FormData
        const formData = new FormData();
        formData.append('image', file);
        formData.append('original_name', file.name);
        formData.append('category', 'misc');
        formData.append('description', 'Imagem enviada pelo usuário');

        // Usar fetchAPI seguindo o padrão da sua aplicação
        const url = "/imagemisc";
        const method = "POST";

        // Mostrar spinner se a função existir
        if (typeof showModalSpinner === 'function') {
            showModalSpinner();
        }

        // Fazer requisição usando fetch diretamente (já que FormData não funciona com URLSearchParams)
        const response = await fetch(url, {
            method: method,
            body: formData // FormData diretamente, sem URLSearchParams
        });

        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();

        // Verificar status da resposta
        if (result.status === 'error') {
            throw new Error(result.message || 'Erro desconhecido no servidor');
        }

        // Mostrar notificação de sucesso
        if (typeof showNotification === 'function') {
            showNotification('Imagem enviada com sucesso!', 'bg-success');
        } else {
            alert('Imagem enviada com sucesso!');
        }

        console.log('Sucesso:', result);
        return result;

    } catch (error) {
        console.error('Erro:', error);
        
        // Limpar preview em caso de erro
        if (preview) {
            preview.innerHTML = '<p class="text-danger">Erro ao carregar preview</p>';
        }

        // Mostrar notificação de erro
        if (typeof showNotification === 'function') {
            showNotification(`Erro: ${error.message}`, 'bg-danger');
        } else {
            alert(`Erro ao enviar imagem: ${error.message}`);
        }

        throw error;
    }
}


// Lista imagens misc do usuário e renderiza no card
async function refreshImagesMisc() {
    try {
        const container = document.querySelector('.send_images .container-image-misc');
        if (!container) return;

        container.innerHTML = '<div class="w-100 text-center py-4">Carregando...</div>';

        const response = await fetch('/getimagesmisc', { method: 'GET' });
        if (!response.ok) throw new Error('Falha ao obter imagens');
        const result = await response.json();
        if (result.status !== 'success') throw new Error(result.message || 'Erro ao listar imagens');

        const images = Array.isArray(result.data) ? result.data : [];

        if (images.length === 0) {
            container.innerHTML = '<div class="w-100 text-center py-4 text-muted">Nenhuma imagem enviada ainda</div>';
            return;
        }

        // Render grid
        const grid = document.createElement('div');
        grid.style.display = 'grid';
        grid.style.gridTemplateColumns = 'repeat(auto-fill, minmax(180px, 1fr))';
        grid.style.gap = '12px';
        grid.style.width = '100%';
        grid.style.padding = '10px';
        grid.style.overflowY = 'auto';

        images.forEach(img => {
            const fullPath = (img.full_path || '').replace(/\\/g, '/');
            const webPath = '/' + fullPath.replace(/^\/+/, '');

            const card = document.createElement('div');
            card.style.border = '1px solid #ddd';
            card.style.borderRadius = '8px';
            card.style.padding = '8px';
            card.style.background = '#fff';

            const thumb = document.createElement('img');
            thumb.src = webPath;
            thumb.alt = img.original_file_name || 'imagem';
            thumb.style.width = '100%';
            thumb.style.height = '120px';
            thumb.style.objectFit = 'cover';
            thumb.style.borderRadius = '4px';

            const input = document.createElement('input');
            input.type = 'text';
            input.readOnly = true;
            input.value = webPath; // mostrar caminho web acessível no container
            input.style.width = '100%';
            input.style.fontSize = '12px';
            input.style.marginTop = '6px';

            const row = document.createElement('div');
            row.style.display = 'flex';
            row.style.gap = '6px';
            row.style.marginTop = '6px';

            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'btn btn-sm btn-outline-secondary';
            copyBtn.textContent = 'Copiar caminho';
            copyBtn.onclick = () => {
                navigator.clipboard.writeText(webPath);
                if (typeof showNotification === 'function') showNotification('Caminho copiado!', 'bg-success');
            };

            const copyTokenBtn = document.createElement('button');
            copyTokenBtn.type = 'button';
            copyTokenBtn.className = 'btn btn-sm btn-outline-primary';
            copyTokenBtn.textContent = 'Copiar token';
            copyTokenBtn.onclick = () => {
                const token = `{{img:${webPath}|width:300|height:auto}}`;
                navigator.clipboard.writeText(token);
                if (typeof showNotification === 'function') showNotification('Token copiado!', 'bg-success');
            };

            const delBtn = document.createElement('button');
            delBtn.type = 'button';
            delBtn.className = 'btn btn-sm btn-outline-danger';
            delBtn.textContent = 'Excluir';
            delBtn.onclick = () => deleteImageMisc(img.id);

            row.appendChild(copyBtn);
            row.appendChild(copyTokenBtn);
            row.appendChild(delBtn);

            card.appendChild(thumb);
            card.appendChild(input);
            card.appendChild(row);
            grid.appendChild(card);
        });

        container.innerHTML = '';
        container.appendChild(grid);
    } catch (e) {
        const container = document.querySelector('.send_images .container-image-misc');
        if (container) container.innerHTML = '<div class="text-danger p-3">Erro ao listar imagens</div>';
        console.error(e);
    }
}

async function deleteImageMisc(imageId) {
    if (!confirm('Deseja realmente excluir esta imagem?')) return;
    try {
        const form = new FormData();
        form.append('image_id', imageId);
        const res = await fetch('/deleteimagesmisc', { method: 'POST', body: form });
        const json = await res.json();
        if (json.status !== 'success') throw new Error(json.message || 'Falha ao excluir');
        if (typeof showNotification === 'function') showNotification('Imagem excluída!', 'bg-success');
        refreshImagesMisc();
    } catch (e) {
        if (typeof showNotification === 'function') showNotification('Erro ao excluir imagem', 'bg-danger');
        console.error(e);
    }
}






function backupdb() {
    window.location.href = '/backupdb'; // Isso inicia o download
}



function deleteEmailQueue() {
    fetch('/deleteemailqueue', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resultado da exclusão da fila de e-mails:', data);
    })
    .catch(error => {
        console.error('Erro ao excluir a fila de e-mails:', error);
    });
}



function setUserStatusPlatform(status, id) {
    //console.log(status + " = " + id)
    const url = `/updateuserstatusplatform?status=${encodeURIComponent(status)}&id=${encodeURIComponent(id)}`;

    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resultado da atualização de status:', data);
    })
    .catch(error => {
        console.error('Erro ao atualizar o status do usuário:', error);
    });
}



function getSessions() {
    const url = "/getsessions";
    const method = "POST";
    const data = new URLSearchParams();

    fetchAPI(url, method, data).then(value => {
        console.log(value)
        if(value.status == "success"){
            insertIntoUsersContainerSessions(value.data)
        }
    });
}


function insertIntoUsersContainerSessions(users) {
    const tableBody = document.querySelector(".table_sessions tbody");
    tableBody.innerHTML = ''; // Limpa o conteúdo existente

    // Estilo de rolagem vertical
    tableBody.style.maxHeight = '400px';
    tableBody.style.overflowY = 'auto';

    users.forEach(user => {
        const row = document.createElement('tr');
        row.classList.add('border-bottom', 'd-flex', 'flex-row');

        // Coluna: Servidor
        const serverCell = document.createElement('td');
        serverCell.classList.add('col');
        serverCell.textContent = user.server_domain;

        // Coluna: Data de log
        const dateCell = document.createElement('td');
        dateCell.classList.add('col');
        dateCell.textContent = user.login_time;

        // Coluna: Usuário
        const userCell = document.createElement('td');
        userCell.classList.add('col');
        userCell.textContent = user.user;

        // Coluna: Botão de deletar sessão
        const actionCell = document.createElement('td');
        actionCell.classList.add('col');

        const deleteButton = document.createElement('button');
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.textContent = "Excluir Sessão";
        deleteButton.onclick = function() {
            deleteSession(user.id);
        };

        actionCell.appendChild(deleteButton);

        // Monta a linha
        row.appendChild(serverCell);
        row.appendChild(dateCell);
        row.appendChild(userCell);
        row.appendChild(actionCell);

        tableBody.appendChild(row);
    });
}


function deleteSession(id){
    const url = `/deletesession?id=${encodeURIComponent(id)}`;

    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resultado da atualização de status:', data);
    })
    .catch(error => {
        console.error('Erro ao atualizar o status do usuário:', error);
    });
}





function updateAdmCredencials(el) {
    const container = el.closest('.row');

    const adm_name_el = container.querySelector('#adm_name');
    const adm_user_el = container.querySelector('#adm_user');
    const adm_pass_el = container.querySelector('#adm_password'); // Corrigido aqui

    // Verifica se os elementos existem
    if (!adm_name_el || !adm_user_el || !adm_pass_el) {
        alert('Erro: campos não encontrados.');
        return;
    }

    const adm_name = adm_name_el.value.trim();
    const adm_user = adm_user_el.value.trim();
    const adm_pass = adm_pass_el.value.trim();

    // Validação básica
    if (!adm_name || !adm_user || !adm_pass) {
        alert('Todos os campos são obrigatórios.');
        return;
    }

    const url = `/updateadmcredentials?new_pass=${encodeURIComponent(adm_pass)}&new_name=${encodeURIComponent(adm_name)}&new_user=${encodeURIComponent(adm_user)}`;

    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert(data.message || 'Credenciais atualizadas com sucesso.');
        } else {
            alert(data.message || 'Erro ao atualizar credenciais.');
        }
    })
    .catch(error => {
        console.error('Erro na requisição:', error);
        alert('Erro de comunicação com o servidor.');
    });
}
