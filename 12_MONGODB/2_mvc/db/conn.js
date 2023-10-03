const { MongoClient } = require('mongodb');
const chalk = require('chalk');

const uri = "mongodb://127.0.0.1:27017/testemongodb";

const client = new MongoClient(uri);

async function run() {
    try {

        await client.connect();
        console.clear();
        console.log(chalk.green("Conexão com o banco de dados efetuada com sucesso!"))
        console.log(chalk.magenta("Bem vindo(a) ao MongoDB!"))

    } catch (err) {
        console.log(err)
    }
}

run();

module.exports = client;