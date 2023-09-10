const express = require('express')
const path = require('path');
const router = express.Router();

const basePath = path.join(__dirname, '../templates')

router.get('/products', (req, res) => {

    res.sendFile(`${basePath}/products.html`)

})

router.get('/about', (req, res) => {

    res.sendFile(`${basePath}/about.html`)

})

module.exports = router;