import React, { Component } from 'react'
import {
    Page,
    Text,
    View,
    Document,
    StyleSheet,
    Image
} from "@react-pdf/renderer";
import moment from "moment";

export class PdfDocument extends Component {

    constructor(props) {
        super(props);
        console.log(this.props.data)
        this.state = {
            article: [],
            design: [],
            prixTotal: '',
        }

    }

    componentDidMount() {
        // RECHERCHE DARTICLE SELON ID COMMANDES
        const token = localStorage.getItem('token');
        fetch('http://localhost:8000/mycommandes/facture/articles', {
            method: "POST",
            body: JSON.stringify({
                'token': token,
                'id_commands': this.props.data.id,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {

                this.setState({ article: response })
                console.log(this.state.article)

            })
        fetch('http://localhost:8000/mycommandes/facture/designs', {
            method: "POST",
            body: JSON.stringify({
                'token': token,
                'id_commands': this.props.data.id,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {
                var prix = 0
                this.setState({ design: response })
                this.setState({ prixTotal: prix })

            })
        fetch('http://localhost:8000/mycommandes/facture/price', {
            method: "POST",
            body: JSON.stringify({
                'token': token,
                'id': this.props.data.id,
            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {
                
                this.setState({ prixTotal: response[0].prix_total })
                console.log(this.state.prixTotal + ' test')

            })

    }

    render() {

        const styles = StyleSheet.create({
            page: {
                backgroundColor: '#ffffff'
            },
            info: {
                display: 'table'
            },
            prod: {
                whiteSpace: 'nowrap',
                float: 'left',
                textAlign: "left",
            },
            project: {
                float: 'right',
                textAlign: "right",
                display: 'inline-block',
                whiteSpace: 'nowrap',
            },
            title: {
                fontSize: 30,
                textAlign: 'center'
            },
            table: {



            },
            table_title: {
                display: 'flex',
                paddingTop: 10,
            },
            table_on_title: {
                borderWidth: 1,
            }
        })

        return (
            <Document>
                <Page>
                    <View style={styles.info}>
                        <View style={styles.prod}>
                            <Text>Be Proud PRODUCTION</Text>
                            <Text>4 rue de la fierter</Text>
                            <Text>75999</Text>
                        </View>

                        <View style={styles.project}>
                            <Text>{this.props.data.firstname} {this.props.data.lastname}</Text>
                            <Text>{this.props.data.adress}</Text>
                            <Text>{this.props.data.cp}</Text>
                            <Text>{this.props.data.city}</Text>
                            <Text>{this.props.data.country}</Text>
                        </View> 
                    </View>
                    <Text style={styles.title}>Facture BeProud Commands</Text>
                    <View style={styles.table}>
                        <Text style={styles.title}>Products</Text>
                        {this.state.article.map((l, i) => (
                            <View style={styles.table_title}>
                                <Text style={styles.table_on_title}>Products Name : {l.titre}</Text>
                                <Text style={styles.table_on_title}>Colors : {l.colors}</Text>
                                <Text style={styles.table_on_title}>Gender : {l.genres}</Text>
                                <Text style={styles.table_on_title}>Price : {l.prix}</Text>
                            </View>
                        ))}

                        <Text style={styles.title}>Designs</Text>
                        {this.state.design.map((l, i) => (
                            <View style={styles.table_title}>
                                <Text style={styles.table_on_title}>Designs Name : {l.name_design}</Text>
                                <Text style={styles.table_on_title}>Price : {l.prix}</Text>
                            </View>
                        ))}
                    </View>
                    <View>
                        <Text>PRIX TOTAL : {this.state.prixTotal}*</Text>
                        <Text>*frais de port inclus</Text>
                    </View>
                    <Text></Text>
                </Page>
            </Document>
        )
    }
}
