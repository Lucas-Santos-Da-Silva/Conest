/**
 * Modelo de dados (model) Fornecedor
 */

const {model, Schema} = require ('mongoose')

const fornecedorSchema = new Schema({
    nomeFornecedor: {
        type: String
    },
    cnpjFornecedor:{
        type: String
    },
    foneFornecedor:{
        type: String
    },
    emailFornecedor: {
        type: String
    },
    cepFornecedor:{
        type: String
    },
    numeroFornecedor: {
        type: String
    },
    logradouroFornecedor:{
        type: String
    },
    bairroFornecedor:{
        type: String
    },
    cidadeFornecedor:{
        type: String
    },
    complementoFornecedor:{
        type: String
    },
    estadoFornecedor:{
        type: String
    }
})

module.exports = model ('Fornecedor', fornecedorSchema)

