var chat =  false; // verifica se a função chat está habilitada
var extemplates = false
var gltemplates = false



//configuração da plataforma 
document.addEventListener('DOMContentLoaded', () => {
	const url = "/read?tb=platform_settings";
	const method = "POST";
	const data = new URLSearchParams();

	let card = document.querySelector('.wdg_add_card')
	if(card !== null ){
		var eventClick= new Event('click');
		card.dispatchEvent(eventClick);
	}
	
	let e_chat = document.querySelectorAll(".enable-chat")
	if(e_chat !== null ){
		e_chat.forEach( el=> {
			useToggle(el, 'hide_element')
		})	
	}
	

   	fetchAPI(url, method, data).then(data=>{
		//console.log(data)

		if(!data){
			return
		}

		if( Object.keys(data).length === 0 ){
				let e_chat = document.querySelectorAll(".enable-chat")
				e_chat.forEach( el=> {
					useToggle(el, 'hide_element')
				})
		}else{
			data.forEach(value =>{
				if((value.name == 'chat' && value.state == 'enable' )){
					chat = true
					console.log('chat = true')
					
					let element = document.querySelector(".card_btn_chat");
					if(element !== null ){
						element.classList.add('btn_checked')
						let child = element.querySelector('.card_btn_span')
						useToggle(child, 'btn_checked_span')
					}
					
				}else if((value.name == 'chat' && value.state == 'disable' )){
					chat = false
					console.log('chat = false')
					let e_chat = document.querySelectorAll(".enable-chat")
					if(e_chat !== null ){
						e_chat.forEach( el=> {
							useToggle(el, 'hide_element')
						})
					}
					
				}	
			})
		}
		
	})
})



//configuração da plataforma 
document.addEventListener('DOMContentLoaded', () => {
	getPlatformSettingsExtemplates()

	let suggestion = document.querySelector('.suggestion_conteiner')
	getSuggestions(suggestion)
})




function getPlatformSettingsExtemplates(){
	const url = "/read?tb=platform_settings";
	const method = "POST";
	const data = new URLSearchParams();


   	fetchAPI(url, method, data).then(data=>{
		// console.log(data)

		if(!data){
			return
		}

		if( Object.keys(data).length === 0 ){
			extemplates = false;
		}else{
			data.forEach(value =>{
				// console.log(value.name)
				if((value.name == 'extemplates' && value.state == 'enable' )){
					// console.log('entrou')
					extemplates = true
					const element = document.querySelector(".card_btn_extemplates");
					if(element !== null ){
						element.classList.add('btn_checked')
						let child = element.querySelector('.card_btn_span')
						useToggle(child, 'btn_checked_span')
					}
					
				}else if((value.name == 'extemplates' && value.state == 'disable' )){
					console.log('entrou')
					extemplates = false
				}	
			})
		}

		
	})
}

//configuração da plataforma 
// document.addEventListener('DOMContentLoaded', () => {
// 	const url = "/read?tb=platform_settings";
// 	const method = "POST";
// 	const data = new URLSearchParams();


//    	fetchAPI(url, method, data).then(data=>{
// 		console.log(data)

// 		if( Object.keys(data).length === 0 ){
// 			gltemplates = false;
// 		}else{
// 			data.forEach(value =>{
// 				console.log(value.name)
// 				if((value.name == 'gltemplates' && value.state == 'enable' )){
// 					gltemplates = true
// 					const element = document.querySelector(".card_btn_gltemplates");
// 					element.classList.add('btn_checked')
// 					let child = element.querySelector('.card_btn_span')
// 					useToggle(child, 'btn_checked_span')
// 				}else if((value.name == 'gltemplates' && value.state == 'disable' )){
// 					gltemplates = false
// 				}	
// 			})
// 		}

		
// 	})
// })






function setChatState(){
	const url = "/asdasdasdasd?name=chat";
	const method = "POST";
	const data = new URLSearchParams();
	if(chat == true){
		data.append("state", 'enable');
		// chat = false
	}else{
		data.append("state", 'disable' );
		// chat = true
	}
  
	fetchAPI(url, method, data).then(value => {
	//   console.log(value);
	});
}





function setExternTemplatesState(){
	const url = "/asdasdasdasd?name=extemplates";
	const method = "POST";
	const data = new URLSearchParams();

	// console.log(extemplates)

	if(extemplates == true){
		data.append("state", 'disable');
		extemplates =false;

	}else{
		data.append("state", 'enable');
		extemplates = true;
	}
	
  
	fetchAPI(url, method, data).then(value => {
	//   console.log(value);
	});
}


function setGlobalsTemplatesState(){
	const url = "/asdasdasdasd?name=gltemplates";
	const method = "POST";
	const data = new URLSearchParams();

	// console.log(gltemplates)

	if(gltemplates == true){
		data.append("state", 'disable');
		gltemplates=false
	}else{
		data.append("state", 'enable' );
		gltemplates = true
	}
	
	
	// console.log(chat);
	
  
	fetchAPI(url, method, data).then(value => {
	//   console.log(value);
	});
}




//drag and drop WDG_CARD

// const draggableElement = document.querySelector('.draggableElement');
// drag and drop WDG_CARD com feedback visual de posição

let isDragging = false;
let dropLine = null;

// Ativa início do arraste
function ativateDragStart(event, el) {
  if (isMouseInDraggableArea(event.clientX, event.clientY, el)) {
    el.classList.add('dragging');
    isDragging = true;
  } else {
    event.preventDefault();
  }
}

// Finaliza arraste
function activateDragend(el) {
  el.classList.remove('dragging');
  isDragging = false;
  if (dropLine) dropLine.remove();
}

// Verifica área de arraste
function activateOnMouseMove(event, el) {
  if (isDragging && !isMouseInDraggableArea(event.clientX, event.clientY, el)) {
    el.classList.remove('dragging');
    isDragging = false;
  }
}

// Checa se o mouse está na área clicável superior
function isMouseInDraggableArea(mouseX, mouseY, el) {
  const draggableRect = el.getBoundingClientRect();
  const draggableAreaHeight = 39;

  return (
    mouseX >= draggableRect.left &&
    mouseX <= draggableRect.right &&
    mouseY >= draggableRect.top &&
    mouseY <= draggableRect.top + draggableAreaHeight
  );
}

// Troca posição dos cards com preview de destino
const columns = document.querySelectorAll(".column");

document.addEventListener("dragstart", (e) => {
  e.target.classList.add("dragging");
});

document.addEventListener("dragend", (e) => {
  e.target.classList.remove("dragging");
  if (dropLine) dropLine.remove();
});

document.addEventListener("drop", (e) => {
  e.preventDefault();
  const dragging = document.querySelector(".dragging");

  if (dropLine && dropLine.parentElement) {
    dropLine.insertAdjacentElement("beforebegin", dragging);
    dropLine.remove();
  }
});

columns.forEach((column) => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault();

    const dragging = document.querySelector(".dragging");
    const applyAfter = getNewPosition(column, e.clientY);

    // Remove linha anterior
    if (dropLine) dropLine.remove();

    // Cria nova linha azul indicativa
    dropLine = document.createElement("div");
    dropLine.classList.add("drop-line");

    if (applyAfter) {
      applyAfter.insertAdjacentElement("afterend", dropLine);
    } else {
      column.prepend(dropLine);
    }
  });
});

// Lógica para determinar posição do drop
function getNewPosition(column, posY) {
  const cards = column.querySelectorAll(".item:not(.dragging)");
  let result;

  for (let refer_card of cards) {
    const box = refer_card.getBoundingClientRect();
    const boxCenterY = box.y + box.height / 2;

    if (posY >= boxCenterY) result = refer_card;
  }

  return result;
}









/// CRIA UM NOVO CARD PARA ATENDIMENTO

