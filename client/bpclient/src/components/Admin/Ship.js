import React from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Container, Col, Jumbotron, Alert } from 'react-bootstrap';
import Navbar from './navbar';
import { data } from 'jquery';
import Login from './Login_4DM1N';


const cellEditProp = {
    mode: 'click',

    afterSaveCell: (oldValue, newValue, row, column) => { afterSaveCell(oldValue, newValue, row, column) },

};

const selectRowProp = {
    mode: 'checkbox'
};

function onAfterInsertRow(row) {
    let newRowStr = '';

    for (const prop in row) {
        newRowStr += prop + ': ' + row[prop] + ' \n';
    }
    // alert('The new row is:\n ' + newRowStr);
}

function afterSaveCell(oldValue, newValue, row, column) {

    var id = oldValue.id;


    if (newValue == 'shipping_charges') {
        var data = {
            shipping_charges: row
        }
    } else if (newValue == 'name') {
        var data = {
            name: row
        }
    }


    fetch('http://127.0.0.1:8000/admins/shipping/update/' + id, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(res => res.json())
        .then((result) => {
            console.log(result);
              
            
        },
            (error) => {
                console.log(error);
            })

}
function onAfterDeleteRow(rowKeys) {
    // alert('The rowkey you drop: ' + rowKeys);
}

const options = {
    afterInsertRow: onAfterInsertRow,
    afterDeleteRow: onAfterDeleteRow
};



export default class Ship extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            shipping: [],
          


        }
    }

    componentDidMount() {

        fetch("http://127.0.0.1:8000/admins/shipping", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);

                this.setState({ shipping: response })

            })
    }

    data() {
        let products = [];

        {
            this.state.shipping.map((l, i) => (


                products.push({
                    id: l.id,
                    name: l.name,
                    shipping_charges: l.shipping_charges,
                    updated: l.updated_at

                })

            ))
        }

        return products;
    }

    render() {

        var token = localStorage.getItem('tokenAdmin')
        console.log(token)
        if (token){

        return (
            <Container fluid>
                <Navbar />
                <Jumbotron>
                <h1>Ship Costs</h1>
                <Col xs={12} md={12} lg={12}>
                    <BootstrapTable data={this.data()} cellEdit={cellEditProp} insertRow={true} deleteRow={true} selectRow={selectRowProp} options={options} pagination = {true} >
                        <TableHeaderColumn dataField='id' isKey>ID</TableHeaderColumn>
                        <TableHeaderColumn dataField='name'>Country/Region</TableHeaderColumn>
                        <TableHeaderColumn dataField='shipping_charges'>Cost</TableHeaderColumn>
                        <TableHeaderColumn dataField='updated'>Updated At</TableHeaderColumn>
                    </BootstrapTable>

                </Col>
                </Jumbotron>

            </Container>
        )}else{

            return(
                <Login />
            )


        }
    }
}
