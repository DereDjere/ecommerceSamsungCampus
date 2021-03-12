import React, { Component } from 'react'
// import Navbare from './Navbar'
// import HomePhoto from './HomePhoto'
// import './homepage.css'
import { Router, Route, Switch } from "react-router-dom";
import { Badge, Alert } from 'react-bootstrap'
import qs from "query-string";
import Navbar from './navbar';
import Login from './Login_4DM1N';



export default class ValidationPage extends Component {

    constructor() {

        super();
        this.state={
              validation:"",
            posts: [],
            message:null,
            status:null,

        }

    }

    componentDidMount(){

      fetch('http://127.0.0.1:8000/admins/design/request')
      .then((response) => {
        console.log(response)
        return response.json()
      })
      .then((result) => {
        console.log(result);
        this.setState({ posts: result })
      })

    }

    queryStringParse = function(string) {
      let parsed = {}
      if(string != '') {
          string = string.substring(string.indexOf('?')+1)
          let p1 = string.split('&')
          p1.map(function(value) {
              let params = value.split('=')
              parsed[params[0]] = params[1]
          });
      }
      return parsed
  }

     handleClick(value){
var params = this.queryStringParse(this.props.location.search);

      var id = value.substring(3)
      var word = value.substring(0,3)
 
      if(word == 'Non'){

       
        fetch('http://127.0.0.1:8000/admins/design/'+ id + '/invalid')
        .then((response) => {

          this.setState({message: 'this design was been delated'})
          this.setState({status: 'warning'})
          
         
          return response.json()
        })

      setTimeout(function(){ window.location.reload(); }, 2000);

       
      }else if(word == 'Yes'){

        fetch('http://127.0.0.1:8000/admins/design/'+ id + '/valid')
        .then((response) => {

          return response.json()
    
      })
      .then((result) => {
          console.log(result);
          // alert('okkk')
          this.setState({message: 'this design was been accepted'})
          this.setState({status: 'success'})


      })
      setTimeout(function(){ window.location.reload(); }, 2000);
      
      }

    }


    


    render() {
      var token = localStorage.getItem('tokenAdmin')
      console.log(token)
      if (token){
          
        return (

            <div id="wrapper">
               <Navbar />
              
            <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
              <div className="container-fluid d-flex flex-column p-0">
                <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                  <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink" /></div>
                  <div className="sidebar-brand-text mx-3"><span>Brand</span></div>
                </a>
                <ul className="nav navbar-nav text-light" id="accordionSidebar">
                  <li className="nav-item" role="presentation"><a className="nav-link active" href="table.html"><i className="fas fa-table" /><span>Validation Design</span></a></li>
                </ul>
              </div>
            </nav>
            <div className="d-flex flex-column" id="content-wrapper">
              <div id="content">
                <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                  <div className="container-fluid">
                    <ul className="nav navbar-nav flex-nowrap ml-auto">
                      <li className="nav-item dropdown d-sm-none no-arrow"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#"><i className="fas fa-search" /></a>
                        <div className="dropdown-menu dropdown-menu-right p-3 animated--grow-in" role="menu" aria-labelledby="searchDropdown">
                          <form className="form-inline mr-auto navbar-search w-100">
                            <div className="input-group"><input className="bg-light form-control border-0 small" type="text" placeholder="Search for ..." />
                              <div className="input-group-append"><button className="btn btn-primary py-0" type="button"><i className="fas fa-search" /></button></div>
                            </div>
                          </form>
                        </div>
                      </li>
                      <li className="nav-item dropdown no-arrow" role="presentation">
                        <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#"><span className="d-none d-lg-inline mr-2 text-gray-600 small">Valerie Luna</span><img className="border rounded-circle img-profile" src="assets/img/avatars/avatar1.jpeg" /></a>
                          <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in" role="menu"><a className="dropdown-item" role="presentation" href="#"><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Settings</a>
                            <div className="dropdown-divider" /><a className="dropdown-item" role="presentation" href="#"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Logout</a></div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </nav>
                <div className="container-fluid">
                 
                  <div className="card shadow">
                  <h3 className="text-dark mb-4">Validation Design</h3>
                    <div className="card-header py-3">
                      <p className="text-primary m-0 font-weight-bold">Demande de validation des derniers Design</p>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6 text-nowrap">
                          <div id="dataTable_length" className="dataTables_length" aria-controls="dataTable"><label>Show&nbsp;<select className="form-control form-control-sm custom-select custom-select-sm"><option value={10} selected>10</option><option value={25}>25</option><option value={50}>50</option><option value={100}>100</option></select>&nbsp;</label></div>
                        </div>
                      </div>
                      <div className="table-responsive table mt-2" id="dataTable" role="grid" aria-describedby="dataTable_info">
                        <table className="table dataTable my-0" id="dataTable">
                          <thead>
                            <tr>
                              <th>Design</th>
                              <th>Artiste</th>
                              <th>Nom design</th>
                              <th>prix</th>
                              <th>Yes</th>
                              <th>No</th>
                            </tr>
                          </thead>
                          <tbody>
                          {this.state.posts.map((post, i) =>
                            <tr>
                              <td><img className="rounded-circle mr-2" width={150} height={150} src={post.url} /></td>
                              <td>{post.username}</td>
                              <td>{post.name_design}</td>
                              <td>{post.prix}</td>
                              <td><a href={'#?validation=' + post.id} onClick={()=>{this.handleClick('Yes'+post.id)}} className="btn btn-danger" style={{border: 'none', width: '151px', height: '58px', marginLeft: '14px', backgroundColor: '#4ddb94', color: 'rgb(255,255,255)', marginTop: '12px'}} type="button">Yes</a></td>
                              <td><a href={'#?refuse=' + post.id} onClick={()=>{this.handleClick('Non'+post.id)}} className="btn btn-danger" style={{border: 'none', width: '151px', height: '58px', backgroundColor: '#e86767'}} type="button">No</a></td>
                            </tr>
                          )}
                            
                          </tbody>
                          <tfoot>
                            <tr />
                          </tfoot>
                        </table>
                      </div>
                      {this.state.message !== null
                      ?<div> <Alert variant={this.state.status} >{this.state.message} </Alert></div>
                      :null
                      }
                     
                      <div className="row">
                        <div className="col-md-6 align-self-center">
                          <p id="dataTable_info" className="dataTables_info" role="status" aria-live="polite">Showing 2 to 10 of 27</p>
                        </div>
                        <div className="col-md-6">
                          <nav className="d-lg-flex justify-content-lg-end dataTables_paginate paging_simple_numbers">
                            <ul className="pagination">
                              <li className="page-item disabled"><a className="page-link" href="#" aria-label="Previous"><span aria-hidden="true">«</span></a></li>
                              <li className="page-item active"><a className="page-link" href="#">1</a></li>
                              <li className="page-item"><a className="page-link" href="#">2</a></li>
                              <li className="page-item"><a className="page-link" href="#">3</a></li>
                              <li className="page-item"><a className="page-link" href="#" aria-label="Next"><span aria-hidden="true">»</span></a></li>
                            </ul>
                          </nav>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <footer className="bg-white sticky-footer">
                <div className="container my-auto">
                  <div className="text-center my-auto copyright"><span>Copyright © Brand 2020</span></div>
                </div>
              </footer>
            </div><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a></div>
        )}else{

          return(
              <Login />
          )


      }
    }

}
