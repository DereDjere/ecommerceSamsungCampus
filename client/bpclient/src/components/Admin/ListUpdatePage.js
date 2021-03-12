import React, { Component } from 'react';
import EditModal from './EditModal';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Container, Jumbotron } from 'react-bootstrap';
import Navbar from './navbar';
import Login from './Login_4DM1N';




export default class TestPage extends Component {
    constructor(props) {
        super(props);


        this.state = {
            posts: [],
            addModalShow: false,
            editModalShow: false,
            disponibilite: '',
          
        }
    }
    componentDidMount() {
        this.refreshList();

    }

    refreshList() {
        // this.setState({ editModalShow: false })
        // alert('yesss');
        fetch('http://127.0.0.1:8000/home')
            .then((response) => {
                // console.log(response)
                return response.json()
            })
            .then((result) => {
                console.log(result);
                this.setState({ posts: result })

            })

    }
    // refreshUpdate(){
    //     if(this.state.editModalShow == true){

    //         this.setState({ editModalShow: false })
    //     }
    //     //   
    //     alert('yesss');
    //     fetch('http://127.0.0.1:8000/home')
    //         .then((response) => {
    //             // console.log(response)
    //             return response.json()
    //         })
    //         .then((result) => {
    //             console.log(result);
    //             this.setState({ posts: result })

    //         })
    // }

    // componentDidUpdate() {


    //         this.refreshList();


    // }
    disponibilite(postStock) {
        // alert(postStock)
        if (postStock < 1) {
            this.state.disponibilite = 'indisponible'
        } else {
            this.state.disponibilite = 'disponible'

        }
    }

    deletePost(postId) {
        if (window.confirm('Are you sure delete this item ?')) {
            fetch('http://127.0.0.1:8000/admins/delete/' + postId, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            }).then((result) => {
                console.log(result);

    
                this.refreshList();



            })
        }
    }



    render() {

        const { posts, postid, postimage, postname, postgenres, postdescribe, postcaract, postprice, postcolor, poststock, postreductions } = this.state;
        let addModalClose = () => this.setState({ addModalShow: false });
        let editModalClose = () => this.setState({ editModalShow: false });

        let refresh = () => this.refreshUpdate();

        var token = localStorage.getItem('tokenAdmin')
        console.log(token)
        if (token) {


            return (
                <div>
                    <Navbar />
                    <Jumbotron>
                        <Table className="mt-4" striped bordered hover size="sm">
                            <thead>
                                <tr>
                                    <th className="hidden-xs">ID</th>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Gender</th>
                                    <th>Catégorie</th>
                                    <th>couleur</th>
                                    <th>Description</th>
                                    <th>Caractéristique</th>
                                    <th>Prix</th>
                                    <th>Quantité</th>
                                    <th>Disponibilité</th>
                                    <th>Promotions</th>
                                    <th><em className="fa fa-cog" /></th>
                                </tr>
                            </thead>
                            <tbody>

                                {this.state.posts.map((post, i) =>



                                    <tr className={"test" + i} key={post.id}>
                                        {this.disponibilite(post.stock)}
                                        {/* {post.stock < 1 ? this.setState({ disponibilite: 'disponible' }):this.setState({ disponibilite: 'indisponible' })} */}
                                        <th>{post.id}</th>
                                        <th><img className="rounded-circle mr-2" width={100} height={100} src={post.url_image_principal} />  </th>
                                        <th>{post.titre}</th>
                                        <th>{post.genres}</th>
                                        <th>Pull</th>
                                        <th>{post.colors}</th>
                                        <th>{post.description}</th>
                                        <th>{post.caracteristique}</th>
                                        <th>{post.prix}</th>
                                        <th>{post.stock}</th>
                                        <th>{this.state.disponibilite}</th>
                                        {post.reductions
                                            ? <th>{post.reductions} %</th>
                                            : <th>{post.reductions}</th>
                                        }


                                        <th>


                                            <ButtonToolbar>
                                                <Button className="mr-2" variant="info" onClick={() => this.setState({ editModalShow: true, postid: post.id, postname: post.titre, postimage: post.url_image_principal, postgenres: post.genres, postdescribe: post.description, postcaract: post.caracteristique, postprice: post.prix, postcolor: post.colors, poststock: post.stock, postreductions: post.reductions })}>Edit
                            </Button>
                                                <Button className="mr-2" variant="danger" onClick={() => this.deletePost(post.id)}>delete
                            </Button>
                       


                                                <EditModal

                                                    show={this.state.editModalShow}
                                                    onHide={editModalClose}
                                                    postid={postid}
                                                    postimage={postimage}
                                                    postname={postname}
                                                    postgenres={postgenres}
                                                    postdescribe={postdescribe}
                                                    postcaract={postcaract}
                                                    postprice={postprice}
                                                    postcolor={postcolor}
                                                    poststock={poststock}
                                                    postreductions={postreductions}
                                                // onRefresh={refresh}


                                                />


                                            </ButtonToolbar>
                                        </th>
                                    </tr>

                                )}



                            </tbody>
                        </Table>

                    </Jumbotron>




                </div >
            )
        } else {

            return (
                <Login />
            )


        }


    }
}
