import React, { Component } from 'react'
import { Nav, Form, FormControl, Row, Col, Dropdown, NavDropdown, Navbar, Button, Container, Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart, faSearch } from '@fortawesome/free-solid-svg-icons'
import Panier from '../PanierPage/DropPanier';

import './style.css';

class barreHome extends Component {

    handleLogout = e => {
        localStorage.removeItem('token')
        localStorage.removeItem('tokenArtist')
        localStorage.removeItem('tokenAdmin')
        localStorage.removeItem('email')
        window.location.reload()
    }

    render() {
        const token = localStorage.getItem('token')
        const tokenArtist = localStorage.getItem('tokenArtist')
        if (token || tokenArtist) {
            return (
                <Container fluid>
                    <Breadcrumb>
                        <Col md>
                            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown" className="ml-5">
                                <NavDropdown.Item href="/userinterface" variant="outline-dark" className=""  >
                                    My Account
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/mycommands" variant="outline-dark" className=""  >
                                    My Commands
                                </NavDropdown.Item>
                                <NavDropdown.Item onClick={this.handleLogout} variant="outline-dark" className=""  >
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="dropdown">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <div className="dropdown-content">
                                    <Panier />
                                </div>
                            </div>
                            <Button className="btnback" href="javascript:history.go(-1)">
                                Go Back
                    </Button>
                       </Col>
                    </Breadcrumb>
                </Container >
            )
        }
        else {
            return (
                <Container fluid>
                    <Breadcrumb>
                        <Col md>
                            <NavDropdown title={<FontAwesomeIcon icon={faUser} />} id="basic-nav-dropdown" className="ml-5">
                                <NavDropdown.Item href="/userinterface" variant="outline-dark" className=""  >
                                    My Account
                                </NavDropdown.Item>
                            </NavDropdown>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <div className="dropdown">
                                <FontAwesomeIcon icon={faShoppingCart} />
                                <div className="dropdown-content">
                                    <Panier />
                                </div>
                            </div>

                        </Col>
                    </Breadcrumb>
                </Container >
            )
        }

    }
}
export default barreHome