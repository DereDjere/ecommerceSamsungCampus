import React, { Component } from 'react'
import { Nav, Form, FormControl, Row, Col, Dropdown, NavDropdown, Navbar, Button, Container, Breadcrumb, Jumbotron, Table } from 'react-bootstrap'
import { PDFDownloadLink } from "@react-pdf/renderer";
import { PdfDocument } from "./Facture";
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    FacebookIcon,
} from "react-share";

import Navbaree from '../Home/Navbar';
import BarreHome from '../Home/BarreHome';
import Footer from '../footer/footer';
/* import './css/main.css';
import './css/util.css'; */
export default class MyCommandsPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            detail: [],
            sameCommands: [],
            OtherCommands: [],
            search: '',
            searchResult: [],
            searchBool: false,
        }
    }

    componentDidMount() {
        const token = localStorage.getItem('token');
        const products = JSON.parse(localStorage.getItem('products'));


        fetch('http://localhost:8000/mycommandes', {
            method: "POST",
            body: JSON.stringify({
                'token': token,

            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {
                console.log(response)
                if (!response.exception) {
                    this.setState({ detail: response })
                }
                else {
                    this.setState({ detail: null })
                }


            })

    }

    Render = () => {
        var shareUrl = window.location.href
        console.log(shareUrl)
        if (this.state.searchBool > 0) {
            return (this.state.searchResult.map((l, i) => (
                <tbody>
                    <tr key={i}>
                        <th data-title="Article">
                            {l.ref_commande}
                        </th>
                        <th data-title="Article">
                            {l.adress}
                        </th>
                        <th data-title="Adress">
                            {l.prix_total}
                        </th>
                        <th data-title="Job Title">
                            {l.created_at}
                        </th>
                        <th data-title="Location">
                            In shipment
                </th>
                        <th data-title="Location">
                            <FacebookShareButton
                                url='https://developers.facebook.com/docs/'
                                quote='Test Ecommerce SamsungCampus'

                            >
                                <FacebookIcon
                                    size={32}
                                    round />
                            </FacebookShareButton>

                            <PDFDownloadLink
                                document={<PdfDocument data={this.state.detail[i]} />}
                                fileName="facture-beproud.pdf"
                                style={{
                                    textDecoration: "none",
                                    padding: "10px",
                                    color: "#4a4a4a",
                                    backgroundColor: "#f2f2f2",
                                    border: "1px solid #4a4a4a"
                                }}
                            >
                                {({ blob, url, loading, error }) =>
                                    loading ? "Loading document..." : "Download Pdf"
                                }
                            </PDFDownloadLink>

                        </th>

                    </tr>
                </tbody>
            )))
        }
        else if (this.state.detail != null) {
            return (

                this.state.detail.map((l, i) => (
                    <tbody key={i}>
                        <tr>
                            <th data-title="Article">
                                {l.ref_commande}
                            </th>
                            <th data-title="Article">
                                {l.adress}
                            </th>
                            <th data-title="Adress">
                                {l.prix_total}
                            </th>
                            <th data-title="Job Title">
                                {l.created_at}
                            </th>
                            <th data-title="Location">
                                In shipment
                            </th>
                            <th data-title="Location">
                                <FacebookShareButton
                                    url='https://developers.facebook.com/docs/'
                                    quote='Test Ecommerce SamsungCampus'

                                >
                                    <FacebookIcon
                                        size={32}
                                        round />
                                </FacebookShareButton>
                                <PDFDownloadLink
                                    document={<PdfDocument data={this.state.detail[i]} />}
                                    fileName="facture-beproud.pdf"
                                    style={{
                                        textDecoration: "none",
                                        padding: "10px",
                                        color: "#4a4a4a",
                                        backgroundColor: "#f2f2f2",
                                        border: "1px solid #4a4a4a"
                                    }}
                                >
                                    {({ blob, url, loading, error }) =>
                                        loading ? "Loading document..." : "Download Pdf"
                                    }
                                </PDFDownloadLink>
                            </th>
                        </tr>
                    </tbody>
                ))

            )
        }
        else {
            return (<h4>Aucune commandes a etait effectuer</h4>)
        }

    }

    Search = () => {
        const token = localStorage.getItem('token');
        fetch('http://localhost:8000/mycommandes/search', {
            method: "POST",
            body: JSON.stringify({
                'token': token,
                'ref': this.state.search,

            }),
            headers: {
                "Content-Type": "application/json",
                'Accept': "application/json"
            }
        }
        ).then(response => response.json())
            .then(response => {
                console.log(response)
                this.setState({ searchResult: response })
                this.setState({ searchBool: true })
                console.log(this.state.searchBool)
                this.Render()

            })
    }

    render() {

        return (

            <Container fluid>
                <Navbaree />
                <BarreHome />
                <div class="limiter">
                    <div class="container-table100">
                        <input onChange={text => this.setState({ search: text.target.value })} type="text" placeholder="Numero de Reference" />
                        <button onClick={this.Search}>Search</button>
                        <Jumbotron>
                            <Table>
                                <thead>
                                    <tr>
                                        <th>
                                            REFERENCE COMMANDE
                                        </th>
                                        <th>
                                            Address
                                        </th>
                                        <th>
                                            Price
                                        </th>
                                        <th>
                                            DATE D'ACHAT
                                        </th>
                                        <th>
                                            Delivery tracking
                                        </th>
                                    </tr>
                                </thead>
                                {
                                    this.Render()
                                }
                            </Table>

                        </Jumbotron>
                    </div>
                    <script src="vendor/jquery/jquery-3.2.1.min.js"></script>

                    <script src="vendor/bootstrap/js/popper.js"></script>
                    <script src="vendor/bootstrap/js/bootstrap.min.js"></script>

                    <script src="vendor/select2/select2.min.js"></script>

                    <script src="js/main.js"></script>
                </div>
            </Container>

        )
    }
}