const QUOTATION_TEMPLATE = require("../../Reports/QuotationaReports");
const PDF = require('html-pdf');
const path = require('path');
const savePath = process.cwd() + '/invoice.pdf'; 


const postQuotationReportData = async (req, res) => {

    PDF.create(QUOTATION_TEMPLATE(req.body), {}).toFile(savePath, (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })


}

const getQuotationReportDetails = async (req, res) => {

    //res.sendFile(`/Colouration_Yashoda/Coloration/Backend/invoice.pdf`)
    // res.sendFile(`/Coloration_Software/Coloration-main/Coloration/Backend/invoice.pdf`)
    const path = process.cwd() + '/invoice.pdf';
    res.sendFile(path);
}

module.exports = {
    postQuotationReportData,
    getQuotationReportDetails
}