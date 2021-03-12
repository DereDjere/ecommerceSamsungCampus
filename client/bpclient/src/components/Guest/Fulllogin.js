import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import Login from './login';
import Footer from '../footer/footer';
import { Container } from 'react-bootstrap'
import Loginguest from './login';


export default class Fulllogin extends Component {
  render() {
    return (
      <Container fluid>
        <Container fluid>
          <Navbaree />
          <BarreHome />
          <br>
          </br><br>
          </br><br>
          </br>
          <Loginguest />
        </Container>
        <br>
        </br><br>
        </br><br>
        </br><br>
        </br><br></br>
        <Footer/>
      </Container>
    )
  }
}
