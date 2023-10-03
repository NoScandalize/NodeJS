const Product = require('../models/Product')

module.exports = class ProductController {

    static showProducts(req, res) {
        res.render('products/all')
    }

    static createProduct(req, res) {
        res.render('products/create')
    }

    static async createProductPost(req, res) {

        const { name, image, price, description } = req.body; 

        const product = new Product(name, image, price, description);

        product.save()

        res.redirect('/products')

    }
}