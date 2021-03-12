import React, { Component } from 'react'
import { Breadcrumb, Container } from 'react-bootstrap'



export default class barreHome extends Component {
    render() {
        return (
            <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>Payement</Breadcrumb.Item>
                    <Breadcrumb.Item active>Guest</Breadcrumb.Item>
                </Breadcrumb>
            </Container>
        )
    }
}
