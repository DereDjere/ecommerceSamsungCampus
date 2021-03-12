import React, { Component } from 'react'
import { Badge, Jumbotron, Container, Row, Col, Image, Button } from 'react-bootstrap'
import Girl from './girl.jpg'
import Men from './men.jpg'
import './homephoto.css'


export default class HomePhoto extends Component {

    Women = function()
    {
        window.location.href = '/catalogue?search=femme'
    }
    Men = function()
    {
        window.location.href = '/catalogue?search=homme'
    }

    render() {

        

        return (
                <Container fluid>
                        <Row>
                            <Col>
                                <Image className="imggirl" src={Girl} onClick={this.Women} fluid/>
                                <Image className="imgmen" src={Men} onClick={this.Men} fluid/>
                            </Col>
                        </Row>
                </Container>
        )
    }
}
