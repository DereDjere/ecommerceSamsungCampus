import React, { Component } from 'react'
import { Form, Button, Container, FormGroup, Row, Alert } from 'react-bootstrap'
import './style.css';
import axios from 'axios';
import PrepayementUsers from './../PrePayement/PrepayementUsers';


const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { val.length > 0 && (valid = false) });

    return valid;
}

export default class loginguest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: null,
            password: null,
            success: null,
            formErrors: {
                email: "",
                password: "",

            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = e => {
        e.preventDefault()
        if (formValid(this.state.formErrors)) {
            console.log(`
        ${this.state.email}
        ${this.state.password}
        `);
            let array = {
                email: this.state.email,
                password: this.state.password,
            }

            axios.post(`http://localhost:8000/login`, array, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }
            ).then((data) => {
                if (data.data !== '') {
                    this.setState({ success: true })
                    localStorage.removeItem('token');
                    localStorage.setItem('token', JSON.stringify(data.data))
                    window.location.href = '/prepayement/info'
                } else {
                    this.setState({ success: false })

                }
            }).catch((error) => {
                this.setState({ success: false })
                console.log(error)

            })
        } else {
            this.setState({ success: false })

            console.log(this.state.formErrors)
            window.location.reload()

            // alert('email ou mo')
            // window.location.reload()
        }
    }
    handleChange = e => {
        e.preventDefault()
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        console.log(value)
        switch (name) {
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
    render() {
        const { formErrors } = this.state
        const { success } = this.state
        var token = localStorage.getItem('token')
        console.log(token)

        if (token) {

            return (
                <PrepayementUsers />
               
            )
        } else {
            return (
                <Container>
                    <Alert variant="success" show={success}>
                        You Are Login !
                </Alert>
                    <Alert variant="danger" show={success == false ? true : false}>
                        Error With Email Or Password !
                </Alert>
                    <Row>
                        <Form className="col-6 float-left" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Form.Text className="titre">
                                    SIGN IN
                    </Form.Text>
                            </FormGroup>
                            <Form.Group>
                                <Form.Text className="text-muted">
                                    YOU ALREADY HAVE AN ACCOUNT
                    </Form.Text>
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="E-mail address" name="email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[A-z]{2,}" onChange={this.handleChange} required />
                            </Form.Group>
                            <Form.Group controlId="formBasicPassword">
                                <Form.Control type="password" placeholder="Password" name="password" onChange={this.handleChange} required />
                                {formErrors.password.length > 0 && (
                                    <span class="text-danger">{formErrors.password}</span>
                                )}
                            </Form.Group>
                            <Button className="col-4 buttonco" type="submit" size="sm" >CONNECT</Button>
                            {/* <Button className="col-4 buttonart" variant="primary" type="submit" size="sm">I'M AN ARTIST</Button> */}
                        </Form>
                        <Form className="col-6 float-right">
                            <br />
                            <br></br>
                            <Button block href="/register" className="buttonsi" variant="primary" type="submit">
                                CREATE AN ACCOUNT
                </Button>
                            <br />
                            <h3 style={
                                {
                                    textAlign : 'center',
                                }
                            }>OR</h3>
                            <br></br>
                            <Button href="/prepayement/info" block className="buttonart" variant="" type="submit" size="sm">Continue as a guest</Button>
                        </Form>
                    </Row>
                </Container>
            )
        }
    }
}
