import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from './barreHome';
import Footer from '../footer/footer';
import { Container } from 'react-bootstrap';
import Profileupdate from './profileupdate';


export default class Fullinfo extends Component {
  render() {
    return (
      <Container fluid>
        <Navbaree />
        <BarreHome />
        <br />
        <br />
        <Profileupdate />
        <br />
        <br /><br />
        <br /><br />
        <Footer />
      </Container>
    )
  }
}
