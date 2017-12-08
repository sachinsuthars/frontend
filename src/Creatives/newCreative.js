import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
import BrowseClients from '../Clients/browse.js';
import LayoutPreview from '../Layouts/layoutPreview.js';
import ClientChoose from '../Clients/chooseClient.js';

//Import jquery
const jQuery = require("jquery");

class NewCreative extends Component {

  constructor(props){
        super(props);

        this.state = {
          clientChosen: '',
          layouts: []
        }

  }

  componentWillMount(){
    this.setState({clientChosen: this.props.match.params.clientChosen});
    this.fetchLayouts();
  }

  componentDidMount() {

    this.props.changeInitial('New Creative');

  }

  fetchLayouts(){


    let action = this.props.api + 'allLayouts';

    jQuery.get( action, ( data ) => {


    }).fail((data)=>{


    }).done((data)=>{

      this.setState({layouts: data.Items});


    });


  }

  

  login() {
    this.props.auth.login();
  }


  render() {

    let layoutNodes = this.state.layouts.map((layout) => {

        return (

            <LayoutPreview key={layout.name} values={layout} />

        );
    });

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
          <div className="container-fluid">

                <h3>Choose a creative layout.</h3>

                <br/>

                <div className="row">

                    {layoutNodes}

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

export default connect(mapStateToProps, mapDispatchToProps)(NewCreative);
