const { ipcMain } = require('electron')
const { app, BrowserWindow, Menu, shell, dialog } = require('electron/main')
const path = require('node:path')

 
// importa o módulo de conexão
const { dbStatus, desconectar } = require('./database.js')
 
// importação do Schema (model) das coleções("tabelas")
const clienteModel = require('./src/models/Cliente.js')
const fornecedorModel = require('./src/models/Fornecedor.js')
const produtoModel = require('./src/models/Produto.js')
 
let dbCon = null
// janela principal (definir objeto win como variável publica)
let win
const createWindow = () => {
    win = new BrowserWindow({
        width: 800,
        height: 600,
        icon: './src/public/img/pc.png',
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    // iniciar a janela com o menu personalizado
    Menu.setApplicationMenu(Menu.buildFromTemplate(template))
 
    win.loadFile('./src/views/index.html')
    // interagir diretamente no doom do documento html (index.html)
    
 
}
 
// janela Sobre
let about // resolver bug de arbertura de várias janelas (bug1) abrir
 
const aboutWindow = () => {
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!about) {
            about = new BrowserWindow({
                width: 450, // largura  da janela
                height: 320, // altura da janela
                icon: './src/public/img/about.png',
                autoHideMenuBar: true, // esconder o menu(apenas)
                resizable: false,
                parent: father,
                modal: true
            })
        }
    }
 
 
    about.loadFile('./src/views/sobre.html')
    // bug 2 (reabrir a janela se estiver fechada)
    about.on('closed', () => {
        about = null
    })
}
 
// janela clientes
let clientes// resolver bug de arbertura de várias janelas (bug1) abrir
 
const clientesWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!clientes) {
            clientes = new BrowserWindow({
                width: 800, // largura  da janela
                height: 600, // altura da janela
                icon: './src/public/img/clientes.png',
                resizable: false, // evitar o redimensionamneto
                // titleBarStyle: 'hidden', // esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder o menu(apenas)
                parent: father,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
    }
 
 
    clientes.loadFile('./src/views/cliente.html')
    // bug 2 (reabrir a janela se estiver fechada)
    clientes.on('closed', () => {
        clientes = null
    })
}
 
// janela fornecedores
let fornecedores// resolver bug de arbertura de várias janelas (bug1) abrir
 
const fornecedoresWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!fornecedores) {
            fornecedores = new BrowserWindow({
                width: 1000, // largura  da janela
                height: 600, // altura da janela
                icon: './src/public/img/fornecedores.png',
                resizable: false, // evitar o redimensionamneto
                // titleBarStyle: 'hidden', // esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder o menu(apenas)
                parent: father,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
    }
 
 
    fornecedores.loadFile('./src/views/fornecedores.html')
    // bug 2 (reabrir a janela se estiver fechada)
    fornecedores.on('closed', () => {
        fornecedores = null
    })
}
 
// janela produtos
let produtos// resolver bug de arbertura de várias janelas (bug1) abrir
 
const produtosWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!produtos) {
 
            produtos = new BrowserWindow({
                width: 800, // largura  da janela
                height: 600, // altura da janela
                icon: './src/public/img/produto.png',
                resizable: false, // evitar o redimensionamneto
                // titleBarStyle: 'hidden', // esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder o menu(apenas)
                parent: father,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
    }
 
 
    produtos.loadFile('./src/views/produtos.html')
    // bug 2 (reabrir a janela se estiver fechada)
    produtos.on('closed', () => {
        produtos = null
    })
}
 
// janela de relatórios
let relatorios// resolver bug de arbertura de várias janelas (bug1) abrir
 
const relatoriosWindow = () => {
    // nativeTheme.themeSource = 'dark'
    // se a janela about não estiver aberta
    const father = BrowserWindow.getFocusedWindow()
    if (father) {
        if (!relatorios) {
 
            relatorios = new BrowserWindow({
                width: 800, // largura  da janela
                height: 600, // altura da janela
                icon: './src/public/img/relatorio.png',
                resizable: false, // evitar o redimensionamneto
                // titleBarStyle: 'hidden', // esconder barra de titulo e menu
                autoHideMenuBar: true, // esconder o menu(apenas)
                parent: father,
                modal: true,
                webPreferences: {
                    preload: path.join(__dirname, 'preload.js')
                }
            })
        }
    }
 
 
    relatorios.loadFile('./src/views/relatorios.html')
    // bug 2 (reabrir a janela se estiver fechada)
    relatorios.on('closed', () => {
        relatorios = null
    })
}
 
// iniciar a aplicação
app.whenReady().then(() => {
 
    //  status de conexão com o banco de dados
    ipcMain.on('send-message', async (event, message) => {
        dbCon = await dbStatus()
        event.reply('db-message', 'conectado')
    })
 
    // desconectar do banco ao encerrar a janela
    app.on('before-quit', async () => {
        await desconectar(dbCon)
    })
 
 
 
 
 
    createWindow()
 
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})
// template do menu personalizado
const template = [
    {
 
        label: 'Arquivo',
        submenu: [
            {
                label: 'Clientes',
                click: () => clientesWindow()
            },
            {
                label: 'Fornecedores',
                click: () => fornecedoresWindow()
            },
            {
                label: 'Produtos',
                click: () => produtosWindow()
            },
            {
                label: 'Sair',
                click: () => app.quit(),
                accelerator: 'Alt+F4'
            }
        ]
 
    },
    {
        label: 'Exibir',
        submenu: [{
            label: 'Recarregar',
            role: 'reload'
        },
        {
            label: 'Ferramentas',
            role: 'toggledevTools'
        },
        {
            type: 'separator'
        },
        {
            label: 'Aplicar zoom',
            role: 'zoomIn'
        },
        {
            label: 'Reduzir zoom',
            role: 'zoomOut'
        },
        {
            label: 'Restaurar o zoom padrão',
            role: 'resetZoom'
        }
        ]
 
    },
    {
        label: 'Relatorios',
        submenu: [{
 
            label: 'Relatorios',
            click: () => relatoriosWindow()
        }
        ]
    },
    {
        label: 'Ajuda',
        submenu: [{
 
            label: 'Sobre',
            click: () => aboutWindow()
        }
        ]
    }
]
 
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
 
// ----------------------------------------------------
// Função que verifica o status da conexão
const statusConexao = async () => {
    try {
        await conectar()
        win.webContents.send('db-status', "Banco de dados conectado.")
    } catch (error) {
        win.webContents.send('db-status', `Erro de conexão: ${error.message}`)
    }
}
 
// exemplo 3: recebimento do renderer de uma ação a ser executada
ipcMain.on('open-about', () => {
    aboutWindow()
})
// clientes
ipcMain.on('open-clientes', () => {
    clientesWindow()
})
// fornecedores
ipcMain.on('open-fornecedores', () => {
    fornecedoresWindow()
})
// produtos
ipcMain.on('open-produtos', () => {
    produtosWindow()
})
// relatorios
ipcMain.on('open-relatorios', () => {
    relatoriosWindow()
})
// CRUD Create >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('new-client', async (event, cliente) => {
    console.log(cliente) // teste do passo 2 do slide
    // passo 3: cadastrar o cliente no mongoDB clientes
    try {
        const novoCliente = new clienteModel({
            nomeCliente: cliente.nomeCli,
            foneCliente: cliente.foneCli,
            emailCliente: cliente.emailCli,
        })
        await novoCliente.save() // save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: "Cliente cadastrado com sucesso!",
            buttons: ['OK']
        })
    } catch (error) {
        console.log(error)
    }
})
// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 // Aviso (Busca: Preenchimento de campo obrigatório)
 ipcMain.on('dialog-infoSearchClient',(event) => {
    dialog.showMessageBox({
    type: 'warning',
    title: "Atenção",
    message: 'Preencha o nome do cliente',
    buttons: ['Ok']
})
event.reply('focus-searchClient') //UX
 })
