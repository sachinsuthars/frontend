import React, { Component } from 'react';
import {connect} from 'react-redux';

class About extends Component {
  

  
  componentWillMount() {
    
    
  }
  
  componentDidMount(){
     
  }
  
  
  
  render() {
    
    
    return (
      <div className="container">
         
        <h2>This the about page.</h2>
        
        { this.props.role === 'admin' && (<p>Welcome Team Member</p>)}
        { this.props.role !== 'admin' && (<p>Welcome Client</p>)}
        
       
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
