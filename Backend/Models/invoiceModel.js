const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({

    invoiceNumber: {
        type: String,
        required: true,
        trim: true
    },
    accountID: {
        type: String,
        required: true,
        trim: true
    },
    invoiceStatus: {
        type: String,
        required: true,
        trim: true
    },
    draftstatus: {
        type: String,
        required: true,
        trim: true
    },
    productDetails: [{
        productID: {
            type: String,
            required: true,
            trim: true
        },
        qty: {
            type: String,
            required: true,
            trim: true
        },
        amount: {
            type: String,
            required: true,
            trim: true
        },
        totalamount: {
            type: String,
            required: true,
            trim: true
        },




    }]



}, { timestamps: true });


const invoice = mongoose.model('invoice', invoiceSchema);

module.exports = invoice;