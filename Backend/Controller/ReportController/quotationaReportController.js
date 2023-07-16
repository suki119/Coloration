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

// const postQuotationReportData = async (req, res) => {
//     // Assuming PDF is a module or library used to create PDF files

//     try {
//         // Assuming QUOTATION_TEMPLATE is a function that generates the PDF content based on req.body
//         const pdf = PDF.create(QUOTATION_TEMPLATE(req.body), {});

//         // Assuming savePath is the path where the generated PDF file will be saved
//         pdf.toFile(savePath, (err) => {
//             if (err) {
//                 console.error("Error generating PDF:", err);
//                 return res.status(500).json({ error: "Failed to generate the PDF." });
//             }

//             // If everything goes well, send a success response
//             return res.status(200).json({ success: "PDF generated successfully." });
//         });
//     } catch (error) {
//         // If there's an uncaught error during PDF generation, handle it here
//         console.error("Error generating PDF:", error);
//         return res.status(500).json({ error: "Failed to generate the PDF." });
//     }
// };




 const getQuotationReportDetails = async (req, res) => {

    const pathpdf = path.join(process.cwd(), 'invoice.pdf');

    if (!res.headersSent) {
        res.sendFile(pathpdf);
    } else {
        console.log('The response headers have already been sent.');
    }
}

module.exports = {
    postQuotationReportData,
    getQuotationReportDetails
}