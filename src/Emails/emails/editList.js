import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

//Components
const jQuery = require("jquery");
const moment = require('moment');

class Update extends React.Component{
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

            fullreport : [['Amount', 'Appeal/Source', 'Auth Code','Card Type','City', 'Home or Business', 'Convertion Type', 'Company Match Name', 'Corporate Donation', 'Creative', 'Customer Token','Date', 'Designation', 'Donation Type', 'Email', 'First Name', 'Last Name', 'First Time Donor', 'IP Address', 'IP City', 'IP Country', 'IP Postal Code', 'IP State', 'ISP', 'Last 4', 'Payment Token', 'Phone', 'Page ID', 'Postal Code', 'Reference Code', 'State', 'Street Address', 'Initial Subscription', 'Subscription Frequency', 'Subscription ID', 'Subscription Status', 'Time Completed', 'Time Started', 'Title', 'Transaction ID', 'Tribute Send a Letter',]],

            queryResults : [['Gifts Total', 'Total Revenue', 'Average Gift', 'First Time Donors', 'One Time Gifts Total', 'One Time Total Revenue', 'One Time Average Gift', 'One Time First Time Donors', 'Recurring Gifts Total', 'Recurring Total Revenue', 'Recurring Average Gift', 'Recurring First Time Donors', 'Conversion Rate']],

            fullReportOneTime: [['Amount', 'Appeal/Source', 'Auth Code','Card Type','City', 'Home or Business', 'Convertion Type', 'Company Match Name', 'Corporate Donation', 'Creative', 'Customer Token','Date', 'Designation', 'Donation Type', 'Email', 'First Name', 'Last Name', 'First Time Donor', 'IP Address', 'IP City', 'IP Country', 'IP Postal Code', 'IP State', 'ISP', 'Last 4', 'Payment Token', 'Phone', 'Page ID', 'Postal Code', 'Reference Code', 'State', 'Street Address', 'Initial Subscription', 'Subscription Frequency', 'Subscription ID', 'Subscription Status', 'Time Completed', 'Time Started', 'Title', 'Transaction ID', 'Tribute Send a Letter' ]],

            BMSFormattedOneTime: [[ 'Account System', 'Amount', 'Date' , 'Revenue Type', 'Payment Method', 'Other Method', 'Inbound Channel', 'Application', 'Card Type', 'Partial card number', 'Installment frequency', 'Installment Start date', 'GL post date', 'Receipt number', 'Receipt amount', 'Name on card', 'Card number', 'Authorization code', 'Designation', 'GL post status', 'Appeal', 'URL info', 'New/edit constituent Last\org\group\household name', 'New/edit constituent First name', 'New/edit constituent Middle name', 'New/edit constituent Title', 'New/edit constituent Suffix', '', '', '', '', '', '', 'New/edit constituent Address type', 'New/edit constituent Country', 'New/edit constituent City', 'New/edit constituent State', 'New/edit constituent ZIP', 'New/edit constituent Phone type', 'New/edit constituent Phone number', 'New/edit constituent Email type', 'New/edit constituent Email address' , 'Braintree Transaction ID']],

            fullReportRecurring: [['Amount', 'Appeal/Source', 'Auth Code','Card Type','City', 'Home or Business', 'Convertion Type', 'Company Match Name', 'Corporate Donation', 'Creative', 'Customer Token','Date', 'Designation', 'Donation Type', 'Email', 'First Name', 'Last Name', 'First Time Donor', 'IP Address', 'IP City', 'IP Country', 'IP Postal Code', 'IP State', 'ISP', 'Last 4', 'Payment Token', 'Phone', 'Page ID', 'Postal Code', 'Reference Code', 'State', 'Street Address', 'Initial Subscription', 'Subscription Frequency', 'Subscription ID', 'Subscription Status', 'Time Completed', 'Time Started', 'Title', 'Transaction ID', 'Tribute Send a Letter']],

