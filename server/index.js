require('dotenv').config({path: '../.env'});

const bodyParser = require("body-parser");
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const PORT = 4000;

const adminController = require('./controllers/admin_controller');
const cloudinaryController = require('./controllers/cloudinary_controller');
const userController = require('./controllers/user_controller');
const productsController = require('./controllers/products_controller');


mongoose.connect(
  process.env.MONGO_URL, 
  { useNewUrlParser: true }, 
  (err) => {
    if(err) {
      console.log('Database Error', err);
    }
    console.log('Connected to database');
  }
)

app.use(bodyParser.json());

app.use(session({
  secret: process.env.MONGO_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 14
  }
}));

app.use(cors());

setTimeout(() => {
  app.get('/api/user-data', userController.readUserData);
  app.post('/api/user-data/cart', userController.addToCart);
  app.delete('/api/user-data', userController.removeFromCart);
  app.get('/auth/callback', userController.login);
  app.post('/api/logout', userController.logout);

  app.get('/api/products', productsController.readAllProducts);
  app.get('/api/products/:id', productsController.readProduct);

  app.get('/api/users', adminController.getAdminUsers);
  app.get('/api/products', adminController.createProduct);
  app.put('/api/products/:id', adminController.updateProduct);
  app.delete('/api/products/:id', adminController.deleteProduct);

  app.get('/api/upload', cloudinaryController.upload);
}, 200)

app.listen(PORT, () => console.log('Listening on port:', PORT));