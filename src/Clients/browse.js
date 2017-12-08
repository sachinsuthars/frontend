import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import UI Components
import CardWithHeader from '../UI/cardWithHeader.js';
import CardWithHeaderNoIcon from '../UI/cardWithHeaderNoIcon.js';


//Import jquery
const jQuery = require("jquery");

class BrowseClients extends Component {

  constructor(props){
        super(props);

        this.state = {

            initial: '',
            campaign: 0,
            creative: 0


        };

  }

  componentWillMount(){

    this.searchCampaigns(this.props.client);
    this.searchCreatives(this.props.client);

  }

  componentDidMount(){


  }

  searchCampaigns(client){

    let action = this.props.api + 'getCampaigns/' + client;


    jQuery.get( action, ( data ) => {

        }).fail((data)=>{

        }).done((data)=>{


            this.setState({campaign: data.length});

    });

  }

  searchCreatives(client){


    let action = this.props.api + 'getCreatives/' + client;

    jQuery.get( action, ( data ) => {

        }).fail((data)=>{

        }).done((data)=>{

            this.setState({creative: data.length});

    });

  }



  render() {



    return (

        <section id="browseClients">

          <CardWithHeader title={this.props.client} color="green" icon="language">

              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th className="text-center">#</th>
                      <th>Client</th>
                      <th>Name</th>
                      <th>Url</th>
                      <th>Campaign Count</th>
                      <th>Creative Count</th>
                      <th className="text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-center">1</td>
                      <td>FBNYC</td>
                      <td>Food Bank For New York City</td>
                      <td>http://www.foodbanknyc.org/</td>
                      <td>{this.state.campaign}</td>
                      <td>{this.state.creative}</td>

                      <td className="td-actions text-right">
                         <button type="button" rel="tooltip" className="btn btn-info btn-simple">
                          View
                        </button>
                        <button type="button" rel="tooltip" className="btn btn-success btn-simple">
                          Edit
                        </button>
                      </td>

                    </tr>


                  </tbody>
                </table>
              </div>

          </CardWithHeader>

        </section>


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

export default connect(mapStateToProps, mapDispatchToProps)(BrowseClients);
