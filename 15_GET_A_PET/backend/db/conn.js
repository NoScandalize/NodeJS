const mongoose = require('mongoose');
const chalk = require('chalk');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/getapet')
    console.clear();
    console.log(chalk.green("Conexão efetuada com sucesso!"))
    console.log(chalk.magenta("Bem-vindo(a) ao MongoDB!"))
}

main().catch((err) => console.log(chalk.red(`Ocorreu um erro: ${err}`)))

module.exports = mongoose;