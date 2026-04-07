function defaultPendences(){
    let div = document.createElement('div')
    div.classList.add("wdg_content", "wdg_window", "wdg_window_50", "mb-3", "item", "float-start", "utilitario_script_financeiro");
    div.innerHTML = `
    <nav class="d-flex justify-content-between align-items-center">
        <img src="/public/images/maximize.svg" width="12px">
        <h6>PADRÃO PENDÊNCIAS</h6>
        <div class="bg-warning p-1 rounded-pill">

			<div class="d-flex window_behavior justify-content-end " style="width: 80px !important;">

				<svg class="mx-1 p-1" onclick="rezisize(this.parentElement.parentElement.parentElement)" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-expand-vertical" viewBox="0 0 16 16">
					<path d="M8 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M.146 8.354a.5.5 0 0 1 0-.708l2-2a.5.5 0 1 1 .708.708L1.707 7.5H5.5a.5.5 0 0 1 0 1H1.707l1.147 1.146a.5.5 0 0 1-.708.708zM10 8a.5.5 0 0 1 .5-.5h3.793l-1.147-1.146a.5.5 0 0 1 .708-.708l2 2a.5.5 0 0 1 0 .708l-2 2a.5.5 0 0 1-.708-.708L14.293 8.5H10.5A.5.5 0 0 1 10 8"/>
				  </svg>
		
				<svg  class="mx-1 p-1" onclick="removeElement(this.parentElement.parentElement.parentElement.parentElement.parentElement), showNotification('Excluído utilitário de criação de modelo de script financeiro!', 'bg-danger')" xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 15 15">
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

        </div><!--End wdg_card-->`

        if(document.body.querySelectorAll('.utilitario_script_financeiro').length > 0){
			// showNotification('Bloco com formulário de verificação com NOC ou Supervisão já existe na página!', 'bg-danger')
			return null
		}


        return div

}


function isLinkOrDate(input) {
    // Remove espaços em branco e quebras de linha
    const cleanedInput = input.trim().replace(/\s+/g, '');

    // Verifica se é um link (mais permissivo para path e parâmetros)
    const linkRegex = /^https?:\/\/[\w.-]+(\.[\w.-]+)+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/i;
    if (linkRegex.test(cleanedInput)) {
        return true;
    }

    // Verifica se é uma data no formato dd/mm/yyyy
    const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    if (dateRegex.test(cleanedInput)) {
        return false;
    }

    // Se não for nem link nem data, retorna null
    return null;
}


