import React, { Component } from 'react'
import { Container, Row, Col, Button, Form } from 'react-bootstrap'
import './filter.css'
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';

class ProductsInline extends Component {

    constructor(props) {
        super(props)
        this.state = {
            filter: [],
            filterOther: [],
            theme: [],
            genres: "",
            nameTheme: "",
            colors: "",
            caracteristique: "",
        }
    }
    componentDidMount() {
        this.state.filterOther = 'indisponible'

        fetch("http://127.0.0.1:8000/catalogue/design/all", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);

                this.setState({ filter: response })

            })
        fetch("http://127.0.0.1:8000/catalogue/design/theme", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
              
             
                this.setState({ theme: response })
            })
    }
    onSubmit = function () {


        // console.log(this.state.colors)
        // console.log(this.state.genres)
        // console.log(this.state.nameTheme)
        // console.log(this.state.caracteristique)



        if (this.state.nameTheme == 'Themes') {
            this.state.nameTheme = ''

            this.state.filterOther = 'indisponible'
            console.log('if');

            this.allProduct();

        }

        console.log('else')



        if (this.state.nameTheme == 'Themes') {
            this.state.nameTheme = ''

        }


        fetch("http://127.0.0.1:8000/catalogue/design/filter", {
            method: "POST",
            body: JSON.stringify({
                "nameTheme": this.state.nameTheme,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log(response);

                this.setState({ filterOther: response })
                console.log(this.state.filterOther)
                // this.allProduct();
            })


    }


    allProduct() {
        console.log(this.state.filterOther)
        if (this.state.filterOther == 'indisponible') {
            return (
                this.state.filter.map((l, i) => (
                    <Col key={i} md={4} lg={4}>
                        <Grid container md={12} lg={12} >
                            <Paper className>
                                <Grid item >
                                    <ButtonBase className="photos" href={`/design/${l.id}`}>
                                        <img className alt="complex" src={l.url} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item lg container key={i}>
                                    <Grid item md lg container direction="column" spacing={2}>
                                        <Grid item lg>
                                            <Typography gutterBottom color="primary" variant="subtitle1">
                                                {l.name_design}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" style={{ cursor: 'pointer' }}>
                                                {l.colors}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item>
                                        <Typography color="error" variant="h6">{l.prix + '€'}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <br />
                                    <Button block variant="danger" href={`/design/${l.id}`}> See More</Button>
                                </Grid>
                            </Paper>
                        </Grid>
                        <br />
                    </Col>
                ))

            )
        }

        else if (this.state.filterOther == '') {
            // alert('indisponible')
            return (
                <Col md={{ span: 4, offset: 4 }} className='result-all' >
                    <div className="result">
                        <div className='result-box' >
                            <img src={'https://as2.ftcdn.net/jpg/00/38/91/47/500_F_38914734_tkGYZsRkH4a1VL5sQ9PQkvGXFMRzAWiu.jpg'} />
                        </div>

                    </div>
                </Col>
            )
        }
        else {
            return (
                this.state.filterOther.map((l, i) => (
                    <Col key={i} md={4} lg={4}>
                        <Grid container md={12} lg={12} >
                            <Paper className>
                                <Grid item >
                                    <ButtonBase className="photos" href={`/design/${l.id}`}>
                                        <img className alt="complex" src={l.url} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item lg container key={i}>
                                    <Grid item md lg container direction="column" spacing={2}>
                                        <Grid item lg>
                                            <Typography gutterBottom color="primary" variant="subtitle1">
                                                {l.name_design}
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Typography color="error" variant="h6">{l.prix + '€'}</Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <br />
                                    <Button block variant="danger" href={`/design/${l.id}`}> See More</Button>
                                </Grid>
                            </Paper>
                        </Grid>
                        <br />
                    </Col>
                ))

            )
        }
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col className="filter-model" variant="" xs={12} sm={12} md={12} lg={12} href="">
                        <Form className="form-filter">
                            <Form.Group controlId="filter">
                                <Container fluid>
                                    <Row>
                                        <Col md={2}>
                                            <Form.Control as="select" name="categories" placeholder="categories" onChange={select => this.setState({ nameTheme: select.target.value })}>
                                                <option>Themes</option>
                                                {this.state.theme.map((l, i) => (
                                                    <option key={i}>{l.nameTheme}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Button variant="primary" onClick={() => { this.onSubmit() }}>
                                                Search
                                </Button>
                                            <Button variant="primary" onClick={() => { this.componentDidMount() }}>
                                                Tous nos produits
                                </Button>
                                        </Col>
                                    </Row>
                                </Container>
                            </Form.Group>
                        </Form>
                        <br />
                        <Container fluid>
                            <Row >
                                {this.allProduct()}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>


        )
    }
}
export default ProductsInline;
