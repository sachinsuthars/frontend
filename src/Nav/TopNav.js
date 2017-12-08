import React, { PropTypes as T } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class TopNav extends React.Component{
    

    componentDidMount(){
        console.log(this.props);
    }
    
    logout() {
        this.props.auth.logout();
    }
    
      
    render(){


        return(

              <nav className="navbar navbar-transparent navbar-absolute">
              
                <div className="container-fluid">
                
                
                    <div className="navbar-minimize">
                        <button id="minimizeSidebar" className="btn btn-round btn-white btn-fill btn-just-icon">
                            <i className="material-icons visible-on-sidebar-regular">more_vert</i>
                            <i className="material-icons visible-on-sidebar-mini">view_list</i>
                        </button>
                    </div>
                    
                    
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle" data-toggle="collapse">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                        <a className="navbar-brand" href="#"> {this.props.initial}</a>
                    </div>
                    
                    
                    <div className="collapse navbar-collapse">
                        <ul className="nav navbar-nav navbar-right">
                            
                            <li>
                               <Link to={'/home'} className="dropdown-toggle">
                                    <i className="material-icons">home</i>
                                    <p className="hidden-lg hidden-md">Dashboard</p>
                                </Link>
                            </li>
                            
                            <li>
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown" onClick={this.logout.bind(this)}>
                                    <i className="material-icons">cancel</i>
                                    <p className="hidden-lg hidden-md">Logout</p>
                                </a>
                            </li>
                            
                            <li className="separator hidden-lg hidden-md"></li>
                            
                        </ul> 
                    </div>
                    
                
                </div>
              
              </nav>
            
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


export default connect(mapStateToProps, mapDispatchToProps)(TopNav);
