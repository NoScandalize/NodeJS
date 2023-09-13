const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {

    const user = {
        name: 'Douglas',
        surname: 'Wesley',
        age: 24
    }

    const word = 'Teste';

    res.render('home', { user: user, word });

})

app.listen(3000, () => {
    console.log('App funcionando!')
})