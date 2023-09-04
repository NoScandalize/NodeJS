const inquirer = require('inquirer');
const chalk = require('chalk');

inquirer.prompt([
    {
        name: 'p1',
        message: 'Qual a primeira nota?'
    },
    {
        name: 'p2',
        message: 'Qual a segunda nota?',
    },
])
.then((answers) => {
    const media = ((parseInt(answers.p1) + parseInt(answers.p2)) / 2)

    console.log(chalk.yellow.bold(`📝 Sua média foi de ${chalk.bgYellow.magenta.bold(` ${media} `)}.`))

    if (media >= 7) {
        console.log(chalk.green.bold('✅ Você foi aprovado!'))
    } else {
        console.log(chalk.red.bold('❌ Você foi reprovado!'))
    }
})
.catch((err) => console.log(err))