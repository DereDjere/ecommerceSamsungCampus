import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import Footer from '../footer/footer';
import { Container } from 'react-bootstrap'
import Userinterface from './userinterface'


export default class Fulluserinterface extends Component {
  render() {

    const token = localStorage.getItem('token')
    const tokenArtist = localStorage.getItem('tokenArtist')
    if(token || tokenArtist)
    {
      return (
        <Container fluid>
          <Navbaree />
          <BarreHome />
          <br />
          <br />
          <Userinterface />
          <br />
          <br /><br />
          <br /><br />
          <Footer />
        </Container>
      )
    }
    else{
      window.location.href = '/login'
      
    }

    
  }
}
