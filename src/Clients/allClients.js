import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
import ProductsTblPage from './searchComponents/table.js';

//Import jquery
const jQuery = require("jquery");

class Clients extends Component {

  constructor(props){
        super(props);

        this.state = {
          clientChosen : '',
          data : []
        };

  }

  componentDidMount() {

    //Set Page Name
    this.props.changeInitial('Clients');


    //Set client coming into the page and find their data
    this.setState({clientChosen: this.props.client})

    this.searchCampaigns(this.props.client);

    jQuery('#clientChoose').val(this.props.client);


    //Fix package spelling
    jQuery('.sortable-table .desc').hide();


    //Check profile for admins
    this.setState({ profile: {} });

    const { userProfile, getProfile, isAuthenticated } = this.props.auth;

    if(isAuthenticated()){


      if (!userProfile) {
      getProfile((err, profile) => {

        if(err){
          console.log(err);
        }

        this.setState({ profile });
        this.testRole();

       });
      } else {

      this.setState({ profile: userProfile });


      }

    } else {

      console.log('User is not logged in');

    }

  }

  login() {
    this.props.auth.login();
  }

  //change client manual and automatic functions
  changeClient(client){
    let clientChosen = client;
    this.props.changeClient(clientChosen);
    this.setState({clientChosen: clientChosen});
    this.searchCampaigns(clientChosen);
  }

  changeClient(event){
    let clientChosen = event.target.value;
    this.props.changeClient(clientChosen);
    this.setState({clientChosen: clientChosen});
    this.searchCampaigns(clientChosen);
  }


  searchCampaigns(client){

    let action = this.props.api + 'getCampaigns/' + client;


    jQuery.get( action, ( data ) => {


    }).fail((data)=>{


    }).done((data)=>{

      this.setState({data: data});

    });

  }