function addTextEditTags(parent, el) {
	var div = document.createElement('div')
	var div2 = document.createElement('div')

	parent.removeChild(el)


	let divContent = `
	
<header class="wdg_card_header d-flex justify-content-between"><!--Cabeçalho-->
    <!-- <img src="/public/images/more_options.svg" width="25px"> -->
    <h6 class="wdg_card_name_user" onclick="createDropDown(this)"
        onkeydown="if(event.keyCode==13) {event.preventDefault();}">NOME
    </h6>



    <div class="d-flex window_behavior justify-content-end">

        <svg xmlns="http://www.w3.org/2000/svg" onclick="clearContainer(this), clearClienteName(this), clearClienteCPF(this)" width="16" height="16" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 16 16"
        data-bs-toggle="tooltip" data-bs-placement="top" title="Apaga os dados preenchidos"
        >
            <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"/>
            <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466"/>
        </svg>


        <svg xmlns="http://www.w3.org/2000/svg" onclick="showFormDesk(this, 'hide_form')" width="16" height="16" fill="currentColor" class="bi bi-card-list" viewBox="0 0 16 16"
        data-bs-toggle="tooltip" data-bs-placement="top" title="Carrega o formulário de preenchimento"
        >
            <path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z"/>
            <path d="M5 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 5 8m0-2.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m0 5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-1-5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M4 8a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0m0 2.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0"/>
        </svg>
       

        <svg onclick="HideElement(this.parentElement.parentElement.parentElement), showFormDesk(this, 'hide_all')"  xmlns="http://www.w3.org/2000/svg"
            width="10" height="10" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 15 15"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Expande o formulário"
            >
            <path fill-rule="evenodd"
                d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z" />
        </svg>


        <svg  class="btn-remove-card" onclick="" xmlns="http://www.w3.org/2000/svg"
            width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 15 15"
            data-bs-toggle="tooltip" data-bs-placement="top" title="Exclui o formulário"
            >
            <path
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
        </svg>
    </div>
</header>



<div class="show_form hide_element">
    <iframe class="frame" src="https://docs.google.com/forms/d/e/1FAIpQLSeZnV8sZ1sHh5L2s5jA6wvCq8o913uZXhY7DK7DZSkL4PfAOw/viewform" height="450px" width="100% !important" scrolling="yes"> </iframe>
</div>


<div class="showContent">

    <div class="wdg_content_form"> <!--novos formulários podem ser adicionados aqui-->
        <div class="wdg_card_form container-fluid">
            <div class="row row-100">
                <div class="col-md-6">
                    <div class="input-group input-group-sm mb-3">
                        <button onclick="getInputValue(this.parentElement)"
                            class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-person" viewBox="0 0 16 16">
                                <path
                                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z" />
                            </svg>
                        </button>

                        <button onclick="updateInputValue(this, '.input-group', 'titular')"
                            class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2"
                            
                            data-bs-toggle="tooltip" data-bs-placement="top" title="escreve Titular no campo de nome do cliente. Deve ser utilizado no Sales Force"
                            >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-node-plus" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M11 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8M6.025 7.5a5 5 0 1 1 0 1H4A1.5 1.5 0 0 1 2.5 10h-1A1.5 1.5 0 0 1 0 8.5v-1A1.5 1.5 0 0 1 1.5 6h1A1.5 1.5 0 0 1 4 7.5zM11 5a.5.5 0 0 1 .5.5v2h2a.5.5 0 0 1 0 1h-2v2a.5.5 0 0 1-1 0v-2h-2a.5.5 0 0 1 0-1h2v-2A.5.5 0 0 1 11 5M1.5 7a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                            </svg>
                        </button>

                        <input type="text" oninput="updateCardUsername(this)" onchange="updateCardUsername(this)"
                            class="form-control username" placeholder="Nome" aria-label="Example text with button addon"
                            aria-describedby="button-addon1">
                        <button onclick="setInputValue(this)" onclick="setInputValue(this)"
                            class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </button>
                    </div>

                    <div class="input-group input-group-sm mb-3">
                        <button onclick="getInputValue(this.parentElement)"
                            class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-globe" viewBox="0 0 16 16">
                                <path
                                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z" />
                            </svg>
                        </button>

                        <input type="text" class="form-control erp_protocol" placeholder="Protocolo ADM"
                            aria-label="Example text with button addon" aria-describedby="button-addon1">
                        <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                            type="button" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg>
                        </button>
                    </div>

                    <div class="input-group input-group-sm mb-3">
                        <button onclick="getInputValue(this.parentElement)"
                            class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-broadcast-pin" viewBox="0 0 16 16">
                                <path
                                    d="M3.05 3.05a7 7 0 0 0 0 9.9.5.5 0 0 1-.707.707 8 8 0 0 1 0-11.314.5.5 0 0 1 .707.707zm2.122 2.122a4 4 0 0 0 0 5.656.5.5 0 1 1-.708.708 5 5 0 0 1 0-7.072.5.5 0 0 1 .708.708zm5.656-.708a.5.5 0 0 1 .708 0 5 5 0 0 1 0 7.072.5.5 0 1 1-.708-.708 4 4 0 0 0 0-5.656.5.5 0 0 1 0-.708zm2.122-2.12a.5.5 0 0 1 .707 0 8 8 0 0 1 0 11.313.5.5 0 0 1-.707-.707 7 7 0 0 0 0-9.9.5.5 0 0 1 0-.707zM6 8a2 2 0 1 1 2.5 1.937V15.5a.5.5 0 0 1-1 0V9.937A2 2 0 0 1 6 8z" />
                            </svg>
                        </button>


                        <button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <span class="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul class="dropdown-menu">

                            <li>
                                <div class="dropdown-item" href="#"
                                    onclick="updateInputValue(this, '.input-group', 'Padrão fibra')">Padrão fibra</div>
                            </li>

                            <li>
                                <div class="dropdown-item" href="#"
                                    onclick="updateInputValue(this, '.input-group', 'Apresentando respostas')">
                                    Apresentando respostas</div>
                            </li>
                            <li>
                                <div class="dropdown-item" href="#"
                                    onclick="updateInputValue(this, '.input-group', 'Sem resposta')">Sem resposta</div>
                            </li>
                        </ul>


                        <input type="text" class="form-control base" placeholder="base/padrão fibra"
                            aria-label="Example text with button addon" aria-describedby="button-addon1"
                            value="Padrão fibra">
                        <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                            type="button" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg></i>
                        </button>
                    </div>
                </div>


                <div class="col-md-6">
                    <div class="input-group input-group-sm mb-3">
                        <button onclick="getInputValue(this.parentElement)"
                            class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-telephone" viewBox="0 0 16 16">
                                <path
                                    d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z" />
                            </svg>
                        </button>

                        <input  onpaste="removeDots(this)" type="text" class="form-control phone_number" placeholder="Telefone"
                            aria-label="Example text with button addon" aria-describedby="button-addon1">
                        <button onclick="setInputValue(this), removeDots(this, 'true')" class="btn btn-outline-secondary rounded-end"
                            type="button" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg></i>
                        </button>
                    </div>

                    <div class="input-group input-group-sm mb-3  enable-chat">
                        <button onclick="getInputValue(this.parentElement)"
                            class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                <path
                                    d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                <path
                                    d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                            </svg>
                        </button>

                        <input type="text" class="form-control number_chat_protocol" placeholder="Protocolo chat"
                            aria-label="Example text with button addon" aria-describedby="button-addon1">
                        <button onclick="setInputValue(this)" onclick="setInputValue(this)"
                            class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-arrow-right" viewBox="0 0 16 16">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                            </svg></i>
                        </button>
                    </div>

                    <!-- estava cpf aqui -->
                    <div class="row cpf_cliente_group">
                        <div class="input-group input-group-sm mb-3">
                            <button onclick="getInputValueByClass(this.parentElement, '.input_for_validade_cp')"
                                class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1"
                                
                                data-bs-toggle="tooltip" data-bs-placement="top" title="Copia o CPF ou CNPJ sem a mascara"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-person-vcard" viewBox="0 0 16 16">
                                    <path
                                        d="M5 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm4-2.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5ZM9 8a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 9 8Zm1 2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z" />
                                    <path
                                        d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2ZM1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8.96c.026-.163.04-.33.04-.5C9 10.567 7.21 9 5 9c-2.086 0-3.8 1.398-3.984 3.181A1.006 1.006 0 0 1 1 12V4Z" />
                                </svg>
                            </button>
    
                            <button onclick="getInputValueByClassCpfCnpjMasked(this.parentElement, '.input_for_validade_cp')"
                                class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1"
                                
                                data-bs-toggle="tooltip" data-bs-placement="top" title="Copia o CPF ou CNPJ com a mascara"
                                >
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-mask" viewBox="0 0 16 16">
                                    <path d="M6.225 1.227A7.5 7.5 0 0 1 10.5 8a7.5 7.5 0 0 1-4.275 6.773 7 7 0 1 0 0-13.546M4.187.966a8 8 0 1 1 7.627 14.069A8 8 0 0 1 4.186.964z"/>
                                  </svg>
                            </button>
    
                            <span class="input-group-text cpf_validate"> 
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question" viewBox="0 0 16 16">
                                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                                </svg>
                            </span>
    
    
                            <input onpaste="removeDots(this)" type="text"
                                class="form-control cpf input_for_validade_cpf" placeholder="cpf ou cnpj"
                                aria-label="Example text with button addon" aria-describedby="button-addon1" pattern="[0-9]*" inputmode="numeric">
                              
                            <button onclick="removeDots(this, true)" class="btn btn-outline-secondary rounded-end" type="button"
                                id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                    class="bi bi-arrow-right" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                </svg></i>
                            </button>
    
                            <button onclick="buscarClientePorCpf(this.parentElement.querySelector('.input_for_validade_cpf').value, this )" class="btn btn-outline-secondary rounded-end" type="button"
                                id="button-addon2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                                </svg>
                            </button>   
    
                        </div>
                        
                         <div class="form-check">
                            <input class="form-check-input canceladoCheckbox" type="checkbox" id="canceladoFlag">
                            <label class="form-check-label" for="canceladoFlag">
                              Incluir cadastros cancelados
                            </label>
                          </div>  
                    </div>

                </div><!--End col 6-->

                

                <hr>

                <div class=""> <!--- Agendamento -->
                    <header class="d-flex justify-content-between mb-3"><!--Cabeçalho-->
                        <!-- <img src="/public/images/more_options.svg" width="25px"> -->
                        <h6>AGENDAMENTO</h6>
                        <div class="d-flex window_behavior justify-content-end">
                            <svg onclick="HideElement(this.parentElement.parentElement.parentElement, '.showContent2')"
                                xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor"
                                class="bi bi-arrows-collapse" viewBox="0 0 15 15">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z">
                                </path>
                            </svg>
                        </div>
                    </header>

                    <div class="showContent2 hide_element row">
                        <div class="col-md-6">
                            <div class="input-group input-group-sm mb-3">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-bookmarks" viewBox="0 0 16 16">
                                        <path
                                            d="M2 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v11.5a.5.5 0 0 1-.777.416L7 13.101l-4.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v10.566l3.723-2.482a.5.5 0 0 1 .554 0L11 14.566V4a1 1 0 0 0-1-1z" />
                                        <path
                                            d="M4.268 1H12a1 1 0 0 1 1 1v11.768l.223.148A.5.5 0 0 0 14 13.5V2a2 2 0 0 0-2-2H6a2 2 0 0 0-1.732 1" />
                                    </svg>
                                </button>

                                <button type="button"
                                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Manhã')">Manhã</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Tarde')">Tarde</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Noite')">Noite</div>
                                    </li>
                                    <li>
                                        <hr>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Indisponível')">
                                            Indisponível</div>
                                    </li>
                                </ul>


                                <input type="text" class="form-control agendamento"
                                    placeholder="Selecione o agendamento" aria-label="Example text with button addon"
                                    aria-describedby="button-addon1">
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg>
                                </button>
                                <input type="date" class="form-control dataDeAgendamento" pattern="\d{2}/\d{2}/\d{4}"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1">
                            </div>
                        </div><!-- End Col-->

                        <div class="col-md-6">
                            <div class="input-group input-group-sm mb-3">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-card-heading" viewBox="0 0 16 16">
                                        <path
                                            d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                        <path
                                            d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </button>


                                <button type="button"
                                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Manhã')">Manhã</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Tarde')">Tarde</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Noite')">Noite</div>
                                    </li>
                                    <li>
                                        <hr>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Qualquer horário')">
                                            Qualquer horário</div>
                                    </li>
                                </ul>


                                <input type="text" class="form-control disponibilidadeGeral"
                                    placeholder="Disponibilidade Geral" aria-label="Example text with button addon"
                                    aria-describedby="button-addon1" value="">
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>



                            <div class="input-group input-group-sm mb-3">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control pontoDeReferencia"
                                    placeholder="Ponto de referência" aria-label="Example text with button addon"
                                    aria-describedby="button-addon1">
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>



                        </div><!-- End Col-->

                        <div class="row">
                            <div class="col-12 mb-2">
                                <label class="form-label fw-bold">Opções adicionais:</label>
                        
                                <div class="form-check w-100 mb-2 ">
                                    <input class="form-check-input check-addon" type="checkbox" id="checkbox1" value="maiorIdade">
                                    <label class="form-check-label w-100" for="checkbox1">Cliente ciente de que deve haver uma pessoa maior de idade.</label>
                                </div>
                        
                                <div class="form-check w-100 mb-2 ">
                                    <input class="form-check-input check-addon" type="checkbox" id="checkbox2" value="garantia30">
                                    <label class="form-check-label w-100" for="checkbox2">Garantia de Instalação (30 dias).</label>
                                </div>
                        
                                <div class="form-check w-100">
                                    <input class="form-check-input check-addon" type="checkbox" id="checkbox3" value="empresa">
                                    <label class="form-check-label w-100" for="checkbox3">Cliente empresarial.</label>
                                </div>
                            </div>
                        </div><!-- End row -->
                        


                    </div> <!-- Showcontent  -->
                </div> <!-- End Agendamento--->

                <hr>

                <div class="cont_serv"> <!--- Endereço -->
                    <header class="d-flex justify-content-between mb-3"><!--Cabeçalho-->
                        <!-- <img src="/public/images/more_options.svg" width="25px"> -->
                        <h6>SERVIÇOS</h6>
                        <div class="d-flex window_behavior justify-content-end">
                            <svg onclick="HideElement(this.parentElement.parentElement.parentElement, '.showContent2')"
                                xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor"
                                class="bi bi-arrows-collapse" viewBox="0 0 15 15">
                                <path fill-rule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z">
                                </path>
                            </svg>
                        </div>
                    </header>

                    <div class="showContent2 hide_element row ">
                        <p>Utilize um desses atalhos #agend | #sertransfend | #sermudcom | #serpontadic | #sermontrede | #venda</p>
                        <div class="input-group input-group-sm mb-3 px-2">
                            <button class="btn-select btn btn-outline-primary" type="button" onclick="enableFormByService(event,'agend'), distributeElements(event)" data-bs-toggle="tooltip" data-bs-placement="top" title="#agend">Agendamento</button>
                            <button class="btn-select btn btn-outline-primary" type="button" onclick="enableFormByService(event,'transfEnd'), distributeElements(event)" data-bs-toggle="tooltip" data-bs-placement="top" title="#sertransfend">Tranf. End </button>
                            <button class="btn-select btn btn-outline-primary" type="button" onclick="enableFormByService(event,'mudCom'), distributeElements(event)" data-bs-toggle="tooltip" data-bs-placement="top" title="#sermudcom">Mud. Cômodo </button>
                            <button class="btn-select btn btn-outline-primary" type="button" onclick="enableFormByService(event,'pAdic'), distributeElements(event)" data-bs-toggle="tooltip" data-bs-placement="top" title="#serpontadic">P. Adicional </button>
                            <button class="btn-select btn btn-outline-primary" type="button" onclick="enableFormByService(event,'mRede'), distributeElements(event)" data-bs-toggle="tooltip" data-bs-placement="top" title="#sermontrede">Mont. de rede </button>
                            <button class="btn-select btn btn-outline-primary" type="button" onclick="enableFormByService(event,'venda'), distributeElements(event)" data-bs-toggle="tooltip" data-bs-placement="top" title="#venda">Venda</button>
                        </div>

                        <div class="col-md-6" id="col1">
                            <!-- CEP -->
                            <div class="input-group input-group-sm mb-3 in_data cep hide_element transfEnd venda " data-order="1000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control _Cep" placeholder="Digite o cep"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'cep')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{cep}}"

                                    >
                                <button onclick="getCepAddForm(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
                                    Pesquisar
                                </button>
                            </div>
                            <!-- rua -->
                            <div class="input-group input-group-sm mb-3 in_data rua hide_element transfEnd venda " data-order="2000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control _Address" placeholder="Rua"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'rua')"

                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{rua}}"

                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>
                            <!-- número -->
                            <div class="input-group input-group-sm mb-3 in_data numero hide_element transfEnd venda " data-order="3000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control numero" placeholder="Número"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'numero')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{numero}}"

                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>
                            <!-- bairro -->
                            <div class="input-group input-group-sm mb-3 in_data bairro hide_element transfEnd venda " data-order="4000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control _District" placeholder="Bairro"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'bairro')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{bairro}}"
                                    
                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>
                            <!-- cidade-->
                            <div class="input-group input-group-sm mb-3 in_data cidade hide_element transfEnd venda " data-order="5000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control _City" placeholder="Cidade"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'cidade')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{cidade}}"
                                    
                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>

                            <!-- tipo de moradia-->
                            <div class="input-group input-group-sm mb-3 in_data tipo_moradia hide_element transfEnd  " data-order="5001">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-card-heading" viewBox="0 0 16 16">
                                        <path
                                            d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                        <path
                                            d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </button>


                                <button type="button"
                                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Casa'), dispatchEventForInput(this, 'filledInput', 'tipo_moradia')">Casa</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Apartamento'), dispatchEventForInput(this, 'filledInput', 'tipo_moradia')">Apartamento</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Chácara'), dispatchEventForInput(this, 'filledInput', 'tipo_moradia')">Chácara</div>
                                    </li>
                                    <li>
                                        <hr>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Zona rural'), dispatchEventForInput(this, 'filledInput', 'tipo_moradia')">
                                            Qualquer horário</div>
                                    </li>
                                </ul>


                                <input type="text" class="form-control tipoMoradia"
                                    placeholder="Tipo de moradia" aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'tipo_moradia')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{tipo_moradia}}"
                                    
                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2"
                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{tipo_moradia}}"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>
                            
                            <!-- cliente já reside no endereço-->
                            <div class="input-group input-group-sm mb-3 in_data mora_no_endereco hide_element transfEnd " data-order="6000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control moraNoEndereco" placeholder="Cliente já reside no endereço?"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'mora_no_endereco')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{mora_no_endereco}}"
                                    
                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>

                            


                            

                            <!-- Quantidade de pontos adicionais-->
                            <div class="row" data-order="7000">
                                <div class="col-md-6">
                                    <div class="input-group input-group-sm mb-3 in_data qtd_p_adicional hide_element pAdic mRede" data-order="7001">
                                        <label class="input-group-text" >qtd de pontos</label>
                                        <select class="form-select" onchange="findAndReplaceVariableForInputValue(event,'qtd_p_adicional')"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="{{qtd_p_adicional}}"
                                        >
                                            <option value="0" selected>0</option>
                                            <option value="1" >1</option>
                                            <option value="2" >2</option>
                                            <option value="3" >3</option>
                                            <option value="4" >4</option>
                                            <option value="5" >5</option>
                                            <option value="6" >6</option>
                                            <option value="7" >7</option>
                                            <option value="8" >8</option>
                                            <option value="9" >9</option>
                                            <option value="10" >10</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Tipo de -->
                                <div class="col-md-6">
                                    <!-- Plano-->
                                    <div class="input-group input-group-sm mb-3 in_data tipo_p_adicional hide_element pAdic" data-order="7002">
                                        <label class="input-group-text" >Tipo de ponto</label>
                                        <select class="form-select" onchange="findAndReplaceVariableForInputValue(event,'tipo_p_adicional')"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="{{tipo_p_adicional}}"
                                        >
                                            <option value="XX" selected>Selecione o tipo de ponto</option>
                                            <option value="WI_FI">WI_FI</option>
                                            <option value="TV">TV</option>
                                        </select>
                                    </div>
                                </div>

                                
                                <!-- Plano-->
                                <div class="col-md-6">
                                    <!-- Plano-->
                                    <div class="input-group input-group-sm mb-3 in_data plano_atual_cliente hide_element pAdic" data-order="7003">
                                        <label class="input-group-text" >Plano</label>
                                        <select class="form-select" onchange="findAndReplaceVariableForInputValue(event,'plano_atual_cliente')"
                                        data-bs-toggle="tooltip" data-bs-placement="top" title="{{plano_atual_cliente}}"
                                        >
                                            <option value="XX" selected>Selecione o plano</option>
                                            <option value="100 mega">100 mega</option>
                                            <option value="200 mega">200 mega</option>
                                            <option value="250 mega">250 mega</option>
                                            <option value="300 mega">300 mega</option>
                                            <option value="350 mega">350 mega</option>
                                            <option value="400 mega">400 mega</option>
                                            <option value="450 mega">450 mega</option>
                                            <option value="500 mega">500 mega</option>
                                            <option value="550 mega">550 mega</option>
                                            <option value="600 mega">600 mega</option>
                                            <option value="650 mega">650 mega</option>
                                            <option value="700 mega">700 mega</option>
                                            <option value="750 mega">750 mega</option>
                                            <option value="800 mega">800 mega</option>
                                            <option value="850 mega">850 mega</option>
                                            <option value="1 Giga">1 Giga</option>
                                        </select>
                                    </div>
                                </div>

                                <!-- Valor do plano atual-->
                                <div class="col-md-6">
                                    <!-- Valor do plano atual-->
                                    <div class="input-group input-group-sm mb-3 in_data valor_plano_atual_cliente hide_element pAdic " data-order="7004">
                                        <!-- <button onclick="getInputValue(this.parentElement)"
                                            class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                    d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                            </svg>
                                        </button> -->
                                        <label class="input-group-text" >Preço do plano atual R$</label>
                                        <input type="number" min="0"  class="form-control valor_plano_atual_cliente" placeholder="Valor do plano atual"
                                            aria-label="Example text with button addon" aria-describedby="button-addon1"
                                            oninput="findAndReplaceVariableForInputValue(event,'valor_plano_atual_cliente')" value="0"
                                            data-bs-toggle="tooltip" data-bs-placement="top" title="{{valor_plano_atual_cliente}}"
                                            >
                                        <!-- <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                            type="button" id="button-addon2">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                                class="bi bi-arrow-right" viewBox="0 0 16 16">
                                                <path fill-rule="evenodd"
                                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                            </svg></i>
                                        </button> -->
                                    </div>
                                </div>
                            </div>


                            <!-- Configurar roteador ?-->
                            <div class="input-group input-group-sm mb-3 in_data configurar_roteador hide_element mRede" data-order="7015">
                                <label class="input-group-text" >Configurar roteador</label>
                                <select class="form-select" onchange="findAndReplaceVariableForInputValue(event,'configurar_roteador')"
                                data-bs-toggle="tooltip" data-bs-placement="top" title="{{configurar_roteador}}"
                                >
                                    <option value="Sim" >Sim</option>
                                    <option value="Não" selected>Não</option>
                                </select>
                            </div>

                        </div><!-- End Col-->

                        <div class="col-md-6" id="col2">
                            <!-- Turno agendamento -->
                            <div class="input-group input-group-sm mb-3 in_data turno_agendado hide_element agend transfEnd  mudCom pAdic mRede venda" data-order="8000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-card-heading" viewBox="0 0 16 16">
                                        <path
                                            d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                        <path
                                            d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </button>


                                <button type="button"
                                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Manhã'), dispatchEventForInput(this, 'filledInput', 'turno_agendado')">Manhã</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Tarde'), dispatchEventForInput(this, 'filledInput', 'turno_agendado')">Tarde</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Noite'), dispatchEventForInput(this, 'filledInput', 'turno_agendado')">Noite</div>
                                    </li>
                                    <li>
                                        <hr>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Qualquer horário'), dispatchEventForInput(this, 'filledInput', 'turno_agendado')">
                                            Qualquer horário</div>
                                    </li>
                                </ul>


                                <input type="text" class="form-control turnoAgendado"
                                    placeholder="Turno para agendamento" aria-label="Example text with button addon"
                                    aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'turno_agendado')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{turno_agendado}}"
                                    
                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2"
                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{turno_agendado}}"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>

                            <!-- Disponibilidade geral -->
                            <div class="input-group input-group-sm mb-3 in_data disponibilidade_geral hide_element agend" data-order="9000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-card-heading" viewBox="0 0 16 16">
                                        <path
                                            d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2z" />
                                        <path
                                            d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5z" />
                                    </svg>
                                </button>


                                <button type="button"
                                    class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
                                    data-bs-toggle="dropdown" aria-expanded="false">
                                    <span class="visually-hidden">Toggle Dropdown</span>
                                </button>
                                <ul class="dropdown-menu">
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Manhã'), dispatchEventForInput(this, 'filledInput', 'disponibilidade_geral')">Manhã</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Tarde'), dispatchEventForInput(this, 'filledInput', 'disponibilidade_geral')">Tarde</div>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Noite'), dispatchEventForInput(this, 'filledInput', 'disponibilidade_geral')">Noite</div>
                                    </li>
                                    <li>
                                        <hr>
                                    </li>
                                    <li>
                                        <div class="dropdown-item" href="#"
                                            onclick="updateInputValue(this, '.input-group', 'Qualquer horário'), dispatchEventForInput(this, 'filledInput', 'disponibilidade_geral')">
                                            Qualquer horário</div>
                                    </li>
                                </ul>


                                <input type="text" class="form-control disponibilidade_geral"
                                    placeholder="Disponibilidade Geral" aria-label="Example text with button addon"
                                    aria-describedby="button-addon1" 
                                    oninput="findAndReplaceVariableForInputValue(event, 'disponibilidade_geral')"

                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{disponibilidade_geral}}"

                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2"
                                    data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="{{disponibilidade_geral}}"
                                    >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg>
                                </button>
                            </div>
                            <!-- Ponto de referência-->
                            <div class="input-group input-group-sm mb-3 in_data ponto_de_referencia hide_element transfEnd  mudCom pAdic mRede agend" data-order="10000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control pontoReferencia" placeholder="Ponto de referência"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event, 'ponto_de_referencia')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{ponto_de_referencia}}"
                                    
                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>
                            <!-- melhor turno-->
                            <div class="input-group input-group-sm mb-3 in_data melhor_turno hide_element" data-order="11000">
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control melhorTurno" placeholder="Melhor turno"
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event,'melhor_turno')">
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>
                            <!-- Confirmado por-->
                            <div class="input-group input-group-sm mb-3 in_data confirmado_disponibilidade hide_element transfEnd " data-order="12000">
                                <!-- <label for="" class="label-inputs">opcional</label> -->
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control confirDisp"
                                    placeholder="Confirmado a disponibilidade de conexão no local por: "
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event,'confirmado_disponibilidade')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{confirmado_disponibilidade}}"
                                    
                                    >
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>
                            <!-- Telefone 1-->
                            <div class="input-group input-group-sm mb-3 in_data telefone1 hide_element venda " data-order="13000">
                                <!-- <label for="" class="label-inputs">opcional</label> -->
                                <button onclick="getInputValue(this.parentElement)"
                                    class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-down-right-circle" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8m15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.854 5.146a.5.5 0 1 0-.708.708L9.243 9.95H6.475a.5.5 0 1 0 0 1h3.975a.5.5 0 0 0 .5-.5V6.475a.5.5 0 1 0-1 0v2.768z" />
                                    </svg>
                                </button>

                                <input type="text" class="form-control confirDisp"
                                    placeholder="Telefone 1 "
                                    aria-label="Example text with button addon" aria-describedby="button-addon1"
                                    oninput="findAndReplaceVariableForInputValue(event,'telefone1')">
                                <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end"
                                    type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                        class="bi bi-arrow-right" viewBox="0 0 16 16">
                                        <path fill-rule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                                    </svg></i>
                                </button>
                            </div>

                            <!-- Data 1-->
                            <div class="input-group input-group-sm mb-3 in_data data1 hide_element transfEnd mudCom pAdic mRede agend" data-order="14000">
                                <label class="input-group-text" for="">Data 1</label>
                                <input type="date" class="form-control data1"
                                    oninput="findAndReplaceVariableForInputValue(event,'data1')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{data1}}"
                                    >
                            </div>

                            <!-- Data 2-->
                            <div class="input-group input-group-sm mb-3 in_data data2 hide_element transfEnd mudCom pAdic mRede" data-order="15000">
                                <label class="input-group-text" for="">Data 2</label>
                                <input type="date" class="form-control data2"
                                    oninput="findAndReplaceVariableForInputValue(event,'data2')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{data2}}"
                                    
                                    >
                            </div>

                            <!-- Data 3-->
                            <div class="input-group input-group-sm mb-3 in_data data3 hide_element transfEnd mudCom pAdic mRede" data-order="16000">
                                <label class="input-group-text" for="">Data 3</label>
                                <input type="date" class="form-control data3"
                                    oninput="findAndReplaceVariableForInputValue(event,'data3')"
                                    
                                    data-bs-toggle="tooltip" data-bs-placement="top" title="{{data3}}"
                                    
                                    >
                            </div>
                        
                        </div><!-- End Col-->
                    </div> <!-- Showcontent  -->
                </div> <!-- End endereço--->

            </div><!--row-->
        </div> <!--end wdg_card_form-->
    </div><!--End wdg_content_form-->

    <!-- MODELOS PADRÂO -->
    <div class=" p-2 ">
        <button class="btn btn-sm btn-success" onclick="getNewScriptModel('faster', this.parentElement.parentElement)">Modelos de preenchimento</button>
        <span class="novo">Novo</span>
    </div>

    <!--NOVAS FUNCIONALIDADES-->
    <div class="input-group input-group-sm mb-3 px-2">
        <div class="d-flex flex-column btn-group-vertical">
            <button onclick="getInputValueHTML(this)" class="btn btn-outline-secondary  " type="button"
                id="button-addon1" data-bs-toggle="tooltip" data-bs-placement="top" title='Copia todo o texto do editor'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-clipboard" viewBox="0 0 16 16">
                    <path
                        d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
                    <path
                        d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
                </svg>
            </button>

            <button onclick="eraseContentEditable(this)" class="btn btn-outline-secondary  " type="button"
                id="button-addon1" data-bs-toggle="tooltip" data-bs-placement="top" title='Apaga todo o conteúdo do editor de texto'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eraser"
                    viewBox="0 0 16 16">
                    <path
                        d="M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828l6.879-6.879zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293 4.633-4.633a1 1 0 0 0 0-1.414l-3.879-3.879zM8.746 13.547 3.453 8.254 1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293l.16-.16z" />
                </svg>
            </button>

        </div>



        <!--Editor 	de texto-->
        <div class="form-control conteiner-text-edit ">
            <div class="editor_shortcuts_container">
                <!-- <span class="btn-span-sm">#atalho1</span>  <span class="btn-span-sm">#atalho2</span> -->

            </div>

            <qlk class="wdg_text_area form-control" contenteditable="true" onpaste="removeFormatting(event)"
                oninput="updateTextArea(this.parentElement)"
                onkeydown="findAndReplaceShortcutWithTextModel(this.parentElement, event)"
                onload="updateTextArea(this.parentElement)" type="text"
                placeholder="Descreva aqui a solicitação do cliente" aria-label="Example text with button addon"
                aria-describedby="button-addon1"
				style="margin-left: -1px !important; "
				></qlk>
            <textarea type="text" id="request" class="form-control txt_area hide_element" readonly
                aria-label="Example text with button addon" aria-describedby="button-addon1" style="margin-left: -1px !important; "></textarea>



                <div class="d-flex flex-wrap justify-content-start wdg_text_edit align-items-center">
                    <!-- Fonte em negrito -->
                    <img src="/public/images/font_bold.svg" onclick="document.execCommand('bold', false, '');"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Fonte em negrito">
                
                    <!-- Fonte em itálico -->
                    <img src="/public/images/font_italic.svg" onclick="document.execCommand('italic', false, '');"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Fonte em itálico">
                
                    <!-- Fonte com sublinhado -->
                    <img src="/public/images/font_underline.svg" onclick="document.execCommand('underline', false, '');"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Fonte com sublinhado">
                
                    <!-- Lista não ordenada (com o comando execCommand) -->
                    <img src="/public/images/font_list_ul.svg" onclick="document.execCommand('insertUnorderedList', false, null);"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Inserir lista não ordenada">
                
                    <!-- Quebra de linha -->
                    <img src="/public/images/font_break.svg" onclick="document.execCommand('insertHTML', false, '<br>')"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Quebra de linha">
                
                    <!-- Linha horizontal -->
                    <img src="/public/images/font_line.svg" onclick="document.execCommand('insertHorizontalRule', false, null)"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Linha horizontal">
                
                    <!-- Alterar cor do texto -->
                    <img src="/public/images/font_color.svg" onclick="img_onclick(this.parentElement)"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Alterar cor do texto">
                
                    <!-- Alterar para código HTML -->
                    <img src="/public/images/html.svg"
                         onclick="showHTML(this.parentElement.parentElement, 'txt_area'), useToggle(this, 'checked')"
                         data-bs-toggle="tooltip" data-bs-placement="top" title="Alterar código HTML">
                    
                    <!-- Seletor de cor -->
                    <input type="color" id="cor" onchange="changeColorEditable(this.parentElement)" width="10px"
                           style="visibility: hidden;">
                </div>
                
                

        </div><!--Fim editor de texto-->


        <div class="d-flex flex-column btn-group-vertical">
            <button onclick="setContenteditableValue(this)" class="btn btn-outline-secondary  " type="button"
                id="button-addon2" data-bs-toggle="tooltip" data-bs-placement="top" title='Clique aqui para transferir algum texto que foi copiado'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-arrow-right" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                        d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                </svg>
            </button>

            <button onclick="addUpdatedValue(this)" class="btn btn-outline-secondary  " type="button"
                id="button-addon2" data-bs-toggle="tooltip" data-bs-placement="top" title='Copie o texto da fatura no adm partindo da data de vencimento até o valor final atualizado ex: -> 10/10/2024 94,99 97,99 <- e clique no botão para transferir o valor'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="bi bi-currency-dollar" viewBox="0 0 16 16">
                    <path
                        d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z" />
                </svg>
            </button>
        </div>




    </div><!--Fim funcionalidades-->

    <div class="wdg_card_btn_util">
        <div class="input-group input-group-sm mb-3 px-2">
            <button onclick="generateDescription(this)" class="btn btn-outline-dark btn-warning"
                type="button" data-bs-toggle="tooltip" data-bs-placement="top" title='Deve utilizada ao abrir o protocolo. Copia o texto até o ponto final(.)'>Desc. resumida(ADM)</button>
            
            
            <button onclick="generateService(this,'service')" class="btn btn-outline-dark btn-warning"
            type="button" data-bs-toggle="tooltip" data-bs-placement="top" title='Deve ser utilizada para gerar uma descrição completa com todas as informações do editor de texto. UTILIZE PARA GERAR A DESCRIÇÂO DE SERVIÇOS'>Desc. completa(ADM)</button>
        
            <button onclick="GenerateDefaultText(this)" class="btn btn-outline-dark   btn-warning"
                type="button" data-bs-toggle="tooltip" data-bs-placement="top" title='Deve ser utilizada para anexar a informação em visitas técnicas. Gera um script com as informações do formulário e do editor de texto'>
                Atend. ADM
            </button>
            
        </div>  

        <div class="input-group input-group-sm mb-3 px-2">
            <button onclick="GenerateDefaultTextNoTags(this)" class="btn btn-outline-dark text-white btn-danger"
                type="button" data-bs-toggle="tooltip" data-bs-placement="top" title='Deve ser utilizada para anexar a informação no SALES FORCE. Gera um script com as informações do formulário e do editor de texto'>
                Atend. SALES FORCE
            </button>

            <button onclick="salvar_pendencia(this)" class="btn btn-select btn-outline-dark"
                type="button" data-bs-toggle="tooltip" data-bs-placement="top" title='Deixa o protocolo pendente para outra pessoa dar continuidade'>
                Pendente
            </button>
        
            
            <button onclick="populateFields(this)" class="btn btn-select btn-outline-dark enable-chat bt-povoar-chat"
                type="button" data-bs-toggle="tooltip" data-bs-placement="top" title='Transfere as informações do Omini para o formulário'>
                Preencher
            </button>
        </div>


</div>



	
	
	` 


	const generateId = () => {
		const container = document.querySelector('.block-container'); // Corrigido para selecionar um único container
		const cards = container.querySelectorAll('.card-name');
		console.log(cards.length > 0 ? "Existe um card" : "Nenhum card encontrado");
	  
		// Coletar todos os números usados nas classes card_x
		const usedIds = new Set();
	  
		cards.forEach(card => {
		  card.classList.forEach(cls => {
			if (cls.startsWith('card_')) {
			  const idNum = parseInt(cls.replace('card_', ''), 10);
			  if (!isNaN(idNum)) {
				usedIds.add(idNum);
			  }
			}
		  });
		});
	  
		// Encontrar o menor número não usado
		let newId = 1;
		while (usedIds.has(newId)) {
		  newId++;
		}
	  
		return `card_${newId}`;
	  };
	  

	  let global_id = generateId(parent)
	  
	  // Exemplo de uso:
	  div.classList.add('wdg_card');
	  div.id =  global_id; // Certifique-se de passar o elemento pai corretamente
	  div.classList.add('item');
	  div.setAttribute("draggable", "true");
	  div.classList.add("draggableElement");
	  
	// ondragstart="ativateDragStart(event)" ondragend="activateDragend()" onmousemove="activateOnMouseMove(event)


	div.setAttribute("ondragstart","ativateDragStart(event, this)")
	div.setAttribute("ondragend","activateDragend(this)")
	div.setAttribute("onmousemove","activateOnMouseMove(event, this)")


	console.log(parent)


	const cardName = global_id; // Pode ser dinâmico, se preferir
	const container = document.querySelector('.block-container');

	// Cria o span
	const span = document.createElement('span');
	span.textContent = 	'NOME';
	span.classList.add('card-name'); // opcional, se quiser estilizar wdg_card_name_user
	span.classList.add(global_id)

	// Adiciona o evento de clique
	span.addEventListener('click', () => {
		console.log(`Você clicou no card: ${cardName}`);

		// Faz a rolagem suave até o elemento com o ID correspondente
		const targetCard = document.getElementById(cardName);
		if (targetCard) {
			targetCard.scrollIntoView({ behavior: 'smooth', block: 'start' });
		}
	});

	// Adiciona o span ao container
	container.appendChild(span);

	



	div2.innerHTML = `+ ADICIONAR BLOCO`
	div2.classList.add("wdg_add_card")

	div2.onclick = function () {
		addTextEditTags(this.parentElement, this);
	};

	div.innerHTML = divContent

	div.querySelector(".username").setAttribute("card", global_id) //o campo de nome recebe o mesmo id do card
	div.querySelector(".bt-povoar-chat").setAttribute("card", global_id) //o campo de nome recebe o mesmo id do card
	div.querySelector(".wdg_card_name_user").setAttribute("card", global_id)


	div.querySelector(".btn-remove-card").onclick = function() {
		removeSpanFromBlockContainer(global_id);
		removeElement(this.parentElement.parentElement.parentElement)
	  };
	  
	  
	//console.log( div.querySelector(".btn-remove-card")  ) 

	let inputCPF = div.querySelector('.input_for_validade_cpf')
	let cpf_validateIcon = div.querySelector('.cpf_validate') 

	inputCPF.addEventListener('input', function() { 
		this.value = this.value.replace(/\D/g, '');
		console.log(this.value) 
		
		// Verifica se o valor não é apenas espaços e se contém algum número
		if (this.value.trim() !== '' && /\d/.test(this.value)) {
			if (validateCPForCNPJ(this.value)) {
				console.log('é válido');
				cpf_validateIcon.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
				</svg> `

				cpf_validateIcon.classList.add('bg-success')
				cpf_validateIcon.classList.remove('bg-danger')
			} else {
				console.log('é inválido');
				cpf_validateIcon.classList.add('bg-danger')
				cpf_validateIcon.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16">
				<path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
				</svg>
				`
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
	 
	}); 


	
	parent.appendChild(div)
	parent.appendChild(div2)


	if(!chat){
		var conteiner = div.querySelectorAll( ".enable-chat")
		conteiner.forEach(el=>{
			useToggle(el, 'hide_element')
		})
		
	}

	 
    var theme = localStorage.getItem('theme')
	if(theme == 'dark'){
		applyDarkTheme()
	}else{
		applyLightTheme()
	}

     
}



function removeSpanFromBlockContainer(span){
    console.log(span)
    document.querySelector("."+span).remove()
}



function getNewScriptModel(mode, parent){

	console.log(parent)

	const text_area = parent.querySelector(".wdg_text_area") 

	console.log(text_area)
 
	showScriptModelModal( text_area) 
	
	let text_models = JSON.parse(localStorage.getItem('template_text_models'));
	let categories = JSON.parse(localStorage.getItem('template_text_categories'));
	
	console.log(text_models)
	console.log(categories)
}


function showScriptModelModal(text_area) {
    console.log("Criando modal de modelos...");

    document.querySelectorAll('.custom-container, .custom-overlay').forEach(el => el.remove());

    const text_models = JSON.parse(localStorage.getItem('template_text_models')) || [];
    const text_categories = JSON.parse(localStorage.getItem('template_text_categories')) || [];

    const overlay = document.createElement('div');
    overlay.className = 'custom-overlay';
    overlay.style.cssText = `
        position: fixed;
        top: 0; left: 0;
        width: 100vw; height: 100vh;
        background: rgba(0,0,0,0.5);
        z-index: 9998;
    `;

    const container = document.createElement('div');
    container.className = 'custom-container';
    container.style.cssText = `
        position: fixed;
        top: 50%; left: 50%;
        transform: translate(-50%, -50%);
        z-index: 9999;
        max-height: 80vh;
        overflow-y: auto;
        max-width: 800px;
        width: 90%;
        padding-bottom: 20px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    `;

    const header = document.createElement('div');
    header.style.cssText = `
        position: sticky;
        top: 0;
        background: #fff;
        z-index: 10000;
        padding: 20px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 10px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    `;

    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Filtrar por categoria ou palavra-chave...';
    searchInput.style.cssText = `
        flex: 1;
        padding: 10px 12px;
        border: 1px solid #ccc;
        border-radius: 6px;
        font-size: 15px;
    `;

    const close = document.createElement('button');
    close.textContent = 'Fechar';
    close.style.cssText = `
        padding: 10px 16px;
        background: #e74c3c;
        color: #fff;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-weight: bold;
        font-size: 14px;
        transition: background 0.3s;
    `;
    close.onmouseover = () => close.style.background = "#c0392b";
    close.onmouseout = () => close.style.background = "#e74c3c";
    close.onclick = closeModal;

    function closeModal() {
        overlay.remove();
        container.remove();
        document.removeEventListener('keydown', escListener);
    }

    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeModal();
    });

    function escListener(e) {
        if (e.key === 'Escape') closeModal();
    }
    document.addEventListener('keydown', escListener);

    header.appendChild(searchInput);
    header.appendChild(close);

    const popularWrapper = document.createElement('div');
    popularWrapper.style.margin = '20px 20px 30px';

    const popularTitle = document.createElement('h4');
    popularTitle.textContent = 'Mais utilizados recentemente';
    popularTitle.style.margin = '10px 0';

    const popularList = document.createElement('div');
    popularList.style.display = 'flex';
    popularList.style.flexWrap = 'wrap';
    popularList.style.gap = '8px';

    popularWrapper.appendChild(popularTitle);
    popularWrapper.appendChild(popularList);

    const blocksWrapper = document.createElement('div');
    blocksWrapper.style.padding = '0 20px 20px';

    function registerShortcutUsage(shortcut) {
        const usage = JSON.parse(localStorage.getItem('template_shortcut_usage')) || {};
        usage[shortcut] = (usage[shortcut] || 0) + 1;
        localStorage.setItem('template_shortcut_usage', JSON.stringify(usage));
    }

    function renderPopularShortcuts() {
        popularList.innerHTML = '';
        const usage = JSON.parse(localStorage.getItem('template_shortcut_usage')) || {};
        const topShortcuts = Object.entries(usage)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        topShortcuts.forEach(([shortcut]) => {
            const model = text_models.find(m => m.shortcut === shortcut);
            if (!model) return;

            const btn = document.createElement('button');
            btn.textContent = shortcut;
            btn.style.cssText = `
                padding: 6px 12px;
                background: #ddd;
                border: none;
                border-radius: 4px;
                cursor: pointer;
                font-size: 14px;
            `;
            btn.onclick = () => {
                text_area.innerHTML += `${model.model}`;
                text_area.dispatchEvent(new Event('input'));
                text_area.dispatchEvent(new KeyboardEvent('keydown', {
                    key: 'Enter',
                    code: 'Enter',
                    bubbles: true,
                    cancelable: true
                }));
                updateText(text_area.parentElement.parentElement.parentElement, model.shortcut);
                registerShortcutUsage(model.shortcut);
                renderPopularShortcuts();
            };
            popularList.appendChild(btn);
        });
    }

    function renderBlocks(filter = '') {
        blocksWrapper.innerHTML = '';
        const categories = {};

        text_models.forEach(item => {
            if (
                item.category.includes(filter) ||
                item.title.toLowerCase().includes(filter.toLowerCase()) ||
                item.shortcut.toLowerCase().includes(filter.toLowerCase())
            ) {
                if (!categories[item.category]) categories[item.category] = [];
                categories[item.category].push(item);
            }
        });

        if (Object.keys(categories).length === 0) {
            blocksWrapper.innerHTML = '<p>Nenhum modelo encontrado.</p>';
            return;
        }

        Object.entries(categories).forEach(([categoryId, models]) => {
            const categoryObj = text_categories.find(cat => String(cat.id) === String(categoryId));
            const categoryLabel = categoryObj ? categoryObj.name : `Categoria: ${categoryId}`;

            const label = document.createElement('h4');
            label.textContent = `Categoria: ${categoryLabel}`;
            label.style.marginTop = '20px';

            const line = document.createElement('hr');

            const group = document.createElement('div');
            group.style.display = 'grid';
            group.style.gridTemplateColumns = 'repeat(auto-fill, minmax(250px, 1fr))';
            group.style.gap = '12px';
            group.style.marginBottom = '10px';

            models.forEach(model => {
                const btn = document.createElement('button');
                btn.textContent = `${model.shortcut} — ${model.title}`;
                btn.style.cssText = `
                    padding: 10px;
                    border: 1px solid #ccc;
                    border-radius: 6px;
                    background: #f1f1f1;
                    cursor: pointer;
                    text-align: left;
                `;
                btn.onclick = () => {
					const modelHTML = model.model;
					text_area.focus(); // Garante que o campo esteja focado
				
					const selection = window.getSelection();
					const isInsideTextArea = selection.rangeCount > 0 && text_area.contains(selection.getRangeAt(0).startContainer);
				
					if (isInsideTextArea) {
						const range = selection.getRangeAt(0);
						range.deleteContents();
				
						// Cria um fragmento com o HTML interpretado
						const temp = document.createElement('div');
						temp.innerHTML = modelHTML;
				
						const fragment = document.createDocumentFragment();
						while (temp.firstChild) {
							fragment.appendChild(temp.firstChild);
						}
				
						range.insertNode(fragment);
				
						// Move o cursor para depois do último nó inserido
						const lastNode = fragment.lastChild;
						if (lastNode) {
							range.setStartAfter(lastNode);
							range.setEndAfter(lastNode);
							selection.removeAllRanges();
							selection.addRange(range);
						}
					} else {
						// Se não estiver focado ou o cursor não estiver dentro do campo, adiciona ao final
						text_area.innerHTML += modelHTML;
					}
				
					text_area.dispatchEvent(new Event('input'));
					text_area.dispatchEvent(new KeyboardEvent('keydown', {
						key: 'Enter',
						code: 'Enter',
						bubbles: true,
						cancelable: true
					}));
				
					updateText(text_area.parentElement.parentElement.parentElement, model.shortcut);
					registerShortcutUsage(model.shortcut);
					renderPopularShortcuts();
				};
				
				

                group.appendChild(btn);
            });

            blocksWrapper.appendChild(label);
            blocksWrapper.appendChild(group);
            blocksWrapper.appendChild(line);
        });
    }

    searchInput.addEventListener('input', () => renderBlocks(searchInput.value));
    renderBlocks();
    renderPopularShortcuts();

    container.appendChild(header);
    container.appendChild(popularWrapper);
    container.appendChild(blocksWrapper);
    document.body.appendChild(overlay);
    document.body.appendChild(container);
}







