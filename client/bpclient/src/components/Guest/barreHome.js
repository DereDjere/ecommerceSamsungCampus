import React, { Component } from 'react'
import { Nav, Form, FormControl, Row, Col, NavDropdown, Navbar, Button, Container, Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingBag, faSearch } from '@fortawesome/free-solid-svg-icons'

export default class barreHome extends Component {
    render() {
        return (
            <Container fluid>
                <Breadcrumb>
                    <Col md>
                        <Button href="/login" variant="outline-dark" className=""  >
                            <FontAwesomeIcon icon={faUser} />
                        </Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button variant="outline-dark"
                            href="/panier"
                            className=""
                        >
                            <FontAwesomeIcon icon={faShoppingBag} />
                        </Button>
                    </Col>
                </Breadcrumb>
            </Container>
        )
    }
}
