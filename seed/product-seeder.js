const Product=require('../models/product');
var mongoose=require('mongoose');
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost/nodedbshoppingcart')

const product=[

    new Product({
        imagePath:'http://pricepony.b-cdn.net/blog/wp-content/uploads/2016/11/lol-betting-xl-e1479344471223.jpg',
        title:'Fighter Video Game',
        description:'Awesome Game!!!!',
        price:20
    }),
    new Product({
        imagePath:'http://pricepony.b-cdn.net/blog/wp-content/uploads/2016/11/lol-betting-xl-e1479344471223.jpg',
        title:'Run Video Game',
        description:'Awesome Running Game!!!!',
        price:30
    }),
    new Product({
        imagePath:'http://pricepony.b-cdn.net/blog/wp-content/uploads/2016/11/lol-betting-xl-e1479344471223.jpg',
        title:'Temple Run Video Game',
        description:'Awesome Temple Running Game!!!!',
        price:50
    }),
    new Product({
        imagePath:'http://pricepony.b-cdn.net/blog/wp-content/uploads/2016/11/lol-betting-xl-e1479344471223.jpg',
        title:'Candy Crush Video Game',
        description:'Awesome Candy Crush Game!!!!',
        price:40
    }),
    new Product({
        imagePath:'http://pricepony.b-cdn.net/blog/wp-content/uploads/2016/11/lol-betting-xl-e1479344471223.jpg',
        title:'Star Wars Video Game',
        description:'Awesome Star Wars Game!!!!',
        price:60
    }),
    new Product({
        imagePath:'http://pricepony.b-cdn.net/blog/wp-content/uploads/2016/11/lol-betting-xl-e1479344471223.jpg',
        title:'Horse Rider Video Game',
        description:'Awesome Rider Video Game!!!!',
        price:90
    }),
    new Product({
        imagePath:'http://pricepony.b-cdn.net/blog/wp-content/uploads/2016/11/lol-betting-xl-e1479344471223.jpg',
        title:'Ghost Rider Video Game',
        description:'Awesome Ghost Rider Game!!!!',
        price:89
    }),
    new Product({
        imagePath:'http://pricepony.b-cdn.net/blog/wp-content/uploads/2016/11/lol-betting-xl-e1479344471223.jpg',
        title:'Prince Of Persia Video Game',
        description:'Awesome Prince Of Persia Game!!!!',
        price:29
    }),
];

var done=0;
for(var i=0;i<product.length;i++){
    product[i].save((err,result)=>{
        done++;
        if(done===product.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}