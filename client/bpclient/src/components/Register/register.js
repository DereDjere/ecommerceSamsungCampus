import React, { Component } from 'react'
import { Form, Button, Container, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router';
import axios from 'axios'
import './style.css';

const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { val.length > 0 && (valid = false) });

    return valid;
}

export default class register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            email: null,
            password: null,
            success: null,
            formErrors: {
                username: "",
                email: "",
                password: "",

            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit = e => {
        e.preventDefault();

        if (formValid(this.state.formErrors)) {
            console.log(`
        ${this.state.username}
        ${this.state.email}
        ${this.state.password}
        `);
            let array = {
                username: this.state.username,
                email: this.state.email,
                password: this.state.password,
            }
            axios.post(`http://localhost:8000/api/register`, array, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }
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
        }
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
    render() {
        const { formErrors } = this.state
        const { success } = this.state
        return (
            <Container className="centrer" fluid >
                <Form className="forme">
                    <Form.Label className="text-center"><h4>CREATE AN ACCOUNT</h4></Form.Label>
                </Form>
                <br />
                <Alert variant="success" show={success}>
                    You Are Registered !
                    <Redirect push to="/login" />
                </Alert>
                <Alert variant="danger" show={success == false ? true : false}>
                    Email Or Username Already Taken !
                </Alert>
                <Form className="form" onSubmit={this.handleSubmit}>

                    <Form.Group>
                        <Form.Control className="taille" type="text" name="username" placeholder="Username" onChange={this.handleChange} required />
                        {formErrors.username.length > 0 && (
                            <span class="text-danger">{formErrors.username}</span>
                        )}
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">

                        <Form.Control className="taille" type="email" name="email" placeholder="Email" pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[A-z]{2,}" onChange={this.handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control className="taille" type="password" name="password" placeholder="Password" onChange={this.handleChange} required />
                        {formErrors.password.length > 0 && (
                            <span class="text-danger">{formErrors.password}</span>
                        )}
                    </Form.Group>
                    <br />
                    <Button block className="btncreate" variant="" type="submit">
                        SIGN UP
                    </Button>
                </Form>
                    <Button href="/registerart" block className="buttonart" variant="" type="submit" size="sm">I'M AN ARTIST</Button>
            </Container>

        )
    }
}

