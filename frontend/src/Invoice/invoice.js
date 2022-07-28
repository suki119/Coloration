import React, { createRef, Component } from 'react';
import Header from '../Component/header/header';
import Sidebar from '../Component/sidebar/Sidebar';
import AccountCSS from './account.module.css';
import { Form, Button, Table, Row, Col, Container } from "react-bootstrap";
import axios, { Axios } from 'axios';
import { FaEdit } from "react-icons/fa";
import ScrollableFeed from 'react-scrollable-feed';
import validator from 'validator'
import TableScrollbar from 'react-table-scrollbar';
import { MDBDataTable } from 'mdbreact';
import { Image } from 'cloudinary-react';


class invoice extends Component {

    constructor(props) {

        super(props)

        this.state = {



        }


    }






    render() {
        return (
            <div>
                <div className='main-wrapper'>

                    <div className='app-header'>
                        <Header />

                    </div>

                    <div className='app-body'>

                        <div className="body-wrapper">

                            <div className='app-sidebar'>
                                <Sidebar />
                            </div>

                            <div className='app-content'>

                                <div style={{ "marginLeft": "60px", "marginTop": "20px" }} className="container.fluid p-3 my-3 bg-secondary text-gradient bg-opacity-50 fw-bold">

                                    <div style={{ "marginLeft": "20px", "marginTop": "20px", "marginBottom": "40px", "fontSize": "20px" }}>
                                        Add Product

                                    </div>

                                    <div className={AccountCSS.form}>

                                        <Form>
                                            <Row>
                                                <Col xs={7}>
                                                    <Form.Control placeholder="City" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="State" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="Zip" />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={7}>
                                                    <Form.Control placeholder="City" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="State" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="Zip" />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={7}>
                                                    <Form.Control placeholder="City" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="State" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="Zip" />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={7}>
                                                    <Form.Control placeholder="City" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="State" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="Zip" />
                                                </Col>
                                            </Row>

                                            <Row>
                                                <Col xs={7}>
                                                    <Form.Control placeholder="City" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="State" />
                                                </Col>
                                                <Col>
                                                    <Form.Control placeholder="Zip" />
                                                </Col>
                                            </Row>
                                        </Form>
                                    </div>

                                </div>

                            </div>


                        </div>


                    </div>




                </div>


            </div>
        );
    }
}

export default invoice;
