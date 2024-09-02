/**
 * Processo de renderização
 * clientes
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
        buscarCliente()
    }
}
// Adicionar a função de manipulação do evento da tecla Enter
function adicionarTeclaEnter(){
    document.getElementById('frmClient').addEventListener('keydown', teclaEnter)
}
adicionarTeclaEnter()

//  a função para remover manipulação do evento da tecla Enter
function removerTeclaEnter(){
    document.getElementById('frmClient').removeEventListener('keydown', teclaEnter)
    }


//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//captura dos inputs do formulário (passo 1 - slide)
let idCliente = document.getElementById('inputIDCli')
let formCliente = document.getElementById('frmClient')
let nomeCliente = document.getElementById('inputNameClient')
let foneCliente = document.getElementById('inputPhoneClient')
let emailCliente = document.getElementById('inputEmailClient')

//evento relacionado ao botão adicionar (ainda passo 1 - slide)
formCliente.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(nomeCliente.value, foneCliente.value, emailCliente.value)
    //Empacotar os dados em um objeto e enviar ao main.js (passo2 - slide)
    const cliente = {
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    api.newClient(cliente)
    //limpar os dados from após envio
    resetForm()
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// array(vetor) usado na renderização dos dados do cliente
let arrayCliente = []
//Função que vai enviar ao main um pedido de busca dos dados de um cliente pelo nome (Passo 1 - Slider)
function buscarCliente(){
    let nomeCliente = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
    //validação (UX)
    if(nomeCliente === ""){
        // validar campo obrigatório
        api.infoSearchClient()
    } else{
       // enviar o pedido de busca junto com o nome do cliente
       api.searchClient(nomeCliente)
    }
    // foco no campo de busca - (UX)
    api.focusClient((args) => {
        document.getElementById('inputSearch').focus()
    })
    // Setar o nome do cliente e habilitar o cadastramento
    api.nameClient((args) =>{
        // Restaurar o comportamento padrão da tecla Enter
        removerTeclaEnter()
        let setarNomeCliente = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
        console.log(setarNomeCliente)
        document.getElementById('inputNameClient').value += setarNomeCliente
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputSearch').blur()
        document.getElementById('inputNameClient').focus()
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    
    // limpar a caixa de busca e setar o foco
    api.clearSearch((args)=>{
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // receber do main.js os dados do cliente (passo 4)
    api.dataClient((event, dadosCliente) =>{
        arrayCliente = JSON.parse(dadosCliente)
        console.log(arrayCliente)
        console.log(dadosCliente)
    
    // Passo 5 (final) percorre o array, extrair os dados e setar os campos de texto (caixas input) do formulário
    arrayCliente.forEach((c) =>{
        document.getElementById('inputIDCli').value = c._id,
        document.getElementById('inputNameClient').value = c.nomeCliente,
        document.getElementById('inputPhoneClient').value = c.foneCliente,
        document.getElementById('inputEmailClient').value = c.emailCliente
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
function editarCliente(){
    //Passo 1 do slide
    const cliente = {
        idCli: idCliente.value,
        nomeCli: nomeCliente.value,
        foneCli: foneCliente.value,
        emailCli: emailCliente.value
    }
    console.log(cliente) //teste do passo 1
    //Passo 2: Enviar o objeto cliente ao main.js
    
    api.updateClient(cliente)
    resetForm()
}
//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirCliente(){
    let idCli = idCliente.value // Passo 1 (obter o id do cliente)
    console.log(idCli) // Passo 1 (obter id do cliente)
    api.deleteClient(idCli) // Passo 2 - enviar o id do cliente ao main
    resetForm()
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Reset do formulário
function resetForm(){
document.getElementById('inputNameClient').value = ""
document.getElementById('inputPhoneClient').value = ""
document.getElementById('inputEmailClient').value = ""
document.getElementById('inputIDCli').value = ""
document.getElementById('inputSearch').focus()
document.getElementById('inputSearch').disabled = false
btnCreate.disabled = true
btnUpdate.disabled = true
btnDelete.disabled = true
btnRead.disabled = false
removerTeclaEnter()
}