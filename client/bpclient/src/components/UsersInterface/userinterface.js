import React, { Component } from 'react'
import { Form, Button, Container, Alert, Card, CardColumns, Row } from 'react-bootstrap'
import { Redirect } from 'react-router';
import axios from 'axios'
import './style.css';
import Imgadress from './img/icons8-adresse-50.png';
import Imgpaquet from './img/icons8-paquet-64.png';
import Imgaide from './img/icons8-aide-64.png';
import Imgconn from './img/icons8-paramètres-64.png';

export default class userinterface extends Component {


    constructor(props) {
        super(props);
        this.state = {
            idArtist: null,
        }
        
    }

    // {this.state.logArtist == true
    //     ? 
    componentDidMount() {

    let tokenArtist = localStorage.getItem('tokenArtist')

    if(tokenArtist){
        
        tokenArtist = tokenArtist.substring(1).replace('"', '');
    fetch('http://localhost:8000/artist/get/id', {
        method: "POST",
        body: JSON.stringify({
            'token': tokenArtist,
         
        }),
        headers: {
            "Content-Type": "application/json",
            'Accept': "application/json"
        }
    }
    ).then(response => response.json())
        .then(response => {
            console.log(response)
            // alert(response)
            this.setState({ idArtist: response })



            /* localStorage.removeItem('products') */
        })

    }
}
    
    render() {
        let tokenArtist = localStorage.getItem('tokenArtist');
        return (
            <Container fluid>
                <Form>
                    <h4 className="YourAccount">Your account</h4>
                    <Row className="text-center">
                        <CardColumns>
                            <Card className="p-2 bd-highlight col-example align-content-center align-content-md-center align-content-sm-center align-content-lg-center align-content-xl-center">
                                <Card.Header>
                                    <Card.Img variant="left top"  className="LogoInterface" src={Imgadress} />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Address</Card.Title>
                                    <Card.Text>Change addresses and delivery preferences for orders and gifts</Card.Text>
                                      {this.state.idArtist == null
                                        ? 
                                    <Button href="/addressinfo"  variant="primary">Click here !</Button>
                                    : <Button href={"/artiste/" + this.state.idArtist}  variant="primary">Click here !</Button>
                                      }
                                </Card.Body>
                            </Card>
                            <Card className="p-2 bd-highlight col-example align-content-center align-content-md-center align-content-sm-center align-content-lg-center align-content-xl-center">
                                <Card.Header>
                                    <Card.Img variant="left top" className="LogoInterface" src={Imgconn} />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Connection and security settings</Card.Title>
                                    <Card.Text>Change username, email and password</Card.Text>
                                    {this.state.idArtist == null
                                        ? 
                                    <Button href="/profil/update"  variant="primary">Click here !</Button>
                                :<Button href={"/artiste/" + this.state.idArtist}  variant="primary">Click here !</Button>
                                }

                                </Card.Body>
                                {/* <Card.Footer>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </Card.Footer> */}
                            </Card>
                            <Card className="p-2 bd-highlight col-example align-content-center align-content-md-center align-content-sm-center align-content-lg-center align-content-xl-center">
                                <Card.Header>
                                    <Card.Img className="LogoInterface" variant="left top" src={Imgpaquet}></Card.Img>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Packages</Card.Title>
                                    <Card.Text>Track, return or buy again !</Card.Text>
                                    <Button href="/mycommands"  variant="primary">Click here !</Button>
                                </Card.Body>
                            </Card>
                            <Card className="p-2 bd-highlight col-example align-content-center align-content-md-center align-content-sm-center align-content-lg-center align-content-xl-center">
                                <Card.Header>
                                    <Card.Img variant="left top" className="LogoInterface" src={Imgaide} />
                                </Card.Header>
                                <Card.Body>
                                    <Card.Title>Help</Card.Title>
                                    <Card.Text>Browse available help topics</Card.Text>
                                    <Button href="/help"  variant="primary">Click here !</Button>
                                </Card.Body>
                            </Card>
                        </CardColumns >
                    </Row>
                </ Form>
            </Container>
        )
    }
}