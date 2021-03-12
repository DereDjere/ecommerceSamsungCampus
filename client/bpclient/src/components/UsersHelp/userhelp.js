import React, { Component } from 'react'
import { Form, Button, Container, Alert, Card, CardColumns, Row, Jumbotron } from 'react-bootstrap'
import { Redirect } from 'react-router';
import axios from 'axios'
import './style.css';


export default class userinterface extends Component {

    constructor(props) {
        super(props);

        this.state = {

            objet: '',
            commentaire: '',
            email: '',
            sucess : false,
        }
    }

    Submit() {
        
        fetch('http://127.0.0.1:8000/users/report', {
            method: 'post',
            body: JSON.stringify({
                objet: this.state.objet,
                commentaire: this.state.commentaire,
                email: this.state.email,

            }),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }
        }).then(res => res.json())
            .then((res) => {
                console.log(res);

                this.setState({sucess : true})                
            },
                (error) => {
                    console.log(error);
                })
    }
    render() {
        if(this.state.sucess == true)
        {
            return (
                <Container fluid>
                    <Jumbotron>
                        <Form>
                            <Row>
                            <h4 className="YourAccount">Thanks , an answer will be given to you as soon as possible, please check the email box you provided to us when you reported</h4>
                            </Row>
                        </Form>
                    </Jumbotron>
                </Container>
            )
        }
        else
        {
            return (
            <Container fluid>
                <Jumbotron>
                    <Form>
                        <h4 className="YourAccount">Help and Report</h4>
                        <Row className="text-center">
                            <p>To contribute to our site, you can report if a problem occurs during your visit to our site.
                            this will bring a great help to the improvement of our site and will provide you with a better stability during your next visit.
                        Thank you, BeProud Production</p>
                            <h6>Email</h6>
                            <input className="form-control" type="email" id="email" name="email" required size="10" onChange={text => this.setState({ email: text.target.value })}></input>
                            <h6>Report Object</h6>
                            <input className="form-control" type="text" id="objet" name="objet" required size="10" onChange={text => this.setState({ objet: text.target.value })} ></input>

                            <h6>Report message</h6>
                            <input className="form-control messageHelp" type="text" id="commentaire" name="commentaire" required size="10" height="50" onChange={text => this.setState({ commentaire: text.target.value })}></input>
                            <Button onClick={() => this.Submit()}>Send</Button>
                        </Row>
                    </ Form>
                </Jumbotron>
            </Container>
        )
        }
        
        
    }
}