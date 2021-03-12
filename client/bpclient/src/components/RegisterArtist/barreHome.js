import React, { Component } from 'react'
import { Breadcrumb, Container} from 'react-bootstrap'
import '../RegisterArtist/style.css';

export default class barreHome extends Component {
    render() {
        return (
            <Container fluid >
                <Container fluid>
                <Breadcrumb>
                    <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                    <Breadcrumb.Item active>RegisterArtist</Breadcrumb.Item>
                </Breadcrumb>
                </Container>
            </Container>
        )
    }
}
