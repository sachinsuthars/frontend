import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {CSVLink, CSVDownload} from 'react-csv';

//Components

import Search from './reports/search.js';

class Reports extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataRows: [],
            reportData : '',
            reportStyle : {display: 'block'},
            reportNoData: {display: 'none'},
            reportSearch : {display: 'none'},
            searchByDateRange : {display: 'none'},
            searchByPageID : {display: 'none'},
            searchByAppeal : {display: 'none'},

            reportMaster : {
              "fullreport" : [],
              ""
            }

            fullreport : [['Amount', 'Appeal/Source', 'Auth Code','Card Type','City', 'Home or Business', 'Convertion Type', 'Company Match Name', 'Corporate Donation', 'Creative', 'Customer Token','Date', 'Designation', 'Donation Type', 'Email', 'First Name', 'Last Name', 'First Time Donor', 'IP Address', 'IP City', 'IP Country', 'IP Postal Code', 'IP State', 'ISP', 'Last 4', 'Payment Token', 'Phone', 'Page ID', 'Postal Code', 'Reference Code', 'State', 'Street Address', 'Initial Subscription', 'Subscription Frequency', 'Subscription ID', 'Subscription Status', 'Time Completed', 'Time Started', 'Title', 'Transaction ID', 'Tribute Send a Letter',]],

            queryResults : [['Gifts Total', 'Total Revenue', 'Average Gift', 'First Time Donors', 'One Time Gifts Total', 'One Time Total Revenue', 'One Time Average Gift', 'One Time First Time Donors', 'Recurring Gifts Total', 'Recurring Total Revenue', 'Recurring Average Gift', 'Recurring First Time Donors', 'Conversion Rate']],

            fullReportOneTime: [['Amount', 'Appeal/Source', 'Auth Code','Card Type','City', 'Home or Business', 'Convertion Type', 'Company Match Name', 'Corporate Donation', 'Creative', 'Customer Token','Date', 'Designation', 'Donation Type', 'Email', 'First Name', 'Last Name', 'First Time Donor', 'IP Address', 'IP City', 'IP Country', 'IP Postal Code', 'IP State', 'ISP', 'Last 4', 'Payment Token', 'Phone', 'Page ID', 'Postal Code', 'Reference Code', 'State', 'Street Address', 'Initial Subscription', 'Subscription Frequency', 'Subscription ID', 'Subscription Status', 'Time Completed', 'Time Started', 'Title', 'Transaction ID', 'Tribute Send a Letter' ]],

            BMSFormattedOneTime: [[ 'Account System', 'Amount', 'Date' , 'Revenue Type', 'Payment Method', 'Other Method', 'Inbound Channel', 'Application', 'Card Type', 'Partial card number', 'Installment frequency', 'Installment Start date', 'GL post date', 'Receipt number', 'Receipt amount', 'Name on card', 'Card number', 'Authorization code', 'Designation', 'GL post status', 'Appeal', 'URL info', 'New/edit constituent Last\org\group\household name', 'New/edit constituent First name', 'New/edit constituent Middle name', 'New/edit constituent Title', 'New/edit constituent Suffix', '', '', '', '', '', '', 'New/edit constituent Address type', 'New/edit constituent Country', 'New/edit constituent City', 'New/edit constituent State', 'New/edit constituent ZIP', 'New/edit constituent Phone type', 'New/edit constituent Phone number', 'New/edit constituent Email type', 'New/edit constituent Email address' , 'Braintree Transaction ID']],

            fullReportRecurring: [['Amount', 'Appeal/Source', 'Auth Code','Card Type','City', 'Home or Business', 'Convertion Type', 'Company Match Name', 'Corporate Donation', 'Creative', 'Customer Token','Date', 'Designation', 'Donation Type', 'Email', 'First Name', 'Last Name', 'First Time Donor', 'IP Address', 'IP City', 'IP Country', 'IP Postal Code', 'IP State', 'ISP', 'Last 4', 'Payment Token', 'Phone', 'Page ID', 'Postal Code', 'Reference Code', 'State', 'Street Address', 'Initial Subscription', 'Subscription Frequency', 'Subscription ID', 'Subscription Status', 'Time Completed', 'Time Started', 'Title', 'Transaction ID', 'Tribute Send a Letter']],

            BMSFormattedRecurring: [[ 'Account System', 'Amount', 'Date' , 'Revenue Type', 'Payment Method', 'Other Method', 'Inbound Channel', 'Application', 'Card Type', 'Partial card number', 'Installment frequency', 'Installment Start date', 'GL post date', 'Receipt number', 'Receipt amount', 'Name on card', 'Card number', 'Authorization code', 'Designation', 'GL post status', 'Appeal', 'URL info', 'New/edit constituent Last\org\group\household name', 'New/edit constituent First name', 'New/edit constituent Middle name', 'New/edit constituent Title', 'New/edit constituent Suffix', '', '', '', '', '', '', 'New/edit constituent Address type', 'New/edit constituent Country', 'New/edit constituent City', 'New/edit constituent State', 'New/edit constituent ZIP', 'New/edit constituent Phone type', 'New/edit constituent Phone number', 'New/edit constituent Email type', 'New/edit constituent Email address', 'Braintree Transaction ID'
          ]],



        };
    }

    componentWillMount(){
      this.props.changeInitial('Reporting');


    }

    componentDidMount(){

         $(document).ready(function() {
            demo.initFormExtendedDatetimepickers();
        });
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

    getDataDates(date01, date02){

        let dataAPI = this.props.reportAPI + 'queryDates/' + date01 + '/' + date02;

        $.ajax({
            type: "GET",
            url: dataAPI,
            dataType: "json"
        }).done(( response ) =>{

            this.setState({
                reportData : response
            });

            this.setState({ reportSearch : {display: 'block'}});

            if(response.totalNumberOfGifts > 0){

                this.setState({ reportStyle : {display: 'block'}});

                //Generate Query report
                this.generateReports(response);

                this.setState({ reportNoData : {display: 'none'}});
                this.setState({ reportSearch : {display: 'none'}});

                 $('html, body').animate({
                    scrollTop: $("#reportStart").offset().top
                  }, 500);

            } else {
                console.log('no data');
                 this.setState({ reportNoData : {display: 'block'}});
                 this.setState({ reportStyle : {display: 'none'}});
            }


        });


    }

    generateReports(response){


         let queryRow = [
                    this.state.reportData.totalNumberOfGifts,
                    this.state.reportData.totalRevenue,
                    this.state.reportData.averageGift,
                    this.state.reportData.numberOfFirstTimeDonors,
                    this.state.reportData.numberOfOneTime,
                    this.state.reportData.totalRevenueOneTime,
                    this.state.reportData.totalRevenueOneTime,
                    this.state.reportData.numberOfFirstTimeDonors,
                    this.state.reportData.numberOfRecurring,
                    this.state.reportData.totalRevenueRecurring,
                    this.state.reportData.averageGiftRecurring,
                    this.state.reportData.numberOfFirstTimeDonorsRecurring,
                    this.state.reportData.conversionRate
                ];

                let newArrayQueryResults = this.state.queryResults.slice();

                newArrayQueryResults.push(queryRow);
                this.setState({queryResults:newArrayQueryResults});



                //Generate reports from all transactions data
                for(let i = 0; i < response.allData.length; i++){


                    //Format transaction date
                    let transactionDateFormat = moment(response.allData[i].date).format('MM/DD/YYYY');

                    let pageIDpost = 'PID=' + response.allData[i].pid;


                    if(response.allData[i]["donation Type"] != 'recurring'){

                         console.log('found a one time');

                        //Populate the one time BMS report
                        let BMSReportOneTime = [
                            'Default Account System',
                            response.allData[i].amount,
                            transactionDateFormat,
                            'Payment',
                            'Credit Card',
                            '',
                            'Online',
                            'Donation',
                            response.allData[i].cardType,
                            response.allData[i].last4,
                            'Single Installment',
                            '',
                            transactionDateFormat,
                            response.allData[i].transactionID,
                            response.allData[i].amount,
                            response.allData[i].cardholderName,
                            response.allData[i].last4,
                            response.allData[i].authCode,
                            response.allData[i].designation,
                            'Not posted',
                            response.allData[i].appeal,
                            response.allData[i].pageIDpost,
                            response.allData[i].lastName,
                            response.allData[i].firstName,
                            '',
                            response.allData[i].title,
                            '', '', '', '', '', '', '',
                            response.allData[i].companyorperson,
                            'United States',
                            response.allData[i].streetaddress,
                            response.allData[i].city,
                            response.allData[i].state,
                            response.allData[i].postal,
                            response.allData[i].companyorperson,
                            response.allData[i].phone,
                            response.allData[i].companyorperson,
                            response.allData[i].email,
                            response.allData[i].transactionID
                        ];

                        let newArrayBMSOneTimeResults = this.state.BMSFormattedOneTime.slice();
                        newArrayBMSOneTimeResults.push(BMSReportOneTime);
                        this.setState({BMSFormattedOneTime:newArrayBMSOneTimeResults});



                        //Populate Full Report One Time
                        let FullReportOneTime = [
                            response.allData[i].amount,
                            response.allData[i].appeal,
                            response.allData[i].authCode,
                            response.allData[i].cardType,
                            response.allData[i].city,
                            response.allData[i].companyorperson,
                            response.allData[i].conversiontype,
                            response.allData[i].companymatch,
                            response.allData[i].corporatedonation,
                            response.allData[i].creative,
                            response.allData[i].customer,
                            response.allData[i].date,
                            response.allData[i].designation,
                            response.allData[i]['donation Type'],
                            response.allData[i].email,
                            response.allData[i].firstName,
                            response.allData[i].lastName,
                            response.allData[i].firstTimeDonor,
                            response.allData[i]['ip address'],
                            response.allData[i].ipcity,
                            response.allData[i].ipcountry,
                            response.allData[i]['ippostal code'],
                            response.allData[i].ipstate,
                            response.allData[i].isp,
                            response.allData[i].last4,
                            response.allData[i]['payment Token'],
                            response.allData[i].phone,
                            response.allData[i].pid,
                            response.allData[i].postal,
                            response.allData[i].reference,
                            response.allData[i].state,
                            response.allData[i].streetaddress,
                            response.allData[i].subscriptinitial,
                            response.allData[i].subscriptionFrequency,
                            response.allData[i].subscriptionid,
                            response.allData[i].subscriptionstatus,
                            response.allData[i].timecompleted,
                            response.allData[i].timestarted,
                            response.allData[i].title,
                            response.allData[i].transactionID,
                            response.allData[i].tributemail,
                        ];

                         let newArrayFullOneTimeResults = this.state.fullReportOneTime.slice();
                         newArrayFullOneTimeResults.push(FullReportOneTime);
                         this.setState({fullReportOneTime:newArrayFullOneTimeResults});

                         let newArrayFullMainResults = this.state.fullreport.slice();
                         newArrayFullMainResults.push(FullReportOneTime);
                         this.setState({fullreport:newArrayFullMainResults});


                    } else {



                        //Populate the recurring BMS report
                        let BMSReportRecurring= [
                            'Default Account System',
                            response.allData[i].amount,
                            transactionDateFormat,
                            'Recurring Gift',
                             response.allData[i].last4,
                            'NA',
                            'Online',
                            'Donation',
                            response.allData[i].cardType,
                            response.allData[i].last4,
                            response.allData[i].subscriptionFrequency,
                            response.allData[i].date,
                            transactionDateFormat,
                            response.allData[i].transactionID,
                            response.allData[i].amount,
                            response.allData[i].cardholderName,
                            response.allData[i].last4,
                            response.allData[i].authCode,
                            response.allData[i].designation,
                            'NA',
                            response.allData[i].appeal,
                            response.allData[i].pageIDpost,
                            response.allData[i].lastName,
                            response.allData[i].firstName,
                            '',
                            response.allData[i].title,
                            '', '', '', '', '', '', '',
                            response.allData[i].companyorperson,
                            'United States',
                            response.allData[i].streetaddress,
                            response.allData[i].city,
                            response.allData[i].state,
                            response.allData[i].postal,
                            response.allData[i].companyorperson,
                            response.allData[i].phone,
                            response.allData[i].companyorperson,
                            response.allData[i].email,
                            response.allData[i].transactionID
                        ];

                        let newArrayBMSRecurringResults = this.state.BMSFormattedRecurring.slice();
                        newArrayBMSRecurringResults.push(BMSReportRecurring);
                        this.setState({BMSFormattedRecurring:newArrayBMSRecurringResults});




                        //Populate Full Report Recurring
                        let FullReportRecurring = [
                            response.allData[i].amount,
                            response.allData[i].appeal,
                            response.allData[i].authCode,
                            response.allData[i].cardType,
                            response.allData[i].city,
                            response.allData[i].companyorperson,
                            response.allData[i].conversiontype,
                            response.allData[i].companymatch,
                            response.allData[i].corporatedonation,
                            response.allData[i].creative,
                            response.allData[i].customer,
                            response.allData[i].date,
                            response.allData[i].designation,
                            response.allData[i]['donation Type'],
                            response.allData[i].email,
                            response.allData[i].firstName,
                            response.allData[i].lastName,
                            response.allData[i].firstTimeDonor,
                            response.allData[i]['ip address'],
                            response.allData[i].ipcity,
                            response.allData[i].ipcountry,
                            response.allData[i]['ippostal code'],
                            response.allData[i].ipstate,
                            response.allData[i].isp,
                            response.allData[i].last4,
                            response.allData[i]['payment Token'],
                            response.allData[i].phone,
                            response.allData[i].pid,
                            response.allData[i].postal,
                            response.allData[i].reference,
                            response.allData[i].state,
                            response.allData[i].streetaddress,
                            response.allData[i].subscriptinitial,
                            response.allData[i].subscriptionFrequency,
                            response.allData[i].subscriptionid,
                            response.allData[i].subscriptionstatus,
                            response.allData[i].timecompleted,
                            response.allData[i].timestarted,
                            response.allData[i].title,
                            response.allData[i].transactionID,
                            response.allData[i].tributemail,
                        ];

                         let newArrayFullRecurringResults = this.state.fullReportRecurring.slice();
                         newArrayFullRecurringResults.push(FullReportRecurring);
                         this.setState({fullReportRecurring:newArrayFullRecurringResults});



                         let newArrayFullMainResults = this.state.fullreport.slice();
                         newArrayFullMainResults.push(FullReportRecurring);
                         this.setState({fullreport:newArrayFullMainResults});


                    }


                }

                this.setState({ reportSearch : {display: 'none'}});


    };


    getDataAppeal(appeal){

        let dataAPI = this.props.reportAPI + 'appealCode/' + appeal;

        $.ajax({
            type: "GET",
            url: dataAPI,
            dataType: "json"
        }).done(( response ) =>{

            this.setState({
                reportData : response
            });

            if(response.totalNumberOfGifts > 0){
                this.setState({ reportStyle : {display: 'block'}});
                this.generateReports(response);
                this.setState({ reportNoData : {display: 'none'}});
                this.setState({ reportSearch : {display: 'none'}});

                $('html, body').animate({
                    scrollTop: $("#reportStart").offset().top
                  }, 500);

            } else {
                console.log('no data');
                this.setState({ reportStyle : {display: 'none'}});
                this.setState({ reportNoData : {display: 'block'}});
            }


        });


    }

    getDataID(id){

        let dataAPI = this.props.reportAPI + 'pageID/' + id;



        $.ajax({
            type: "GET",
            url: dataAPI,
            dataType: "json"
        }).done(( response ) =>{

            this.setState({
                reportData : response
            });

            console.log(response);

            if(response.totalNumberOfGifts > 0){
                this.setState({ reportStyle : {display: 'block'}});

                this.generateReports(response);
                this.setState({ reportNoData : {display: 'none'}});
                this.setState({ reportSearch : {display: 'none'}});

                $('html, body').animate({
                    scrollTop: $("#reportStart").offset().top
                  }, 500);


            } else {
                console.log('no data');
                this.setState({ reportStyle : {display: 'none'}});
                this.setState({ reportNoData : {display: 'block'}});
            }


        });


    }



    searchByDateRange(event){
        event.preventDefault();
        this.setState({ searchByDateRange : {display: 'block'}});
        this.setState({ searchByPageID : {display: 'none'}});
        this.setState({ searchByAppeal : {display: 'none'}});
    }

    searchByPageID(event){
        event.preventDefault();
        this.setState({ searchByDateRange : {display: 'none'}});
        this.setState({ searchByPageID : {display: 'block'}});
        this.setState({ searchByAppeal : {display: 'none'}});
    }

    searchByAppeal(event){
        event.preventDefault();
        this.setState({ searchByDateRange : {display: 'none'}});
        this.setState({ searchByPageID : {display: 'none'}});
        this.setState({ searchByAppeal : {display: 'block'}});
    }



    searchDates(event){
        event.preventDefault();

        let date01 = $('#startDate').val().replace('/' , '-').replace('/' , '-');
        let date02 = $('#endDate').val().replace('/' , '-').replace('/' , '-');

        this.getDataDates(date01, date02);
    }

    searchAppeal(event){
        event.preventDefault();

        let appeal = $('#appealCode').val();

        this.getDataAppeal(appeal);
    }

    searchPID(event){
        event.preventDefault();

        let id = $('#pageID').val();

        this.getDataID(id);
    }

    render(){



        return(
            <div className="col-md-12">

                      <div className="row">

                            <Search />

                       </div>



                        <div className="row">

                            <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="card card-stats">
                              <div className="card-header" data-background-color="rose">
                              <a href="#" onClick={this.searchByDateRange.bind(this)}> <i className="material-icons">pageview</i> </a>
                              </div>
                              <div className="card-content">
                                <p className="category">Date Range</p>
                                <h3 className="card-title"><a href="#" onClick={this.searchByDateRange.bind(this)}>Search by date range</a></h3>
                              </div>

                            </div>
                          </div>

                          {/* Functions */}
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="card card-stats">
                              <div className="card-header" data-background-color="purple">
                                <a href="#" onClick={this.searchByAppeal.bind(this)}><i className="material-icons">pageview</i></a>
                              </div>
                              <div className="card-content">
                                <p className="category">Appeal Code</p>
                                <h3 className="card-title"><a href="#" onClick={this.searchByAppeal.bind(this)}>Search by appeal code</a></h3>
                              </div>

                            </div>
                          </div>

                          {/* Functions */}
                          <div className="col-lg-4 col-md-6 col-sm-6">
                            <div className="card card-stats">
                              <div className="card-header" data-background-color="orange">
                                <a href="#" onClick={this.searchByPageID.bind(this)}><i className="material-icons">pageview</i></a>
                              </div>
                              <div className="card-content">
                                <p className="category">Page ID</p>
                                <h3 className="card-title"><a href="#" onClick={this.searchByPageID.bind(this)}>Search by Page ID</a></h3>
                              </div>

                            </div>
                          </div>


                        </div>


                        <div className="row" style={this.state.searchByDateRange}>
                             <h4 className="card-title">Query By Date Range</h4>

                              <div className="row">

                                  <form id="searchDateRange" onSubmit={this.searchDates.bind(this)}>

                                      <div className="form-group label-floating row">

                                            <div className="col-md-12">
                                                <div className="card">
                                                  <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">library_books</i>
                                                  </div>
                                                  <div className="card-content">

                                                    <div className="col-md-4">
                                                          <h4 className="card-title">Start Date</h4>
                                                          <div className="form-group">
                                                          <label className="label-control">Date Picker</label>
                                                          <input type="text" id="startDate" className="form-control datepicker" defaultValue="08/01/2017" />
                                                          <span className="material-input" /></div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <h4 className="card-title">End Date</h4>
                                                        <div className="form-group">
                                                        <label className="label-control">Date Picker</label>
                                                        <input type="text" id="endDate" className="form-control datepicker" defaultValue="08/31/2017" />
                                                        <span className="material-input" /></div>
                                                    </div>

                                                    <div className="col-md-3 text-center">
                                                        <br/>
                                                        <div className="form-group">
                                                        <button type="submit" className="btn btn-primary btn-round btn-lg">Submit<div className="ripple-container"></div></button>

                                                        </div>
                                                    </div>

                                                  </div>
                                                </div>
                                              </div>



                                      </div>

                                </form>
                             </div>

                        </div>

                         <div className="row" style={this.state.searchByPageID}>
                             <h4 className="card-title">Query By Page ID</h4>

                              <div className="row">

                                  <form id="searchAppeal" onSubmit={this.searchPID.bind(this)}>

                                      <div className="form-group label-floating row">

                                            <div className="col-md-12">
                                                <div className="card">
                                                  <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">library_books</i>
                                                  </div>
                                                  <div className="card-content">

                                                    <div className="col-md-8">
                                                          <h4 className="card-title">Insert Page ID</h4>
                                                          <div className="form-group">
                                                          <label className="label-control">ID</label>
                                                          <input type="text" id="pageID" className="form-control" />
                                                          <span className="material-input" /></div>
                                                    </div>

                                                    <div className="col-md-3 text-center">
                                                        <br/>
                                                        <div className="form-group">
                                                        <button type="submit" className="btn btn-primary btn-round btn-lg">Submit<div className="ripple-container"></div></button>

                                                        </div>
                                                    </div>

                                                  </div>
                                                </div>
                                              </div>



                                      </div>

                                </form>
                             </div>

                        </div>



                        <div className="row" style={this.state.searchByAppeal}>
                             <h4 className="card-title">Query By Appeal/Source Code</h4>

                              <div className="row">

                                  <form id="searchAppeal" onSubmit={this.searchAppeal.bind(this)}>

                                      <div className="form-group label-floating row">

                                            <div className="col-md-12">
                                                <div className="card">
                                                  <div className="card-header card-header-icon" data-background-color="rose">
                                                    <i className="material-icons">library_books</i>
                                                  </div>
                                                  <div className="card-content">

                                                    <div className="col-md-8">
                                                          <h4 className="card-title">Insert Appeal Code</h4>
                                                          <div className="form-group">
                                                          <label className="label-control">Code</label>
                                                          <input type="text" id="appealCode" className="form-control" />
                                                          <span className="material-input" /></div>
                                                    </div>

                                                    <div className="col-md-3 text-center">
                                                        <br/>
                                                        <div className="form-group">
                                                        <button type="submit" className="btn btn-primary btn-round btn-lg">Submit<div className="ripple-container"></div></button>

                                                        </div>
                                                    </div>

                                                  </div>
                                                </div>
                                              </div>



                                      </div>

                                </form>
                             </div>

                        </div>


                        <div className="row" style={this.state.reportNoData}>
                            <div className="col-md-12 text-center"><h2>Sorry, no data was found.</h2></div>
                        </div>

                        <div className="row" style={this.state.reportSearch}>
                            <div className="col-md-12 text-center">
                               Searching <img src="dist/img/donation-loader-pagespeed.gif" />
                            </div>
                        </div>

                        <div className="row" id="reportStart" style={this.state.reportStyle}>

                            <h4 className="card-title">Total Donations Report: <span className="pull-right">Current Conversion Percentage based on your query <strong>{this.state.reportData.conversionRate}</strong></span></h4>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Gifts Total</h3>
                                      <div className="icon icon-primary">
                                        <i className="material-icons">check_circle</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.totalNumberOfGifts}</h3>
                                      <p className="card-description">
                                        Total number of gifts this creative has generated.
                                      </p>

                                    </div>
                                  </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Total Revenue</h3>
                                      <div className="icon icon-success">
                                        <i className="material-icons">attach_money</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.totalRevenue}</h3>
                                      <p className="card-description">
                                        Total dollar amount generated by this creative.
                                      </p>

                                    </div>
                                  </div>
                            </div>


                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Average Gift</h3>
                                      <div className="icon icon-info">
                                        <i className="material-icons">attach_money</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.averageGift}</h3>
                                      <p className="card-description">
                                        Average gift based on total gifts generated.
                                      </p>

                                    </div>
                                  </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">First Time Donors</h3>
                                      <div className="icon icon-warning">
                                        <i className="material-icons">account_circle</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.numberOfFirstTimeDonors}</h3>
                                      <p className="card-description">
                                        Number of total first time donors.
                                      </p>

                                    </div>
                                  </div>
                            </div>


                        </div>

                        <div className="row"  style={this.state.reportStyle}>
                            <div className="col-md-offset-3 col-md-3">
                                <CSVLink data={this.state.fullreport} className="btn btn-success btn-round btn-lg" filename={"FullReport.csv"}><i className="material-icons">file_download</i> Download full report</CSVLink>
                            </div>

                            <div className="col-md-3">
                                <CSVLink data={this.state.queryResults} className="btn btn-rose btn-round btn-lg" filename={"QueryResults.csv"}><i className="material-icons">file_download</i> Download Query Results</CSVLink>
                            </div>

                        </div>




                        <div className="row" style={this.state.reportStyle}>

                            <h4 className="card-title">One Time Donations Report</h4>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Gifts Total</h3>
                                      <div className="icon icon-primary">
                                        <i className="material-icons">check_circle</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.numberOfOneTime}</h3>
                                      <p className="card-description">
                                        Total number of gifts this creative has generated.
                                      </p>

                                    </div>
                                  </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Total Revenue</h3>
                                      <div className="icon icon-success">
                                        <i className="material-icons">attach_money</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.totalRevenueOneTime}</h3>
                                      <p className="card-description">
                                        Total dollar amount generated by this creative.
                                      </p>

                                    </div>
                                  </div>
                            </div>


                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Average Gift</h3>
                                      <div className="icon icon-info">
                                        <i className="material-icons">attach_money</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.averageGiftOneTime}</h3>
                                      <p className="card-description">
                                        Average gift based on total gifts generated.
                                      </p>

                                    </div>
                                  </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">First Time Donors</h3>
                                      <div className="icon icon-warning">
                                        <i className="material-icons">account_circle</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.numberOfFirstTimeDonorsSingle}</h3>
                                      <p className="card-description">
                                        Number of total first time donors.
                                      </p>

                                    </div>
                                  </div>
                            </div>


                        </div>


                         <div className="row"  style={this.state.reportStyle}>
                            <div className="col-md-offset-3 col-md-3">
                                <CSVLink data={this.state.fullReportOneTime} className="btn btn-success btn-round btn-lg" filename={"OneTimeFullReport.csv"}><i className="material-icons">file_download</i> Download full report</CSVLink>
                            </div>

                            <div className="col-md-3">
                                <CSVLink data={this.state.BMSFormattedOneTime} className="btn btn-primary btn-round btn-lg" filename={"BMSFormattedReport.csv"} ><i className="material-icons">file_download</i> Download BMS Formatted</CSVLink>
                            </div>

                        </div>



                        <div className="row"  style={this.state.reportStyle}>

                            <h4 className="card-title">Recurring Donations Report</h4>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Gifts Total</h3>
                                      <div className="icon icon-primary">
                                        <i className="material-icons">check_circle</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.numberOfRecurring}</h3>
                                      <p className="card-description">
                                        Total number of gifts this creative has generated.
                                      </p>

                                    </div>
                                  </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Total Revenue</h3>
                                      <div className="icon icon-success">
                                        <i className="material-icons">attach_money</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.totalRevenueRecurring}</h3>
                                      <p className="card-description">
                                        Total dollar amount generated by this creative.
                                      </p>

                                    </div>
                                  </div>
                            </div>


                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">Average Gift</h3>
                                      <div className="icon icon-info">
                                        <i className="material-icons">attach_money</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.averageGiftRecurring}</h3>
                                      <p className="card-description">
                                        Average gift based on total gifts generated.
                                      </p>

                                    </div>
                                  </div>
                            </div>

                            <div className="col-sm-3">
                                <div className="card card-pricing card-raised">
                                    <div className="content">
                                      <h3 className="category">First Time Donors</h3>
                                      <div className="icon icon-warning">
                                        <i className="material-icons">account_circle</i>
                                      </div>
                                      <h3 className="card-title">{this.state.reportData.numberOfFirstTimeDonorsRecurring}</h3>
                                      <p className="card-description">
                                        Number of total first time donors.
                                      </p>

                                    </div>
                                  </div>
                            </div>


                        </div>


                        <div className="row" style={this.state.reportStyle}>
                            <div className="col-md-offset-3 col-md-3">
                                <CSVLink data={this.state.fullReportRecurring} className="btn btn-success btn-round btn-lg" filename={"OneTimeFullReport.csv"}><i className="material-icons">file_download</i> Download full report</CSVLink>
                            </div>

                            <div className="col-md-3">
                                <CSVLink data={this.state.BMSFormattedRecurring} className="btn btn-warning btn-round btn-lg"  filename={"BMSFormattedReport.csv"}><i className="material-icons">file_download</i> Download BMS Formatted</CSVLink>
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
        reportAPI : state.reportAPI
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

export default connect(mapStateToProps, mapDispatchToProps)(Reports);