function clearClienteName(el){
	var h6 = el.parentElement.parentElement.querySelector('h6')
	h6.innerHTML = 'NOME';
}


function clearClienteCPF(el){
	var el_cpf = el.parentElement.parentElement.parentElement.querySelector('.cpf_validate ')
	el_cpf.classList.remove("bg-danger")
	el_cpf.classList.remove("bg-success")

	el_cpf.innerHTML = `
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question" viewBox="0 0 16 16">
                                <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286m1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94"/>
                            </svg>
			`
}


function distributeElements(event) {
    const container = findClassPerName(event.target, 'showContent2', 'cont_serv');
    const activeElements = Array.from(container.querySelectorAll('.input_active'));
    const col1 = container.querySelector('#col1');
    const col2 = container.querySelector('#col2');

    // Remover elementos existentes nas colunas com tratamento de erro
    try {
        col1.querySelectorAll('.input_active').forEach(element => {
            if (col1.contains(element)) {
                col1.removeChild(element);
            }
        });
        col2.querySelectorAll('.input_active').forEach(element => {
            if (col2.contains(element)) {
                col2.removeChild(element);
            }
        });
    } catch (error) {
        console.error("Erro ao remover elemento: ", error);
    }

    // Ordenar elementos pela ordem do atributo data-order
    activeElements.sort((a, b) => {
        return parseInt(a.getAttribute('data-order')) - parseInt(b.getAttribute('data-order'));
    });

    // Definir o ponto de divisão entre as duas colunas
    const midIndex = Math.ceil(activeElements.length / 2);

    // Preencher a coluna 1
    activeElements.slice(0, midIndex).forEach(element => {
        col1.appendChild(element);
    });

    // Preencher a coluna 2
    activeElements.slice(midIndex).forEach(element => {
        col2.appendChild(element);
    });
}





function createElementChild(parent, conteiner = '', el = 'div', value = '', elClassList = []) {
	var new_element = document.createElement(el)
	new_element.innerHTML = value

	if (elClassList.length > 0) {
		for (var cont = 0; cont < elClassList.length; cont++) {
			new_element.classList.add(elClassList[cont])
		}
	}

	if (conteiner != null && conteiner != '') {
		parent.querySelector(conteiner).appendChild(new_element)
	} else {
		parent.appendChild(new_element)
	}
	// console.log('entrou')
}




function setWdgCardColor(child, color) {
	var parent = child.parentElement
	var username = parent.querySelector(".wdg_card_name_user")
	if (username) {
		username.style.backgroundColor = color
	}
	// parent.style.backgroundColor = clarearCor(color, 100)
	parent.style.boxShadow = '0px 2px 2px ' + color;
}


function setWdgCardColorSpan(card, color) {

	let span_card = document.querySelector("."+card)
	if (span_card) {
		span_card.style.backgroundColor = color
	}
}


// function clarearCor(cor, quantidade) {
//     // Remove o caractere '#' do início da cor
//     cor = cor.slice(1);

//     // Converte a cor hexadecimal para valores RGB
//     var r = parseInt(cor.substring(0, 2), 16);
//     var g = parseInt(cor.substring(2, 4), 16);
//     var b = parseInt(cor.substring(4, 6), 16);

//     // Adiciona a quantidade ao valor de cada componente RGB
//     r = Math.min(r + quantidade, 255);
//     g = Math.min(g + quantidade, 255);
//     b = Math.min(b + quantidade, 255);

//     // Converte os valores RGB de volta para hexadecimal
//     var hex = "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);

//     return hex;
// }


function updateCardUsername(child){
	console.log(child)

	//console.log(findClass(child, "wdg_card") )

	let conteiner = findClass(child, ".wdg_card_header")
	let label = conteiner.querySelector('.wdg_card_name_user')

	let att =  child.getAttribute("card")
	let temp_card = "."+att

	console.log(temp_card)

	
	if(label){
		label.innerHTML = child.value.trim() != '' ? child.value.trim() : 'NOME'

		document.querySelector(temp_card).innerHTML = child.value.trim() != '' ? child.value.trim() : 'NOME';
	}
}





//criar div para alterar cor do nome do usuário
function createDropDown(el) {

	let card  = el.getAttribute('card') //container flutuante

	console.log(card)
	
	if (!el.parentNode.querySelector(".SpanDropDown_div")) {
		var span = document.createElement('span')
		span.classList.add('SpanDropDown')
		span.innerHTML = `
		<div class='SpanDropDown_div' style='background-color: #808080;' onclick="setWdgCardColor(this.parentNode.parentNode, '#808080'), setWdgCardColorSpan('${card}', '#808080')"></div>
		<div class='SpanDropDown_div' style='background-color: #0079FF;' onclick="setWdgCardColor(this.parentNode.parentNode, '#0079FF'), setWdgCardColorSpan('${card}', '#0079FF')"></div>
		<div class='SpanDropDown_div' style='background-color: #F2BE22;' onclick="setWdgCardColor(this.parentNode.parentNode, '#F2BE22'), setWdgCardColorSpan('${card}', '#F2BE22')"></div>
		<div class='SpanDropDown_div' style='background-color: #008000;' onclick="setWdgCardColor(this.parentNode.parentNode, '#008000'), setWdgCardColorSpan('${card}', '#008000')"></div>
		<div class='SpanDropDown_div' style='background-color: #FC2947;' onclick="setWdgCardColor(this.parentNode.parentNode, '#FC2947'), setWdgCardColorSpan('${card}', '#FC2947')"></div>
		<div class='SpanDropDown_div' style='background-color: #ffc0cb;' onclick="setWdgCardColor(this.parentNode.parentNode, '#ffc0cb'), setWdgCardColorSpan('${card}', '#ffc0cb')"></div>
		<div class='SpanDropDown_div' style='background-color: #800080;' onclick="setWdgCardColor(this.parentNode.parentNode, '#800080'), setWdgCardColorSpan('${card}', '#800080')"></div>
		<div class='SpanDropDown_div' style='background-color: #08a4a7;' onclick="setWdgCardColor(this.parentNode.parentNode, '#08a4a7'), setWdgCardColorSpan('${card}', '#08a4a7')"></div>
		<div class='SpanDropDown_div' style='background-color: #F29727;' onclick="setWdgCardColor(this.parentNode.parentNode, '#F29727'), setWdgCardColorSpan('${card}', '#F29727')"></div>
		<svg class='SpanDropDown_div' onclick='removeElementChild(this.parentElement)' xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="black" class=i-x-lg" viewBox="0 0 16 16">
  			<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
		</svg>
	
		`


		el.parentNode.appendChild(span)
		
		setTimeout(function () {
			removeElement(span)
			// console.log('executou')
		}, 2000);

		

	}
}




///editor


function clickedShortcutBtn(parent, el){
	// console.log(parent)
	var oldText = parent.querySelector(".wdg_text_area").innerHTML
	var txt_area = parent.querySelector(".txt_area")
	updateText(parent, el.innerHTML)

	let spanNohthingFontSize = removeSpanWithFontSize( parent.querySelector(".wdg_text_area").innerHTML )
	txt_area.value = removeInlineFontStylesFromHTML(spanNohthingFontSize)
	//txt_area.value = removeSpanWithFontSize( parent.querySelector(".wdg_text_area").innerHTML )

	setTimeout(function() {
		removeElement(el.parentElement)
	}, 100);
}



function findAndReplaceVariableForInputValue(event, id_var) {
	console.log(event)
	console.log(id_var)

    let wdg_text_area = findClassPerName(event.target, "wdg_text_area", "showContent");
    let txt_area = findClassPerName(event.target, "txt_area", "showContent");
    let variaveis = wdg_text_area.querySelectorAll(".highlight_var");

	

    variaveis.forEach(variable => {
        if (id_var == variable.id) {
			console.log(event.target)
			if(event.target.type == "date"){
				if (event.target && event.target.value) {
					var selectedDate = new Date(event.target.value.replace(/-/g, '\/'));
					var formattedDate = selectedDate.toLocaleDateString('pt-BR');
					variable.innerHTML = formattedDate;
            		txt_area.value = wdg_text_area.innerHTML;
				}
			}else{

				if( isFloatNumber(event.target.value)){
					variable.innerHTML = formatarParaBRL(event.target.value);

					console.log(formatarParaBRL(event.target.value) );
				}else{
					variable.innerHTML =  event.target.value;
				}
            	txt_area.value = wdg_text_area.innerHTML;
			}
        }
    });

	variaveis.forEach(variable => {
		if (variable.hasAttribute('expr')) {
			let expr = variable.getAttribute('expr');
			console.log('Valor do atributo expr:', expr);

			// Substituir vírgula por ponto decimal para compatibilidade com eval
			expr = expr.replace(/,/g, '.');

			if(expr){
				let containerServicesInputs = findClassPerName(event.target, "showContent2", "cont_serv");
				let inDataVar = containerServicesInputs.querySelectorAll(".in_data");
	
				// Extrair literais e variáveis (ids dos elementos do formulário) de expr
				let ids = expr.match(/[_a-zA-Z]\w*/g); // Encontra todas as palavras que são possíveis ids
	
				//console.log(ids)

				if (ids) {
					ids.forEach(id => {
						inDataVar.forEach(ind => {
							if (ind.classList.contains(id) && ind.classList.contains("input_active") ) {
								let select = ind.querySelector('select');
								let input = ind.querySelector('input');
								let date = ind.querySelector('date');
								if (select && select.value) {
									let elementValue =  parseFloat(select.value) || 0; // Pega o valor do elemento (convertido para número)
						    		// Substituir o id da variável pelo valor do elemento no expr
						    		expr = expr.replace(new RegExp(`\\b${id}\\b`, 'g'), elementValue);
									console.log(expr +" = "+ eval(expr)) //( 1 * 29,90 ) = 90
								} else if (input && input.value) {
									let elementValue =  parseFloat(input.value) || 0; // Pega o valor do elemento (convertido para número)

									console.log("valor = "  + elementValue)
									// Substituir o id da variável pelo valor do elemento no expr
						    		expr = expr.replace(new RegExp(`\\b${id}\\b`, 'g'), elementValue);
									console.log(expr +" = "+ eval(expr)) // ( 1 * 29,90 + 100 ) = 190
								}
							}
						}); 
					});
		
					// Avaliar a expressão matemática
					try {
						let resultado = eval(expr).toFixed(2); // Calcula a expressão modificada
						console.log(`Resultado da expressão calculada: ${resultado}`);

						let formatado = formatarParaBRL(resultado)
		
						//Adicionar o valor calculado no elemento span correspondente
						variable.innerHTML = formatado;
						txt_area.value = wdg_text_area.innerHTML; // Atualizar o conteúdo da área de texto
					} catch (error) {
						console.error("Erro ao avaliar a expressão: ", error);
					}
				}
			}
	
			
	
			
		}
    });

	
}