function insertPendingValues(child, el=''){

    navigator.clipboard.readText()
		.then(function (data) {


            if ( isLinkOrDate(data) ){

                
                // Determine the updated value based on the conditions
                var updatedValue = data;

                    // Format the updated text
                var updatedText = 'Link para pagamento: ' + updatedValue ;

                // wdg_text_area.innerHTML = wdg_text_area.innerHTML + "<br>" + updatedText
                console.log(date)


                let conteiner = findClass(child, '.input_temp_conteiner')
                let div2 = document.createElement('div')
                div2.classList.add('input-group', 'input-group-sm')
                div2.innerHTML = `<input onclick="getText(this)" type="button" class="input_temp form-control btn btn-primary my-1" aria-label="Text input with segmented dropdown button" value="${updatedText}">
                <button onclick="removeElement(this.parentElement)" type="button" class="btn btn-outline-secondary my-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
                </button>
                `
                // div2.value = updatedText
                conteiner.appendChild(div2)
                let pending = ''

                conteiner = findClass(child, '.wdg_card_btn_util')
                let input_temp = conteiner.querySelectorAll('.input_temp')
                if(input_temp != null){
                    console.log(input_temp)
                    input_temp.forEach(el => {
                        pending = pending +"\n" + el.value
                    });
                }


                
                let textDefault = `Nesse cadastro, consta em aberto a(s) seguinte(s) fatura(s):${pending}\n\nTambém poderá acessar pelo Painel Financeiro no site da FasterNet: https://www2.fasternet.com.br/financa/default.asp\n\nA partir do link de pagamento, você pode pagar online via crédito, débito, PIX, ou se preferir, pode ainda gerar o boleto para acesso ao código de barras através da plataforma PAGAR COM CIELO.\n\nGostaríamos de lembrar que, para o reconhecimento ocorrer mais rápido, o pagamento deve ser efetuado via PIX, cartão de crédito ou débito através do nosso site. Caso seja efetuado através do boleto, será necessário aguardar o prazo de até 72 horas úteis para ser reconhecido.
                `
                conteiner.querySelector('.model_pending').value = textDefault
            


            }else{

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
                var updatedText = '- Valor: R$' + updatedValue + ' | Vencimento: ' + date;

                // wdg_text_area.innerHTML = wdg_text_area.innerHTML + "<br>" + updatedText
                console.log(date)


                let conteiner = findClass(child, '.input_temp_conteiner')
                let div2 = document.createElement('div')
                div2.classList.add('input-group', 'input-group-sm')
                div2.innerHTML = `<input onclick="getText(this)" type="button" class="input_temp form-control btn btn-primary my-1" aria-label="Text input with segmented dropdown button" value="${updatedText}">
                <button onclick="removeElement(this.parentElement)" type="button" class="btn btn-outline-secondary my-1">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                </svg>
                </button>
                `
                // div2.value = updatedText
                conteiner.appendChild(div2)
                let pending = ''


                conteiner = findClass(child, '.wdg_card_btn_util')
                let input_temp = conteiner.querySelectorAll('.input_temp')
                if(input_temp != null){
                    console.log(input_temp)
                    input_temp.forEach(el => {
                        pending = pending +"\n" + el.value
                    });
                }


                
                let textDefault = `Nesse cadastro, consta em aberto a(s) seguinte(s) fatura(s):${pending}\n\nTambém poderá acessar pelo Painel Financeiro no site da FasterNet: https://www2.fasternet.com.br/financa/default.asp\n\nA partir do link de pagamento, você pode pagar online via crédito, débito, PIX, ou se preferir, pode ainda gerar o boleto para acesso ao código de barras através da plataforma PAGAR COM CIELO.\n\nGostaríamos de lembrar que, para o reconhecimento ocorrer mais rápido, o pagamento deve ser efetuado via PIX, cartão de crédito ou débito através do nosso site. Caso seja efetuado através do boleto, será necessário aguardar o prazo de até 72 horas úteis para ser reconhecido.
                `
                conteiner.querySelector('.model_pending').value = textDefault
            



                }//end else

                
            
	})

    
    
}

function updatePendingValue(child){
    let pending = ''
    conteiner = findClass(child, '.wdg_card_btn_util')
            let input_temp = conteiner.querySelectorAll('.input_temp')
            if(input_temp != null){
                console.log(input_temp)
                input_temp.forEach(el => {
                    pending = pending +"\n" + el.value
                });
            }


            
            let textDefault = `Nesse cadastro, consta em aberto a(s) seguinte(s) fatura(s):${pending}\nAcesse por meio do Painel Financeiro no site da FasterNet: https://www2.fasternet.com.br/financa/default.asp\n\nA partir do link de pagamento, você pode pagar online via crédito, débito, PIX, ou se preferir, pode ainda gerar o boleto para acesso ao código de barras através da plataforma PAGAR COM CIELO.\n\nGostaríamos de lembrar que, para o reconhecimento ocorrer mais rápido, o pagamento deve ser efetuado via PIX, cartão de crédito ou débito através do nosso site. Caso seja efetuado através do boleto, será necessário aguardar o prazo de até 72 horas úteis para ser reconhecido.`
            conteiner.querySelector('.model_pending').value = textDefault
}


function getPendingDefaultText(child){
    let value =  findClass(child, '.model_pending').value
    setTransferAreaValue(value, child)
}




function lockScroll(event) {
    var element = event.target;
    var html = document.querySelector("html");

    if (element.classList.contains("scroll-disable")) {
        element.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
                <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"/>
            </svg>
        `;
        element.classList.remove("scroll-disable");
        element.classList.add("scroll-enable");
        html.style.overflow = 'auto'; // Permitir scroll no HTML
    } else {
        element.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-unlock" viewBox="0 0 16 16">
                <path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2M3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1z"/>
            </svg>
        `;
        element.classList.remove("scroll-enable");
        element.classList.add("scroll-disable");
        html.style.overflow = 'hidden'; // Remover scroll do HTML
    }
}
