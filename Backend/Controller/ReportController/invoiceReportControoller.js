const INVOICE_TEMPLATE = require("../../Reports/InvoiceReport");
const PDF = require('html-pdf');
const path = require('path');


const postInvoiceDetails = async (req, res) => {

    PDF.create(INVOICE_TEMPLATE(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })


}

const getInvoiceDetails = async (req, res) => {

    //res.sendFile(`/Colouration_Yashoda/Coloration/Backend/invoice.pdf`)
    // res.sendFile(`/Coloration_Software/Coloration-main/Coloration/Backend/invoice.pdf`)
    const path = process.cwd() + '/invoice.pdf';
    res.sendFile(path);
}

module.exports = {
    postInvoiceDetails,
    getInvoiceDetails
}