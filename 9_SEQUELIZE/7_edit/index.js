const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const chalk = require('chalk');

const User = require('./models/User')

const app = express();

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.use(
    express.urlencoded({
        extended: true,
    })
)

app.use(express.json())

app.engine('handlebars', hbs.engine);
app.set('view engine','handlebars');

app.use(express.static('public'));

app.get('/users/create', (req, res) => {

    res.render('adduser')
})

app.post('/users/create', async (req, res) => {

    const name = req.body.name;
    const ocupation = req.body.ocupation;
    let newsletter = req.body.newsletter;

    if(newsletter === 'on') {
        newsletter = true;
    } else {
        newsletter = false;
    }

    await User.create({ name, ocupation, newsletter })

    res.redirect('/');

})

app.get('/users/:id', async (req, res) => {

    const id = req.params.id;

    const user = await User.findOne({ raw: true, where: { id: id }})

    res.render('userview', { user });

})

app.post('/users/delete/:id', async (req, res) => {

    const id = req.params.id;

    await User.destroy({ where: { id: id } });

    res.redirect('/');

})

app.get('/users/edit/:id', async (req, res) => {

    const id = req.params.id;

    const user = await User.findOne({raw: true, where: { id: id }})

    res.render('useredit', { user })

})

app.get('/', async (req, res) => {

    const users = await User.findAll({raw: true})



    res.render('home', { users: users });

})

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log(chalk.green('The application is online on port 3000'))
    })
}).catch(() => console.log(err))

