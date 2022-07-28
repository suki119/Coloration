const express = require('express');
const router = express.Router();
const upload = require("../helpers/fileHelper");

const { addAcountDetails, getallAccountDetails, updateAccountDetails, deleteAccountDetails , getallAccountByID} = require('../Controller/accountController');
const { addInvoice, getallInvoiceDetails, updateInvoiceDetails } = require('../Controller/invoiceController');
const { addproductDetails, getallProductDetails, updateProductDetails, deleteProductDetails } = require('../Controller/productContoller');
const { addBagageDetails, getallBagageDetails, updateBagageDetails, deleteBagageDetails ,addImgForBaggage } = require('../Controller/bagageController');
const { addJobetails, getallJobCardDetails, updateJobDetails, deleteJobCardDetails } = require('../Controller/jobCardController');
const {  addreciptDetails,getallReciptDetails, } = require('../Controller/reciptController');


//Account detail api post
router.post('/account/post', addAcountDetails);
router.get('/account/get', getallAccountDetails);
router.get('/account/get/:id', getallAccountByID);
router.put('/account/update/:id', updateAccountDetails);
router.delete('/account/delete/:id', deleteAccountDetails);


//Invoice detail api post
router.post('/Invoice/post', addInvoice);
router.get('/Invoice/get', getallInvoiceDetails);
router.put('/Invoice/update/:id', updateInvoiceDetails);


//product detail api post
router.post('/product/post', addproductDetails);
router.get('/product/get', getallProductDetails);
router.put('/product/update/:id', updateProductDetails);
router.delete('/product/delete/:id', deleteProductDetails);


//product detail api post
router.post('/product/bagageImg/post',upload.single("image"), addImgForBaggage);


//Bagage detail api post
router.post('/bagage/post', addBagageDetails);
router.get('/bagage/get', getallBagageDetails);
router.put('/bagage/update/:id', updateBagageDetails);
router.delete('/bagage/delete/:id', deleteBagageDetails);


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