/**
 * processo de renderização do documento index.html
 *@author Lucas Santos da Silva
 */
 
 console.log("processo de renderização")
 
 // vinculado ao preoload.js
  console.log(`Electron: ${api.verElectron()}`)
  
 //  função que é executada quando o botão for clicado
 function sobre() {
    api.openAbout()
 }
 function clientes() {
    api.openclientes()
 }
 function fornecedores() {
    api.openfornecedores()
 }
 function produtos() {
    api.openprodutos()
 }
 function relatorios() {
    api.openrelatorios()
 }
 // inserir data no rodapé da tela principal
document.getElementById('dataAtual').innerHTML = obterData()

function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-BR', options)
}
 // alteração do icone do status do banco de dados
 api.dbmessage((event, message) => {
    console.log(message)
    if (message === "conectado") {
       document.getElementById('status').src = "../public/img/dbon.png"
    } else {
       document.getElementById('status').src = "../public/img/dboff.png"
    }
 })