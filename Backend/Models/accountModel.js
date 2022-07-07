const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({

    UserName :{
        type: String,
        required : true,
        trim:true
    },
    companyName :{
        type: String,
        required : true,
        trim:true
    },
    PhoneNumber: {
        type: String,
        required : true,
        trim:true
    },
    EmailAddress: {
        type: String,
        required : true,
        trim:true
    },
    Address: {
        type: String,
        required : true,
        trim:true
    },
   

},{timestamps:true});


const Account = mongoose.model('Account',accountSchema);

module.exports = Account;