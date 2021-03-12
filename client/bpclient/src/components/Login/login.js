import React, { Component } from 'react'
import { Form, Button, Container, FormGroup, Row, Alert, Jumbotron, } from 'react-bootstrap'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login'
import './style.css';
import axios from 'axios'
import Profileupdate from '../UserUpdate/profileupdate';


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

            },
            SocialsToken: null,
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
                if (data.data !== 'invalid') {
                    this.setState({ success: true })
                    localStorage.removeItem('token');
                    localStorage.removeItem('tokenAdmin');
                    localStorage.removeItem('tokenArtist');
                    localStorage.setItem('email', JSON.stringify(this.state.email))

                    if (Object.keys(data.data) == 'artist') {
                        localStorage.setItem('tokenArtist', JSON.stringify(data.data.artist))
                        /* window.location.href = '/' */
                    } else if (Object.keys(data.data) == 'user') {
                        localStorage.setItem('token', JSON.stringify(data.data.user))
                        
                    }

                    window.location.href = '/'
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
        this.setState({ SocialsToken: null })
        localStorage.removeItem('token')
        localStorage.removeItem('tokenArtist')
        localStorage.removeItem('tokenAdmin')
        localStorage.removeItem('tokenSocials')
        localStorage.removeItem('email');
        window.location.reload()
    }
    ResponseFB = (response) => {
        // console.log(response)
        // const Token = response.accessToken
        // localStorage.setItem('token', Token)
        var email = response.email
        var name = response.name
        var id = response.id + 'FB'
        var data = {

            email,
            name,
            id
        }
        console.log(data)
        axios.post('http://localhost:8000/login/socials', data).then((response => {
            if (response.data.email == "The email has already been taken.") {
                this.setState({ success: false })
            } else {
                console.log(response.data)
                // alert(response.data)

                const Token = response.data
                localStorage.setItem('email', data.email)
                localStorage.setItem('token', Token)
                this.setState({ success: true})
                window.location.href = '/'
            }
        }))

    }

    ResponseG = (response) => {
        console.log(response.profileObj)
        // const Token = response.accessToken
        // localStorage.setItem('token', Token)

        var email = response.profileObj.email
        var name = response.profileObj.name
        var id = response.profileObj.googleId + 'G'

        var data = {

            email,
            name,
            id
        }
        console.log(data)
        axios.post('http://localhost:8000/login/socials', data).then((response => {
            
            if (response.data.email == "The email has already been taken.") {
                this.setState({ success: false })
            }else {

                const Token = response.data
                localStorage.setItem('email', data.email)
                localStorage.setItem('token', Token)
                this.setState({ success: true})
                window.location.href = '/'
                
            }
        }))

    }
    render() {
        const { formErrors } = this.state
        const { success } = this.state
        /* const Response = (response) => {
            console.log(response.accessToken);
            const Token = response.accessToken
            localStorage.setItem('token', Token);
        } */

        var token = localStorage.getItem('token')
        var tokenSocials = localStorage.getItem('tokenSocials')
        var tokenArtist = localStorage.getItem('tokenArtist')

        if (token || tokenSocials || tokenArtist) {

            return window.location.href = '/'
        }else {
            return (
                <Container>
                    <Alert variant="success" show={success}>
                        You Are Login !
                </Alert>
                    <Alert variant="danger" show={success == false ? true : false}>
                        Error With Email Or Password !
                </Alert>
                    <Row>
                        <Jumbotron className="jumbo">
                            <Form className="col-6 float-left" onSubmit={this.handleSubmit}>
                                <FormGroup>
                                    <Form.Text className="titre">
                                        CONNECT
                                </Form.Text>
                                    <div className="overline"></div>
                                </FormGroup>
                                <Form.Group>
                                    <Form.Text className="text-muted">
                                        YOU ALREADY HAVE AN ACCOUNT ?
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
                                {/* <Form.Text className="text-muted">
                                Forgot Password?
                </Form.Text> */}
                            </Form>
                            <Form className="col-6 float-right">
                                <FormGroup>
                                    <Form.Text className="titre">
                                        NEW CUSTOMER?
                                </Form.Text>
                                    <div className="overline"></div>

                                </FormGroup>
                                <Form.Group>
                                    <Form.Text className="text-muted">
                                        Registering for this site allows your order status and history. We'll get new account set up for you in no time. For this will only ask you for information necessary to make the purchase process fast and easier
                                </Form.Text>
                                </Form.Group>
                                <br></br>
                                <Button block href="/register" className="buttonsi" type="submit">
                                    CREATE AN ACCOUNT
                </Button>
                                <br />
                                <FacebookLogin
                                    appId="210864019985379"
                                    fields="name,email,picture"
                                    callback={this.ResponseFB}
                                    textButton="SIGN IN WITH FB"
                                    icon="fa-facebook"
                                />
                                <br />
                                <br />
                                <GoogleLogin
                                    clientId="167656924926-h1uhhf3u1m88hjnosdg1c91sgno5ngk6.apps.googleusercontent.com"
                                    onSuccess={this.ResponseG}
                                    onFailure={this.ResponseG}
                                    icon="fa-google"
                                    buttonText="SIGN IN WITH GOOGLE"
                                    className="btng"
                                />

                            </Form>
                        </Jumbotron>
                    </Row>
                </Container>
            )
        }
    }
}
