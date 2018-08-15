const mongoose = require('mongoose');
const Product  = require('../models/product');

module.exports = {
    readAllProducts(req, res) {
        Product.find({}).exec((err, products) => {
            if(err) console.log('Get Product Mongoose Error', err);
            console.log('products', products);
            res.status(200).send(products);
        });
    },
    readProduct(req, res) {
        const { id } = req.params;
        Product.findById(id).exec((err, product) => {
            if(err) console.log('Get Single Product Error', err);
            console.log('product', product);
            res.status(200).json({product});
        })
    }
}