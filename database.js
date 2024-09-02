/**
 * Módulo de conexão com o banco de dados
 * uso do framework mongoose (npm i mongoose)
*/
 
// importar a blibioteca
const mongoose = require('mongoose')
 
// definir o banco de dados (copiar a string do compass)
 
let url = "mongodb+srv://admin:senac%40123@cluster0.gv0glht.mongodb.net/"
 
// Varaivel para armazenar o status da conexão
let isConnected = false
 
// status de conexão
const dbStatus = async () => {
    if (isConnected === false) {
        await conectar()
    }
}
// método para conectar
const conectar = async () => {
    try {
        await mongoose.connect(url)
        isConnected = true
        console.log("MongoDB conectado")
        return (isConnected)
    } catch (error) {
        console.log(`Problema detectado: ${error.message}`)
    }
}
 
// desconectar
const desconectar = async () => {
    if (isConnected === true) {
        try {
            await mongoose.disconnect(url)
            isConnected = false
            console.log("MongoDB desconectado")
        } catch (error) {
            console.log(`Problema detectado: ${error.message}`)
        }
    }
}
 
// exportar os métodos conectar e desconectar para o main.js
module.exports = { dbStatus, desconectar }