import React, { createRef, Component } from 'react';
import Header from '../header/header';
import Sidebar from '../sidebar/Sidebar';
import AccountCSS from './account.module.css';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import axios from 'axios';
import { FaEdit } from "react-icons/fa";
import ScrollableFeed from 'react-scrollable-feed';
import validator from 'validator'
import TableScrollbar from 'react-table-scrollbar';
import { MDBDataTable } from 'mdbreact';


class createAccount extends Component {

    constructor(props) {

        super(props)

        this.state = {

            allAcounts: [],
            holderName: '',
            phoneNumber: '',
            companyName: '',
            companyEmailAddress: '',
            companyPhoneNumber: '',
            comAddressCity: '',
            comAddressStreet: '',
            comAddressNum: '',
            type: true,
            holdertype: true,
            data: []


        }

        this.getAccountDetails = this.getAccountDetails.bind(this);
        this.handleSearchArea = this.handleSearchArea.bind(this);
        this.filterData = this.filterData.bind(this);
        this.changCompanyName = this.changCompanyName.bind(this);
        this.changHolderName = this.changHolderName.bind(this);
        this.changPhonenumber = this.changPhonenumber.bind(this);
        this.changcomAddressCity = this.changcomAddressCity.bind(this);
        this.changcomAddressNum = this.changcomAddressNum.bind(this);
        this.changcompanyPhoneNumber = this.changcompanyPhoneNumber.bind(this);
        this.changeCompanyEmailAddress = this.changeCompanyEmailAddress.bind(this);
        this.changcomAddressStreet = this.changcomAddressStreet.bind(this);
        this.add = this.add.bind(this);
        this.formData = createRef();
        this.postAccountData = this.postAccountData.bind(this);
        this.editAccountBtn = this.editAccountBtn.bind(this);

    }

    changCompanyName = (event) => {
        this.setState({
            companyName: event.target.value
        });
    }

    changHolderName = (event) => {
        this.setState({
            holderName: event.target.value
        });
    }

    changPhonenumber = (event) => {
        this.setState({
            holdertype: true
        })

        const pNumber = event.target.value;
        if (!pNumber.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
            this.setState({
                holdertype: false
            })
        }
        this.setState({
            phoneNumber: event.target.value
        });
    }

    changcomAddressCity = (event) => {
        this.setState({
            comAddressCity: event.target.value
        });
    }

    changcomAddressNum = (event) => {
        this.setState({
            comAddressNum: event.target.value
        });
    }

    changcomAddressStreet = (event) => {
        this.setState({
            comAddressStreet: event.target.value
        });
    }

    changcompanyPhoneNumber = (event) => {

        this.setState({
            type: true
        })

        const pNumber = event.target.value;
        if (!pNumber.toString().match(/^[0-9]+(\.?[0-9]+)?$/)) {
            this.setState({
                type: false
            })
        }
        this.setState({
            companyPhoneNumber: event.target.value
        });
    }

    changeCompanyEmailAddress = (event) => {


        this.setState({
            companyEmailAddress: event.target.value
        });
    }

    postAccountData(data) {

        const url = 'http://localhost:8000/api/account/post';

        axios.post(url, data).then((res) => {
            console.log("response", res.data)
        })



    }

