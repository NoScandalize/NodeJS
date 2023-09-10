// modulos externos
import inquirer from "inquirer";
import chalk from "chalk";

// core modulos
import fs from 'fs';
import { verify } from "crypto";

operation();

function operation() {
    console.clear();
    inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: chalk.bgBlack.magenta.italic('O que você deseja fazer? '),
            choices: [
                'Criar Conta',
                'Consultar Saldo',
                'Depositar',
                'Sacar',
                chalk.red('Sair'),
            ],
        }
    ])
    .then((anwser) => {
        const action = anwser.action;

        if (action === 'Criar Conta') {
            createAccount();
        } else if (action === 'Consultar Saldo') {
            getAccountBalance();
        } else if (action === 'Depositar') {
            deposit();
        } else if (action === 'Sacar') {
            withdraw();
        } else if (action === chalk.red('Sair')) {
            console.clear();
            console.log(chalk.bgGreen.black(`✳️  Obrigado(a) por usar o ${chalk.red.bold.italic('Accounts')}! ✳️ `))
            process.exit();
        }
    })
    .catch((err) => {
        console.log(chalk.red(err))
    })
}

// create an account
function createAccount () {
    console.clear();
    console.log(chalk.bgGreen.black.bold.italic('💠 Parabéns por escolher o nosso banco! 💠'));
    console.log(chalk.cyanBright.bold('⬇️ Defina as opções da sua conta a seguir⬇️'));

    buildAccount();
}

function buildAccount () {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Digite um nome para a sua conta:'
        }
    ])
    .then( async (anwser) => {
        const accountName = anwser.accountName;

        if(!fs.existsSync('accounts')) {
            fs.mkdirSync('accounts');
        }

        if(accountName.length < 5) {
            console.clear();
            console.log(chalk.bgRed.black.bold('🛑 O nome da conta precisa ter no mínimo 5 caracteres! 🛑'));
            buildAccount();
            return;
        }

        if(fs.existsSync(`accounts/${accountName}.json`)) {
            console.clear();
            console.log(chalk.bgRed.black.bold('🛑 Esta conta já existe, escolha outro nome! 🛑'));
            buildAccount();
            return;
        }

        fs.writeFileSync(`accounts/${accountName}.json`, '{"balance": 0}', function(err) {
            console.log(chalk.red(err))
        })

        console.log(chalk.green(`Parabéns ${accountName}, sua conta foi criada com sucesso!`))

        setTimeout(() => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'return',
                    message: chalk.yellow('⚜️  Opções:'),
                    choices: [
                        '⬅️  Retornar ao Menu',
                        '🔂 Criar outra conta',
                    ]
                }
            ])
            .then((anwser) => {
                const option = anwser.return;

                if(option === '⬅️  Retornar ao Menu') {
                    operation();
                } else if (option === '🔂 Criar outra conta') {
                    console.clear();
                    createAccount();
                }

            })
            .catch(err => console.log(chalk.red(err)))
        }, 2000)
    })
    .catch((err) => {
        console.log(chalk.red(err));
    })
}

// add an amount to user account
function deposit() {

    inquirer.prompt([
        {
            name: 'action',
            message: 'Qual o nome da sua conta?'
        }
    ])
    .then((anwser) => {
        const accountName = anwser.action;

        // verify if account exists
        if(!checkAccount(accountName)) {
            return deposit();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Informe o valor do deposito:'
            }
        ])
        .then(async (anwser) => {

            const amount = anwser.amount;

            // add an amount
            addAmount(accountName, amount);

            setTimeout(() => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'return',
                        message: chalk.yellow('⚜️  Opções:'),
                        choices: [
                            '⬅️  Retornar ao Menu',
                            '🔂 Fazer outro deposito',
                        ]
                    }
                ])
                .then((anwser) => {
                    const option = anwser.return;
    
                    if(option === '⬅️  Retornar ao Menu') {
                        operation();
                    } else if (option === '🔂 Fazer outro deposito') {
                        console.clear();
                        deposit();
                    }
    
                })
                .catch(err => console.log(chalk.red(err)))
            }, 2000)
        })
        .catch(err => console.log(chalk.red(err)))
        
    })
    .catch(err => console.log(chalk.red(err)))
}

function checkAccount (accountName) {
    if(accountName.length < 5) {
        console.clear();
        console.log(chalk.bgRed.black.bold('🛑 O nome da conta precisa ter no mínimo 5 caracteres! 🛑'));
        return false;
    }


    if(!fs.existsSync(`accounts/${accountName}.json`)) {
        console.clear();
        console.log(chalk.bgRed.black.bold('🛑 Esta conta não existe, verifique o nome da conta!🛑'));
        return false;    
    }

    return true;
}

