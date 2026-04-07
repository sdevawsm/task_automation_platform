window.onload = function() {
    
	execPlatformSettings();
	getScriptsByDefault()

	setActiveTextNocDefault()

	getAlarms();
	//startNotificationPolling();

	localStorage.removeItem('notifications');
	//updateNotificationCount();

	//addService()
	
	//addShortShortcut() 
	//addScriptTemplates()
	//addLGPD()
	//addNoc()
	//addFinanceiro()

	fetchAndLogNotifications();

    updateNotificationContainer()


};





async function fetchAndLogNotifications() {

	//console.log("chamou")

	let newNotifications = await fetchNotifications();
	console.log(newNotifications);
  
	newNotifications.forEach(notification => {
	  console.log(notification);
	});
  }
  
fetchAndLogNotifications();
  











document.addEventListener('DOMContentLoaded', function() { 
    execProfile(); //Aplica thema, cores e configurações do perfil na aplicação
	
});


// Função para obter alarmes do localStorage
function getAlarmsFromLocalStorage() {
	console.log('Obtendo alarmes do localStorage');
	const alarms = localStorage.getItem('alarms');
	return alarms ? JSON.parse(alarms) : [];
  }
  
  // Função para verificar e exibir alarmes
/*  function checkAlarms() {
	console.log('Verificando alarmes');
	const alarms = getAlarmsFromLocalStorage();
	const now = new Date();
	const currentDay = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
  
	console.log(`Data e hora atuais: ${now}`);
	console.log(`Dia da semana atual: ${currentDay}`);
  
	alarms.forEach(alarm => {
	  console.log(`Verificando alarme: ${alarm.title}`);
	  const alarmDays = JSON.parse(alarm.days);
	  console.log(`Dias do alarme: ${alarmDays}`);
  
	  if (alarmDays.includes(currentDay) &&
		  now.getHours() === parseInt(alarm.hour) &&
		  now.getMinutes() === parseInt(alarm.minute) &&
		  now.getSeconds() === parseInt(alarm.second) &&
		  !alarm.triggered) {
		console.log(`Acionando alarme: ${alarm.title}`);
		// Exibir notificação
		new Notification(alarm.title, {
		  body: `É hora de: ${alarm.title}`,
		});
  
		// Marcar alarme como acionado (você pode decidir como gerenciar isso)
		alarm.triggered = true;
	  }
	});
  
	// Salvar estado atualizado dos alarmes no localStorage
	localStorage.setItem('alarms', JSON.stringify(alarms));
	console.log('Alarmes atualizados no localStorage');
  }
  
  // Solicitar permissão para notificações
  Notification.requestPermission().then(permission => {
	if (permission === 'granted') {
	  console.log('Permissão para notificações concedida');
	  // Função para iniciar a verificação dos alarmes
	  function startAlarmChecker() {
		console.log('Iniciando verificação de alarmes');
		setInterval(checkAlarms, 1000); // Verifica a cada 1 segundo
	  }
  
	  // Chama a função para iniciar o ciclo de verificação
	  startAlarmChecker();
	} else {
	  console.log('Permissão para notificações negada');
	}
  });
  
  */


  // Função para criar um card de alarme


/*function createAlarmCard(alarm) {
    console.log(alarm);

    const card = document.createElement('div');
    card.className = 'card card-alarm mb-3 border';
    card.style.maxWidth = '540px';
    
    const row = document.createElement('div');
    row.className = 'row g-0';
    
    const colImg = document.createElement('div');
    colImg.className = 'col-md-4';
    
    const img = document.createElement('img');
    img.src = 'public/images/alarm/alarm_gif.gif';
    img.className = 'img-fluid rounded-start';
    img.alt = 'Imagem de alarme';
    colImg.appendChild(img);
    
    const colBody = document.createElement('div');
    colBody.className = 'col-md-8';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = alarm.title;
    
    const time = document.createElement('p');
    time.className = 'card-text';
    const smallText = document.createElement('small');
    smallText.className = 'text-muted';
    smallText.textContent = `${alarm.hour}:${alarm.minute}:${alarm.second}`;
    time.appendChild(smallText);
    
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn btn-secondary btn-sm';
    closeButton.textContent = 'Fechar';
    closeButton.onclick = function() {
        closeCardAlarm(this);
    };
    
    cardBody.appendChild(title);
    cardBody.appendChild(time);
    cardBody.appendChild(closeButton);
    colBody.appendChild(cardBody);
    
    row.appendChild(colImg);
    row.appendChild(colBody);
    card.appendChild(row);
    
    document.body.appendChild(card);
}*/


function createAlarmCard(alarm) {
    console.log(alarm);

	// Verifique se um card para este alarme já existe
    //const existingCard = document.querySelector(`.card-alarm[data-id="${alarm.id}"]`);
	const existingCard = document.querySelector(`.card-alarm`);
    if (existingCard) {
        return; // Se já existir, não crie um novo card
    }

    const card = document.createElement('div');
    card.className = 'card card-alarm mb-3 border';
    card.style.maxWidth = '300px';
	card.style.top = '-300px';
    
    const row = document.createElement('div');
    row.className = 'row g-0';
    
    const colImg = document.createElement('div');
    colImg.className = 'col-md-4';
    
    const img = document.createElement('img');
    img.src = 'public/images/alarm/alarm_gif.gif';
    img.className = 'img-fluid rounded-start';
    img.alt = 'Imagem de alarme';
    colImg.appendChild(img);
    
    const colBody = document.createElement('div');
    colBody.className = 'col-md-8';
    
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    
    const title = document.createElement('h5');
    title.className = 'card-title';
    title.textContent = alarm.title;
    
    const time = document.createElement('p');
    time.className = 'card-text';
    const smallText = document.createElement('small');
    smallText.className = 'text-muted';
    //smallText.textContent = `${alarm.hour}:${alarm.minute}:${alarm.second}`;
	smallText.textContent = `${String(alarm.hour).padStart(2, '0')}:${String(alarm.minute).padStart(2, '0')}:${String(alarm.second).padStart(2, '0')}`;
    time.appendChild(smallText);
    
    const closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'btn btn-secondary btn-sm';
    closeButton.textContent = 'Fechar';
    closeButton.onclick = function() {
        closeCardAlarm(this);
    };
    
    cardBody.appendChild(title);
    cardBody.appendChild(time);
    cardBody.appendChild(closeButton);
    colBody.appendChild(cardBody);
    
    row.appendChild(colImg);
    row.appendChild(colBody);
    card.appendChild(row);
    
    const notificationContainer = document.getElementById('notification-container');
    notificationContainer.appendChild(card);

	// Envia um evento de notificação via localStorage para outras abas
    localStorage.setItem('showAlarmNotification', JSON.stringify(alarm));
}


window.addEventListener('storage', function(event) {
    if (event.key === 'showAlarmNotification') {
		console.log('criou card')
        const alarm = JSON.parse(event.newValue);
        createAlarmCard(alarm);

    }

	if (event.key === 'closeAlarmNotification') {
		console.log('fechou')
        const cards = document.querySelectorAll('.card-alarm');
        cards.forEach(card => card.remove());
    }

    if (event.key === ALARM_PLAY_KEY && event.newValue === 'true') {
        if (alarmAudio && !alarmAudio.paused) {
            alarmAudio.pause();
            alarmAudio.currentTime = 0;
        }
    }

});


function closeCardAlarm(button) {
    const card = button.closest('.card');
    card.remove();

    // Atualiza a chave no localStorage para disparar o evento de armazenamento em outras abas
    localStorage.setItem('closeAlarmNotification', Date.now().toString());

    if (alarmAudio) {
        alarmAudio.pause();
        alarmAudio.currentTime = 0; // Reinicia o áudio
    }
    // Código para fechar o modal
    // Por exemplo, se estiver usando jQuery, poderia ser:
    //$('#modal').modal('hide'); 
	deleteModalEdit()

}

  
  // Função para obter alarmes do localStorage
  function getAlarmsFromLocalStorage() {
    if (typeof localStorage !== 'undefined') {
        const alarms = localStorage.getItem('alarms');
        if (alarms) {
            try {
                return JSON.parse(alarms);
            } catch (error) {
                //console.error('Erro ao analisar o JSON:', error);
                return JSON.parse('[]');
            }
        } else {
			return JSON.parse('[]');
        }
    } else {
        console.warn('localStorage não está disponível.');
        return JSON.parse('[]');
    }
}



document.body.addEventListener('click', () => {
    const unlockAudio = new Audio();
    unlockAudio.play().catch(error => {
        console.warn("Áudio desbloqueado após clique.");
    });
});



let alarmAudio; // Variável global para o áudio
const ALARM_PLAY_KEY = 'alarm_playing'; // Chave usada para controlar a instância de alarme em execução

// Criar um canal de comunicação entre abas
const channel = new BroadcastChannel('alarm_channel');

// Ouvir mensagens de outras abas
channel.onmessage = (event) => {
    if (event.data.type === 'show_notification') {
        // Apenas exibe o card localmente na aba atual
        createAlarmCard(event.data.alarm);
    }
};

function checkAlarms() {
    const alarms = getAlarmsFromLocalStorage();
    const now = new Date();
    const currentDay = now.toLocaleString('en-us', { weekday: 'long' }).toLowerCase();

    alarms.forEach(alarm => {
        const alarmDays = JSON.parse(alarm.days);

        if (alarmDays.includes(currentDay) &&
            now.getHours() === parseInt(alarm.hour) &&
            now.getMinutes() === parseInt(alarm.minute) &&
            now.getSeconds() === parseInt(alarm.second) &&
            !alarm.triggered) {

            
                createAlarmCard(alarm);

            // Enviar mensagem para todas as abas criarem o card
            channel.postMessage({ type: 'show_notification', alarm });

            // Certificar-se de que apenas uma aba cria a notificação do Windows
            if (localStorage.getItem('windows_notification_shown') !== 'true') {
                localStorage.setItem('windows_notification_shown', 'true');
                showAlarmNotification(alarm.title);

                // Resetar estado após algum tempo (ex.: 10 segundos)
                setTimeout(() => {
                    localStorage.removeItem('windows_notification_shown');
                }, 10000);
            }

            // Certificar-se de que o áudio foi desbloqueado
            if (localStorage.getItem(ALARM_PLAY_KEY) !== 'true') {
                localStorage.setItem(ALARM_PLAY_KEY, 'true'); // Define a chave para indicar que o alarme está tocando

                const song = 'public/songs/Pausa_Pra_Respirar_2.mp3'; // Caminho correto do áudio
                alarmAudio = new Audio(song);

                // Reproduzir o áudio com tratamento de erro
                alarmAudio.play().then(() => {
                    console.log("Áudio do alarme iniciado com sucesso.");

                    // Parar o áudio após 7 segundos
                    setTimeout(() => {
                        alarmAudio.pause();
                        alarmAudio.currentTime = 0;
                        localStorage.removeItem(ALARM_PLAY_KEY); // Remove a chave após tocar o alarme
                        console.log("Áudio do alarme pausado após 7 segundos.");
                    }, 3000); // Configura para parar após 7 segundos
                }).catch(error => {
                    console.error("Erro ao tentar reproduzir o áudio do alarme:", error);
                    localStorage.removeItem(ALARM_PLAY_KEY); // Certifica-se de que a chave seja limpa em caso de erro
                });
            } else {
                console.warn("Áudio já está em execução. Ignorando reprodução duplicada.");
            }

            // Marcar alarme como acionado
            alarm.triggered = true;
        }
    });

    // Salvar estado atualizado dos alarmes no localStorage
    localStorage.setItem('alarms', JSON.stringify(alarms));
}


function showAlarmNotification(title) {
    // Gerar notificação
    if (Notification.permission === 'granted') {
        new Notification("ALERTA", {
            icon: 'public/images/alarm/alarm_gif.gif',
            body: `Alarme ativado: ${title}`
        });
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification("ALERTA", {
                    icon: 'public/images/alarm/alarm_gif.gif',
                    body: `Alarme ativado: ${title}`
                });
            }
        });
    }
}

// Solicitar permissão para notificações
Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
        function startAlarmChecker() {
            setInterval(checkAlarms, 1000); // Verifica a cada 1 segundo
        }

        startAlarmChecker();
    } else {
        function startAlarmChecker() {
            setInterval(checkAlarms, 1000); // Verifica a cada 1 segundo
        }

        startAlarmChecker();
    }
});


  






function isValidURL(str) {
    const pattern = new RegExp('^(https?:\\/\\/)?' + // protocolo (opcional)
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domínio
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OU endereço IP (v4)
        '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // porta e caminho
        '(\\?[;&a-z\\d%_.~+=-]*)?' + // consulta
        '(\\#[-a-z\\d_]*)?$', 'i'); // fragmento
    return !!pattern.test(str);
}


function ensureValidURL(url) {
    // Adiciona http:// se a URL não começar com http:// ou https://
    if (!/^https?:\/\//i.test(url)) {
        url = 'https://' + url;
    }
    return url;
}


// Função para converter string HTML em objeto DOM
function convertStringToDOM(htmlString) {
    var range = document.createRange();
    range.selectNode(document.body); 
    var documentFragment = range.createContextualFragment(htmlString);
    return documentFragment.firstElementChild;
}

 
function generateRandomText() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let randomText = '';
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomText += characters.charAt(randomIndex);
    }
    return randomText;
}


