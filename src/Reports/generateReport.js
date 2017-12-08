import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
import Search from './sub/search.js';
import Table from './sub/table.js';

//Import jquery
const jQuery = require("jquery");

class GenerateReport extends Component {

  constructor(props){
        super(props);

        this.state = {
          clientChosen : '',
          data : []
        };

  }

  componentDidMount() {

    console.log(this.props.role);

    this.props.changeInitial('Generate Query');

    this.setState({clientChosen: document.getElementById('clientChoose').value})

    //this.searchCampaigns(document.getElementById('clientChoose').value);

    //Fix package spelling
    let updateText = jQuery('.sortable-table .desc').text().replace(/totlas/g, 'total');
    jQuery('.sortable-table .desc').text(updateText);

  }

  login() {
    this.props.auth.login();
  }

  changeClient(event){
    let clientChosen = event.target.value;

    this.setState({clientChosen: clientChosen});
    this.searchCampaigns(clientChosen);
  }


  searchCampaigns(client){

    if(client == 'NONE'){
      console.log('Please pick a client');
      return;
    }

    let action = this.props.api + 'getReports/' + client;


    console.log(action);


    jQuery.get( action, ( data ) => {


    }).fail((data)=>{


    }).done((data)=>{


      console.log(data);
      this.setState({data: data});

    });


  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
          <div className="container-fluid">

                <Search />

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

export default connect(mapStateToProps, mapDispatchToProps)(GenerateReport);
