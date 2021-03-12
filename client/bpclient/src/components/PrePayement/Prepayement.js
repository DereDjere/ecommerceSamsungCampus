import React, { Component } from 'react'
import { Form, Button, Container, Row, Jumbotron } from 'react-bootstrap';
import Paypal from './images/paypal.png';
import Secured from './images/secured.png';
import Visa from './images/visa.png';
import Master from './images/mastercard.png';
import axios from 'axios';
import App from './Stripe'
import './style.css';
import { Card } from '@material-ui/core';
import { withRouter } from "react-router-dom";



const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { val.length > 0 && (valid = false) });

    return valid;
}

export default class Prepayement extends Component {



    constructor(props) {
        super(props);
        this.state = {
            guest: false,

            firstname: null,
            lastname: null,
            city: null,
            adress: null,
            cp: null,
            country: null,
            pays: [],
            email: null,
            shipCountry: '',
            prix_totalbis: '',





            success: null,
            formErrors: {
                firstname: "",
                lastname: "",
                city: "",
                adress: "",
                cp: "",
                country: "",


            }
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

        // console.log(this.props.location)
        // // alert(this.props)
        // const { data } = this.props.location
        // alert(data);

        const token = localStorage.getItem('token')
        console.log(token);
        const local = JSON.parse(localStorage.getItem('products'))
        var prix = null
        if (local == null) {
            return 'walou'
        }
        else {
            local.forEach(element => {
                console.log(element.prix)
                prix += element.prix
            });
            this.setState({
                prix_total: prix
            })
            console.log(this.state.prix_total);
        }


        fetch("http://127.0.0.1:8000/admins/shipping", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);

                this.setState({ pays: response })

            })
    }
    VerifyToken = function () {

    }

    handleSubmit = e => {
        e.preventDefault();
        const products = JSON.parse(localStorage.getItem('products'));
        


        if (formValid(this.state.formErrors)) {
            console.log(`
        ${this.state.firstname}
        ${this.state.lastname}
        ${this.state.city}
        ${this.state.adress}
        ${this.state.cp}
        ${this.state.country}

        `);
            let array = {
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                city: this.state.city,
                adress: this.state.adress,
                cp: this.state.cp,
                country: this.state.country,
                prix_total: this.state.prix_totalbis,
                email: this.state.email,
                products: products,


            }
            axios.post(`http://localhost:8000/api/commandes`, array, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
            }
            ).then((data) => {
                console.log(data);
                if (data.status === 201) {
                    this.setState({ success: true })
                    window.location.href = '/payement'

                } else if (data.status === 200) {
                    this.setState({ success: false })
                }

            })
        } else {
            console.log(this.state.formErrors)
        }
    }

    livraison(country) {
        // alert(country)

        this.setState({ country: country })

        fetch('http://localhost:8000/shipping', {
            method: "POST",
            body: JSON.stringify({
                'name': country,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {

                // return(response.shipping_charges)
                this.setState({
                    shipCountry: response.shipping_charges
                })
                this.setState({
                    prix_totalbis: response.shipping_charges + this.state.prix_total
                })

            })

    }


    render() {

        return (
            <Container>

                <Form method="post" data-centralpay="form" >
                    <div data-centralpay="errors" class="custom-form"></div>
                    <p data-form="main-description" class="sr-only">Card data</p>
                    <div class="form-row mt-3" data-toggle="popover-example-data">
                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <input onChange={text => this.setState({ firstname: text.target.value })} data-centralpay="firstname" type="text" name="order[firstname]" autocomplete="off"
                                    data-form="card-user" class="form-control" placeholder="First name" required="required" />
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <input onChange={text => this.setState({ lastname: text.target.value })} data-centralpay="lastname" type="text" name="order[lastname]" autocomplete="off"
                                    data-form="card-user" class="form-control" placeholder="Last name" required="required" />
                            </div>
                        </div>


                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <input onChange={text => this.setState({ city: text.target.value })} data-centralpay="city" type="text" name="order[city]" autocomplete="off"
                                    data-form="card-user" class="form-control" placeholder="City" required="required" />
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <input onChange={text => this.setState({ adress: text.target.value })} data-centralpay="adress" type="text" name="order[adress]" autocomplete="off"
                                    data-form="card-user" class="form-control" placeholder="Adress" required="required" />
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <input onChange={text => this.setState({ cp: text.target.value })} data-centralpay="cp" type="text" name="order[cp]" autocomplete="off"
                                    data-form="card-user" class="form-control" placeholder="CP" required="required" />
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <select id="state" class="browser-default" required title="Please select a state" onChange={select => this.livraison(select.target.value)}>
                                    <option value="" disabled selected>Select a state</option>
                                    {this.state.pays.map((l, i) => (
                                        <option value={l.name}>{l.name}</option>
                                    ))}
                                </select>

                                {/* <input onChange={text => this.setState({ country: text.target.value })} data-centralpay="adress" type="text" name="order[country]" autocomplete="off"
                                            data-form="card-user" class="form-control" placeholder="country" required="required" /> */}
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <input onChange={text => this.setState({ email: text.target.value })} data-centralpay="email" type="email" name="order[cp]" autocomplete="off"
                                    data-form="card-user" class="form-control" placeholder="Email" required="required" />
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <Card>
                                    FRAIS DE LIVRAISON : {this.state.shipCountry + ' Euros'}
                                </Card>
                            </div>
                        </div>

                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <Card>
                                    PRIX TOTAL : {this.state.prix_totalbis + ' Euros'}
                                </Card>
                            </div>
                        </div>




                    </div>




                    <Button block className="btncreate" variant="" onClick={this.handleSubmit}>
                        Send
                    </Button>

                </Form>
                <hr />
                <div>

                    <input type="checkbox" class="read-more-state" id="post-2" />

                    <ul class="read-more-wrap">

                        <li class="read-more-target">
                            <Jumbotron className="jumbotron">
                                <Form method="post" data-centralpay="form" >
                                    
                                    {/* STRIPE */}
                                    
                                    {/* /// */}
                                    <li>
                                        <Button block href="/register" variant="success" type="submit">
                                            Pay
                                        </Button>
                                    </li>
                                </Form>
                            </Jumbotron>
                        </li>

                    </ul>
                </div>

            </Container>
        )
    }
}
