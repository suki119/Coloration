const express = require('express');
const router = express.Router();
const upload = require("../helpers/fileHelper");

const { addAcountDetails, getallAccountDetails, updateAccountDetails, deleteAccountDetails, getallAccountByID } = require('../Controller/accountController');
const { addInvoice, getallInvoiceDetails, updateInvoiceDetails } = require('../Controller/invoiceController');
const { addAdvance, getallAdvanceDetails, updateAdvanceDetails,getaAdvanceAmountByAccAndProd } = require('../Controller/advanceControlller');
const { addDraftInvoiceData, getallDraftInvoiceDetails, updateDraftInvoiceDetails, getDraftInvoiceByAccAndPro } = require('../Controller/draftInvoiceContoller');
const { addproductDetails, getallProductDetails, updateProductDetails, deleteProductDetails, getProductById, getAllProductsByAccountID , getProductByName} = require('../Controller/productContoller');
const { addBagageDetails, getallBagageDetails, updateBagageDetails, deleteBagageDetails, addImgForBaggage, getBaggageByAcoNameAndCompanyName } = require('../Controller/bagageController');
const { addJobetails, getallJobCardDetails, updateJobDetails, deleteJobCardDetails } = require('../Controller/jobCardController');
const { addreciptDetails, getallReciptDetails, } = require('../Controller/reciptController');
const { addAdvanceTot , getaAdvanceTotAmountByAccAndProd , updateAdvanceTotDetails } = require('../Controller/adavanceTotController');

const { postInvoiceDetails , getInvoiceDetails } = require('../Controller/ReportController/invoiceReportControoller');

//Report
//Invoice
router.post('/Reports/Invoice/postInvoiceDetails',postInvoiceDetails);
router.get('/Reports/Invoice/getInvoiceDetails',getInvoiceDetails);

//Account detail api post
router.post('/account/addAcountDetails', addAcountDetails);
router.get('/account/getallAccountDetails', getallAccountDetails);
router.get('/account/get/:id', getallAccountByID);
router.put('/account/update/:id', updateAccountDetails);
router.delete('/account/delete/:id', deleteAccountDetails);


//Advance detail api post
router.post('/Advance/addAdvance', addAdvance);
router.get('/Advance/getallAdvanceDetails', getallAdvanceDetails);
router.put('/Advance/updateAdvanceDetails/:id', updateAdvanceDetails);
router.post('/Advance/getaAdvanceAmountByAccAndProd', getaAdvanceAmountByAccAndProd);
//AdvanceTot detail api post
router.post('/Sub/AdvanceTot/addAdvanceTot', addAdvanceTot);
router.post('/Sub/AdvanceTot/getaAdvanceTotAmountByAccAndProd', getaAdvanceTotAmountByAccAndProd);
router.put('/Sub/AdvanceTot/updateAdvanceTotDetails/:id', updateAdvanceTotDetails);



//Invoice detail api post
router.post('/Invoice/addInvoiceData', addInvoice);
router.get('/Invoice/getAllInvoice', getallInvoiceDetails);
router.put('/Invoice/update/:id', updateInvoiceDetails);



//Draft Invoice detail api post
router.post('/draft/Invoice/addDraftInvoiceData', addDraftInvoiceData);
router.get('/draft/Invoice/getallDraftInvoiceDetails', getallDraftInvoiceDetails);
router.put('/draft/Invoice/updateDraftInvoiceDetails/:id', updateDraftInvoiceDetails);
router.post('/draft/Invoice/getDraftInvoiceByAccAndPro', getDraftInvoiceByAccAndPro);


//product detail api post
router.post('/product/addProductData', addproductDetails);
router.get('/product/getProductData', getallProductDetails);
router.put('/product/update/:id', updateProductDetails);
router.delete('/product/delete/:id', deleteProductDetails);
router.post('/product/getProductById', getProductById);
router.post('/product/getAllProductsByAccountID', getAllProductsByAccountID);
router.post('/product/getProductByName', getProductByName);


//product detail api post
router.post('/product/bagageImg/uploadBaggageImg', upload.single("image"), addImgForBaggage);


//Bagage detail api post
router.post('/bagage/addBagageData', addBagageDetails);
router.get('/bagage/get', getallBagageDetails);
router.put('/bagage/update/:id', updateBagageDetails);
router.delete('/bagage/delete/:id', deleteBagageDetails);
router.post('/bagage/findByComAndAcc', getBaggageByAcoNameAndCompanyName);


//JobCard detail api post
router.post('/jobCard/post', addJobetails);
router.get('/jobCard/get', getallJobCardDetails);
router.put('/jobCard/update/:id', updateJobDetails);
router.delete('/jobCard/delete/:id', deleteJobCardDetails);



//Recipt detail api post
router.post('/Recipt/post', addreciptDetails);
router.get('/Recipt/get', getallReciptDetails);
// router.put('/jobCard/update/:id', updateJobDetails);
// router.delete('/jobCard/delete/:id', deleteJobCardDetails);


module.exports = router;