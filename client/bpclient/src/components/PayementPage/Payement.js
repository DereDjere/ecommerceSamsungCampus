import React, { Component } from 'react'
import { Form, Button, Container, Row } from 'react-bootstrap';
/* import Paypal from './images/paypal.png';
import Secured from './images/secured.png';
import Visa from './images/visa.png';
import Master from './images/mastercard.png'; */
import { PayPalButton } from "react-paypal-button-v2";
import './style.css';
import App from './Stripe'




export default class Payement extends Component {
    Validation = function () {

        const oldproduct = localStorage.getItem('products') ? localStorage.getItem('products') : "[]";
        const arrayproduct = JSON.parse(oldproduct);

        var newitem = {
            'prix': this.state.pricetotal,
        }

        arrayproduct.push(newitem);

        localStorage.setItem('products', JSON.stringify(arrayproduct))

        console.log(arrayproduct)

    }

    constructor(props) {
        super(props)
        this.state = {
            guest: false,
        }
    }
    componentDidMount() {
        const token = localStorage.getItem('token')
        console.log(token);
    }
    VerifyToken = function () {

    }


    render() {
        return (
            <Container>
                <Form method="post" data-centralpay="form" action="https://example.centralpay.net/v2/process/display">
                    <div data-centralpay="errors" class="custom-form"></div>
                    <p data-form="main-description" class="sr-only">Card data</p>
                    <div class="form-row mt-3" data-toggle="popover-example-data">
                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <input data-centralpay="firstName" type="text" name="order[firstName]" autocomplete="off"
                                    data-form="card-user" class="form-control" placeholder="First name" required="required" />
                            </div>
                        </div>
                        <div class="form-group col-6">
                            <div class="has-feedback input-group">
                                <div class="input-group-prepend">
                                    <div class="input-group-text"><div class="ico ico-user"></div></div>
                                </div>
                                <input data-centralpay="lastName" type="text" name="order[lastName]" autocomplete="off"
                                    data-form="card-user" class="form-control" placeholder="Last name" required="required" />
                            </div>
                        </div>
                    </div>
                    <div data-form="card-validation">
                        <div class="form-row">
                            <div class="form-group col-12">
                                <div class="has-feedback input-group">
                                    <div class="input-group-prepend">
                                        {/* <div class="input-group-text"><div class="ico ico-envelope"></div></div> */}
                                    </div>
                                    {/* <input data-centralpay="card[holderEmail]" type="email" name="card[cardholderEmail]"
                                        autocomplete="off" class="form-control" data-form="card-user"
                                        placeholder="E-mail" required="required" /> */}
                                </div>
                            </div>
                        </div>
                        <div class="form-row">
                            <div class="col-12">
                                <div data-form="remember-div" class="remember remember-option d-flex align-items-center mb-3">
                                    <span class="remember-checkbox form-check">
                                        <input class="form-check-input" data-form="remember-select" id="remember" type="checkbox"
                                            name="store-card" />
                                        <label class="form-check-label" for="remember">remember me</label>
                                    </span>
                                    <span class="card-stored">Use your card</span>
                                    <a class="help-icon" data-toggle="popover-info">
                                        <img src="/v2/src/img/question-mark.png" alt="" />
                                    </a>
                                    <div id="popover-card-info" class="d-none">
                                        <span class="np-popover-style">Your card data is stored securely. <a href="#">More information</a></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-row d-none">
                            <div class="form-group col-12">
                                <select list="userCards" data-form="card-list" type="text" class="form-control input-large">
                                    <option> -- pay with a new credit card -- </option>
                                </select>
                            </div>
                        </div>
                        <div id="card-option" class="new-card-ok">
                            <div class="form-row">
                                <div class="form-group col-12 new-card">
                                    <div class="has-feedback input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><div class="ico ico-cb"></div></div>
                                        </div>
                                        <input data-centralpay="card[number]" type="tel" pattern="([0-9 ]{14,20})?" autocomplete="off"
                                            class="form-control form-card-data form-card-number" placeholder="Credit card number"
                                            maxlength="20" data-form="card-data" />
                                    </div>
                                </div>
                            </div>
                            <div class="form-row align-items-center">
                                <div class="form-group col-8 new-card">
                                    <div class="has-feedback input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><div class="ico ico-calendar"></div></div>
                                        </div>
                                        <input data-centralpay="card[expirationMonth]" type="tel" pattern="[0-9]{1,2}"
                                            maxlength="2" autocomplete="off" class="form-control form-card-data" placeholder="MM"
                                            data-form="card-data" />
                                        <input data-centralpay="card[expirationYear]" type="tel" max="9999" inputmode="tel"
                                            pattern="[0-9]{4}" autocomplete="off" class="form-control form-card-data"
                                            data-form="card-data" placeholder="YYYY" />
                                    </div>
                                </div>
                                <div class="form-group col-8 stored-card use-cvv text-right">Select card and enter CVV</div>
                                <div class="form-group col-4 use-cvv">
                                    <div class="has-feedback input-group">
                                        <div class="input-group-prepend">
                                            <div class="input-group-text"><div class="ico ico-lock"></div></div>
                                        </div>
                                        <input data-centralpay="card[cvc]" type="tel" pattern="[0-9]{3,4}" maxlength="4"
                                            autocomplete="off" class="form-control form-card-data" placeholder="CVV2"
                                            name="customerValidationValue" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <App />
                    <li>
                        <Button block onClick={() => this.Validation()} className="Button" href="/register" variant="success" type="submit">
                            PAY
                        </Button>
                    </li>
                </Form>
               
            </Container>
        )
    }
}

