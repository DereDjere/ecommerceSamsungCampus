import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import Register from './register';
import Footer from '../footer/footer';
import { Container } from 'react-bootstrap'


export default class Fullregister extends Component {
  render() {
    return (
      <Container fluid>
        <Navbaree />
        <BarreHome />
        <br />
        <br />
        <Register />
        <br />
        <br /><br />
        <br /><br />
        <Footer />
      </Container>
    )
  }
}
