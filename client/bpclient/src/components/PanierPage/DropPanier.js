import React, { Component } from 'react'
import { Container, Table, Button } from 'react-bootstrap'
import './style.css';
import logo from './images/gucci.png';


export default class DropPanier extends Component {
    constructor(props) {
        super(props)
        this.state = {
            prix_total: '',
        }
    }

    componentDidMount() {
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
        }

    }

    render() {
        const local = JSON.parse(localStorage.getItem('products')) || []
        console.log(local)
        if (local == null) {
            return (
                <Container>
                    <Table className="table">
                        <thead>
                            <Container>

                                <th>Article</th>

                            </Container>
                        </thead>
                        <tbody id="cart-tablebody"></tbody>
                    </Table>

                    <p>Prix total : 0<span className="subtotal"></span>€</p>

                    <li> <Button block href="/paniers" variant="success" type="submit">
                        Go to Card
                        </Button>
                    </li>
                    <br /><br /><br /><br /><br /><br /><br /><br /><br />
                </Container>
            )
        }
        return (
            <Container>
                <Table className="table">
                    <thead>
                        {
                            local.map((l, i) => (
                                <Container>
                                    <tr>
                                        <th>Article</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <img className="col-6 float-left" src={l.sprite} alt="Logo" width="auto" height="auto" />
                                        </th>
                                    </tr>
                                </Container>
                            ))
                        }   
                         </thead>
                    <tbody id="cart-tablebody"></tbody>
                </Table>

                <p>Prix total : {this.state.prix_total}<span className="subtotal"></span>€</p>

                <li> <Button block href="/paniers" variant="success" type="submit">
                    Go to Card
                     </Button>
                </li>
                <br /><br /><br /><br /><br /><br /><br /><br /><br />
            </Container>
        )
    }
}
