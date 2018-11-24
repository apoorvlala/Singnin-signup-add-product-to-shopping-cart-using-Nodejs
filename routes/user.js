var express = require('express');
var router = express.Router();
var passport=require('passport');
var Product=require('../models/product');
var Cart=require('../models/cart');

var csrf=require('csurf');
router.use(csrf());


router.get('/profile',isLoggedIn,(req ,res)=>{
  res.render('users/profile');
});

router.use('/',notLoggedIn,(req ,res ,next)=>{
  next();
});

router.get('/signup',(req ,res ,next)=>{
  var messages=req.flash('error');
  res.render('users/signup',{csrfToken:req.csrfToken(),messages:messages , hasErrors:messages.length>0});
});

router.post('/signup',passport.authenticate('local.signup',{
              successRedirect:'/user/profile',
              failureRedirect:'/user/signup',
              failureFlash:true})
              );


router.get('/signing',(req ,res,next)=>{
  var messages=req.flash('error');
  res.render('users/signin',{csrfToken:req.csrfToken(),messages:messages,hasErrors:messages.length>0});
});

router.post('/signing',passport.authenticate('local.signin',{
              successRedirect:'/user/profile',
              failureRedirect:'/user/signing',
              failureFlash:true
            }));

router.get('/logout',isLoggedIn,(req ,res ,next)=>{
  req.logOut();
  res.redirect('/');
});

router.get('/add-to-cart/:id',(req ,res ,next)=>{
  var productId=req.params.id;
  var cart=new Cart(req.session.cart ? req.session.cart :{});
  Product.findById(productId,(err,product)=>{
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart=cart;
    console.log(req.session.cart);
    res.redirect('/');
  });
});

module.exports = router;

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}

function notLoggedIn(req ,res ,next){
  if(!req.isAuthenticated()){
    return next();
  }
  res.redirect('/');
}