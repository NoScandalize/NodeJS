const http = require('http');
const chalk = require('chalk')

const port = 3000;

const server = http.createServer((req, res) => {

    res.write('Oi HTTP');
    res.end();

})

server.listen(port, () => {
    console.log(chalk.green.bold(`Servidor rodando na porta: ${chalk.bgBlue.white(` ${port} `)}`))
})