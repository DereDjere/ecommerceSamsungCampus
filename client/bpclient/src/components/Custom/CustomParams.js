import React, { Component, } from 'react'
import { Form, Button, Container, Row, Col, Jumbotron, Image, Tabs, Tab } from 'react-bootstrap';
import './style.css';

export default class Customs extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            filtervalue: [],
            homeCustoms: [],
            position: '',
            size: '',
            designID: '',
            articleID: '',
            designName: '',
            articleName: '',
            customsImage: '',
            designprice: '',
            articleprice: '',
            pricetotal: '',
            sizeprice: '',
            valid: [],
        }
    }

    componentDidMount() {
        const id = window.location.pathname.substring(9);

        console.log(id)
        fetch(`http://127.0.0.1:8000/article/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {

                this.setState({ homeCustoms: response })
                console.log(this.state.homeCustoms[0].prix)
                this.setState({ articleprice: this.state.homeCustoms[0].prix })
                this.setState({ articleID: id })
                this.setState({ articleName: this.state.homeCustoms[0].titre })
            })
    }

    SpriteCreate = function () {
        console.log('test')
        fetch("http://127.0.0.1:8000/sprite/create", {
            method: "POST",
            body: JSON.stringify({
                "position": this.state.position,
                "size": this.state.size,
                "designID": this.state.designID,
                "articleID": this.state.articleID

            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                //  alert(this.state.designprice)
                if (this.state.designprice === '' || this.state.designprice == null) {
                    this.state.designprice = 0
                }
                //  alert(this.state.designprice)

                this.setState({ customsImage: response })
                console.log(this.state.customsImage)
                this.setState({ pricetotal: this.state.articleprice + this.state.sizeprice + this.state.designprice })
            })

    }
    SearchFilter = function () {
        console.log('test');
        fetch("http://127.0.0.1:8000/customs/search", {
            method: "POST",
            body: JSON.stringify({
                "filter": this.state.filter,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({ filtervalue: response })

            })
    }
    Validation = function () {

        const oldproduct = localStorage.getItem('products') ? localStorage.getItem('products') : "[]";
        const arrayproduct = JSON.parse(oldproduct);

        var newitem = {
            'sprite': this.state.customsImage.url_sprite,
            'prix': this.state.pricetotal,
            'id': this.state.customsImage.id,
            'design_name': this.state.designName,
            'article_name': this.state.articleName,
            'design_id': this.state.designID,
            'article_id': this.state.articleID,
            'sprite_id': this.state.customsImage.id,
        }

        arrayproduct.push(newitem);

        localStorage.setItem('products', JSON.stringify(arrayproduct))

        console.log(arrayproduct)
        window.location.href = "/paniers"
    }

    RenderSprite = function () {
        if (this.state.customsImage == '' || this.state.customsImage == null) {
            return (

                this.state.homeCustoms.map((l, i) =>
                    (
                        <Image key={l.id} src={l.url_image_principal} />
                    ))
            )
        }
        else {
            return (
                <Container>
                    <Image src={this.state.customsImage.url_sprite} />
                    <Button onClick={() => this.Validation()}>Valider</Button>
                </Container>

            )
        }

    }
    render() {



        return (
            <Container>
                <Row >
                    <Col sm={2} md={2} lg={2}>
                        <Jumbotron fluid>
                            <Form>
                                Choose your designs
                                <Form.Group controlId="filter">
                                    <Form.Control type="text" name="genres" placeholder="Filtre" onChange={text => this.setState({ filter: text.target.value }, () => { this.SearchFilter() })} />
                                    <Button>Rechercher</Button>
                                </Form.Group >
                            </Form>
                            <Jumbotron>
                                {
                                    this.state.filtervalue.map((l, i) => (
                                        <Button onClick={put => this.setState({ designID: l.id, designprice: l.prix, designName: l.name_design })}><Image src={l.url} width={100} height={150} /></Button>
                                    ))
                                }

                            </Jumbotron>
                        </Jumbotron>
                    </Col>
                    <Col sm={4} md={4} lg={4}>
                        <Jumbotron className="jumbotron">
                            <Tabs>
                                <Tab eventKey="simple" title="Simple Mode">
                                    <Form>
                                        <Form.Group>
                                            <Form.Label>Size</Form.Label>
                                            <Button onClick={put => this.setState({ size: put.target.value, sizeprice: 45 })} value="Large">Large</Button>
                                            <Button onClick={put => this.setState({ size: put.target.value, sizeprice: 30 })} value="Medium">Medium</Button>
                                            <Button onClick={put => this.setState({ size: put.target.value, sizeprice: 15 })} value="Small">Small</Button>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Position</Form.Label>
                                            <Button onClick={put => this.setState({ position: put.target.value })} value="TopLeft">TOP LEFT</Button>
                                            <Button onClick={put => this.setState({ position: put.target.value })} value="TopRight">TOP RIGHT</Button>
                                            <Button onClick={put => this.setState({ position: put.target.value })} value="Center">CENTER</Button>
                                        </Form.Group>
                                        <Button onClick={() => this.SpriteCreate()}>Previsualiser</Button>
                                    </Form>
                                </Tab>
                                <Tab eventKey="advanced" title="Advanced Mode">
                                    <h3>not available for the moment.</h3>
                                </Tab>
                            </Tabs>


                        </Jumbotron>

                    </Col>
                   
                        <Col sm={6} md={6} lg={6}>
                        
                            {this.RenderSprite()}
                            {
                                this.state.homeCustoms.map((l, i) => (
                                    <div>
                                        <p>Nom de l'article : {l.titre}</p>
                                        <p>Prix de l'article: {l.prix} €</p>
                                    </div>


                                ))
                            }


                            <p>Prix du design seul : {this.state.designprice} €</p>
                            <p>Prix de la taille du design : {this.state.sizeprice} €</p>
                            <h5>Prix total : {this.state.pricetotal} €</h5>

                           
                        </Col>
                 









                </Row>
            </ Container >
        )
    }
}