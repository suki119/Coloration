const QUOTATION_TEMPLATE = require("../../Reports/QuotationaReports");
const PDF = require('html-pdf');
const path = require('path');
const savePath = path.join(process.cwd(), 'invoice.pdf');


const postQuotationReportData = async (req, res) => {

    PDF.create(QUOTATION_TEMPLATE(req.body), {}).toFile(savePath, (err) => {
        if (err) {
            res.send(Promise.reject());
        }
        res.send(Promise.resolve());
    })


}
const getQuotationReportDetails = async (req, res) => {

    const path = path.join(process.cwd(), 'invoice.pdf');

    if (!res.headersSent) {
        res.sendFile(path);
    } else {
        console.log('The response headers have already been sent.');
    }
}

module.exports = {
    postQuotationReportData,
    getQuotationReportDetails
}