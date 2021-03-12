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
import $ from 'jquery';




const formValid = formErrors => {
    let valid = true;

    Object.values(formErrors).forEach(val => { val.length > 0 && (valid = false) });

    return valid;
}

export default class PrepayementUsers extends Component {



    constructor(props) {
        super(props);
        this.state = {
            guest: false,
            save: null,
            firstname: null,
            lastname: null,
            city: null,
            adress: null,
            cp: null,
            country: null,
            cardnumber: null,
            cvc: null,
            expirationMonth: null,
            expirationYears: null,
            cardholderName: null,
            isChecked: true,
            currentsave: [],
            pays: [],
            shipCountry: '',
            prix_total: '',
            prix_totalbis: '',
            checkSubscrib: '',
            subscribing: false,

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
        const token = localStorage.getItem('token')
        console.log(token);
        const tokensub = localStorage.getItem('token').substring(1).replace('"', '')
        // console.log(token2);
        // alert(tokensub);
        const local = JSON.parse(localStorage.getItem('products'))

        
        var prix = null
        if (local == null) {
            return window.location.href = '/'
        }
        else {
            local.forEach(element => {
                
                prix += element.prix
            });
            this.setState({
                prix_total: prix
            })
    
        }
        fetch('http://localhost:8000/commandes/isChecked', {
            method: "POST",
            body: JSON.stringify({
                'token': token,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {
                console.log(response[0].isChecked )
                this.setState({ save: response[0].isChecked })
                this.setState({ currentsave: response })
                this.livraison(this.state.currentsave[0].country)


            })

        fetch("http://127.0.0.1:8000/admins/shipping", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {


                this.setState({ pays: response })

            })


        fetch("http://127.0.0.1:8000/check/abonnement/" + tokensub, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);

                this.setState({ checkSubscrib: response })

            })



    }
    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }

    handleSubmit = e => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        console.log(this.state.cvc);
        const products = JSON.parse(localStorage.getItem('products'));
        fetch('http://localhost:8000/commandes/users', {
            method: "POST",
            body: JSON.stringify({
                'firstname': this.state.firstname,
                'lastname': this.state.lastname,
                'city': this.state.city,
                'adress': this.state.adress,
                'cp': this.state.cp,
                'country': this.state.country,
                'isChecked': this.state.isChecked,
                'token': token,
                'prix_total': this.state.prix_totalbis,
                'products': products,

                // 'cvc': this.state.cvc,
                // 'cardnumber': this.state.cardnumber,
                // 'expirationMonth': this.state.expirationMonth,
                // 'expirationYears': this.state.expirationYears,
                // 'cardholderName': this.state.cardholderName,

            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {

                console.log(response)


            })
            window.location.href = '/payement'
    }

    livraison(country) {
        // alert(country)
        // this.setState({
        //     prix_total: 'x 0'
        // })
        // console.log(this.state.prix_total)
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

    subscrib(){ 
        // e.preventDefault();
        // alert('cobra')
        var prix = 39.99 + this.state.prix_totalbis;
    //   var b = $('.price').text()
  prix = Math.round(prix*100)/100;
    console.log(prix)

    this.setState({
        prix_totalbis: prix
    })

    this.setState({
        subscribing: true
    })

    
      
      $('.pricing-table').hide();
    }



    SubmitBuy = e => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        const products = JSON.parse(localStorage.getItem('products'));
   

        if(this.state.subscribing == true){
           

        const tokensub = localStorage.getItem('token').substring(1).replace('"', '')



            fetch("http://127.0.0.1:8000/user/abonnement/" + tokensub, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                

            })
        }

        

        // alert(this.state.prix_total) 
        fetch('http://localhost:8000/commandes/users', {
            method: "POST",
            body: JSON.stringify({
                'firstname': this.state.currentsave[0].firstname,
                'lastname': this.state.currentsave[0].lastname,
                'city': this.state.currentsave[0].city,
                'adress': this.state.currentsave[0].address,
                'cp': this.state.currentsave[0].cp,
                'country': this.state.currentsave[0].country,
                'isChecked': this.state.currentsave[0].isChecked,
                'token': token,
                'products': products,
                // 'id_sprite' : products.sprite_id,
                'prix_total': this.state.prix_totalbis,
                // 'design_id': products.design_id,
                // 'article_id': products.article_id,


            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {
                
            })
            window.location.href = '/payement'
    }
    render() {
        console.log(this.state.response)
        if (this.state.save == 1) {
            return (
                <Container>
                    <Jumbotron>
                        <h4>Coordonnes</h4>
                        <Jumbotron>
                            <ul>
                                {this.state.currentsave.map((l, i) => (
                                    <Container>
                                        <Card>

                                            <li key={i}>Address : {l.address}</li>
                                            <li>ZIP : {l.cp}</li>
                                            <li>City : {l.city}</li>
                                            <li>Country : {l.country}</li>

                                        </Card>
                                        <Card>frais de livraison : {this.state.shipCountry + ' Euros'}</Card>
                                        <Card>PRIX TOTAL : {this.state.prix_totalbis + ' Euros'}</Card>

                                        {this.state.checkSubscrib == false
                                            ? 
                                           

                                        <section className="pricing-table">
                                            <div className="container">
                                                <div className="pricing-area text-center">
                                                    <div className="row">

                                                        <div className="col-sm-4 plan price yellow wow fadeInDown">
                                                            <ul className="list-group">
                                                                <li className="list-group-item heading" style={{ backgroundColor: '#e24f43' }}>
                                                                    <h1>Livraison Express<br /></h1><span className="price"><strong>39,99€/an</strong><br /></span></li>
                                                                <li className="list-group-item"><span>Inscrivez-vous au service de livraison Express pour bénéficier de la livraison en moins de -24h illimitée chez vous ou en point relais sans minimum d'achat pendant un an. Faites vos achats encore plus rapidement et facilement.<br /></span></li>
                                                                <li className="list-group-item plan-action"><a onClick={ () => this.subscrib()} className="btn" href="#" style={{ backgroundColor: '#e24f43' }}>Sign Up</a></li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

: null
}

                                    </Container>
                                ))}
                            </ul>
                            <a onClick={a => this.setState({ save: 0, shipCountry: '' })} style={{
                                color: 'blue',
                            }}>Changer vos Coordonnes</a>
                            <br />
                            <a onClick={a => this.setState({ save: 3 })} style={{
                                color: 'blue',
                            }}>Sender another adresse</a>

                            <Button block className="btncreate" variant="" onClick={this.SubmitBuy}>
                                Payer
                                    </Button>
                        </Jumbotron>
                    </Jumbotron>



                </Container>
            )
        }
        else if (this.state.save == 3) {

            return (
                <Container>
                    <Jumbotron className="jumbotron">
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
                                        <input onChange={text => this.setState({ country: text.target.value })} data-centralpay="adress" type="text" name="order[country]" autocomplete="off"
                                            data-form="card-user" class="form-control" placeholder="country" required="required" />
                                    </div>
                                </div>




                            </div>




                        </Form>
                        <hr />
                        <div>
                            
                            <Form method="post" data-centralpay="form" >
                                {/* STRIPE */}
                                <App />
                                {/* /// */}
                                <li>
                                    <Button block className="btncreate" variant="" onClick={this.handleSubmit}>
                                        Send
                                    </Button>
                                </li>
                            </Form>



                            <label for="post-2" class="read-more-trigger"></label>
                        </div>

                    </Jumbotron>
                </Container>
            )
        }
        else {
            return (
                <Container>
                    <Jumbotron className="jumbotron">
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




                        </Form>
                        <hr />
                        <div>



                            <Form method="post" data-centralpay="form" >
                                {/* STRIPE */}
                                
                                {/* /// */}

                                <li>
                                    <Form.Check
                                        type="checkbox"
                                        label="Se souvenir"
                                        onChange={this.toggleChange}
                                    />
                                    <Button block className="btncreate" variant="" onClick={this.handleSubmit}>
                                        Pay
                                    </Button>
                                </li>
                            </Form>



                            <label for="post-2" class="read-more-trigger"></label>
                        </div>

                    </Jumbotron>
                </Container>
            )
        }


    }
}
