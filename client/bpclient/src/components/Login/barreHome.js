import React,{Component} from 'react'
import { Col,  Button, Container, Breadcrumb } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import Panier from '../PanierPage/DropPanier';

import './style.css';

class barreHome extends Component {
    render() {
       
        return (
            <Container fluid>
                <Breadcrumb>
                    <Col md>
                        <Button href="/login" variant="outline-dark" className=""  >
                            <FontAwesomeIcon icon={faUser} />
                        </Button>
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
export default barreHome