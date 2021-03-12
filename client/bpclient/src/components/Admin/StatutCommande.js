import React, { Component } from 'react'
import { Badge, Jumbotron } from 'react-bootstrap'
import $ from 'jquery';
import Navbar from './navbar';
import Login from './Login_4DM1N';







export default class StatutCommande extends Component {

  constructor() {

    super();
    this.state = {
      commandePrepa: [],
      commandeEnCours: [],
      commandeLivre: [],
      randomNumber: 0,



    }

  }


  componentDidMount() {

    var number = Math.floor(Math.random() * 1000000000);
    this.setState({ randomNumber: number })


    fetch("http://127.0.0.1:8000/admin/commande/status/prepa", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({ commandePrepa: response })

      })


    fetch("http://127.0.0.1:8000/admin/commande/status/livraison", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({ commandeEnCours: response })

      })

    fetch("http://127.0.0.1:8000/admin/commande/status/livre", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({ commandeLivre: response })

      })
  }

  statusLivraison(id) {
    // alert(test)
    // console.log(test)

    fetch("http://127.0.0.1:8000/admin/commande/status/update/livraison/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        this.componentDidMount();

        // this.setState({ commandeLivre: response })

      })
  }
  statusLivraisonSecond(id) {
    // alert(test)
    // console.log(test)

    fetch("http://127.0.0.1:8000/admin/commande/status/update/livraison/livre/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        this.componentDidMount();

        // this.setState({ commandeLivre: response })

      })
  }


  statusLivraisonDelete(id) {
    // alert(test)
    // console.log(test)

    fetch("http://127.0.0.1:8000/admin/commande/status/terminer/" + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);
        this.componentDidMount();

        // this.setState({ commandeLivre: response })

      })
  }

  render() {
    var token = localStorage.getItem('tokenAdmin')
    console.log(token)
    if (token) {

      return (

        <div id="wrapper">
          <Navbar />
          <Jumbotron>
          <div className="container">
            <div className="row">
              <div className="col-md-10 col-md-offset-1">
                <div className="panel panel-default panel-table">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col col-xs-6">
                        <h3 className="panel-title">Commande en cours de préparation</h3>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <table className="table table-striped table-bordered table-list">

                      <thead>
                        <tr>
                          <th className="hidden-xs">ID</th>
                          <th>N*Commande</th>
                          <th>Adresse</th>
                          <th>Nom Client</th>
                          <th>Prix</th>
                          <th><em className="fa fa-cog">Validation</em></th>
                        </tr>
                      </thead>

                      {this.state.commandePrepa.map((post, i) =>
                        <tbody>
                          <tr>
                      <td className="hidden-xs">{post.id}</td>
                            <th>{post.ref_commande}</th>
                            <th>{post.adress}</th>
                            <th>{post.firstname}</th>
                            <th>{post.prix_total}</th>
                            <td align="center">
                              <a className="btn btn-success" onClick={() => this.statusLivraison(post.id)}  >
                                <em className="fa fa-check" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
                <div className="panel panel-default panel-table">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col col-xs-6">
                        <h3 className="panel-title">Commande en cours de livraison</h3>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <table className="table table-striped table-bordered table-list">
                      <thead>
                        <tr>
                          <th className="hidden-xs">ID</th>
                          <th>N*Commande</th>
                          <th>Adresse</th>
                          <th>Nom Client</th>
                          <th>Prix</th>
                          <th>Livreur</th>
                          <th>N* livraison/Livreur</th>
                          <th>Emplacement</th>
                        </tr>
                      </thead>
                      {this.state.commandeEnCours.map((post, i) =>
                        <tbody>
                          <tr>
                            <th className="hidden-xs">ID</th>
                            <th>{post.ref_commande}</th>
                            <th>{post.adress + '-->' + post.country}</th>
                            <th>{post.firstname}</th>
                            <th>{post.prix_total}</th>
                            <th>Mr. Moulaga</th>
                            <th>{this.state.randomNumber}</th>
                            <th>Loin de la</th>
                          </tr>
                          <tr>
                            <td align="center">
                              <a className="btn btn-success" onClick={() => this.statusLivraisonSecond(post.id)}>
                                <em className="fa fa-check" />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      )}
                    </table>
                  </div>
                </div>
                <div className="panel panel-default panel-table">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="col col-xs-6">
                        <h3 className="panel-title">Commande livrée</h3>
                      </div>
                    </div>
                  </div>
                  <div className="panel-body">
                    <table className="table table-striped table-bordered table-list">
                      <thead>
                        <tr>
                          <th className="hidden-xs">ID</th>
                          <th>N*Commande</th>
                          <th>Adresse</th>
                          <th>Nom Client</th>
                          <th>Prix</th>
                          <th>Livreur</th>
                          <th>N* livraison/Livreur</th>
                          <th>Emplacement</th>
                        </tr>
                      </thead>
                      {this.state.commandeLivre.map((post, i) =>

                      <tbody>
                        <tr>
                          <td className="hidden-xs">1</td>
                          <th className="hidden-xs">ID</th>
                          <th>{post.ref_commande}</th>
                          <th>{post.adress + '-->' + post.country}</th>
                          <th>{post.firstname}</th>
                          <th>{post.prix_total}</th>
                          <th>Mr.Moulaga</th>
                          <th>{this.state.randomNumber}</th>
                          <th>arrivé a destination</th>
                          <td align="center">
                            <a className="btn btn-danger" onClick={() => this.statusLivraisonDelete(post.id)}>
                              <em className="fa fa-trash" />
                            </a>
                          </td>
                        </tr>
                      </tbody>
                      )}

                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </Jumbotron>
        </div>
      )
    } else {

      return (
        <Login />
      )


    }

  }

}
