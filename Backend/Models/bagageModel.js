const mongoose = require('mongoose');

const bagageSchema = new mongoose.Schema({

    productID :{
        type: String,
        required : true,
        trim:true
    },
    type :{
        type: String,
        required : true,
        trim:true
    },
    status: {
        type: String,
        required : true,
        trim:true
    },
    bagageID: {
        type: String,
        required : true,
        trim:true
    },
    cloudinary_id: {
        type: String,
        required: true,
        trim: true
    },
    serialNumber: {
        type: String,
        required : false,
        trim:true
    },
   

},{timestamps:true});


const bagage = mongoose.model('bagage',bagageSchema);

module.exports = bagage;