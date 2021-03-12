import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import Footer from '../footer/footer';
import Prepayement from './Prepayement';
import PrepayementUsers from './PrepayementUsers';
import RegisterGuest from './../Guest/login'; 

import { Form, Button, Container, FormGroup, Row, Col, ButtonToolbar, ButtonGroup } from 'react-bootstrap';



export default class FullPrepayement extends Component {

  checkToken()
  {
    var token = localStorage.getItem('token');

    if(token)
    {
      return <PrepayementUsers/>
    }
    else
    {
      
      return <Prepayement/>
    }
  }
 

  render() {

    
    return (

      <div>
        <Container fluid>
          <Navbaree />
          <BarreHome />
          {this.checkToken()}
          <Footer />
        </Container>
      </div>
    )
  }
}
