import React, { Component } from 'react'
import {  Col,  Button, Form } from 'react-bootstrap'
import './filter.css'


export default class FilterPhoto extends Component {

    constructor(props) {
        super(props)
        this.state = {
            categories: []
        }
    }
    componentDidMount()
    {
        fetch("http://127.0.0.1:8000/filter/categorie", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({ categories: response })
            })
    }

    render() {
        return (

            <Col className="btngirl filter-model" as={Button} variant="" xs={12} md={12} lg={12} href="">
                <Form>
                    <Form.Group controlId="filter">
                        <Form.Control as="select" name="genres" placeholder="genres">
                            <option>Genre</option>
                            <option>Homme</option>
                            <option>Femme</option>
                        </Form.Control>
                        <Form.Control as="select" name="colors" placeholder="colors">
                            <option>Colors</option>
                            
                        </Form.Control>
                        <Form.Control as="select" name="categories" placeholder="categories">
                            <option>Categories</option>
                            {this.state.categories.map((l, i) =>(
                                <option key={i}>{l.nameCategories}</option>
                            ))}
                        </Form.Control>
                        <Form.Control as="select" name="caracteristique" placeholder="caracterisque">
                            <option>Caracteristique</option>
                        </Form.Control>
                        <Form.Control as="select" name="disponibilite" placeholder="disponibilite">
                            <option>Disponibilite</option>
                        </Form.Control>
                    </Form.Group>

                </Form>
            </Col>
        )
    }
}
