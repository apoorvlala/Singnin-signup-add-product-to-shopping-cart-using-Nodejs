const mongoose=require('mongoose');
require("dotenv").config();
mongoose.Promise=global.Promise;
mongoose.connect(process.env.MONGOURI,{useNewUrlParser:true});

module.exports=mongoose;
///console.log(process.env.MONGOURI);