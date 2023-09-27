const { Sequelize } = require('sequelize');
const chalk = require('chalk');

const sequelize = new Sequelize('toughts', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
});

try {
    sequelize.authenticate();
    console.clear();
    console.log(chalk.green('Conexão com o banco de dados efetuada com sucesso!'))
} catch(err) {
    console.log(chalk.red(`Não foi possivel se conectar com o banco de dados! Errro: ${err}`))
}

module.exports = sequelize;