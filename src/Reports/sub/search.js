import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import Table from './table.js';

//Components
const axios = require('axios');
const jQuery = require("jquery");
const moment = require('moment');
import QueryBuilder from 'react-querybuilder';

const fields = [
    {name: 'firstName', label: 'First Name'},
    {name: 'lastName', label: 'Last Name'},
    {name: 'age', label: 'Age'},
    {name: 'address', label: 'Address'},
    {name: 'phone', label: 'Phone'},
    {name: 'email', label: 'Email'},
    {name: 'twitter', label: 'Twitter'},
    {name: 'isDev', label: 'Is a Developer?', value: false},
];


class Search extends React.Component{
    constructor(props){
      super(props);

        this.state = {
            dataRows: [],
            queryReportDownload: '',
            fullReportDownload: '',
            transactionReportDownload: '',
            recurringReportDownload: '',
            query: {}
        };
    }

    componentWillMount(){

    }

    componentDidMount(){


       window.demo.initFormExtendedDatetimepickers();


    }

    searchData(event){


    }


    logQuery(query) {

      this.setState({query: query});

    }

    handleSubmitQuery(event){

        event.preventDefault();

        let formData = jQuery('#searchQuery').serializeArray();

        let action = this.props.api + 'newQuery';


        jQuery.post( action, formData, ( data ) => {


        }).fail((data)=>{



        }).done((data)=>{

          console.log(data);
          window.swal(
            'Succcess',
             data,
            'success'
          );


        });
    }



    render(){



        return(

          <div>
            <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Generate a Query -
                      <small className="category"> Please choose a query type.</small>
                    </h4>
                  </div>
                  <div className="card-content">
                    <div className="row">
                      <div className="col-md-4">

                        <ul className="nav nav-pills nav-pills-icons nav-pills-danger nav-stacked" role="tablist">

                          <li className="active">
                            <a href="#dashboard-1" role="tab" data-toggle="tab">
                              <i className="material-icons">date_range</i> Date Range
                            </a>
                          </li>

                          <li>
                            <a href="#dashboard-2" role="tab" data-toggle="tab">
                              <i className="material-icons">call_to_action</i> Query Builder
                            </a>
                          </li>

                        </ul>


                      </div>

                      <div className="col-md-8">
                        <div className="tab-content">


                          <div className="tab-pane active" id="dashboard-1">
                            <form id="searchDateRange" data-type="daterange" onSubmit={this.searchData.bind(this)}>

                            <h3>Date Range Query</h3>

                            <br/>

                            <div className="col-md-12">
                                  <h4 className="card-title">Query Name</h4>
                                  <div className="form-group">
                                   <input type="text" id="query" className="form-control" required />
                                  <span className="material-input" /></div>
                            </div>

                            <div className="col-md-12">
                                  <h4 className="card-title">Query Description</h4>
                                  <div className="form-group">
                                   <input type="text" id="description" className="form-control" required />
                                  <span className="material-input" /></div>
                            </div>

                            <div className="col-md-12">
                                  <h4 className="card-title">Start Date</h4>
                                  <div className="form-group">

                                  <input required type="text" id="startDate" className="form-control datepicker" defaultValue="08/01/2017" required />
                                  <span className="material-input" /></div>
                            </div>

                            <div className="col-md-12">
                                <br/>
                                <br/>
                                <h4 className="card-title">End Date</h4>
                                <div className="form-group">

                                <input required type="text" id="endDate" className="form-control datepicker" defaultValue="08/31/2017" required />
                                <span className="material-input" /></div>
                            </div>

                            <div className="row">

                                  <div className="col-md-6  text-center">
                                      <br/>
                                      <div className="form-group">
                                      <button  className="btn btn-danger btn-round btn-lg">
                                          <i className="material-icons">search</i>
                                            Run Query<div className="ripple-container"></div>
                                      </button>

                                      </div>
                                  </div>

                                  <div className="col-md-6 text-center">
                                      <br/>
                                      <div className="form-group">
                                      <button  className="btn btn-warning btn-round btn-lg">
                                          <i className="material-icons">save</i>
                                             &nbsp;Save Query<div className="ripple-container"></div>
                                      </button>

                                      </div>
                                  </div>

                            </div>


                            </form>
                          </div>


                          <div className="tab-pane" id="dashboard-2">
                            <form id="searchQuery" data-type="appeal" onSubmit={this.searchData.bind(this)}>

                            <h3>Build a Query</h3>

                            <br/>

                            <div className="col-md-12">
                                  <h4 className="card-title">Query Name</h4>
                                  <div className="form-group">
                                   <input type="text" id="query" className="form-control" required />
                                  <span className="material-input" /></div>
                            </div>

                            <div className="col-md-12">
                                  <h4 className="card-title">Query Description</h4>
                                  <div className="form-group">
                                   <input type="text" id="description" className="form-control" required />
                                  <span className="material-input" /></div>
                            </div>


                            <div className="text-center">
                                <QueryBuilder fields={fields} onQueryChange={this.logQuery.bind(this)}/>
                            </div>

                            <div className="row">

                              <div className="col-md-6  text-center">
                                  <br/>
                                  <div className="form-group">
                                  <button  className="btn btn-danger btn-round btn-lg">
                                      <i className="material-icons">search</i>
                                        Run Query<div className="ripple-container"></div>
                                  </button>

                                  </div>
                              </div>

                              <div className="col-md-6 text-center">
                                  <br/>
                                  <div className="form-group">
                                  <button  className="btn btn-warning btn-round btn-lg">
                                      <i className="material-icons">save</i>
                                         &nbsp;Save Query<div className="ripple-container"></div>
                                  </button>

                                  </div>
                              </div>

                            </div>


                            </form>
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
        allClients : state.allClients,
        apiURL: state.apiURL,
        reportAPI : state.reportAPI,
        report : state.report,
        fullExport : state.fullExport,
        queryExport : state.queryExport,
        transactionExport : state.transactionExport,
        recurringExport : state.recurringExport,


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
        updateReport : (data) => {
            dispatch(
                {
                    type: "UpdateReport",
                    payload : data
                }
            );
        },
        fullExportUpdate : (data) => {
            dispatch(
                {
                    type: "FullExport",
                    payload : data
                }
            );
        },
        queryExportUpdate : (data) => {
            dispatch(
                {
                    type: "QueryExport",
                    payload : data
                }
            );
        },
        transactionExportUpdate : (data) => {
            dispatch(
                {
                    type: "TransactionExport",
                    payload : data
                }
            );
        },
        recurringExportUpdate : (data) => {
            dispatch(
                {
                    type: "RecurringExport",
                    payload : data
                }
            );
        }


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);
