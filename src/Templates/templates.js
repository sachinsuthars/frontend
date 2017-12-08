import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import {connect} from 'react-redux';
//Import Components
import ClientsSection from '../Clients/clientSection.js';
import TemplatePreview from './templatePreview.js';
import ToggleDisplay from 'react-toggle-display';

const axios = require('axios');

class Templates extends Component {



  constructor(props){
        super(props);

        this.state = {
           posts: [],
           ClientChoose:'',
        }

  }
 

  onUpdate = (val) => {

    this.setState({
      ClientChoose: val
    })
  };

  componentWillMount(){
     
  }

  componentDidMount() {
    this.props.changeInitial('Browse Templates');
     let url = this.props.api
          + 'getAllTemplate';
     axios.get(url)
      .then(res => {
        const posts = res.data.Items;
        this.setState({ posts });
      });

  }

  login() {
    this.props.auth.login();
  }


  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
          <div className="container-fluid">

                <h3>Choose a Templates.</h3>

                <br/>
                <div className="row">
                    <ClientsSection  onUpdate={this.onUpdate}  />
                </div>

                <div className="row">

                  {this.state.posts.map(data =>
                        <TemplatePreview  passedVal={this.state.ClientChoose}  postData={data} />
                  )}
                </div>


          </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        role : state.role,
        api: state.api
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

export default connect(mapStateToProps, mapDispatchToProps)(Templates);