    editAccountBtn(id) {

        this.props.history.push(`/edit_Account/${id}`);
       
        console.log("inside edit",id)
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


    getAccountDetails() {

        const url = 'http://localhost:8000/api/account/get';

        axios.get(url).then((res) => {

            this.setState({
                allAcounts: res.data.data
            }, () => {

                console.log("...///", this.state.allAcounts)

                const userAttributes = []
                this.state.allAcounts.forEach(el => {
                    userAttributes.push({
                        name: el.CompanyName,
                        position: el.CompanyPhonenumber,
                        office: el.CompanyEmailAddress,
                        age: <FaEdit onClick={()=> this.editAccountBtn(el._id)} />


                    })
                });


                this.setState({
                    data: {
                        columns: [
                            {
                                label: 'COMPANY NAME',
                                field: 'name',
                                sort: 'asc',
                                width: 200
                            },
                            {
                                label: 'PHONE NUMBER',
                                field: 'position',
                                sort: 'asc',
                                width: 150
                            },
                            {
                                label: 'EMAIL',
                                field: 'office',
                                sort: 'asc',
                                width: 150,
                               
                            },
                            {
                                label: 'ACTIONS',
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

    componentDidMount() {

        this.getAccountDetails();



    }



    render() {
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

                                {/*account register */}
                                <div className={AccountCSS.container}>
                                    <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                        Add Account Details

                                    </div>

                                    <div className={AccountCSS.form}>

                                        <Form onSubmit={this.add} ref={this.formData}>
                                            <Row>
                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Account Holder Name</Form.Label>
                                                        <Form.Control type="text" value={this.state.holderName} onChange={this.changHolderName} name="holderName" />

                                                    </Form.Group>

                                                </Col>

                                                <Col>


                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Phone Number</Form.Label>
                                                        <Form.Control type="text" value={this.state.phoneNumber} onChange={this.changPhonenumber} name="phoneNumber" />
                                                        {!this.state.holdertype && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}


                                                    </Form.Group>




                                                </Col>



                                            </Row>

                                            <Row>

                                                <div style={{ "marginLeft": "0px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                    Company Details

                                                </div>

                                            </Row>


                                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                                <Form.Label>Company Name</Form.Label>
                                                <Form.Control type="text" value={this.state.companyName} onChange={this.changCompanyName} name="companyName" />

                                            </Form.Group>

                                            <Row>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Company Email Address</Form.Label>
                                                        <Form.Control type="text" value={this.state.companyEmailAddress} onChange={this.changeCompanyEmailAddress} name="companyEmailAddress" />

                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Company Phone Number</Form.Label>
                                                        <Form.Control type="text" value={this.state.companyPhoneNumber} onChange={this.changcompanyPhoneNumber} name="companyPhoneNumber" />
                                                        {!this.state.type && <p style={{ "color": "#fe0017", "font-size": "small" }}>Please enter only numbers. </p>}

                                                    </Form.Group>

                                                </Col>


                                            </Row>







                                            <Row>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Address Number</Form.Label>
                                                        <Form.Control type="text" value={this.state.comAddressNum} onChange={this.changcomAddressNum} name="comAddressNum" />

                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>Street</Form.Label>
                                                        <Form.Control type="text" value={this.state.comAddressStreet} onChange={this.changcomAddressStreet} name="comAddressStreet" />

                                                    </Form.Group>

                                                </Col>

                                                <Col>

                                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                                        <Form.Label>City</Form.Label>
                                                        <Form.Control type="text" value={this.state.comAddressCity} onChange={this.changcomAddressCity} name="comAddressCity" />

                                                    </Form.Group>

                                                </Col>


                                            </Row>

                                            <Row>

                                                <Col>


                                                    <Button variant="primary" type="submit" style={{ "marginTop": "20px" }}>
                                                        Submit
                                                    </Button>

                                                </Col>

                                                <Col>


                                                    <Button variant="primary" type="submit" style={{ "marginTop": "20px", "float": "left" }}>
                                                        Product
                                                    </Button>


                                                </Col>

                                                <Col></Col>
                                                <Col></Col>
                                                <Col></Col>
                                                <Col></Col>
                                            </Row>



                                        </Form>



                                    </div>


                                </div>

                                {/* all account display */}
                                <div className={AccountCSS.containertwo}>
                                    <Row>
                                        <Col>

                                            <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                                All Accounts

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


                                        scrollY
                                        maxHeight="500px"
                                        loading={false}
                                        hover
                                        bordered
                                       


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

export default createAccount;