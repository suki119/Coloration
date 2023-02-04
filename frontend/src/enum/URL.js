export let appURLs = {
  web: 'http://localhost:8000/'
}


export const webAPI = {

  /************************ Account API *********************************/

  postAccountData: 'api/account/addAcountDetails',
  getAccountData: 'api/account/getallAccountDetails',
  deleteAccountData: 'api/account/delete/',
  updateAccountData: 'api/account/update/',
  getAccountById: 'api/account/get/',


  /************************ Product API *********************************/


  getProductData: 'api/product/getProductData',
  getProductById: 'api/product/getProductById',
  addProductData: 'api/product/addProductData',
  changeProductStatus: 'api/product/update/',
  getAllProductsByAccountID: 'api/product/getAllProductsByAccountID',
  getProductByName: 'api/product/getProductByName',


  /************************ bagage API *********************************/
  deleteProduct: 'api/bagage/delete/',
  addBagageData: 'api/bagage/addBagageData',
  findByComAndAcc: 'api/bagage/findByComAndAcc',
  updateBaggageData: 'api/bagage/update/',


  /************************ Advance API *********************************/
  addAdvance: 'api/Advance/addAdvance',
  getallAdvanceDetails: 'api/Advance/getallAdvanceDetails',
  updateAdvanceDetails: 'api/Advance/updateAdvanceDetails/',
  getaAdvanceAmountByAccAndProd : 'api/Advance/getaAdvanceAmountByAccAndProd',

   /************************ Advance Tot API *********************************/
   addAdvanceTot:'api/Sub/AdvanceTot/addAdvanceTot',
   getaAdvanceTotAmountByAccAndProd : 'api/Sub/AdvanceTot/getaAdvanceTotAmountByAccAndProd',
   updateAdvanceTotDetails : 'api/Sub/AdvanceTot/updateAdvanceTotDetails/',

  /************************ Invoice API *********************************/

  getAllInvoice: 'api/Invoice/getAllInvoice',
  addInvoiceData: 'api/Invoice/addInvoiceData',
  getInvoiceByAccName: 'api/Invoice/getInvoiceByAccName',
  deleteInvoiceByID : 'api/Invoice/deleteInvoiceByID/',


  /************************ Draft Invoice API *********************************/

  addDraftInvoiceData: 'api/draft/Invoice/addDraftInvoiceData',
  getallDraftInvoiceDetails: 'api/draft/Invoice/getallDraftInvoiceDetails',
  updateDraftInvoiceDetails: 'api/draft/Invoice/updateDraftInvoiceDetails',
  getDraftInvoiceByAccAndPro: 'api/draft/Invoice/updateDraftInvoiceDetails',


  /************************ Invoice API *********************************/
  postInvoiceDetails : 'api/Reports/Invoice/postInvoiceDetails',
  getInvoiceDetails : 'api/Reports/Invoice/getInvoiceDetails',





  /************************ Img Uploading API *********************************/

  uploadBaggageImg: 'api/product/bagageImg/uploadBaggageImg',
}