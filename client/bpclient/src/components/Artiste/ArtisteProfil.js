import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { Button, ButtonToolbar, Jumbotron, Container, Carousel, Alert } from 'react-bootstrap';
// import { Carousel } from 'react-responsive-carousel';
import { FaTwitter } from 'react-icons/fa'
import { MDBIcon, MDBContainer, MDBBtn } from 'mdbreact';
import NavBar from '../Home/Navbar'
import BarreHome from '../Home/BarreHome'
import Footer from '../footer/footer'
import axios from 'axios';



export default class ArtisteProfil extends Component {
  constructor(props) {
    super(props);


    this.state = {
      username: '',
      email: '',
      description: '',
      profil_img: '',
      siret: null,
      lastname: '',
      firstname: '',
      reseau_social: '',
      address: '',
      city: '',
      country: '',
      password: '',
      confirm_password: '',
      name_design: '',
      url: null,
      prix: null,
      theme: '',
      themes: [],
      image: null,
      idDesign: null,
      success: null,
      artists: [],
      logArtist: null,
      pays: [],
      designs: [],


    }
  }
  componentDidMount() {



    // /artist/design/theme
    let artisteId = this.props.match.params.id;
    let tokenArtist = localStorage.getItem('tokenArtist')


    fetch("http://127.0.0.1:8000/admins/shipping", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({ pays: response })

      })




