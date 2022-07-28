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


class AddProduct extends Component {

    constructor(props) {

        super(props)

        this.state = {

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
            bagageData: []



        }

        this.getAccountDetails = this.getAccountDetails.bind(this);
        this.handleSearchArea = this.handleSearchArea.bind(this);
        this.filterData = this.filterData.bind(this);
        this.changCompanyName = this.changCompanyName.bind(this);
        this.changProductName = this.changProductName.bind(this);
        this.changCategory = this.changCategory.bind(this);
        this.changlength = this.changlength.bind(this);
        this.changproductDiscription = this.changproductDiscription.bind(this);
        this.changBagageID = this.changBagageID.bind(this);
        this.changeBagageType = this.changeBagageType.bind(this);
        this.changSerailNumber = this.changSerailNumber.bind(this);
        this.add = this.add.bind(this);
        this.formData = createRef();
        this.postAccountData = this.postAccountData.bind(this);
        this.editAccountBtn = this.editAccountBtn.bind(this);
        this.toProduct = this.toProduct.bind(this);
        this.changeFilePath = this.changeFilePath.bind(this);
        this.addBagageData = this.addBagageData.bind(this);
        this.generateBaggageNumber = this.generateBaggageNumber.bind(this);
        this.getallBaggage = this.getallBaggage.bind(this);
        this.getAllProducts = this.getAllProducts.bind(this);
        this.addBaggage = this.addBaggage.bind(this);
        this.cancelBaggage = this.cancelBaggage.bind(this);


    }

 

cancelBaggage(event,index){
   
    if(event){

        const url = `http://localhost:8000/api/bagage/delete/${event}`;

        axios.delete(url).then((res) => {
            

            const {baggageResData} = this.state;
            baggageResData.splice(index,1);
            this.setState({
                baggageResData
            })
            console.log("nnnnnnnn",index)
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

            //     const filepath = this.formData.current.fileType.value
            //     console.log("msggg", this.state.img)

            //     const formData = new FormData();
            //     formData.append("image", this.state.img[0]);
            //     // formData.append("upload_preset", "kutjdqwn");

            //     // axios.post("https://api.cloudinary.com/v1_1/colouration/image/upload", formData).then((res) => {
            //     //     console.log("img res", res);
            //     // })

            //     const url = 'http://localhost:8000/api/product/bagageImg/post';

            //     axios.post(url, formData).then((res) => {
            //         console.log("new res", res.data.result.url);
            //         if (res.data.result.url) {
            //             this.setState({
            //                 imgURL: res.data.result.url
            //             })
            //         }
            //     })

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

    changproductDiscription = (event) => {
        this.setState({
            productDiscription: event.target.value
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

        axios.post(url, data).then((res) => {
            console.log("response", res.data)
        })



    }

    toProduct() {

        this.props.history.push('/products');

    }

    editAccountBtn(id) {

        this.props.history.push(`/edit_Account/${id}`);

        console.log("inside edit", id)
    }




    addBaggage() {



        if (this.formData.current.productName.value && this.formData.current.BagageType.value && this.formData.current.SerailNumber.value &&
            this.state.selectedOptions.label) {


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


        const serialNumber = this.formData.current.SerailNumber.value;
        const type = this.formData.current.BagageType.value;


        const baggageData = {
            productName: this.formData.current.productName.value,
            type: this.formData.current.BagageType.value,
            status: "Y",
            bagageID: this.formData.current.BagageID.value,
            Img:
                this.state.img,
            serialNumber: this.formData.current.SerailNumber.value,
            accountID: this.state.selectedOptions.value,
            accountName: this.state.selectedOptions.label

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
                productName: this.formData.current.productName.value,
                type: type,
                status: "Y",
                bagageID: this.formData.current.BagageID.value,

                serialNumber: serialNumber,
                accountID: this.state.selectedOptions.value,
                accountName: this.state.selectedOptions.label
            };


            const url = 'http://localhost:8000/api/bagage/post';

            axios.post(url, baggageDatas).then((res) => {

                if (res.data) {

                    this.setState({ BagageID: '' }, () => {
                        this.generateBaggageNumber();
                    });

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
            const res = axios.post(url, formData);


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


                            productName: this.formData.current.productName.value,
                            type: type,
                            status: "Y",
                            bagageID: this.formData.current.BagageID.value,

                            serialNumber: serialNumber,
                            accountID: this.state.selectedOptions.value,
                            accountName: this.state.selectedOptions.label
                        };

                        this.setState({
                            CloudinaryImg: []
                        });

                        const url = 'http://localhost:8000/api/bagage/post';

                        axios.post(url, baggageDatas).then((res) => {

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
                status: obj.status


            })

        )

        if (!this.formData.current.category.value) {
            Swal.fire({

                icon: 'warning',
                title: 'Some Fields are empty',
                showConfirmButton: false,
                timer: 1500
            })
            return -1
        }

        const product = {

            productStatus: 'Y',
            productDiscription: this.formData.current.productDiscription.value,
            productDetails: this.formData.current.length.value,

            productCategory: this.formData.current.category.value,
            productName: this.formData.current.productName.value,
            accountID: this.state.selectedOptions.value,
            accountName: this.state.selectedOptions.label,
            bagageData: bagageData


        }

        const product_url = 'http://localhost:8000/api/product/post';

        axios.post(product_url, product).then((res) => {

            if (res.status == 200) {
                window.location.reload(false);

                this.setState({
                    productName: '',
                    category: '',
                    companyName: '',
                    length: '',
                    productDiscription: ''
                })
            }


        })





        console.log("product", product);
        // console.log("baggage", baggage);




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

        const companyAddress = this.formData.current.comAddressNum.value + "/" + this.formData.current.comAddressStreet.value + "/" + this.formData.current.comAddressCity.value;



        const newAccont = {

            HolderName: this.formData.current.holderName.value,
            HolPhonenumber: this.formData.current.phoneNumber.value,
            CompanyName: this.formData.current.companyName.value,
            CompanyEmailAddress: this.formData.current.companyEmailAddress.value,
            CompanyPhonenumber: this.formData.current.companyPhoneNumber.value,
            CompanyAddress: companyAddress
        }
        console.log("data", newAccont)

        if (this.formData.current.holderName.value && this.formData.current.phoneNumber.value && this.formData.current.companyName.value && this.formData.current.companyEmailAddress.value &&
            this.formData.current.companyPhoneNumber.value && this.formData.current.comAddressCity.value && this.formData.current.comAddressStreet.value && this.formData.current.comAddressNum.value) {



            if (!validator.isEmail(this.formData.current.companyEmailAddress.value)) {

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

        axios.get(url).then((res) => {

            if (res.data) {
                this.filterData(res.data.data, searchKey);
            }

        }
        )


    }

    getAllProducts() {

        const url = 'http://localhost:8000/api/product/get'

        axios.get(url).then((res) => {

            this.setState({
                allproducts: res.data.data
            }, () => {
                console.log("all products", this.state.allproducts);
            })
        })
    }


    getallBaggage() {

        const url = 'http://localhost:8000/api/product/get';

        axios.get(url).then((res) => {

            this.setState({
                allproducts: res.data.data
            }, () => {
                console.log("all baggage", this.state.allproducts);

                let bagageID = ' ';
                let serialNumber = '';

                const userAttributes = []
                this.state.allproducts.forEach(el => {
                    // el.bagageData.map(obj => {
                    //     bagageID = obj.bagageID,
                    //         serialNumber = obj.serialNumber
                    // }
                    // )

                    const data = el.productCategory == 'tvc' ? el.productDetails + " EP" : el.productDetails + " Min"
                    userAttributes.push({
                        companyname: el.accountName,
                        productname: el.productName,
                        detail: data,
                        Baggageid: el.productCategory,
                        produtStaus: <div style={{ "fontSize": "x-large", "writingMode": "vertical-lr" }}>{el.productStatus == 'N' ? <FcInspection /> : <FcOvertime />}</div>,
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
        })
    }



    getAccountDetails() {

        const url = 'http://localhost:8000/api/account/get';

        axios.get(url).then((res) => {

            this.setState({
                allAcounts: res.data.data
            }, () => {


                const dataArrey = [];
                this.state.allAcounts.forEach(obj => {
                    dataArrey.push({
                        value: obj._id, label: obj.CompanyName
                    })
                });

                console.log("...///", this.state.allAcounts)

                // const userAttributes = []
                // this.state.allBaggage.forEach(el => {
                //     userAttributes.push({
                //         companyname: this.state.allAcounts.CompanyName,
                //         productname: el.CompanyPhonenumber,
                //         Baggageid: el.bagageID,
                //         serialNumber: el.serialNumber,

                //         age: <FaEdit onClick={() => this.editAccountBtn(el._id)} />


                //     })
                // });


                this.setState({

                    options: dataArrey,
                    // data: {
                    //     columns: [
                    //         {
                    //             label: 'COMPANY NAME',
                    //             field: 'companyname',
                    //             sort: 'asc',
                    //             width: 200
                    //         },
                    //         {
                    //             label: 'PRODUCT NAME',
                    //             field: 'productname',
                    //             sort: 'asc',
                    //             width: 150
                    //         },
                    //         {
                    //             label: 'BAGGAGE ID',
                    //             field: 'Baggageid',
                    //             sort: 'asc',
                    //             width: 100,

                    //         },
                    //         {
                    //             label: 'SERIAL NUM',
                    //             field: 'serialNumber',
                    //             sort: 'asc',
                    //             width: 100
                    //         },
                    //         {
                    //             label: 'ACTION ',
                    //             field: 'age',
                    //             sort: 'asc',
                    //             width: 50
                    //         }
                    //     ],
                    //     rows: userAttributes
                    // }
                })

            })
        })
    }

    componentDidMount() {

        this.getAccountDetails();

        this.generateBaggageNumber();

        this.getAllProducts();

        this.getallBaggage();


    }



    render() {
        const { selectedOptions } = this.state;
        return (
            <div className='main-wrapper'>
                <div className='app-header'>
                    <Header />

                </div>
                <div className='app-body'>
                    <div className='body-wrapper'>
                        <div className='app-sidebar'>
                            <Sidebar />
                        </div>
                        <div className='app-content'>

                            <Row>

                                {/*product register */}
                                <div className={AccountCSS.container}>
                                    <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                        Add Product

                                    </div>

                                    <div style={{ "overflow": "auto", "height": "720px", "overflowX": "auto" }}>


                                        <div className={AccountCSS.form}>

                                            <Form onSubmit={this.addBagageData} ref={this.formData}>
                                                <Row>
                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Company Name</Form.Label>
                                                            <Select

                                                                value={selectedOptions}

                                                                options={this.state.options}
                                                                onChange={this.changCompanyName}


                                                            />

                                                            {/* <input list="data" aria-label="Default select example" value={this.state.holderName} name="holderName"
                                                           onChange={this.changHolderName}/>

                                                            <datalist id="data">
                                                            {
                                                                this.state.allAcounts.map((obj) => (

                                                                    <option value={obj.CompanyName}/>
                                                                ))

                                                            }


                                                            </datalist> */}

                                                            {/* <option>Open this select menu</option> */}

                                                            {this.state.countryError && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please select Country / Region. </p>}



                                                        </Form.Group>

                                                    </Col>

                                                    <Col>


                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Product Name</Form.Label>
                                                            <Form.Control type="text" value={this.state.productName} onChange={this.changProductName} name="productName" />



                                                        </Form.Group>




                                                    </Col>



                                                </Row>

                                                <Row>
                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Category</Form.Label>
                                                            <Form.Select value={this.state.category} onChange={this.changCategory} name="category" >
                                                                <option disabled></option>
                                                                <option value="Film">Film</option>
                                                                <option value={"musicvideo"}>Music Video</option>
                                                                <option value={"shortfilm"}>Short Film</option>
                                                                <option value={"tvc"}>TVC</option>
                                                                <option value={"tvSeries"}>TV Series</option>
                                                                <option value={"other"}>Other</option>

                                                            </Form.Select>

                                                        </Form.Group>

                                                    </Col>

                                                    <Col>


                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>length</Form.Label>
                                                            <Form.Control type="number" value={this.state.length} onChange={this.changlength} name="length" />


                                                        </Form.Group>




                                                    </Col>



                                                </Row>

                                                <Row>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Product Discription</Form.Label>
                                                        <Form.Control onChange={this.changproductDiscription} value={this.state.productDiscription} as="textarea" rows={2} name="productDiscription" />

                                                        {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}


                                                    </Form.Group>



                                                </Row>

                                                <Row>

                                                    {/* 
                                                    {this.state.allselectedBaggage.map(obj =>

                                                        <Row><div>{obj.serialNumber}</div></Row>


                                                    )} */}

                                                    {/* 
                                                <div className="slide-container">
                                                    <Slide>
                                                        {slideImages.map((slideImage, index) => (
                                                            <div className="each-slide" key={index}>
                                                                <div style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                                                                    <span>{slideImage.caption}</span>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </Slide>
                                                </div> */}


                                                </Row>









                                                <div style={{ "marginLeft": "-20px", "marginTop": "15px", "marginBottom": "25px", "fontSize": "20px" }}>
                                                    Baggage Details

                                                </div>



                                                <Row>
                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Baggage ID</Form.Label>
                                                            <Form.Control type="text" value={this.state.BagageID} onChange={this.changBagageID} name="BagageID" />

                                                        </Form.Group>
                                                    </Col>
                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Product Name</Form.Label>
                                                            <Form.Control type="text" value={this.state.productName} name="productNames" />

                                                        </Form.Group>
                                                    </Col>
                                                </Row>


                                                <Row>

                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Types</Form.Label>
                                                            <Form.Select type="text" value={this.state.BagageType} onChange={this.changeBagageType} name="BagageType" >

                                                                <option disabled></option>
                                                                <option value="Harddrive">Hard Drive</option>
                                                                <option value={"pen"}>Pen</option>

                                                                <option value={"other"}>Other</option>



                                                            </Form.Select>

                                                        </Form.Group>

                                                    </Col>

                                                    <Col>

                                                        <Form.Group className="mb-3" controlId="formBasicEmail">
                                                            <Form.Label>Serial Number</Form.Label>
                                                            <Form.Control type="text" value={this.state.SerailNumber} onChange={this.changSerailNumber} name="SerailNumber" />
                                                            {!this.state.type && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}

                                                        </Form.Group>

                                                    </Col>


                                                </Row>

                                                <Row>
                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Select The File</Form.Label>
                                                        <Form.Control type="file" onChange={(event) => { this.changeFilePath(event) }} name="fileType" />

                                                    </Form.Group>

                                                </Row>

                                                <Row>

                                                    {/* <Image cloudName="colouration" publicId={this.state.imgURL} /> */}

                                                    {this.state.img.map(obj =>

                                                        <Row><div><span style={{ "marginRight": "10px", "fontSize": "x-large" }}><FcPicture /></span>{obj[0].name}</div></Row>


                                                    )}

                                                </Row>






                                                <Row>

                                                    <Col>


                                                        <Button variant="primary" disabled={this.state.addButton} onClick={this.addBaggage} style={{ "marginTop": "20px", "float": "left", "width": "80px" }}>
                                                            Add
                                                        </Button>
                                                    </Col>

                                                    <Col>



                                                    </Col>

                                                    <Col></Col>
                                                    <Col></Col>
                                                    <Col></Col>
                                                    <Col>

                                                        <Button variant="primary" disabled={this.state.submitButton} type="submit" style={{ "marginTop": "20px" }}>
                                                            Submit
                                                        </Button>
                                                    </Col>
                                                </Row>



                                            </Form>



                                        </div>

                                    </div>
                                </div>

                                {/* all account display */}
                                <div className={AccountCSS.containertwo}>
                                    <Row>
                                        <Col>

                                            <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                Bagage Details

                                            </div>
                                        </Col>
                                        {/* <Col>
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search"
                                                name="searchQuery"
                                                onChange={this.handleSearchArea}
                                                style={{
                                                    width: "180px",

                                                    marginRight: "2px",
                                                    marginTop: "20px",
                                                    height: "30px",

                                                    borderColor: "rgba(6, 21, 117,0.5)",
                                                    float: "right"
                                                }}
                                            ></input>

                                        </Col> */}

                                    </Row>

                                    {

                                        this.state.baggageResData.length != 0 ? <div style={{ "overflow": "auto", "height": "720px", "overflowX": "auto" }}>

                                            {this.state.baggageResData &&

                                                this.state.baggageResData.map((obj,index) =>

                                                    <div class="card mb-3" style={{ "max-width": "790px", "paddingBottom": "10px" }}>
                                                        <div class="row g-1">
                                                            <div class="col-md-8">
                                                                <div style={{ "overflow": "auto", "height": "320px", "overflowX": "auto" }}>


                                                                    {obj.CloudinaryImg.length == 0 ? <img src={logo} class="img-fluid rounded-start" alt="..." style={{ "height": "320px" }} /> : obj.CloudinaryImg.map(Object =>
                                                                        <img src={Object.url} class="img-fluid rounded-start" alt="..." style={{ "paddingBottom": "10px" }} />
                                                                    )}
                                                                </div>

                                                            </div>
                                                            <div class="col-md-4">
                                                                <div class="card-body">
                                                                    <h5 class="card-title">Baggage Data</h5>
                                                                    <p class="card-text">Serial Number : {obj.serialNumber}</p>
                                                                    <p class="card-text">Baggage ID : {obj.bagageID}</p>
                                                                    <p class="card-text">Product Name : {obj.productName}</p>
                                                                    <p class="card-text">Account Name : {obj.accountName}</p>
                                                                    <Button variant="primary"  type="submits" style={{ "marginTop": "20px" ,"width":"80px","fontSize":"smaller"}} onClick={() => this.cancelBaggage(obj._id,index)}>
                                                                       Cancel
                                                                    </Button>
                                                                    {/* <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p> */}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                )


                                            }
                                        </div> : <div style={{ "height": "720px" }}><span style={{ "marginLeft": "350px" }}>NO BAGGAGE SELECT<div style={{ "marginLeft": "420px" }}><BsWallet2 /></div></span></div>

                                    }

                                </div>

                            </Row>

                            <Row>
                                <div style={{ "paddingBottom": "20px" }}>

                                </div>
                            </Row>

                            <Row>

                                <div className={AccountCSS.container3} >

                                    <Row>
                                        <Col>

                                            <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                All Products

                                            </div>
                                        </Col>
                                        {/* <Col>
                                            <input
                                                className="form-control"
                                                type="search"
                                                placeholder="Search"
                                                name="searchQuery"
                                                onChange={this.handleSearchArea}
                                                style={{
                                                    width: "180px",

                                                    marginRight: "2px",
                                                    marginTop: "20px",
                                                    height: "30px",

                                                    borderColor: "rgba(6, 21, 117,0.5)",
                                                    float: "right"
                                                }}
                                            ></input>

                                        </Col> */}

                                    </Row>


                                    <MDBDataTable


                                        style={{ "whitespace": "nowrap", }}
                                        scrollY
                                        maxHeight="500px"
                                        loading={false}
                                        hover
                                        bordered
                                        word-wrap="breakword"

                                        whitespace="nowrap"
                                        textoverflow="ellipsis"

                                        data={this.state.data}
                                        className={AccountCSS.yourcustomstyles}
                                    />

                                </div>

                            </Row>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddProduct;
;