function isFloatNumber(valor) {

	console.log("= " + valor)

    // Verifica se o valor pode ser convertido para um número válido
    return !isNaN(parseFloat(valor)) && isFinite(valor);
}

function formatarParaBRL(numero) {
    // Converte o valor para string para preservar a entrada original
    let numeroStr = numero.toString().replace(',', '.'); // Substitui vírgula por ponto, se necessário
    let numeroFloat = parseFloat(numeroStr); // Converte para ponto flutuante

    // Verifica se o valor contém uma parte decimal explícita
    if (numeroStr.includes('.') || numeroStr.includes(',')) {
        // Garante sempre 2 casas decimais no formato brasileiro
        let partes = numeroFloat.toFixed(2).split('.');
        let inteiro = partes[0]; // Parte inteira
        let decimal = partes[1]; // Parte decimal

        // Formata a parte inteira com separadores de milhar
        let inteiroFormatado = inteiro.split('').reverse().join('')
            .replace(/(\d{3}(?!$))/g, "$1.")
            .split('').reverse().join('');

        return `${inteiroFormatado},${decimal}`; // Retorna no formato brasileiro
    }

    // Caso seja um número inteiro sem parte decimal
    return numeroFloat.toString(); // Retorna o número como string
}

// Testar a função
console.log(formatarParaBRL(1234.56)); // Saída: 1.234,56
console.log(formatarParaBRL(100));    // Saída: 100
console.log(formatarParaBRL(123.4));  // Saída: 123,40

console.log(formatarParaBRL('1234,56')); // Saída: 1.234,56
console.log(formatarParaBRL('100,00'));    // Saída: 100
console.log(formatarParaBRL('123,4'));  // Saída: 123,40






function findAndReplaceShortcutWithTextModel(parent, event) {
	var text = parent.querySelector(".wdg_text_area").innerHTML
	var tempShortcut = findHash(text)
	// console.log(tempShortcut)

	// console.log('Palavra com "#" detectada:', tempShortcut);

	if(tempShortcut === null){
		if(parent.querySelector(".editor_shortcuts_container") !== null ){
			parent.querySelector(".editor_shortcuts_container").innerHTML = ''
		}
	}else{
		populateDivShortcuts(parent, tempShortcut) //adiciona os atalhos na div
	}
	
	if (event.key === 'Enter') {
		if (String(tempShortcut) !== null && String(tempShortcut).startsWith('#')) {
			event.preventDefault();
			var oldText = parent.querySelector(".wdg_text_area").innerHTML
			var txt_area = parent.querySelector(".txt_area")
			updateText(parent, tempShortcut)

			let spanNohthingFontSize = removeSpanWithFontSize( parent.querySelector(".wdg_text_area").innerHTML )
			txt_area.value = removeInlineFontStylesFromHTML(spanNohthingFontSize)
		}else{
			console.log("asdsfksg~dkgjç")
			var oldText = parent.querySelector(".wdg_text_area").innerHTML
			var txt_area = parent.querySelector(".txt_area")
			updateText(parent, tempShortcut)

			let spanNohthingFontSize = removeSpanWithFontSize( parent.querySelector(".wdg_text_area").innerHTML )
			txt_area.value = removeInlineFontStylesFromHTML(spanNohthingFontSize)
		}

	}
}


function removeSpanWithFontSize(text) {
	// console.log(text)
	// Regular expression to find the <span> tag with font styles
	var regex = /<span[^>]*?(font-size|font-family)[^>]*?>/g;
	let regex2 = /<span style="font-family: var\(--bs-font-sans-serif\); font-size: 1rem;">(.*?)<\/span>/g;
	
	// Remove the font properties from the <span> tag
	var newText = text.replace(regex, '<span>');
	newText = text.replace(regex2, '$1');
	return newText;
	  
}



function removeInlineFontStylesFromHTML(htmlString) {
	// Cria um elemento temporário para manipular o HTML
	const tempElement = document.createElement('div');
	tempElement.innerHTML = htmlString;
  
	// Função recursiva para remover os estilos inline
	function cleanElement(element) {
	  // Remove os estilos que alteram fontes, tamanhos e cores
	  element.style.fontFamily = '';
	  element.style.fontSize = '';
	  element.style.color = '';
	  element.style.removeProperty('font-weight');
	  element.style.removeProperty('font-style');
  
	  // Caso específico para remover a tag <font> mas manter o texto
	  if (element.tagName === 'FONT') {
		const parent = element.parentNode;
		while (element.firstChild) {
		  parent.insertBefore(element.firstChild, element);
		}
		parent.removeChild(element);
	  }
  
	  // Percorre todos os filhos do elemento atual
	  Array.from(element.children).forEach(child => cleanElement(child));
	}
  
	// Inicia a limpeza pelo contêiner temporário
	cleanElement(tempElement);
  
	// Retorna o HTML modificado como string
	return tempElement.innerHTML;
  }
  


  function removeInlineFontStylesFromHTMLToDesk(htmlString) {
	const tempElement = document.createElement('div');
	tempElement.innerHTML = htmlString;
  
	function cleanAndConvert(element) {
	  let result = '';
  
	  for (let i = 0; i < element.childNodes.length; i++) {
		const node = element.childNodes[i];
  
		if (node.nodeType === Node.TEXT_NODE) {
		  const text = node.textContent.replace(/\u00A0/g, ' ').trim();
		  if (text) {
			result += text;
		  }
		} else if (node.nodeType === Node.ELEMENT_NODE) {
		  const tag = node.tagName.toLowerCase();
  
		  // Remove estilos inline
		  node.removeAttribute('style');
  
		  // Ignora a tag <span>, mas mantém o conteúdo
		  if (tag === 'span') {
			result += cleanAndConvert(node);
			continue;
		  }
  
		  // Remove <font> mas mantém o conteúdo
		  if (tag === 'font') {
			result += cleanAndConvert(node);
			continue;
		  }
  
		  // Linha horizontal
		  if (tag === 'hr') {
			result += '\n━━━━━━━━━━━━━━━━━━━━━━━\n';
			continue;
		  }
  
		  // Quebras explícitas
		  if (tag === 'br') {
			result += '\n';
			continue;
		  }
  
		  // Elementos de bloco
		  if (tag === 'div' || tag === 'p') {
			const inner = cleanAndConvert(node).trim();
			result += inner + '\n';
			continue;
		  }
  
		  // Outros elementos
		  result += cleanAndConvert(node);
		}
	  }
  
	  return result;
	}
  
	// Normaliza múltiplas quebras e remove linhas vazias
	return cleanAndConvert(tempElement)
	  .split('\n')
	  .map(line => line.trim())
	  .filter(line => line.length > 0)
	  .join('\n');
  }
  
  




//${today}

function replaceVariable(novoTexto, el = null) {
    let variaveis = extractWordsVariables(novoTexto);
    
    // Verifica se el e seus ancestrais são válidos
    if (!el || !el.parentElement || !el.parentElement.parentElement) {
        return novoTexto;
    }
    
    let containerServicesInputs = el.parentElement.parentElement.querySelector(".cont_serv");
    
    // Verifica se containerServicesInputs é válido
    if (!containerServicesInputs) {
        return novoTexto;
    }
    
    let inDataVar = containerServicesInputs.querySelectorAll(".in_data");

    // Verifica se inDataVar existe e se tem itens
    if (!variaveis || !inDataVar || inDataVar.length === 0) {
        return novoTexto;
    }

    const variaveisHTML = [
        { chave: "data_dia_mes", valor: `${today}` },
        { chave: "data_dia_mes_ano", valor: `${today_day_month_year}` },
        { chave: "mora_no_endereco", valor: "mora_no_endereco" },
        { chave: "rua", valor: "rua" },
        { chave: "numero", valor: "numero" },
        { chave: "bairro", valor: "bairro" },
        { chave: "cidade", valor: "cidade" },
        { chave: "cep", valor: "cep" },
		{ chave: "tipo_moradia", valor: "tipo_moradia"},
        { chave: "ponto_de_referencia", valor: "ponto_de_referencia" },
        { chave: "melhor_turno", valor: "melhor_turno" },
        { chave: "confirmado_disponibilidade", valor: "confirmado_disponibilidade" },
        { chave: "telefone1", valor: "telefone1" },
        { chave: "qtd_p_adicional", valor: "qtd_p_adicional" },
        { chave: "tipo_p_adicional", valor: "tipo_p_adicional" },
        { chave: "plano_atual_cliente", valor: "plano_atual_cliente" },
        { chave: "valor_plano_atual_cliente", valor: "valor_plano_atual_cliente" },
        { chave: "qtd_p_adicional_vs_valor", valor: "qtd_p_adicional_vs_valor" },
        { chave: "total_qtd_x_value", valor: "total_qtd_x_value" },
		{ chave: "data1", valor: "data1" },
		{ chave: "data2", valor: "data2" },
		{ chave: "data3", valor: "data3" },
		{ chave: "turno_agendado", valor: "turno_agendado" },
		{ chave: "disponibilidade_geral", valor: "disponibilidade_geral" },
		{ chave: "configurar_roteador", valor: "configurar_roteador" }
    ];

    // Armazenar os valores das variáveis em um objeto para fácil acesso
    const valoresVariaveis = {};

    variaveis.forEach(varName => {
        inDataVar.forEach(ind => {
            if (ind.classList.contains(varName) && ind.classList.contains("input_active")) {
                let select = ind.querySelector('select');
                let input = ind.querySelector('input');
				let date = ind.querySelector('date');
                if (select && select.value) {
                    variaveisHTML.find(item => item.chave === varName).valor = select.value;
                } else if (input && input.value) {
                    variaveisHTML.find(item => item.chave === varName).valor = isFloatNumber(input.value) ? formatarParaBRL(input.value) : input.value;
                }else if (date && date.value) {
					var selectedDate = new Date(date.value.replace(/-/g, '\/'));
					var formattedDate = selectedDate.toLocaleDateString('pt-BR');
					console.log(formattedDate)
                    variaveisHTML.find(item => item.chave === varName).valor = formattedDate;
                }
            }
        });

        // Armazenar o valor da variável
        const varItem = variaveisHTML.find(item => item.chave === varName);
        // if (varItem) {
		// 	console.log(varItem)
        //     valoresVariaveis[varItem.chave] = varItem.valor;
        // }
		if (varItem) {
			let valor = varItem.valor;
			// Verificar se o valor está em um formato de data diferente de dd/mm/aaaa
			let dateRegex = /(\d{4}[-\/]\d{2}[-\/]\d{2}|\d{2}[-\/]\d{2}[-\/]\d{4})/;
			if (dateRegex.test(valor)) {
				let selectedDate = new Date(valor.replace(/-/g, '\/'));
				let formattedDate = selectedDate.toLocaleDateString('pt-BR');
				varItem.valor = formattedDate;
			}
			valoresVariaveis[varItem.chave] = varItem.valor;
		}
    });

	// console.log(variaveisHTML)

    // Substituir variáveis no texto
    novoTexto = novoTexto.replace(/{{\s*(\w+)\s*(?:\.\s*(.*?))?\s*}}/g, (match, varName, expr) => {
        // Verifica se a variável está no variaveisHTML
        let varItem = variaveisHTML.find(item => item.chave === varName);
        

        if (!varItem) {
            // Se a variável não existir, cria um objeto temporário
            varItem = { chave: varName, valor: varName }; // Valor padrão é o nome da variável
        }

        if (expr) {
            // Extrai a expressão matemática, por exemplo "qtd_p_adicional * 29.90"
            let exprVars = expr.match(/(\w+)/g); // Captura todas as variáveis na expressão
            let evaluatedValue;

            if (exprVars) {
                // Substitui as variáveis na expressão pelos seus valores
                let evaluatedExpr = expr;
                exprVars.forEach(varNameInExpr => {
                    // Obtém o valor da variável usando o ID da span correspondente
                    const varValue = valoresVariaveis[varNameInExpr.trim()];
                    if (varValue) {
                        evaluatedExpr = evaluatedExpr.replace(new RegExp(varNameInExpr, 'g'), varValue);
                    }
                });

                try {
                    // Avalia a expressão matemática e armazena o resultado
                    evaluatedValue = eval(evaluatedExpr.replace(',', '.')); // Converte vírgula para ponto para avaliação
					evaluatedValue = evaluatedValue.toFixed(2);
                } catch (e) {
                    console.error("Erro na avaliação da expressão:", e);
                    evaluatedValue = 'Erro';
                }
            }

            // Se houver expressão, substitui pelo span com o valor avaliado
            return `<span id='${varItem.chave}' class='var_${varItem.chave} highlight_var' expr='${expr.trim()}'>${evaluatedValue}</span>`;
        } else {
            // Se não houver expressão, substitui pelo span padrão
			// console.log(varItem.chave)
            return `<span id='${varItem.chave}' class='var_${varItem.chave} highlight_var'>${varItem.valor}</span>`;
        }
    });

	console.log(novoTexto)

    return novoTexto;
}



function replaceHash(oldText, novoTexto) {
	// Cria uma expressão regular que procura por uma palavra que começa com #
	var reg = /#\w+\b/g;
	// Retorna o texto antigo com a palavra substituída pelo novo texto
	return oldText.replace(reg, novoTexto);
}



function updateText(el, tempShortcut) {
	var wdg_text_area = el.querySelector(".wdg_text_area")
	let spanNohthingFontSize = removeSpanWithFontSize( el.querySelector(".wdg_text_area").innerHTML )
	var oldText =  removeInlineFontStylesFromHTML(spanNohthingFontSize)
	var atalho = tempShortcut

	var posicaoDoCursor = getCursorPosition(wdg_text_area)
	// console.log('A posição do cursor é: ' + posicaoDoCursor);
  
	txtModels.forEach(anwer_models => {
		// console.log(anwer_models.shortcut)
		if (anwer_models.shortcut == atalho) {
			var novoTexto = anwer_models.model;
			var textoNovo = replaceHash(oldText, novoTexto);
			// console.log(textoNovo)
			textoNovo = replaceVariable(textoNovo, el)
			// console.log(textoNovo)

			let spanNohthingFontSize =  removeSpanWithFontSize(textoNovo)
			el.querySelector(".wdg_text_area").innerHTML = removeInlineFontStylesFromHTML(spanNohthingFontSize)  // cliente relata<div>falta de conexão</div>	
			var novaPosicaoDoCursor = novoTexto.length; // Altere isso para a posição desejada
  			setCursorPositionToEnd(wdg_text_area)
		
			  setTimeout(function() {
				wdg_text_area.parentElement.querySelector('.editor_div_shortcuts').remove()
			}, 100);
		}
	})
}



function extractWordsVariables(text) {
    const regex = /{{(.*?)}}/g;
    const matches = [];
    let match;

    while ((match = regex.exec(text)) !== null) {
        matches.push(match[1]);
    }

    return matches;
}


function findHash(texto) {
	// Cria uma expressão regular que procura por uma palavra que começa com #
	var reg = /#\w+\b/g;
	// Encontra todas as palavras que correspondem à expressão regular
	var palavras = texto.match(reg);
	// Exibe cada palavra no console
	//for (var i = 0; i < palavras.length; i++) {
	//   console.log(palavras);
	//}
	return palavras
}


// editandoo
function populateDivShortcuts(parent, tempShortcut){
	console.log(txtModels)
	let editor_shortcuts_container = parent.querySelector(".editor_shortcuts_container")
	editor_shortcuts_container.innerHTML = ''
	let divContainer = document.createElement('div');
	divContainer.classList.add("editor_div_shortcuts");
	
	let isDefaultTextModels = localStorage.getItem('default_script_models')

	let answer_models = []; // guardará os atalhos que correspondem ao que foi digitado

	let atalhosFiltrados = Object.keys(txtModels).filter(function(key) {
		let isMatch = txtModels[key]['shortcut'].startsWith(tempShortcut);
		if (isMatch) {
			answer_models.push(txtModels[key]);
		}
		return isMatch;
	});

	// console.log(answer_models);  // isto irá imprimir os atalhos que começam com o texto digitado
	answer_models.forEach(atalho => {
		// console.log(answer_models)
		if(atalho['scope'] == 'global' && isDefaultTextModels == 'enable' ){
			divContainer.innerHTML += `<span class="btn-span-sm bg-success" onclick="clickedShortcutBtn(this.parentElement.parentElement.parentElement, this)" data-bs-toggle="tooltip" data-bs-placement="top" title='${atalho['model']}'>${atalho['shortcut']}</span>`;
		}if(atalho['scope'] == 'local' ){
			divContainer.innerHTML += `<span class="btn-span-sm bg-primary" onclick="clickedShortcutBtn(this.parentElement.parentElement.parentElement, this)" data-bs-toggle="tooltip" data-bs-placement="top" title='${atalho['model']}'>${atalho['shortcut']}</span>`;
			//divContainer.innerHTML += `<span class="btn-span-sm" onclick="clickedShortcutBtn(this.parentElement.parentElement.parentElement, this)">${atalho['shortcut']}</span>`;
		}
	});
	
	editor_shortcuts_container.appendChild(divContainer); 
}


function getCursorPosition(editableDiv) {
    const selection = window.getSelection();

    // Verifica se há uma seleção válida
    if (!selection || selection.rangeCount === 0) return 0;

    const range = selection.getRangeAt(0);

    const preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(editableDiv);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);

    const start = preSelectionRange.toString().length;
    return start;
}

  

  function setCursorPosition(editableDiv, pos) {
	var range = document.createRange();
	var sel = window.getSelection();
  
	range.setStart(editableDiv.firstChild, pos);
	range.collapse(true);
  
	sel.removeAllRanges();
	sel.addRange(range);
  }

  function setCursorPositionToEnd(editableDiv) {
	var range = document.createRange();
	var sel = window.getSelection();
  
	range.selectNodeContents(editableDiv);
	range.collapse(false); // Falso aqui significa que o range terminará no final do conteúdo
  
	sel.removeAllRanges();
	sel.addRange(range);
  }
  
  



//função para copiar as informações dos formulário e gerar o texto padrão
function GenerateDefaultText(child) {
    let conteiner = findClass(child, ".showContent");
	//console.log(conteiner)
    let Objs = fillInFields(conteiner);

	console.log(Objs)

    let inputValues = {};
    let textAreaValues = {};
    let checkboxValues = {};

    const inputClasses = ['username', 'number_chat_protocol', 'phone_number', 'erp_protocol', 'base', 'agendamento', 'disponibilidadeGeral', 'dataDeAgendamento', 'pontoDeReferencia'];
    const textAreaClasses = ['txt_area'];
    const checkboxClasses = ['check-addon'];

    Objs.inputs.forEach(input => {
        let className = inputClasses.find(cls => input.classList.contains(cls));
        if (className) {
            inputValues[className] = input.value;
        }
    });

    Objs.textareas.forEach(textArea => {
        let className = textAreaClasses.find(cls => textArea.classList.contains(cls));
        if (className) {
            let cleaned = removeInlineFontStylesFromHTML(removeSpanWithFontSize(textArea.value));
            textAreaValues[className] = cleaned;
        }
    });

    Objs.checkboxs.forEach(checkbox => {
		console.log(checkbox.checked)
        let className = checkboxClasses.find(cls => checkbox.classList.contains(cls));
        if (className) {
            checkboxValues[checkbox.value] = checkbox.checked
			 
        }
    });

    generateChatModel([inputValues, textAreaValues, checkboxValues], child);
}



function GenerateDefaultTextNoTags(child) {
    let conteiner = findClass(child, ".showContent");
    let Objs = fillInFields(conteiner);

    let inputValues = {};
    let textAreaValues = {};
    let checkboxValues = {};

    const inputClasses = ['username', 'number_chat_protocol', 'phone_number', 'erp_protocol', 'base', 'agendamento', 'disponibilidadeGeral', 'dataDeAgendamento', 'pontoDeReferencia'];
    const textAreaClasses = ['txt_area'];
    const checkboxClasses = ['check-addon'];

    Objs.inputs.forEach(input => {
        let className = inputClasses.find(cls => input.classList.contains(cls));
        if (className) {
            inputValues[className] = input.value;
        }
    });

    Objs.textareas.forEach(textArea => {
        let className = textAreaClasses.find(cls => textArea.classList.contains(cls));
        if (className) {
            let cleaned = removeInlineFontStylesFromHTML(removeSpanWithFontSize(textArea.value));
            textAreaValues[className] = cleaned;
        }
    });

    Objs.checkboxs.forEach(checkbox => {
        console.log(checkbox.checked);
        let className = checkboxClasses.find(cls => checkbox.classList.contains(cls));
        if (className) {
            checkboxValues[checkbox.value] = checkbox.checked;
        }
    });

    generateChatModelNoTags([inputValues, textAreaValues, checkboxValues], child);
}





