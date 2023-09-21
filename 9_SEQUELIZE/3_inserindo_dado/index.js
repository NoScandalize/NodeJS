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

    res.redirect('/')

})

app.get('/', (req, res) => {

    res.render('home');

})

conn.sync().then(() => {
    app.listen(3000, () => {
        console.log(chalk.green('The application is online on port 3000'))
    })
}).catch(() => console.log(err))

