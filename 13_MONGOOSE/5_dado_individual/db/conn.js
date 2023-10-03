const mongoose = require('mongoose');
const chalk = require('chalk');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/testemongoose')
    console.clear();
    console.log(chalk.green('Conexão com o Mongoose efetuada com sucesso!'))
    console.log(chalk.magenta('Bem vindo(a) ao MongoDB!'))
}

main().catch((err) => console.log(err))

module.exports = mongoose;