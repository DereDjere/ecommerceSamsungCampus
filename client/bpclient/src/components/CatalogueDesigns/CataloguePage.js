import React, { Component } from 'react'
import Navbare from '../Home/Navbar'
import './cataloguepage.css'
import { Badge, Container } from 'react-bootstrap'
import Footer from '../footer/footer';
import ProductsInline from './ProductsLine'
import BarreHome from '../Home/BarreHome';


export default class CataloguePage extends Component {
    render() {
        return (
            <Container fluid>
                <Navbare />
                <BarreHome />
                <ProductsInline />
                <Footer />
            </Container>
        )
    }
}
