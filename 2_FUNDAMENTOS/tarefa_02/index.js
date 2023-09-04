const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([
    {
        name: 'name',
        message: 'Informe o seu nome: ',
    },
    {
        name: 'age',
        message: 'Informe a sua idade: ',
    }
])
.then((answers) => {

    if (answers.name.length === 0 || answers.age.length === 0) {
        throw new Error('The name/age value is probably null.');
    } else if (!Number.isInteger(parseInt(answers.age))) {
        throw new Error('The age value must be an integer number.');
    }

    console.log(chalk.bgYellow.black.bold(`O usuário ${answers.name} tem ${answers.age} anos!`));

})
.catch((err) => {
    console.error(chalk.red.bold(`❌ ${err} `));
})