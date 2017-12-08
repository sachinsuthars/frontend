import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
import BrowseClients from '../Clients/browse.js';
import LastWeek from '../Data/lastWeek.js';
import ClientChoose from '../Clients/chooseClient.js';

class Home extends Component {

  constructor(props){
        super(props);

  }

  componentWillMount() {

    this.props.changeInitial('Home');

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

  componentDidMount() {

    console.log(this.props.role);



  }


  login() {
    this.props.auth.login();
  }


  testRole(){

       console.log(this.state.profile);

       if(this.state.profile["http://one.rkd.io/role"] === 'admin'){

        this.props.changeRole('admin');

        this.setState({role: this.props.role});


      }

  }

  changeClient(event){

    let client = event.currentTarget.value;

    this.props.changeClient(client);
  }


  render() {

    const { isAuthenticated } = this.props.auth;



    return (

      <div>
          <div className="container-fluid">


            { isAuthenticated() && this.props.role === 'admin' && (

              <ClientChoose alertType="alert alert-success">
                <span>Welcome <strong>Team Member</strong>. Please choose a client to view/edit their data.</span>
              </ClientChoose>

            )}

            { this.props.client != "NONE" && (


                <BrowseClients />


            )}

            <LastWeek />

            { this.props.role !== 'admin' && (<p>Welcome Client {this.props.role}</p>)}

            {
              !isAuthenticated() && (
                  <h4>
                    You are not logged in! Please{' '}
                    <a
                      style={{ cursor: 'pointer' }}
                      onClick={this.login.bind(this)}
                    >
                      Log In
                    </a>
                    {' '}to continue.
                  </h4>
                )
            }

          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        role : state.role,
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);