  testRole(){

       console.log(this.state.profile);

       if(this.state.profile["http://one.rkd.io/role"] === 'admin'){

        this.props.changeRole('admin');

        this.setState({role: this.props.role});


      }

  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
          <div className="container-fluid">

                {/* Add a New Client */}
                <div className="row">
                    <div className="col-md-9">

                    </div>

                    <div className="col-md-3 text-center">
                          <Link to="/newClient" activeClassName={"activebutton"}>
                             <button className="btn btn-success btn-fill pull-right">Add New Client</button>
                          </Link>

                    </div>
                </div>

                <br/><br/>

                {/* Change Active Client */}
                { isAuthenticated() && this.props.role === 'admin' && (

                  <div className="row">

                    <div className="col-sm-6">
                      <div className="alert alert-info">
                        <button type="button" aria-hidden="true" className="close">
                            <i className="material-icons">close</i>
                        </button>
                        <span><strong>Please choose a client to view/edit their data.</strong></span>
                      </div>
                    </div>

                    <div className="col-sm-6">
                      <form>
                        <select onChange={this.changeClient.bind(this)} className="form-control" name="clientChoose" id="clientChoose" >
                          <option value="NONE">Please Choose</option>
                          <option value="FBNYC">FBNYC</option>
                        </select>
                      </form>
                    </div>
                  </div>

                )}

                {/* Client Details */}
                <div className="row">
                    <div className="col-md-8 col-md-offset-2">


                        <h3 className="title text-center">Client Details</h3>
                        <br />

                        {/* Tab Menu */}
                        <div className="nav-center">
                            <ul className="nav nav-pills nav-pills-warning nav-pills-icons" role="tablist">

                              <li className="active">
                                  <a href="#description-1" role="tab" data-toggle="tab">
                                      <i className="material-icons">info</i> Description
                                  </a>
                              </li>

                              <li >
                                  <a href="#schedule-1" role="tab" data-toggle="tab">
                                      <i className="material-icons">location_on</i> Contact
                                  </a>
                              </li>

                              <li>
                                  <a href="#tasks-1" role="tab" data-toggle="tab">
                                      <i className="material-icons">gavel</i> Legal Info
                                  </a>
                              </li>

                              <li>
                                  <a href="#tasks-2" role="tab" data-toggle="tab">
                                      <i className="material-icons">help_outline</i> About
                                  </a>
                              </li>


                            </ul>
                        </div>

                        {/* Tabs */}
                        {this.props.client != 'NONE' && (
                        <div className="tab-content">

                            <div className="tab-pane active" id="description-1">
                              <div className="card">

                                <div className="card-header">
                                  <h4 className="card-title text-center">Food Bank For New York City</h4>
                                  <p className="category">
                                    Category: Food Bank
                                  </p>
                                </div>

                                <div className="card-content">

                                  <div className="col-md-6">
                                        <p>Url: www.foodbanknyc.org </p>

                                        <div className="col-xs-6">
                                          <p>Primary Color:</p>
                                          <div style={{backgroundColor: "#ff7314", height: "65px", width:"65px"}}>&nbsp;</div>
                                        </div>
                                        <div className="col-xs-6">
                                          <p>Secondary Color:</p>
                                          <div style={{backgroundColor: "#273a79", height: "65px", width:"65px"}}>&nbsp;</div>
                                        </div>

                                  </div>

                                  <div className="col-md-6">
                                      <p>Logo</p>
                                      <img
                                        src="https://secure3.convio.net/fbnyc/images/content/pagebuilder/new-form-logo.png"
                                        style={{width: "150px"}}
                                      />
                                  </div>

                                </div>

                              </div>
                            </div>


                            <div className="tab-pane" id="schedule-1">
                              <div className="card">


                                <div className="card-header">
                                  <h4 className="card-title text-center">Food Bank For New York City</h4>
                                </div>


                                <div className="card-content">

                                    <div className="table-responsive">
                                        <table className="table table-striped">
                                            <tbody>
                                                <tr>
                                                  <td className="text-center">Phone: 212.566.1463</td>
                                                </tr>
                                                <tr>
                                                  <td className="text-center">Fax: 212.566.1463</td>
                                                </tr>
                                                <tr>
                                                  <td className="text-center">Address: 39 Broadway, New York, NY 10006</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </div>

                              </div>
                           </div>


                           <div className="tab-pane" id="tasks-1">

                               <div className="card">


                                 <div className="card-header">
                                   <h4 className="card-title text-center">Food Bank For New York City</h4>
                                 </div>


                                 <div className="card-content">

                                     <div className="table-responsive">
                                         <table className="table table-striped">
                                             <tbody>
                                                 <tr>
                                                   <td className="text-center">ID Number: 3-3179546</td>
                                                 </tr>
                                                 <tr>
                                                   <td className="text-center">Policies: http://www.foodbanknyc.org/policies</td>
                                                 </tr>
                                             </tbody>
                                         </table>
                                     </div>

                                 </div>

                               </div>


                           </div>


                           <div className="tab-pane" id="tasks-2">
                            <div className="card">
                              <div className="card-header">
                                <h4 className="card-title text-center">Food Bank For New York City</h4>
                              </div>

                              <div className="card-content">

                                <h4>Mission</h4>
                                <p>To end hunger by organizing food, information and support for community survival, empowerment, and dignity. Food Bank For New York City has been working to end food poverty in our five boroughs for 35 years.</p>

                                <h4>About Us</h4>
                                <p>Food Bank For New York City—an independent, nonprofit 501(c)3 organization—meets the Better Business Bureau’s charity standards and is a proud member of Feeding America.</p>

                              </div>
                            </div>

                          </div>



                        </div>
                        )}
                        {/* Close Tabs */}

                    </div>
                </div>


                {/* Edit a Client */}
                {this.props.client != 'NONE' && (
                  <div className="row">

                      <div className="col-md-12 text-center">
                            <Link to="/editClient" activeClassName={"activebutton"}>
                               <button className="btn btn-lg btn-info btn-fill">Edit Client</button>
                            </Link>

                      </div>
                  </div>
              )}

          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        role : state.role,
        api: state.api,
        client:  state.client,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        changeInitial : (initial) => {
            dispatch(
                {
                    type: "ChangeInitial",
                    payload : initial
                }
            );
        },
        changeRole : (role) => {
            dispatch(
                {
                    type: "ChangeRole",
                    payload : role
                }
            );
        },
        changeClient : (role) => {
            dispatch(
                {
                    type: "ChangeClient",
                    payload : role
                }
            );
        }



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Clients);
