import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
import ProductsTblPage from './searchComponents/table.js';
import ClientChoose from '../Clients/chooseClient.js';

//Import jquery
const jQuery = require("jquery");

class Campaigns extends Component {

  constructor(props){
        super(props);

        this.state = {
          data : [],
          client: ''
        };

  }

  componentDidMount() {

    //Set Page Name
    this.props.changeInitial('Campaigns');

    //Search for Chosen Client Campaigns
    if(this.props.client != 'NONE'){
      jQuery('.noClient').hide();
      jQuery('.hasClient').show();
      this.searchCampaigns(this.props.client);
    } else {
      jQuery('.noClient').show();
      jQuery('.hasClient').hide();
    }

    //Fix package spelling
    jQuery('.sortable-table .desc').hide();

    //Saving the chosen client
    this.setState({client: this.props.client});

  }


  componentWillReceiveProps(){

     //Search for new client campaigns
     setTimeout(()=>{

       if(this.props.client != "NONE"){
         jQuery('.noClient').hide();
         jQuery('.hasClient').show();
         this.searchCampaigns(this.props.client);

       } else {

         jQuery('.noClient').show();
         jQuery('.hasClient').hide();

       }

     },300);


  }

  login() {
    this.props.auth.login();
  }


  searchCampaigns(client){

    let action = this.props.api + 'getCampaigns/' + client;


    jQuery.get( action, ( data ) => {

        }).fail((data)=>{

        }).done((data)=>{

            this.setState({data: data});

    });

  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
          <div className="container-fluid">

                {/* If user is an admin allow them to switch clients */}
                { this.props.role === 'admin' && (

                  <ClientChoose alertType="alert alert-info">
                    <strong><span>Welcome Admin. Please choose a client to view/edit their campaigns.</span></strong>
                  </ClientChoose>

                )}


                {/* Add a new campaign */}
                <div className="row">
                    <div className="col-md-9">

                    </div>

                    <div className="col-md-3 text-center">
                          <Link to="/dashboard/newCampaign" activeClassName={"activebutton"}>
                             <button className="btn btn-success btn-fill pull-right">Add New Campaign</button>
                          </Link>
                    </div>
                </div>

                {/* Display error message if no clients are chosen */}
                <h2 className="noClient text-center">Please choose a client.</h2>

                {/* Display all campaigns for a client if a client is chosen */}
                <div className="hasClient">
                  <ProductsTblPage data={this.state.data} />
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
        }



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Campaigns);
