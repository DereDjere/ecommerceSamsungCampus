import React, { Component } from 'react'
import { Form, Button, Container, Alert, Card, ListGroup, Row, Col } from 'react-bootstrap'
import { Redirect } from 'react-router';
import axios from 'axios'
import './style.css';
import Navbaree from '../../Home/Navbar';
import BarreHome from '../barreHome';
import Footer from './../../footer/footer';

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { val.length > 0 && (valid = false) });

    return valid;
}

export default class profileupdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            remember_token: null,
            success: null,
            formErrors: {
                email: "",
                remember_token: "",

            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = e => {
        e.preventDefault();
        const id = window.location.pathname.substring(9);
        this.setState({ articleID: id })
        console.log(id)
        var token = localStorage.getItem('token')
        if (formValid(this.state.formErrors)) {
            console.log(`
        ${this.state.email}
        `);
            let array = {
                email: this.state.email,
                token: token,


            }
            axios.post(`http://localhost:8000/api/userupdate`, array
            ).then((data) => {
                console.log(data);
                if (data.status === 201) {
                    this.setState({ success: true })

                } else if (data.status === 200) {
                    this.setState({ success: false })
                }

            })
        } else {
            console.log(this.state.formErrors)
            return 'probleme'
        }
    }
    handleChange = e => {
        e.preventDefault()
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        console.log(value)
        switch (name) {
            case 'email':
                formErrors.email = value.length < 5 || value.length > 20 ? '5-20 Characters for Username please'
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
                    <Form.Label className="text-center"><h4>Edit your Email  </h4></Form.Label>
                </Form>
                <br />
                <Alert variant="success" show={success}>

                    <Redirect push to="profile/update" />
                </Alert>
                <Alert variant="success" show={success == false ? true : false}>
                    Your profile has been Updated
                </Alert>
                <Form className="form" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicEmail">

                        <Form.Control className="taille" type="email" name="email" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[A-z]{2,}" onChange={this.handleChange} required />
                    </Form.Group>

                    <br />
                    <Button block className="btncreate" variant="" type="submit">
                        Update
                    </Button>
                    <Button block  variant="danger" type="submit" href="login">
                        Cancel
                    </Button>
                </Form>
                {/* 
                <Card className="text-center">
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <Row>
                                <Col xs="10">
                                    <div className="left">
                                        <div className="bold">Username :</div>
                                        <br />
                                        <div>{this.state.username}Zakariya </div>
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="right">

                                        <Button variant="info"  > Edit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item >
                        <Row>
                                <Col xs="10">
                                    <div className="left">
                                        <div className="bold">Email :</div>
                                        <br />
                                        <div>zak@zak.fr </div>
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="right">

                                        <Button variant="info" > Edit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item >
                        <Row>
                                <Col xs="10">
                                    <div className="left">
                                        <div className="bold">Password :</div>
                                        <br />
                                        <div>•••••••</div>
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="right">

                                        <Button variant="info" > Edit</Button>
                                    </div>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    </ListGroup>
                </Card> */}

                <br />
                <br /><br />
                <br /><br />
                <Footer />
            </Container>

        )
    }








}