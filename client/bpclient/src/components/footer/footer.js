import React, { Component } from "react";
import './assets/css/footer.css';
import {  faPhone,faMapMarker,faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {faFacebookF, faTwitter, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons' ;
import './assets/bootstrap/css/bootstrap.min.css';

export default class Footer extends Component {

render() {
    return (

      <footer>
        <div className="row">
          <div className="col-sm-6 col-md-4 footer-navigation">
            <h3>BeProud</h3>
            <p className="links"><a href="#">Home</a><strong> · </strong><a href="#">Blog</a><strong> · </strong><a href="#">Pricing</a><strong> · </strong><a href="#">About</a><strong> · </strong><a href="#">Faq</a><strong> · </strong><a href="#">Contact</a></p>
            <p className="company-name">e-la3jeb Production © 2020</p>
          </div>
          <div className="col-sm-6 col-md-4 footer-contacts">
            <div className="social-links" ><span ><FontAwesomeIcon  icon={faMapMarker}/></span>
              <p><span className="new-line-span">14 rue, Fructidor</span>Saint Ouen 93400, France</p>
            </div>
            <div>
            <FontAwesomeIcon className="social-links" icon={faPhone}/>
              <p className="footer-center-info email text-left"> +33 7 66 03 42 06</p>
            </div>
            <div><FontAwesomeIcon className="footer-contacts-icon" icon={faEnvelope}/>
              <p> <a target="_blank=">idriss.zaouche@epitech.eu</a></p>
            </div>
            
          </div>
          <div className="clearfix" />
          <div className="col-md-4 footer-about">
            <h4>About the company</h4>
            <p> DU texte!</p>
            <div className="social-links social-icons"><a href="#"><FontAwesomeIcon icon={faFacebookF} /></a><a href="#"><FontAwesomeIcon icon={faTwitter} /></a><a href="#"><FontAwesomeIcon icon={faLinkedin} /></a><a href="#"><FontAwesomeIcon icon={faGithub} /></a></div>
          </div>
        </div>
      </footer>
    );
  }
  
};


