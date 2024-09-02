/**
 * Processo de renderização
 * fornecedores
 */


// Mudar propriedades do documento ao iniciar (UX)
document.addEventListener('DOMContentLoaded', () =>{
    document.getElementById('inputSearch').focus()
    btnCreate.disabled = true
    btnUpdate.disabled = true
    btnDelete.disabled = true
    
})

// Função para manipular o evento Enter - (UX)
function teclaEnter(event){
    if (event.key === 'Enter'){
        event.preventDefault()
        //executar a função associada ao botão buscar
        buscarFornecedor()
    }
}
// Adicionar a função de manipulação do evento da tecla Enter
function adicionarTeclaEnter(){
    document.getElementById('formFornecedor').addEventListener('keydown', teclaEnter)
}
adicionarTeclaEnter()

//  a função para remover manipulação do evento da tecla Enter
function removerTeclaEnter(){
    document.getElementById('formFornecedor').removeEventListener('keydown', teclaEnter)
    }


//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//captura dos inputs do formulário (passo 1 - slide)
let formFornecedor = document.getElementById('formFornecedor')
let idFornecedor = document.getElementById('inputIDForne')
let nomeFornecedor = document.getElementById('inputRazaoSocial')
let cnpjFornecedor = document.getElementById('inputCNPJ')
let foneFornecedor = document.getElementById('inputPhone')
let emailFornecedor = document.getElementById('inputMail')
let cepFornecedor = document.getElementById('inputCep')
let numeroFornecedor = document.getElementById('inputNumero')
let logradouroFornecedor = document.getElementById('inputLogradouro')
let bairroFornecedor = document.getElementById('inputBairro')
let cidadeFornecedor = document.getElementById('inputCidade')
let complementoFornecedor = document.getElementById('inputComplemento')
let estadoFornecedor = document.getElementById('inputEstado')

