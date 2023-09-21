const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodesequelize', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

try {
    sequelize.authenticate();
    console.log('Conexão com o banco de dados efetuada com sucesso')

} catch(err) {
    console.log(`Não foi possível conectar: ${err}`)
}

module.export = sequelize;