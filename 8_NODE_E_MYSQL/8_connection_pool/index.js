const express = require('express');
const exphbs = require('express-handlebars');
const pool = require('./db/conn');

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

    pool.query(query, (err) => {
        if (err) {
            console.log(err);
            return;
        }

        res.redirect('/books');
    })

})

app.get('/books', (req, res) => {

    const query = "SELECT * FROM books";

    pool.query(query, function (err, data) {
    
        if(err) {
            console.log(err);
            return;
        }

        const books = data;

        res.render('books', { books })

    })

})

app.get('/books/:id', (req, res) => {

    const id = req.params.id;

    const query = `SELECT * FROM books WHERE id=${id}`

    pool.query(query, function (err, data) {

        if(err) {
            console.log(err);
            return;
        }

        const book = data[0];

        res.render('book', { book })

    })

})

app.get('/books/edit/:id', (req, res) => {

    const id = req.params.id;

    const query = `SELECT * FROM books WHERE id = ${id}`;

    pool.query(query, function (err, data) {

        if(err) {
            console.log(err);
            return;
        }

        const book = data[0];

        res.render('editbook', { book })

    })

})

app.post('/books/updatebook', (req, res) => {

    const id = req.body.id;
    const title = req.body.title;
    const pagesqty = req.body.pagesqty;

    const query = `UPDATE books SET title = '${title}', page_number = ${pagesqty} WHERE id = ${id}`

    pool.query(query, function (err) {

        if(err) {
            console.log(err)
            return;
        }

        res.redirect('/books')
        
    })

})

app.post('/books/remove/:id', (req, res) => {

    const id = req.params.id;

    const query = `DELETE FROM books WHERE id = ${id}`;

    pool.query(query, function (err) {
        
        if(err) {
            console.log(err);
            return;
        }

        res.redirect('/books')

    })

})




app.listen(3000, () => {
    console.clear();
    console.log('The application is online on port 3000')

})