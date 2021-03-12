import React, { Component } from 'react'

// Be sure to include styles at some point, probably during your bootstraping
import '@trendmicro/react-sidenav/dist/react-sidenav.css';
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import $ from 'jquery';
// window.jQuery = $;
// window.$ = $;
// global.jQuery = $;

// Scripts
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/popper.min.js';
import 'bootstrap/dist/js/bootstrap.min.js';
// Styles
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'


export default class Navbar extends Component {



  componentDidMount() {

      this.navbar();

  }

  navbar() {
    let widthsidebar = $(window).width();
    
    if (widthsidebar >= 768) {
      $('.sidebar__navbar').addClass('active');
    }else{
      $('.sidebar__navbar').removeClass('active');
    }
  }

  // $(window).resize(function () {
  //   resizeWindow();
  // });

  navMenu(){
    $('.sidebar__navbar').toggleClass('active');

  }

  sidebar(){
    $('.sidebar__navbar').toggleClass('active');

  }



  
    render() {
        return (
          <div className="navabar__grub">
          <div onClick={() => { this.sidebar() }} className="sidebar__navbar active">
            <span />
            <div className="px-3 py-4 position-relative">
              <a href="#!" className="brand__sidebar d-block"><i className="fa fa-ravelry mr-2" aria-hidden="true" /> Admin Sidebar</a>
              <ul className="sidebar__list--menu mt-5">
                <li><a href="#!" className="active"><i className="fa fa-cube mr-2" aria-hidden="true" />My Dashboard</a></li>
                <li><a href="create"><i className="fa fa-video-camera mr-2" aria-hidden="true" />Add Article</a></li>
                <li><a href="validation"><i className="fa fa-list mr-2" aria-hidden="true" />New designs</a></li>
                <li><a href="article"><i className="fa fa-houzz mr-2" aria-hidden="true" />Update article</a></li>
                <li><a href="categorie"><i className="fa fa-houzz mr-2" aria-hidden="true" />Update categorie</a></li>
                <li><a href="ship"><i className="fa fa-houzz mr-2" aria-hidden="true" /> Shipping charges</a></li>
                <li><a href="fournisseurs"><i className="fa fa-houzz mr-2" aria-hidden="true" />Providers Commands</a></li>
                <li><a href="commande"><i className="fa fa-houzz mr-2" aria-hidden="true" />Commands</a></li>
                <li><a href="theme"><i className="fa fa-houzz mr-2" aria-hidden="true" />Themes</a></li>
                <li><a href="report"><i className="fa fa-houzz mr-2" aria-hidden="true" />Reports</a></li>
                <li><a href="statistique"><i className="fa fa-houzz mr-2" aria-hidden="true" />Tabs</a></li>
              </ul>
            </div>
          </div>
          <div className="sidebar__content">
            <nav className="navbar navbar-expand-md sidebar__side p-3">
              <a onClick={() => { this.navMenu() }} className="navabar__menu position-relative d-inline-block" href="#">
                <i className="fa fa-bars" aria-hidden="true" />
              </a>
            </nav>
            <section className="pt-0 px-3">
              <div className="text-center text-md-left">
                <ul className="ul__list--inline sosmed__list">
                </ul>
              </div>
            </section>
          </div>
        </div>
        )
        }
    }