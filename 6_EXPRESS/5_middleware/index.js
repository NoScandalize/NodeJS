const express = require("express");
const app = express();
const port = 3000 // variável ambiente

// Core Module
const path = require('path');

const basePath = path.join(__dirname, 'templates');

const checkAuth = function (req, res, next) {

    req.authStatus = false;

    if(req.authStatus) {
        console.log("Está logado, pode constinuar")
        next();
    } else {
        console.log("Não está logado, faça o login para continuar")
        next();
    }

}

app.use(checkAuth)

app.get('/', (req, res) => {

    res.sendFile(`${basePath}/index.html`)

})

app.listen(port, () => {
    
    console.log(`Aplicação iniciada na porta: ${port}`);

})