    fetch("http://127.0.0.1:8000/artist/design/theme", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({ themes: response })

      })


    fetch("http://127.0.0.1:8000/artist/" + artisteId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        console.log(response);

        this.setState({ artists: response })

      })



    fetch("http://127.0.0.1:8000/artist/design/" + artisteId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Accept': "application/json"
      }
    }).then(response => response.json())
      .then(response => {
        // alert(response);
        console.log(response);
        // alert(response);

        this.setState({ designs: response })


      })
    // alert(tokenArtist);
    if (tokenArtist) {
      let tokenArtist = localStorage.getItem('tokenArtist').substring(1).replace('"', ' ')
      fetch('http://localhost:8000/artist/verif/log/' + artisteId, {
        method: "POST",
        body: JSON.stringify({
          'token': tokenArtist,


        }),
        headers: {
          "Content-Type": "application/json",
          'Accept': "application/json"
        }
      }
      ).then(response => response.json())
        .then(response => {
          // alert(response)
          this.setState({ logArtist: response })


          console.log(response)

          /* localStorage.removeItem('products') */
        })
    } else (
      this.setState({ logArtist: false })
    )




  }
  requestSubmit() {

    let artisteId = this.props.match.params.id;

    this.requestDesign();


  }


  requestDesign() {

    let artisteId = this.props.match.params.id;

    let array = {
      theme: this.state.theme,
      prix: this.state.prix,
      name_design: this.state.name_design,
    }
    console.log(array)

    axios.post('http://127.0.0.1:8000/artist/add/' + artisteId, array, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
    }
    ).then((data) => {
      console.log(data.data.id);
      if (data.status === 201) {
        this.setState({ idDesign: data.data.id })

        this.updateDesign();

      } else if (data.status === 200) {
        this.setState({ success: false })
      }

    })



  }

  updateDesign() {

    const data = new FormData()
    data.append('url', this.state.url)
    data.append('id', this.state.idDesign)
    let artisteId = this.props.match.params.id;


    axios.post('http://127.0.0.1:8000/artist/add/url/' + artisteId, data, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'multipart/form-data'
      },
    }
    ).then((data) => {
      console.log(data);
      if (data.status === 201) {
        // this.setState({ profile_img: true })
        this.setState({ success: true })
        setTimeout(function () { window.location.reload(); }, 2000);
      } else if (data.status === 200) {
        // this.setState({ success: false })
      }

    })

  }

  handleSubmit(event) {
    // alert(event.target.value);
    // alert(event);
    // var b = URL.createObjectURL(event.files)
    var file = event.target.files[0];
    // console.log(event.files[0])
    // console.log(file)


    const data = new FormData()
    data.append('url', file)
    let artisteId = this.props.match.params.id;


    axios.post('http://127.0.0.1:8000/artist/profileimg/' + artisteId, data, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'multipart/form-data'
      },
    }
    ).then((data) => {
      console.log(data);
      if (data.status === 201) {
        this.setState({ success: true });
        this.componentDidMount();

      } else if (data.status === 200) {
        this.setState({ success: false })
      }

    })
  }

  submit() {

    // console.log(this.state)
    // alert('ok')

    let artisteId = this.props.match.params.id;

    // alert(artisteId)

    fetch('http://127.0.0.1:8000/artist/update/' + artisteId, {
      method: 'post',
      body: JSON.stringify({
        username: this.state.username,
        email: this.state.email,
        description: this.state.description,
        siret: this.state.siret,
        lastname: this.state.lastname,
        firstname: this.state.firstname,
        reseau_social: this.state.reseau_social,
        address: this.state.address,
        city: this.state.city,
        country: this.state.country,
        password: this.state.password,
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json, multipart/form-data'

      }
    }).then(res => res.json())
      .then((res) => {
        this.setState({ success: true })
        setTimeout(function () { window.location.reload(); }, 2000);

      },
        (error) => {
          console.log(error);
        })

  }

  render() {

    return (
      <Container>
        <NavBar />
        <BarreHome />
        <div className="container">
          <div className="row my-2">
            <div className="col-lg-8 order-lg-2">
              <ul className="nav nav-tabs">
                <li className="nav-item">
                  <a href data-target="#profile" data-toggle="tab" className="nav-link active">Profile</a>
                </li>
                {this.state.logArtist == true
                  ?
                  <li className="nav-item">
                    <a href data-target="#messages" data-toggle="tab" className="nav-link">Design Request</a>
                  </li>
                  : null
                }
                {this.state.logArtist == true
                  ?
                  <li className="nav-item">
                    <a href data-target="#edit" data-toggle="tab" className="nav-link">Edit</a>
                  </li>
                  : null
                }
              </ul>
              <div className="tab-content py-4">
                <div className="tab-pane active" id="profile">
                  <h5 className="mb-3">{this.state.artists.username}</h5>
                  <div className="row">
                    <div className="col-md-6">
                      <h6>About</h6>
                      <p>
                        {this.state.artists.description}
                      </p>
                      <h6>Follow me</h6>
                      <p>
                        <MDBBtn href={this.state.artists.reseau_social} social="ins">
                          <MDBIcon fab icon="instagram" className="pr-1" /> Instagram
        </MDBBtn>
                        {/* {this.state.artists.reseau_social} */}

                      </p>
                    </div>
                    <div className="col-md-6">
                      <h6>Social Reseau</h6>
                      <hr />
                      <span className="badge badge-primary"><i className="fa fa-user" /> 900 Followers</span>
                      <span className="badge badge-success"><i className="fa fa-cog" /> 43 Forks</span>
                      <span className="badge badge-danger"><i className="fa fa-eye" /> 245 Views</span>
                      <hr />

                    </div>
                    <div className="col-md-12">
                      <h5 className="mt-2"><span className="fa fa-clock-o ion-clock float-right" /> Recent Design</h5>

                    </div>
                    <Container>
                      {this.state.designs == '' ?
                        null :
                        <Carousel>
                          {this.state.designs.map((design, i) =>
                            <Carousel.Item>
                              <img
                                className="img-responsive"

                                src={design.url}
                                alt="First slide"
                              />
                              <Carousel.Caption>

                                <p>{design.name_design}</p>
                              </Carousel.Caption>
                            </Carousel.Item>
                          )}
                        </Carousel>
                      }

                    </Container>


                  </div>

                  {/*/row*/}
                </div>
                <div className="tab-pane" id="messages">
                  <div className="alert alert-info alert-dismissable">
                    <a className="panel-close close" data-dismiss="alert">×</a> This is an <strong>.alert</strong>. Use this to show important messages to the user.
            </div>
                  <form role="form" enctype="multipart/form-data">
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Name of Design</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="text" defaultValue="" onChange={(item) => { this.setState({ name_design: item.target.value }) }} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Add your Design</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="file" id="image" name="image" accept="image/png, image/jpeg" onChange={(item) => { this.setState({ url: item.target.files[0] }) }} />

                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Themes</label>
                      <div className="col-lg-9">
                        <select id="state" className="form-control" required title="Please select a theme" size={0} onChange={(item) => { this.setState({ theme: item.target.value }) }} >
                          <option value="" disabled selected>Select a theme</option>
                          {this.state.themes.map((l, i) => (
                            <option value={l.nameTheme}>{l.nameTheme}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Price</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="number" onChange={(item) => { this.setState({ prix: item.target.value }) }} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label" />
                      <div className="col-lg-9">
                        <input type="reset" className="btn btn-secondary" defaultValue="Cancel" />
                        <input type="button" className="btn btn-primary" defaultValue="Request" onClick={() => { this.requestSubmit() }} />
                      </div>
                    </div>
                  </form>
                  {
                    this.state.success == true ?
                      <Alert variant='success'>you're design have been updated
                and it will be validate by an administrator</Alert>
                      :
                      null
                  }
                </div>
                <div className="tab-pane" id="edit">
                  <form role="form">
                    {/* {this.state.posts.map((post, i) => */}

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">First name</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="text" defaultValue={this.state.artists.firstname} onChange={(item) => { this.setState({ firstname: item.target.value }) }} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Last name</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="text" defaultValue={this.state.artists.lastname} onChange={(item) => { this.setState({ lastname: item.target.value }) }} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Email</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="email" defaultValue={this.state.artists.email} onChange={(item) => { this.setState({ email: item.target.value }) }} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Numero Siret</label>
                      <div className="col-lg-9">
                        <input className="form-control" defaultValue={this.state.artists.siret} type="number" onChange={(item) => { this.setState({ siret: item.target.value }) }} />
                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">About me</label>
                      <div className="col-lg-9">
                        <textarea className="form-control" type="text" defaultValue={this.state.artists.description} onChange={(item) => { this.setState({ description: item.target.value }) }} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Website</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="url" defaultValue={this.state.artists.reseau_social} onChange={(item) => { this.setState({ reseau_social: item.target.value }) }} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Address</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="text" defaultValue={this.state.artists.address} placeholder="Street" onChange={(item) => { this.setState({ address: item.target.value }) }} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label" />
                      <div className="col-lg-6">
                        <input className="form-control" type="text" defaultValue={this.state.artists.city} placeholder="City" onChange={(item) => { this.setState({ city: item.target.value }) }} />
                      </div>
                      <div className="col-lg-3">
                        <select id="state" className="form-control" title="Please select a state" defaultValue={this.state.artists.country} onChange={(item) => { this.setState({ country: item.target.value }) }}>
                          <option value="" disabled selected>Select a state</option>
                          {this.state.pays.map((l, i) => (
                            <option value={l.name}>{l.name}</option>
                          ))}
                        </select>

                      </div>
                    </div>

                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Username</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="text" defaultValue={this.state.artists.username} onChange={(item) => { this.setState({ username: item.target.value }) }} />
                      </div>
                    </div>
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label">Password</label>
                      <div className="col-lg-9">
                        <input className="form-control" type="password" defaultValue={11111122333} onChange={(item) => { this.setState({ password: item.target.value }) }} />
                      </div>
                    </div>
                    {/* <div className="form-group row">
                    <label className="col-lg-3 col-form-label form-control-label">Confirm password</label>
                    <div className="col-lg-9">
                      <input className="form-control" type="password" defaultValue={11111122333} />
                    </div>
                  </div> */}
                    <div className="form-group row">
                      <label className="col-lg-3 col-form-label form-control-label" />
                      <div className="col-lg-9">
                        <input type="reset" className="btn btn-secondary" defaultValue="Cancel" />
                        <input type="button" className="btn btn-primary" defaultValue="Save Changes" onClick={() => { this.submit() }} />
                      </div>
                    </div>
                    {/* )} */}

                  </form>
                  {
                    this.state.success == true ?
                      <Alert variant='success'>you're info have been updated</Alert>
                      :
                      null
                  }
                </div>
              </div>
            </div>

            <div className="col-lg-4 order-lg-1 text-center">
              {/* {this.state.artists.profil_img == ''
                                            ?  */}
              {this.state.artists.profil_img == ''
                ?
                < img src="https://img.20mn.fr/A0l6AVCzSCKSb6TVLu5G9w/830x532_a-graffiti-believed-to-be-attributed-to-street-artist-banksy-is-seen-on-a-wall-along-a-street-in.jpg" className="mx-auto img-fluid img-circle d-block" alt="avatar" width="150 px" height="150 px" />
                :
                <img src={this.state.artists.profil_img} className="mx-auto img-fluid img-circle d-block" alt="avatar" width="150 px" height="150 px" />
              }
              {this.state.logArtist == true
                ?
                <h6 className="mt-2">Upload a different photo</h6>
                : null
              }
              {this.state.logArtist == true
                ?
                <label className="custom-file">
                  <input type="file" id="file" className="custom-file-input" onChange={(event) => { this.handleSubmit(event) }} />
                  <span className="custom-file-control">Choose file</span>
                </label>
                : null
              }

            </div>

          </div>
        </div>
        <Footer />
      </Container>
    )


  }

}