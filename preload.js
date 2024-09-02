
const { ipcRenderer, contextBridge } = require('electron')
 
 
 
// status de conexão (verificar se o banco de dados está conectado)
 
ipcRenderer.send('send-message', "status do banco de dados:")
ipcRenderer.on('db-status', (event, status) => {
    console.log(status)
})
 
contextBridge.exposeInMainWorld('api', {
    verElectron: () => process.versions.electron,
    openAbout: () => ipcRenderer.send('open-about'),
    openclientes: () => ipcRenderer.send('open-clientes'),
    openfornecedores: () => ipcRenderer.send('open-fornecedores'),
    openprodutos: () => ipcRenderer.send('open-produtos'),
    openrelatorios: () => ipcRenderer.send('open-relatorios'),
    dbmessage: (message) => ipcRenderer.on('db-message',message),
    resetForm: (args) => ipcRenderer.on('reset-form',args),
    clearSearch: (args) => ipcRenderer.on('clear-search',args),
    
    newClient: (cliente) => ipcRenderer.send('new-client',cliente),
    infoSearchClient: () => ipcRenderer.send('dialog-infoSearchClient'),
    focusClient: (args) => ipcRenderer.on('focus-searchClient',args),
    searchClient: (nomeCliente) => ipcRenderer.send('search-client',nomeCliente),
    nameClient: (args) => ipcRenderer.on('set-nameClient',args),
    dataClient: (dadosCliente) => ipcRenderer.on('data-client',dadosCliente),
    updateClient: (cliente) => ipcRenderer.send('update-client',cliente),
    deleteClient: (idCli) => ipcRenderer.send('delete-client',idCli),
    

    newSupplier: (fornecedor) => ipcRenderer.send('new-supplier',fornecedor),
    infoSearchSupplier: () => ipcRenderer.send('dialog-infoSearchSupplier'),
    focusSupplier: (args) => ipcRenderer.on('focus-searchSupplier', args),
    searchSupplier: (nomeFornecedor) => ipcRenderer.send('search-supplier',nomeFornecedor),
    nameSupplier: (args) => ipcRenderer.on('set-nameSupplier', args),
    dataSupplier: (dadosFornecedor) => ipcRenderer.on('data-supplier',dadosFornecedor),
    updateSupplier: (fornecedor) => ipcRenderer.send('update-supplier', fornecedor),
    deleteSupplier: (idForne) => ipcRenderer.send('delete-supplier',idForne),

    newProduct: (produto) => ipcRenderer.send('new-product',produto),
    infoSearchProduct: () => ipcRenderer.send('dialog-infoSearchProduct'),
    focusProduct: (args) => ipcRenderer.on('focus-searchProduct', args),
    searchProduct: (nomeProduto) => ipcRenderer.send('search-product',nomeProduto),
    nameProduct: (args) => ipcRenderer.on('set-nameProduct', args),
    dataProduct: (dadosProduto) => ipcRenderer.on('data-product',dadosProduto),
    updateProduct: (produto) => ipcRenderer.send('update-product', produto),
    deleteProduct: (idPro) => ipcRenderer.send('delete-product',idPro)

})
 
// Inserir data na página
function obterData() {
    const data = new Date()
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }
    return data.toLocaleDateString('pt-br', options)
}
 

 