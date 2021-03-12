import React from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBPagination } from "mdbreact";
import { Container, Col, Row, FormControl, Button, Jumbotron, Alert } from 'react-bootstrap';
import InputNumber from 'rc-input-number';
import Select from 'react-select'
import Navbar from './navbar';
import Login from './Login_4DM1N';


import $ from 'jquery';

import './App.css';

const options = [
    { value: 'BeProudProduction', label: 'BeProudProduction' },
    { value: '92iproduction', label: '92iproduction' },
    { value: '94iproduction', label: '94iproduction' }
];

export default class Fournisseurs extends React.Component {

    constructor(props) {
        super(props);

        this.state = {

            posts: [],
            inputValue: '',
            inputReset: '',
            status:null,
            message:null,
            
        }
    }


    componentDidMount() {

        fetch("http://127.0.0.1:8000/home", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);

                this.setState({ posts: response })

            })
    }
   

    updateInputValue(evt) {
        console.log(evt)
        
        this.setState({
          inputValue: evt
        });
      }

       handleOnClick (id, stock)  {
           console.log(stock)
           console.log(id)

            
        // alert(this.state.inputValue)
        // this.setState({
        //     inputValue : ''
        // });
        // var b = $('.inputNumber').val()
        // alert(b)
        var sumStock = stock + this.state.inputValue;
        // alert(sumStock)


        fetch('http://127.0.0.1:8000/admins/update/stock/'+ id, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                stock: sumStock,
            })
        })
            .then(res => res.json())
            .then((result) => {
                console.log(result);

        this.setState({message: 'stock update !'})
          this.setState({status: 'success'})

                setTimeout(() => {
                    this.setState({
                        message: null,
                    })
                 }, 4000)
                
                this.componentDidMount();
            },
                (error) => {
                    console.log(error);
                })
    }


    render() {
        var token = localStorage.getItem('tokenAdmin')
        console.log(token)
        if (token){
            
       
        return (
            <Container fluid>
                <Navbar />
                <Jumbotron >
                <h1>Providers Commands</h1>
                <MDBContainer fluid>
                    <MDBRow>
                        <MDBCol className="cole" size="2">ID</MDBCol>
                        <MDBCol className="cole" size="2">NAME</MDBCol>
                        <MDBCol className="cole" size="2">STOCK</MDBCol>
                        <MDBCol className="cole" size="2">PROVIDERS</MDBCol>
                        <MDBCol className="cole" size="2">COMMANDS</MDBCol>
                    </MDBRow>
                    {this.state.message !== null
                      ?<div> <Alert variant={this.state.status} >{this.state.message} </Alert></div>
                      :null
                      }

                    {/* TU PEUX SUPP C"ETAIT POUR QUE TU VOIT  */}
                    
                    {/* <MDBRow>
                        <MDBCol className="col" size="2">42</MDBCol>
                        <MDBCol className="col" size="2">AzizTeeshirt</MDBCol>
                        <MDBCol className="col" size="2">1000000</MDBCol>
                        <MDBCol className="col" size="2"><Select className="select" options={options} /></MDBCol>
                        <MDBCol className="col" size="2"><InputNumber defaultValue={0} min={0} /></MDBCol>
                        <Button variant="success" onClick >Want !</Button>
                    </MDBRow>
                     */}
                    {this.state.posts.map((l, i) => (

                    <MDBRow key={i}>
                        <MDBCol className="col" size="2">{l.id}</MDBCol>
                        <MDBCol className="col" size="2">{l.titre}</MDBCol>
                        <MDBCol className="col" size="2">{l.stock}</MDBCol>
                        <MDBCol className="col" size="2"><Select className="select" options={options} /></MDBCol>
                        <MDBCol className="col" size="2"><InputNumber className="inputNumber"
                        value={this.state.inputReset} defaultValue={0} min={0} onChange={evt => this.updateInputValue(evt)} /></MDBCol>
                        <Button variant="success" onClick={() => { this.handleOnClick(l.id , l.stock) }} >Want !</Button>
                    </MDBRow>
                    
))}

                </MDBContainer>
                </Jumbotron>
            </Container>
        )}else{

            return(
                <Login />
            )


        }
    }
}
