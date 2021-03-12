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
            categories: [],
            genres: "",
            nameCategories: "",
            colors: "",
            caracteristique: "",
        }
    }
    componentDidMount() {
        this.state.filterOther = 'indisponible'
        let search = window.location.search;
        let params = new URLSearchParams(search);
        let filter = params.get('search');
        let woman = params.get('woman');
        let men = params.get('men');
        console.log(woman);
        if (filter !== null ) {
            alert('ok');
            fetch("http://127.0.0.1:8000/article/search", {
                method: "POST",
                body: JSON.stringify({
                    "filter": filter,
                }),
                headers: {
                    "Content-Type": "application/json",
                    'Accept': "application/json"
                }
            }).then(response => response.json())
                .then(response => {
                    console.log(response);

                    this.setState({ filter: response })

                })
        }
        else {
            
            fetch("http://127.0.0.1:8000/api/article/all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    'Accept': "application/json"
                }
            }).then(response => response.json())
                .then(response => {
                    // alert('yesss')
                    console.log(response);

                    this.setState({ filter: response })

                })
        }
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
    onSubmit = function () {


        // console.log(this.state.colors)
        // console.log(this.state.genres)
        // console.log(this.state.nameCategories)
        // console.log(this.state.caracteristique)

        if (this.state.colors == 'Colors') {
            this.state.colors = ''

            if (this.state.genres == 'Genres') {
                this.state.genres = ''

                if (this.state.nameCategories == 'Categories') {
                    this.state.nameCategories = ''

                    this.state.filterOther = 'indisponible'
                    console.log('if');

                    this.allProduct();

                }

            }

        }
        console.log('else')

        if (this.state.colors == 'Colors') {
            this.state.colors = ''

        } else if (this.state.genres == 'Genre') {
            this.state.genres = ''

        } else if (this.state.nameCategories == 'Categories') {
            this.state.nameCategories = ''

        } else if (this.state.caracteristique == 'Caracteristique') {
            this.state.caracteristique = ''

        }


        fetch("http://127.0.0.1:8000/filter", {
            method: "POST",
            body: JSON.stringify({
                "genres": this.state.genres,
                "nameCategories": this.state.nameCategories,
                "colors": this.state.colors,
                "caracteristique": this.state.caracteristique
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                console.log('response');

                console.log(response);

                this.setState({ filterOther: response })
                console.log(this.state.filterOther)
                // this.allProduct();
            })


    }


    verifPromo(reduction, prix) {
    // console.log(130 - 130*(20/100) )
// console.log(reduction)
// console.log(prix)

let prixReduit = prix - prix*(reduction/100);



return(
<div>
    
    <del><Typography color="error" variant="h6">{prix + '€'}</Typography></del>
    <Typography color="error" variant="h6">{prixReduit + '€'}</Typography>
</div>
)
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
                                    <ButtonBase className="photos" href={`/article/${l.id}`}>
                                        <img className alt="complex" src={l.url_image_principal} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item lg container key={i}>
                                    <Grid item md lg container direction="column" spacing={2}>
                                        <Grid item lg>
                                            <Typography gutterBottom color="primary" variant="subtitle1">
                                                {l.titre}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom color="textSecondary">
                                                {l.genres}
                                            </Typography>
                                            <Typography variant="body1" >
                                                {l.description}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" style={{ cursor: 'pointer' }}>
                                                {l.colors}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item>
                                        {l.reductions !== null ?
                                        this.verifPromo(l.reductions, l.prix)
                                        :
                                        <Typography color="error" variant="h6">{l.prix + '€'}</Typography>


                                        }
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <br />
                                    <Button block variant="danger" href={`/article/${l.id}`}> See More</Button>
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
                                    <ButtonBase className="photos" href={`/article/${l.id}`}>
                                        <img className alt="complex" src={l.url_image_principal} />
                                    </ButtonBase>
                                </Grid>
                                <Grid item lg container key={i}>
                                    <Grid item md lg container direction="column" spacing={2}>
                                        <Grid item lg>
                                            <Typography gutterBottom color="primary" variant="subtitle1">
                                                {l.titre}
                                            </Typography>
                                            <Typography variant="body1" gutterBottom color="textSecondary">
                                                {l.genres}
                                            </Typography>
                                            <Typography variant="body1" >
                                                {l.description}
                                            </Typography>
                                        </Grid>
                                        <Grid item>
                                            <Typography variant="body1" style={{ cursor: 'pointer' }}>
                                                {l.colors}
                                            </Typography>
                                        </Grid>

                                    </Grid>
                                    <Grid item>
                                    {l.reductions !== null ?
                                        this.verifPromo(l.reductions, l.prix)
                                        :
                                        <Typography color="error" variant="h6">{l.prix + '€'}</Typography>


                                        }
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <br />
                                    <Button block variant="danger" href={`/article/${l.id}`}> See More</Button>
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
                                            <Form.Control as="select" name="genres" placeholder="genres" onChange={select => this.setState({ genres: select.target.value })}>
                                                <option>Genre</option>
                                                <option>Homme</option>
                                                <option>Femme</option>
                                                <option>Unisex</option>
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as="select" name="colors" placeholder="colors" onChange={select => this.setState({ colors: select.target.value })}>
                                                <option>Colors</option>
                                                <option>red</option>
                                                <option>jaune</option>
                                                <option>noir</option>
                                                <option>bleu</option>
                                                <option>blanc</option>


                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as="select" name="categories" placeholder="categories" onChange={select => this.setState({ nameCategories: select.target.value })}>
                                                <option>Categories</option>
                                                {this.state.categories.map((l, i) => (
                                                    <option key={i}>{l.nameCategories}</option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as="select" name="caracteristique" placeholder="caracterisque" onChange={select => this.setState({ caracteristique: select.target.value })}>
                                                <option>Caracteristique</option>
                                            </Form.Control>
                                        </Col>
                                        <Col md={2}>
                                            <Form.Control as="select" name="disponibilite" placeholder="disponibilite">
                                                <option>Disponibilite</option>
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