            BMSFormattedRecurring: [[ 'Account System', 'Amount', 'Date' , 'Revenue Type', 'Payment Method', 'Other Method', 'Inbound Channel', 'Application', 'Card Type', 'Partial card number', 'Installment frequency', 'Installment Start date', 'GL post date', 'Receipt number', 'Receipt amount', 'Name on card', 'Card number', 'Authorization code', 'Designation', 'GL post status', 'Appeal', 'URL info', 'New/edit constituent Last\org\group\household name', 'New/edit constituent First name', 'New/edit constituent Middle name', 'New/edit constituent Title', 'New/edit constituent Suffix', '', '', '', '', '', '', 'New/edit constituent Address type', 'New/edit constituent Country', 'New/edit constituent City', 'New/edit constituent State', 'New/edit constituent ZIP', 'New/edit constituent Phone type', 'New/edit constituent Phone number', 'New/edit constituent Email type', 'New/edit constituent Email address', 'Braintree Transaction ID' ]],



        };
    }

    componentWillMount(){



    }

    componentDidMount(){

         jQuery(document).ready(function() {
            window.demo.initFormExtendedDatetimepickers();
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

        jQuery.ajax({
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

                 jQuery('html, body').animate({
                    scrollTop: jQuery("#reportStart").offset().top
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

        jQuery.ajax({
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

                jQuery('html, body').animate({
                    scrollTop: jQuery("#reportStart").offset().top
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



        jQuery.ajax({
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

                jQuery('html, body').animate({
                    scrollTop: jQuery("#reportStart").offset().top
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

        let date01 = jQuery('#startDate').val().replace('/' , '-').replace('/' , '-');
        let date02 = jQuery('#endDate').val().replace('/' , '-').replace('/' , '-');

        this.getDataDates(date01, date02);
    }

    searchAppeal(event){
        event.preventDefault();

        let appeal = jQuery('#appealCode').val();

        this.getDataAppeal(appeal);
    }

    searchPID(event){
        event.preventDefault();

        let id = jQuery('#pageID').val();

        this.getDataID(id);
    }


    render(){



        return(


            <div className="col-md-6">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Update an Email List<br/>
                        <small className="category"> Please choose a list to update.</small>
                    </h4>
                  </div>


                  <div className="card-content">
                    <div className="row">

                      <div className="col-md-12">

                            <h2 className="text-center"><i className="material-icons">playlist_add</i> Update List </h2>

                            <form id="newEmailList" >

                            <br/>

                            <div className="col-md-12">
                                  <h4 className="card-title">List ID</h4>
                                  <p>Must include the letters of the client acronym. Use underscores instead of spaces.</p>
                                  <div className="form-group">

                                  <input type="text" id="listID" className="form-control" placeholder="fbnyc_new_list" />
                                  <span className="material-input" /></div>
                            </div>

                            <div className="col-md-12">
                                  <h4 className="card-title">List Name</h4>
                                  <div className="form-group">

                                  <input type="text" id="listName" className="form-control" />
                                  <span className="material-input" /></div>
                            </div>

                            <div className="col-md-12">
                                  <h4 className="card-title">Description</h4>
                                  <div className="form-group">

                                  <input type="text" id="listDescription" className="form-control" />
                                  <span className="material-input" /></div>
                            </div>

                            <div className="col-md-12">
                                <br/>
                                <br/>
                                <h4 className="card-title">Names</h4>
                                <p>Comma seperated list of emails addresses with no spaces between.</p>
                                <div className="form-group">

                                <input type="text" id="listEmails" className="form-control" />
                                <span className="material-input" /></div>
                            </div>

                            <div className="col-md-4 col-md-offset-4 text-center">
                                <br/>
                                <div className="form-group">
                                <button type="submit" className="btn btn-danger btn-round btn-lg">
                                    <i className="material-icons">playlist_add</i>
                                       &nbsp;Update<div className="ripple-container"></div>
                                </button>

                                </div>
                            </div>


                            </form>

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

export default connect(mapStateToProps, mapDispatchToProps)(Update);