//evento relacionado ao botão adicionar (ainda passo 1 - slide)
formFornecedor.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeFornecedor.value,
        cnpjFornecedor.value,
        foneFornecedor.value,
        emailFornecedor.value,
        cepFornecedor.value,
        numeroFornecedor.value,
        logradouroFornecedor.value,
        bairroFornecedor.value,
        cidadeFornecedor.value,
        complementoFornecedor.value,
        estadoFornecedor.value)
    //Empacotar os dados em um objeto e enviar ao main.js (passo2 - slide)
    const fornecedor = {
        nomeForne: nomeFornecedor.value,
        cpnjForne: cnpjFornecedor.value,
        foneForne: foneFornecedor.value,
        emailForne: emailFornecedor.value,
        cepForne: cepFornecedor.value,
        numeroForne: numeroFornecedor.value,
        logradouroForne: logradouroFornecedor.value,
        bairroForne: bairroFornecedor.value,
        cidadeForne: cidadeFornecedor.value,
        complementoForne: complementoFornecedor.value,
        estadoForne: estadoFornecedor.value
    }
    api.newSupplier(fornecedor)
    //limpar os dados from após envio
    resetForm()
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// array(vetor) usado na renderização dos dados do fornecedor
let arrayFornecedor = []
//Função que vai enviar ao main um pedido de busca dos dados de um fornecedor pelo nome (Passo 1 - Slider)
function buscarFornecedor(){
    let nomeFornecedor = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
    //validação (UX)
    if(nomeFornecedor === ""){
        // validar campo obrigatório
        api.infoSearchSupplier()
    } else{
       // enviar o pedido de busca junto com o nome do fornecedor
       api.searchSupplier(nomeFornecedor)
    }
    // foco no campo de busca - (UX)
    api.focusSupplier((args) => {
        document.getElementById('inputSearch').focus()
    })
    // Setar o nome do fornecedor e habilitar o cadastramento
    api.nameSupplier((args) =>{

        // Restaurar o comportamento padrão da tecla Enter
        removerTeclaEnter()
        let setarNomeFornecedor = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
        console.log(setarNomeFornecedor)
        document.getElementById('inputRazaoSocial').value += setarNomeFornecedor
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputSearch').blur()
        document.getElementById('inputRazaoSocial').focus()
        
        btnRead.disabled = false
        btnCreate.disabled = false
    })
    
    // limpar a caixa de busca e setar o foco
    api.clearSearch((args)=>{
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // receber do main.js os dados do fornecedor (passo 4)
    api.dataSupplier((event, dadosFornecedor) =>{
        arrayFornecedor = JSON.parse(dadosFornecedor)
        console.log(arrayFornecedor)
        console.log(dadosFornecedor)
    
    // Passo 5 (final) percorre o array, extrair os dados e setar os campos de texto (caixas input) do formulário
    arrayFornecedor.forEach((f) =>{
        document.getElementById('inputIDForne').value = f._id,
        document.getElementById('inputRazaoSocial').value = f.nomeFornecedor,
        document.getElementById('inputCNPJ').value = f.cnpjFornecedor,
        document.getElementById('inputPhone').value = f.foneFornecedor,
        document.getElementById('inputMail').value = f.emailFornecedor,
        document.getElementById('inputCep').value = f.cepFornecedor,
        document.getElementById('inputNumero').value = f.numeroFornecedor,
        document.getElementById('inputLogradouro').value = f.logradouroFornecedor,
        document.getElementById('inputBairro').value = f.bairroFornecedor,
        document.getElementById('inputCidade').value = f.cidadeFornecedor,
        document.getElementById('inputComplemento').value = f.complementoFornecedor,
        document.getElementById('inputEstado').value = f.estadoFornecedor,
        //limpar a caixa de busca (UX) desativa e remove o foco
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').blur()
        document.getElementById('inputSearch').disabled = true
        //ativar os botões update e delete
        document.getElementById('btnUpdate').disabled = false
        document.getElementById('btnDelete').disabled = false
        //desativar create e read
        document.getElementById('btnCreate').disabled = true
        document.getElementById('btnRead').disabled = true

    })
})
}
//CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
function editarFornecedor(){
    //Passo 1 do slide
    const fornecedor = {
        idForne: idFornecedor.value,
        nomeForne: nomeFornecedor.value,
        cpnjForne: cnpjFornecedor.value,
        foneForne: foneFornecedor.value,
        emailForne: emailFornecedor.value,
        cepForne: cepFornecedor.value,
        numeroForne: numeroFornecedor.value,
        logradouroForne: logradouroFornecedor.value,
        bairroForne: bairroFornecedor.value,
        cidadeForne: cidadeFornecedor.value,
        complementoForne: complementoFornecedor.value,
        estadoForne: estadoFornecedor.value
    }
    console.log(fornecedor) //teste do passo 1
    console.log(nomeFornecedor.value) // Passo 1 (obter id do fornecedor)
    //Passo 2: Enviar o objeto fornecedor ao main.js
    if(nomeFornecedor.value === ""){
        // validar campo obrigatório
        api.infoSearchSupplier()
    } else{
       // enviar o pedido de busca junto com o nome do fornecedor
       api.updateSupplier(fornecedor)
       resetForm()
    }
    
    
}
//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirFornecedor(){
    let idForne = idFornecedor.value // Passo 1 (obter o id do fornecedor)
    console.log(idForne) // Passo 1 (obter id do fornecedor)
    console.log(nomeFornecedor.value) // Passo 1 (obter id do fornecedor)
    if(nomeFornecedor.value === ""){
        // validar campo obrigatório
        api.infoSearchSupplier()
    } else{
        api.deleteSupplier(idForne) // Passo 2 - enviar o id do fornecedor ao main
        resetForm()
    }
    
    
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Reset do formulário
function resetForm(){
document.getElementById('formFornecedor').value = ""
document.getElementById('inputIDForne').value = ""
document.getElementById('inputRazaoSocial').value = ""
document.getElementById('inputCNPJ').value = ""
document.getElementById('inputPhone').value = ""
document.getElementById('inputMail').value = ""
document.getElementById('inputCep').value = ""
document.getElementById('inputNumero').value = ""
document.getElementById('inputLogradouro').value = ""
document.getElementById('inputBairro').value = ""
document.getElementById('inputCidade').value = ""
document.getElementById('inputComplemento').value = ""
document.getElementById('inputEstado').value = ""
document.getElementById('inputSearch').focus()
document.getElementById('inputSearch').disabled = false
btnCreate.disabled = true
btnUpdate.disabled = true
btnDelete.disabled = true
btnRead.disabled = false
adicionarTeclaEnter()
}