const QUOTATION_TEMPLATE = require("../../Reports/QuotationaReports");
const PDF = require('html-pdf');


const postQuotationReportData = async (req, res) => {

    PDF.create(QUOTATION_TEMPLATE(req.body), {}).toFile('invoice.pdf', (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })

   
}

const getQuotationReportDetails = async (req, res) => {

    res.sendFile(`/Colouration_Yashoda/Coloration/Backend/invoice.pdf`)
    // res.sendFile(`/Coloration_Software/Coloration-main/Backend/invoice.pdf`)
}

module.exports = {
    postQuotationReportData,
    getQuotationReportDetails
}