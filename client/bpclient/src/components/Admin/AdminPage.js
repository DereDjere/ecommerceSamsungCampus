import React, { Component } from 'react'
import { Badge, Jumbotron, Alert } from 'react-bootstrap'
import $ from 'jquery';
import Navbar from './navbar';
import Login from './Login_4DM1N';
import axios from 'axios';






export default class AdminPage extends Component {

    constructor() {

        super();
        this.state={

            titre:"",
            description:"",
            caracteristique:"",
            prix:"",
            genres:"Men",
            colors: "Noir",
            url: null,
            categorie_id: "polo",
            stock: "",
            articleId: null,
            message: null,
            status: null,

        }

    }

    submit(){
        
        if(this.state.categorie_id == 'polo'){

            this.state.categorie_id = 3 ;
            
        }
        if(this.state.categorie_id == 'pull'){

            this.state.categorie_id = 2 ;
           

        }
        if(this.state.categorie_id == 't-shirt'){

            this.state.categorie_id = 1 ;
            

        }

        var data = this.state
        var url = this.state.url;
        delete data.url;

        
        console.log(data)
        // alert(url)
        fetch('http://127.0.0.1:8000/admins/create',{
            method:'post',
            body: JSON.stringify(data),
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'

            }
        })  .then(res => res.json())
            .then((res) => {
                this.setState({articleId : res})
            console.log(res);  
            this.addImageArticle(url);
            
        },
            (error) => {
                console.log(error);
            })



        
    }

    addImageArticle(url){
        
        const data = new FormData()
        data.append('url', url)
        // data.append('id', this.state.idDesign)
        let articleId = this.state.articleId;
    
    
        axios.post('http://127.0.0.1:8000/admins/article/image/' + articleId, data, {
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'multipart/form-data'
          },
        }
        ).then((data) => {
          console.log(data);
          if (data.status === 201) {
            // this.setState({ profile_img: true })
            this.setState({message: 'Artcicle has been add !'})
            this.setState({status: 'success'})
  
                  setTimeout(() => {
                      this.setState({
                          message: null,
                      })
                   }, 4000)

            setTimeout(function(){ window.location.href = '/admin/article'; }, 4000);

    
          } else if (data.status === 200) {
            // this.setState({ success: false })
          }
    
        })
    }


    render() {
        var token = localStorage.getItem('tokenAdmin')
        console.log(token)
        if (token){   return (
            

            <div id="wrapper">
                 <Navbar />
                 
                <nav className="navbar navbar-dark align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0">
                    <div className="container-fluid d-flex flex-column p-0">
                        <a className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0" href="#">
                            <div className="sidebar-brand-icon rotate-n-15"><i className="fas fa-laugh-wink" /></div>
                            <div className="sidebar-brand-text mx-3"><span>BeProud</span></div>
                        </a>
                        <hr className="sidebar-divider my-0" />
                        <ul className="nav navbar-nav text-light" id="accordionSidebar" />
                        <div className="text-center d-none d-md-inline"><button className="btn rounded-circle border-0" id="sidebarToggle" type="button" /></div>
                    </div>
                </nav>
                <Jumbotron>
                <div className="d-flex flex-column" id="content-wrapper">
                    <div id="content">
                        <nav className="navbar navbar-light navbar-expand bg-white shadow mb-4 topbar static-top">
                            <div className="container-fluid"><button className="btn btn-link d-md-none rounded-circle mr-3" id="sidebarToggleTop" type="button"><i className="fas fa-bars" /></button>
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
                                    <div className="d-none d-sm-block topbar-divider" />
                                    <li className="nav-item dropdown no-arrow" role="presentation">
                                        <div className="nav-item dropdown no-arrow"><a className="dropdown-toggle nav-link" data-toggle="dropdown" aria-expanded="false" href="#"><span className="d-none d-lg-inline mr-2 text-gray-600 small">Valerie Luna</span><img className="border rounded-circle img-profile" src="assets/img/avatars/avatar1.jpeg" /></a>
                                            <div className="dropdown-menu shadow dropdown-menu-right animated--grow-in" role="menu"><a className="dropdown-item" role="presentation" href="#"><i className="fas fa-cogs fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Settings</a>
                                                <div className="dropdown-divider" /><a className="dropdown-item" role="presentation" href="#"><i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />&nbsp;Logout</a></div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                        <div className="container">
                            <div>
                                
                                    <div className="form-group">
                                        <div id="formdiv">
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}><strong>Name</strong></p>
                                                </div>
                                                <div className="col-md-10 offset-md-1"><input className="form-control" type="text" style={{ marginLeft: '0px', fontFamily: 'Roboto, sans-serif' }} name="titre" placeholder="Name" onChange={(item)=>{this.setState({titre:item.target.value})}} /></div>
                                            </div>
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px', marginTop: '-16px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}><strong>Gender</strong></p>
                                                </div>
                                                <div className="col-md-10 offset-md-1"><select className="form-control" style={{ fontFamily: 'Roboto, sans-serif' }} name="genre" onChange={(item)=>{this.setState({genres:item.target.value})}}><optgroup label="This is a group"><option disabled selected>Select genre</option><option value={'Men'} selected>Men</option><option value={'Women'}>Women</option><option value={'Unisexe'}>Unisexe</option></optgroup></select></div>
                                            </div>
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px', marginTop: '-16px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}><strong>Colors</strong></p>
                                                </div>
                                                <div className="col-md-10 offset-md-1"><select className="form-control" style={{ fontFamily: 'Roboto, sans-serif' }} name="colors" onChange={(item)=>{this.setState({colors:item.target.value})}}><optgroup label="This is a group"><option disabled selected>Select colors</option><option value={'Noir'} selected>Noir</option><option value={'Blanc'}>Blanc</option><option value={'Rouge'}>Rouge</option></optgroup></select></div>
                                                
                                            </div>
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px', marginTop: '-16px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}><strong>Categories</strong></p>
                                                </div>
                                                <div className="col-md-10 offset-md-1"><select className="form-control" style={{ fontFamily: 'Roboto, sans-serif' }} name="colors" onChange={(item)=>{this.setState({categorie_id:item.target.value})}}><optgroup label="This is a group"><option disabled selected>Select categories</option><option value={'polo'} selected>polo</option><option value={'t-shirt'}>t-shirt</option><option value={'pull'}>pull</option></optgroup></select></div>
                                                
                                            </div>
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}><strong>Description</strong></p>
                                                </div>
                                                <div className="col-md-10 offset-md-1"><input className="form-control" type="text" style={{ marginLeft: '0px', fontFamily: 'Roboto, sans-serif' }} name="description" placeholder="description" onChange={(item)=>{this.setState({description:item.target.value})}}/></div>
                                            </div>
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}><strong>Caractéristique</strong></p>
                                                </div>
                                                <div className="col-md-10 offset-md-1"><input className="form-control" type="text" style={{ marginLeft: '0px', fontFamily: 'Roboto, sans-serif' }} name="caracteristique" placeholder="caracteristique" onChange={(item)=>{this.setState({caracteristique:item.target.value})}}/></div>
                                            </div>
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}><strong>Prix</strong></p>
                                                </div>
                                                <div className="col-md-10 offset-md-1"><input className="form-control" type="text" style={{ marginLeft: '0px', fontFamily: 'Roboto, sans-serif' }} name="prix" placeholder="prix" onChange={(item)=>{this.setState({prix:item.target.value})}}/></div>
                                            </div>
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <p style={{ marginLeft: '2%', fontFamily: 'Roboto, sans-serif', fontSize: '24px' }}><strong>Stock</strong></p>
                                                </div>
                                                <div className="col-md-10 offset-md-1"><input className="form-control" type="number" style={{ marginLeft: '0px', fontFamily: 'Roboto, sans-serif' }} name="prix" placeholder="Stock" onChange={(item)=>{this.setState({stock:item.target.value})}}/></div>
                                            </div>
                                            
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px' }}>
                                                <div className="col-md-8 offset-md-1">
                                                    <label htmlFor="avatar">Choose a profile picture:</label>
                                                    <input type="file" id="avatar" name="image_principal" accept="image/png, image/jpeg" onChange={(item)=>{this.setState({ url: item.target.files[0]})}} />
                                                </div>
                                            </div>
                                            <div className="form-row" style={{ marginRight: '0px', marginLeft: '0px', paddingTop: '24px' }}>
                                                <div className="col-12 col-md-4 offset-md-4"><button className="btn btn-light btn-lg" style={{ fontFamily: 'Roboto, sans-serif' }} type="reset">Clear </button><button onClick={()=>{this.submit()}} className="btn btn-light btn-lg" style={{ marginLeft: '16px' }}> Submit </button></div>
                                            </div>
                                            {this.state.message !== null
                      ?<div> <Alert variant={this.state.status} >{this.state.message} </Alert></div>
                      :null
                      }
                                        </div>
                                    </div>
                                
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                </Jumbotron><a className="border rounded d-inline scroll-to-top" href="#page-top"><i className="fas fa-angle-up" /></a></div>
                
        )}else{

            return(
                <Login />
            )


        }
     
    }

}