function generateChatModel(values = [inputs, textarea, checkboxes], child) {
	console.log(values)

	let addOn = "";
	let mensagens = [];

	if (values[2].maiorIdade) {
		mensagens.push("Cliente ciente de que deve haver uma pessoa maior de idade.");
	}
	if (values[2].garantia30) {
		mensagens.push("Garantia de Instalação (30 dias).");
	}
	if (values[2].empresa) {
		mensagens.push("Cliente empresarial.");
	}

	if (mensagens.length > 0) {
		addOn += "<hr>" + mensagens.join("<br>") + "<hr>";
	}




	let text_model
	if (chat) {
		//console.log(values[0].number_chat_protocol)
		if(
			values[0].number_chat_protocol.length == 0 || values[0].base == 0  || 
			values[0].base == 0  || values[0].username == 0  ||values[0].phone_number == 0  || values[1].txt_area == 0 
			){
			showNotification('Algum campo obrigatório está vazio', 'bg-danger')
		}else{
			if(values[0].agendamento != null && values[0].agendamento != ""){
				var selectedDate = new Date(values[0].dataDeAgendamento.replace(/-/g, '\/'));
				var formattedDate = selectedDate.toLocaleDateString('pt-BR');
				text_model = `<b><font color=blue>Protocolo do Chat: ${values[0].number_chat_protocol} </b></font><hr> <b><font color=blue>${values[0].base} </b></font><hr> ${today}→ Atendimento realizado com Sr(a). ${values[0].username} via chat no número ${values[0].phone_number}. <br> ${values[1].txt_area}<br>${addOn} <b><br>Ponto de referência:</b> ${values[0].pontoDeReferencia}.<br><b>Agendamento:</b> ${values[0].agendamento} - ${formattedDate}<br><b>Disponibilidade:</b> ${values[0].disponibilidadeGeral}` 
				setTransferAreaValue( text_model, child.parentNode.parentElement.parentElement) 
			}else{
				text_model = `<b><font color=blue>Protocolo do Chat: ${values[0].number_chat_protocol} </b></font><hr> <b><font color=blue>${values[0].base} </b></font><hr> ${today}→ Atendimento realizado com Sr(a). ${values[0].username} via chat no número ${values[0].phone_number}. <br> ${values[1].txt_area}${addOn} `
				setTransferAreaValue( text_model, child.parentNode.parentElement.parentElement) 
			}
			
		}
	} else {
		if(values[0].username == 0 || values[0].phone_number  == 0 || values[1].txt_area == 0){
			showNotification('Algum campo obrigatório está vazio', 'bg-danger')
		}else{
			if(values[0].agendamento != null && values[0].agendamento != ""){
				var selectedDate = new Date(values[0].dataDeAgendamento.replace(/-/g, '\/'));
				var formattedDate = selectedDate.toLocaleDateString('pt-BR');
				text_model = `<hr> <b><font color=blue>${values[0].base} </b></font><hr> ${today}→ Atendimento realizado com Sr(a). ${values[0].username} no número ${values[0].phone_number}. <br> ${values[1].txt_area}<br>${addOn} <b><br>Ponto de referência:</b> ${values[0].pontoDeReferencia}.<br><b>Agendamento:</b> ${values[0].agendamento} - ${formattedDate}<br><b>Disponibilidade:</b> ${values[0].disponibilidadeGeral}`
				setTransferAreaValue( text_model, child.parentNode.parentElement.parentElement) 
			}else{
				text_model = `<hr> <b><font color=blue>${values[0].base} </b></font><hr> ${today}→ Atendimento realizado com Sr(a). ${values[0].username} no número ${values[0].phone_number}. <br> ${values[1].txt_area}${addOn}`
				setTransferAreaValue( text_model, child.parentNode.parentElement.parentElement) 
			}
			
		}
		
	}
	// console.log(text_model)
}


function generateChatModelNoTags(values = [inputs, textarea, checkboxes], child) {
	// console.log(values)
	


	let addOn = "";
	let mensagens = [];

	if (values[2].maiorIdade) {
		mensagens.push("Cliente ciente de que deve haver uma pessoa maior de idade.");
	}
	if (values[2].garantia30) {
		mensagens.push("Garantia de Instalação (30 dias).");
	}
	if (values[2].empresa) {
		mensagens.push("Cliente empresarial.");
	}

	if (mensagens.length > 0) {
		addOn += "<hr>" + mensagens.join("<br>") + "<hr>";
	}
	

	let text_model
	if (chat) {
		console.log(values[0].number_chat_protocol)
		if(
			values[0].number_chat_protocol.length == 0 || values[0].base == 0  || 
			values[0].base == 0  || values[0].username == 0  ||values[0].phone_number == 0  || values[1].txt_area == 0 
			){
			showNotification('Algum campo obrigatório está vazio', 'bg-danger')
		}else{
			if(values[0].agendamento != null && values[0].agendamento != ""){
				var selectedDate = new Date(values[0].dataDeAgendamento.replace(/-/g, '\/'));
				var formattedDate = selectedDate.toLocaleDateString('pt-BR');
				text_model = `Cliente: ${values[0].username} <br>Canal: Chat - nº${values[0].phone_number} <hr>➔ ${values[1].txt_area}.<br>${addOn}Ponto de referência: ${values[0].pontoDeReferencia}<br>Agendamento: ${values[0].agendamento} - ${formattedDate}<br>Disponibilidade: ${values[0].disponibilidadeGeral}<hr>ID Chat: ${values[0].number_chat_protocol}` 
				
				textNoTags = removeInlineFontStylesFromHTMLToDesk (text_model);
				setTransferAreaValue(textNoTags, child.parentNode.parentElement.parentElement); 

			}else{
				text_model = `Cliente: ${values[0].username} <br>Canal: Chat - nº${values[0].phone_number} <hr>➔ ${values[1].txt_area}${addOn}<hr>ID Chat: ${values[0].number_chat_protocol}`
				
				textNoTags = removeInlineFontStylesFromHTMLToDesk (text_model);

				setTransferAreaValue( textNoTags, child.parentNode.parentElement.parentElement) 
			}
			
		}
	} else {
		if(values[0].username == 0 || values[0].phone_number  == 0 || values[1].txt_area == 0){
			showNotification('Algum campo obrigatório está vazio', 'bg-danger')
		}else{
			if(values[0].agendamento != null && values[0].agendamento != ""){
				var selectedDate = new Date(values[0].dataDeAgendamento.replace(/-/g, '\/'));
				var formattedDate = selectedDate.toLocaleDateString('pt-BR');
				text_model = `Cliente: ${values[0].username} <br>Canal: Telefone - nº${values[0].phone_number} <hr>➔ ${values[1].txt_area}<br>Ponto de referência: ${values[0].pontoDeReferencia}<br>Agendamento: ${values[0].agendamento} - ${formattedDate}.<br>Disponibilidade: ${values[0].disponibilidadeGeral}` 
				
				textNoTags = removeInlineFontStylesFromHTMLToDesk (text_model);

				setTransferAreaValue( textNoTags, child.parentNode.parentElement.parentElement) 

			}else{
				text_model = `Cliente: ${values[0].username} <br>Canal: Telefone - nº${values[0].phone_number}. <hr>➔ ${values[1].txt_area}`
				
				
				textNoTags = removeInlineFontStylesFromHTMLToDesk (text_model);

				setTransferAreaValue( textNoTags, child.parentNode.parentElement.parentElement) 
			}
			
		}
		
	}
	// console.log(text_model)
}






function populateFields(child) {
	let conteiner = findClass(child, ".showContent")
	let username = conteiner.querySelector('.username')
	let number_chat_protocol = conteiner.querySelector('.number_chat_protocol')
	let phone_number = conteiner.querySelector('.phone_number')
	let cpf_number = conteiner.querySelector('.cpf')
	let cpf_span_check  = conteiner.querySelector('.cpf_validate')
	
	navigator.clipboard.readText()
		.then(function (data) {
			console.log("Texto da área de transferência:", data);
		
			// Remove quebras de linha
			data = data.replace(/(\r\n|\n|\r)/gm, "");
			
			console.log("Texto corrigido:", data);

			var name = data.search("Nome:");
			var phone = data.search("Telefone:");
			var phoneEnd = data.search("E-mail:") !== -1 ? data.search("E-mail:") : (data.search("Id Cliente:") !== -1 ? data.search("Id Cliente:") : data.length);
			var chat_protocol = data.search("Número de protocolo:");
			var classificacao = data.search("Classificação:");
			var cpf = data.search("CPF Cliente:") + 12;
			var cpfEnd = data.search("Transferido por:") !== -1 ? data.search("Transferido por:") : data.length;
			
			username.value = (data.substring(name + 6, phone)).replace("?", "");
			number_chat_protocol.value = (data.substring(chat_protocol + 20, classificacao)).replace(/[^0-9]/g, '');
			phone_number.value = (data.substring(phone + 9, phoneEnd)).replace(/[^0-9]/g, '').replace(/^55/, '');
			
			// Verificação de existência e validade do CPF
			var cpfRaw = data.substring(cpf, cpfEnd).replace(/[^0-9]/g, '');
			if (cpfRaw.length === 11 && validateCPForCNPJ(cpfRaw)) {
				cpf_number.value = cpfRaw;
				console.log('CPF válido');
				cpf_span_check.innerHTML = ` <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
				<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
				</svg> `
				cpf_span_check.classList.add('bg-success');
				cpf_span_check.classList.remove('bg-danger');
			} else if (cpfRaw.length === 11) {
				cpf_number.value = cpfRaw;
				console.log('CPF inválido');
				cpf_span_check.classList.add('bg-danger');
				cpf_span_check.innerHTML = `
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-octagon-fill" viewBox="0 0 16 16">
				<path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353zM8 4c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995A.905.905 0 0 1 8 4m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
				</svg>
				`;
			}
		
			buscar_pendencia(child);
			
			conteiner = findClass(child, ".wdg_card_header");
			let label = conteiner.querySelector('.wdg_card_name_user');

			let att =  child.getAttribute("card")
			let temp_card = "."+att

			
			if (label) {
				label.innerHTML = child.value.trim();
				document.querySelector(temp_card).innerHTML = child.value.trim();

			}
		
			if (label) {
				label.innerHTML = username.value.trim() !== '' ? username.value.trim() : 'NOME';

				document.querySelector(temp_card).innerHTML = username.value.trim() !== '' ? username.value.trim() : 'NOME';
			}
		})
	
		.catch(function (error) {
			console.error("Erro ao ler a área de transferência:", error);
		});
}






function generateDescription(child){
	let conteiner = findClass(child, ".showContent")
	var txt_area = conteiner.querySelector(".txt_area")
	let number_chat_protocol = conteiner.querySelector('.number_chat_protocol')
  
    let txt_model= txt_area.value  
    let txt_length = txt_model.length    
    
    let posi = 0
    var description = ""
    for (var i = 0; i < txt_length; i++){                     
        if (txt_model[i]== "."){
            posi = i  
            break
        }
        description = description + txt_model[i]                 
    }        
    
	if(chat){
		if(
			number_chat_protocol.value == 0 
			){
			showNotification('Algum campo obrigatório está vazio', 'bg-danger')
		}else{
			txt_model= `${description}<hr><b><font color=blue> Protocolo do Chat: ${number_chat_protocol.value} </b></font><hr>`
			setTransferAreaValue(txt_model, child.parentNode.parentElement.parentElement) 
		}
		
	}else{
		if( description == 0 ){
			showNotification('Algum campo obrigatório está vazio', 'bg-danger')
		}else{
			txt_model= `${description}<hr>` 
			setTransferAreaValue(txt_model, child.parentNode.parentElement.parentElement) 
		}
		
	}
	
	// console.log(txt_model)
}

function generateService(child, type = 'description'){
	let conteiner = findClass(child, ".showContent")
	var txt_area = conteiner.querySelector(".txt_area")
	let number_chat_protocol = conteiner.querySelector('.number_chat_protocol')
  
    let txt_model= removeInlineFontStylesFromHTML(txt_area.value) 
    let txt_length = txt_model.length 
	
	let posi = 0
    var description = ""
    
	
	

	if(type == 'description'){
		for (var i = 0; i < txt_length; i++){                     
			if (txt_model[i]== "."){
				posi = i  
				break
			}
			description = description + txt_model[i]                 
		}    
	}else{
		description =  txt_model   
	}
    
	
    
	if(chat){
		if(
			number_chat_protocol.value == 0 
			){
			showNotification('Algum campo obrigatório está vazio', 'bg-danger')
		}else{
			txt_model= `${description}<hr><b><font color=blue> Protocolo do Chat: ${number_chat_protocol.value} </b></font><hr>`
			setTransferAreaValue(txt_model, child.parentNode.parentElement.parentElement) 
		}
		
	}else{
		if( description == 0 ){
			showNotification('Algum campo obrigatório está vazio', 'bg-danger')
		}else{
			txt_model= `${description}<hr>` 
			setTransferAreaValue(txt_model, child.parentNode.parentElement.parentElement) 
		}
		
	}
	
	// console.log(txt_model)
}


//suggestions 
function setSugestion(child){
	var conteiner = findClass(child, ".showContent");
	const url = "/create_suggestion";
	const method = "POST";
	const data = new URLSearchParams();
	data.append("title",  conteiner.querySelector('.title').value.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "").toLowerCase().trim() );
	data.append("type",  conteiner.querySelector('.selectSuggestion').value );
	data.append("suggestion", conteiner.querySelector(".suggestion").value.trim());

	console.log( conteiner.querySelector('.selectSuggestion').value )


	fetchAPI(url, method, data).then(value => {
		console.log(value)
	  if(value == true){
		showNotification('Cadastrada com sucesso!', 'bg-success')
		getSuggestions(child)
	  }else{
		showNotification('Erro ao reportar!', 'bg-danger')
	  }
	});	
}


function getSuggestions(child){
	// console.log('chamou')
	let conteiner = findClass(child, ".wdg_card");
	const url = "/read_suggestion";
	const method = "POST";
	const data = new URLSearchParams();
	fetchAPI(url, method, data).then(value => {
		// console.log(value)
		populateSuggestions(conteiner, value)
	});
}



