import React, { Component } from 'react'
import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import Footer from '../footer/footer';
import Panier from './Panier';


export default class FullPanier extends Component {


    render() {
      return (
        <div>
          <div>
          <Navbaree />
          <BarreHome/>
          <Panier/>
        </div>
        <Footer/>
</div>
      )
    }
  }
  