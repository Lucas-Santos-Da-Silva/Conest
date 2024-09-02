/**
 * @author Lucas Santos da Silva
 */
function procurarCEP(){
    const cep = String(formFornecedor.txtCEP.value)
    let urlAPI = `https://viacep.com.br/ws/${cep}/json`
    // apoio ao entendimento da lógica
    // console.log(urlAPI)
    // uso de promise para recuperar os dados do WEB SERVICE (API)
    fetch(urlAPI)
    .then((Response)=>{ // obter os dados
        return Response.json()
    })
    .then((dados)=>{ // manipular os dados obtidos
        formFornecedor.txtLogradouro.value = `${dados.logradouro}`
        formFornecedor.txtBairro.value = `${dados.bairro}`
        formFornecedor.txtLocalidade.value = `${dados.localidade}`
        formFornecedor.txtUf.value = `${dados.uf}`
    })
    .catch((error)=>{
        console.log(`Erro ao obter o endereço: ${error}`)
    })
  }