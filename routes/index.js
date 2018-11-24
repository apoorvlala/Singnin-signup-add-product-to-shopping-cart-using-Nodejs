var express = require('express');
var router = express.Router();
var Product=require('../models/product');
var Cart=require('../models/cart');

/* GET home page. */
router.get('/', function(req, res, next) {
  var successMsg=req.flash('success')[0];
  Product.find((err,doc)=>{
    //res.json(doc);
    //console.log(doc);
    res.render('shop/index', { title: 'Shopping Cart',products:doc,successMsg:successMsg, noMessage:!successMsg});
  });  
});

router.get('/add-to-cart/:id',(req ,res ,next)=>{
  var productId=req.params.id;
  
});
router.get('/shopping-cart',(req,res,next)=>{
  if(!req.session.cart){
    return res.render('shop/shopping-cart',{products:null});
  }
  var cart=new Cart(req.session.cart);
  res.render('shop/shopping-cart',{products:cart.generateArray(),totalPrice:cart.totalPrice});
});
router.get('/checkout',(req ,res,next)=>{
  if(!req.session.cart){
    return redirect('/shopping-cart');
  }
  var cart=new Cart(req.session.cart);
  var errMsg=req.flash('error')[0];
  res.render('shop/checkout',{totalPrice:cart.totalPrice,errMsg:errMsg,noError:!errMsg});
});

router.post('/checkout',(req ,res,next)=>{
  if(!req.session.cart){
    return res.redirect('/shopping-cart');
  }
  var stripe = require("stripe")("pk_test_DIZZWGnOO988Tl2J8wl5UWwL");

stripe.charges.create({
  amount: 2000,
  currency: "usd",
  source: "stripeToken", // obtained with Stripe.js
  description: "Charge for jenny.rosen@example.com"
}, 
function(err, charge) {
  if(err){
    req.flash('error',err.message);
    return res.redirect('/checkout');
  }
  req.flash('success','Successfully boutght');
  req.cart=null;
  res.redirect('/');
});

});

module.exports = router;