// Função para salvar o status do tema e do background no servidor
function saveStatus(action, value, url) {
    const new_url = url;
    const method = "POST";
    const data = new URLSearchParams();

    if (typeof action !== 'undefined' && action !== null && typeof value !== 'undefined' && value !== null) {
        data.append(action, value);

        fetch(url, {
            method: method,
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(response => response.json())
        .then(value => {
            console.log('Status atualizado:', value);
        })
        .catch(error => {
            console.error('Erro ao atualizar o status:', error);
        });
    }
}



function execPlatformSettings(){
	var arr_profile = getPlatformSettings();
	arr_profile.then(
		response =>{
			console.log(response)

			var chat_form_field = response[0]['chat_status']
            var default_script_models = response[0]['default_script_models']
			localStorage.setItem("chat_form_field", chat_form_field);
            localStorage.setItem("default_script_models", default_script_models);
			
            if(chat_form_field == 'enable'){
				enableChatForm()
			}else{
				enablePhoneForm()
			}

            if (default_script_models == 'enable') {
                //enableBtnScriptModelsDefault()
                var btnTextModels = document.querySelectorAll('.btnCheckDefaultTextModels');
                if(btnTextModels.length > 0){
                    btnTextModels.forEach(btn => {
                        btn.setAttribute('checked', 'checked'); // Corrigido aqui
                    });
                }
            }
            
		}
	)
}



function execProfile() {
    // Defina o tema escuro ao carregar a página
    var arr_profile = getProfile();

    arr_profile.then(
        response => {
            // Extrai as informações do JSON de acordo com o novo padrão
            var theme = response.theme.theme_mode;
            var bg_image_status = response.theme.bg_img_status;
            var background_image = response.images.background_image.path;
            var photo_profile = response.images.profile_image.path;

			//console.log(response.theme)
			var font = {
				'font_family' : response.font.family,
				'font_style' : response.font.style,
				'font_weight' : response.font.weight
			}

			var color_scheme = {
				'primary_color' : response.color_scheme.primary_color,
				'secondary_color' : response.color_scheme.secondary_color,
				'neutral_color' : response.color_scheme.neutral_color,
				'highlight_color' : response.color_scheme.highlight_color,
				'background_color' : response.color_scheme.background_color,
				'text_color' : response.color_scheme.text_color
			}

            // Armazena as informações no localStorage
            localStorage.setItem("theme", theme);
            localStorage.setItem("photo_profile", photo_profile);
            localStorage.setItem("bg_image_status", bg_image_status);
            localStorage.setItem("background_image", background_image);

			if(theme == 'dark'){
				applyDarkTheme()
			}else{
				applyLightTheme()
			}

			//console.log(bg_image_status)
			if (bg_image_status) {
                enableBackgroundImage();
            } else {
                disableBackgroundImage();
            }

			// Aplica as configurações de fonte do usuário
			applyGlobalFont(font['font_family'], font['font_style'], font['font_weight']);
			applyGlobalFontColorScheme(color_scheme )
        }
    );
}



/**
 * Aplica uma fonte globalmente após carregá-la.
 * @param {string} fontFamily - Nome da fonte a ser aplicada.
 * @param {string} [fontStyle="normal"] - Estilo da fonte (ex: "normal", "italic").
 * @param {string} [fontWeight="400"] - Peso da fonte (ex: "400", "700").
 */
function applyGlobalFont(fontFamily, fontStyle = "normal", fontWeight = "400") {


	//console.log("="+fontFamily)

    // Chama a função para carregar a fonte
    loadAndApplyFont(fontFamily).then(() => {
        // Define o estilo global após o carregamento da fonte
        const style = document.createElement('style');
        style.innerHTML = `
            * {
                font-family: '${fontFamily}', sans-serif;
                font-style: ${fontStyle};
                font-weight: ${fontWeight};
            }

            i, em {
                font-style: italic !important;
            }

            b, strong {
                font-weight: bold !important;
            }
        `;
        document.head.appendChild(style);
    }).catch(error => {
        console.error(`Erro ao carregar a fonte "${fontFamily}":`, error);
    });
}


/**
 * Carrega dinamicamente uma fonte do Google Fonts.
 * @param {string} fontFamily - Nome da fonte a ser carregada.
 * @returns {Promise} - Resolve quando a fonte é carregada.
 */
function loadAndApplyFont(fontFamily) {
    return new Promise((resolve, reject) => {
        const formattedFont = fontFamily.replace(/\s+/g, '+'); // Formata o nome da fonte para URL
        const fontLink = `https://fonts.googleapis.com/css2?family=${formattedFont}&display=swap`;

        // Verifica se o link já existe para evitar carregamento duplicado
        if (!document.querySelector(`link[href="${fontLink}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fontLink;

            // Adiciona evento de carregamento
            link.onload = () => resolve();
            link.onerror = () => reject(new Error(`Falha ao carregar a fonte ${fontFamily}`));

            document.head.appendChild(link);
        } else {
            resolve(); // Fonte já está carregada
        }
    });
}

function applyGlobalFontColorScheme(color_scheme) {
    // var color_scheme = {
    //     'primary_color': color_scheme.primary_color,
    //     'secondary_color': color_scheme.secondary_color,
    //     'neutral_color': color_scheme.neutral_color,
    //     'highlight_color': color_scheme.highlight_color,
    //     'background_color': color_scheme.background_color,
    //     'text_color': color_scheme.text_color
    // };

	var color_scheme = {
		'primary_color': '#6200EE',        // Purple 500
		'secondary_color': '#03DAC6',      // Teal 200
		'neutral_color': '#BDBDBD',        // Grey 400
		'highlight_color': '#FF0266',      // Pink A400
		'background_color': '#FFFFFF',     // White
		'text_color': '#000000'            // Black
	}
	

    document.querySelectorAll('.bg-color').forEach(bg => {
        bg.style.setProperty('background-color', color_scheme.highlight_color, 'important'); // Aplica a cor de destaque com !important
    });


    document.querySelectorAll('.text-color').forEach(tc => {
        tc.style.setProperty('color', color_scheme.text_color, 'important'); // Aplica a cor do texto com !important
    });

    //console.log('Esquema de cores aplicado:', color_scheme);
}


function applyGlobalFontColorScheme(color_scheme) {
    var color_scheme = {
        'primary_color': color_scheme.primary_color,
        'secondary_color': color_scheme.secondary_color,
        'neutral_color': color_scheme.neutral_color,
        'highlight_color': color_scheme.highlight_color,
        'background_color': color_scheme.background_color,
        'text_color': color_scheme.text_color
    };

    // Função para converter hexadecimal em RGBA
    function hexToRgba(hex, alpha = 1) {
        let r = 0, g = 0, b = 0;

        if (hex.length == 7) {
            r = parseInt(hex.slice(1, 3), 16);
            g = parseInt(hex.slice(3, 5), 16);
            b = parseInt(hex.slice(5, 7), 16);
        } else if (hex.length == 4) {
            r = parseInt(hex.slice(1, 2).repeat(2), 16);
            g = parseInt(hex.slice(2, 3).repeat(2), 16);
            b = parseInt(hex.slice(3, 4).repeat(2), 16);
        }

        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    document.querySelectorAll('.bg-color').forEach(bg => {
        bg.style.setProperty('background-color', color_scheme.highlight_color, 'important'); // Aplica a cor de destaque com !important
		bg.style.setProperty('color', color_scheme.neutral_color, 'important'); 
	});

    document.querySelectorAll('.text-color').forEach(tc => {
        tc.style.setProperty('color', color_scheme.text_color, 'important'); // Aplica a cor do texto com !important
    });

    var highlightRgba = hexToRgba(color_scheme.highlight_color, 0.5); // Converte highlight_color para RGBA

    var styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = `
    .btn-primary {
        background-color: ${color_scheme.highlight_color} !important;
        border-color: ${color_scheme.highlight_color} !important;
    }
    .btn-primary:hover {
        background-color: ${color_scheme.highlight_color} !important;
        border-color: ${color_scheme.highlight_color} !important;
    }
    .btn-outline-primary {
        color: ${color_scheme.highlight_color} !important;
        border-color: ${color_scheme.highlight_color} !important;

    }

    .btn-select.btn-outline-primary {
        color: ${color_scheme.primary_color} !important;
        border-color: ${color_scheme.highlight_color} !important;

    }

    .btn-select.btn-outline-dark {
        color: ${color_scheme.primary_color} !important;
        border-color: ${color_scheme.highlight_color} !important;
    }

    .btn-outline-primary:hover {
        background-color: ${color_scheme.highlight_color} !important;
        border-color: ${color_scheme.highlight_color} !important;
		color: ${color_scheme.text_color} !important;
    }

	.form-check-input:focus{
		border-color: ${highlightRgba} !important;
		box-shadow: 0 0 0 .15rem ${highlightRgba} !important;
	}

	
	.form-check-input:checked{
		background-color: ${color_scheme.highlight_color} !important;
		border-color: ${color_scheme.highlight_color} !important;
	}

	.bg-color-primary{
		background-color: ${color_scheme.highlight_color} !important;
		color: ${color_scheme.text_color} !important;
	}

	.nav-link{
		color: ${color_scheme.secondary_color} !important;
	}

	.text-logo-color{
		color: ${color_scheme.secondary_color} !important;
	}

    `;
    document.head.appendChild(styleSheet);

    //console.log('Esquema de cores aplicado:', color_scheme);
}

 



function encontrarElementosComCores() {
	const elementos = document.querySelectorAll('*'); // Seleciona todos os elementos
  
	elementos.forEach((elemento) => {
	  const estilo = window.getComputedStyle(elemento);
	  const corFundo = estilo.backgroundColor;
	  const corBorda = estilo.borderColor;
  
	  // Verifica se a cor de fundo e a cor da borda não são transparentes
	  if (corFundo !== 'rgba(0, 0, 0, 0)' && corFundo !== 'transparent') {
		//console.log(`Elemento com cor de fundo: ${elemento.tagName}`);
	  }
	  if (corBorda !== 'rgba(0, 0, 0, 0)' && corBorda !== 'transparent') {
		//console.log(`Elemento com cor de borda: ${elemento.tagName}`);
	  }
	});
  }

  //encontrarElementosComCores()


//getUserProfile
function getProfile(){
	const url = "/userprofile";
	const method = "POST";
	const data = new URLSearchParams();

	return fetchAPI(url, method, data);
}

function getPlatformSettings(){
	const url = "/getplatformsettings";
	const method = "POST";
	const data = new URLSearchParams();

	return fetchAPI(url, method, data);
}


function applyThemeMode() {

	theme_mode = localStorage.getItem('theme')

	if(theme_mode== "dark"){
		localStorage.setItem("theme", "light")
	    saveStatus('theme_status', "light", '/updatethememodestatus')
		applyLightTheme()
		//showModalSpinner( updateUserTheme('theme', 'dark') )
		//showModalSpinner( )
	}else{
		localStorage.setItem("theme", 'dark')
	    saveStatus('theme_status', 'dark', '/updatethememodestatus')
		
		applyDarkTheme()
		//showModalSpinner( updateUserTheme('theme', 'dark') )
		//showModalSpinner( )
	}
}


function applyDarkTheme(){
	var elements = document.querySelectorAll('.wdg_content')
	var elements2 = document.querySelectorAll('.wdg_card')
	var elements3 = document.querySelectorAll('.wdg_add_card')
	var card_btn_theme = document.querySelectorAll('.card_btn_theme') 
	document.body.classList.add('wdg_content_dark')

	elements.forEach(el =>{
		el.classList.add('wdg_content_dark')
		
	})
	elements2.forEach(el =>{
		el.classList.add('wdg_content_dark')
	})

	elements3.forEach(el =>{
		el.classList.add('wdg_add_card_dark')
	})
	card_btn_theme.forEach(el =>{
		el.classList.add('btn_checked')
		var btn_span = el.querySelectorAll('.card_btn_theme_span')[0]
		btn_span.classList.add('btn_checked_span')

	})

	
}

function applyLightTheme(){
	var elements = document.querySelectorAll('.wdg_content')
	var elements2 = document.querySelectorAll('.wdg_card')
	document.body.classList.remove('wdg_content_dark')
	var elements3 = document.querySelectorAll('.wdg_add_card')
	var card_btn_theme = document.querySelectorAll('.card_btn_theme') 

	elements.forEach(el =>{
		el.classList.remove('wdg_content_dark')
	})
	elements2.forEach(el =>{
		el.classList.remove('wdg_content_dark')
	})
	elements3.forEach(el =>{
		el.classList.remove('wdg_add_card_dark')
	})
	card_btn_theme.forEach(el =>{
		el.classList.remove('btn_checked')
		var btn_span = el.querySelectorAll('.card_btn_theme_span')[0]
		btn_span.classList.remove('btn_checked_span')

	})

}

function updateProfileBackgroundImage(image, local){
	const url = "/updateimageweb";
	const method = "POST";
	const data = new URLSearchParams();

	if ( !typeof image !== 'undefined' && image != null && local != null && !typeof local !== 'undefined'){
		data.append('image', image);
		data.append('local', 'web');
		data.append('action', local);

		fetchAPI(url, method, data).then(value => {
			//console.log(value)
			if(value){
				window.location.reload();
			}
		});
	}
}



function updateUserTheme(att, attValue){
	const url = "/updateusertheme";
	const method = "POST";
	const data = new URLSearchParams();

 
    
    if ( !typeof att !== 'undefined' && att != null ){
        data.append(att, attValue);

        fetchAPI(url, method, data).then(value => {
		 
            if(value){
                //console.log(newUsername)
            }
        });
    }
}



function saveChatStatus($status){
	const chat_status = localStorage.getItem("chat_status")
	//localStorage.setItem("bg_image_status", $status)
	updatePlatformSettings("chat_status", $status)
}

function enableChatForm(){
    localStorage.setItem('chat_form_field', 'enable')
	let arr = document.querySelectorAll(".enable-chat")
	let btn_for_enable_phone_form = document.querySelectorAll('.btn_for_enable_phone_form')
	let btn_for_enable_chat_form = document.querySelectorAll('.btn_for_enable_chat_form')

	chat =  true

	btn_for_enable_phone_form.forEach(btn =>{
		btn.classList.remove('btn-primary')
		btn.classList.add('btn-outline-primary')
	})

	btn_for_enable_chat_form.forEach(btn =>{
		btn.classList.add('btn-primary')
		btn.classList.remove('btn-outline-primary')
	})

	arr.forEach( el=> {
		el.classList.remove('hide_element')
	})
}

function enablePhoneForm(){
    localStorage.setItem('chat_form_field', 'disable')
	let arr = document.querySelectorAll(".enable-chat")
	let btn_for_enable_phone_form = document.querySelectorAll('.btn_for_enable_phone_form')
	let btn_for_enable_chat_form = document.querySelectorAll('.btn_for_enable_chat_form')

	chat =  false

	btn_for_enable_phone_form.forEach(btn =>{
		btn.classList.add('btn-primary')
		btn.classList.remove('btn-outline-primary')
	})

	btn_for_enable_chat_form.forEach(btn =>{
		btn.classList.remove('btn-primary')
		btn.classList.add('btn-outline-primary')
	})
	
	arr.forEach( el=> {
		el.classList.add('hide_element')
	})

}


function setActiveTextNocDefault(){
	localStorage.setItem('rompimento_form_field', 'enable');
	localStorage.setItem('noc_form_field', 'disable');
	localStorage.setItem('financeiro_form_field', 'disable');
}
	

function enableNocForm() {
 
    
    localStorage.setItem('rompimento_form_field', 'disable');
	localStorage.setItem('noc_form_field', 'enable');
    localStorage.setItem('financeiro_form_field', 'disable');
    
    let arr = document.querySelectorAll(".enable-noc, .enable-rompimento, .enable-financeiro");
	let btn_for_enable_noc_form = document.querySelectorAll('.btn_for_enable_noc_form')
    let btn_for_enable_rompimento_form = document.querySelectorAll('.btn_for_enable_rompimento_form');
    let btn_for_enable_financeiro_form = document.querySelectorAll('.btn_for_enable_financeiro_form');

    btn_for_enable_rompimento_form.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });

	btn_for_enable_financeiro_form.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });

	btn_for_enable_noc_form.forEach(btn =>{
		btn.classList.add('btn-primary')
		btn.classList.remove('btn-outline-primary')
	})

    arr.forEach(el => {
        if (el.classList.contains('enable-rompimento') && !el.classList.contains('enable-noc')) {
            el.classList.add('hide_element');
        }
		if (el.classList.contains('enable-financeiro') && !el.classList.contains('enable-noc')) {
            el.classList.add('hide_element');
        }
		if (el.classList.contains('enable-noc') && el.classList.contains('hide_element')) {
            el.classList.remove('hide_element');
        }
    });
}


function enableRompimentoCabosForm() {
	 
	localStorage.setItem('rompimento_form_field', 'enable')
    localStorage.setItem('noc_form_field', 'disable')
	localStorage.setItem('financeiro_form_field', 'disable')
	
	let arr = document.querySelectorAll(".enable-noc, .enable-rompimento, .enable-financeiro");
	let btn_for_enable_noc_form = document.querySelectorAll('.btn_for_enable_noc_form')
    let btn_for_enable_rompimento_form = document.querySelectorAll('.btn_for_enable_rompimento_form');
    let btn_for_enable_financeiro_form = document.querySelectorAll('.btn_for_enable_financeiro_form');

    btn_for_enable_noc_form.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });

	btn_for_enable_financeiro_form.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });

	btn_for_enable_rompimento_form.forEach(btn =>{
		btn.classList.add('btn-primary')
		btn.classList.remove('btn-outline-primary')
	})

    arr.forEach(el => {
		if (el.classList.contains('enable-rompimento') && el.classList.contains('hide_element')) {
            el.classList.remove('hide_element');
        }
        if (el.classList.contains('enable-noc') && !el.classList.contains('enable-rompimento')) {
            el.classList.add('hide_element');
        }
		if (el.classList.contains('enable-financeiro') && !el.classList.contains('enable-rompimento')) {
            el.classList.add('hide_element');
        }
    });

}

function enableFinanceiroForm() {
	 
	localStorage.setItem('financeiro_form_field', 'enable')
    localStorage.setItem('noc_form_field', 'disable')
	localStorage.setItem('rompimento_form_field', 'disable')
	
	let arr = document.querySelectorAll(".enable-noc, .enable-rompimento, .enable-financeiro");
	let btn_for_enable_noc_form = document.querySelectorAll('.btn_for_enable_noc_form')
    let btn_for_enable_rompimento_form = document.querySelectorAll('.btn_for_enable_rompimento_form');
    let btn_for_enable_financeiro_form = document.querySelectorAll('.btn_for_enable_financeiro_form');

    btn_for_enable_noc_form.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });

	btn_for_enable_rompimento_form.forEach(btn => {
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline-primary');
    });

	btn_for_enable_financeiro_form.forEach(btn =>{
		btn.classList.add('btn-primary')
		btn.classList.remove('btn-outline-primary')
	})

    arr.forEach(el => {
        if (el.classList.contains('enable-noc') && !el.classList.contains('enable-financeiro')) {
            el.classList.add('hide_element');
        }
		if (el.classList.contains('enable-rompimento') && !el.classList.contains('enable-financeiro')) {
            el.classList.add('hide_element');
        }
		if (el.classList.contains('enable-financeiro') && el.classList.contains('hide_element')) {
            el.classList.remove('hide_element');
        }
    });

}


function updatePlatformSettings(columnUpdate = null, valueUpdate = null){
     

    const url = "/updateplatformsettings";
    const method = "POST";
    const data = new URLSearchParams();

    if (typeof columnUpdate !== 'undefined' && columnUpdate !== null) {
        if(typeof valueUpdate !== 'undefined' && valueUpdate !== null){
			data.append(columnUpdate, valueUpdate);

			fetchAPI(url, method, data).then(value => {
				//console.log("Resposta do fetchAPI:", value);
				if (value) {
					console.log("assdf___" + value)
					}
				}).catch(error => {
					console.error("Erro no fetchAPI:", error);
				});
		}
    } else {
        console.log("Parâmetro 'att' é inválido:", att);
    }
}


function setProfileBackgroundImage(parent, action){
	//https://steamuserimages-a.akamaihd.net/ugc/879756127785883770/E3861F889223B9124AEEE1832968209CA8D3BC0C/?imw=512&&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=false
	
	let image = parent.querySelector('#image_bg').value
	image = image.replace(/\s+/g, '');
	console.log(image)
	if(image != null && image != undefined && action != null && action != undefined ){
		updateProfileBackgroundImage(image, action)
		execProfile()
		//showModalSpinner()
	}
}


function applyBackgroundImage(){
	const bg_image_status = localStorage.getItem("bg_image_status")
	console.log(bg_image_status)
	if(bg_image_status == false || bg_image_status == 'false'){
		localStorage.setItem("bg_image_status", true)
		 enableBackgroundImage()
		//updateUserTheme('bg_image_status', 'disable')
		saveStatus('bg_image_status', 'enable', '/updatebgstatus')
		showModalSpinner()
	}else{
		localStorage.setItem("bg_image_status", false)
		disableBackgroundImage()
		saveStatus('bg_image_status', 'disable', '/updatebgstatus')
		//updateUserTheme('bg_image_status', 'enable')
		showModalSpinner()
	}
}


function enableBackgroundImage() {
    document.documentElement.style.backgroundImage = `url(${localStorage.getItem("background_image")})`;
    document.documentElement.style.backgroundRepeat = 'no-repeat';
    document.documentElement.style.backgroundSize = 'cover';
    document.documentElement.style.backgroundPosition = 'center';
}


function disableBackgroundImage() {
    document.documentElement.style.backgroundImage = "none";
}



// Adicione o ouvinte de evento para atualizar o tema em outras guias/janelas
window.addEventListener("storage", function(event) {


});


function menu() {
	document.querySelector(".Menu").classList.toggle("menu-show");
}


function enableFieldEditing(parent) {
    const field = parent.querySelector('.editField');
	console.log(parent)
    if (field) {
        // Verifica se o campo possui o atributo readonly e o remove se existir
        if (field.hasAttribute('readonly')) {
            removeReadOnlyAttribute(field);
			showNotification('Habilitado campo de edição.', 'bg-warning')
        } else {
            addReadOnlyAttribute(field);
			showNotification('Desabilitado campo de edição.', 'bg-success')
        }
    }
}


function enableFieldEditingSelect(parent) {
    const field = parent.querySelector('.editField');
    console.log(parent);
    if (field) {
        // Verifica se o campo possui o atributo disabled e o remove se existir
        if (field.hasAttribute('disabled')) {
            field.removeAttribute('disabled');
            showNotification('Habilitado campo de edição.', 'bg-warning');
        } else {
            field.setAttribute('disabled', 'disabled');
            showNotification('Desabilitado campo de edição.', 'bg-success');
        }
    }
}



function addReadOnlyAttribute(field) {
    // Adiciona o atributo readonly
    field.setAttribute('readonly', true);
}

function removeReadOnlyAttribute(field) {
    // Remove o atributo readonly
    field.removeAttribute('readonly');
}



function showPassProfile(parent) {
    const passwordFields = parent.querySelectorAll('.profile_pass');
    
    passwordFields.forEach(field => {
        field.classList.toggle('showPass');
        
        if (field.classList.contains('showPass')) {
            showPassword(field);
        } else {
            hidePassword(field);
        }
    });
}


function showPassword(field) {
    field.type = 'text';
}

function hidePassword(field) {
    field.type = 'password';
}

// CRIAR FUNÇÃO PARA OBTER DATA ATUAL
today = new Date();


function formatDate(date, format) {
    const map = {
        mm: ( date.getMonth() + 1 ) < 10 ? '0' + ( date.getMonth() + 1) : date.getMonth() + 1 ,
        dd: ( date.getDate() ) < 10 ? '0' + date.getDate() : date.getDate() ,
        aa: date.getFullYear().toString().slice(-2),
        aaaa: date.getFullYear()
    }

    return format.replace(/mm|dd|aa|aaaa/gi, matched => map[matched])
}

today_day_month_year = formatDate(today, 'dd/mm/aaaa')
today = formatDate(today, 'dd/mm')


// console.log( today );

// cria um array de cores em hexadecimal
// var colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];

// // cria uma função que escolhe uma cor aleatória do array
// function randomColors(){
//   var indice = Math.floor(Math.random() * colors.length); // gera um número inteiro entre 0 e o tamanho do array
//   return colors[indice]; // retorna a cor correspondente ao índice
// }

// // altera o valor da variável CSS com a cor aleatória
// document.documentElement.style.setProperty('--cor-aleatoria', randomColors() );

function formatName(name) {
	const words = name.split(' ');
  
	// Formata a primeira letra de cada palavra e converte as demais em minúsculas
	const formattedWords = words.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase());
  
	return formattedWords.join(' ');
  }
  

function capitalizeFirstLetter(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}


function isInteger(text) {
	return /^\d+$/.test(text);
  }


function isValidEmail(email) {
	var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
	var phoneNumberRegex = /^\d{10}$/;
	return phoneNumberRegex.test(phoneNumber);
  }
  

//model
//função para criar modal
function showModal(el = '') {
    const modal = document.createElement('div')
	modal.classList.add("modal");
	modal.appendChild(el)
    modal.style.display = "block";
	document.body.appendChild(modal)
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";

  
    alarmAudio.pause();
    alarmAudio.currentTime = 0; // Reinicia o áudio
  

    deleteModalEdit()
}






  function validateCPForCNPJ(document) {
	// Remove any non-digit characters
	document = document.replace(/\D/g, '');
  
	// Check if it's CPF or CNPJ
	if (document.length === 11) {
	  // CPF validation
	  var sum = 0;
	  var remainder;
  
	  for (var i = 1; i <= 9; i++) {
		sum += parseInt(document.substring(i - 1, i)) * (11 - i);
	  }
  
	  remainder = (sum * 10) % 11;
  
	  if (remainder === 10 || remainder === 11) {
		remainder = 0;
	  }
  
	  if (remainder !== parseInt(document.substring(9, 10))) {
		return false;
	  }
  
	  sum = 0;
  
	  for (var j = 1; j <= 10; j++) {
		sum += parseInt(document.substring(j - 1, j)) * (12 - j);
	  }
  
	  remainder = (sum * 10) % 11;
  
	  if (remainder === 10 || remainder === 11) {
		remainder = 0;
	  }
  
	  if (remainder !== parseInt(document.substring(10, 11))) {
		return false;
	  }
  
	  return true;
	}else if (document.length === 14) {
		let cnpj = document;

		// Verifica se todos os dígitos são iguais (caso inválido)
		if (/^(\d)\1+$/.test(cnpj)) {
			return false;
		  }
		
		  // Calcula o primeiro dígito verificador
		  var sum = 0;
		  for (var i = 0; i < 12; i++) {
			sum += parseInt(cnpj.charAt(i)) * (i < 4 ? 5 - i : 13 - i);
		  }
		  var mod = sum % 11;
		  var digit1 = mod < 2 ? 0 : 11 - mod;
		
		  if (parseInt(cnpj.charAt(12)) !== digit1) {
			return false; // Primeiro dígito verificador inválido
		  }
		
		  // Calcula o segundo dígito verificador
		  sum = 0;
		  for (i = 0; i < 13; i++) {
			sum += parseInt(cnpj.charAt(i)) * (i < 5 ? 6 - i : 14 - i);
		  }
		  mod = sum % 11;
		  var digit2 = mod < 2 ? 0 : 11 - mod;
		
		  if (parseInt(cnpj.charAt(13)) !== digit2) {
			return false; // Segundo dígito verificador inválido
		  }
		
		  return true; // CNPJ válido

		

	} 
  }




  function removeDots(el,  notification = false) {
	let input = el.parentElement.querySelector('input')
	let cpf_validateIcon = el.parentElement.querySelector('.cpf_validate')

	console.log('chamou remove dots')

	input.value = ''
	navigator.clipboard.readText()
		.then(function (data) {
			let cpfOrCnpj = data
			// input.value = cpfOrCnpj.replace(/\./g, '').replace(/\//g, '').replace(/\.|-/g, '');
			// input.value = cpfOrCnpj.replace(/\s/g, "").replace(/\./g, "").replace(/\//g, "").replace(/-|\.|-/g, "");
			input.value = cpfOrCnpj.replace(/[^\d]/g, "");

			setTransferAreaValue(input.value, el)
			checkIconValidade(input.value, cpf_validateIcon, notification)
		})	
  }

  function checkIconValidade(in_value, cpf_validateIcon, notification){

	console.log(notification)

	let value = in_value.replace(/[^\d]/g, "");
		// Verifica se o valor não é apenas espaços e se contém algum número

		
		if (value.trim() !== '' && /\d/.test(value)) {

			console.log("sa" + value)

			if (validateCPForCNPJ(value)) {
				console.log('é válido');
				cpf_validateIcon.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
				</svg> `

				cpf_validateIcon.classList.add('bg-success')
				cpf_validateIcon.classList.remove('bg-danger')

				if(notification == true){
					showNotification("CPF está correto", "bg-primary")
				}
			} else {
				console.log('é inválido');
				cpf_validateIcon.classList.add('bg-danger')
				cpf_validateIcon.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16">
				<path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
				</svg>
				`
				if(notification == true){
					showNotification("CPF está incorreto", "bg-danger")
				}
			}
		} else {
			console.log('Campo vazio ou contém caracteres inválidos');
			cpf_validateIcon.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question" viewBox="0 0 16 16">
								<path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
							</svg>
			`
			cpf_validateIcon.classList.remove('bg-danger')
			cpf_validateIcon.classList.remove('bg-success')
		}

  }



/*
  function showNotification(notification, type="success") {
	var span = document.createElement('span')
	span.classList.add('notifications')
	span.innerHTML = `<div class='d-flex justify-content-center align-itens-center' style='height: 100%;'>${notification}</div>`

	span.innerHTML = `
	
	`
	document.body.appendChild(span)
	span.classList.add(type)

	setTimeout(function () {
		span.classList.add('show')
	}, 100);

	setTimeout(function () {
		removeElement(span)
		console.log('executou')
	}, 1000);
}*/


function showNotification(notification, type = "success") {
    var toastContainer = document.querySelector('.toast-container');
	var theme = localStorage.getItem('theme') == 'dark' ? 'wdg_content_dark_complete' :  'wdg_content_light_complete'; 

    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.classList.add('toast-container', 'position-fixed', 'top-0', 'end-0', 'p-3');
        document.body.appendChild(toastContainer);
    }

    var toast = document.createElement('div');
    toast.classList.add('toast', 'text-bg-' + type, 'border-0', `${theme}`);
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    toast.setAttribute('aria-atomic', 'true');

    toast.innerHTML = `
        <div class="toast-header ${type} ">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-robot text-white" viewBox="0 0 16 16">
				<path d="M6 12.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5M3 8.062C3 6.76 4.235 5.765 5.53 5.886a26.6 26.6 0 0 0 4.94 0C11.765 5.765 13 6.76 13 8.062v1.157a.93.93 0 0 1-.765.935c-.845.147-2.34.346-4.235.346s-3.39-.2-4.235-.346A.93.93 0 0 1 3 9.219zm4.542-.827a.25.25 0 0 0-.217.068l-.92.9a25 25 0 0 1-1.871-.183.25.25 0 0 0-.068.495c.55.076 1.232.149 2.02.193a.25.25 0 0 0 .189-.071l.754-.736.847 1.71a.25.25 0 0 0 .404.062l.932-.97a25 25 0 0 0 1.922-.188.25.25 0 0 0-.068-.495c-.538.074-1.207.145-1.98.189a.25.25 0 0 0-.166.076l-.754.785-.842-1.7a.25.25 0 0 0-.182-.135"/>
				<path d="M8.5 1.866a1 1 0 1 0-1 0V3h-2A4.5 4.5 0 0 0 1 7.5V8a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1v1a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-1a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1v-.5A4.5 4.5 0 0 0 10.5 3h-2zM14 7.5V13a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V7.5A3.5 3.5 0 0 1 5.5 4h5A3.5 3.5 0 0 1 14 7.5"/>
			</svg>
            <strong class="me-auto text-white mx-1">Bootstrap</strong>
            <small class="text-white">Agora</small>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            ${notification}
        </div>
    `;

    toastContainer.appendChild(toast);

    var bootstrapToast = new bootstrap.Toast(toast);
    bootstrapToast.show();

}



function showModalSpinner( funcao ) {
    // Cria o modal com o spinner
    var modal = document.createElement('div');
	var theme = localStorage.getItem('theme') == 'dark' ? 'wdg_content_dark_complete' :  'wdg_content_light_complete'; 
    modal.innerHTML = `
        <div class="modal fade " id="spinnerModal" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered ">
                <div class="modal-content ${theme}" >
                    <div class="modal-body text-center">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                        <p class="mt-3">Aguarde, processando...</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    // Mostra o modal
    var spinnerModal = new bootstrap.Modal(document.getElementById('spinnerModal'), {
        backdrop: 'static',
        keyboard: false
    });
    spinnerModal.show();

	setTimeout(() => {
		spinnerModal.hide();
		document.body.removeChild(modal);
	}, 2000);
	
}

// Exemplo de função assíncrona para teste
function funcao2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(true); // ou reject(new Error('Erro no processo'));
        }, 2000);
    });
}


function removeElement(el) {
	el.remove()
}

function removeElementChild(child) {
	const elParent = child.parentNode;
	elParent.removeChild(child);
}



function setInputValue(child){
	let input = child.parentElement.querySelector('input')
	navigator.clipboard.readText()
		.then(function (data) {
			input.value = data
			return true;
		})
}

function setContenteditableValue(child){
	let conteiner = findClass(child, '.showContent')
	let wdg_text_area = conteiner.querySelector('.wdg_text_area')
	navigator.clipboard.readText()
		.then(function (data) {
			if(wdg_text_area){
				wdg_text_area.innerHTML = wdg_text_area.innerHTML + data

			}
		})

}




function eraseContentEditable(child){
	let conteiner = findClass(child, '.showContent')
	let wdg_text_area = conteiner.querySelector('.wdg_text_area')
	let txt_area = conteiner.querySelector('.txt_area')
	if(wdg_text_area){
		wdg_text_area.innerHTML = ''
	}
	if(txt_area){
		txt_area.value = ''
		showNotification("Apagado!")
	}
}

//copia o assunto para área de transferência

function setTransferAreaValue(value, el_parent) {
	let textArea = document.createElement("textarea");
	textArea.classList.add("info-Temp");
	textArea.innerHTML = value

	el_parent.appendChild(textArea);

	textArea.select();
	document.execCommand("copy");

	let infoTemp = el_parent.querySelector(".info-Temp");

	if (document.body.contains(infoTemp)) {
		el_parent.removeChild(infoTemp)
	}
}


function useToggle(el, elClassList) {
	el.classList.toggle(elClassList)
}

function HideElement(parent, elClassList = '.showContent') {
	var el = parent.querySelector(elClassList)
	// console.log(el)
	if (el) {
		el.classList.toggle("hide_element")
	}

}



function rezisize(el){
	// console.log(el)
	// let widg_content = findClass(el, '.wdg_window_50')
	// console.log(widg_content)
	useToggle(el.parentElement, 'wdg_window_100')
}




function checkBtn(btn, btn_action) {
    // Busque no localStorage as configurações
    const theme = localStorage.getItem('theme');
    const bgImageStatus = localStorage.getItem('bg_image_status');

	
	console.log(btn_action)

    // Verifique se o btn_action corresponde ao tema ou ao status da imagem de fundo
    if (btn_action == 'theme_mode') {
        // Verifica se o tema ativo é igual a "dark" e se for, adiciona o atributo checked no input se ele ainda não tiver
        // Se tiver e o tema for "light", remove o checked se tiver
        if (theme == 'dark') {
			console.log('chamou')
            btn.setAttribute('checked', 'checked');
			
        } else if (theme === 'light') {
            btn.removeAttribute('checked');
        }
    } else if (btn_action == 'background') {
        // Verifica se o bg_image_status ativo é igual a "true" e se for, adiciona o atributo checked no input se ele ainda não tiver
        // Se tiver e o bg_image_status for "false", remove o checked se tiver
        if (bgImageStatus == 'true') {
            btn.setAttribute('checked', 'checked');
        } else if (bgImageStatus == 'false') {
            btn.removeAttribute('checked');
        }
    }

    // Adicione um evento de clique para alternar o atributo checked
    btn.addEventListener('click', function() {
        // Atualize o estado do botão usando setAttribute e removeAttribute
        if (btn.hasAttribute('checked')) {
            btn.removeAttribute('checked');
        } else {
            btn.setAttribute('checked', 'checked');
        }
        
        // Atualize o localStorage conforme a ação do botão
        if (btn_action === 'theme') {
            localStorage.setItem('theme', btn.hasAttribute('checked') ? 'dark' : 'light');
        } else if (btn_action === 'bg_image_status') {
            localStorage.setItem('bg_image_status', btn.hasAttribute('checked') ? 'true' : 'false');
        }
    });
}

 
 







//obtém o valor contido no input ou text area
function getInputValue(parent) {
	var input = parent.querySelector("input").value;
	//var input = parent.children[1].value;
	setTransferAreaValue(input, parent)
}

function getInputValueByClass(parent, elClass) {
	var container = parent
	var inputCPF = parent.querySelector('.input_for_validade_cpf')
	var cpf_validateIcon = parent.querySelector('.cpf_validate')
	
	console.log(inputCPF.value)
	//var input = container.querySelector("."+elClass).value
	setTransferAreaValue(inputCPF.value, parent)
}

function getInputValueByClassCpfCnpjMasked(parent, elClass) {
    var container = parent
	var inputCPF = parent.querySelector('.input_for_validade_cpf')
	var cpf_validateIcon = parent.querySelector('.cpf_validate')
    
    console.log(inputCPF.value)
    
    // Aplica a máscara ao valor do CPF/CNPJ
    var maskedValue = maskCpfCnpj(inputCPF.value);
    
    // Copia o valor mascarado para a área de transferência
    setTransferAreaValue(maskedValue, parent)
}

// Função que aplica a máscara ao CPF ou CNPJ
function maskCpfCnpj(value) {
    if (value.length === 11) {
        // Mascara CPF (XXX.XXX.XXX-XX)
        return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
    } else if (value.length === 14) {
        // Mascara CNPJ (XX.XXX.XXX/XXXX-XX)
        return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
    return value;
}




//obtém o valor contido no input ou text area
function getInputValueHTML(child) {
	let conteiner = findClass(child, '.showContent')
	var input = conteiner.querySelector('.wdg_text_area').innerText
	setTransferAreaValue(input, conteiner)
	
}

function updateInputValue(child, el_class, value){
	// let conteiner = findClass(child, el_class)
	
	let conteiner = child.parentNode.parentNode.parentNode
	// console.log(conteiner)
	conteiner.querySelector('input').value = value
}


function dispatchEventForInput(element, nameEvent, classEl) {
    let container = element.parentElement.parentElement.parentElement;
    let target = container.querySelector('input');
    if(nameEvent == 'filledInput') {
        let inputEvent = createNewEvent(target, 'input');
        findAndReplaceVariableForInputValue(inputEvent, classEl);
    }
}

function createNewEvent(target, nameEvent) {
    // Create and dispatch an input event
    var inputEvent = new Event(nameEvent);
    target.dispatchEvent(inputEvent); // Dispatch the event on the target
    return inputEvent;
}



function getText(child){
	console.log(child)
	// let conteiner = findClass(child, '.wdg_card')
	let text = child.value
	setTransferAreaValue(text, child.parentElement)
	
}


//copia o assunto para área de transferência

function setTransferAreaValue(value, el_parent) {
	let textArea = document.createElement("textarea");
	textArea.classList.add("info-Temp");
	textArea.innerHTML = value

	el_parent.appendChild(textArea);

	textArea.select();
	document.execCommand("copy");

	showNotification("Adicionado a area de transferência!", "bg-success")

	let infoTemp = el_parent.querySelector(".info-Temp");

	if (document.body.contains(infoTemp)) {
		el_parent.removeChild(infoTemp)
	}

	
}


function updateTextArea(parent) {
	parent.querySelector(".txt_area").value = parent.querySelector(".wdg_text_area").innerHTML

}


function updateAnwerModel(parent, type) {
	var model = "";
	var address = JSON.parse(`{
		"cep":"",
		"rua": "",
		"numero":"",
		"bairro":"",
		"cidade":"",
		"tipo_moradia":"",
		"ponto_referencia":"",
		"responsavel":"",
		"telefone":"",
		"melhor_horario":""
	}` );

	address.cep = parent.querySelector(".cep").value
	address.rua = parent.querySelector("._Address").value
	address.numero = parent.querySelector("._AdressNumber").value == "" || parent.querySelector("._AdressNumber").value == null ? "S/N" : parent.querySelector("._AdressNumber").value
	address.bairro = parent.querySelector("._District").value
	address.cidade = parent.querySelector("._City").value
	address.tipo_moradia = parent.querySelector("._HouseType").value
	address.ponto_referencia = parent.querySelector("._Reference").value
	address.responsavel = parent.querySelector("._Holder").value
	address.telefone = parent.querySelector("._PhoneNumber").value
	address.melhor_horario = parent.querySelector("._BestTime").value

	console.log("=" + address.cep)
	console.log(address)

	if (type == "sale") {
		var text_editor = parent.querySelector(".wdg_text_area")
		var references = `\n<br>Retornar para <font color="#ff0000">${address.responsavel}</font> no telefone <font color="#ff0000">${address.telefone}</font> às <font color="#ff0000">${address.melhor_horario}</font>. \nTipo de moradia: <font color="#ff0000">${address.tipo_moradia}</font>.\nPonto de Referência: <font color="#ff0000">${address.ponto_referencia}</font>.`
		var model = `Cliente entrou em contato solicitando informações sobre disponibilidade no endereço: <font color="#ff0000">${address.rua}</font>, nº<font color="#ff0000">${address.numero}</font>, <font color="#ff0000">${address.bairro}</font>, <font color="#ff0000">${address.cidade}</font>, <font color="#ff0000">${address.cep}</font>. Repassado ao setor de vendas retornar contato para informar planos, taxas, e prazo de instalação. Cliente ciente das informações.`
		text_editor.innerHTML = model + references
	} else {
		var text_editor = parent.querySelector(".wdg_text_area")
		text_editor.innerHTML = `Transferência de endereço`
	}

	console.log(model)

}//  end function sale


// busca as informações de endereço
function getAddress(el_parent) {
	var inputCEP = el_parent.querySelector(".cep").value
	var cep = inputCEP.replace(/\D/g, '');
	const url = 'https://viacep.com.br/ws/' + cep + '/json';
	var address;
	const options = {
		method: "GET",
		mode: "cors",
		headers: {
			'content-type': 'application/json;charset=utf-8',
		}
	}

	fetch(url, options).then(
		response => response.json()
	).then(
		data => {
			el_parent.querySelector("._Address").value = data.logradouro;
			el_parent.querySelector("._District").value = data.bairro;
			el_parent.querySelector("._City").value = data.localidade;
			runEvent(el_parent)
		}
	)
}

// Altera o valor do input por meio de uma função
function runEvent(parent) {
	var input = parent.querySelector("._City");
	// Dispara o evento onchange manualmente
	var evento = new Event("change");
	input.dispatchEvent(evento);
}



function setSaleCity(el_parent) {
	const elCityTV = el_parent.querySelector(".btnTV")
	const elCity = el_parent.querySelector(".btnNet")
	if (el_parent.contains(elCityTV)) {
		el_parent.querySelector(".btnTV").innerHTML = "Informações TV Faster – " + el_parent.querySelector("._City").value
		console.log(el_parent.querySelector("._City").value)
	}
	if (el_parent.contains(elCity)) {
		el_parent.querySelector(".btnNet").innerHTML = "Vendas – " + el_parent.querySelector("._City").value
		console.log(el_parent.querySelector("._City").value)
	}
}


//Função comum aos dois editores de texto
function img_onclick(el) {
	var cor = el.parentElement.querySelector("#cor");
	cor.click();
}



/////Função para fazer requisição ao banco do NCCtools
// Função que utiliza a fetch API para fazer requisição via GET e POST
function fetchAPI(url, method, data) {
	// Criar um objeto de opções com o método, cabeçalhos e corpo da requisição
	let options = {
		method: method,
		mode: "cors",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded"
		}
	};
	// Se o método for POST, adicionar o data como o corpo da requisição em formato JSON
	if (method === "POST") {
		options.body =  data;
	}
	// Usar a fetch API para fazer a requisição e retornar uma promessa
	return fetch(url, options)
		.then(response => {
			// Verificar se a resposta foi bem sucedida
			if (response.ok) {
				// Retornar o resultado da resposta em formato JSON
				return response.json();
			} else {
				// Lançar um erro com o status da resposta
				throw new Error(response.status);
			}
		})
		.catch(error => {
			// Tratar o erro
			// console.error(error);
		});
}


function getTextTemplates(newUrl = "/read_users_models") {
	const url = newUrl;
	const method = "GET";
	const data = '';
   	return  fetchAPI(url, method, data).then(data=>{
		txtModels = data
	})
}
 

 if(extemplates){
	getTextTemplates("/read_users_models?extern=true")
 }else{
	getTextTemplates("/read_users_models?extern=false")
 }
 

//cadastra categoria para adicionar no modelo de script
function set_text_template_category(child) {
    let conteiner = findClass(child, '.showContent');
    let category = conteiner.querySelector('.template_category');
    let categoryValue = category.value.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "").toLowerCase().trim(); //.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "").toLowerCase().trim()
    let selectElement = conteiner.querySelector(".selectTxtTemplate");
	let scope = selectElement ? selectElement.value.toLowerCase() : 'local';

    if (conteiner && category && scope && categoryValue !== ""  ) {
        let categories = JSON.parse(localStorage.getItem('template_text_categories'));
        for (let cat of categories) {
            if ( areWordsEqual(cat.name, categoryValue) ) {
                showNotification("Categoria já cadastrada", "bg-danger");
                return; // Parar a execução se a categoria já existir
            }
        }

        const url = "/create?tb=template_text_categories";
        const method = "POST";
        const data = new URLSearchParams();
        data.append("name", categoryValue);
        data.append("scope", scope);
        data.append("id_team", "1");

        fetchAPI(url, method, data).then(value => {
            //console.log(value)
            showModalSpinner();
			get_text_template_category()
			populateShortCutsCategoriesOnSettings()
			
			
            getScriptsByDefault();
			//addTexplateModelsWithShortCutsOnContainer()
            addTemplateModelsWithShortCutsOnContainer()
            show_text_categories(child);
        });
    }else{
		showNotification("ALGUM CAMPO OBRIGATÓRIO ESTÁ VAZIO!", "bg-danger")
	}
}


function areWordsEqual(word1, word2) {
    // Normalize the words to remove accents
    const normalized1 = word1.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const normalized2 = word2.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    
    // Compare the normalized words
    return normalized1 === normalized2;
}

function getScriptsByDefault(){
	setTimeout(function() {
		// console.log("chamou time getScriptsByDefault")
		get_text_template_category()
		getTextmodels()
		getShortcuts()
        populateShortCutsCategoriesOnSettings()
		addTemplateModelsWithShortCutsOnContainer()
    }, 500); 
}


function addTemplateModelsWithShortCutsOnContainer(){
	//let conteiner = findClass(child, '.set_text_template') // check
	//let conteiner2 = findClass(child, '.show_text_template') // substituir a findclass por outra classe

	let categories = JSON.parse(localStorage.getItem('template_text_categories'));
	let text_models = JSON.parse(localStorage.getItem('template_text_models'));

	//console.log(localStorage.getItem('template_text_categories'))

	let script_models = document.querySelectorAll(".script_models")
	//let sel_category = document.querySelector(".selectGroupCategory")

	//console.log(conteiner)

	if( script_models.length > 0 ){
		script_models.forEach(cnt=>{	
			var textarea = cnt.querySelector(".conteiner_text_models") 
			if(textarea){
                textarea.innerHTML = ""
            } 
			
			populateTextTemplatesCategories(categories)
			populateTextTemplates(textarea, text_models)
		})

		//populateTextTemplatesCategories(conteiner, categories)
	}	
}

function addTemplateModelsWithShortCutsOnContainerByOpt(child, search = null){
	console.log(child)
	let conteiner = findClass(child, '.set_text_template')
	let conteiner2 = findClass(child, '.show_text_template')

	let categories = JSON.parse(localStorage.getItem('template_text_categories'));
	let text_models = JSON.parse(localStorage.getItem('template_text_models'));

	let script_models = findClassPerName(child, 'wdg_card_form', 'wdg_card') 

	if( script_models ){
		if(search ==  null){
			var textarea = script_models.querySelector(".conteiner_text_models")
			textarea.innerHTML = ""
			populateTextTemplatesById(textarea, text_models, child.value)
		}else{
			var textarea = script_models.querySelector(".conteiner_text_models")
			textarea.innerHTML = ""
			populateTextTemplatesById(textarea, text_models, child.value, search)
		}
	}
		
}

//obtém categoria para adicionar no modelo de script
function get_text_template_category(child = null){
	// let conteiner = findClass(child, '.set_text_template')
	// let conteiner2 = findClass(child, '.show_text_template')
	const url = "/read?tb=template_text_categories"
	const method = "GET"
	const data = ''

	fetchAPI(url, method, data).then(value => {
		localStorage.setItem('template_text_categories', JSON.stringify(value))
		//populateTextTemplatesCategories(conteiner, value)
		//populateTextTemplatesCategories(conteiner2, value)
	})	
}


//cadastra categoria para adicionar no modelo de script
function del_text_template_category(newUrl){
	const url = newUrl
	const method = "POST";
	const data = new URLSearchParams();
	fetchAPI(url, method, data).then(value => {
		showModalSpinner()
		getScriptsByDefault()
		getTextmodels()
	})	
}


function show_text_categories(child){
	getScriptsByDefault()
	getTextmodels()
	let conteiner = findClass(child, '.wdg_card')
	let conteiner_categories = conteiner.querySelector('.conteiner_categories')
	conteiner_categories.innerHTML = ''
	const url = "/read?tb=template_text_categories"
	const method = "GET"
	const data = ''

	

	fetchAPI(url, method, data).then(values => {
		values.forEach(value=>{
			console.log(value)
			let div = document.createElement('div')
			div.classList.add("col-md-6")

			let btnColor = `btn-success`

			let catEdit = ""

			if(value.scope=="local"){
				btnColor = "btn-primary"
				catEdit = `
				<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split my-1" data-bs-toggle="dropdown" aria-expanded="false">
					<span class="visually-hidden">Toggle Dropdown</span>
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
					<!-- <li><button class="dropdown-item" onclick="updateCategoryData(this, ${ value.id }), show_text_categories(this)">Editar</button></li> -->
					<li><button class="dropdown-item" onclick="del_text_template_category('/del_template_cat?id=${value.id}'), show_text_categories(this)">Excluir</button></li>
				</ul>`
			}

			if(value.scope=="global" && value.role == "edit"){
				btnColor = "btn-success"
				catEdit = `
				<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split my-1" data-bs-toggle="dropdown" aria-expanded="false">
					<span class="visually-hidden">Toggle Dropdown</span>
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
					<!-- <li><button class="dropdown-item" onclick="updateCategoryData(this, ${ value.id }), show_text_categories(this)">Editar</button></li> -->
					<li><button class="dropdown-item" onclick="del_text_template_category('/del_template_cat?id=${value.id}'), show_text_categories(this)">Excluir</button></li>
				</ul>`
			}
	
			div.innerHTML = `
	
			<div class="input-group input-group-sm"> 
				<input type="button" class="form-control btn ${btnColor} my-1" aria-label="Text input with segmented dropdown button" value="${value.name}">
				<!-- <button type="button" class="btn btn-outline-secondary my-1">Action</button> -->
				
				
					${catEdit}
				
			</div>`
	
			conteiner_categories.appendChild(div)
		})
	})	



}


function populateShortCutsCategoriesOnSettings(){
	let  selectGroupSCategory = document.querySelectorAll('.selectGroupCategoryOnSettings')
	let categories = JSON.parse(localStorage.getItem('template_text_categories'));

	// console.log('populateShortCutsCategoriesOnSettings()')

	selectGroupSCategory.forEach(selectGroupCategory =>{
		selectGroupCategory.innerHTML = "<option value='all' selected >Todos os protocolos</option>"
		categories.forEach(value=>{
			let option = document.createElement('option')
			option.value = value.id
			option.innerHTML = value.name
			selectGroupCategory.appendChild(option)
			
		})
	})
}

function populateTextTemplatesCategories(values){
	let  selectGroupSCategory = document.querySelectorAll('.selectGroupCategory')

	selectGroupSCategory.forEach(selectGroupCategory =>{
		selectGroupCategory.innerHTML = "<option value='all' selected >Todos os protocolos</option>"
		values.forEach(value=>{
			let option = document.createElement('option')
			option.value = value.id
			option.innerHTML = value.name
			// option.setAttribute('onclick', 'filterTexModelsByOption(this)');
			selectGroupCategory.appendChild(option)
			
		})
	})
}





// const url = element != "" ? "/read_users_models&catId=" + child.value :  "/read_users_models"
function getTextmodels(el = null) {
	let url = '/read_users_models?extern=false';

	if (typeof el != 'undefined' && el !="all" && el != null) {
		url =  `/read_users_models?catId=${el.value}&`+url
	}

	// console.log("sdfds" + url)

	const method = "GET"
	const data = ''

	fetchAPI(url, method, data).then(value => {
		// console.log(value)
		localStorage.setItem('template_text_models', JSON.stringify(value))
		// populateTextTemplates(row, value)
		// getTextTemplates(url)
		
	})	

}

function filterTexModelsByOption(select) {
	const selectedOption = select.options[select.selectedIndex];
	console.log(selectedOption.value);
	addTemplateModelsWithShortCutsOnContainerByOpt(selectedOption);
}

function filterTexModelsBySearch(parent) {
	const search = parent.querySelector('input').value;
	const container = findClassPerName(parent, 'searchOptions', 'container-fluid')
	const select = container.querySelector('select')
	const selectedOption = select.options[select.selectedIndex];
	console.log(search);
	if(search){
		addTemplateModelsWithShortCutsOnContainerByOpt(selectedOption, search);
	}else{
		addTemplateModelsWithShortCutsOnContainerByOpt(selectedOption);
	}	
}

function setTextmodel(child) {
	var conteiner = findClass(child, ".showContent");
	const url = "/create_users_models";
	const method = "POST";
	const data = new URLSearchParams();
	var category = conteiner.querySelector(".selectGroupCategoryOnSettings").value
	let shortcut = conteiner.querySelector(".shortcut").value.trim().toLowerCase()
	let title = conteiner.querySelector(".title").value.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "").toLowerCase().trim()
	let model = conteiner.querySelector(".txt_area").value.trim()

	let selectElement = conteiner.querySelector('.selectScopeTextModel');
	let scope = selectElement ? selectElement.value.toLowerCase() : 'local';

	
	//console.log(data);
	if(category && shortcut && title && model){
		model =  model + '<div></div>'
		let text_models = JSON.parse(localStorage.getItem('template_text_models'));
		if(text_models){
			let temp = true
			text_models.forEach(model=>{
				if(shortcut == model.shortcut){
					showNotification("Esse atalho já está cadastrado!", "bg-danger")
					temp = false
				}
			})

			if(temp){
				data.append("category", category);
				data.append("shortcut", shortcut);
				data.append("title", title );
				data.append("model", model );
				data.append("scope", scope );

				fetchAPI(url, method, data).then(value => {
					if(value == true){
						getTextmodels()
						getScriptsByDefault()
						showNotification( "MODELO INSERIDO COM SUCESSO! ATUALIZE A PÀGINA",'bg-success')
					}
				
				});
			}
	}
	
		
	}else{
		showNotification( "ALGUM CAMPO OBRIGATÓRIO ESTÁ VAZIO!",'bg-danger')
	}
}


function setTextNotification(child) {
	var conteiner = findClass(child, ".showContent");
	const url = "/create_users_models";
	const method = "POST";
	const data = new URLSearchParams();
	let title = conteiner.querySelector(".title").value.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "").toLowerCase().trim()
	let model = conteiner.querySelector(".txt_area").value.trim()

	let selectElement = conteiner.querySelector('.selectScopeTextModel');
	let scope = selectElement ? selectElement.value.toLowerCase() : 'local';

	
	console.log(title);
	if( title && model){
		model =  model + '<div></div>'
		createNotification(title, model, "all") 

	}else{
		showNotification( "ALGUM CAMPO OBRIGATÓRIO ESTÁ VAZIO!",'bg-danger')
	}
}




function createModalEditTextModel(title, bodyContent, callback, model) {
    // Gera um ID único para o modal
    var modalId = 'modalEditTextModel';

    // Cria o modal com o spinner
    var theme = localStorage.getItem('theme') == 'dark' ? 'wdg_content_dark_complete' : 'wdg_content_light_complete';
    var modalContent = `
        <!-- Modal -->
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block !important;">
            <div class="modal-dialog">
                <div class="modal-content ${theme}">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
                    </div>
                    <div class="modal-body">
                        ${bodyContent}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="deleteModalEdit()">Close</button>
                        <button type="button" class="btn btn-primary" onclick="${callback}, deleteModalEdit()" data-bs-dismiss="modal"="modal">Salvar Alterações</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adiciona o modal ao corpo do documento
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Mostra o modal
    var modalEdit = new bootstrap.Modal(document.getElementById(modalId), {
        backdrop: 'static',
        keyboard: true
    });

    modalEdit.show();

    // Após adicionar o modal, inserir o conteúdo em <qlk>
    const qlkElement = document.querySelector(`#${modalId} .wdg_text_area.form-control`);
    if (qlkElement) {
        qlkElement.insertAdjacentHTML("beforeend", model.model);
    } else {
        console.error('Elemento "qlk" não encontrado');
    }
}

function editTextModel(child, id) {
    if (!child) {
        return;
    }

    console.log(child);

    let text_models = JSON.parse(localStorage.getItem('template_text_models'));

    text_models.forEach(model => {
        if (model.id == id) {

            console.log(model);

            let category = 'Todos os protocolos';

            const teamsRescue = localStorage.getItem('template_text_categories');
            const teams = JSON.parse(teamsRescue);

            const selectTeam = document.createElement('select');
            selectTeam.classList.add('form-select', 'selectGroupCategory', 'editField');
            selectTeam.disabled = true;
            selectTeam.setAttribute('aria-label', 'Default select example');

            teams.forEach(team => {
                const option = document.createElement('option');
                option.value = team.id;
                option.text = team.name;

                if (model.category == team.id) {
                    category = team.name;
                    option.setAttribute('selected', 'selected');
                    option.selected = true;
                }
                selectTeam.appendChild(option);
            });

            let optRole;
            if (model.scope == "global" && model.role == "edit") {
                optRole = `
                    <option value="local">Local</option>
                    <option value="global" selected>Global</option>
                `;
            } else if (model.scope == "local" && model.role == "edit") {
                optRole = `
                    <option value="local" selected>Local</option>
                    <option value="global">Global</option>
                `;
            } else {
                optRole = `
                    <option value="local" selected>Local</option>
                `;
            }

            const body = `
            <div class="row">
                <div class="col mt-3">
                    <label class="hide_element">ID: <span class="textModelId">${model.id}</span></label><br> 
                    <label>Título: ${model.title}</label><br>
                    <label>Atalho: <span class="textShortcutDefault">${model.shortcut}</span></label><br>
                    <label>Categoria: ${category}</label><br><br>
                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Título</span>
                        <input type="text" class="form-control textTitle editField" aria-label="Sizing example input" pattern="[a-zA-Z0-9]+" readonly="true"
                            aria-describedby="inputGroup-sizing-sm" value="${model.title}">
                        <button class="btn btn-outline-secondary" type="button" onclick="enableFieldEditing(this.parentElement)">Editar</button>
                    </div>

                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Atalho</span>
                        <input type="text" class="form-control textShortcut editField" aria-label="Sizing example input" pattern="[a-zA-Z0-9]+" readonly="true"
                            aria-describedby="inputGroup-sizing-sm" value="${model.shortcut}">
                        <button class="btn btn-outline-secondary" type="button" onclick="enableFieldEditing(this.parentElement)">Editar</button>
                    </div>

                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Categoria</span>
                        ${selectTeam.outerHTML}
                        <button class="btn btn-outline-secondary" type="button" onclick="enableFieldEditingSelect(this.parentElement)">Editar</button>
                    </div>

                    <div class="input-group input-group-sm mb-3">
                        <span class="input-group-text" id="inputGroup-sizing-sm">Escopo</span>
                            <select class="form-select selectGroupRole editField" disabled="">
                                ${optRole}
                            </select>
                        <button class="btn btn-outline-secondary" type="button" onclick="enableFieldEditingSelect(this.parentElement)">Editar</button>
                    </div>

                    <div class="input-group input-group-sm mb-3 px-2">
                        <qlq class="form-control conteiner-text-edit ">
                            <div class="editor_shortcuts_container"> 
                            </div>
                            <qlk class="wdg_text_area form-control" contenteditable="true" onpaste="removeFormatting(event)"
                                oninput="updateTextArea(this.parentElement)" onkeydown="findAndReplaceShortcutWithTextModel(this.parentElement, event)" onload="updateTextArea(this.parentElement)" type="text"
                                placeholder="Descreva aqui a solicitação do cliente" aria-label="Example text with button addon"
                                aria-describedby="button-addon1" style="margin-left: -1px !important;">
                            </qlk>
                            <textarea type="text" id="request" class="form-control txt_area hide_element" readonly
                                aria-label="Example text with button addon" aria-describedby="button-addon1"
                                style="margin-left: -1px !important;"></textarea>

                            <div class="d-flex flex-wrap justify-content-start wdg_text_edit align-items-center">
                                <img src="/public/images/font_bold.svg" onclick="document.execCommand('bold', false, '');"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Fonte em negrito">
                                <img src="/public/images/font_italic.svg" onclick="document.execCommand('italic', false, '');"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Fonte em itálico">
                                <img src="/public/images/font_underline.svg" onclick="document.execCommand('underline', false, '');"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Fonte com sublinhado">
                                <img src="/public/images/font_break.svg" onclick="document.execCommand('insertHTML', false, '<br>')"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Quebra de linha">
                                <img src="/public/images/font_line.svg"
                                    onclick="document.execCommand('insertHorizontalRule', false, null)" data-bs-toggle="tooltip"
                                    data-bs-placement="top" title="Linha horizontal">
                                <img src="/public/images/font_color.svg" onclick="img_onclick(this.parentElement)"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Alterar cor do texto">
                                <img src="/public/images/html.svg"
                                    onclick="showHTML(this.parentElement.parentElement, 'txt_area'), useToggle(this,'checked')"
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="Alterar cor do texto">
                                <input type="color" id="cor" onchange="changeColorEditable(this.parentElement)" width="10px"
                                    style="visibility: hidden;">

                            </div>

                        </qlq>
                    </div>
                </div>
            </div>
            `;

            createModalEditTextModel("Editar Modelo de Script", body, `updateTextModel(this, ${id})`, model);
        }
    });
}




function updateTextModel(child, id) {
	var container = findClass(child, ".modal-body");
	
	console.log(container)
	

	if(container){
		

		const url = "/update_users_models";
		const method = "POST";
		const data = new URLSearchParams();

		let textModelId = container.querySelector(".textModelId").innerText.trim().toLowerCase()
		let category = container.querySelector(".selectGroupCategory").value
		let shortcut = container.querySelector(".textShortcut").value.trim().toLowerCase()
		let shortcutDefault = container.querySelector(".textShortcutDefault").innerText.trim().toLowerCase()
		let title = container.querySelector(".textTitle").value.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "").toLowerCase().trim()
		let model = container.querySelector(".txt_area").value.trim()
		let scope = container.querySelector(".selectGroupRole").value
		
		console.log(category)
		console.log(shortcut)
		console.log(shortcutDefault)
		console.log(title)
		console.log(model)
		console.log(scope)

		


		if(category && shortcut && title && model && shortcut && textModelId){
			model =  model + '<div></div>'
			let text_models = JSON.parse(localStorage.getItem('template_text_models'));
			if(text_models){
				text_models.forEach(model=>{
					if(shortcut == model.shortcut && shortcut != shortcutDefault ){
						showNotification("Esse atalho já está cadastrado!", "bg-danger")
						return
					}
				})
			}
		
			data.append("id", textModelId);
			data.append("category", category);
			data.append("shortcut", shortcut);
			data.append("title", title );
			data.append("model", model );
			data.append("scope", scope);

			fetchAPI(url, method, data).then(value => {
				getTextmodels()
				getScriptsByDefault()
				showNotification( "MODELO INSERIDO COM SUCESSO! ATUALIZE A PÀGINA",'bg-success')
			});
		}else{
			showNotification( "ALGUM CAMPO OBRIGATÓRIO ESTÁ VAZIO!",'bg-danger')
		}
	}else{
		showNotification( "Erro ao editar!",'bg-danger')
	}
}


function deleteTextmodel(url, child){
const method = "GET";
const data = new URLSearchParams();

fetchAPI(url, method, data).then(value => {
	if(value == true){
		showNotification( "MODELO EXCLUÍDO! ATUALIZE A PÀGINA",'bg-success')
	}
	getTextmodels()
	getScriptsByDefault()
	addTemplateModelsWithShortCutsOnContainerByOpt(child)
	
});
}

function enableCheckbox(child, elClass) {
	var conteiner  =  findClass(child, '.showContent')
	var checkbox = conteiner.querySelector(elClass);
	
	console.log(checkbox.checked)
	if(checkbox.checked = false){
		checkbox.checked = true;
	}else{
		checkbox.checked = false;
	}
	console.log(checkbox.checked)
}


function populateTextTemplatesById(parent, textModels, id, search = null) {
    let isDefaultTextModels = localStorage.getItem('default_script_models')

    const createModelDiv = (model) => {

		let editModel = ""
		let btnColor = "btn-success"
        let isDefaultTextModels = localStorage.getItem('default_script_models')

		console.log(model.scope)

		if(model.scope == "local"){
			btnColor = "btn-primary"
			editModel = `
				<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
						<span class="visually-hidden">Toggle Dropdown</span>
						</button>
						<ul class="dropdown-menu">
						<li><div class="dropdown-item" onclick="editTextModel(this, ${ model.id })">Editar</div></li>  
						<li><span class="dropdown-item" onclick="deleteTextmodel('/delete_users_models?id=${ model.id }', this)">Excluir</span></li>
						</ul>
			`
		}

		if(model.scope == "global"  && model.role == "edit"){
			btnColor = "btn-success"
			editModel = `
				<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
						<span class="visually-hidden">Toggle Dropdown</span>
						</button>
						<ul class="dropdown-menu">
						<li><div class="dropdown-item" onclick="editTextModel(this, ${ model.id })">Editar</div></li>  
						<li><span class="dropdown-item" onclick="deleteTextmodel('/delete_users_models?id=${ model.id }', this)">Excluir</span></li>
						</ul>
			`
		}

        const div = document.createElement('div');
        div.classList.add("col-md-6");
        div.innerHTML = `
            <div class="input-group input-group-sm mb-3">
                <textarea class="form-control teste" aria-label="Example text with two button addons">${model.model}</textarea>
                <div class="input-group input-group-sm mb-3">
                    <button type="button" class="btn ${btnColor}" 
                        onclick="setTransferAreaValue(this.innerHTML, this.parentElement)">${model.shortcut}</button>
					${editModel}
                    <input type="text" class="form-control" aria-label="Text input with segmented dropdown button" 
                        placeholder="Título" value="${model.title}">
                </div>
            </div>
        `;
        return div;
    };

    textModels.forEach(model => {
        // Filtro por categoria
        const categoryMatch = model.category === id || id === 'all';

        // Filtro por pesquisa
        let searchMatch = true;  // Por padrão, todos passam
        if (search) {
            if (search.startsWith('#')) {
                // Filtro por atalho (shortcut) quando search começa com #
                //const shortcutSearch = search.slice(1); // Remove o '#'
                //searchMatch = model.shortcut.startsWith(shortcutSearch);
				searchMatch = model.shortcut.startsWith(search);
            } else {
                // Filtro por título (title) quando search não começa com #
                const searchWords = search.toLowerCase().split(' ');
                searchMatch = searchWords.every(word => model.title.toLowerCase().includes(word));
            }
        }

        // Se ambos os filtros (categoria e pesquisa) forem verdadeiros, adiciona o modelo
        if (categoryMatch && searchMatch) {
            if(model.scope == 'global' && isDefaultTextModels == 'enable'){
                parent.appendChild(createModelDiv(model));
            }else if(model.scope == 'local'){
                parent.appendChild(createModelDiv(model));
            }
            
        }
    });
}


function populateTextTemplates(parent, textModels){

    let isDefaultTextModels = localStorage.getItem('default_script_models')

    console.log(textModels)

	textModels.forEach( model => {
		

		var div = document.createElement('div')
		div.classList.add("col-md-6")

		let editModel = ""
		let btnColor = "btn-success"

		if(model.scope == "local"){
			btnColor = "btn-primary"
			editModel = `
				<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
						<span class="visually-hidden">Toggle Dropdown</span>
						</button>
						<ul class="dropdown-menu">
						<li><div class="dropdown-item" onclick="editTextModel(this, ${ model.id })">Editar</div></li>  
						<li><span class="dropdown-item" onclick="deleteTextmodel('/delete_users_models?id=${ model.id }', this)">Excluir</span></li>
						</ul>
			`
		}

		if(model.scope == "global"  && model.role == "edit"){
			btnColor = "btn-success"
			editModel = `
				<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
						<span class="visually-hidden">Toggle Dropdown</span>
						</button>
						<ul class="dropdown-menu">
						<li><div class="dropdown-item" onclick="editTextModel(this, ${ model.id })">Editar</div></li>  
						<li><span class="dropdown-item" onclick="deleteTextmodel('/delete_users_models?id=${ model.id }', this)">Excluir</span></li>
						</ul>
			`
		}


		var textModel = ` 
				<div class="input-group input-group-sm mb-3">
					<textarea class="form-control teste" placeholder="" aria-label="Example text with two button addons">${ model.model }</textarea>
					<div class="input-group input-group-sm mb-3">
						<button type="button" class="btn ${btnColor}" onclick="setTransferAreaValue(this.innerHTML, this.parentElement)">${ model.shortcut }</button>
						${editModel}
						<input type="text" class="form-control" aria-label="Text input with segmented dropdown button" placeholder="Título" value="${ model.title }">
					</div>  
				</div>
			`
        if( model.scope == "global" && isDefaultTextModels == 'enable'){
            div.innerHTML = textModel 	
		    parent.appendChild(div)
        }else if( model.scope == "local"){
            div.innerHTML = textModel 	
		    parent.appendChild(div)
        }
	})

}

function fillInFields(el, params=["input", "textarea", "input[type='checkbox']"]) {
    console.log(el)
	if (el) {
		// Select input elements with specific classes
		var inputs = el.querySelectorAll(params[0]);
		// Select textarea elements with the specific class
		var textareas = el.querySelectorAll(params[1]);

        var checkboxs = el.querySelectorAll(".check-addon");

		// Display the values in the console
		return({inputs, textareas, checkboxs})
	}
}


function findClass(element, elClass) {
	//console.log(element, elClass)

	if(element != null && elClass != null){
		// Navegar pelos pais até chegar ao elemento desejado
		while (element.parentNode) {
			
			// if (element.parentNode.classList.contains(elClass)) {
			if (element.parentNode.querySelector(elClass)) {
				element = element.parentNode.querySelector(elClass);
				// Elemento desejado encontrado
				break;
			}
			element = element.parentNode;
		}

		return element
	}

	
}


function findClassPerName(child, targetClass, stopClass) {
    if (!child || !targetClass) {
        throw new Error("Parâmetros inválidos.");
    }
    let currentElement = child.parentElement;
    while (currentElement) {
        const elements = currentElement.querySelectorAll("."+targetClass);
		// console.log(currentElement)
        if (elements.length > 0) {
            return elements[0];
        }

        if (currentElement.classList.contains(stopClass)) {
            return null;
        }

        currentElement = currentElement.parentElement;
    }

    return null;
}


function createModalEdit(title, bodyContent, callback) {
    // Gera um ID único para o modal
    var modalId = 'modalEdit';

    // Cria o modal com o spinner
    var theme = localStorage.getItem('theme') == 'dark' ? 'wdg_content_dark_complete' : 'wdg_content_light_complete';
    var modalContent = `
        <!-- Modal -->
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block !important;">
            <div class="modal-dialog">
                <div class="modal-content ${theme}">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
                        <!-- <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" deleteModalEdit()></button> -->
                    </div>
                    <div class="modal-body">
                        ${bodyContent}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="deleteModalEdit()">Close</button>
                        <button type="button" class="btn btn-primary" onclick="${callback}, deleteModalEdit()" data-bs-dismiss="modal"="modal">Salvar Alterações</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adiciona o modal ao corpo do documento
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Mostra o modal
    var modalEdit = new bootstrap.Modal(document.getElementById(modalId), {
        backdrop: 'static',
        keyboard: true
    });

    modalEdit.show();
}


function createModalClose(title, bodyContent, callback) {
    // Gera um ID único para o modal
    var modalId = 'modalEdit';

    // Cria o modal com o spinner
    var theme = localStorage.getItem('theme') == 'dark' ? 'wdg_content_dark_complete' : 'wdg_content_light_complete';
    var modalContent = `
        <!-- Modal -->
        <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="display: block !important;">
            <div class="modal-dialog">
                <div class="modal-content ${theme}">
                    <div class="modal-header">
                        <h1 class="modal-title fs-5" id="exampleModalLabel">${title}</h1>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" deleteModalEdit(), ${callback}></button> 
                    </div>
                    <div class="modal-body">
                        ${bodyContent}
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-primary" onclick="${callback}, deleteModalEdit()" data-bs-dismiss="modal"="modal">Fechar</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Adiciona o modal ao corpo do documento
    document.body.insertAdjacentHTML('beforeend', modalContent);

    // Mostra o modal
    var modalEdit = new bootstrap.Modal(document.getElementById(modalId), {
        backdrop: 'static',
        keyboard: true
    });

    modalEdit.show();
}



function deleteModalEdit() {
    var modalElements = document.getElementsByClassName('modal');
    var modalBackdrops = document.getElementsByClassName('modal-backdrop');
    
    //console.log(modalElements);
    
    // Remover todos os elementos com a classe 'modal'
    while (modalElements.length > 0) {
        modalElements[0].parentNode.removeChild(modalElements[0]);
    }
    
    //console.log(modalElements);
    
    // Remover todos os elementos com a classe 'modal-backdrop'
    while (modalBackdrops.length > 0) {
        modalBackdrops[0].parentNode.removeChild(modalBackdrops[0]);
    }
}


function updateInput(event) {
    // console.log(`O input ${event.target.id} foi alterado.`);
    // Coloque aqui a lógica que você quer executar quando o input for alterado
	let card_container = findClassPerName(this, "wdg_text_area", "showContent")
	let variaveis = card_container.querySelectorAll(".highlight_var")
	
	console.log(this)
	
	if(this.classList.contains("_Address")){
		variaveis.forEach(variable => {
			if(variable.id == "rua"){
				variable.innerHTML = this.value
			}
		});
	}
	if(this.classList.contains("_District")){
		variaveis.forEach(variable => {
			if(variable.id == "bairro"){
				variable.innerHTML = this.value
			}
		});
	}

	if(this.classList.contains("_City")){
		variaveis.forEach(variable => {
			if(variable.id == "cidade"){
				variable.innerHTML = this.value
			}
		});
	}

	if(this.classList.contains("_Cep")){
		console.log("chmaou .cep")
		variaveis.forEach(variable => {
			
			if(variable.id == "cep"){
				variable.innerHTML = this.value
			}
		});
	}

	
}


function getCepAddForm(parent){
    let inputCEP = parent.querySelector("._Cep").value;
    let address = getAddressByCep(inputCEP);

	let rua = findClassPerName(parent, "_Address", "row")
	let bairro = findClassPerName(parent, "_District", "row")
	let cidade = findClassPerName(parent, "_City", "row")
	let cep = findClassPerName(parent, "_Cep", "row")
	
    address.then(data => {

		cep.value = data.cep || "";
		// disparar evento de input para executar uma função
		let cepEvent = new Event('input', { bubbles: true, cancelable: true });
		cep.dispatchEvent(cepEvent);

		rua.value = data.logradouro || "";
		// disparar evento de input para executar uma função
		let ruaEvent = new Event('input', { bubbles: true, cancelable: true });
		rua.dispatchEvent(ruaEvent);
		
		bairro.value = data.bairro || "";
		// disparar evento de input para executar uma função
		let bairroEvent = new Event('input', { bubbles: true, cancelable: true });
		bairro.dispatchEvent(bairroEvent);
		
		cidade.value = data.localidade || "";
		// disparar evento de input para executar uma função
		let cidadeEvent = new Event('input', { bubbles: true, cancelable: true });
		cidade.dispatchEvent(cidadeEvent);
        
    }).catch(error => {
        console.error("Erro ao buscar o endereço:", error);
    });

	// Adicionar o listener de evento para os inputs
	rua.addEventListener('input', updateInput);
	bairro.addEventListener('input', updateInput);
	cidade.addEventListener('input', updateInput);
	cep.addEventListener('input', updateInput);
}

// busca as informações de endereço
function getAddressByCep(newcep){
    let cep = newcep.replace(/[^0-9]/g, '');
    const url = 'https://viacep.com.br/ws/' + cep + '/json';
    const options = {
        method: "GET",
        mode: "cors",
        headers: {
            'content-type': 'application/json;charset=utf-8',
        }
    };

    return fetch(url, options)
        .then(response => response.json())
        .then(data => {
            if (data.erro) {
				showNotification("CEP não encontrado","bg-danger")
                throw new Error("CEP não encontrado");
            }
            return data;
        });
}


async function activateAccount(event) {
    let container = findClassPerName(event.target, "cont-acc", "");
	let inputKey = container.querySelector("#inputKey")
    let key = inputKey.value;
    const url = "/saveactivationkey";
    const method = "POST";
    const data = new URLSearchParams();

	let show_status = container.querySelector(".show_status")
	let double_check_img = container.querySelector(".double-check-img")
	let btn_activate = container.querySelector(".btn_activate")
	let btn_to_home = container.querySelector(".btn_to_home")

    if (key) { // Verifica se a chave não é null ou undefined
        data.append("activation_key", key);
        try {
			const response = await fetchAPI(url, method, data);
			console.log(response);
		
			show_status.innerHTML = response.message;
			show_status.classList.toggle("text-success", response.status === "success");
			show_status.classList.toggle("text-danger", response.status === "error");
		
			if (response.status === "success") {
				double_check_img.classList.remove("hide_element");
				btn_activate.classList.add("hide_element");
				inputKey.classList.add("hide_element");
				btn_to_home.classList.remove("hide_element");
			}
		} catch (error) {
			show_status.innerHTML = "Erro ao fazer a solicitação.";
			show_status.classList.add("text-danger");
			console.error("Erro ao fazer a solicitação:", error);
		}
    } else {
        console.error("Chave de ativação inválida.");
    }
}




function getRescueLink(event) {
    let container = findClassPerName(event.target, "cont-acc", "");
    let key = container.parentElement.querySelector("#inputKey").value;
    const spinner = container.parentElement.querySelector("#spinner");
    const errorMessage = container.parentElement.querySelector("#errorMessage");
    errorMessage.textContent = ""; // Limpa qualquer mensagem de erro anterior

    applyButton.style.display = "none";
    spinner.style.display = "block";

    const url = "/getrescuelink";
    const method = "POST";
    const data = new URLSearchParams();

    if (key) { // Verifica se a chave não é null ou undefined
        data.append("user_or_mail", key);
        fetchAPI(url, method, data).then(value => {
            console.log(value);
            spinner.style.display = "none";
            if (value.status == 'success') {
                alert("Link enviado para seu e-mail");
            } else {
                errorMessage.textContent = "Erro ao enviar o link. Tente novamente.";
                applyButton.style.display = "block";
            }
        }).catch(error => {
            console.error("Erro ao fazer a solicitação:", error);
            errorMessage.textContent = "Erro ao fazer a solicitação. Tente novamente.";
            spinner.style.display = "none";
            applyButton.style.display = "block";
        });
    } else {
        errorMessage.textContent = "Chave de ativação inválida.";
        spinner.style.display = "none";
        applyButton.style.display = "block";
        console.error("Chave de ativação inválida.");
    }
}

 


function setNewPass(event) {
    let container = findClassPerName(event.target, "cont-acc", "");
    let pass = container.querySelector("#pass").value.replace(/\s/g, "");  // Remove espaços
    let newpass = container.querySelector("#newpass").value.replace(/\s/g, "");  // Remove espaços
	let show_error = container.querySelector(".show-error")
	let linkForLogin = container.querySelector(".link_for_login")
	
	show_error.innerHTML = ""

    // Pega o token da URL
    let params = new URLSearchParams(window.location.search);
    let token = params.get("token");

    const url = "/recover";
    const method = "POST";
    const data = new URLSearchParams();

    // Regex para verificar caracteres permitidos
    const validCharacters = /^[A-Za-z0-9À-ÖØ-öø-ÿ!@#$%^&*()_+=[\]{};':"\\|,.<>/?-]+$/;

    // Verifica se as senhas são iguais e se contêm caracteres válidos
    if (pass !== newpass) {
        alert("As senhas não são iguais.");
        return;
    }

    if (!validCharacters.test(pass)) {
        alert("A senha contém caracteres não permitidos.");
        return;
    }

	console.log(pass);
	console.log(newpass);

    if (token) {  // Verifica se o token não é null ou undefined
        data.append("new_password", pass);
        data.append("token", token);  // Adiciona o token ao data

        fetchAPI(url, method, data).then(value => {
            console.log(value);
            if (value.status == 'success') {
                show_error.style.color ="rgb(52 199 78)"
				show_error.innerHTML = "Senha altereda com sucesso!"
				linkForLogin.classList.remove('hide_element') 
            }
			if(value.status == 'error'){
				show_error.style.color ="rgb(243, 86, 86)"
				show_error.innerHTML = "Erro ao alterar a senha!"
			}
        }).catch(error => {
            console.error("Erro ao fazer a solicitação:", error);
        });
    } else {
        console.error("Token inválido.");
    }
}

//não está sendo utilizada
function authenticate(event) {
    let container = findClassPerName(event.target, "cont-acc", "main-class");

    let user = container.querySelector("#floatingInput").value.trim();
    let pass = container.querySelector("#floatingPassword").value.trim();
    let show_error = container.querySelector(".show-error");
    let show_result = container.querySelector(".show-result"); // elemento para exibir dados
    show_error.innerHTML = "";
    if (show_result) show_result.innerHTML = "";

    const url = "/loginforuser";
    const method = "POST";
    const data = new URLSearchParams();

    if (user && pass) {
        data.append("user", user);
        data.append("pass", pass);

        fetchAPI(url, method, data).then(value => {
            if (value.status === 'error') {
                show_error.innerHTML = value.message || "Usuário ou senha inválido!";
            }

            if (value.status === 'success') {
                // Exibe os dados do usuário retornado
                if (value.user && show_result) {
                    show_result.innerHTML = `
                        <strong>Usuário autenticado:</strong><br>
                        ID: ${value.user.id}<br>
                        Nome: ${value.user.name}<br>
                        E-mail: ${value.user.mail}<br>
                        Perfil: ${value.user.role}
                    `;
                }

                // Redireciona após pequeno delay
                setTimeout(() => {
                    window.location.href = "/home";
                }, 1500);
            }
        }).catch(error => {
            console.error("Erro ao fazer a solicitação:", error);
            show_error.innerHTML = "Erro de conexão com o servidor.";
        });
    } else {
        show_error.innerHTML = "Preencha usuário e senha.";
    }
}



function newAlarm(event) {
    let body = `
        <div class="container">
            <div class="row mb-3">
                <div class="col">
                    <label for="alarmHour" class="form-label">Hora:</label>
                    <input type="number" class="form-control" id="alarmHour" min="0" max="23" placeholder="HH" value="00">
                </div>
                <div class="col">
                    <label for="alarmMinute" class="form-label">Minutos:</label>
                    <input type="number" class="form-control" id="alarmMinute" min="0" max="59" placeholder="MM" value="00">
                </div>
                <div class="col">
                    <label for="alarmSecond" class="form-label">Segundos:</label>
                    <input type="number" class="form-control" id="alarmSecond" min="0" max="59" placeholder="SS" value="00">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <label for="alarmTitle" class="form-label">Título</label>
                    <input type="text" class="form-control" id="alarmTitle"  value="Novo Alarme">
                </div>
            </div>

            <div class="row mb-3">
                <div class="col">
                    <label class="form-label">Repetir em:</label>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="sunday">
                        <label class="form-check-label" for="sunday">Domingo</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="monday">
                        <label class="form-check-label" for="monday">Segunda-feira</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="tuesday">
                        <label class="form-check-label" for="tuesday">Terça-feira</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="wednesday">
                        <label class="form-check-label" for="wednesday">Quarta-feira</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="thursday">
                        <label class="form-check-label" for="thursday">Quinta-feira</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="friday">
                        <label class="form-check-label" for="friday">Sexta-feira</label>
                    </div>
                    <div class="form-check">
                        <input class="form-check-input" type="checkbox" id="saturday">
                        <label class="form-check-label" for="saturday">Sábado</label>
                    </div>
                </div>
            </div>
        </div>
    `;
    createModalEdit("Editar Modelo de Script", body, `setAlarm(event)`);
}



async function setAlarm(event) {
    let container = findClassPerName(event.target, "container", "modal-body");
    let hour = container.querySelector("#alarmHour").value;
    let minute = container.querySelector("#alarmMinute").value;
    let second = container.querySelector("#alarmSecond").value;
    let title = container.querySelector("#alarmTitle").value;

    // Obtendo os dias da semana
    const days = [];
    const daysOfWeek = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
    daysOfWeek.forEach(day => {
        if (container.querySelector("#" + day).checked) {
            days.push(day);
        }
    });

    console.log(days);
    console.log(hour);
    console.log(minute);
    console.log(second);
    console.log(title);

    // Verificando se os campos estão preenchidos
    if (hour === "" || minute === "" || second === "" || days.length === 0) {
        alert("Por favor, preencha todos os campos e selecione pelo menos um dia.");
        return;
    }

    // Montando os dados para enviar
    const data = new URLSearchParams();
    data.append('hour', hour);
    data.append('minute', minute);
    data.append('second', second);
    data.append('title', title);
    data.append('days', JSON.stringify(days));

    try {
        // Enviando os dados para o backend
        const response = await fetch('/setalarm', {
            method: 'POST',
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
        getAlarms()
		//checkAlarms()
        //alert("Alarme configurado com sucesso!");
        showNotification("Alarme configurado com sucesso!", "bg-success")

    } catch (error) {
        console.error("Erro ao configurar o alarme:", error);
        alert("Erro ao configurar o alarme.");
    }
}


function showLabelByShortcut(classEl, el){

	console.log(el)
	console.log(classEl)
	if(el){
		let label = el.querySelector("."+classEl)
		label.classList.toggle('hide_element')
	}
}


async function getAlarms() {
    console.log("set alarm")
    try {
        const response = await fetch('/getalarms', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.status === 'success') {
            localStorage.setItem('alarms', JSON.stringify(result.data));
            populateAlarmsContainer(result.data);
        } else {
            console.error(result.message);
        }
    } catch (error) {
        console.error("Erro ao buscar os alarmes:", error);
    }
}


function populateAlarmsContainer(alarms) {
    const container = document.querySelector('.container-alarms');
    if (!container) {
        console.error('Contêiner de alarmes não encontrado.');
        return;
    }

	if (!alarms || alarms == '') {
		container.innerHTML = ''; 
        return;
    }

    container.innerHTML = ''; // Limpar o conteúdo existente

    alarms.forEach(alarm => {
        const alarmTime = `${String(alarm.hour).padStart(2, '0')}:${String(alarm.minute).padStart(2, '0')}:${String(alarm.second).padStart(2, '0')}`;
        const days = JSON.parse(alarm.days);

        // Cria o contêiner principal do alarme
        const alarmDiv = document.createElement('div');
        alarmDiv.className = 'alarm-item border rounded p-2 mb-2 bg-white';

        const titleDiv = document.createElement('div');
        titleDiv.className = 'alarm-title mb-1';
        titleDiv.textContent = alarm.title;
        titleDiv.style.overflow = 'hidden';
        titleDiv.style.textOverflow = 'ellipsis';
        titleDiv.style.whiteSpace = 'nowrap';

        const timeDiv = document.createElement('div');
        timeDiv.className = 'alarm-time mb-1';
        timeDiv.textContent = alarmTime;

        const daysDiv = document.createElement('div');
        daysDiv.className = 'alarm-days d-flex mb-1';

        // Abreviações dos dias da semana em português
        const daysOfWeek = {
            'sunday': 'Dom',
            'monday': 'Seg',
            'tuesday': 'Ter',
            'wednesday': 'Qua',
            'thursday': 'Qui',
            'friday': 'Sex',
            'saturday': 'Sáb'
        };

        // Cria os elementos dos dias da semana
        Object.keys(daysOfWeek).forEach(day => {
            const daySpan = document.createElement('span');
            daySpan.textContent = daysOfWeek[day];
            daySpan.className = `day-circle d-flex align-items-center justify-content-center me-1 ${days.includes(day) ? 'btn-primary' : ''}`;
            daysDiv.appendChild(daySpan);
        });

        const editButton = document.createElement('button');
        editButton.className = 'btn btn-outline-secondary me-1';
        editButton.type = 'button';
        editButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pen" viewBox="0 0 16 16"><path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a.5.5 0 0 1-.059.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.233l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854a.5.5 0 0 0-.642.056A1.5 1.5 0 0 1 11.5.796c.459-.459.958-.68 1.498-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z"></path></svg>`;
        editButton.onclick = () => editAlarm(alarm.id);

        const deleteButton = document.createElement('button');
        deleteButton.className = 'btn btn-outline-secondary';
        deleteButton.type = 'button';
        deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16"><path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"></path><path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"></path></svg>`;
        deleteButton.onclick = () => deleteAlarm(alarm.id);

        alarmDiv.appendChild(titleDiv);
        alarmDiv.appendChild(timeDiv);
        alarmDiv.appendChild(daysDiv);
        //alarmDiv.appendChild(editButton);
        alarmDiv.appendChild(deleteButton);

        container.appendChild(alarmDiv);
    });
}



function editAlarm(id) {
    // Lógica para editar o alarme
    console.log(`Editar alarme com ID: ${id}`);
}

async function deleteAlarm(id) {
	console.log(id)
	console.log(typeof id)

    if (!id /*|| typeof id !== 'string'*/) {
        console.error("ID inválido fornecido para deleteAlarm");
        return;
    }

    try {
        const data = new URLSearchParams();
        data.append('id', id);

        const response = await fetch(`/delalarm`, {
            method: 'POST',
            body: data,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const result = await response.json();
        if (result.status === 'success') {
            await getAlarms(); // Assegure que os alarmes sejam recarregados
            showNotification("Alarme deletado!", "bg-danger");

        } else {
            showNotification('Falha ao deletar o alarme: ' + result.message, "bg-danger");
        }
    } catch (error) {
        console.error("Erro ao deletar o alarme:", error);
        showNotification("Erro ao deletar o alarme: " + error.message, "bg-danger");
    }
}








 





  

function showApps(){
    let body = 
	`
	<button type="button" class="btn  btn-warning  border" onclick="addService()">Adicionar Atendimento</button>
	<button type="button" class="btn  btn-warning  border" onclick="addLGPD()">Adicionar LGPD</button>
	<button type="button" class="btn  btn-warning  border" onclick="addShortShortcut() ">Adicionar Atalhos curtos</button>
	<button type="button" class="btn  btn-warning  border" onclick="addScriptTemplates() ">Adicionar Modelos de Script</button>
	<button type="button" class="btn  btn-warning  border" onclick="addNoc()">Adicionar Padrão NOC</button>
	<button type="button" class="btn  btn-warning  border" onclick="addFinanceiro()">Script Financeiro</button>
	`
	createModalEdit("Editar Modelo de Script", body, `deleteModalEdit()` )

}




async function send_mail(event) {
    event.preventDefault(); // Evitar o envio padrão do formulário

    const form = event.target.closest('form');
    const sendButton = event.target; // Identificar o botão de envio clicado

    // Bloquear o botão para evitar múltiplos cliques
    sendButton.disabled = true;
    sendButton.textContent = "Enviando...";

    // Capturar os e-mails das listas de destinatários e cópias
    let recipientEmails = Array.from(document.getElementById('recipient-list').querySelectorAll('span'))
        .map(span => span.textContent.trim());

    const copyEmails = Array.from(document.getElementById('copy-list').querySelectorAll('span'))
        .map(span => span.textContent.trim());

    // Verificar se "Enviar para todos" está marcado e adicionar "all" ao destinatário
    const sendToAllCheckbox = document.getElementById('sendToAll');


    // Adicionar campos ao FormData
    const formData = new FormData();
    formData.append('destinatarios', recipientEmails.join(',')); // Destinatários separados por vírgula
    formData.append('copias', copyEmails.join(',')); // Cópias separadas por vírgula
    formData.append('assunto', form.assunto.value);
    formData.append('sendToAll', sendToAllCheckbox.checked ? 'true' : 'false'); // Enviar 'true' se marcado
    formData.append('corpo', form.corpo.value);

    console.log("Dados enviados ao servidor:", {
        destinatarios: recipientEmails,
        copias: copyEmails,
        assunto: form.assunto.value,
        corpo: form.corpo.value,
    });

    try {
        const response = await fetch('/sendmail', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        if (result.status === 'success') {
            console.log('E-mail enfileirado e envio iniciado!');
            showNotification('E-mail enfileirado e envio iniciado.', 'bg-success');
        } else {
            console.error('Erro ao enviar e-mail:', result.message);
            showNotification(`Erro ao enviar e-mail: ${result.message}`, 'bg-danger');
        }
    } catch (error) {
        console.error('Erro ao conectar ao servidor:', error);
        showNotification('Erro ao conectar ao servidor. Tente novamente mais tarde.', 'bg-danger');
    } finally {
        // Habilitar o botão novamente após o processamento
        sendButton.disabled = false;
        sendButton.textContent = "Enviar E-mail";
    }
}





function enable_card_visibility(class_to_enable, el) {
	var container = findClassPerName(el, "wdg_conteiner", "");
	var card_itens = Array.from(container.children).filter(child => child.classList.contains('item'));
  
	card_itens.forEach(function(item) {
	  // Se o elemento tiver a classe class_to_enable, remove a classe hide_element
	  if (item.classList.contains(class_to_enable)) {
		item.classList.remove('hide_element');
	  } else {
		// Adiciona a classe hide_element aos outros elementos
		item.classList.add('hide_element');
	  }
	});
  }
  
  
 

 
//   function buscarClientePorCpf(cpf, el_child) {
//     if (el_child.disabled) return; // evita múltiplas requisições
  
//     el_child.disabled = true;
  
//     const cpfClienteGroup = el_child.closest('.cpf_cliente_group');
//     const isCanceladoCheck = cpfClienteGroup.querySelector('.canceladoCheckbox');
//     const incluirCancelado = isCanceladoCheck && isCanceladoCheck.checked;
  
//     const url = `/showadmclient?cpf=${encodeURIComponent(cpf)}${incluirCancelado ? '&cancelado=1' : ''}`;
  
//     fetch(url)
//       .then(response => response.text())
//       .then(html => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, 'text/html');
  
//         const tabelas = doc.querySelectorAll('table');
//         const listaContratos = document.getElementById('listaContratos');
//         listaContratos.innerHTML = '';
  
//         let contratosEncontrados = 0;
  
//         tabelas.forEach(tabela => {
//           const linhas = tabela.querySelectorAll('tr');
  
//           linhas.forEach(tr => {
//             const colunas = tr.querySelectorAll('td');
//             if (colunas.length < 6) return;
  
//             const textoPrimeiraColuna = colunas[0].textContent.trim().toLowerCase();
//             if (textoPrimeiraColuna === 'nome') return;
  
//             const cliente = {
//               nome: colunas[0].textContent.trim(),
//               telefone: colunas[1].textContent.trim(),
//               cidade: colunas[2].textContent.trim(),
//               plano: colunas[3].textContent.trim(),
//               usuario: colunas[4].textContent.trim(),
//               status: colunas[5].textContent.trim()
//             };
  
//             const card = document.createElement('div');
//             card.className = 'card mb-3';
//             card.innerHTML = `
//               <div class="card-body">
//                 <h5 class="card-title">${cliente.nome}</h5>
//                 <p class="card-text">
//                   <strong>Telefone:</strong> ${cliente.telefone}<br>
//                   <strong>Cidade:</strong> ${cliente.cidade}<br>
//                   <strong>Plano:</strong> ${cliente.plano}<br>
//                   <strong>Usuário:</strong> ${cliente.usuario}<br>
//                   <strong>Status:</strong> ${cliente.status}
//                 </p>
//               </div>
//             `;
//             listaContratos.appendChild(card);
//             contratosEncontrados++;
//           });
//         });
  
//         if (contratosEncontrados === 0) {
//           listaContratos.innerHTML = '<p class="text-muted">Nenhum contrato encontrado.</p>';
//         }
  
//         const modal = new bootstrap.Modal(document.getElementById('modalCliente'));
//         modal.show();
//       })
//       .catch(error => {
//         console.error('Erro ao buscar cliente:', error);
//       })
//       .finally(() => {
//         el_child.disabled = false;
//       });
//   }
  

function buscarClientePorCpf(cpf, el_child) {
  if (el_child.disabled) return;
  el_child.disabled = true;

  const container = el_child.closest('.wdg_card');
  const userName = container.querySelector('.username')?.value || '';
  const txtArea = container.querySelector('.txt_area')?.value || '';
  const number_chat_protocol = container.querySelector('.number_chat_protocol');
  const phoneNumber = container.querySelector('.phone_number')?.value || '';

  let txt_model = txtArea;
  let description = "";
  for (let i = 0; i < txt_model.length; i++) {
    if (txt_model[i] === ".") break;
    description += txt_model[i];
  }

  if (chat) {
    if (number_chat_protocol.value == 0) {
      showNotification('Algum campo obrigatório está vazio', 'bg-danger');
    } else {
      txt_model = `${description}<hr><b><font color=blue> Protocolo do Chat: ${number_chat_protocol.value} </b></font><hr>`;
    }
  } else {
    if (description == 0) {
      showNotification('Algum campo obrigatório está vazio', 'bg-danger');
    } else {
      txt_model = `${description}<hr>`;
    }
  }

  const cpfClienteGroup = el_child.closest('.cpf_cliente_group');
  const isCanceladoCheck = cpfClienteGroup?.querySelector('.canceladoCheckbox');
  const incluirCancelado = isCanceladoCheck && isCanceladoCheck.checked;

  const queryString = `/showadmclient?cpf=${encodeURIComponent(cpf)}${incluirCancelado ? '&cancelado=1' : ''}`;

  const formData = new URLSearchParams();
  formData.append('userName', userName);
  formData.append('txtArea', txt_model);
  formData.append('phoneNumber', phoneNumber);

  // 🌀 Modal de carregamento
  const loadingModal = document.createElement('div');
  loadingModal.className = 'modal fade';
  loadingModal.id = 'loadingModal';
  loadingModal.tabIndex = -1;
  loadingModal.innerHTML = `
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content text-center p-4">
        <div class="progress-loader">
          <div class="progress-bar"></div>
          <div id="loadingText" class="fw-bold mt-3">Analisando contratos...</div>
        </div>
        <div id="loadingText" class="fw-bold fs-5">Processando requisição...</div>
      </div>
    </div>
  `;
  document.body.appendChild(loadingModal);
  const loading = new bootstrap.Modal(loadingModal, { backdrop: 'static', keyboard: false });
  loading.show();

  // 💬 Mensagens dinâmicas
  const mensagens = [
    'Processando requisição...',
    'Buscando dados do cliente...',
    'Verificando status do contrato...',
    'Analisando conexão de rede...',
    'Coletando histórico de tarefas...',
    'Conectando ao servidor adm.fasternet.com.br...',
    'Finalizando consulta...'
  ];
  let msgIndex = 0;
  const msgElement = loadingModal.querySelector('#loadingText');
  const msgInterval = setInterval(() => {
    msgIndex = (msgIndex + 1) % mensagens.length;
    msgElement.textContent = mensagens[msgIndex];
  }, 1500);

  // 🔍 Busca no backend
  fetch(queryString, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: formData.toString()
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);

      const oldModal = document.getElementById('modalCliente');
      if (oldModal) oldModal.remove();

      clearInterval(msgInterval);
      loading.hide();
      loadingModal.remove();

      // === Modal de resultados ===
      const modalHtml = document.createElement('div');
      modalHtml.className = 'modal fade';
      modalHtml.id = 'modalCliente';
      modalHtml.tabIndex = -1;
      modalHtml.innerHTML = `
        <div class="modal-dialog modal-lg modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Contratos do Cliente</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div class="modal-body">
              <div id="listaContratos"></div>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalHtml);
      const listaContratos = modalHtml.querySelector('#listaContratos');

      if (!data.clientes || data.clientes.length === 0) {
        listaContratos.innerHTML = '<p class="text-center text-danger fw-bold">Cadastro não encontrado</p>';
      } else {
        data.clientes.forEach(item => {
          const cliente = item.cliente;
          const contatos = item.contatos;
          const linkTarefa = item.linkTarefa;
          const linkLGPD = item.linkLGPD;
          const statusContrato = cliente.status_contrato;
          const tarefas = item.tarefas || [];

          const isCritico = ['CANCELADO', 'BLOQUEADO', 'MIGRADO'].includes(statusContrato);
          const borda = isCritico ? 'border-danger' : 'border-secondary';
          const botaoClass = isCritico ? 'btn btn-danger' : 'btn btn-dark';
          const textoClass = isCritico ? 'text-danger' : '';
          const headerClass = isCritico ? 'bg-danger text-white' : 'bg-light text-dark';

          const card = document.createElement('div');
          card.className = `card mb-3 ${borda}`;
          card.innerHTML = `
            <div class="card-header fw-bold ${headerClass}">
              ${statusContrato}
            </div>
            <div class="card-body ${textoClass}">
              <h5 class="card-title">${cliente.nome}</h5>
              <p class="card-text">
                <strong>Telefone:</strong> ${cliente.telefone}<br>
                <strong>Endereço:</strong> ${cliente.endereco_completo || cliente.endereco || '-'}<br>
                <strong>Cidade:</strong> ${cliente.cidade}<br>
                <strong>Bairro:</strong> ${cliente.bairro}<br>
                <strong>Conexão:</strong> ${cliente.tipo_conexao}<br>
                <strong>Plano:</strong> ${cliente.plano}<br>
                <strong>Usuário:</strong> ${cliente.nomeusuario}<br>
                <strong>Status:</strong> ${cliente.status}<br>
                <strong>Email:</strong> ${contatos.email || '-'}<hr>

                <strong>Contato (quem ligou):</strong> ${cliente.contato || '-'}<br>
                <strong>Nº de contato:</strong> ${cliente.num_contato || '-'}<br>

                <div class="mb-2 d-flex align-items-center">
                  <strong class="me-2" style="width: 130px;">Protocolo:</strong>
                  <div class="input-group input-group-sm flex-grow-1">
                    <input type="number" class="form-control protocolo-input" placeholder="Informe o protocolo">
                  </div>
                </div>

                <div class="mb-2 d-flex align-items-center">
                  <strong class="me-2" style="width: 130px;">Há risco:</strong>
                  <div class="input-group input-group-sm flex-grow-1">
                    <select class="form-select select-risco">
                      <option value="não">Não</option>
                      <option value="sim">Sim</option>
                    </select>
                  </div>
                </div>

                <div class="mb-2 d-flex align-items-center">
                  <strong class="me-2" style="width: 130px;">Cabo drop:</strong>
                  <div class="input-group input-group-sm flex-grow-1">
                    <select class="form-select select-drop">
                      <option value="não">Não</option>
                      <option value="sim">Sim</option>
                    </select>
                  </div>
                </div>

                <div class="mb-2 d-flex align-items-start">
                  <strong class="me-2" style="width: 130px;">Motivo da verificação:</strong>
                  <textarea class="form-control form-control-sm motivo-contato flex-grow-1" placeholder="Escreva o motivo do contato" rows="3"></textarea>
                </div>

              </p>
              <div class="d-flex flex-wrap gap-2 mb-3">
                <a href="${linkTarefa}" target="_blank" class="${botaoClass}">Abrir Tarefa</a>
                <a href="${linkLGPD}" target="_blank" class="${botaoClass}">Editar Contatos (LGPD)</a>
                <button class="${botaoClass} btn-warning ver-sup-noc-btn">Ver Sup/NOC</button>
                <button class="btn btn-warning ver-sup-fin-btn">Ver Sup/Financeiro</button>
              </div>
              <div class="tarefas-slider-container"></div>
            </div>
          `;
          listaContratos.appendChild(card);

          // === BOTÃO SUP/NOC ===
          const btnSupNoc = card.querySelector('.ver-sup-noc-btn');
          btnSupNoc.addEventListener('click', () => {
            const protocoloInput = card.querySelector('.protocolo-input');
            const riscoSelect = card.querySelector('.select-risco');
            const dropSelect = card.querySelector('.select-drop');
            const motivoTextarea = card.querySelector('.motivo-contato');

            const protocolo = protocoloInput ? protocoloInput.value || '-' : '-';
            const risco = riscoSelect ? riscoSelect.value : '-';
            const drop = dropSelect ? dropSelect.value : '-';
            const motivo = motivoTextarea ? motivoTextarea.value.trim() : '';

            const textoNoc = `
Olá, pode verificar?
SN: ${cliente.g || '-'}
Usuário: ${cliente.nomeusuario || '-'}
Cidade: ${cliente.cidade || '-'}
Autenticação: ${cliente.tipo_conexao || '-'}
Plano: ${cliente.plano || '-'}
Endereço: ${cliente.endereco_completo || cliente.endereco || '-'}
Motivo da verificação: ${motivo || '(não informado)'}
Nome e nº de telefone do cliente: ${cliente.num_contato || '-'}, ${cliente.contato || '-'}
Oferece risco: ${risco}
Cabo drop: ${drop}
Protocolo: ${protocolo}
            `.trim();

            setTransferAreaValue(textoNoc, card);
          });

          // === BOTÃO SUP/FINANCEIRO ===
          const btnSupFin = card.querySelector('.ver-sup-fin-btn');
          btnSupFin.addEventListener('click', () => {
            const protocoloInput = card.querySelector('.protocolo-input');
            const motivoTextarea = card.querySelector('.motivo-contato');

            const protocolo = protocoloInput ? protocoloInput.value || '-' : '-';
            const motivo = motivoTextarea ? motivoTextarea.value.trim() : '';

            const textoFin = `
Olá, pode verificar?
Usuário: ${cliente.nomeusuario || '-'}
Protocolo: ${protocolo}
Motivo da verificação: ${motivo || '(não informado)'}
            `.trim();

            setTransferAreaValue(textoFin, card);
          });

          // === SLIDER DE TAREFAS ===
          if (tarefas.length > 0) {
            const sliderContainer = card.querySelector('.tarefas-slider-container');
            const chunkSize = 5;
            const paginas = [];
            for (let i = 0; i < tarefas.length; i += chunkSize) {
              paginas.push(tarefas.slice(i, i + chunkSize));
            }

            let currentPage = 0;
            const renderPagina = (index) => {
              sliderContainer.innerHTML = `
                <div class="d-flex justify-content-between align-items-center mb-2">
                  <h6 class="fw-bold">Protocolos (${tarefas.length})</h6>
                  <div>
                    <button class="btn btn-sm btn-outline-secondary me-1" id="prevPage" ${index === 0 ? 'disabled' : ''}>◀</button>
                    <button class="btn btn-sm btn-outline-secondary" id="nextPage" ${index === paginas.length - 1 ? 'disabled' : ''}>▶</button>
                  </div>
                </div>
                <div class="d-flex flex-nowrap overflow-auto pb-2 gap-2"></div>
              `;

              const track = sliderContainer.querySelector('div.d-flex.flex-nowrap');
              paginas[index].forEach(t => {
                const tarefaUrl = t.url.startsWith('http')
                  ? t.url
                  : `http://adm.fasternet.com.br/${t.url.replace(/^\//, '')}`;
                const tarefaBtn = document.createElement('a');
                tarefaBtn.href = `javascript:openWindow('${tarefaUrl}','LOG2','scrollbars=yes,width=430,height=220')`;
                tarefaBtn.className = 'btn btn-outline-primary flex-shrink-0';
                tarefaBtn.style.minWidth = '180px';
                tarefaBtn.innerHTML = `
                  <div class="fw-bold">${t.assunto}</div>
                  <small>${t.data_abertura.replace(/&nbsp;/g, ' ')} → ${t.data_fechamento.replace(/&nbsp;/g, ' ')}</small>
                `;
                tarefaBtn.addEventListener('click', (e) => {
                  e.preventDefault();
                  const popup = window.open(
                    tarefaUrl,
                    'LOG2',
                    'scrollbars=yes,width=430,height=220'
                  );
                  if (!popup) alert('Permita pop-ups para visualizar o protocolo.');
                });
                track.appendChild(tarefaBtn);
              });

              sliderContainer.querySelector('#prevPage')?.addEventListener('click', () => {
                if (currentPage > 0) {
                  currentPage--;
                  renderPagina(currentPage);
                }
              });
              sliderContainer.querySelector('#nextPage')?.addEventListener('click', () => {
                if (currentPage < paginas.length - 1) {
                  currentPage++;
                  renderPagina(currentPage);
                }
              });
            };
            renderPagina(currentPage);
          }
        });
      }

      const modal = new bootstrap.Modal(modalHtml);
      modal.show();
    })
    .catch(error => {
      clearInterval(msgInterval);
      loading.hide();
      loadingModal.remove();
      console.error('Erro ao buscar cliente:', error);
    })
    .finally(() => {
      el_child.disabled = false;
    });
}
