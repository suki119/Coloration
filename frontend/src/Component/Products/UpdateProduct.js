import React, { createRef, Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import AccountCSS from './account.module.css';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import axios, { Axios } from 'axios';
import { FaEdit } from "react-icons/fa";
import { BsWallet2 } from "react-icons/bs";
import { FcCheckmark, FcCancel, FcOk, FcInspection, FcOvertime, FcProcess, FcPicture } from "react-icons/fc";
import ScrollableFeed from 'react-scrollable-feed';
import validator from 'validator'
import TableScrollbar from 'react-table-scrollbar';
import { MDBDataTable } from 'mdbreact';
import { Image } from 'cloudinary-react';
import Select from 'react-select';
import { v4 as uuid } from 'uuid';
import Swal from 'sweetalert2'
import SimpleImageSlider from "react-simple-image-slider";
import { Slide } from 'react-slideshow-image';
import { BsXLg } from "react-icons/bs";
import img from '../Images/No-Image-Placeholder.svg.png'
import logo from '../Images/default.jpg'
import JoditEditor from "jodit-react";
import UpdateProductUI from './UpdateProductUI';
import { appURLs, webAPI } from '../../enum/URL'



class UpdateProduct extends Component {

    constructor(props) {

        super(props)

        this.state = {

            AccountID: this.props.match.params.id,

            allAcounts: [],
            productName: '',
            category: '',
            companyName: '',
            length: '',
            productDiscription: '',
            BagageID: '',
            BagageType: '',
            SerailNumber: '',
            type: true,
            holdertype: true,
            data: [],
            img: [],
            imgURL: '',
            options: [],
            selectedOptions: [],
            CloudinaryImg: [],
            allBaggage: [],
            allproducts: [],
            allselectedBaggage: [],
            submitButton: false,
            addButton: false,
            baggageResData: [],
            slideImages: [],
            bagageData: [],
            productData: '',
            baggage:[],


            buttons: ["bold", "italic", "link", "unlink", "underline", "source"],
            loader: false





        }

        this.functions = {

            getAccountDetails: this.getAccountDetails.bind(this),
            handleSearchArea: this.handleSearchArea.bind(this),
            filterData: this.filterData.bind(this),
            changCompanyName: this.changCompanyName.bind(this),
            changProductName: this.changProductName.bind(this),
            changCategory: this.changCategory.bind(this),
            changlength: this.changlength.bind(this),
            changproductDiscription: this.changproductDiscription.bind(this),
            changBagageID: this.changBagageID.bind(this),
            changeBagageType: this.changeBagageType.bind(this),
            changSerailNumber: this.changSerailNumber.bind(this),
            add: this.add.bind(this),
            formData: createRef(),
            postAccountData: this.postAccountData.bind(this),
          
            toProduct: this.toProduct.bind(this),
            changeFilePath: this.changeFilePath.bind(this),
            addBagageData: this.addBagageData.bind(this),
            generateBaggageNumber: this.generateBaggageNumber.bind(this),
            getallBaggage: this.getallBaggage.bind(this),
            getAllProducts: this.getAllProducts.bind(this),
            addBaggage: this.addBaggage.bind(this),
            cancelBaggage: this.cancelBaggage.bind(this),
            getProductById: this.getProductById.bind(this),
            


        }

        this.editAccountBtn = this.editAccountBtn.bind(this)

    }



    getProductById() {

        this.setState({ loader: true });
        const data = {
            id: this.state.AccountID
        }

        axios.post(appURLs.web + webAPI.getProductById, data).then((res) => {

            if (res.status == 200) {
                if (res.data.data) {



                    const data = {
                        "companyName": res.data.data.accountName,
                        "productName": res.data.data.productName
                    }

                    axios.post(appURLs.web + webAPI.findByComAndAcc, data).then((res) => {

                        console.log("esde", res.data)
                        this.setState({
                            baggageResData: res.data.data,
                            baggage:res.data.data
                        }, () => {

                            this.setState({ loader: false });

                        })
                    })

                    console.log("dateees", res.data.data.createdAt)
                    const date = res.data.data.createdAt




                    const createdDate = date.substr(0, 10);



                    this.setState({
                        productData: res.data.data,
                        createdDate: createdDate

                    }, () => {

                        let productStatusDes;
                        productStatusDes = this.state.productData.productStatus == 'Y' ? 'Completed' : 'Pennding';
                        this.setState({
                            productStatusDes: productStatusDes,

                            productName: this.state.productData.productName,
                            category: this.state.productData.productCategory,
                            length: this.state.productData.productDetails,
                            productDiscription: this.state.productData.productDiscription

                        })

                        // this.handleStatusStatus();
                    })
                } else {
                    alert("no product with that")
                }
            } else {
                alert("technical error");
            }
        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })

    }



    cancelBaggage(event, index) {

        if (event) {



            axios.delete(appURLs.web + webAPI.deleteProduct + event).then((res) => {


                const { baggageResData } = this.state;
                baggageResData.splice(index, 1);
                this.setState({
                    baggageResData
                })
                console.log("nnnnnnnn", index)
                console.log(baggageResData)
            })

        }

        console.log(event)


    }


    generateBaggageNumber() {
        const unique_id = uuid();
        const small_id = unique_id.slice(3, 7)
        const id = "BA" + small_id
        this.setState({ BagageID: id });
    }


    changeFilePath(event) {
        console.log("img", event.target.files);
        let { img } = this.state;
        img.push(event.target.files);
        this.setState({
            img
        }, () => {



        })



    }

    changCompanyName = (selectedOptions) => {
        console.log(selectedOptions)





        this.setState({
            selectedOptions,

        });
    }

    changProductName = (event) => {
        this.setState({
            productName: event.target.value
        });
    }

    changCategory = (event) => {
        console.log(event.target.value)
        this.setState({
            category: event.target.value
        })


    }

    changlength = (event) => {
        this.setState({
            length: event.target.value
        });
    }

    changproductDiscription(event) {
        console.log("xxxxxxxxxxxxxxx", event)
        this.setState({
            productDiscription: event
        }, () => {
            console.log("xxxxxxxxxxxxxxx", this.state.productDiscription)
        });
    }

    changBagageID = (event) => {
        this.setState({
            BagageID: event.target.value
        });
    }

    changeBagageType = (event) => {

        this.setState({
            BagageType: event.target.value
        })


    }

    changSerailNumber = (event) => {


        this.setState({
            SerailNumber: event.target.value
        });
    }

    postAccountData(data) {

        const url = 'http://localhost:8000/api/account/post';

        axios.post(appURLs.web + webAPI.postAccountData, data).then((res) => {
            console.log("response", res.data)
        })



    }

    toProduct() {

        this.props.history.push('/products');

    }

    editAccountBtn(id) {

        this.props.history.push(`/products/${id}`);


    }




    addBaggage() {




        if (this.state.BagageType && this.state.SerailNumber) {


        } else {

            Swal.fire({

                icon: 'warning',
                title: 'Some Fields are empty',
                showConfirmButton: false,
                timer: 1500
            })
            return -1


        }

        this.setState({
            addButton: true,
            submitButton: true
        })


        const serialNumber = this.state.SerailNumber;
        const type = this.state.BagageType;


        const baggageData = {
            productName: this.state.productName,
            type: this.state.BagageType,
            status: "N",
            bagageID: this.state.BagageID,
            Img:
                this.state.img,
            serialNumber: this.state.SerailNumber,
            accountID: this.state.productData.accountID,
            accountName: this.state.productData.accountName

        }

        const { allselectedBaggage } = this.state;
        allselectedBaggage.push(baggageData);
        this.setState({ allselectedBaggage }, () => {
            // this.generateBaggageNumber();

            this.setState({
                img: [],
                SerailNumber: '',
                BagageType: '',

            })
        });

        console.log("nothing", this.state.img)


        let max = this.state.img.length - 1;
        let num = 0;

        if (this.state.img.length == 0) {

            const baggageDatas = {

                CloudinaryImg: [],
                productName: this.state.productName,
                type: type,
                status: "N",
                bagageID: this.state.BagageID,

                serialNumber: serialNumber,
                accountID: this.state.productData.accountID,
                accountName: this.state.productData.accountName
            };


            const url = 'http://localhost:8000/api/bagage/post';



            axios.post(appURLs.web + webAPI.addBagageData, baggageDatas).then((res) => {

                if (res.data) {

                    this.setState({ BagageID: '' }, () => {
                        this.generateBaggageNumber();
                    });

                    let { baggageResData } = this.state;

                    baggageResData.push(res.data.data);

                    this.setState({
                        baggageResData,
                        addButton: false,
                        submitButton: false,
                        BagageID: ''
                    }, () => {
                        this.generateBaggageNumber();
                        console.log("res baggage", this.state.baggageResData);

                        this.state.baggageResData.forEach(el => {
                            const { slideImages } = this.state;
                            el.CloudinaryImg.forEach(el => {
                                slideImages.push({

                                    url: <img src={img} />,
                                    caption: 'Slide 1'
                                })
                            })

                            this.setState({ slideImages }, () => {
                                console.log("this.state.slideImages", this.state.slideImages)
                            })


                        });




                    })
                } else {

                }
            });

        }
        this.state.img.map((obj, index) => {



            // console.log(" max", max)
            // console.log("index", index)




            const formData = new FormData();
            formData.append("image", obj[0]);





            const url = 'http://localhost:8000/api/product/bagageImg/post';
            const res = axios.post(appURLs.web + webAPI.uploadBaggageImg, formData);


            let promises = [res];

            Promise.all(promises).then((result) => {
                console.log("result ", result[0].data.result)

                const { CloudinaryImg } = this.state;

                CloudinaryImg.push({
                    "cloudinary_id": result[0].data.result.public_id,
                    "url": result[0].data.result.url

                });

                this.setState({
                    CloudinaryImg
                }, () => {



                    console.log("CloudinaryImg res index", index + " /" + CloudinaryImg);
                    console.log("max", max)
                    console.log("index", num)

                    if (max == num) {

                        console.log("inside if")
                        const baggageDatas = {




                            CloudinaryImg: this.state.CloudinaryImg,


                            productName: this.state.productName,
                            type: type,
                            status: "N",
                            bagageID: this.state.BagageID,

                            serialNumber: serialNumber,
                            accountID: this.state.productData.accountID,
                            accountName: this.state.productData.accountName
                        };

                        this.setState({
                            CloudinaryImg: []
                        });

                        const url = 'http://localhost:8000/api/bagage/post';

                        axios.post(appURLs.web + webAPI.addBagageData, baggageDatas).then((res) => {

                            if (res.data) {


                                let { baggageResData } = this.state;

                                baggageResData.push(res.data.data);

                                this.setState({
                                    baggageResData,
                                    addButton: false,
                                    submitButton: false
                                }, () => {
                                    console.log("res baggage", this.state.baggageResData);





                                    this.state.baggageResData.forEach(el => {

                                        const { slideImages } = this.state;
                                        el.CloudinaryImg.forEach(el => {
                                            slideImages.push({

                                                url: el.url,
                                                caption: 'Slide 1'
                                            })
                                        })

                                        this.setState({ slideImages }, () => {
                                            console.log("this.state.slideImages", this.state.slideImages)
                                        })


                                    });




                                })
                            }
                        });


                    }

                    num += 1;

                })
            })





        })



    }


    addBagageData = (event) => {

        event.preventDefault();
        const bagageData = [];
        this.state.baggageResData.map(obj =>


            bagageData.push({
                bagageID: obj.bagageID,
                serialNumber: obj.serialNumber,
                type: obj.type,
                status: obj.status,
                // url: url

            })

        )

        // if (!this.state.category) {
        //     Swal.fire({

        //         icon: 'warning',
        //         title: 'Some Fields are empty',
        //         showConfirmButton: false,
        //         timer: 1500
        //     })
        //     return -1
        // }

        const product = {

            // productStatus: 'N',
            productDiscription: this.state.productDiscription,
            productDetails: this.state.length,

            productCategory: this.state.category,
            // productName: this.state.productName,
            // accountID: this.state.selectedOptions.value,
            // accountName: this.state.selectedOptions.label,
            bagageData: bagageData


        }

        this.setState({ loader: true });


        axios.put(appURLs.web + webAPI.changeProductStatus + this.state.AccountID, product).then((res) => {

            if (res.status == 200) {


      
                    this.getallBaggage();
               
            }


        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })




    }



    add = (event) => {

        event.preventDefault();

        this.setState({

            holderName: '',
            phoneNumber: '',
            companyName: '',
            companyEmailAddress: '',
            companyPhoneNumber: '',
            comAddressCity: '',
            comAddressStreet: '',
            comAddressNum: '',

        })

        window.location.reload(false);

        const companyAddress = this.state.comAddressNum.value + "/" + this.state.comAddressStreet.value + "/" + this.state.comAddressCity.value;



        const newAccont = {

            HolderName: this.state.holderName.value,
            HolPhonenumber: this.state.phoneNumber.value,
            CompanyName: this.state.companyName.value,
            CompanyEmailAddress: this.state.companyEmailAddress.value,
            CompanyPhonenumber: this.state.companyPhoneNumber.value,
            CompanyAddress: companyAddress
        }
        console.log("data", newAccont)

        if (this.state.holderName.value && this.state.phoneNumber.value && this.state.companyName.value && this.state.companyEmailAddress.value &&
            this.state.companyPhoneNumber.value && this.state.comAddressCity.value && this.state.comAddressStreet.value && this.state.comAddressNum.value) {



            if (!validator.isEmail(this.state.companyEmailAddress.value)) {

                alert("email is not valid");

            }

            this.postAccountData(newAccont);


        } else {
            alert("fields are empty");
        }

    }





    filterData(accountData, searchKey) {
        const result = accountData.filter(
            (item) =>
                item.CompanyName.toLowerCase().includes(searchKey) ||
                item.CompanyPhonenumber.toLowerCase().includes(searchKey) ||
                item.CompanyEmailAddress.toLowerCase().includes(searchKey)


        );

        this.setState({
            allAcounts: result
        });

    }

    handleSearchArea = (event) => {

        const searchKey = event.currentTarget.value;

        const url = 'http://localhost:8000/api/account/get';

        axios.get(appURLs.web + webAPI.getAccountData).then((res) => {

            if (res.data) {
                this.filterData(res.data.data, searchKey);
            }

        }
        )


    }

    getAllProducts() {

        this.setState({ loader: true });

        axios.get(appURLs.web + webAPI.getProductData).then((res) => {

            this.setState({
                allproducts: res.data.data
            }, () => {
                this.setState({ loader: false });
            })
        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })
    }


    getallBaggage() {

        this.setState({ loader: true });

        axios.get(appURLs.web + webAPI.getProductData).then((res) => {

            this.setState({
                allproducts: res.data.data
            }, () => {




                const userAttributes = []
                this.state.allproducts.forEach(el => {


                    const data = el.productCategory == 'tvSeries' ? el.productDetails + " EP" : el.productDetails + " Min"
                    userAttributes.push({
                        companyname: el.accountName,
                        productname: el.productName,
                        detail: data,
                        Baggageid: el.productCategory,
                        produtStaus: <div style={{ "fontSize": "x-large", "writingMode": "vertical-lr" }}>{el.productStatus == 'Y' ? <FcInspection /> : <FcOvertime />}</div>,
                        serialNumber: el.productCategory,
                        discription: <span style={{ "whiteSpace": "break-spaces" }}>{el.bagageData.map((obj, index) => {
                            return <><Row>
                                <Col>
                                    <p style={{ "height": "20px" }}>{index + 1 + ". " + obj.serialNumber}</p></Col><Col><span style={{ "marginLeft": "0px" }}>{obj.type}</span></Col><Col><span style={{ "marginLeft": "0px" }}>{obj.status == 'Y' ? <FcOk /> : <FcCancel />}</span></Col></Row></>
                        })}</span>,

                        age: <FaEdit onClick={() => this.editAccountBtn(el._id)} />


                    })
                });

                this.setState({

                    loader: false,

                    data: {
                        columns: [
                            {
                                label: 'COMPANY NAME',
                                field: 'companyname',
                                sort: 'asc',
                                width: 200,

                            },
                            {
                                label: 'PRODUCT NAME',
                                field: 'productname',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'productCategory',
                                field: 'Baggageid',
                                sort: 'asc',
                                width: 50,

                            },

                            {
                                label: 'Length',
                                field: 'detail',
                                sort: 'asc',
                                width: 50
                            },
                            {
                                label: 'Product Status',
                                field: 'produtStaus',
                                sort: 'asc',
                                width: 50
                            },
                            {
                                label: 'Baggage serialNumber',
                                field: 'discription',
                                sort: 'asc',
                                width: 250,


                            }
                            ,
                            {
                                label: 'ACTION ',
                                field: 'age',
                                sort: 'asc',
                                width: 50
                            }
                        ],
                        rows: userAttributes
                    }
                })
            })
        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        })
    }



    getAccountDetails() {

        this.setState({ loader: true });

        axios.get(appURLs.web + webAPI.getAccountData).then((res) => {

            this.setState({
                allAcounts: res.data.data
            }, () => {


                const dataArrey = [];
                this.state.allAcounts.forEach(obj => {
                    dataArrey.push({
                        value: obj._id, label: obj.CompanyName
                    })
                });


                this.setState({

                    loader: false,
                    options: dataArrey,

                })

            })
        }).catch((error) => {
            console.error('Error', error);
            this.setState({ loader: false });
            Swal.fire({
                position: 'top-end',
                icon: 'error',
                title: 'Network Error',
                showConfirmButton: false,
                timer: 1500
            })


        });
    }

    componentWillUnmount() {

        const { baggageResData } = this.state;
        console.log("this.state.baggageResData !", baggageResData);


        const data = window.addEventListener("beforeunload", function (e) {


            let confirmationMessage = "o/";
            console.log("logout !", confirmationMessage);

            (e || window.event).returnValue = confirmationMessage; //Gecko + IE

            console.log("this.state.baggageResData !", baggageResData);
            window.location.reload(true);

            return confirmationMessage; //Webkit, Safari, Chrome

        });


    }


    componentDidMount() {

        this.getAccountDetails();

        this.generateBaggageNumber();

        this.getAllProducts();

        this.getallBaggage();

        this.getProductById();



    }



    render() {

        return (

            <UpdateProductUI

                {...this.props}
                {...this.state}
                {...this.functions}

            />
        );
    }
}

export default UpdateProduct;
