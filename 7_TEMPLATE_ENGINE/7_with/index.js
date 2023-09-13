const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/dashboard', (req, res) => {

    const items = ["Item a", "Item b", "Item c"];


    res.render('dashboard', { items })
})

app.get('/post', (req, res) => {
    const post = {
        title: 'Aprender Node.js',
        category: 'JavaScript',
        body: 'Este artigo vai te ajudar a prender Node.js...',
        comments: 4,
    }

    res.render('blogpost', { post })
})

app.get('/', (req, res) => {

    const user = {
        name: 'Douglas',
        surname: 'Wesley',
        age: 24
    }

    const word = 'Teste';

    const auth = true;

    const approved = true;

    res.render('home', { user: user, word, auth, approved });

})

app.listen(3000, () => {
    console.log('App funcionando!')
})