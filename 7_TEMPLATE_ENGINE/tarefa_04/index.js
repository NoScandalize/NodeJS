const express = require('express');
const exphbs = require('express-handlebars');
const chalk = require('chalk');

const app = express();

const hbs = exphbs.create({
    partialsDir: ["views/partials"]
})

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/smart-tv-led-43', (req, res) => {

    const tvsmart = offProducts[0]

    res.render('tvsmart', { tvsmart })

})

app.get('/guarda-roupa-casal-8-portas', (req, res) => {

    const guarda8portas = offProducts[1]

    res.render('guarda8portas', { guarda8portas })

})

app.get('/robo-aspirador', (req, res) => {

    const roboaspirador = offProducts[2]

    res.render('roboaspirador', { roboaspirador })

})

app.get('/lavadora-de-alta-pressao', (req, res) => {

    const lavadora = homeProducts[0]

    res.render('lavadora', { lavadora })

})

app.get('/furadeira-parafusadeira-400w', (req, res) => {

    const furadeira = homeProducts[1]

    res.render('furadeira', { furadeira })

})

app.get('/pia-de-cozinha-inox', (req, res) => {

    const pia = homeProducts[2]

    res.render('pia', { pia })

})

app.get('/jogo-de-panenalas-antiaderente', (req, res) => {

    const jogopanela = kitchenProducts[0]

    res.render('jogopanela', { jogopanela })

})

app.get('/faqueiro-aco-inox', (req, res) => {

    const faqueiro = kitchenProducts[1]

    res.render('faqueiro', { faqueiro })

})

app.get('/conjunto-de-potes-10-pecas', (req, res) => {

    const conjuntopote = kitchenProducts[2]

    res.render('conjuntopote', { conjuntopote })

})

app.get('/cama-box-casal-conjugada', (req, res) => {

    const camabox = bedProducts[0]

    res.render('camabox', { camabox })

})

app.get('/comoda-retro-4-gavetas', (req, res) => {

    const comoda = bedProducts[1]

    res.render('comoda', { comoda })

})

app.get('/guarda-roupa-4-portas', (req, res) => {

    const guarda4portas = bedProducts[2]

    res.render('guarda4portas', { guarda4portas })

})

app.get('/', (req, res) => {

    res.render('home', { offProducts, homeProducts, kitchenProducts, bedProducts })

})

app.listen(3000, () => {
    console.log(chalk.green(`The application is online and has been defined on the port 3000`))
})

const offProducts = [
    {
        id: 1,
        name: "Smart TV LED 43",
        realPrice: "1.849,90",
        offPrice: "1699,99",
        cost: "1999,00",
        parcel: "199,90",
        imgDir: '/assets/SmartTV.jpg',
        route: '/smart-tv-led-43'
    },
    {
        id: 2,
        name: "Guarda Roupa Casal 8 Portas",
        realPrice: "1.299,90",
        offPrice: "949,99",
        cost: "1399,00",
        parcel: "139,90",
        imgDir: '/assets/GuardaRoupas.jpg',
        route: '/guarda-roupa-casal-8-portas'
    },
    {
        id: 3,
        name: "Robô Aspirador",
        realPrice: "699,90",
        offPrice: "599,99",
        cost: "799,00",
        parcel: "79,90",
        imgDir: '/assets/Robo.jpg',
        route: '/robo-aspirador'
    },
]

const homeProducts = [
    {
        id: 4,
        name: "Lavadora de Alta Pressão",
        realPrice: "599,90",
        offPrice: "499,99",
        cost: "699,00",
        parcel: "69,90",
        imgDir: '/assets/LavadoraPressao.jpg',
        route: '/lavadora-de-alta-pressao'
    },
    {
        id: 5,
        name: "Furadeira Parafusadeira 400w",
        realPrice: "1.299,90",
        offPrice: "949,99",
        cost: "1399,00",
        parcel: "139,90",
        imgDir: '/assets/Furadeira.jpg',
        route: '/furadeira-parafusadeira-400w'
    },
    {
        id: 6,
        name: "Pia de Cozinha Inox",
        realPrice: "399,90",
        offPrice: "259,99",
        cost: "499,00",
        parcel: "49,90",
        imgDir: '/assets/PiaCozinha.jpg',
        route: '/pia-de-cozinha-inox'
    },

]

const kitchenProducts = [
    {
        id: 7,
        name: "Jogo de Panelas Antiaderente",
        realPrice: "399,90",
        offPrice: "299,99",
        cost: "499,00",
        parcel: "49,90",
        imgDir: '/assets/JogoPanela.jpg',
        route: '/jogo-de-panenalas-antiaderente'
    },
    {
        id: 8,
        name: "Faqueiro Aço Inox",
        realPrice: "699,90",
        offPrice: "549,99",
        cost: "799,00",
        parcel: "79,90",
        imgDir: '/assets/Faqueiro.jpg',
        route: '/faqueiro-aco-inox'
    },
    {
        id: 9,
        name: "Conjunto de Potes 10 Peças",
        realPrice: "149,90",
        offPrice: "119,99",
        cost: "199,00",
        parcel: "19,90",
        imgDir: '/assets/JogoPote.jpg',
        route: '/conjunto-de-potes-10-pecas'
    },

]

const bedProducts = [
    {
        id: 10,
        name: "Cama Box Casal Conjugada",
        realPrice: "899,90",
        offPrice: "749,99",
        cost: "999,00",
        parcel: "99,90",
        imgDir: '/assets/CamaBox.png',
        route: '/cama-box-casal-conjugada'
    },
    {
        id: 11,
        name: "Cômoda Retrô 4 Gavetas",
        realPrice: "699,90",
        offPrice: "549,99",
        cost: "799,00",
        parcel: "79,90",
        imgDir: '/assets/Comoda.jpg',
        route: '/comoda-retro-4-gavetas'
    },
    {
        id: 12,
        name: "Guarda-Roupa 4 Portas",
        realPrice: "799,90",
        offPrice: "649,99",
        cost: "899,00",
        parcel: "89,90",
        imgDir: '/assets/GuardaRoupasSolteiro.jpg',
        route: '/guarda-roupa-4-portas'
    },

]