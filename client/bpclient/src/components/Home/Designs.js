import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Container, Col, Row, Button } from 'react-bootstrap'
import Carousel from 'react-bootstrap/Carousel'
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
        padding: theme.spacing(5),

        margin: 10,
        /* maxHeight: 100, */
    },
    image: {
    },
    img: {
        margin: 'auto',
        display: 'block',
        maxWidth: '150px',
        maxHeight: '150px',
    },
}));

const Designs = () => {
    const [DesignsArray, setDesignsArray] = useState([])
    const [Open, setOpen] = useState(true)

    useEffect(() => {
        (async () => {
            await axios.get(`http://localhost:8000/home/designs`).then(data => {
                if (data.status == 200) {

                    for (let v = 0; v < data.data.length; v++) {
                        var img = data.data[v]
                        console.log(img)
                        setDesignsArray(DesignsArray => [...DesignsArray, img])
                    }

                }
            }).catch(error => {
                console.log(error)
            })
        })();
    }, []);
    const classes = useStyles()

    return (
        <Container fluid>
            <Row>
                {/* <Col sm={6} md={6} lg={6}>
                    {
                        DesignsArray.map((l, i) => (
                            <div key={i.id} className={classes.root}>
                                <Paper className={classes.paper}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <ButtonBase className={classes.image} href={`/designs/${i.id}`}>
                                                <img className={classes.img} alt="complex" src={i.url} />
                                            </ButtonBase>
                                        </Grid>
                                        <Grid item lg container key={i}>
                                            <Grid item lg container direction="column" spacing={2}>
                                                <Grid item lg>
                                                    <Typography gutterBottom variant="subtitle1">
                                                        {i.name_design}
                                                    </Typography>
                                                 </Grid>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle1">{i.prix + '€'}</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item>
                                            <Button variant="outline-dark" href={`/designs/${i.id}`}> See More</Button>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </div>
                        ))
                    }
                </Col> */}
                {
                    DesignsArray.map((l, i) => (

                     
                        
                        <Col key={i} className={classes.root} md={4}>
                            <Paper className={classes.paper}>
                                <Grid container spacing={2} >
                                    <Grid item>
                                        <ButtonBase className={classes.image} href={`/designs/${l.id}`}>
                                            <img className={classes.img} alt="complex" src={l.url} />
                                        </ButtonBase>
                                    </Grid>
                                    <Grid item lg container key={i}>
                                        <Grid item lg container direction="row" spacing={2}>
                                            <Grid item lg>
                                                <Typography gutterBottom variant="subtitle1">
                                                    {l.name_design}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item lg>
                                            <Typography variant="subtitle1">{l.prix + '€'}</Typography>
                                        </Grid>
                                    </Grid>
                                    <Grid item>
                                        <Button variant="outline-dark" href={`/designs/${l.id}`}> See More</Button>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Col>
                    ))
                } 
            </Row>
        </Container>
    )
}

export default Designs;