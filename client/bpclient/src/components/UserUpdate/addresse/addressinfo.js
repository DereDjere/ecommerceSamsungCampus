import React, { Component } from 'react'
import { Form, Button, Container, Card, ListGroup, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router';
import axios from 'axios'
import './style.css';
// import Emailupdate from './email/emailupdate.js';
import Navbaree from '../../Home/Navbar';
import BarreHome from '../barreHome';
import Footer from '../../footer/footer';

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { val.length > 0 && (valid = false) });

    return valid;
}

export default class profileupdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            address: null,
            city: null,
            cp: null,
            country: null,
            remember_token: null,
            success: null,
            formErrors: {
                username: "",
                email: "",
                password: "",
                remember_token: "",

            },
            userData: []
        }
    }

    componentDidMount() {
        var token = localStorage.getItem('token');
        fetch("http://127.0.0.1:8000/api/showuser", {
            method: "POST",
            body: JSON.stringify({
                "token": token
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                this.setState({ userData: response })
                console.log(response);
            })
    }

    handleChange = e => {
        e.preventDefault()
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        console.log(value)
        switch (name) {
            case 'username':
                formErrors.username = value.length < 5 || value.length > 20 ? '5-20 Characters for Username please'
                    : "";
                break;
            case 'password':
                formErrors.password = value.length < 8 ? 'Minimum 8 Characters for password'
                    : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state))
    }
    handleLogout = e => {
        localStorage.removeItem('token')
        window.location.reload()
    }
    handleadressupdate = e => {
        window.location.assign('./addressupdate')
    }
    handlecityupdate = e => {
        window.location.assign('./cityupdate')
    }
    handlecpupdate = e => {
        window.location.assign('./cpupdate')
    }
    handlecountryupdate = e => {
        window.location.assign('./countryupdate')
    }
    render() {
        const { formErrors } = this.state
        const { success } = this.state

        return (
            <Container className="centrer" fluid >
                <Navbaree />
                <BarreHome />
                <br />
                <br />
                <Form className="forme">
                    <Form.Label className="text-center"><h4>My Address  </h4></Form.Label>
                </Form>
                {/* <br />
                    <Alert variant="success" show={success}>
                        
                    <Redirect push to="profile/update" />
                    </Alert>
                    <Alert variant="success" show={success == false ? true : false}>
                    Your profile has been Updated
                </Alert>
                    <Form className="form" onSubmit={this.handleSubmit}>

                        <Form.Group>
                            <Form.Control className="taille" type="text" name="username" placeholder="Username" onChange={this.handleChange}  />
                            {formErrors.username.length > 0 && (
                                <span class="text-danger">{formErrors.username}</span>
                            )}
                        </Form.Group>
                        <Form.Group controlId="formBasicEmail">

                            <Form.Control className="taille" type="email" name="email" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[A-z]{2,}" onChange={this.handleChange} required />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Control className="taille" type="password" name="password" placeholder="Password" onChange={this.handleChange}  />
                            {formErrors.password.length > 0 && (
                                <span class="text-danger">{formErrors.password}</span>
                            )}
                        </Form.Group>
                        <br />
                        <Button block className="btncreate" variant="" type="submit">
                            Send
                    </Button>
                    <Button onClick={() => window.print()}>PRINT
                    </Button>
                    </Form> */}

                <Card className="text-center">
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <Row>
                                <Col xs="10">
                                    <div className="left">
                                        <div className="bold">{this.state.userData.address}</div>
                                        <br />
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="right">
                                        {/* <Emailupdate /> */}
                                        <Button variant="info" onClick={this.handleadressupdate} > Edit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>


                        <ListGroup.Item >
                            <Row>
                                <Col xs="10">
                                    <div className="left">
                                        <div className="bold">{this.state.userData.city}</div>
                                        <br />
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="right">
                                        {/* <Emailupdate /> */}
                                        <Button variant="info" onClick={this.handlecityupdate} > Edit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>



                        <ListGroup.Item >
                            <Row>
                                <Col xs="10">
                                    <div className="left">
                                        <div className="bold">{this.state.userData.cp}</div>
                                        <br />
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="right">
                                        {/* <Emailupdate /> */}
                                        <Button variant="info" onClick={this.handlecpupdate} > Edit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>


                        <ListGroup.Item >
                            <Row>
                                <Col xs="10">
                                    <div className="left">
                                        <div className="bold">{this.state.userData.country}</div>
                                        <br />
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="right">
                                        {/* <Emailupdate /> */}
                                        <Button variant="info" onClick={this.handlecountryupdate} > Edit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>


                    </ListGroup>
                </Card>
                <br />
                <br /><br />
                <br /><br />
                <Footer />
            </Container>

        )
    }








}