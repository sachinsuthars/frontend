import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Helper Modules
const jQuery = require("jquery");

class Login extends Component {

  constructor(props){
        super(props);

        this.state = {
            bgImage: {backgroundImage: 'url(http://give.rkd.io/dashboard/img/main-bg.jpeg)'},
        };

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

  componentDidMount() {

    console.log(this.props.role);

    jQuery('.main-panel').hide();
    jQuery('.sidebar').hide();

  }


  login(event) {

    event.preventDefault();
    this.props.auth.login();
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

              <nav className="navbar navbar-primary navbar-transparent navbar-absolute">
                <div className="container">
                  <div className="navbar-header">
                      <a className="navbar-brand" href="#">ONE.RKD.IO</a>
                  </div>
                </div>
              </nav>


              <div className="wrapper wrapper-full-page">
                <div className="full-page login-page" style={this.state.bgImage}  filter-color="black" data-image="http://give.rkd.io/dashboard/img/main-bg.jpeg">

                    <div className="content">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-4 col-sm-6 col-md-offset-4 col-sm-offset-3">
                                    <form method="#" action="#">
                                        <div className="card card-login">
                                            <div className="card-header text-center" data-background-color="red">
                                                <h4 className="card-title">WELCOME</h4>
                                            </div>


                                            <div className="footer text-center">
                                                <img src="http://give.rkd.io/dashboard/img/logo.png" className="mainLogoLogin" />
                                                <h3 className="loginTitle">ONE.RKD.IO</h3>
                                                <button className="btn btn-danger btn-lg" onClick={this.login.bind(this)}>Login</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>


                    <footer className="footer">
                        <div className="container">
                            <p className="copyright text-center">
                                &copy;2017 ONE.RKD.IO
                            </p>
                        </div>
                    </footer>

                    <div className="full-page-background"></div>
                </div>
            </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
