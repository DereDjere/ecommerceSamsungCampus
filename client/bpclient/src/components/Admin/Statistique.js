import React, { Component } from 'react'
import { Badge, Jumbotron, Container, Col, Row } from 'react-bootstrap'
import $ from 'jquery';
import Navbar from './navbar';
import Login from './Login_4DM1N';
import ReactToExcel from 'react-html-table-to-excel'
import './buttonExcel.css'





export default class AdminPage extends Component {

    constructor() {

        super();
        this.state = {
            excelClient: [],
            excelStockDesign: [],
            excelStockArticle: [],

        }

    }

    componentDidMount() {
        // alert('zebi')

        fetch("http://127.0.0.1:8000/admin/statistique", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                // alert('hallo')
                console.log(response);
                // alert(response);

                this.setState({ excelClient: response })

            })



        fetch("http://127.0.0.1:8000/admin/statistique/stock", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }).then(response => response.json())
            .then(response => {
                // alert('hallo')
                console.log(response);
                // alert(response);

                this.setState({ excelStockDesign: response.designStock })
                this.setState({ excelStockArticle: response.articleStock })

            })

    }

    hide(){
        $('.hide-div').hide()
    }


    render() {
        var token = localStorage.getItem('tokenAdmin')
        // console.log(token)
        if (token) {
            return (
                

                <div className='client'>
           <Navbar />

                    
                    <div className='hide-div'>
                    <table border="1" id="tab-excel-client">
                        <thead>
                            <tr style={{ color: 'red' }}>
                                <th>REF_COMMANDE</th>
                                <th>FIRSTNAME</th>
                                <th>LASTNAME</th>
                                <th>COUNTRY</th>
                                <th>EMAIL</th>
                                <th>ARTICLES</th>
                                <th>DESIGNS</th>
                                <th>PRIX_TTC</th>
                                <th>DATE</th>
                            </tr>
                        </thead>
                        {this.state.excelClient.map((l, i) => (
                            <tbody>

                                <tr>
                                    <td>{l.ref_commande}</td>
                                    <td>{l.firstname}</td>
                                    <td>{l.lastname}</td>
                                    <td>{l.country}</td>
                                    <td>{l.email}</td>
                                    <td>{l.titleArticle}</td>
                                    <td>{l.design}</td>
                                    <td>{l.prix_total + ' Euros'}</td>
                                    <td>{l.date }</td>
                                </tr>

                            </tbody>
                        ))}
                    </table>
                    </div>
                    <Jumbotron>

                    <Row className="justify-content-md-center">
                        
                    <ReactToExcel
                        table="tab-excel-client"
                        filename="excel-client-commande"
                        sheet="sheet 2"
                        buttonText='Commandes_excel'

                    />
                    </Row>

<br/>
<br/>
<br/>
                    <div className='hide-div'>
                        <table border="1" id="tab-excel-stock">
                            <thead>
                                <tr style={{ color: 'red' }}>
                                    <th>ARTICLES</th>
                                    {/* <th></th> */}
                                    <th>NAME_ARTICLE</th>
                                    <th>STOCK</th>
                                    <th>ARTICLE_VENDU</th>

                                </tr>
                            </thead>

                            {this.state.excelStockArticle.map((l, i) => (
                                <tbody>

                                    <tr>
                                        <td></td>
                                        <td>{l.name_article}</td>
                                        <td>{l.stock}</td>
                                        <td>{l.article_achete}</td>

                                    </tr>

                                </tbody>

                            ))}
                            <thead>
                                <tr>
                                    <th></th>

                                </tr>
                            </thead>
                            <thead>
                                <tr style={{ color: 'red' }} >
                                    <th>DESIGNS</th>
                                    <th>NAME_DESIGN</th>
                                    <th>DESIGNER</th>
                                    <th>DESIGN_VENDU</th>
                                </tr>
                            </thead>
                            {this.state.excelStockDesign.map((l, i) => (
                                <tbody>

                                    <tr>
                                        <td></td>
                                        {/* <td>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</td> */}
                                        <td>{l.name_design}</td>
                                        <td>{l.designer}</td>
                                        <td>{l.design_achete}</td>
                                    </tr>

                                </tbody>

                            ))}
                        </table>
                        </div>
                    <Row className="justify-content-md-center">

                       
                        <ReactToExcel
                            table="tab-excel-stock"
                            filename="excel-client-commande"
                            sheet="sheet 1"
                            buttonText='Stock_excel'
                            
                        />
                        
                        </Row>
                        </Jumbotron>
                       

                {this.hide()}
                    
                </div>




            )
        } else {

            return (
                <Login />
            )


        }

    }

}
