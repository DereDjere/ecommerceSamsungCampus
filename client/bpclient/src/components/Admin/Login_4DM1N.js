import React, { Component } from 'react'
import { Form, Button, Container, FormGroup, Row, Alert } from 'react-bootstrap'
import '../Login/style.css';
import axios from 'axios';


const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { val.length > 0 && (valid = false) });

    return valid;
}

export default class login extends Component {
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
            axios.post(`http://localhost:8000/api/connection`, array, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }
            ).then((data) => {
                console.log(data.data)
                if (data.status == 200) {
                    this.setState({ success: true })
                    localStorage.removeItem('tokenAdmin');
                    localStorage.removeItem('token');
                    localStorage.removeItem('products');
                    localStorage.removeItem('tokenArtist');
                    localStorage.removeItem('email');

                
                    localStorage.setItem('tokenAdmin', JSON.stringify(data.data))
                    window.location.href = ('/admin/create')
                }
            }).catch((error) => {
                this.setState({ success: false })
                console.log(error)
            })
        } else {
            console.log(this.state.formErrors)
        }
    }
    handleChange = e => {
        e.preventDefault()
        const { name, value } = e.target;
        let formErrors = this.state.formErrors;
        console.log(value)
        switch (name) {
            case 'password':
                formErrors.password = value.length < 3 ? 'Minimum 3 Characters for password'
                    : "";
                break;
            default:
                break;
        }
        this.setState({ formErrors, [name]: value }, () => console.log(this.state))
    }
    handleLogout = e => {
        localStorage.removeItem('tokenAdmin')
        window.location.reload()
    }
    render() {
        const { formErrors } = this.state
        const { success } = this.state
        var token = localStorage.getItem('tokenAdmin')
        console.log(token)
        if (token) {
            return (
                <Container>
                    <Button block onClick={this.handleLogout} variant="primary" className="mt-2">Logout</Button>
                </Container>
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
                        <Form className="col-12 float-left" onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Form.Text className="titre">
                                    CONNECT 4DM1N
                    </Form.Text>
                            </FormGroup>
                            <Form.Group>
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
                            <Button className="col-4 buttonco" variant="primary" type="submit" size="sm" >CONNECT</Button>
                        </Form>
                    </Row>
                </Container>
            )
        }
    }
}
