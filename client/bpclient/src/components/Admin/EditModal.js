import React, { Component } from 'react';
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'


export default class EditModal extends Component {

    constructor(props) {
        super(props);
        console.log(props.postid)
        this.state = {
            data: [],
            snackbaropen: false,
            snackbarmsg: '',
            promotions: [],


        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {

        fetch('http://127.0.0.1:8000/admins/promotions')
            .then((response) => {
                // console.log(response)
                return response.json()
            })
            .then((result) => {
                // console.log(result);
                this.setState({ promotions: result })

            })

    }



    handleSubmit(event) {
        // alert('ok')
        console.log(event.target.value)
        var id = event.target.postId.value
        var idPromo;
        if(event.target.postReduction.value == 0){
            idPromo = null
        }
        if(event.target.postReduction.value == 15){
            idPromo = 1

        }
        if(event.target.postReduction.value == 30){
            idPromo = 2

        }
        if(event.target.postReduction.value == 50){
            idPromo = 3

        }

    //    alert(event.target.postReduction.value)

        event.preventDefault();
        fetch('http://127.0.0.1:8000/admins/article/' + id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: event.target.postId.value,
                colors: event.target.postColor.value,
                titre: event.target.postName.value,
                description: event.target.postDescribe.value,
                caracteristique: event.target.postCaract.value,
                // url_image_principal: event.target.postImage.value,
                prix: event.target.postPrice.value,
                promo_id: idPromo

            })
        })
            .then(res => res.json())
            .then((result) => {

                console.log(result);

                setTimeout(function(){ window.location.reload(); }, 2000);
                


            },
                (error) => {
                    console.log(error);
                })

    }



    render() {

        
        return (
            <div className="container">
                <Snackbar

                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    open={this.state.snackbaropen}
                    autoHideDuration={3000}
                    onClose={this.snackbarClose}

                    message={<span id="message-id">{this.state.snackbarmsg}</span>}
                    action={[
                        <IconButton
                            key="close"
                            arial-label="Close"
                            color="inherit"
                            onClick={this.snackbarClose}
                        >
                            X
                   </IconButton>
                    ]}
                />

                <Modal
                    {...this.props}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered

                >
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Edit Article
                       </Modal.Title>
                    </Modal.Header>

                    <Modal.Body>

                        <Row>
                            <Col sm={6}>
                                <Form onSubmit={this.handleSubmit}>

                                    <Form.Group controlId="postId">
                                        <Form.Label>Id</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="Id"
                                            disabled
                                            defaultValue={this.props.postid}
                                            placeholder="Article Id"
                                        />


                                    </Form.Group>
                                    {/* <Form.Group controlId="post">
                                        <Form.File id="Image" label="file img Article" />
                                    </Form.Group> */}

                                    <Form.Group controlId="postName">
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postName"
                                            required
                                            defaultValue={this.props.postname}
                                            placeholder="Name Article"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="postGenres">
                                        <Form.Label>Genres</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postGenres"
                                            disabled
                                            defaultValue={this.props.postgenres}
                                            placeholder="Genres"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="postColor">
                                        <Form.Label>Color</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postColor"
                                            required
                                            defaultValue={this.props.postcolor}
                                            placeholder="Colors"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="postDescribe">
                                        <Form.Label>Describe</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postDescribe"
                                            required
                                            defaultValue={this.props.postdescribe}
                                            placeholder="Description"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="postCaract">
                                        <Form.Label>Caract</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="postCaract"
                                            required
                                            defaultValue={this.props.postcaract}
                                            placeholder="Caractéristique"
                                        />
                                    </Form.Group>

                                    <Form.Group controlId="postPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control
                                            type="number"
                                            name="postPrice"
                                            required
                                            defaultValue={this.props.postprice}
                                            placeholder="Prix"
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="postReduction">
                                        <Form.Label>Reductions</Form.Label>
                                        <Form.Control
                                            as="select"
                                            name="postReduction"
                                            required
                                            defaultValue={this.props.postreductions}
                                            placeholder="stock"
                                        >
                                            <option>0</option>
                                            {this.state.promotions.map((promotion, i) =>
                                            <option>{promotion.reductions}</option>
                                                )}

                                        </Form.Control>

                                    </Form.Group>



                                    <Form.Group controlId="postSend">
                                        <Button variant="primary" onClick={this.props.onHide} type="submit">
                                            Save update
                                        </Button>
                                    </Form.Group>

                                </Form>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={this.props.onHide}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );

    }

}