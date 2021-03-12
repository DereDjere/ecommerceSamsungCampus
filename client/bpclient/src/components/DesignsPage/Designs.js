import React, { useState, useEffect } from 'react'
import { Jumbotron, Button, Container, Row, Col, ButtonToolbar, ButtonGroup } from 'react-bootstrap';
import queryString from 'query-string';
import Blanc from './images/gucci.png';
import Gris from './images/Gris.png';
import Noir from './images/Noir.png';
import Paypal from './images/paypal.png';
import Secured from './images/secured.png';
import Visa from './images/visa.png';
import Master from './images/mastercard.png';
import './style.css';
import axios from 'axios';

const Products = () => {
    const [ArticlesArray, setArticlesArray] = useState([])
    const id = window.location.pathname.substring(9);
    var compteur = 0;

        useEffect(() => {
            (async () => {
                await axios.get(`http://localhost:8000/designs/${id}`).then(data => {
                    if (data.status == 200) {
                        console.log(data.data)
                        var res = data.data
                        setArticlesArray(ArticlesArray => ArticlesArray.concat(res))
                    }
                }).catch(error => {
                    console.log(error)
                })
            })();
        }, []);

    compteur++;
    let data = {
        compteur_visite: compteur,
    }

    useEffect(() => {

        (async () => {
            await axios.post(`http://localhost:8000/article/visite/${id}`, data, {
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',

                }
            }).then(data => {
                console.log(data);
            }).catch(error => {
                console.log(error)
            })
        })();
    }, []);
    return (
        <Container fluid>
            <br />
            <Row >
                <Col md={0} lg={7}>
                    {
                        ArticlesArray.map((l, i) => (

                            <img key={i} className="col-12" src={l.url_image_principal} alt="Logo" />

                        ))
                    }
                </Col>

                <Col md={12} lg={5}>
                    {
                        ArticlesArray.map((l, i) => (
                            <Container fluid>
                                <Jumbotron className="jumbotron">
                                    <ul>
                                        <li>
                                            {l.titre}
                                        </li>
                                        <br />
                                        <li className="rouge">
                                            {l.prix + '€'}
                                        </li>
                                        <br />
                                        <li className="vert">
                                            👍🏻 STOCK
                                     </li>
                                        <br />
                                        <li className="taille">
                                            Colors : {l.colors}
                                        </li>
                                        <br />
                                        <li className="taille">
                                            Genre : {l.genres}
                                        </li>
                                        <li>
                                            &nbsp;
                                    </li>
                                        <li>
                                            <Col md={4} lg={4} as={Button} variant="" className="variants" href="variants/1">
                                                <img src={Noir} alt="Noir" width="50" height="60" />
                                            </Col>
                                            <Col md={4} lg={4} as={Button} variant="" className="variants" href="variants/2">
                                                <img src={Gris} alt="Gris" width="50" height="60" />
                                            </Col>
                                            <Col md={4} lg={4} as={Button} variant="" className="variants" href="variants/3">
                                                <img src={Blanc} alt="Blanc" width="50" height="60" />
                                            </Col>
                                        </li>
                        &nbsp;&nbsp;
                        <li className="taille">
                                            Size :
                       </li>
                                        <br />
                                        <ButtonToolbar aria-label="Toolbar with button groups">
                                            <ButtonGroup aria-label="Third group">
                                                <Button>XS</Button>
                                &nbsp;
                                <Button>S</Button>
                                &nbsp;
                                <Button>M</Button>
                                 &nbsp;
                                <Button>L</Button>
                                &nbsp;
                                <Button>XL</Button>
                                &nbsp;
                                <Button>XXL</Button>
                                            </ButtonGroup>
                                        </ButtonToolbar>
                                        <br />
                                        <li>&nbsp;</li>
                                        <Button block href={`/customs/${l.id}`} variant="success">CUSTOMISE TON ARTICLE</Button>
                                        <br />
                                        <li>
                                            <img src={Visa} alt="Visa" width="60" height="40" />
                    &nbsp;&nbsp;
                    <img src={Paypal} alt="Paypal" width="50" height="40" />
                    &nbsp;&nbsp;
                    <img src={Master} alt="Master" width="70" height="40" />
                    &nbsp;&nbsp;
                    <img src={Secured} alt="Secured" width="50" height="50" />

                                        </li>
                                    </ul>

                                    <div>
                                        <input type="checkbox" class="read-more-state" id="post-2" />

                                        <ul class="read-more-wrap">
                                            <li>Descriptif : </li>
                                            <li key={i} className="taillePlusgrand">{l.description}</li>
                            &nbsp;&nbsp;
                        <li key={i} class="read-more-target">{l.caracteristique}</li>
                                        </ul>
                                        <label for="post-2" class="read-more-trigger margine"></label>
                                    </div>
                                </Jumbotron>
                            </ Container>
                        ))
                    }

                </Col>
            </Row>
        </Container>
    )
}


export default Products;