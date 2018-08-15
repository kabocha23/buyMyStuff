const Product = require('../models/product');
const User  = require('../models/user');


module.exports = {
  getAdminUsers(req, res) {
    User.find().exec((err, users) => {
      if(err) console.log('Find Admin Users Error', err);
      res.status(200).json({users});
    })
  }, 
  createProduct(req, res) {
    const { name, description, price, picture } = req.body;
    let newProduct = new Product({
      name,
      description,
      price,
      picture
    });
    newProduct.save();
    res.status(200).json({product: newProduct});
  }, 
  updateProduct(req, res) {
    const { id } = req.params;
    const { name, description, price, picture } = req.body;
    Product.findById(id).exec((err, product) => {
      if(err) console.log('Updated Product', err);
      product.name = name;
      product.description = description;
      product.price = price;
      product.picture = picture;
      product.save();
      res.status(200).json({product});
    })
  }, 
  deleteProduct(req, res) {
    const { id } = req.params;
    Product.deleteOne({_id: id}).exec((err, product) => {
      if(err) console.log('Delete One Error', err)
      res.status(200).json({product});
    });
  }
}