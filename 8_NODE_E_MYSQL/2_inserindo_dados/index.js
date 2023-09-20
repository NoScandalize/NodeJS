const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');

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

app.get('/', (req, res) => {

    res.render('home');

})

app.post('/books/insertbook', (req, res) => {

    const title = req.body.title;
    const pagesqty = req.body.pagesqty;

    const query = `INSERT INTO books (title, page_number) VALUES ("${title}", ${pagesqty})`

    conn.query(query, (err) => {
        if (err) {
            console.log(err);
        }

        res.redirect('/');
    })

})

const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password : '',
    database: 'nodemysql'
})

conn.connect(function(err) {

    if (err) {
        console.log(err)
        return;
    }

    console.log('Successful connection to MySQL')

})


app.listen(3000, () => {
    console.clear();
    console.log('The application is online on port 3000')

})