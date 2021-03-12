import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import RegisterArtist from './registerart';
import Footer from '../footer/footer';
import { Container } from 'react-bootstrap'


export default class Fullregisterart extends Component {
  render() {
    return (
      <Container fluid>
        <Navbaree />
        <BarreHome />
        <br />
        <br />
        <RegisterArtist />
        <br />
        <br /><br />
        <br /><br />
        <Footer />
      </Container>
    )
  }
}
