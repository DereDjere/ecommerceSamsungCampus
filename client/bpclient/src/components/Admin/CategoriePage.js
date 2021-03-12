import React, { Component } from 'react';
// import { Table } from 'react-bootstrap';
 import { Jumbotron, Alert } from 'react-bootstrap';
import Navbar from './navbar';
import Login from './Login_4DM1N';



export default class CategoriesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            categories: [],
            nameCategories:'',
            message: null,
            status: null,
           
        }
    }
    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://127.0.0.1:8000/admins/categories')
            .then((response) => {
                // console.log(response)
                return response.json()
            })
            .then((result) => {
                // console.log(result);
                this.setState({ categories: result })
                
            })
        }

        submit(){
            console.log(this.state.nameCategories)

            fetch('http://127.0.0.1:8000/admins/create/categorie',{
                method:'post',
                body: JSON.stringify({
                    nameCategories: this.state.nameCategories,
                }),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
    
                }
            })  .then(res => res.json())
                .then((res) => {
                console.log(res);
                this.setState({message: 'categorie was been added !'})
                this.setState({status: 'success'})
      
                      setTimeout(() => {
                          this.setState({
                              message: null,
                          })
                       }, 4000)
                
                this.refreshList();
                
            },
                (error) => {
                    console.log(error);
                })
        }

        deletePost(postId) {
            
            if (window.confirm('Are you sure delete this item ?')) {
                fetch('http://127.0.0.1:8000/admins/delete/categorie/' + postId, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(res => res.json())
                .then((res) => {
                console.log(res); 
                this.setState({message: 'categorie was been delated !'})
                this.setState({status: 'warning'})
      
                      setTimeout(() => {
                          this.setState({
                              message: null,
                          })
                       }, 4000) 
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
      if (token){ 
          

        return (
            
    
      <div className="container">
           <Navbar />
           <Jumbotron>
      <div className="card">
        <div className="row table-topper align-items-center">
          <div className="col-4 text-left" style={{margin: '0px', padding: '5px 15px'}}><input type="text" className="search form-control" placeholder="New Categorie name" onChange={(item)=>{this.setState({nameCategories:item.target.value})}}/></div>
          <div className="col-4 text-center" style={{margin: '0px', padding: '5px 10px'}}><button className="btn btn-danger" onClick={()=>{this.submit()}} type="button">Add New Categorie</button></div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <table className="table" id="ipi-table">
                <thead className="thead-dark">
                  <tr>
                    <th>id</th>
                    <th className="sorter-false">categorie name</th>
                    <th className="filter-false">suppression</th>
                  </tr>
                </thead>
                {this.state.categories.map((categorie, i) =>
                <tbody>
                  <tr>
                <td>{categorie.id}</td>
                    <td>{categorie.nameCategories}</td>
                    <td><button  onClick={() => this.deletePost(categorie.id)} className="btn btn-danger" style={{marginLeft: '5px'}} ><i className="fa fa-trash" style={{fontSize: '15px'}}/>X</button></td>
                  </tr>
                  <tr />
                </tbody>
                )}
              </table>
              {this.state.message !== null
                      ?<div> <Alert variant={this.state.status} >{this.state.message} </Alert></div>
                      :null
                      }
            </div>
          </div>
        </div>
      </div>
      </Jumbotron>
    </div>
   
        )}else{

          return(
              <Login />
          )


      }


    }
}
