const mongoose = require('mongoose');

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/testemongoose')
    console.log('Conexão ao MongoDB com o Mongoose efetuada com sucesso!')
}

main().catch((err) => console.log(err))

module.exports = mongoose;