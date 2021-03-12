import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from './barreHome';
import Footer from '../footer/footer';
import App from '../PayementPage/Stripe';

import { Container } from 'react-bootstrap';



export default class FullPayement extends Component {
  render() {
    var local = localStorage.getItem('products')
    if(!local)
    {
      window.location.href = '/'
    }
    else
    {
      return (
        <Container fluid>
          <Navbaree />
          <BarreHome />
          <br />
          <br />
          <br />
          <br />
          <App />
          <br />
          <br />
          <br />
  
          <Footer />
        </Container>
      )
    }
   
  }
}