function populateSuggestions(conteiner, values) {
    var conteiner_suggestions = document.querySelector('.suggestion_conteiner');
    if (!conteiner) {
        return;
    }
    conteiner_suggestions.innerHTML = '';
    if (values != null) {
        values.forEach(el => {
            // Botão de excluir (apenas se o usuário for o dono da sugestão)
            if (el.user_id == el.user_id_session) {
                var del = `<button type="button" onclick="deleteSuggestion(this, ${el.id})" class="btn btn-outline-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a 1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a 1 1 0 0 1 1 1h3.5a 1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a 1 1 0 0 0 1 1h6a 1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                    </svg>
                </button>`;
            } else {
                del = '';
            }

            // Resposta do administrador (somente para admins/devs)
            let admin;
            if (el.admin_response != "" && el.admin_response != null) {
                if (el.user_id_role === 'admin' || el.user_id_role === 'dev') {
                    admin = `
                    <div class="admin-response">
                        <h6 class="card-subtitle mb-2 text-muted">Resposta do Administrador</h6>
                        <p class="card-text" id="adminResponseText_${el.id}">${el.admin_response}</p>
                        <button type="button" onclick="editAdminResponse(${el.id})" class="btn btn-warning">Editar Resposta</button>
                    </div>
                    `;
                } else {
                    admin = `
                    <div class="admin-response">
                        <h6 class="card-subtitle mb-2 text-muted">Resposta do Administrador</h6>
                        <p class="card-text">${el.admin_response}</p>
                    </div>
                    `;
                }
            } else {
                if (el.user_id_role === 'admin' || el.user_id_role === 'dev') {
                    admin = `
                    <div class="admin-response mt-3">
                        <textarea class="form-control mb-2" placeholder="Escreva sua resposta aqui..." id="adminResponse_${el.id}"></textarea>
                        <button type="button" onclick="saveAdminResponse(${el.id})" class="btn btn-primary">Salvar Resposta</button>
                    </div>
                    `;
                } else {
                    admin = '';
                }
            }

            // Criação do card da sugestão
            let div = document.createElement('div');
            div.classList.add('container', 'mt-4');
            div.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${capitalizeFirstLetter(el.title)}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${formatName(el.first_name + el.last_name)}</h6>
                    <p class="card-text">${el.suggestion}</p>

                    <!-- Data e Hora -->
                    <div class="mb-2">
                        <small class="text-muted">
                        Data: ${el.date}, Hora: ${el.time}
                        </small>
                    </div>

                    <!-- Reações dos Outros Usuários -->
                    <div class="mb-3">
                        <div class="btn-group" role="group" aria-label="Basic outlined example">
                            <button type="button" onclick="updateEmotion('emotion1', this, ${el.id})" class="btn btn-outline-secondary position-relative">
                                😀 <span class="emotion1 position-absolute top-0 start-70 translate-middle badge rounded-pill bg-primary">${el.emotion1}</span>
                            </button>
                            <button type="button" onclick="updateEmotion('emotion2', this, ${el.id})" class="btn btn-outline-secondary">
                                ❤️ <span class="emotion2 position-absolute top-0 start-70 translate-middle badge rounded-pill bg-danger">${el.emotion2}</span>
                            </button>
                            <button type="button" onclick="updateEmotion('emotion3', this, ${el.id})" class="btn btn-outline-secondary">
                                😲 <span class="emotion3 position-absolute top-0 start-70 translate-middle badge rounded-pill bg-warning">${el.emotion3}</span>
                            </button>
                            ${del}
                        </div>
                    </div>

                    <!-- Resposta do Administrador -->
                    ${admin}
                </div>
            </div>
            `;
            conteiner_suggestions.appendChild(div);
        });
    }
}

// Funções saveAdminResponse e editAdminResponse mantidas iguais (anteriormente fornecidas)

// Função para salvar a resposta do administrador
function saveAdminResponse(id) {
    const responseField = document.getElementById(`adminResponse_${id}`);
    const responseText = responseField.value;

	console.log(id)

    if (responseText.trim() !== "") {
        // Prepara os dados para envio ao servidor
        const url = "/update-admin-response"; // Endpoint do backend
        const method = "POST";
        const data = new URLSearchParams();
        data.append("id", id);
        data.append("admin_response", responseText);

        // Faz o envio da resposta ao backend
        fetch(url, {
            method: method,
            body: data,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log(`Resposta salva para a sugestão ${id}: ${responseText}`);
                    alert("Resposta salva com sucesso!");

                    // Atualiza a resposta no frontend
                    const responseContainer = responseField.parentNode;
                    responseContainer.innerHTML = `
                        <h6 class="card-subtitle mb-2 text-muted">Resposta do Administrador</h6>
                        <p class="card-text" id="adminResponseText_${id}">${responseText}</p>
                        <button type="button" onclick="editAdminResponse(${id})" class="btn btn-warning">Editar Resposta</button>
                    `;
                } else {
                    console.error("Erro ao salvar a resposta:", result.message);
                    alert("Erro ao salvar a resposta. Tente novamente.");
                }
            })
            .catch(error => {
                console.error("Erro na comunicação com o servidor:", error);
                alert("Falha na conexão com o servidor. Verifique sua rede e tente novamente.");
            });
    } else {
        alert("A resposta não pode estar vazia!");
    }
}


// Função para editar a resposta do administrador
function editAdminResponse(id) {
    const responseText = document.getElementById(`adminResponseText_${id}`).textContent;
    const responseContainer = document.getElementById(`adminResponseText_${id}`).parentNode;
    responseContainer.innerHTML = `
        <textarea class="form-control mb-2" placeholder="Edite sua resposta aqui..." id="adminResponse_${id}">${responseText}</textarea>
        <button type="button" onclick="saveAdminResponse(${id})" class="btn btn-primary">Salvar Resposta</button>
    `;
}


///
function updateEmotion(emotion, child, id){
	let conteiner = findClass(child, ".btn-group");
	let emotion1 = parseInt(conteiner.querySelector('.emotion1').innerHTML);
	let emotion2 = parseInt(conteiner.querySelector('.emotion2').innerHTML);
	let emotion3 = parseInt(conteiner.querySelector('.emotion3').innerHTML);

	switch (emotion) {
	case 'emotion1':
		emotion1++;
		break;
	case 'emotion2':
		emotion2++;
		break;
	default:
		emotion3++;
	}

	console.log(emotion1 + " " + emotion2 + " " + emotion3);


 
 
	let url = "/update_suggestion?id="+id;
	const method = "POST";
	const data = new URLSearchParams();
	data.append("emotion1", emotion1 )
	data.append("emotion2", emotion2 )
	data.append("emotion3", emotion3 )
	data.append("admin_response", "" )


	fetchAPI(url, method, data).then(value => {
		if(value){
			showNotification('Você reagiu à sugestão', 'bg-success')
			conteiner = findClass(child, "."+emotion)
			conteiner.innerHTML = parseInt(conteiner.innerHTML) + 1;
		}
	});


}


function deleteSuggestion(child, id){
	let url = "/delete_suggestion?id="+id;
	const method = "POST";
	const data = new URLSearchParams();

	fetchAPI(url, method, data).then(value => {
		if(value){
			showNotification('Você excluiu à sugestão', 'bg-warning')
			getSuggestions(child)
		}
	});

	
}

//links

function setLink(child){
	var conteiner = findClass(child, ".showContent");
	const url = "/create_link";
	const method = "POST";
	const data = new URLSearchParams();
	data.append("name", conteiner.querySelector(".link_label").value.trim());
	data.append("url", conteiner.querySelector(".link_url").value.trim());
	data.append("username", 'NULL');
	data.append("password", 'NULL');
	data.append("scope", 'global');
	// console.log(data);
	
	var checkboxes = document.querySelectorAll('input[type="checkbox"]');
	var selectedValues = Array.from(checkboxes).map(function(checkbox) {
		// console.log(checkbox.name + " = "+ checkbox.checked)
		return checkbox.value;
	});

	// Enviar os valores selecionados para o servidor
	// Aqui, você pode usar AJAX ou definir o atributo 'action' do formulário para o URL adequado e enviar o formulário.

	// console.log(selectedValues);


	// fetchAPI(url, method, data).then(value => {
	//   console.log(value);
	// //   getLinks(child)
	// });
}



function getLinks(child){
	let conteiner = findClass(child, ".wdg_card");
	const url = "/read_link?";
	const method = "POST";
	const data = new URLSearchParams();
	fetchAPI(url, method, data).then(value => {
	//   console.log(value);
	  populateLinks(child, value)
	});
}


function populateLinks(child, value){
	let groupAndId = getObjsNameLinks(value)
	// console.log( groupAndId )

	let conteiner = findClass(child, '.links_conteiner')
	conteiner.innerHTML = '';
	groupAndId.distinctObjectsList.forEach( (id)=>{
		const classes = {};
		var cont = 0
		var element = {}
		value.forEach( el =>{
			
			if(el.id == id){
				classes[cont] = el.id_group != null ? ("g_" +  el.id_group) : ""
				element['url'] = el.url
				element['label'] = el.label
				element['id'] = el.id
			}	
			cont++	
		} )
		var str =  Object.values(classes).join(" ") 
		var div = document.createElement('div')
		div.classList.add('mx-1')
		div.innerHTML = `
			<div class="input-group input-group-sm mb-3 ">
				<button type="button" class="btn btn-outline-secondary"><a class="${str}" target="_blank" href="${element.url}">${element.label}</a></button>
				<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
				<span class="visually-hidden">Toggle Dropdown</span>
				</button>
				<ul class="dropdown-menu">
					<li><a class="dropdown-item" target="_blank" href="/update">Editar</a></li>
					<li><span class="dropdown-item" onclick="deleteTextmodel('/delete?tb=links&id=${element.id}')">Excluir</span></li>
				</ul>
			</div>
		`

		conteiner.appendChild(div)
	})


	conteiner = findClass(child, '.links_btn_groups')
	conteiner.innerHTML = ''
	groupAndId.result.forEach( id=>{
		const values = Object.values(id);
		const keys = Object.keys(id);

		// console.log(values)
		if(values != null && values != '' && keys != null && keys != '' ){
			var g_id = "openLinks(this, '.g_" + keys + "')"
			var button = document.createElement('button')
			button.classList.add('btn')
			button.classList.add('btn-outline-secondary')
			button.type = "button"
			button.innerHTML = values
			button.setAttribute('onclick', g_id )

			conteiner.appendChild(button)
		}
		
	})

	
}



function getObjsNameLinks(data){
	const result = [];
	const distinctObjects = {};
 

	data.forEach((item) => {
		const label = item.id_group;
		const group = item.group;
	  
		// Verifica se o label já existe no resultado
		const existingObject = result.find((obj) => obj[label]);
	  
		if (existingObject) {
		  // Se o label já existe, atualiza o valor do grupo
		  existingObject[label] = group;
		} else {
		  // Caso contrário, adiciona um novo objeto ao resultado
		  const newObj = {};
		  newObj[label] = group;
		  result.push(newObj);
		}


		const itemId = item.id;
		if (!distinctObjects[itemId]) {
			distinctObjects[itemId] = item.id;
		}
	});

	const distinctObjectsList = Object.values(distinctObjects);
	// console.log(result);
	return ({ result , distinctObjectsList})

}



// function openLinks(child, elClass) {
// 	let conteiner = findClass(child, '.showContent');
// 	var links = conteiner.querySelectorAll(elClass);
  
// 	console.log(links);

// 	links.forEach(link =>{
// 		window.open(link.href, '_blank');
// 	})

//   }
  


function openLinks(child, elClass) {
	let conteiner = findClass(child, '.showContent');
	var links = conteiner.querySelectorAll(elClass);
	
	// console.log(links);
  
	// Converter NodeList para Array
	var linksArray = Array.from(links);
  
	// Iterar sobre o array de links
	for (var i = 0; i < linksArray.length; i++) {
	  window.open(linksArray[i].href, '_blank');
		setTimeout(function () {
			// console.log('executou')
		}, 1000);
	}
  }



// end links




function getShortcuts(){
	// var conteiner = findClass(child, ".wdg_shortcut");
	// let btn_shortcuts = conteiner.querySelector('.btn-shortcuts')
	const url = "/read_shortcut";
	const method = "POST";
	const data = new URLSearchParams();
	fetchAPI(url, method, data).then(value => {
	//   console.log(value);
		localStorage.setItem('shortshortcuts', JSON.stringify(value))
	//   populateShortcuts(btn_shortcuts, value)
	});

	// console.log(conteiner)
}




function setShortcuts(child){
	var conteiner = findClass(child, ".showContent");
	let title = conteiner.querySelector(".title").value.replace(/[^\w\sÀ-ÖØ-öø-ÿ]/g, "").toLowerCase().trim()
	let shortcut = conteiner.querySelector(".shortcut").value.trim()
	let color = conteiner.querySelector('.selectShortcutColor').value
	let selectElement = conteiner.querySelector('.selectScopeShortcut'); 
	let scope = selectElement ? selectElement.value.toLowerCase() : 'local';

	if(conteiner && title && shortcut && color){
		const url = "/create?tb=shortcuts";
		const method = "POST";
		const data = new URLSearchParams();
		data.append("title", title);
		data.append("shortcut", shortcut);
		data.append("color", color);
		data.append("scope", scope);

		fetchAPI(url, method, data).then(value => {
		//   console.log( conteiner.querySelector(".shortcut")  );
			getShortcuts()
			showNotification("Modelo de prenchimento curto cadastrado com sucesso!", "bg-success")
		});
	}else{
		showNotification("ALGUM CAMPO OBRIGATÓRIO NÃO FOI PREENCHIDO!", "bg-danger")
	}
}


function deleteShortcuts(del_url, child){
	const url = del_url;
	const method = "POST";
	const data = new URLSearchParams();
  
	fetchAPI(url, method, data).then(value => {
	  if(value == true){
		showNotification("Excluído com sucesso!", "bg-success")
		getShortcuts()
	  }
	});
}



function populateShortcuts(el){
	let rowShortcuts = findClass(el, '.rowShortcuts')
	if(rowShortcuts ){
		var shortshortcuts = JSON.parse(localStorage.getItem('shortshortcuts'))
		console.log(shortshortcuts)

		rowShortcuts.innerHTML = ''
		shortshortcuts.forEach(el=>{
			var tempClass = generateRandomText()
			var div = document.createElement('div')
			div.classList.add('input-group')
			div.classList.add('input-group-sm')
			var label = document.createElement('label')
			label.innerHTML = el.name
			label.classList.add(tempClass)
			label.style.fontSize = '0.8rem';
			label.classList.add('hide_element')

			let link = ''
			let edit = ''


			// Exemplo de uso no contexto isValidURL(el.model)
			if ( true ) {
				const validURL = ensureValidURL(el.model);
				link = `<button type="button" class="btn btn-outline-secondary my-1">
						<a href='${validURL}' target="_blank">
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link-45deg" viewBox="0 0 16 16">
							<path d="M4.715 6.542 3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1 1 0 0 0-.154.199 2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4 4 0 0 1-.128-1.287z"/>
							<path d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243z"/>
							</svg> 
						</a>
					</button>
				`;
			}

			if(el.action == 'edit'){
				edit = `
				<button   type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split my-1" data-bs-toggle="dropdown" aria-expanded="false">
					<span class="visually-hidden">Toggle Dropdown</span>
				</button>
				<ul class="dropdown-menu dropdown-menu-end">
				<!--  <li><a class="dropdown-item" href="#">Editar</a></li> -->
					<li><button class="dropdown-item" onclick="deleteShortcuts('/delete?tb=shortcuts&id=${el.id}', this) ">Excluir</button></li>
				</ul>
				`
			}

			div.innerHTML = 	
			` 	
				<input onclick="getText(this)" type="button" class="form-control btn text-light ${el.color} my-1" aria-label="Text input with segmented dropdown button" value='${ el.model.substring(0, 800)}'>
				
				${link}

				<button type="button" class="btn btn-outline-secondary my-1" onclick="showLabelByShortcut('${tempClass}', this.parentElement.parentElement) "> 
					<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
						<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
						<path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
					</svg>
				</button>

				${edit}

				`

			
				rowShortcuts.appendChild(label)
				rowShortcuts.appendChild(div)
			})
	
	}
}





//Função comum aos dois
function img_onclick(el) {
	var cor = el.parentElement.querySelector("#cor");
	cor.click();
}




//Editor de texto contenteditable

function changeColor(color) {
	document.execCommand('foreColor', false, color);
}


function formatTextItalic(command, value = null) {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);

        // Verifica se o conteúdo selecionado já está em <i>
        const parentElement = range.commonAncestorContainer.parentNode;
        if (parentElement.tagName === 'I') {
            // Se já estiver em itálico, remova o itálico
            const textNode = document.createTextNode(parentElement.textContent);
            parentElement.replaceWith(textNode);
            return;
        }

        // Caso contrário, aplicar itálico
        const italic = document.createElement('i');
        italic.appendChild(range.extractContents()); // Preserva os elementos filhos da seleção
        range.deleteContents();
        range.insertNode(italic);

        // Ajusta a seleção para o novo nó
        const newRange = document.createRange();
        newRange.selectNodeContents(italic);
        selection.removeAllRanges();
        selection.addRange(newRange);
    }
}



function insertBR(el, tag) {
	var container = el.parentElement.querySelector(".meuTexto");
	var selection = window.getSelection();
	var range = selection.getRangeAt(0);

	// Verifica se o usuário selecionou algum texto
	if (!selection.isCollapsed) {
		var startNode = range.startContainer;
		var endNode = range.endContainer;

		// Insere a tag <br> antes do texto selecionado
		var brBefore = document.createElement(tag);
		range.insertNode(brBefore);

		// Ajusta o ponto inicial da seleção para incluir a nova tag <br>
		range.setStartBefore(brBefore);
		selection.removeAllRanges();
		selection.addRange(range);

		// Insere a tag <br> depois do texto selecionado
		var brAfter = document.createElement(tag);
		range = selection.getRangeAt(0);
		range.collapse(false);
		range.insertNode(brAfter);

		// Ajusta o ponto final da seleção para incluir a nova tag <br>
		range.setEndAfter(brAfter);
		selection.removeAllRanges();
		selection.addRange(range);
	} else {
		// Insere a tag <br> antes do texto selecionado
		var brBefore = document.createElement(tag);
		range.insertNode(brBefore);

		// Ajusta o ponto inicial da seleção para incluir a nova tag <br>
		range.setStartBefore(brBefore);
		selection.removeAllRanges();
		selection.addRange(range);
	}

	// Restaura o foco para o elemento contenteditable
	var editable = container.querySelector("[contenteditable]");
	editable.focus();
}






function changeColorEditable(el) {
	var editable = el.parentElement.querySelector(".meuTexto");
	var cor = el.parentElement.querySelector("#cor").value;
	var selecionado = window.getSelection().toString();

	if (selecionado.length === 0) {
		return;
	}

	document.execCommand('foreColor', false, cor);
}





function showHTML(parent, childClass) {
	var txt_area = parent.querySelector(".txt_area")
	txt_area.classList.toggle("hide_element")

	txt_area.value = parent.querySelector(".wdg_text_area").innerHTML

	var txt_area = parent.querySelector(".wdg_text_area")
	txt_area.classList.toggle("hide_element")

}




function substituirAtalho(texto, modelos) {
	const palavras = texto.split(" "); // Divide o texto em palavras separadas por espaço
	const atalhos = {};

	// Mapeia os atalhos e frases do objeto txtModels
	modelos.forEach(modelo => {
		atalhos[modelo.shortcut] = modelo.model;
	});

	const novaPalavras = palavras.map(palavra => {
		if (palavra.startsWith("#")) {
			const atalho = palavra.substring(1); // Remove o caractere "#"
			if (atalho in atalhos) {
				return atalhos[atalho]; // Substitui pelo valor correspondente no objeto de atalhos
			}
		}
		return palavra; // Mantém as palavras que não começam com "#"
	});

	return novaPalavras.join(" "); // Junta as palavras em uma nova string com espaços
}



// Função para obter a posição do cursor de texto em um elemento contenteditable
function getCaretPosition(elemento) {
	let pos = 0;
	const sel = window.getSelection();
	if (sel.rangeCount) {
		const range = sel.getRangeAt(0);
		if (range.commonAncestorContainer.parentNode == elemento) {
			pos = range.endOffset;
		}
	}
	return pos;
}

// Função para definir a posição do cursor de texto em um elemento contenteditable
function setCaretPosition(elemento, pos) {
	const range = document.createRange();
	const sel = window.getSelection();
	range.setStart(elemento.childNodes[0], pos);
	range.collapse(true);
	sel.removeAllRanges();
	sel.addRange(range);
	elemento.focus();
}







/// Busca pendência se tiver salva no banco 
function salvar_pendencia(child){
    var question = window.confirm("Deseja salvar a pendência?")
	let conteiner = findClass(child, ".showContent")
    let number_chat_protocol = conteiner.querySelector('.number_chat_protocol').value
    let description = conteiner.querySelector(".txt_area").value
    let erp_protocol = conteiner.querySelector(".erp_protocol").value
	
       
	console.log(description)


    if(chat){
		var params = 'number_protocol='+encodeURIComponent(number_chat_protocol) +'&description='+encodeURIComponent(description)+'&adm_protocol='+encodeURIComponent(erp_protocol);

		if( description.trim() !== "" && number_chat_protocol.trim() !== "" && erp_protocol.trim() !== "" ){
	
			let xhttp = new XMLHttpRequest();
					  xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							var retorno = this.responseText;

							//console.log(this)
							
							if(retorno['status'] == "success")
								//console.log(retorno['description'])
								showNotification("Dado inserido com sucesso", "bg-success")
							}else if(retorno == "false"){
								console.log(retorno)
								showNotification("Dado inserido com sucesso", "bg-danger")
							}   
						}
	
					  xhttp.open("POST", "/create_pending", true);
				  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					  xhttp.send(params);
		}else{
			 window.confirm("Protocolo do chat, adm e a descrição são obrigatórios")
		}  
	} else{
		//var params = 'number_protocol='+"0" +'&description='+description+'&adm_protocol='+erp_protocol
		var params = 'number_protocol=0' +'&description='+encodeURIComponent(description)+'&adm_protocol='+encodeURIComponent(erp_protocol);
		if( description.trim() !== "" && erp_protocol.trim() !== "" ){
	
			let xhttp = new XMLHttpRequest();
					  xhttp.onreadystatechange = function() {
						if (this.readyState == 4 && this.status == 200) {
							var retorno = this.responseText;
							
							if(retorno == "true")
								console.log(retorno)
								showNotification("Dado inserido com sucesso", "bg-success")
							}else if(retorno == "false"){
								console.log(retorno)
								showNotification("Dado inserido com sucesso", "bg-danger")
							}   
						}
	
					  xhttp.open("POST", "/create_pending", true);
				  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
					  xhttp.send(params);
		}else{
			 window.confirm("Protocolo do chat, adm e a descrição são obrigatórios")
		}  
	}
 
}



function buscar_pendencia(child){
	let conteiner = findClass(child, ".showContent")
    let number_chat_protocol = conteiner.querySelector('.number_chat_protocol')
    let description = conteiner.querySelector(".wdg_text_area")
    let erp_protocol = conteiner.querySelector(".erp_protocol")
	
    if( number_chat_protocol.value !== "" ){
    	let xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				//notification.innerHTML = this.responseText;
				let pendencia = JSON.parse( this.responseText );
				
				//console.log(  );
			    
			if(pendencia != false){
				if( pendencia.number_protocol == number_chat_protocol.value  ){
			 		var question = window.confirm("Existe uma pendência salva para esse protocolo")  
					 description.innerHTML = pendencia.description
					 conteiner.querySelector(".txt_area").value = description.innerHTML
					 erp_protocol.value = pendencia.adm_protocol
				 }
			}    
                    }
                  };
                  xhttp.open("POST", "/read_pending", true);
		  		  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                  xhttp.send("number_protocol="+number_chat_protocol.value );
     }
}



function removeFormatting(event) {
	console.log('chamou')
	event.preventDefault(); // Prevents the default paste behavior
	
	// Get the plain text from the clipboard
	var plainText = event.clipboardData.getData('text/plain');
	
	// Insert the plain text without formatting
	document.execCommand('insertText', false, plainText);
  }





function addUpdatedValue(child) {
	let conteiner = findClass(child, ".showContent")
	let wdg_text_area = conteiner.querySelector(".wdg_text_area")

	navigator.clipboard.readText()
		.then(function (data) {
			// Split the text by line breaks
			var lines = data.split(/\n|\t|\s+/);


			// console.log(lines)
			// Extract the date and values from the lines
			var date = lines[0];
			var value1 = parseFloat(lines[1].replace(',', '.'));
			var value2 = "";

			if(lines.length > 2){
				value2 = parseFloat(lines[2].replace(',', '.'));
			}
			
			
			// Determine the updated value based on the conditions
			var updatedValue = '';
			
			if (lines.length === 2) {
				updatedValue = value1.toFixed(2).replace('.', ',');
			} else if (value2 > value1) {
				updatedValue = value2.toFixed(2).replace('.', ',');
			} else {
				updatedValue = value1.toFixed(2).replace('.', ',');
			}
			
			// Format the updated text
			var updatedText = date + ' com valor atualizado em R$' + updatedValue;

			wdg_text_area.innerHTML = wdg_text_area.innerHTML + "<br>" + updatedText


			var containerTemp = child.parentElement.parentElement.querySelector(".wdg_text_area") //findClass(child, '.showContent')

			
			console.log(containerTemp)

			updateTextArea(containerTemp.parentElement)

		// console.log(updatedText)

	})
	// Return the updated text
	return updatedText;
	}



	function getLgpdDefaultText(child){
		let conteiner = findClass(child, '.showContent')
		let textArea = document.querySelector('.model_lgpd')
		setTransferAreaValue(textArea.value, child.parentElement)
	}


	function updateTextModelLGPD(event){
		let container =  findClassPerName(event.target, "content_lgpd_card", "wdg_card")
		let buttonSetDataLgpd = container.querySelector(".btn_set_text_lgpd")

		//console.log(buttonSetDataLgpd )

		fillInTheFieldsLgpd(buttonSetDataLgpd, false)
	}


	function generatetLgpdDefaultTextEdit(child, container) {

		console.log("child" + child)
		console.log("Container" + container)

		let emailInp = container.querySelector(".email").value.trim();
		let parts = emailInp ? emailInp.split("@") : "";
		let domain = parts[1] !== undefined ? parts[1] : "";
		let maskedName = parts ? parts[0].substring(0, 2) + "*".repeat(parts[0].length - 2) : "";
		let email = parts[1] !== undefined ? maskedName + "@" + domain : maskedName;
	
		// Mapeando e filtrando os números de telefone preenchidos
		var phones = Array.from(container.querySelectorAll(".phone"))
			.map(phone => phone.value)
			.filter(phone => phone !== ""); 

		// Função para aplicar a máscara nos últimos 4 dígitos
		function maskPhone(number) {
			// Remover todos os caracteres não numéricos
			let digits = number.replace(/\D/g, '');
			// Verificar se o número tem pelo menos 4 dígitos
			if (digits.length >= 4) {
				// Extrair DDD e primeiro dígito "9" se existirem
				let ddd = digits.slice(0, 2);
				let firstDigit = digits.slice(2, 3) === '9' ? '9' : '';
				// Mascarar os quatro últimos dígitos
				return ddd + firstDigit + 'XXXX-' + digits.slice(-4);
			}
			return number;
		}

		// Aplicando a máscara nos números de telefone
		phones = phones.map(maskPhone);


		// Aplicando a máscara nos números de telefone
		phones = phones.map(maskPhone);

	
		let model = "";
	
		if (phones.length === 0 && emailInp.length === 0) {
			model = `Identificamos que não há telefone e e-mail cadastrado em sistema. Qual seu número de telefone? Deseja adicionar e-mail?`;
		} else if (phones.length == 0 && emailInp.length > 0) {
			model = `No seu cadastro constam as seguintes informações para contato: ${email}. Deseja remover ou adicionar algum contato? Identificamos que não há telefone cadastrado em sistema, deseja adicionar algum?`;
		} else if (phones.length > 0 && emailInp.length === 0) {
			model = `No seu cadastro constam as seguintes informações para contato: ${phones.join(', ')}. Deseja remover ou adicionar algum contato? Identificamos que não há e-mail cadastrado em sistema, deseja adicionar algum?`;
		} else {
			model = `No seu cadastro constam as seguintes informações para contato: ${phones.join(', ')} e ${email}. Deseja remover ou adicionar algum contato?`;
		}
	
		return model;
	}
	
	


	// LGPD
	function generatetLgpdDefaultText(data){
		let phone =  ""
		let model = ""
		let parts = Object.keys(data.email).length > 0 ? data.email.split("@") : ""
  		let domain = parts[1] 
  		let maskedName = parts != "" ?  parts[0].substring(0, 2) + "*".repeat(parts[0].length - 2) : ""
		let email =    maskedName + "@" + domain 

		data.phones.forEach( number =>{
			if ( number.length === 11 && isInteger(number) ) {
				phone =  phone + number.substring(0, 3) + "XXXX-" + number.substring(7) + " ";
			} else if (  number.length === 10 && isInteger(number) ) {
				phone =  phone + number.substring(0, 2) + "XXXX-" + number.substring(6) + " ";
			}else{
				phone = phone + ""
			}
		})
		phone = phone.trim().replace(/ /g, ", ");


		if( Object.keys(data.phones).length === 0 && Object.keys(data.email).length === 0 || Object.keys(data.phones).length === 0 &&  !isValidEmail( data.email )){
			showNotification('Telefone ou e-mail inválidos', 'bg-danger')
			model = `Identificamos que não há telefone e e-mail cadastrado em sistema. Qual seu número de telefone? Deseja adicionar e-mail?`		
		}else if(Object.keys(data.phones).length > 0 && Object.keys(data.email).length === 0 ||  Object.keys(data.phones).length > 0 &&  !isValidEmail( data.email ) ){
			showNotification('Telefone ou e-mail inválidos', 'bg-danger')
			model = `No seu cadastro constam as seguintes informações para contato: ${phone}. Deseja remover ou adicionar ou remover algum contato? Identificamos que não há e-mail cadastrado em sistema, deseja adicionar algum?`
		}
		else if(Object.keys(data.phones).length === 0 && Object.keys(data.email).length > 0  &&  isValidEmail( data.email )   ){
			showNotification('Telefones inválidos', 'bg-danger')
			model = `No seu cadastro constam as seguintes informações para contato: ${email}. Identificamos que não há telefone cadastrado em sistema. Qual seu número de telefone?` 
		}
		else{
			model = `No seu cadastro constam as seguintes informações para contato: ${phone} e ${email}. Deseja remover ou adicionar algum contato?` 
			if( domain.toLowerCase() === "hotmail.com"){
				model = model + ` E-mails com domínio @hotmail tem apresentado problemas para receber comunicados que enviamos. Você tem outro e-mail com domínio diferente? Exemplo: @gmail, @yahoo, @icloud, etc.` 
			}
		}

		
		return model
	}


	function fillInTheFieldsLgpd(child, clipboard = true){
		let conteiner =  findClass(child, '.showContent')
		let textarea = conteiner.querySelector('.model_lgpd')
		

		if(clipboard){
			console.log("clip")

			clearContainer(child)

			navigator.clipboard.readText()
			.then(function (data) {
				// console.log(data)
				let type_text = identificarPadraoDeskFaster(data) 

				if(type_text == "desk"){
					textarea.value = generatetLgpdDefaultText(   extractContactInformationFromDesk(data, conteiner)  )
				}else if(type_text == "faster"){
					textarea.value = generatetLgpdDefaultText(   extractContactInformation(data, conteiner)   )
				}
				
				// let ret  = extractContactInformation(data, conteiner)  
				// console.log(ret)
			})
		}else{
			textarea.value = generatetLgpdDefaultTextEdit(child, conteiner) 
		}
	}


	///apagar dados de um conteiner
	function clearContainer(child) {
		var container = findClass(child, ".showContent");
	
		// Clear inputs and textareas
		var inputs = container.querySelectorAll('input');
		var textareas = container.querySelectorAll('textarea');
		
		for (var i = 0; i < inputs.length; i++) {
			var input = inputs[i];
			input.value = '';
			// Verificar se o input contém a classe 'base'. Se tiver, não apaga o conteúdo.
			if (input.classList.contains('base')) {
				input.value = 'Padrão fibra';
			}
		}
		
		
		for (var j = 0; j < textareas.length; j++) {
			var textarea = textareas[j];
			textarea.value = '';
		}
		
		// Clear contenteditable elements
		var contentEditables = container.querySelectorAll('[contenteditable="true"]');
		for (var l = 0; l < contentEditables.length; l++) {
			var contentEditable = contentEditables[l];
			contentEditable.innerHTML = '';
		}
		
		// Reset the default option of the select
		var selects = container.querySelectorAll('select');
		
		for (var k = 0; k < selects.length; k++) {
			var select = selects[k];
			select.selectedIndex = 0;
		}
	
		showNotification('Dados apagados!', 'bg-success');
	}
	

	function identificarPadraoDeskFaster(texto) {
		// Padrões exclusivos do Texto A
		const padroesA = [
		  /Cadastro Geral/i,
		  /Senha/i,
		  /Empresa/i,
		  /Endereço \(p\/ nota\)/i,
		  /Planos/i,
		  /Desconto ref\. promocao retencao/i,
		  /Email externo/i,
		  /Data Cadastro/i,
		  /Fone Principal/i
		];
	  
		// Padrões exclusivos do Texto B
		const padroesB = [
		  /Confirme o telefone com o cliente/i,
		  /Telefone:/i,
		  /Celular:/i,
		  /Confirme o e-mail do responsável/i,
		  /@gmail\.com/i,
		  /Não é aceito e-mail @hotmail/i,
		  /Confirme o celular do responsável/i,
		  /Marque esta opcao APENAS caso/i
		];
	  
		// Contar ocorrências de cada padrão
		const scoreA = padroesA.reduce((acc, regex) => acc + (regex.test(texto) ? 1 : 0), 0);
		const scoreB = padroesB.reduce((acc, regex) => acc + (regex.test(texto) ? 1 : 0), 0);
	  
		if (scoreA > scoreB && scoreA >= padroesA.length * 0.6) {
		  return "desk";
		} else if (scoreB > scoreA && scoreB >= padroesB.length * 0.6) {
		  return "faster";
		} else {
		  return "indefinido";
		}
	  }
	  

	

	function extractContactInformation(txtModel, container) {
		console.log(container)

		let data = txtModel.replace(/ Telefone:/g, "");
		let contacts = [];
		const emailStart = data.search("conta:");
		const emailEnd = data.search("É ");
		let email = "";
		let uniquePhones = [];
		const el_phones = Array.from(container.querySelectorAll(".phone"));
		const el_email = container.querySelector(".email");
	  
		// console.log(data);
	  
		email = emailStart === emailEnd ? "" : data.substring(emailStart + 7, emailEnd - 1).replace(/[\r\n\s]+/g, "");
		el_email.value = email;
	  
		for (let i = 0; i < 4; i++) {
		  const start = data.indexOf("DDD:");
		  const temp = data.substring(start + 4, start + 21).replace(/[^0-9]/g, "");
		  data = data.substring(start + 4);

		  el_phones[i].value = typeof temp === 'undefined' ? "" : temp  ;

		  if(temp == ""){
			continue
		  }

		  if(typeof temp !== 'undefined' && temp.length >= 10){
			contacts.push(temp)
		  }
		}
	  
		// console.log(contacts);
		
	  
		for (let i = 0; i < contacts.length; i++) {
		  
		  if ( typeof contacts[i] !== 'undefined' && contacts[i] !== "" && !uniquePhones.includes(contacts[i])) {
			uniquePhones.push(contacts[i]);
		  }
		}

		if(contacts.length != uniquePhones.length){
			showNotification('Verifique se os telefones estão repetidos', 'bg-warning');
		}
		
	  
		return {
		  phones: uniquePhones,
		  email: email
		};
	  }
	  
	
	  function extractContactInformationFromDesk(txtModel, container) {
		// Normalizar o texto: remove quebras e tabulações
		const rawText = txtModel.replace(/\r?\n|\r|\t/g, " ").replace(/\s+/g, " ");
		let uniquePhones = [];
		const el_phones = Array.from(container.querySelectorAll(".phone"));
		const el_email = container.querySelector(".email");
	  
		// Extrair e-mail válido (qualquer @)
		const emailMatch = rawText.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}/);
		const email = emailMatch ? emailMatch[0].trim() : "";
		if (el_email) el_email.value = email;
	  
		// Extrair todos os números com 10 ou 11 dígitos (inclui DDD)
		const phoneMatches = rawText.match(/\b\d{10,11}\b/g);
		if (phoneMatches) {
		  let phoneIndex = 0;
		  for (const number of phoneMatches) {
			const cleaned = number.replace(/\D/g, "");
			if (cleaned.length >= 10 && !uniquePhones.includes(cleaned)) {
			  uniquePhones.push(cleaned);
			  if (el_phones[phoneIndex]) {
				el_phones[phoneIndex].value = cleaned;
				phoneIndex++;
			  }
			}
		  }
		}
	  
		// Verificar duplicados
		if (phoneMatches && phoneMatches.length !== uniquePhones.length) {
		  showNotification('Verifique se os telefones estão repetidos', 'bg-warning');
		}
	  
		return {
		  phones: uniquePhones,
		  email: email
		};
	  }
	  
	  
	  



	function getNocDefaultText(child){
		let fhtt = findClass(child, '.fhtt').value
		let user = findClass(child, '.user').value
		let city = findClass(child, '.city').value
		let authentication = findClass(child, '.authentication').value
		let user_plan = findClass(child, '.user_plan').value
		let address = findClass(child, '.address').value
		let name = findClass(child, '.name').value
		let phone = findClass(child, '.phone').value
		let reason  = findClass(child, '.reason').value
		let risk  = findClass(child, '.selectTxtRisk').value
		let drop  = findClass(child, '.selectTxtDrop').value
		let protocol  = findClass(child, '.protocol').value
		
		
		let modelNoc = findClass(child, '.model_noc') 
		
		let noc = localStorage.getItem('noc_form_field')
		let rompimento = localStorage.getItem('rompimento_form_field')
		let financeiro = localStorage.getItem('financeiro_form_field')
		console.log("noc" + noc)
		console.log("rompimento" + rompimento)
		console.log("financeiro" + financeiro)
		if(noc == 'enable'){
			console.log('1')
			modelNoc.value = `Olá, pode verificar? \nSN: ${fhtt} \nUsuário: ${user} \nCidade: ${city} \nAutenticação: ${authentication} \nPlano: ${user_plan} \nMotivo da verificação: ${reason}`
		}else if(rompimento == 'enable'){
			console.log('2')
			modelNoc.value = `Olá, pode verificar? \nSN: ${fhtt} \nUsuário: ${user} \nCidade: ${city} \nAutenticação: ${authentication} \nPlano: ${user_plan} \nEndereço: ${address}\nMotivo da verificação: ${reason} \nNome e nº de telefone do cliente: ${phone} , ${name} \nOferece risco: ${risk}\nCabo drop: ${drop}`
		}else if(financeiro == 'enable'){
			console.log('3')
			modelNoc.value = `Olá, pode verificar? \nUsuário: ${user} \nProtocolo: ${protocol} \nMotivo da verificação: ${reason}`
		}
		
	  }


	  function setNocDefaultText(child){
		let modelNoc = findClass(child, '.model_noc').value 
		setTransferAreaValue(modelNoc, child )
	  }



// d
	function enableFormByService(event, serv){
		let container = event.target.parentElement.parentElement
		let in_data = container.querySelectorAll(".in_data")

		let parent = event.target.parentElement;
		let btns = parent.querySelectorAll('.btn');

		btns.forEach(btn => {
			btn.classList.toggle('btn-primary', btn === event.target);
			btn.classList.toggle('btn-outline-primary', btn !== event.target);
		});

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


	function addService(){
		let chat_status = localStorage.getItem('chat_form_field')
		let chat = ''
		let phone = ''

		

		if(chat_status == 'enable'){
			chat = 'btn-select btn-primary'
			phone = 'btn-select btn-outline-primary'
		}else{
			phone = 'btn-select btn-primary'
			chat = 'btn-select btn-outline-primary'
		}

		let htmlString = `<!-- <div class="wdg_content wdg_window wdg_window_50 mb-3 item wdg_content_atendimento" draggable="true"> -->
			<div class="wdg_content wdg_window wdg_window_50 mb-3 item float-start wdg_content_atendimento" >
				<nav class="d-flex justify-content-between align-items-center">
					<img src="/public/images/maximize.svg" width="12px" class="hide_element_visibility">
					<h6 id="archor_text_editor">ATENDIMENTO</h6>
					<div class="bg-warning p-1 rounded-pill bg-color">

						<div class="d-flex window_behavior justify-content-end " style="width: 80px !important;">

							<svg class="mx-1 p-1" onclick="rezisize(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
								<path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
							</svg>
					
							<svg  class="mx-1 p-1" onclick="removeElement(this.parentElement.parentElement.parentElement.parentElement), showNotification('Bloco de Atendimento Excluído!', 'bg-danger')" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 15 15">
							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
							</svg>
					</div>
					</div>

				</nav>

				<div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
					<button type="button" class="btn   btn_for_enable_phone_form ${phone}" onclick="enablePhoneForm(), saveChatStatus('disable')">Telefone</button>
					<button type="button" class="btn  btn_for_enable_chat_form ${chat}" onclick="enableChatForm(), saveChatStatus('enable')">Chat</button>
				</div>

				<!-- <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
					<input type="checkbox" class="btn-check btn_for_enable_phone_form" name="btnradio" id="btnradio1" autocomplete="off" >
					<label class="btn btn-outline-primary" for="btnradio1" onclick="enablePhoneForm(), saveChatStatus('disable')">Telefone</label>
				
					<input type="checkbox" class="btn-check btn_for_enable_chat_form" name="btnradio" id="btnradio2" autocomplete="off">
					<label class="btn btn-outline-primary" for="btnradio2" onclick="enableChatForm(), saveChatStatus('enable')">chat</label>
				</div> -->

				<div class="column my-3 ">


				
					<div class="wdg_add_card" onclick="addTextEditTags(this.parentElement, this)">
						+ ADICIONAR BLOCO
					</div>
				</div>
			</div>`
			let parser = new DOMParser();
			let doc = parser.parseFromString(htmlString, "text/html");
			let wdg_conteiner = document.querySelectorAll('.wdg_conteiner')[0];
			if(wdg_conteiner.querySelectorAll('.wdg_content_atendimento').length > 0 ){
				showNotification('Bloco de Atendimento  já existe na página!', 'bg-warning')
				// return
			}
	
			// Adiciona o primeiro elemento filho do documento
			wdg_conteiner.appendChild(doc.body.firstChild);
			showNotification('Bloco de Atendimento Adicionado na página!', 'bg-success')

			var theme = localStorage.getItem('theme')
			if(theme == 'dark'){
				applyDarkTheme()
			}else{
				applyLightTheme()
			}

			execProfile();
	}

	function addLGPD(){
		let htmlString = `
		<!-- LGPd -->
<div class="wdg_content wdg_window wdg_window_50 mb-3 item float-start wdg_content_lgpd" >
	<nav class="d-flex justify-content-between align-items-center">
		<img src="/public/images/maximize.svg" width="12px" class="hide_element_visibility">
		<h6 id="archor_lgpd">LGPD</h6>
		<div class="bg-warning p-1 rounded-pill bg-color">

			<div class="d-flex window_behavior justify-content-end " style="width: 80px !important;">

				<svg class="mx-1 p-1" onclick="rezisize(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
					<path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
				  </svg>
		
				<svg  class="mx-1 p-1" onclick="removeElement(this.parentElement.parentElement.parentElement.parentElement), showNotification('Bloco de formulário LGPD excluído!', 'bg-danger')" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 15 15">
				<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
				</svg>
		  </div>
		</div>
	</nav>

	<div class="wdg_card my-3"> <!--Card-->
		<header class="wdg_card_header d-flex justify-content-between"><!--Cabeçalho-->
			<!-- <img src="/public/images/more_options.svg" width="25px"> -->
			<h6 >
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark-ruled" viewBox="0 0 16 16">
					<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h7v1a1 1 0 0 1-1 1H6zm7-3H6v-2h7v2z"/>
				</svg>
				  Transfira as informações
			</h6>
			</h6>
			<div class="d-flex window_behavior justify-content-end">
				<svg onclick="HideElement(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z"/>
					</svg>

				<!-- <svg onclick="removeElement(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				</svg> -->
			</div>
		</header>

		<div class="showContent content_lgpd_card">

			<div class="wdg_content_form"> <!--novos formulários podem ser adicionados aqui-->
				<div class="wdg_card_form container-fluid">
					<div class="row">
						<div class="col-md-6">
							<div class="input-group input-group-sm mb-3">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input  oninput="updateTextModelLGPD(event)" type="text" class="form-control phone" placeholder="Telefone 01"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<!-- <button onclick="fillInFields(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button> -->
							</div>

							<div class="input-group input-group-sm mb-3">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input  oninput="updateTextModelLGPD(event)" type="text" class="form-control phone" placeholder="Telefone 02"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<!-- <button onclick="fillInFields(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg>
								</button>   -->
							</div>

							<div class="input-group input-group-sm mb-3">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input oninput="updateTextModelLGPD(event)" type="text" class="form-control phone" placeholder="Telefone 03"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<!-- <button onclick="fillInFields(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button> -->
							</div>
						</div>


						<div class="col-md-6">
							<div class="input-group input-group-sm mb-3">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input  oninput="updateTextModelLGPD(event)" type="text" class="form-control phone" placeholder="Telefone 04"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<!-- <button onclick="fillInFields(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button> -->
							</div>

							<div class="input-group input-group-sm mb-3">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input oninput="updateTextModelLGPD(event)"   type="text" class="form-control email" placeholder="E-mail"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<!-- <button onclick="fillInFields(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button> -->
							</div>
						</div><!--End row 6-->
					</div><!--row-->
				</div> <!--end wdg_card_form-->
			</div><!--End wdg_content_form-->

			

			<div class="wdg_card_btn_util">
				<div class="row">
					<div class="input-group input-group-sm mb-3">
						<span class="input-group-text" id="inputGroup-sizing-sm">Modelo</span>
						<textarea class="form-control model_lgpd" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm"></textarea>
					</div>
		
	
					<div class="input-group input-group-sm mb-3">
						<button onclick="getLgpdDefaultText(this)" class="btn btn-outline-secondary " type="button">Copiar modelo</button>
						<button onclick="clearContainer(this)"  class="btn btn-outline-secondary" type="button">Apagar preenchimento</button>
						<button onclick="fillInTheFieldsLgpd(this)"  class="btn btn-outline-secondary btn_set_text_lgpd"  type="button">Preencher</button>
					</div>
				</div>
				
			</div>

		</div>

	</div><!--End wdg_card-->
</div>
		`;
		let parser = new DOMParser();
		let doc = parser.parseFromString(htmlString, "text/html");
		let wdg_conteiner = document.querySelectorAll('.wdg_conteiner')[0];
		if(wdg_conteiner.querySelectorAll('.wdg_content_lgpd').length > 0 ){
			showNotification('Bloco para padrão de verificação LGPD já existe na página!', 'bg-warning')
			// return
		}

		// Adiciona o primeiro elemento filho do documento
		wdg_conteiner.appendChild(doc.body.firstChild);
		showNotification('Bloco para padrão de verificação LGPD adicionado na página!', 'bg-success')

		var theme = localStorage.getItem('theme')
		if(theme == 'dark'){
			applyDarkTheme()
		}else{
			applyLightTheme()
		}

		execProfile();
	}

	function addShortShortcut(){
		let htmlString = `<!-- ATALHOS RÁPIDOS -->
			<div class="wdg_content wdg_window wdg_window_50 mb-3 item float-start wdg_content_atalhos_rapidos" >
				<nav class="d-flex justify-content-between align-items-center">
					<img src="/public/images/maximize.svg" width="12px" class="hide_element_visibility">
					<h6 id="archor_small_shortcut">ATALHOS CURTOS</h6>
					<div class="bg-warning p-1 rounded-pill bg-color">

						<div class="d-flex window_behavior justify-content-end " style="width: 80px !important;">

							<svg class="mx-1 p-1" onclick="rezisize(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
								<path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
							</svg>
					
							<svg  class="mx-1 p-1" onclick="removeElement(this.parentElement.parentElement.parentElement.parentElement), showNotification('Bloco de botões de atalho excluído!', 'bg-danger')" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 15 15">
							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
							</svg>
					</div>
					</div>
				</nav>

				<!-- <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
					<button type="button" class="btn  btn-primary " onclick="">Padrão</button>
					<button type="button" class="btn btn-outline-primary " onclick=""">Pessoal</button>
				</div> -->

				<div class="wdg_card wdg_shortcut my-3"> <!--Card-->
					<header class="wdg_card_header d-flex justify-content-between"><!--Cabeçalho-->
						<!-- <img src="/public/images/more_options.svg" width="25px"> -->
						<h6>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
							</svg>
							Exibir scripts curtos
						</h6>
						<div class="d-flex window_behavior justify-content-end">
							<svg onclick="getShortcuts(), populateShortcuts(this)"  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 15 15">
								<path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
								<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
							</svg>

							<svg onclick="HideElement(this.parentElement.parentElement.parentElement), populateShortcuts(this)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z"/>
							</svg>

							<!-- <svg onclick="removeElement(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
								<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
							</svg> -->
						</div>
					</header>

					<div class="showContent hide_element" >

						<div class="wdg_content_form"> <!--novos formulários podem ser adicionados aqui-->
							<div class="wdg_card_form container-fluid">
								<div class="wdg_content_form "> <!--novos formulários podem ser adicionados aqui-->
									<div  class="row btn-shortcuts overflow-auto rowShortcuts">
										<!-- <div class="input-group input-group-sm">
											<input type="button" class="form-control btn btn-primary my-1" aria-label="Text input with segmented dropdown button" value="Crie o seu atalho rápido">
											
											<button type="button" class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split my-1" data-bs-toggle="dropdown" aria-expanded="false">
											<span class="visually-hidden">Toggle Dropdown</span>
											</button>
											<ul class="dropdown-menu dropdown-menu-end">
											<li><a class="dropdown-item" href="/update?tb=shortcuts">Editar</a></li>
											<li><button class="dropdown-item" href="#">Excluir</button></li>
											</ul>
										</div> -->

									</div>
								</div>
							</div> <!--End wdg_card_form-->
						</div><!--End wdg_content_form-->
							

					</div><!--End showContent-->

				</div><!--End wdg_card-->
				
			</div>`;
		let parser = new DOMParser();
		let doc = parser.parseFromString(htmlString, "text/html");
		let wdg_conteiner = document.querySelectorAll('.wdg_conteiner')[0];
		if(wdg_conteiner.querySelectorAll('.wdg_content_atalhos_rapidos').length > 0 ){
			showNotification('Bloco com botões de atalho rápido já existe na página!', 'bg-warning')
			// return
		}

		// Adiciona o primeiro elemento filho do documento
		wdg_conteiner.appendChild(doc.body.firstChild);
		showNotification('Bloco com botões de atalho rápido adicionado na página!', 'bg-success')

		var theme = localStorage.getItem('theme')
		if(theme == 'dark'){
			applyDarkTheme()
		}else{
			applyLightTheme()
		}

		execProfile();

	}

	function addScriptTemplates(){
		let htmlString = `<!-- MODELOS DE SCRIPT -->
			<div class="wdg_content wdg_window wdg_window_50 mb-3 item float-start script_models  wdg_content_script_models" >
				<nav class="d-flex justify-content-between align-items-center">
					<img src="/public/images/maximize.svg" width="12px" class="hide_element_visibility">
					<h6 id="archor_text_models">MODELOS DE SCRIPT</h6>
					<div class="bg-warning p-1 rounded-pill bg-color">

						<div class="d-flex window_behavior justify-content-end " style="width: 80px !important;">

							<svg class="mx-1 p-1" onclick="rezisize(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
								<path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
							</svg>
					
							<svg  class="mx-1 p-1" onclick="removeElement(this.parentElement.parentElement.parentElement.parentElement), showNotification('Bloco de modelos de script excluído!', 'bg-danger')" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 15 15">
							<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
							</svg>
					</div>
					</div>
				</nav>

				<!-- <div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
					<button type="button" class="btn  btn-primary " onclick="">Padrão</button>
					<button type="button" class="btn btn-outline-primary " onclick=""">Pessoal</button>
				</div> -->


				<div class="wdg_card show_text_template my-3"> <!--Card-->
					<header class="wdg_card_header d-flex justify-content-between"><!--Cabeçalho-->
						<!-- <img src="/public/images/more_options.svg" width="25px"> -->
						<h6>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layout-text-window-reverse" viewBox="0 0 16 16">
								<path d="M13 6.5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm0 3a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5zm-.5 2.5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1 0-1h5z"/>
								<path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12zM2 1a1 1 0 0 0-1 1v1h14V2a1 1 0 0 0-1-1H2zM1 4v10a1 1 0 0 0 1 1h2V4H1zm4 0v11h9a1 1 0 0 0 1-1V4H5z"/>
							</svg>
							Exibir modelos de script
						</h6>
						<div class="d-flex window_behavior justify-content-end">
							<svg onclick="getScriptsByDefault(), addTexplateModelsWithShortCutsOnContainer(this)"  xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-arrow-counterclockwise" viewBox="0 0 15 15">
								<path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
								<path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
							</svg>

							<svg onclick="HideElement(this.parentElement.parentElement.parentElement), addTemplateModelsWithShortCutsOnContainer(this)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
								<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z"/>
							</svg>

							<!-- <svg onclick="removeElement(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
								<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
							</svg> -->
						</div>
					</header>

					<div class="showContent hide_element" >

						<div class="wdg_content_form"> <!--novos formulários podem ser adicionados aqui-->
							<div class="wdg_card_form container-fluid">
								
								<div class="my-2 row searchOptions">
									<div class="col-md-6 my-3">
										<select class="form-select selectGroupCategory" aria-label="Default select example" onchange="filterTexModelsByOption(this)">
											<option  selected>Todas as respostas</option>
										</select>
									</div>

									<div class="col-md-6 my-3">
										<div class="d-flex" role="search">
											<input class="form-control me-2" type="search" placeholder="Digite aqui sua pesquisa" aria-label="Search"
											oninput="filterTexModelsBySearch(this.parentElement)">
											<button class="btn btn-outline-success" onclick="filterTexModelsBySearch(this.parentElement)">Pesquisar</button>
										</div>
									</div>
								</div>
								<div class="row overflow-auto conteiner_text_models">
									
									

									

								</div><!--Endrow-->

								
							</div> <!--End wdg_card_form-->
						</div><!--End wdg_content_form-->
							

					</div><!--End showContent-->

				</div><!--End wdg_card-->
				
			</div>`;
		let parser = new DOMParser();
		let doc = parser.parseFromString(htmlString, "text/html");
		let wdg_conteiner = document.querySelectorAll('.wdg_conteiner')[0];
		if(wdg_conteiner.querySelectorAll('.wdg_content_script_models').length > 0 ){
			showNotification('Bloco com modelos de reposta já existe na página!', 'bg-warning')
			// return
		}

		// Adiciona o primeiro elemento filho do documento
		wdg_conteiner.appendChild(doc.body.firstChild);
		showNotification('Bloco com modelos de reposta adicionados na página!', 'bg-success')


		let phones = doc.querySelectorAll(".phone");
		phones.forEach(phone => {
			phone.addEventListener("input", (event) => {
				updateTextModelLGPD(event)
			});
		});




		var theme = localStorage.getItem('theme')
		if(theme == 'dark'){
			applyDarkTheme()
		}else{
			applyLightTheme()
		}

		execProfile();

	}

	function addNoc(){
		setActiveTextNocDefault()
		
		let htmlString = `
			<!-- PADRÂO ROMPIMENTO DE CABOS-->
<div class="wdg_content wdg_window wdg_window_50 mb-3 item float-start wdg_content_script_noc" >
	<nav class="d-flex justify-content-between align-items-center">
		<img src="/public/images/maximize.svg" width="12px" class="hide_element_visibility">
		<h6 id="archor_default_noc">PADRÃO NOC</h6>
		<div class="bg-warning p-1 rounded-pill bg-color">

			<div class="d-flex window_behavior justify-content-end " style="width: 80px !important;">

				<svg class="mx-1 p-1" onclick="rezisize(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
					<path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
				  </svg>
		
				<svg  class="mx-1 p-1" onclick="removeElement(this.parentElement.parentElement.parentElement.parentElement), showNotification('Bloco de formulário de verificação com a supervisão ou NOC excluído!', 'bg-danger')" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 15 15">
				<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
				</svg>
		  </div>
		</div>
	</nav>

	<div class="btn-group btn-group-sm" role="group" aria-label="Small button group">
		<!-- <button type="button" class="btn  btn-primary btn_for_enable_noc_form" onclick=" enableRompimentoCabosForm(), getNocDefaultText(this)"">Rompimento de cabos</button>
		<button type="button" class="btn btn-outline-primary btn_for_enable_financeiro_form" onclick="enableNocForm(), getNocDefaultText(this)">padrão Noc</button> -->
		<button type="button" class="btn  btn-primary btn_for_enable_rompimento_form" onclick="enableRompimentoCabosForm(), getNocDefaultText(this)">Rompimento de cabos</button>
		<button type="button" class="btn btn-outline-primary btn_for_enable_noc_form" onclick="enableNocForm(), getNocDefaultText(this)">padrão Noc</button>
		<button type="button" class="btn btn-outline-primary btn_for_enable_financeiro_form" onclick="enableFinanceiroForm(), getNocDefaultText(this)">Financeiro</button>
	</div>

	<div class="wdg_card my-3"> <!--Card-->
		<header class="wdg_card_header d-flex justify-content-between"><!--Cabeçalho-->
			<!-- <img src="/public/images/more_options.svg" width="25px"> -->
			<h6 >
				<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark-ruled" viewBox="0 0 16 16">
					<path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h7v1a1 1 0 0 1-1 1H6zm7-3H6v-2h7v2z"/>
				</svg>
				  Transfira as informações
			</h6>
			</h6>
			<div class="d-flex window_behavior justify-content-end">
				<svg onclick="HideElement(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
					<path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z"/>
					</svg>

				<!-- <svg onclick="removeElement(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
					<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				</svg> -->
			</div>
		</header>

		<div class="showContent">

			<div class="wdg_content_form"> <!--novos formulários podem ser adicionados aqui-->
				<div class="wdg_card_form container-fluid">
					<div class="row">
						<div class="col-md-6">
							<!---FHTT--->
							<div class="input-group input-group-sm mb-3 enable-noc enable-rompimento">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input oninput="getNocDefaultText(this)"  type="text" class="form-control fhtt" placeholder="FHTT/ALCL"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button>
							</div>
							<!---Usuário--->
							<div class="input-group input-group-sm mb-3 enable-noc enable-rompimento enable-financeiro">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input oninput="getNocDefaultText(this)"   type="text" class="form-control user" placeholder="Usuário"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg>
								</button>  
							</div>
							<!---Cidade--->
							<div class="input-group input-group-sm mb-3 enable-noc enable-rompimento">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input oninput="getNocDefaultText(this)"  type="text" class="form-control city" placeholder="Cidade"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button>
							</div>
							<!---Autenticação--->
							<div class="input-group input-group-sm mb-3 enable-noc enable-rompimento">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input oninput="getNocDefaultText(this)" type="text" class="form-control authentication" placeholder="Autenticação"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button>
							</div>
							<!---Plano--->
							<div class="input-group input-group-sm mb-3 enable-noc enable-rompimento">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input oninput="getNocDefaultText(this)"   type="text" class="form-control user_plan" placeholder="Plano"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button>
							</div>

							<!---Protocolo--->
							<div class="input-group input-group-sm mb-3 enable-financeiro hide_element">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input   oninput="getNocDefaultText(this)" type="text" class="form-control protocol" placeholder="Protocolo"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button>
							</div>

						</div>

						
						<div class="col-md-6">
							<!---Nome--->
							<div class="input-group input-group-sm mb-3 enable-rompimento">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input oninput="getNocDefaultText(this)"   type="text" class="form-control name" placeholder="Nome"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button>
							</div>

							<!---Telefone--->
							<div class="input-group input-group-sm mb-3 enable-rompimento">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input  oninput="getNocDefaultText(this)"  type="text" class="form-control phone" placeholder="Telefone"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button>
							</div>

							<!---Endereço--->
							<div class="input-group input-group-sm mb-3 enable-rompimento">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<input   oninput="getNocDefaultText(this)" type="text" class="form-control address" placeholder="Endereço"
									aria-label="Example text with button addon" aria-describedby="button-addon1">
								<button onclick="setInputValue(this), getNocDefaultText(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button>
							</div>

							<!---Risco--->
							<div class="input-group input-group-sm mb-3 enable-rompimento">
								<label class="input-group-text" for="selectTxtRisk">Há risco?</label>
								<select class="form-select selectTxtRisk" id="selectTxtRisk" onchange="getNocDefaultText(this)">
								  <option value="Sim"  >Sim</option>
								  <option value="Não" selected>Não</option>
								</select>
							</div>

							<!---Cabo Drop--->
							<div class="input-group input-group-sm mb-3 enable-rompimento">
								<label class="input-group-text" for="selectTxtRisk">Cabo DROP?</label>
								<select class="form-select selectTxtDrop" id="selectTxtRisk" onchange="getNocDefaultText(this)">
								  <option value="Sim"  >Sim</option>
								  <option value="Não" selected>Não</option>
								</select>
							</div>

							<!---Motivo--->
							<div class="input-group input-group-sm mb-3 enable-noc enable-rompimento enable-financeiro">
								<button onclick="getInputValue(this.parentElement)"
									class="btn btn-outline-secondary rounded-start" type="button" id="button-addon1">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-clipboard" viewBox="0 0 16 16">
										<path
											d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z" />
										<path
											d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z" />
									</svg>
								</button>

								<textarea oninput="getNocDefaultText(this)"  type="text" class="form-control reason" placeholder="Motivo"
									aria-label="Example text with button addon" aria-describedby="button-addon1"></textarea>
								<!-- <button onclick="setInputValue(this)" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
										class="bi bi-arrow-right" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
									</svg></i>
								</button> -->
							</div>

							

						</div><!--End row 6-->
				</div><!--row-->
				</div> <!--end wdg_card_form-->
			</div><!--End wdg_content_form-->

			

			<div class="wdg_card_btn_util">
				<div class="row">
					<div class="input-group input-group-sm mb-3">
						<span class="input-group-text" id="inputGroup-sizing-sm">Modelo</span>
						<textarea class="form-control model_noc" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">Preencha os campos acima 
						</textarea>
					</div>
		
	
					<div class="input-group input-group-sm mb-3">
						<button onclick="getNocDefaultText(this), setNocDefaultText(this)" class="btn btn-outline-secondary" type="button">Copiar modelo</button>
						<!-- <button onclick="getNocDefaultText(this)" class="btn btn-outline-secondary" type="button">Atualizar</button> -->
						<!-- <button onclick="getLgpdDefaultText(this)" class="btn btn-outline-secondary" type="button">Preencher</button> -->
						<button onclick="clearContainer(this)"  class="btn btn-outline-secondary" type="button">Apagar preenchimento</button>
					</div>
				</div>
				
			</div>

		</div>

	</div><!--End wdg_card-->
</div>
		`;
		let parser = new DOMParser();
		let doc = parser.parseFromString(htmlString, "text/html");
		let wdg_conteiner = document.querySelectorAll('.wdg_conteiner')[0];
		if(wdg_conteiner.querySelectorAll('.wdg_content_script_noc').length > 0 ){
			showNotification('Bloco com formulário de verificação com NOC ou Supervisão já existe na página!', 'bg-danger')
			// return
		}

		// Adiciona o primeiro elemento filho do documento
		wdg_conteiner.appendChild(doc.body.firstChild);
		showNotification('Bloco com formulário de verificação com NOC ou Supervisão adicionado na página!', 'bg-success')


		var theme = localStorage.getItem('theme')
		if(theme == 'dark'){
			applyDarkTheme()
		}else{
			applyLightTheme()
		}

		execProfile();

	}


	function addFinanceiro(){
		
		let htmlString = `
			<!-- PADRÂO FINANCEIRO-->
            <div class="wdg_content wdg_window wdg_window_50 mb-3 item float-start wdg_content_script_financeiro" >
	            
    <nav class="d-flex justify-content-between align-items-center">
        <!-- <img src="/public/images/maximize.svg" width="12px">  -->
        <h6>PADRÃO PENDÊNCIAS</h6>
        <div class="bg-warning p-1 rounded-pill bg-color">

			<div class="d-flex window_behavior justify-content-end " style="width: 80px !important;">

				<svg class="mx-1 p-1" onclick="rezisize(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
					<path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
				  </svg>
		
				<svg  class="mx-1 p-1" onclick="removeElement(this.parentElement.parentElement.parentElement.parentElement), showNotification('Excluído utilitário de criação de modelo de script financeiro!', 'bg-danger')" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 15 15">
				<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"></path>
				</svg>
		  </div>
		</div>
     </nav>

        <div class="wdg_card "> <!--Card-->
            <header class="wdg_card_header d-flex justify-content-between"><!--Cabeçalho-->
                <!-- <img src="/public/images/more_options.svg" width="25px"> -->
                <h6 >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-file-earmark-ruled" viewBox="0 0 16 16">
                        <path d="M14 14V4.5L9.5 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2zM9.5 3A1.5 1.5 0 0 0 11 4.5h2V9H3V2a1 1 0 0 1 1-1h5.5v2zM3 12v-2h2v2H3zm0 1h2v2H4a1 1 0 0 1-1-1v-1zm3 2v-2h7v1a1 1 0 0 1-1 1H6zm7-3H6v-2h7v2z"/>
                    </svg>
                    Transfira as informações <span style="color: red;"> (Botão de link para pagamento adicionado! )</span>
                </h6>
                </h6>
                <div class="d-flex window_behavior justify-content-end">
                    <svg onclick="HideElement(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8Zm7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0Zm-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0v-3.793Z"/>
                        </svg>

                    <!-- <svg onclick="removeElement(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                    </svg> -->
                </div>
            </header>

            <div class="showContent">

                <div class="wdg_content_form"> <!--novos formulários podem ser adicionados aqui-->
                    <div class="wdg_card_form container-fluid">
                        <div class="row">

	                    </div><!--row-->
                    </div> <!--end wdg_card_form-->
                </div><!--End wdg_content_form-->

                

                <div class="wdg_card_btn_util">
                    <div class="">
                        <div class="input-group input-group-sm mb-3">
                            <span class="input-group-text" id="inputGroup-sizing-sm">Modelo</span>
                            <textarea readonly class="form-control model_pending" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
Nesse cadastro, consta em aberto a(s) seguinte(s) fatura(s): 
- Valor: R$xx,xx | Vencimento: dd/mm/aaaa
Acesse por meio do Painel Financeiro no site da FasterNet: https://www2.fasternet.com.br/financa/default.asp
                            </textarea>
							
							<div class="d-flex flex-column btn-group-vertical">
								<button onclick="updatePendingValue(this)" class="btn btn-outline-secondary  " type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-clockwise" viewBox="0 0 16 16">
										<path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
										<path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
									  </svg>
								</button>
					
								<button onclick="insertPendingValues(this)" class="btn btn-outline-secondary  " type="button" id="button-addon2">
									<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
										<path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"></path>
										</svg>
								</button>	
                                
                                <button onclick="insertPendingValues(this)" class="btn btn-outline-secondary  " type="button" id="button-addon2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-link" viewBox="0 0 16 16">
                                        <path d="M6.354 5.5H4a3 3 0 0 0 0 6h3a3 3 0 0 0 2.83-4H9q-.13 0-.25.031A2 2 0 0 1 7 10.5H4a2 2 0 1 1 0-4h1.535c.218-.376.495-.714.82-1z"/>
                                        <path d="M9 5.5a3 3 0 0 0-2.83 4h1.098A2 2 0 0 1 9 6.5h3a2 2 0 1 1 0 4h-1.535a4 4 0 0 1-.82 1H12a3 3 0 1 0 0-6z"/>
                                    </svg>
								</button>

							</div>
                        </div>

						<div class="row input_temp_conteiner mb-3 overflow-auto">

						</div>
            

                        <div class="input-group input-group-sm mb-3">
                            <button onclick="updatePendingValue(this), getPendingDefaultText(this)" class="btn btn-outline-secondary" type="button">Copiar modelo</button>
                            <!-- <button onclick="getNocDefaultText(this)" class="btn btn-outline-secondary" type="button">Atualizar</button> -->
                            <!-- <button onclick="getLgpdDefaultText(this)" class="btn btn-outline-secondary" type="button">Preencher</button> -->
                            <button onclick="clearContainer(this)"  class="btn btn-outline-secondary" type="button">Apagar preenchimento</button>
                        </div>
                    </div>
                    
                </div>

            </div>

        </div><!--End wdg_card-->
            </div>
		`;
		let parser = new DOMParser();
		let doc = parser.parseFromString(htmlString, "text/html");
		let wdg_conteiner = document.querySelectorAll('.wdg_conteiner')[0];
		if(wdg_conteiner.querySelectorAll('.wdg_content_script_financeiro').length > 0 ){
			showNotification('Bloco de Script Financeiro já existe na página!', 'bg-danger')
			// return
		}

		// Adiciona o primeiro elemento filho do documento
		wdg_conteiner.appendChild(doc.body.firstChild);
		showNotification('Bloco de Script Financeiro adicionado na página!', 'bg-success')


		var theme = localStorage.getItem('theme')
		if(theme == 'dark'){
			applyDarkTheme()
		}else{
			applyLightTheme()
		}

		execProfile();
	}

	  			  
	function showFormDesk(el, hide = 'hide_form'){
		console.log(hide)
		let container = el.parentElement.parentElement.parentElement
		let form = container.querySelector('.show_form')
		let content = container.querySelector('.showContent')


		console.log(container)
		if(hide == 'hide_form'){
			if( !content.classList.contains('hide_element')){
				form.classList.toggle('hide_element')
			}
			
		}else if(hide == 'hide_all'){
			form.classList.add('hide_element')
			// content.classList.toggle('hide_element')
		}
 
			
		 
		

	}



	function disableDefaultShortCutOnTextEditor() {
		const url = '/textmodelstore';
		const method = "POST";
	
		// Obtendo o estado atual e alternando entre 'enable' e 'disable'
		const currentStatus = localStorage.getItem('default_script_models');
		const updatedStatus = currentStatus === 'enable' ? 'disable' : 'enable';
	
		// Adicionando o status ao corpo da requisição
		const data = new URLSearchParams();
		data.append('status', updatedStatus);
	
		// Enviando a solicitação via fetch
		fetch(url, {
			method: method,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: data
		})
		.then(response => response.json())
		.then(value => {
			if (value['status'] === 'success') {
				alert(value['message']);
				// Atualizando o valor no localStorage após sucesso
				localStorage.setItem('default_script_models', updatedStatus);
				document.querySelectorAll('.btnCheckDefaultTextModels').forEach(btn=>{
					btn.removeAttribute('checked')
				})

			} else {
				alert(value['message'] || 'Não aplicado');
			}
		})
		.catch(error => {
			console.error('Erro na requisição:', error);
			alert('Ocorreu um erro ao tentar aplicar a alteração.');
		});
	}
	
 


// E-mails fictícios para autocomplete
const mockEmails = [
    "ana.teste@exemplo.com",
    "joao.teste@exemplo.com",
    "maria.teste@exemplo.com",
    "pedro.teste@exemplo.com",
    "lucas.teste@exemplo.com"
];

// Sugere e-mails enquanto o usuário digita
async function suggestEmails(input) {
    const query = input.value.toLowerCase();
    if (query.length < 2) return; // Sugestão após 2 caracteres

    const suggestions = mockEmails.filter(email => email.toLowerCase().includes(query));
    const datalist = input.getAttribute('list') === 'emailSuggestions' 
        ? document.getElementById('emailSuggestions') 
        : document.getElementById('emailSuggestionsCopia');

    datalist.innerHTML = '';
    suggestions.forEach(email => {
        const option = document.createElement('option');
        option.value = email;
        datalist.appendChild(option);
    });
}

// Desabilita o campo "Para" ao marcar "Enviar para todos"
function toggleSendToAll(checkbox) {
    const destinatarioInput = document.getElementById('destinatario');
    destinatarioInput.disabled = checkbox.checked;
}

// Adiciona destinatários individuais à lista
function addRecipient() {
    const input = document.getElementById('destinatario');
    const email = input.value.trim().toLowerCase();
    if (!email || !validateEmail(email)) return alert("Insira um e-mail válido!");

    // Remove o e-mail da lista de cópias, se existir
    removeFromList(email, "copy-list");

    // Adiciona o e-mail na lista de destinatários
    const recipientList = document.getElementById('recipient-list');
    if (!addToList(email, recipientList, "badge bg-primary", "destinatário")) {
        alert("Esse e-mail já está na lista de destinatários!");
    }
    input.value = ''; // Limpar input
}

// Adiciona e-mails à lista de cópias
function addCopy() {
    const input = document.getElementById('copia');
    const email = input.value.trim().toLowerCase();
    if (!email || !validateEmail(email)) return alert("Insira um e-mail válido!");

    // Remove o e-mail da lista de destinatários, se existir
    removeFromList(email, "recipient-list");

    // Adiciona o e-mail na lista de cópias
    const copyList = document.getElementById('copy-list');
    if (!addToList(email, copyList, "badge bg-secondary", "cópia")) {
        alert("Esse e-mail já está na lista de cópias!");
    }
    input.value = ''; // Limpar input
}

// Adiciona o e-mail à lista especificada
function addToList(email, listElement, badgeClass, listName) {
    const existingEmails = Array.from(listElement.querySelectorAll("span")).map(span => span.textContent.trim());
    if (existingEmails.includes(email)) return false; // Evitar duplicados

    const span = document.createElement('span');
    span.className = `${badgeClass} me-2`;
    span.textContent = email;
    const removeButton = document.createElement('button');
    removeButton.className = 'btn-close btn-sm ms-1';
    removeButton.onclick = () => listElement.removeChild(span);
    span.appendChild(removeButton);
    listElement.appendChild(span);

    console.log(`Adicionado à lista de ${listName}: ${email}`);
    return true;
}

// Remove o e-mail de uma lista específica
function removeFromList(email, listId) {
    const listElement = document.getElementById(listId);
    const items = Array.from(listElement.querySelectorAll("span"));
    items.forEach(item => {
        if (item.textContent.trim().toLowerCase() === email) {
            listElement.removeChild(item);
            console.log(`Removido de ${listId}: ${email}`);
        }
    });
}

// Valida o formato do e-mail
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}



 
const block = document.querySelector('.block-container');
let isDraggingBlock = false;
let dragEnabled = true; // Toggle para ativar/desativar arrasto
let offsetX, offsetY;

// Botão para ativar/desativar arrasto
document.querySelector('#toggle-drag').addEventListener('click', () => {
  dragEnabled = !dragEnabled;
  block.style.cursor = dragEnabled ? 'grab' : 'default';
});

// Início do arrasto
block.addEventListener('mousedown', (e) => {
  if (!dragEnabled) return;
  isDraggingBlock = true;
  offsetX = e.clientX - block.offsetLeft;
  offsetY = e.clientY - block.offsetTop;
  block.style.transition = 'none';
  block.style.cursor = 'grabbing';
});

// Movimento do mouse
document.addEventListener('mousemove', (e) => {
  if (isDraggingBlock && dragEnabled) {
    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // Limita dentro da viewport
    const maxLeft = window.innerWidth - block.offsetWidth;
    const maxTop = window.innerHeight - block.offsetHeight;

    block.style.left = `${Math.min(Math.max(0, newLeft), maxLeft)}px`;
    block.style.top = `${Math.min(Math.max(0, newTop), maxTop)}px`;
  }
});

// Fim do arrasto
document.addEventListener('mouseup', () => {
  isDraggingBlock = false;
  block.style.cursor = dragEnabled ? 'grab' : 'default';
});

// Reposiciona se a tela for redimensionada
window.addEventListener('resize', () => {
  const maxLeft = window.innerWidth - block.offsetWidth;
  const maxTop = window.innerHeight - block.offsetHeight;

  const currentLeft = parseInt(block.style.left) || 0;
  const currentTop = parseInt(block.style.top) || 0;

  block.style.left = `${Math.min(currentLeft, maxLeft)}px`;
  block.style.top = `${Math.min(currentTop, maxTop)}px`;
});
