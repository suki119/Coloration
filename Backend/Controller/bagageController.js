const Bagage = require('../Models/bagageModel');
const cloudinary = require('../utils/cloudinary');
const upload = require('../helpers/fileHelper');



//adding account details
const addBagageDetails = async (req, res) => {

    let newData = new Bagage(req.body);


    //    const { ProductName ,Address , EmailAddress , PhoneNumber ,UserName } = req.body;

    const data = req.body

    try {

        newData.save((err) => {
            if (err) {
                return res.status(400).json({
                    message: err
                });
            }
            return res.status(200).json({
                message: "data added succsesfull", data: newData
            });
        });

    } catch (err) {

        return res.status(400).json({
            messages: err
        });

    }
}

//delete Account
// const addBagageDetails = async (req, res) => {
//     try {

//         let newData = new Bagage(req.body);

//         newData.save().then((err, object) => {


//             if (err) {
//                 return res.status(400).json({
//                     message: "delete unsuccessful", object
//                 });
//             }
//             return res.status(200).json({
//                 success: "Submission removed successful", object
//             });
//         });

//     } catch (err) {
//         return res.status(500).send({
//             message: err
//         })

//     }

// };




//get all acount details
const getallBagageDetails = async (req, res) => {
    try {
        const BagagetData = await Bagage.find();
        return res.status(200).send({
            data: BagagetData
        });

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}

//update details
const updateBagageDetails = async (req, res) => {
    try {


        const id = req.params.id;
        Bagage.findByIdAndUpdate(id, {
            $set: req.body
        }, (err) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            return res.status(200).json({
                message: "updated successfully!"
            });

        })

    } catch (err) {

        return res.status(500).send({
            message: err
        })

    }
}

//delete Account
const deleteBagageDetails = async (req, res) => {
    try {

        const id = req.params.id;
        const baggageData = await Bagage.findById(id);
        console.log(baggageData)
        // Delete image from cloudinary
        baggageData.CloudinaryImg.map(obj => 

             cloudinary.uploader.destroy(obj.cloudinary_id)
            
            )
       

        Bagage.findByIdAndRemove(req.params.id).exec((err, deletedBagage) => {


            if (err) {
                return res.status(400).json({
                    message: "delete unsuccessful", deletedBagage
                });
            }
            return res.status(200).json({
                success: "Submission removed successful", deletedBagage
            });
        });

    } catch (err) {
        return res.status(500).send({
            message: err
        })

    }

};



const addImgForBaggage = async (req, res) => {


    try {

        console.log("req...", req.file)
        const result = await cloudinary.uploader.upload(req.file.path);

        return res.status(200).json({
            message: "Image Uploaded sucsesful", result
        });



    } catch (err) {

    }

}



module.exports = {
    addBagageDetails,
    getallBagageDetails,
    updateBagageDetails,
    deleteBagageDetails,
    addImgForBaggage
}