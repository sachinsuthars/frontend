import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {CSVLink, CSVDownload} from 'react-csv';
import Table from './table.js';

//Components
const axios = require('axios');

class Search extends React.Component{
    constructor(props){
      super(props);

        this.state = {
            dataRows: [],
            queryReportDownload: '',
            fullReportDownload: '',
            transactionReportDownload: '',
            recurringReportDownload: '',
        };
    }

    componentWillMount(){
       $('#tableResults').hide();
       $('#tableLoading').hide();
    }

    componentDidMount(){
       $('#tableResults').hide();
       $('#tableLoading').hide();


      demo.initFormExtendedDatetimepickers();


    }

    searchData(event){
      event.preventDefault();

      $('#tableResults').hide();
      $('#tableLoading').show();

      let type = event.target.attributes.getNamedItem("data-type").value;
      let url = this.props.apiURL + 'masterReporting';
      let paramsSet;

      if(type == 'daterange'){
        paramsSet = {
           reportType: type,
           date01 : $('#startDate').val().replace('/' , '-').replace('/' , '-'),
           date02 : $('#endDate').val().replace('/' , '-').replace('/' , '-'),
        };
      }

      if(type == 'appeal'){
        paramsSet = {
           reportType: type,
           appeal : $('#appealCode').val(),
        };
      }

      if(type == 'pageid'){
        paramsSet = {
           reportType: type,
           pageid : $('#pageID').val(),
        };
      }



      //Make JSON Promise request
      axios.get(url, {params: paramsSet})
      .then( (response) =>{

        //Send Data to Table

        this.props.updateReport(response.data);

        this.createReportQuery(response.data);

        this.createFullReport(response.data);

        this.createTransactionReport(response.data);

        this.createRecurringReport(response.data);

        $('#tableLoading').hide();
        $('#tableResults').show();

      })
      .catch( (error) =>{
        console.log(error);
      });


    }

    createReportQuery(data){


      let newArrayQueryResults = [[
        "Gifts Total", "Total Revenue", "Average Gift", "First Time Donors",
        "One Time Gifts Total", "One Time Total Revenue", "One Time Average Gift", "One Time First Time Donors",
        "Recurring Gifts Total", "Recurring Total Revenue", "Recurring Average Gift", "Recurring First Time Donors",
        "Conversion Rate"
      ]];

      let queryRow = [
           data.totalNumberOfGifts,
           data.totalRevenue,
           data.averageGift,
           data.numberOfFirstTimeDonors,


           data.numberOfOneTime,
           data.totalRevenueOneTime,
           data.averageGiftOneTime,
           data.numberOfFirstTimeDonorsSingle,

           data.numberOfRecurring,
           data.totalRevenueRecurring,
           data.averageGiftRecurring,
           data.numberOfFirstTimeDonorsRecurring,

           data.conversionRate
      ];

         //  let newArrayQueryResults = this.state.queryReportDownload.slice();

        newArrayQueryResults.push(queryRow);

        this.setState({queryReportDownload: newArrayQueryResults});


    };


    createFullReport(data){

      let newArrayQueryResults = [['Amount', 'Appeal/Source', 'Auth Code','Card Type','City', 'Home or Business', 'Convertion Type', 'Company Match Name', 'Corporate Donation', 'Creative', 'Customer Token','Date', 'Designation', 'Donation Type', 'Email', 'First Name', 'Last Name', 'First Time Donor', 'IP Address', 'IP City', 'IP Country', 'IP Postal Code', 'IP State', 'ISP', 'Last 4', 'Payment Token', 'Phone', 'Page ID', 'Postal Code', 'Reference Code', 'State', 'Street Address', 'Initial Subscription', 'Subscription Frequency', 'Subscription ID', 'Subscription Status', 'Time Completed', 'Time Started', 'Title', 'Transaction ID', 'Tribute Send a Letter'
     ]];


         for(var i = 0; i < data.allData.length; i++){

             let queryRow = [
               data.allData[i].amount,
               data.allData[i].Appeal,
               data.allData[i].authCode,
               data.allData[i].cardType,
               data.allData[i].city,
               data.allData[i].companyorperson,
               data.allData[i].conversiontype,
               data.allData[i].companymatch,
               data.allData[i].corporatedonation,
               data.allData[i].creative,
               data.allData[i].customer,
               data.allData[i].date,
               data.allData[i].designation,
               data.allData[i]['donation Type'],
               data.allData[i].email,
               data.allData[i].firstName,
               data.allData[i].lastName,
               data.allData[i].firstTimeDonor,
               data.allData[i]['ip address'],
               data.allData[i].ipcity,
               data.allData[i].ipcountry,
               data.allData[i]['ippostal code'],
               data.allData[i].ipstate,
               data.allData[i].isp,
               data.allData[i].last4,
               data.allData[i]['payment Token'],
               data.allData[i].phone,
               data.allData[i].pid,
               data.allData[i].postal,
               data.allData[i].reference,
               data.allData[i].state,
               data.allData[i].streetaddress,
               data.allData[i].subscriptinitial,
               data.allData[i].subscriptionFrequency,
               data.allData[i].subscriptionid,
               data.allData[i].subscriptionstatus,
               data.allData[i].timecompleted,
               data.allData[i].timestarted,
               data.allData[i].title,
               data.allData[i].transactionID,
               data.allData[i].tributemail
             ]

             newArrayQueryResults.push(queryRow);

             this.setState({fullReportDownload: newArrayQueryResults});

         }


    };

