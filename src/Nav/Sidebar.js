import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class Sidebar extends React.Component{


    componentDidMount(){

    }



    render(){


        return(

          <div className="sidebar" data-active-color="red" data-background-color="white" data-image="http://give.rkd.io/dashboard/img/sidebar-1.jpg">

                <div className="logo">
                    <a href="/dashboard/home" className="simple-text">
                      ONE.RKD.IO
                    </a>
                </div>

                <div className="logo logo-mini">
                   <a href="/dashboard/home" className="simple-text">
                      ONE
                  </a>
                </div>

                {/* Sidebar Wrapper */}
                <div className="sidebar-wrapper">

                    {/* User */}
                    <div className="user">


                      <div className="photo">
                        <img src="http://give.rkd.io/dashboard/img/logo.png" />
                      </div>


                      <div className="info">
                        <a data-toggle="collapse" href="#options" className="collapsed">
                          Options
                          <b className="caret" />
                        </a>
                        <div className="collapse" id="options">
                          <ul className="nav">
                            <li>
                              <Link to="/dashboard/home">Home</Link>
                            </li>
                            <li>
                              <Link to="/dashboard/login">Login</Link>
                            </li>
                          </ul>
                        </div>
                      </div>


                    </div>
                    {/* Close User */}

                    <ul className="nav">

                        <li>
                            <Link to="/dashboard/home" activeClassName={"activebutton"}>
                              <i className="material-icons">dashboard</i>
                              <p>Dashboard</p>
                            </Link>
                        </li>

                        <li>
                            <Link to="/dashboard/campaigns" activeClassName={"activebutton"}>
                              <i className="material-icons">folder_open</i>
                              <p>Campaigns</p>
                            </Link>
                         </li>

                         <li>
                            <Link to="/dashboard/creatives" activeClassName={"activebutton"}>
                              <i className="material-icons">important_devices</i>
                              <p>Creatives</p>
                            </Link>
                         </li>

                         <li>
                            <Link to="/dashboard/clients" activeClassName={"activebutton"}>
                              <i className="material-icons">recent_actors</i>
                              <p>Clients</p>
                            </Link>
                         </li>

    
                         <li>
                            <Link to="/dashboard/layouts" activeClassName={"activebutton"}>
                              <i className="material-icons">chrome_reader_mode</i>
                              <p>Layouts</p>
                            </Link>
                         </li>

                         <li>
                            <Link to="/dashboard/reports" activeClassName={"activebutton"}>
                              <i className="material-icons">poll</i>
                              <p>Reports</p>
                            </Link>
                         </li>

                         <li>
                            <Link to="/dashboard/emails" activeClassName={"activebutton"}>
                              <i className="material-icons">email</i>
                              <p>Emails</p>
                            </Link>
                         </li>




                    </ul>


                </div>
                {/* Close Sidebar Wrapper */}



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


export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
