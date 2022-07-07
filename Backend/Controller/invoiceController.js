const Invoice = require('../Models/invoiceModel');



//adding account details
const addInvoice = async (req,res) => {
    
    let newData = new Invoice(req.body);

   
//    const { ProductName ,Address , EmailAddress , PhoneNumber ,UserName } = req.body;
  
   

    try{

        newData.save((err)=>{
            if(err){
                return res.status(400).json({
                    message:err
                });
            }
            return res.status(200).json({
                message:"data added succsesfull"
            });
        });

    }catch(err){

        return res.status(400).json({
            messages:err
        });

    }
}


//get all invoice details
const getallInvoiceDetails =  async (req,res) => {
    try{
        const InvoiceData = await Invoice.find();
        return res.status(200).send({
            data:InvoiceData
        });

    }catch(err){

        return res.status(500).send({
            message:err
        })

    }
}

//update details
const updateInvoiceDetails =  async (req,res) => {
    try{

        
        const id = req.params.id;
        Invoice.findByIdAndUpdate(id,{
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
    addInvoice,
    getallInvoiceDetails,
    updateInvoiceDetails,
   
}