    createTransactionReport(data){

      let newArrayQueryResults = [[ 'Account System', 'Amount', 'Date' , 'Revenue Type', 'Payment Method', 'Other Method', 'Inbound Channel', 'Application', 'Card Type', 'Partial card number', 'Installment frequency', 'Installment Start date', 'GL post date', 'Receipt number', 'Receipt amount', 'Name on card', 'Card number', 'Authorization code', 'Designation', 'GL post status', 'Appeal', 'URL info', 'New/edit constituent Last\org\group\household name', 'New/edit constituent First name', 'New/edit constituent Middle name', 'New/edit constituent Title', 'New/edit constituent Suffix', 'New/edit constituent Address type', 'New/edit constituent Country','New/edit constituent Address', 'New/edit constituent City', 'New/edit constituent State', 'New/edit constituent ZIP', 'New/edit constituent Phone type', 'New/edit constituent Phone number', 'New/edit constituent Email type', 'New/edit constituent Email address', 'Braintree Transaction ID'
      ]];


       for(var i = 0; i < data.allData.length; i++){

         let transactionDateFormat = moment(data.allData[i].date).format('M/DD/YYYY');

         let pageIDpost = 'PID=' + data.allData[i].PageID;

         let recurringCC = 'Credit card - ' + data.allData[i].last4;

          if(
            data.allData[i]["donation Type"] == 'recurring'
            && data.allData[i].subscriptinitial == 'Yes'){

              let queryRow = [
                  'Default Account System',
                  data.allData[i].amount,
                  transactionDateFormat,
                  'Recurring gift',
                  recurringCC,
                  '',
                  'Online',
                  'Donation',
                  data.allData[i].cardType,
                  data.allData[i].last4,
                  data.allData[i].subscriptionFrequency,
                  moment(data.allData[i].date).format('M/DD/YYYY'),
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  data.allData[i].designation,
                  '',
                  data.allData[i].Appeal,
                  pageIDpost,
                  data.allData[i].lastName,
                  data.allData[i].firstName,
                  '',
                  data.allData[i].title,
                  '',
                  data.allData[i].companyorperson,
                  data.allData[i].ipcountry,
                  data.allData[i].streetaddress,
                  data.allData[i].city,
                  data.allData[i].state,
                  data.allData[i].postal,
                  data.allData[i].companyorperson,
                  data.allData[i].phone,
                  data.allData[i].companyorperson,
                  data.allData[i].email,
                  data.allData[i].transactionID

              ];

              newArrayQueryResults.push(queryRow);

          } else if (data.allData[i]["donation Type"] == 'single'){

            let queryRow = [
                'Default Account System',
                data.allData[i].amount,
                transactionDateFormat,
                'Payment',
                'Credit card',
                '',
                'Online',
                'Donation',
                data.allData[i].cardType,
                data.allData[i].last4,
                'Single Installment',
                '',
                transactionDateFormat,
                data.allData[i].transactionID,
                data.allData[i].amount,
                data.allData[i].cardholderName,
                data.allData[i]["payment Token"],
                data.allData[i].authCode,
                data.allData[i].designation,
                'Not posted',
                data.allData[i].Appeal,
                pageIDpost,
                data.allData[i].lastName,
                data.allData[i].firstName,
                '',
                data.allData[i].title,
                '',
                data.allData[i].companyorperson,
                data.allData[i].ipcountry,
                data.allData[i].streetaddress,
                data.allData[i].city,
                data.allData[i].state,
                data.allData[i].postal,
                data.allData[i].companyorperson,
                data.allData[i].phone,
                data.allData[i].companyorperson,
                data.allData[i].email,
                data.allData[i].transactionID

            ];


            newArrayQueryResults.push(queryRow);


          }


       }

       this.setState({transactionReportDownload: newArrayQueryResults});

    };

