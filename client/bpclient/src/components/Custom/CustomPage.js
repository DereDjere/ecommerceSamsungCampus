import React, { Component } from 'react'
import BarreHome from '../Home/BarreHome';
import Navbaree from '../Home/Navbar';
import Footer from '../footer/footer';
import Customs from '../Custom/CustomParams'
import {  Container, } from 'react-bootstrap';



export default class FullProducts extends Component {
  render() {
    return (

      <div>
        <Container>
          <Navbaree />
          <Customs />
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
