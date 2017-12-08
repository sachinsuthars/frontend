import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
import ProductsTblPage from './scheduled/table.js';
import ProductsTblPageQuery from './queries/table.js';

//Import jquery
const jQuery = require("jquery");

class Reports extends Component {

  constructor(props){
        super(props);

        this.state = {
          clientChosen : '',
          data : []
        };

  }

  componentDidMount() {

    console.log(this.props.role);

    this.props.changeInitial('Reports');

    //this.setState({clientChosen: document.getElementById('clientChoose').value})

    //this.searchCampaigns(document.getElementById('clientChoose').value);

    //Fix package spelling
    jQuery('.sortable-table .desc').hide();
    jQuery('.SortableTblLabel').hide();
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

                <div className="row">
                    <div className="col-md-6">

                    </div>

                    <div className="col-md-6 text-center">

                          <Link to="generateReport" activeClassName={"activebutton"}>
                             <button className="btn btn-success btn-fill pull-right">New Query</button>
                          </Link>

                    </div>
                </div>

               {/* Only Admins May See This Area */}
               { this.props.role === 'admin' && (
                  <div className="row">
                      <div className="col-md-12">
                          <h5>Only Admins are allowed to choose a client.</h5>
                          <form>
                            <label htmlFor="clientChoose" className="control-label">Choose a client:</label>
                            <select className="form-control" name="clientChoose" id="clientChoose" onChange={this.changeClient.bind(this)}>
                              <option value="NONE">Please Select a Client</option>
                              <option value="FBNYC">FBNYC</option>
                              <option value="TEST">TEST</option>
                            </select>
                          </form>
                      </div>
                  </div>
              )}

                  <div className="card">

                      <div className="card-content">
                          <div className="row">
                              <div className="col-md-2">
                                <ul className="nav nav-pills nav-pills-icons nav-pills-danger nav-stacked" role="tablist">
                                  <li className="active">
                                      <a href="#dashboard-2" role="tab" data-toggle="tab">
                                          <i className="material-icons">dashboard</i> Queries
                                      </a>
                                  </li>

                                  <li>
                                      <a href="#schedule-2" role="tab" data-toggle="tab">
                                          <i className="material-icons">schedule</i> Scheduled
                                      </a>
                                  </li>

                                  <li>
                                      <a href="#schedule-2" role="tab" data-toggle="tab">
                                          <i className="material-icons">dashboard</i> Job Monitor
                                      </a>
                                  </li>
                                </ul>
                              </div>

                              <div className="col-md-10">
                                  <div className="tab-content">
                                      <div className="tab-pane active" id="dashboard-2">

                                        <ProductsTblPage data={this.state.data} />

                                      </div>

                                      <div className="tab-pane" id="schedule-2">

                                        <ProductsTblPageQuery data={this.state.data} />

                                      </div>

                                  </div>
                              </div>
                          </div>
                      </div>

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

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