    createRecurringReport(data){

        let newArrayQueryResults = [[ 'Account System', 'Amount', 'Date' , 'Revenue Type', 'Payment Method', 'Other Method', 'Inbound Channel', 'Application', 'Card Type', 'Partial card number', 'Installment frequency', 'Installment Start date', 'GL post date', 'Receipt number', 'Receipt amount', 'Name on card', 'Card number', 'Authorization code', 'Designation', 'GL post status', 'Appeal', 'URL info', 'New/edit constituent Last\org\group\household name', 'New/edit constituent First name', 'New/edit constituent Middle name', 'New/edit constituent Title', 'New/edit constituent Suffix', 'New/edit constituent Address type', 'New/edit constituent Country', 'New/edit constituent Address','New/edit constituent City', 'New/edit constituent State', 'New/edit constituent ZIP', 'New/edit constituent Phone type', 'New/edit constituent Phone number', 'New/edit constituent Email type', 'New/edit constituent Email address', 'Braintree Transaction ID'
        ]];

        for(var i = 0; i < data.allData.length; i++){

          let transactionDateFormat = moment(data.allData[i].date).format('M/DD/YYYY');

          let pageIDpost = 'PID=' + data.allData[i].PageID;

          let recurringCC = 'Credit card' + data.allData[i].last4;


          if( data.allData[i].subscriptinitial == 'No'){

              let queryRow = [
                  'Default Account System',
                  data.allData[i].amount,
                  transactionDateFormat,
                  'Recurring gift',
                  recurringCC,
                  '',
                  'Online',
                  'Donation',
                  data.allData[i].cardType,
                  data.allData[i].last4,
                  data.allData[i].subscriptionFrequency,
                  data.allData[i].subscriptionStartDate,
                  '',
                  '',
                  '',
                  '',
                  '',
                  '',
                  data.allData[i].designation,
                  '',
                  '',
                  pageIDpost,
                  data.allData[i].lastName,
                  data.allData[i].firstName,
                  '',
                  data.allData[i].title,
                  '',
                  data.allData[i].companyorperson,
                  data.allData[i].ipcountry,
                  data.allData[i].streetaddress,
                  data.allData[i].city,
                  data.allData[i].state,
                  data.allData[i].postal,
                  data.allData[i].companyorperson,
                  data.allData[i].phone,
                  data.allData[i].companyorperson,
                  data.allData[i].email,
                  data.allData[i].transactionID

              ];

              newArrayQueryResults.push(queryRow);

          }

        }

        this.setState({recurringReportDownload: newArrayQueryResults});

    };


    render(){



        return(

          <div>
            <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Generate a Report -
                      <small className="category"> Please choose a report type.</small>
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
                              <i className="material-icons">call_to_action</i> Appeal
                            </a>
                          </li>

                           <li>
                              <a href="#dashboard-3" role="tab" data-toggle="tab">
                               <i className="material-icons">web</i> Page ID
                              </a>
                            </li>

                        </ul>


                      </div>

                      <div className="col-md-8">
                        <div className="tab-content">


                          <div className="tab-pane active" id="dashboard-1">
                            <form id="searchDateRange" data-type="daterange" onSubmit={this.searchData.bind(this)}>

                            <h3>Insert a date range.</h3>

                            <br/>

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

                            <div className="col-md-4 col-md-offset-4 text-center">
                                <br/>
                                <div className="form-group">
                                <button type="submit" className="btn btn-danger btn-round btn-lg">
                                    <i className="material-icons">search</i>
                                      Search<div className="ripple-container"></div>
                                </button>

                                </div>
                            </div>


                            </form>
                          </div>


                          <div className="tab-pane" id="dashboard-2">
                            <form id="searchAppeal" data-type="appeal" onSubmit={this.searchData.bind(this)}>

                            <h3>Insert an appeal code.</h3>

                            <br/>

                            <div className="col-md-12">
                                  <h4 className="card-title">Code</h4>
                                  <div className="form-group">

                                   <input type="text" id="appealCode" className="form-control" required />
                                  <span className="material-input" /></div>
                            </div>


                            <div className="col-md-4 col-md-offset-4 text-center">
                                <br/>
                                <div className="form-group">
                                <button type="submit" className="btn btn-danger btn-round btn-lg">
                                    <i className="material-icons">search</i>
                                      Search<div className="ripple-container"></div>
                                </button>

                                </div>
                            </div>


                            </form>
                          </div>

                         <div className="tab-pane" id="dashboard-3">
                            <form id="searchPage" data-type="pageid" onSubmit={this.searchData.bind(this)}>

                            <h3>Insert a page id number.</h3>

                            <br/>

                            <div className="col-md-12">
                                  <h4 className="card-title">ID</h4>
                                  <div className="form-group">

                                   <input type="text" id="pageID" className="form-control" required/>
                                  <span className="material-input" /></div>
                            </div>


                            <div className="col-md-4 col-md-offset-4 text-center">
                                <br/>
                                <div className="form-group">
                                <button type="submit" className="btn btn-danger btn-round btn-lg">
                                    <i className="material-icons">search</i>
                                      Search<div className="ripple-container"></div>
                                </button>

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


              <Table
              queryReportDownload={this.state.queryReportDownload}
              fullReportDownload={this.state.fullReportDownload}
              transactionReportDownload={this.state.transactionReportDownload}
              recurringReportDownload={this.state.recurringReportDownload}
              />

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
