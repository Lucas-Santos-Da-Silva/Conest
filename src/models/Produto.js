/**
 * Modelo de dados (model) produto
 */

const {model, Schema} = require ('mongoose')

const produtoSchema = new Schema({
    nomeProduto: {
        type: String
    },
    categoryProduto:{
        type: String
    },
    barcodeProduto:{
        type: String
    },
    custoProduto: {
        type: String
    },
    precoProduto:{
        type: String
    },
    imagemProduto:{
        type: String
    }
})

module.exports = model ('Produto', produtoSchema)