// Recebimento do pedido de busca de um cliente pelo nome (Passo 1)
ipcMain.on('search-client', async (event, nomeCliente) => {
    //Passo 2 : Busca no bando de dados
    try{
        // find() "método de busca de dados" newRegex 'i' case insensitive
        const dadosCliente = await clienteModel.find({nomeCliente: new RegExp(nomeCliente, 'i') }) //Passo 2 
        console.log(dadosCliente) // Passo 3 (recebimenento dos dados do cliente)
        // UX -> se o cliente não estiver cadastrado, avisar o usuário e habilitar o cadastramento
        if (dadosCliente.length === 0){
            dialog.showMessageBox({
                type: 'warning',
                title: "Aviso",
                message: 'Cliente não cadastrado. \nDeseja cadastrar este cliente?',
                defaultId: 0,
                buttons: ['Sim','Não'],
            }).then ((result)=>{
                if(result.response === 0){
                    //setar o nome de cliente no form e habilitar o cadastramento
                    event.reply('set-nameClient')
                }else{
                    //limpar a caixa de busca
                    event.reply('clear-search')
                }
            })
        } else{
            // Passo 4 (enviar os dados do cliente ao renderizador)
            event.reply('data-client', JSON.stringify(dadosCliente))
        }
    } catch(error){
        console.log(error)
    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-client', async (event, cliente) => {
  console.log(cliente) // teste do passo 2 do slide
  // passo 3: cadastrar o cliente no mongoDB clientes
  try {
      const clienteEditado = await clienteModel.findByIdAndUpdate(
          cliente.idCli, {
          nomeCliente: cliente.nomeCli,
          foneCliente: cliente.foneCli,
          emailCliente: cliente.emailCli
      }, 
        {
          new: true
        }
      )
      dialog.showMessageBox({
          type: 'info',
          title: 'Aviso',
          message: "Dados do cliente alterados com sucesso!",
          buttons: ['OK']
      })
      event.reply('reply-form')
  } catch (error) {
      console.log(error)
  }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delete-client', (event, idCli) => {
  console.log(idCli) // teste do passo 2
  //Importante! confirmar a ação antes de excluir do banco
dialog.showMessageBox({
    type: 'error',
    title: "ATENÇÃO!",
    message: 'Têm certeza que deseja excluir este cliente?',
    defaultId: 0,
    buttons: ['Sim','Não'],
}).then (async(result)=>{
    if(result.response === 0){
        //Passo 3 (excluir o cliente do Banco)
        try{
            await clienteModel.findByIdAndDelete(idCli)
            dialog.showMessageBox({
                type: 'info',
                title: 'Aviso',
                message: "Dados do cliente excluidos com sucesso!",
                buttons: ['OK']
            })
        } catch(error){
            console.log(error)
        }
    }
})
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
// CRUD Create Fornecedor <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
ipcMain.on('new-supplier', async (event, fornecedor) => {
    console.log(fornecedor) // teste do passo 2 do slide
    // passo 3: cadastrar o fornecedor no mongoDB fornecedores
    try {
        const novoFornecedor = new fornecedorModel({
            nomeFornecedor: fornecedor.nomeForne,
            cnpjFornecedor: fornecedor.cpnjForne,
            foneFornecedor: fornecedor.foneForne,
            emailFornecedor: fornecedor.emailForne,
            cepFornecedor: fornecedor.cepForne,
            numeroFornecedor: fornecedor. numeroForne,
            logradouroFornecedor: fornecedor.logradouroForne,
            bairroFornecedor: fornecedor.bairroForne,
            cidadeFornecedor: fornecedor.cidadeForne,
            complementoFornecedor: fornecedor.complementoForne,
            estadoFornecedor: fornecedor.estadoForne
        })
        await novoFornecedor.save() // save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: "Fornecedor cadastrado com sucesso!",
            buttons: ['OK']
        })
    } catch (error) {
        console.log(error)
    }
})
// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 // Aviso (Busca: Preenchimento de campo obrigatório)
 ipcMain.on('dialog-infoSearchSupplier',(event) => {
    dialog.showMessageBox({
    type: 'warning',
    title: "Atenção",
    message: 'Preencha o nome do fornecedor',
    buttons: ['Ok']
})
event.reply('focus-searchSupplier') //UX
 })
// Recebimento do pedido de busca de um fornecedor pelo nome (Passo 1)
ipcMain.on('search-supplier', async (event, nomeFornecedor) => {
    //Passo 2 : Busca no bando de dados
    try{
        // find() "método de busca de dados" newRegex 'i' case insensitive
        const dadosFornecedor = await fornecedorModel.find({nomeFornecedor: new RegExp(nomeFornecedor, 'i') }) //Passo 2 
        console.log(dadosFornecedor) // Passo 3 (recebimenento dos dados do fornecedor)
        // UX -> se o fornecedor não estiver cadastrado, avisar o usuário e habilitar o cadastramento
        if (dadosFornecedor.length === 0){
            dialog.showMessageBox({
                type: 'warning',
                title: "Aviso",
                message: 'Fornecedor não cadastrado. \nDeseja cadastrar este fornecedor?',
                defaultId: 0,
                buttons: ['Sim','Não'],
            }).then ((result)=>{
                if(result.response === 0){
                    //setar o nome de fornecedor no form e habilitar o cadastramento
                    event.reply('set-nameSupplier')
                }else{
                    //limpar a caixa de busca
                    event.reply('clear-search')
                }
            })
        } else{
            // Passo 4 (enviar os dados do fornecedor ao renderizador)
            event.reply('data-supplier', JSON.stringify(dadosFornecedor))
        }
    } catch(error){
        console.log(error)
    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-supplier', async (event, fornecedor) => {
  console.log(fornecedor) // teste do passo 2 do slide
  // passo 3: cadastrar o fornecedor no mongoDB fornecedores
  try {
      const fornecedorEditado = await fornecedorModel.findByIdAndUpdate(
          fornecedor.idForne, {
          nomeFornecedor: fornecedor.nomeForne,
          foneFornecedor: fornecedor.foneForne,
          emailFornecedor: fornecedor.emailForne
      }, 
        {
          new: true
        }
      )
      dialog.showMessageBox({
          type: 'info',
          title: 'Aviso',
          message: "Dados do fornecedor alterados com sucesso!",
          buttons: ['OK']
      })
      event.reply('reply-form')
  } catch (error) {
      console.log(error)
  }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delete-supplier', (event, idForne) => {
  console.log(idForne) // teste do passo 2
  //Importante! confirmar a ação antes de excluir do banco
dialog.showMessageBox({
    type: 'error',
    title: "ATENÇÃO!",
    message: 'Têm certeza que deseja excluir este fornecedor?',
    defaultId: 0,
    buttons: ['Sim','Não'],
}).then (async(result)=>{
    if(result.response === 0){
        //Passo 3 (excluir o fornecedor do Banco)
        try{
            await fornecedorModel.findByIdAndDelete(idForne)
            dialog.showMessageBox({
                type: 'info',
                title: 'Aviso',
                message: "Dados do fornecedor excluidos com sucesso!",
                buttons: ['OK']
            })
        } catch(error){
            console.log(error)
        }
    }
})
})
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
  // CRUD Create Produto <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
ipcMain.on('new-product', async (event, produto) => {
    console.log(produto) // teste do passo 2 do slide
    // passo 3: cadastrar o produto no mongoDB produtos
    try {
        const novoProduto = new produtoModel({
            nomeProduto: produto.nomePro,
            categoryProduto: produto.categoryPro,
            barcodeProduto: produto.barcodePro,
            custoProduto: produto.custoPro,
            precoProduto: produto.precoPro,
            imagemProduto: produto.imagemPro,
        })
        await novoProduto.save() // save() - mongoose
        dialog.showMessageBox({
            type: 'info',
            title: 'Aviso',
            message: "Produto cadastrado com sucesso!",
            buttons: ['OK']
        })
    } catch (error) {
        console.log(error)
    }
})
// CRUD Read >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
 // Aviso (Busca: Preenchimento de campo obrigatório)
 ipcMain.on('dialog-infoSearchProduct',(event) => {
    dialog.showMessageBox({
    type: 'warning',
    title: "Atenção",
    message: 'Preencha o nome do produto',
    buttons: ['Ok']
})
event.reply('focus-searchProduct') //UX
 })
// Recebimento do pedido de busca de um produto pelo nome (Passo 1)
ipcMain.on('search-product', async (event, nomeProduto) => {
    //Passo 2 : Busca no bando de dados
    try{
        // find() "método de busca de dados" newRegex 'i' case insensitive
        const dadosProduto = await produtoModel.find({nomeProduto: new RegExp(nomeProduto, 'i') }) //Passo 2 
        console.log(dadosProduto) // Passo 3 (recebimenento dos dados do produto)
        // UX -> se o produto não estiver cadastrado, avisar o usuário e habilitar o cadastramento
        if (dadosProduto.length === 0){
            dialog.showMessageBox({
                type: 'warning',
                title: "Aviso",
                message: 'Produto não cadastrado. \nDeseja cadastrar este Produto?',
                defaultId: 0,
                buttons: ['Sim','Não'],
            }).then ((result)=>{
                if(result.response === 0){
                    //setar o nome de produto no form e habilitar o cadastramento
                    event.reply('set-nameProduct')
                }else{
                    //limpar a caixa de busca
                    event.reply('clear-search')
                }
            })
        } else{
            // Passo 4 (enviar os dados do produto ao renderizador)
            event.reply('data-product', JSON.stringify(dadosProduto))
        }
    } catch(error){
        console.log(error)
    }
})

// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
// CRUD Update >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('update-product', async (event, produto) => {
  console.log(produto) // teste do passo 2 do slide
  // passo 3: cadastrar o fornecedor no mongoDB fornecedores
  try {
      const produtoEditado = await produtoModel.findByIdAndUpdate(
        produto.idPro, {
            nomeProduto: produto.nomePro,
            categoryProduto: produto.categoryPro,
            barcodeProduto: produto.barcodePro,
            custoProduto: produto.custoPro,
            precoProduto: produto.precoPro,
            imagemProduto: produto.imagemPro,
      }, 
        {
          new: true
        }
      )
      dialog.showMessageBox({
          type: 'info',
          title: 'Aviso',
          message: "Dados do produto alterados com sucesso!",
          buttons: ['OK']
      })
      event.reply('reply-form')
  } catch (error) {
      console.log(error)
  }
})
// <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
 
// CRUD Delete >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
ipcMain.on('delete-product', (event, idProduto) => {
  console.log(idPro) // teste do passo 2
  //Importante! confirmar a ação antes de excluir do banco
dialog.showMessageBox({
    type: 'error',
    title: "ATENÇÃO!",
    message: 'Têm certeza que deseja excluir este produto?',
    defaultId: 0,
    buttons: ['Sim','Não'],
}).then (async(result)=>{
    if(result.response === 0){
        //Passo 3 (excluir o produto do Banco)
        try{
            await produtoModel.findByIdAndDelete(idPro)
            dialog.showMessageBox({
                type: 'info',
                title: 'Aviso',
                message: "Dados do produto excluidos com sucesso!",
                buttons: ['OK']
            })
        } catch(error){
            console.log(error)
        }
    }
})
})
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<