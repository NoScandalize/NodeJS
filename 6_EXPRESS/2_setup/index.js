const express = require("express");
const app = express();
const port = 3000 // variável ambiente

app.get('/', (req, res) => {

    res.send('Olá Mundo!!!')

})

app.listen(port, () => {
    
    console.log(`Aplicação iniciada na porta: ${port}`);

})