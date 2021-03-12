import React, { Component } from 'react'
import Navbare from './Navbar'
import HomePhoto from './HomePhoto'
import InlineProducts from './InlineProducts'
import './homepage.css'
import { Badge, Container } from 'react-bootstrap'
import Footer from '../footer/footer';
import BarreHome from '../Home/BarreHome';
import Designs from './Designs.js'

export default class HomePage extends Component {
  render() {
    return (
      <Container>
        <Navbare />
        <BarreHome />
        <HomePhoto />
        <Container fluid className="design">
          <div className="font-black">
          <Badge className="newdesign">
            <h1>New Designs</h1>
          </Badge>
          </div>
          
          <Designs />
          <br></br>
          
        </Container>
        <br />
        <br />
        <br />
        <div className="font-black design">
        <Badge  className="chooseproducts">
            <h1>Choose You're Products</h1>
          </Badge>
        </div>
        <InlineProducts  />
        <div className="font-black">
          <p>footer</p>
        </div>
        <Footer />
      </Container>
    )
  }
}
