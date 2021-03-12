import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import Footer from '../footer/footer';
import Products from '../ProductPage/Products';
import { Badge, Container } from 'react-bootstrap';



export default class FullProducts extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Navbaree />
          <BarreHome />
          <br />
          <Products />
          <br>
          </br><br>
          </br><br>
          </br><br>
          </br><br></br>
          <br>
          </br><br>
          </br><br>
          </br><br>
          </br><br></br>
          <Footer />
        </Container>
      </div>
    )
  }
}
