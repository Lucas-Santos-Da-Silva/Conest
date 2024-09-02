/**
 * Processo de renderização
 * Produtos
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
        buscarProdutos()
    }
}
// Adicionar a função de manipulação do evento da tecla Enter
function adicionarTeclaEnter(){
    document.getElementById('frmProduto').addEventListener('keydown', teclaEnter)
}
adicionarTeclaEnter()

//  a função para remover manipulação do evento da tecla Enter
function removerTeclaEnter(){
    document.getElementById('frmProduto').removeEventListener('keydown', teclaEnter)
    }


//CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//captura dos inputs do formulário (passo 1 - slide)
let idProduto = document.getElementById('inputIDPro')
let formProduto = document.getElementById('frmProduto')
let nomeProduto = document.getElementById('inputDescription')
let categoryProduto = document.getElementById('inputCategory')
let barcodeProduto = document.getElementById('inputBarcode')
let custoProduto = document.getElementById('inputCusto')
let precoProduto = document.getElementById('inputPreco')
let imagemProduto = document.getElementById('inputImagem')

//evento relacionado ao botão adicionar (ainda passo 1 - slide)
formProduto.addEventListener('submit', async (event) => {
    event.preventDefault()
    console.log(idProduto.value, nomeProduto.value, categoryProduto.value, barcodeProduto.value, custoProduto.value, precoProduto.value, imagemProduto.value)
    //Empacotar os dados em um objeto e enviar ao main.js (passo2 - slide)
    const produto = {
        nomePro: nomeProduto.value,
        categoryPro: categoryProduto.value,
        barcodePro: barcodeProduto.value,
        custoPro: custoProduto.value,
        precoPro: precoProduto.value,
        imagemPro: imagemProduto.value
    }
    api.newProduct(produto)
    //limpar os dados from após envio
    resetForm()
})
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// array(vetor) usado na renderização dos dados do produto
let arrayProduto = []
//Função que vai enviar ao main um pedido de busca dos dados de um produto pela descrição (Passo 1 - Slider)
function buscarProdutos(){
    let nomeProduto = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
    //validação (UX)
    if(nomeProduto === ""){
        // validar campo obrigatório
        api.infoSearchProduct()
    } else{
       // enviar o pedido de busca junto com a descrição do produto
       api.searchProduct(nomeProduto)
    }
    // foco no campo de busca - (UX)
    api.focusProduct((args) => {
        document.getElementById('inputSearch').focus()
    })
    // Setar a descrição do produto  e habilitar o cadastramento
    api.nameProduct((args) =>{
        // Restaurar o comportamento padrão da tecla Enter
        removerTeclaEnter()
        let setarNomeProduto = document.getElementById('inputSearch').value.trim().replace(/\s+/g, ' ')
        console.log(setarNomeProduto)
        document.getElementById('inputDescription').value += setarNomeProduto
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').disabled = true
        document.getElementById('inputSearch').blur()
        document.getElementById('inputDescription').focus()
        document.getElementById("imageProduct").src=`../public/img/ProductImages/${imagemProduto}`
        btnRead.disabled = true
        btnCreate.disabled = false
    })
    
    // limpar a caixa de busca e setar o foco
    api.clearSearch((args)=>{
        document.getElementById('inputSearch').value = ""
        document.getElementById('inputSearch').focus()
    })
    // receber do main.js os dados do produto (passo 4)
    api.dataProduct((event, dadosProduto) =>{
        arrayProduto = JSON.parse(dadosProduto)
        console.log(arrayProduto)
        console.log(dadosProduto)
    
    // Passo 5 (final) percorre o array, extrair os dados e setar os campos de texto (caixas input) do formulário
    arrayProduto.forEach((p) =>{
        document.getElementById('inputIDPro').value = p._id,
        document.getElementById('inputDescription').value = p.nomeProduto,
        document.getElementById('inputCategory').value = p.categoryProduto,
        document.getElementById('inputBarcode').value = p.barcodeProduto,
        document.getElementById('inputCusto').value = p.custoProduto,
        document.getElementById('inputPreco').value = p.precoProduto,
        document.getElementById('uploadImage').value = p.imagemProduto,
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
function editarProduto(){
    //Passo 1 do slide
    const produto = {
        idPro: idProduto.value,
        nomePro: nomeProduto.value,
        categoryPro: categoryProduto.value,
        barcodePro: barcodeProduto.value,
        custoPro: custoProduto.value,
        precoPro: precoProduto.value,
        imagemPro: imagemProduto.value
    }
    console.log(produto) //teste do passo 1
    //Passo 2: Enviar o objeto produto ao main.js
    
    api.updateProduct(produto)
    resetForm()
}
//CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
function excluirProduto(){
    let idPro = idProduto.value // Passo 1 (obter o id do produto)
    console.log(idPro) // Passo 1 (obter id do produto)
    api.deleteProduto(idPro) // Passo 2 - enviar o id do produto ao main
    resetForm()
}
//<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

//Reset do formulário
function resetForm(){
document.getElementById('inputDescription').value = ""
document.getElementById('inputDescription').value = ""
document.getElementById('inputDescription').value = ""
document.getElementById('inputIDPro').value = ""
document.getElementById('inputSearch').focus()
document.getElementById('inputSearch').disabled = false
btnCreate.disabled = true
btnUpdate.disabled = true
btnDelete.disabled = true
btnRead.disabled = false
removerTeclaEnter()
}