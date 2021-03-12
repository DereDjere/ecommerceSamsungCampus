import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import Footer from '../footer/footer';
import Designs from '../ProductPage/Designs';
import { Badge, Container } from 'react-bootstrap';



export default class FullProducts extends Component {
  render() {
    return (
      <div>
        <Container fluid>
          <Navbaree />
          <BarreHome />
          <br />
          <Designs/>
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
