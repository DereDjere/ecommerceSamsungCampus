import React, { Component } from 'react'
import { Form, Button, Container, Card, ListGroup, Row, Col, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router';
import axios from 'axios'
import './style.css';
import Emailupdate from '../email/emailupdate';
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
            lastname: null,
            remember_token: null,
            success: null,
            formErrors: {
                lastname: "",
                email: "",
                password: "",
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
        ${this.state.lastname}

        `);
            let array = {
                lastname: this.state.lastname,
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
            case 'lastname':
                formErrors.lastname = value.length < 5 || value.length > 20 ? '5-20 Characters for lastname please'
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
    handleAziz = e => {
        window.location.assign('./emailupdate')
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
                    <Form.Label className="text-center"><h4>Edit Your Lastname </h4></Form.Label>
                </Form>
                <br />
                <Alert variant="success" show={success}>

                    <Redirect push to="profile/update" />
                </Alert>
                <Alert variant="success" show={success == false ? true : false}>
                    Your profile has been Updated
                </Alert>
                <Form className="form" onSubmit={this.handleSubmit}>

                    <Form.Group>
                        <Form.Control className="taille" type="text" name="lastname" placeholder="lastname" onChange={this.handleChange} />
                        {formErrors.lastname.length > 0 && (
                            <span class="text-danger">{formErrors.lastname}</span>
                        )}
                    </Form.Group>

                    <br />
                    <Button block className="btncreate" variant="" type="submit">
                        Update
                    </Button>
                    <Button block variant="danger" type="submit" href="login">
                        Cancel
                    </Button>
                </Form>

                {/* <Card className="text-center">
                    <ListGroup variant="flush">
                        <ListGroup.Item >
                            <Row>
                                <Col xs="10">
                                    <div className="left">
                                        <div className="bold">lastname :</div>
                                        <br />
                                        <div>{this.state.lastname}Zakariya </div>
                                    </div>
                                </Col>
                                <Col xs="2">
                                    <div className="right">
                                        <Emailupdate />
                                        <Button variant="info" onClick={this.handleAziz} > Edit</Button>
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