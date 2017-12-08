import React, { Component } from 'react';
import { Navbar, Button } from 'react-bootstrap';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import history from './history';
import {connect} from 'react-redux';

//Styles
import './App.css';
import "./Sass/main.scss";


import TopNav from './Nav/TopNav.js';
import Sidebar from './Nav/Sidebar.js';
import Login from './Login/login.js';

//Importing Nested Components
import About from './About/About';
import Home from './Home/Home';
import Profile from './Profile/Profile';

//Creative Components
import NewCreative from './Creatives/newCreative.js';
import Creatives from './Creatives/creatives.js';
import GenerateCreative from './Creatives/generateCreative.js';
import EditCreative from './Creatives/editCreative.js';

//Layout Components
import NewLayout from './Layouts/newLayout.js';
import Layouts from './Layouts/layouts.js';

//Client Components
import Clients from './Clients/allClients.js';
import NewClient from './Clients/newClient.js';

//Campaign Components
import Campaigns from './Campaign/campaigns.js';
import EditCampaign from './Campaign/editCampaign.js';
import NewCampaign from './Campaign/newCampaign.js';
import SearchCampaigns from './Campaign/searchCampaigns.js';

//Report Components
import Reports from './Reports/report.js';
import GenerateReport from './Reports/generateReport.js';

//Emails
import Emails from './Emails/emails.js';

//Import Sass
import "./Sass/main.scss";

class App extends Component {

  constructor(props){
        super(props);

        this.state = {

            role: this.props.role

        };
  }


  goTo(route) {
    this.props.history.replace(`/${route}`);
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }


  componentWillMount() {

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
      <div className="wrapper" id="mainNav">

          <Router history={history}>
            <div>

               <Route path="/dashboard/login" render={(props) => <Login auth={this.props.auth} {...props} />} />

            </div>
          </Router>


          <Sidebar />

          {/* Main Panel */}
          <div className="main-panel">

               <TopNav />

                  <div className="content">
                    <div className="container-fluid">

                      <Router history={history}>
                        <div>

                           <Route path="/dashboard/home" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <Home auth={this.props.auth} {...props} />
                            )
                          )} />

                           <Route path="/dashboard/about" render={(props) => <About  auth={this.props.auth} {...props} />} />

                           <Route path="/dashboard/profile" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <Profile auth={this.props.auth} {...props} />
                            )
                           )} />


                           {/* Creative Routes */}
                           <Route path="/dashboard/newCreative/:clientChosen" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <NewCreative auth={this.props.auth} {...props} />
                            )
                          )} />

                          <Route path="/dashboard/creatives" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <Creatives auth={this.props.auth} {...props} />
                            )
                          )} />

                          <Route path="/dashboard/generateCreative/:clientChosen/:layoutChosen" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <GenerateCreative auth={this.props.auth} {...props} />
                            )
                          )} />

                          <Route path="/dashboard/editCreative/:creativeChosen/" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <EditCreative auth={this.props.auth} {...props} />
                            )
                          )} />


                          {/* Layout Routes */}
                          <Route path="/dashboard/newLayout" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <NewLayout auth={this.props.auth} {...props} />
                            )
                          )} />

                          <Route path="/dashboard/layouts" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <Layouts auth={this.props.auth} {...props} />
                            )
                          )} />



                          {/* Client Routes */}

                          <Route path="/dashboard/clients" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <Clients auth={this.props.auth} {...props} />
                            )
                          )} />


                          <Route path="/dashboard/newClient" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <NewClient auth={this.props.auth} {...props} />
                            )
                          )} />


                          {/* Report Routes */}
                          <Route path="/dashboard/reports" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <Reports auth={this.props.auth} {...props} />
                            )
                          )} />

                          <Route path="/dashboard/generateReport" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <GenerateReport auth={this.props.auth} {...props} />
                            )
                          )} />



                          {/* Campaign Routes */}
                          <Route path="/dashboard/campaigns" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <Campaigns auth={this.props.auth} {...props} />
                            )
                          )} />

                          <Route path="/dashboard/editCampaign/:campaign" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <EditCampaign auth={this.props.auth} {...props} />
                            )
                          )} />

                          <Route path="/dashboard/newCampaign" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <NewCampaign auth={this.props.auth} {...props} />
                            )
                          )} />

                          <Route path="/dashboard/searchCampaigns" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <SearchCampaigns auth={this.props.auth} {...props} />
                            )
                          )} />


                          {/* Email Routes */}

                          <Route path="/dashboard/emails" render={(props) => (
                            !this.props.auth.isAuthenticated() ? (
                              <Redirect to="/dashboard/login"/>
                            ) : (
                              <Emails auth={this.props.auth} {...props} />
                            )
                          )} />

                        </div>
                      </Router>

                    </div>
                  </div>

        </div>
        {/* Close Main Panel */}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        role : state.role
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
        }



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
