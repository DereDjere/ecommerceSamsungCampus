import React, { Component } from 'react'
import { Nav, Form, FormControl, Row, Col, NavDropdown, Navbar, Button, Container, InputGroup } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingBag, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Divider } from '@material-ui/core'

export default class Navbare extends Component {
    constructor(props) {
        super(props)
        this.state = {
            query: '',
        }
    }
    Search = function(){
        
        if(this.state.query != '')
        {
            var query = this.state.query

            window.location.href = `/catalogue?search=${query}`
        }
    }
    keyPress(e){
        
        if(e.keyCode == 13){
            e.preventDefault()
           
            if(this.state.query != '')
        {
            var query = this.state.query

            window.location.href = `/catalogue?search=${query}`
        }
        }
     }
    // componentDidMount() {
    //     fetch("http://localhost/search", {
    //         method: "GET",
    //         headers: {
    //             "Content-Type": "application/json",
    //             'Accept': "application/json"
    //         }
    //     }).then(response => response.json())
    //         .then(response => {
    //             console.log(response)
    //             this.setState({ articles: response })
    //         })
    // }

    // state = {
    //     query: "",
    //     articles: []
    // };

    // onChange = e => {
    //     const { value } = e.target;
    //     this.setState({
    //         query: value
    //     });

    //     this.search(value);
    // };

    // search = query => {
    //     const url = `http://localhost/api/search`;
    //     const token = {};
    //     this.token = token;

    //     fetch(url)
    //         .then(results => results.json())
    //         .then(data => {
    //             if (this.token === token) {
    //                 this.setState({ articles: data.results });
    //             }
    //         });
    // };

    // componentDidMount() {
    //     this.search("");
    // }

    render() {
    console.log(this.state.query)

        return (

            <Container expand="lg" fluid>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">Be Proud.</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav>
                                <NavDropdown title="Collection" id="basic-nav-dropdown" className="ml-5">
                                    <NavDropdown.Item href="/catalogue">All</NavDropdown.Item>
                                    <NavDropdown.Item href="/catalogue?search=femme">Women</NavDropdown.Item>
                                    <NavDropdown.Item href="/catalogue?search=homme">Men</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav >
                                <NavDropdown title="Designs" id="basic-nav-dropdown" className="ml-5">
                                    <NavDropdown.Item href="/designs">Catalogue Des Designs</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Nav>
                        <Form>
                            <InputGroup>
                                <FormControl
                                    placeholder="Search"
                                    aria-describedby="basic-addon2"
                                    onChange={text => this.setState({ query : text.target.value})}
                                    onKeyDown={e => this.keyPress(e)}
                                />
                                {/* {this.state.articles.map(l => (
                                    <ul key={l.titre}>
                                        <li>{l.titre}</li>
                                    </ul>
                                ))} */}
                                <InputGroup.Append>
                                    <Button className="mr-sm-2" variant="outline-dark" onClick={() => this.Search()}><FontAwesomeIcon icon={faSearch} /></Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </Form>
                        <br />
                    </Navbar.Collapse>
                </Navbar>
            </Container>
        )
    }
}
