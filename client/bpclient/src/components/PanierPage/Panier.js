import React, { Component } from 'react'
import { Container, Table, Button, Form, Col, Row } from 'react-bootstrap'
import './style.css';
import { withRouter } from "react-router-dom";

export default class Panier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prix_total: '',
            products: null,
        }
    }

    componentDidMount() {
        const local = JSON.parse(localStorage.getItem('products')) || []
        console.log(local)
        var prix = null
        local.forEach(element => {
            console.log(element.prix)
            if (element.prix === '' || element.prix == null) {

                element.prix = 0
            }
            prix += element.prix
        });
        this.setState({
            prix_total: prix
        })
        this.setState({
            products: local,
        })
        console.log(this.state.local)



        // this.props.router.push({
        //     pathname: '/prepayement/info',
        //     state: {
        //       id: 7,
        //       color: 'green'
        //     }
        //   })


    }




    render() {
        const local = JSON.parse(localStorage.getItem('products')) || []
        if (this.state.products == null) {
            return (
                <Container>
                    <Table className="table">
                        <thead>
                        </thead>
                        <tbody id="cart-tablebody"></tbody>
                    </Table>
                    <p>Prix total : 0<span className="subtotal"></span>€</p>

                    <li> <Button block href="/" variant="success" type="submit">
                        Place Order
                </Button>
                    </li>
                </Container>
            )
        }
        else {
            return (
                <Container>
                    <Table className="table">
                        <thead>

                            {local.map((l, i) => (
                                <Container>
                                    <tr>
                                        <th>Article</th>
                                        <th>Quantity</th>
                                        <th><input className="quantity" type="number" defaultValue="1" min="0" max="10" step="1" />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <img className="col-6 float-left" src={l.sprite} alt="Logo" width="auto" height="auto" />
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>Prix</th>
                                        <th>{l.prix} €</th>
                                    </tr>
                                </Container>
                            ))}


                        </thead>
                        <tbody id="cart-tablebody"></tbody>
                    </Table>
                    <fieldset>
                        <Form.Group as={Row}>
                            <Form.Label as="legend" column sm={2}>
                            Delivery method
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Check
                                    type="radio"
                                    label="Standard Delivery"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios1"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Quick Delivery rapide (48h)"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios2"
                                />
                                <Form.Check
                                    type="radio"
                                    label="Express Delivery (24h)"
                                    name="formHorizontalRadios"
                                    id="formHorizontalRadios3"
                                />
                            </Col>
                        </Form.Group>
                    </fieldset>
                    <Form.Group as={Col} controlId="formGridState">
                        <Form.Label>WHERE ?</Form.Label>
                        <Form.Control as="select" defaultValue="Choose...">
                            <option>Choose...</option>
                            <option>AT HOME</option>
                            <option>AT HOME WITH CAUSION "(COVID-19)"</option>
                            <option>AT RELAY POINT</option>
                        </Form.Control>
                    </Form.Group>

                    <p>Prix total : {this.state.prix_total}<span className="subtotal"></span>€</p>

                    <li> <Button block href="/prepayement" variant="success" type="submit">
                        Place Order
                    </Button>
                    </li>


                   
                </Container>
            )
        }

    }
}