async function addAmount(accountName, amount) {
    const accountData = getAccount(accountName);
    const date = new Date(Date.now())

    if(!amount) {
        console.log(chalk.bgRed.black.bold('🛑 Occoreu um erro, tente novamente mais tarde!🛑'));
        return deposit();
    }

    accountData.balance = parseFloat(parseFloat(amount) + parseFloat(accountData.balance))

    fs.writeFileSync(`accounts/${accountName}.json`, JSON.stringify(accountData), function (err) {
        console.log(chalk.red(err))
    })
    
    console.log(chalk.green('✅ Deposito realizado com sucesso!'))
    console.log(chalk.yellow(`✴️  Conta: ${chalk.cyan(`${accountName}`)}`))
    console.log(chalk.yellow(`✴️  Valor: ${chalk.green.bold(`R$ ${parseFloat(amount).toFixed(2)} `)}`))

}

function getAccount(accountName) {
    const accountJSON = fs.readFileSync(`accounts/${accountName}.json`, {
        encoding: 'utf-8',
        flag: 'r'
    })

    return JSON.parse(accountJSON)
}

// show account balance
async function getAccountBalance () {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Informe o nome da conta:'
        }
    ])
    .then((anwser) => {
        const accountName = anwser.accountName;

        // verify if account exists
        if(!checkAccount(accountName)) {
            return getAccountBalance();
        }

        const accountData = getAccount(accountName);

        console.log(chalk.yellow(`💲 Saldo atual da conta: ${chalk.green.bold(` R$ ${parseFloat(accountData.balance).toFixed(2)} `)}`))

        setTimeout(() => {
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'return',
                    message: chalk.yellow('⚜️  Opções:'),
                    choices: [
                        '⬅️  Retornar ao Menu',
                        '🔂 Consultar Novamente',
                    ]
                }
            ])
            .then((anwser) => {
                const option = anwser.return;

                if(option === '⬅️  Retornar ao Menu') {
                    operation();
                } else if (option === '🔂 Consultar Novamente') {
                    console.clear();
                    getAccountBalance();
                }

            })
            .catch(err => console.log(chalk.red(err)))
        }, 2000)
        
    })
    .catch(err => console.log(chalk.red(err)))
}

// withdraw an amount from user account
function withdraw() {
    inquirer.prompt([
        {
            name: 'accountName',
            message: 'Informe o nome da sua conta:'
        }
    ])
    .then((anwser) => {
        const accountName = anwser.accountName;

        if(!checkAccount(accountName)) {
            return withdraw();
        }

        inquirer.prompt([
            {
                name: 'amount',
                message: 'Digite o valor do saque:'
            }
        ])
        .then((anwser) => {

            const amount = anwser.amount;

            removeAmount(accountName, amount);

            setTimeout(() => {
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'return',
                        message: chalk.yellow('⚜️  Opções:'),
                        choices: [
                            '⬅️  Retornar ao Menu',
                            '🔂 Sacar Novamente',
                        ]
                    }
                ])
                .then((anwser) => {
                    const option = anwser.return;
    
                    if(option === '⬅️  Retornar ao Menu') {
                        operation();
                    } else if (option === '🔂 Sacar Novamente') {
                        console.clear();
                        withdraw();
                    }
    
                })
                .catch(err => console.log(chalk.red(err)))
            }, 2000)



        })
        .catch(err => console.log(chalk.red(err)))
    })
    .catch(err => console.log(chalk.red(err)))
}

function removeAmount(accountName, amount) {

    const accountData = getAccount(accountName);

    if(!amount) {
        console.log(chalk.bgRed.black.bold('🛑 Occoreu um erro, tente novamente mais tarde!🛑'));
        return;
    }

    if(accountData.balance < parseFloat(amount)) {
        console.log(chalk.bgRed.black.bold('🛑 Valor indisponível!🛑'));
        return;
    }

    accountData.balance = parseFloat(accountData.balance - parseFloat(amount))

    fs.writeFileSync(
        `accounts/${accountName}.json`,
        JSON.stringify(accountData),
        function (err) {
            console.log(chalk.red(err))
        }
    )

    console.log(chalk.green('✅ Saque realizado com sucesso!'))
    console.log(chalk.yellow(`✴️  Conta: ${chalk.cyan(`${accountName}`)}`))
    console.log(chalk.yellow(`✴️  Valor: ${chalk.green.bold(`R$ ${parseFloat(amount).toFixed(2)} `)}`))
}