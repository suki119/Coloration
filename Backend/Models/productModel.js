const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({

    accountID :{
        type: String,
        required : true,
        trim:true
    },
    productName :{
        type: String,
        required : true,
        trim:true
    },
    productCategory: {
        type: String,
        required : true,
        trim:true
    },
    productDetails: {
        type: String,
        required : true,
        trim:true
    },
    productDiscription: {
        type: String,
        required : false,
        trim:true
    },
    productStatus: {
        type: String,
        required : true,
        trim:true
    },
   

},{timestamps:true});


const Product = mongoose.model('product',productSchema);

module.exports = Product;