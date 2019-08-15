const express = require('express');
const router = express.Router();
const csrf = require('csurf');
const passport = require('passport');
const Product = require('../models/product');

const csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', (req, res, next) => {
  Product.find((err, result) => {
    if (err) {
      console.log('product find error: ', err);
      res.render('shop/index', { title: 'Express Shopping Cart', error: err });
    } else {
      let productChunks = [];
      const chunkSize = 3;
      for ( var i = 0; i < result.length; i += chunkSize ) {
        productChunks.push(result.slice(i, i + chunkSize));
      }
      res.render('shop/index', { title: 'Express Shopping Cart', products: productChunks });
    }
  });
});

router.get('/user/signup', function (req, res, next) {
  const messages = req.flash('error');
  res.render('user/signup', { csrfToken: req.csrfToken(), messages: messages, hasErrors: messages.length > 0 });
});

router.post('/user/signup', passport.authenticate('local.signup', {
  successRedirect: '/user/profile',
  failureRedirect: '/user/signup',
  failureFlash: true
}));

router.get('/user/profile', function(req, res, next) {
  res.render('user/profile');
})

module.exports = router;
