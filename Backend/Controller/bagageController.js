const Bagage = require('../Models/bagageModel');



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
                message: "data added succsesfull"
            });
        });

    } catch (err) {

        return res.status(400).json({
            messages: err
        });

    }
}


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



module.exports = {
    addBagageDetails,
    getallBagageDetails,
    updateBagageDetails,
    deleteBagageDetails
}