import React, { Component } from 'react';
// import { Table } from 'react-bootstrap';
// import { Button, ButtonToolbar } from 'react-bootstrap';
import Navbar from './navbar';
import Login from './Login_4DM1N';



export default class ThemePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            reports: [],

        }
    }
    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://127.0.0.1:8000/admins/report')
            .then((response) => {
                console.log(response)
                return response.json()
            })
            .then((result) => {
                // console.log(result);
                this.setState({ reports: result })

            })
    }


    deletePost(postId) {
        if (window.confirm('Are you sure to validate this item ?')) {
            fetch('http://127.0.0.1:8000/admins/delete/report/' + postId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json())
                .then((res) => {
                    console.log(res);
                    this.refreshList();

                },
                    (error) => {
                        console.log(error);
                    })

        }
    }

    render() {
        var token = localStorage.getItem('tokenAdmin')
        console.log(token)
        if (token) {


            return (

                <div className="container">
                    <Navbar />
                    <div className="card">
                        <div className="row">
                            <div className="col-12">
                                <div>
                                    <table className="table" id="ipi-table">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>id</th>
                                                <th className="sorter-false">Email</th>
                                                <th className="sorter-false">Object</th>
                                                <th className="sorter-false">Message</th>
                                                <th className="filter-false">Validation</th>
                                            </tr>
                                        </thead>
                                        {this.state.reports.map((reports, i) =>
                                            <tbody>
                                                <tr>
                                                    <td>{reports.id}</td>
                                                    <td>{reports.email}</td>
                                                    <td>{reports.objet}</td>
                                                    <td>{reports.commentaire}</td>
                                                    <td><button onClick={() => this.deletePost(reports.id)} className="btn btn-danger" style={{ marginLeft: '5px' }} ><i className="fa fa-trash" style={{ fontSize: '15px' }} />X</button></td>
                                                </tr>
                                                <tr />
                                            </tbody>
                                        )}
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            )
        } else {

            return (
                <Login />
            )


        }


    }
}
