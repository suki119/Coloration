const draftInvoice = require('../Models/draftInvoiceModel');


//adding account details
const addDraftInvoiceData = async (req,res) => {
    
    let newData = new draftInvoice(req.body);

   
//    const { ProductName ,Address , EmailAddress , PhoneNumber ,UserName } = req.body;
  
   

    try{

        newData.save((err)=>{
            if(err){
                return res.status(400).json({
                    message:err
                });
            }
            return res.status(200).json({
                message:"data added succsesfull",
                status:2100
            });
        });

    }catch(err){

        return res.status(400).json({
            messages:err
        });

    }
}




//get all invoice details
const getallDraftInvoiceDetails =  async (req,res) => {
    try{
        const InvoiceData = await draftInvoice.find();
        return res.status(200).send({
            data:InvoiceData,
            status:2100
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//update details
const updateDraftInvoiceDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        draftInvoice.findByIdAndUpdate(id,{
            $set : req.body
        },(err) => {
            if(err){
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                message: "updated successfully!"
            });

        })
       
    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//draft find by Account Name , Product
const getDraftInvoiceByAccAndPro = async (req, res) => {
    try {

        const { accountID } = req.body;
        const data = await draftInvoice.findOne({ accountID: accountID });
        if (data) {

            return res.status(200).json({
                message: "data found", data,
                status:2100
            });
        }else{
            
            return res.status(200).json({
                message: "No Data found", data
            });
        }

    } catch(err) {

        return res.status(400).json({
            message:err
        });
    }
}

// //delete Account
// const deleteAccountDetails = async (req, res) => {
//     try{

//         account.findByIdAndRemove(req.params.id).exec((err, deletedAccount) => {

      
//             if (err) {
//                 return res.status(400).json({
//                     message: "delete unsuccessful", deletedAccount
//                 });
//             }
//             return res.status(200).json({
//                 success: "Submission removed successful", deletedAccount
//             });
//         });

//     }catch(err){
//         return res.status(500).send({
//             message:err
//         })

//     }
    
// };


module.exports = {
    addDraftInvoiceData,
    getallDraftInvoiceDetails,
    updateDraftInvoiceDetails,
    getDraftInvoiceByAccAndPro
}