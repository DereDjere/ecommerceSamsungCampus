import React, { Component } from 'react';
// import { Table } from 'react-bootstrap';
import { Button, Jumbotron, Alert, Container } from 'react-bootstrap';
import Navbar from './navbar';
import Login from './Login_4DM1N';



export default class ThemePage extends Component {
    constructor(props) {
        super(props);

        this.state = {

            theme: [],
            nameTheme:'',
            message: null,
            status: null,
           
        }
    }
    componentDidMount() {
        this.refreshList();
    }

    refreshList() {
        fetch('http://127.0.0.1:8000/admins/theme')
            .then((response) => {
                // console.log(response)
                return response.json()
            })
            .then((result) => {
                // console.log(result);
                this.setState({ theme: result })
                
            })
        }

        submit(){
            console.log(this.state.nameTheme)

            fetch('http://127.0.0.1:8000/admins/create/theme',{
                method:'post',
                body: JSON.stringify({
                    nameTheme: this.state.nameTheme,
                }),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
    
                }
            })  .then(res => res.json())
                .then((res) => {
                console.log(res); 
                this.setState({message: 'theme was been added !'})
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
                fetch('http://127.0.0.1:8000/admins/delete/theme/' + postId, {
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                }).then(res => res.json())
                .then((res) => {
                console.log(res);  
                this.setState({message: 'theme was been delated !'})
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
           <Jumbotron >
      <div className="card">
        <div className="row table-topper align-items-center">
          <div className="col-4 text-left" style={{margin: '0px', padding: '5px 15px'}}><input type="text" className="search form-control" placeholder="New Theme name" onChange={(item)=>{this.setState({nameTheme:item.target.value})}}/></div>
          <div className="col-4 text-center" style={{margin: '0px', padding: '5px 10px'}}><button className="btn btn-danger" onClick={()=>{this.submit()}} type="button">Add New Theme</button></div>
        </div>
        <div className="row">
          <div className="col-12">
            <div>
              <table className="table" id="ipi-table">
                <thead className="thead-dark">
                  <tr>
                    <th>id</th>
                    <th className="sorter-false">theme name</th>
                    <th className="filter-false">suppression</th>
                  </tr>
                </thead>
                {this.state.theme.map((theme, i) =>
                <tbody>
                  <tr>
                <td>{theme.id}</td>
                    <td>{theme.nameTheme}</td>
                    <td><button  onClick={() => this.deletePost(theme.id)} className="btn btn-danger" style={{marginLeft: '5px'}} ><i className="fa fa-trash" style={{fontSize: '15px'}}/>X</button></td>
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
