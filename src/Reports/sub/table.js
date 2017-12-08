import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';


//Components
const axios = require('axios');
const jQuery = require("jquery");

class Table extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataRows: [],
            reportData : this.props.report,
            reportSchema : '',
            fullExport : this.props.fullExport,
            queryExport : this.props.queryExport,
            transactionExport : this.props.transactionExport,
            recurringExport : this.props.recurringExport,
        };
    }

    componentWillMount(){



    }

    componentDidMount(){
        jQuery('#tableResults').hide();

        //this.getSchemaReports();

    }

    getSchemaReports(){

        let url = this.props.apiURL + 'getFileSchema';

        axios.get(url)
        .then( (response) =>{

          let schemaObject = {};

          this.setState({reportMeasure: response.data.reports});

          for(var i = 0; i < response.data.schemaRow.length; i++){

            let currentField = String(response.data.schemaRow[i]);
            schemaObject[response.data.schemaRow[i]] = response.data[currentField];
          }

          schemaObject = [schemaObject];

          this.setState({reportSchema: schemaObject});

          console.log(schemaObject);

          //this.generateReports();


        })
        .catch( (error) =>{
          console.log(error);
        });

    }

    componentWillReceiveProps(nextProps){
      console.log(nextProps);



    }


    updateData(event){

        event.preventDefault();
        this.getData();

    }

    updateReport(row){

        let newArray = this.state.fullreport.slice();
        newArray.push(row);
        this.setState({fullreport:newArray});

    }




    generateReports(){



    };







    render(){



        return(



              <div className="col-md-6" id="tableResults">


              {/* Report Results */}

                  {/* Card */}
                  <div className="card">

                      {/* Card Content */}
                      <div className="card-content">

                      {/* Sub Row */}
                      <div className="row">

                           {/* Sub Columns */}
                          <div className="col-md-12">


                            <h3 className="title text-center">Search Results</h3>


                            <br />


                            {/* Navigation */}
                            <div className="nav-center">
                              <ul className="nav nav-pills nav-pills-primary nav-pills-icons" role="tablist">

                                <li className="active">
                                  <a href="#description-1" role="tab" data-toggle="tab">
                                    <i className="material-icons">check_circle</i> Data Totals
                                  </a>
                                </li>


                                <li>
                                  <a href="#tasks-2" role="tab" data-toggle="tab">
                                    <i className="material-icons">file_download</i> Export
                                  </a>
                                </li>
                              </ul>
                            </div>


                            {/* Tab Content */}
                            <div className="tab-content">


                              <div className="tab-pane active" id="description-1">

                                  <div className="card-content table-responsive table-full-width">


                                      <table className="table table-hover">
                                        <thead>
                                          <tr><th>Type</th>
                                            <th>Amount</th>
                                            <th>Revenue</th>
                                            <th>Average</th>
                                            <th>First Time</th>
                                          </tr></thead>
                                        <tbody>

                                          <tr className="success">
                                            <td>Combined</td>
                                            <td>{this.props.report.totalNumberOfGifts}</td>
                                            <td>jQuery{this.props.report.totalRevenue}</td>
                                            <td>jQuery{this.props.report.averageGift}</td>
                                            <td>{this.props.report.numberOfFirstTimeDonors}</td>
                                          </tr>


                                        </tbody>
                                      </table>

                                      <table className="table table-hover">
                                        <thead>
                                          <tr><th>Type</th>
                                            <th>Amount</th>
                                            <th>Revenue</th>
                                            <th>Average</th>
                                            <th>First Time</th>
                                          </tr></thead>
                                        <tbody>

                                          <tr className="info">
                                            <td>One Time</td>
                                            <td>{this.props.report.numberOfOneTime}</td>
                                            <td>jQuery{this.props.report.totalRevenueOneTime}</td>
                                            <td>jQuery{this.props.report.averageGiftOneTime}</td>
                                            <td>{this.props.report.numberOfFirstTimeDonorsSingle}</td>
                                          </tr>

                                        </tbody>
                                      </table>

                                      <table className="table table-hover">
                                        <thead>
                                          <tr><th>Type</th>
                                            <th>Amount</th>
                                            <th>Revenue</th>
                                            <th>Average</th>
                                            <th>First Time</th>
                                          </tr></thead>
                                        <tbody>

                                          <tr className="danger">
                                            <td>Recurring</td>
                                            <td>{this.props.report.numberOfRecurring}</td>
                                            <td>jQuery{this.props.report.totalRevenueRecurring}</td>
                                            <td>jQuery{this.props.report.averageGiftRecurring}</td>
                                            <td>{this.props.report.numberOfFirstTimeDonorsRecurring}</td>
                                          </tr>

                                        </tbody>
                                      </table>

                                      <table className="table table-hover">
                                        <thead>
                                          <tr><th>Type</th>
                                            <th>Amount</th>
                                            <th>Revenue</th>
                                            <th>Average</th>
                                            <th>First Time</th>
                                          </tr></thead>
                                        <tbody>

                                          <tr className="warning">
                                            <td>Non-Initial</td>
                                            <td>0</td>
                                            <td>jQuery0</td>
                                            <td>jQuery0</td>
                                            <td>0</td>
                                          </tr>

                                        </tbody>
                                      </table>

                                            <h3 className="title text-center">Conversion Rate: {this.props.report.conversionRate}</h3>

                                    </div>


                              </div>

                              <div className="tab-pane" id="schedule-1">


                                  <div className="card-content">
                                        <h3 className="title text-center">Top 10 Largest Gifts</h3>
                                  </div>






                              </div>





                              <div className="tab-pane" id="tasks-2">

                                  <div className="card-header">
                                    <h4 className="card-title">Export csv reports.</h4>
                                  </div>
                                  <div className="card-content">

                                    <div className="table-responsive">
                                      <table className="table table-striped">
                                        <thead>
                                          <tr><th>Name</th>
                                          <th>Format</th>
                                          <th>Description</th>
                                          <th>Download</th>
                                          </tr></thead>
                                        <tbody>

                                          <tr>
                                            <td>Query Results</td>
                                            <td>Full</td>
                                            <td>Download a csv of the query results.</td>
                                            <td>

                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Full Results</td>
                                            <td>Full</td>
                                            <td>All data from transactions.</td>
                                            <td>

                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Transaction</td>
                                            <td>CRM</td>
                                            <td>Report of one time donations and initial recurring transactions.</td>
                                            <td>

                                            </td>
                                          </tr>

                                          <tr>
                                            <td>Recurring</td>
                                            <td>CRM</td>
                                            <td>Transactions from recurring donors that are non-initial</td>
                                            <td>

                                            </td>
                                          </tr>

                                        </tbody>
                                      </table>
                                    </div>


                                  </div>

                              </div>


                            </div>
                            {/* Close Tab Content */}


                          </div>
                          {/* Close Sub Columns */}

                        </div>
                        {/* Close Sub Row */}


                      </div>
                       {/* Card Content Content */}

                  </div>
                   {/* Close Card */}


                  {/* Close Report Results */}
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


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Table);
