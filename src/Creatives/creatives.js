import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
import BrowseClients from '../Clients/browse.js';
import LayoutPreview from '../Layouts/layoutPreview.js';
import ClientChoose from '../Clients/chooseClient.js';
import ProductsTblPage from './searchComponents/table.js';

//Import jquery
const jQuery = require("jquery");

class Creatives extends Component {

  constructor(props){
        super(props);

        this.state = {
          clientChosen: '',
          newCreative : 'newCreative/',
          data : [],
        };

  }

  componentDidMount() {

    //Set Page Name
    this.props.changeInitial('Search Creatives');

    //Search for Chosen Client Campaigns
    if(this.props.client != 'NONE'){
      jQuery('.noClient').hide();
      jQuery('.hasClient').show();
      this.searchCreatives(this.props.client);
      this.setState({newCreative: 'newCreative/' + this.props.client});
    } else {
      jQuery('.noClient').show();
      jQuery('.hasClient').hide();
    }

    //Fix package spelling
    jQuery('.sortable-table .desc').hide();



  }

  componentWillReceiveProps(){

     //Search for new client campaigns
     setTimeout(()=>{

       if(this.props.client != "NONE"){
         jQuery('.noClient').hide();
         jQuery('.hasClient').show();
         this.searchCreatives(this.props.client);
         this.setState({newCreative: 'newCreative/' + this.props.client});

       } else {

         jQuery('.noClient').show();
         jQuery('.hasClient').hide();

       }

     },300);


  }



  searchCreatives(client){


    let action = this.props.api + 'getCreatives/' + client;

    jQuery.get( action, ( data ) => {

        }).fail((data)=>{

        }).done((data)=>{

            console.log(data);
            this.setState({data: data});

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

                {/* If user is an admin allow them to switch clients */}
                { this.props.role === 'admin' && (

                  <ClientChoose alertType="alert alert-info">
                    <strong><span>Welcome Admin. Please choose a client to view/edit their creatives.</span></strong>
                  </ClientChoose>

                )}

                <br/>

                <div className="row hasClient">
                    <div className="col-md-9">
                        <h3>Search all creatives</h3>
                    </div>

                    <div className="col-md-3 text-center">
                          <Link to={this.state.newCreative} activeClassName={"activebutton"}>
                             <button className="btn btn-success btn-fill pull-right">Add New Creative</button>
                          </Link>
                    </div>
                </div>


                {/* Display all campaigns for a client if a client is chosen */}
                <div className="row">
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

export default connect(mapStateToProps, mapDispatchToProps)(Creatives);
