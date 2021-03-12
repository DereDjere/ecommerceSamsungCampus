    import React, { useState, useEffect } from 'react'
    import axios from 'axios';
    import { Container, Button, Col, Row } from 'react-bootstrap'
    import './homephoto.css'
    import { makeStyles } from '@material-ui/core/styles';
    import Grid from '@material-ui/core/Grid';
    import Paper from '@material-ui/core/Paper';
    import Typography from '@material-ui/core/Typography';
    import ButtonBase from '@material-ui/core/ButtonBase';

    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
        },
        paper: {
            padding: theme.spacing(2),
            margin: 'auto',
            maxWidth: 500,
        },
        image: {
            width: 128,
            height: 128,
        },
        img: {
            margin: 'auto',
            display: 'block',
            maxWidth: '100%',
            maxHeight: '100%',
        },
    }));

    const InlineProducts = () => {
        const [ProductsArray, setProductsArray] = useState([])
        const [ProductsArray2, setProductsArray2] = useState([])

        useEffect(() => {
            (async () => {
                await axios.get(`http://localhost:8000/home/1`).then(data => {
                    console.log(data[0])   
                if (data.status == 200) {
                        for (let v = 0; v < 3; v++) {
                            var img = data.data.data[v]
                            setProductsArray(ProductsArray => [...ProductsArray, img])
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
                await axios.get(`http://localhost:8000/home/2`).then(data => {
                    console.log(data[0], "je suis la ")   
                if (data.status == 200) {
                    console.log(data)
                        for (let v = 0; v < 3; v++) {
                            var img = data.data[v]
                            setProductsArray2(ProductsArray2 =>[... ProductsArray2 ,img])
                        }
                    }
                }).catch(error => {
                    console.log(error)
                })
            })();
        }, []);
        const classes = useStyles()
        return (
                <Row>
                    <Col sm={6} md={6} lg={6}>
                        {
                            ProductsArray.map((l, i) => (
                                <div key={i} className={classes.root}>
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <ButtonBase className={classes.image} href={`/article/${l.id}`}>
                                                    <img className={classes.img} alt="complex" src={l.url_image_principal} />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item lg container >
                                                <Grid item lg container direction="column" spacing={2}>
                                                    <Grid item lg>
                                                        <Typography gutterBottom variant="subtitle1">
                                                            {l.titre}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            {l.genres}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {l.description}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                            {l.colors}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1">{l.prix + '€'}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="outline-dark" href={`/article/${l.id}`}> See More</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <br />
                                </div>
                            ))
                        }
                    </Col>
                    <Col sm={6} md={6} lg={6}>
                        {
                            ProductsArray2.map((i, l) => (
                                <div key={i} className={classes.root}>
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={2}>
                                            <Grid item>
                                                <ButtonBase className={classes.image} href={`/article/${i.id}`}>
                                                    <img className={classes.img} alt="complex" src={i.url_image_principal} />
                                                </ButtonBase>
                                            </Grid>
                                            <Grid item lg container >
                                                <Grid item lg container direction="column" spacing={2}>
                                                    <Grid item lg>
                                                        <Typography gutterBottom variant="subtitle1">
                                                            {i.titre}
                                                        </Typography>
                                                        <Typography variant="body2" gutterBottom>
                                                            {i.genres}
                                                        </Typography>
                                                        <Typography variant="body2" color="textSecondary">
                                                            {i.description}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body2" style={{ cursor: 'pointer' }}>
                                                            {i.colors}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                                <Grid item>
                                                    <Typography variant="subtitle1">{i.prix + '€'}</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Button variant="outline-dark" href={`/article/${i.id}`}> See More</Button>
                                            </Grid>
                                        </Grid>
                                    </Paper>
                                    <br />
                                </div>
                            ))
                        }
                    </Col>
                </Row>
        )
    }

    export default InlineProducts;

