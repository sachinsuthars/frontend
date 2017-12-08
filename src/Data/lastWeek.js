import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

const axios = require('axios');
const moment = require('moment');

import DataPoints  from './dataPoints.js';

class LastWeek extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataRows: [],
            totalGifts : '12,234',
            averageGift : '24',
            firstTime : '234',
            totalVisits : '1,982',
        }
    }

    componentWillMount(){

      //this.gatherData();

    };

    componentDidMount(){

        //Start Charts Functions

        this.websiteViewChart();
        this.donationFormRevenue();
        this.firstTimeDonors();

        window.demo.initDashboardPageCharts();




    };

    gatherData(){

      //Gather the current data and the date seven days ago.
      let todayDate = moment().add(1, 'days').format('MM-DD-YYYY');
      let lastWeek = moment().subtract(7, 'days').format('MM-DD-YYYY');

      //Format the api url
      let url = this.props.apiURL + 'masterReporting';

      //Make JSON Promise request
      axios.get(url, {
        params: {
          reportType: 'daterange',
          date01: lastWeek,
          date02: todayDate
        }
      })
      .then( (response) =>{
        console.log(response);

        //Setting Initial Report counters

        this.setState({totalVisits : response.data.totalVisits});
        this.setState({averageGift : response.data.averageGift});
        this.setState({firstTime : response.data.numberOfOneTime});
        this.setState({totalGifts : parseFloat(response.data.totalRevenue).toFixed('2')});

      })
      .catch( (error) =>{
        console.log(error);
      });

    }

    websiteViewChart(){

        var dataWebsiteViewsChart = {
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          series: [
            [842, 443, 320, 780, 553, 453, 326]

          ]
        };


        var optionsWebsiteViewsChart = {
            axisX: {
                showGrid: false
            },
            low: 0,
            high: 1000,
            chartPadding: { top: 0, right: 5, bottom: 0, left: 0}
        };


        var responsiveOptions = [
          ['screen and (max-width: 640px)', {
            seriesBarDistance: 5,
            axisX: {
              labelInterpolationFnc: function (value) {
                return value[0];
              }
            }
          }]
        ];

        var websiteViewsChart = window.Chartist.Bar('#formTraffic', dataWebsiteViewsChart, optionsWebsiteViewsChart, responsiveOptions);

        window.md.startAnimationForBarChart(websiteViewsChart);

    }

    donationFormRevenue(){

        let dataDailySalesChart = {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            series: [
                [3400, 2400, 2500, 1200, 8600, 2345, 9000]
            ]
        };

        let optionsDailySalesChart = {
            lineSmooth: window.Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 10000,
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0},
        }

        var dailySalesChart = new window.Chartist.Line('#dailySalesChart2', dataDailySalesChart, optionsDailySalesChart);

        window.md.startAnimationForLineChart(dailySalesChart);

    }

    firstTimeDonors(){

        let dataCompletedTasksChart = {
            labels: ['1', '2', '3', '4', '5', '6', '7'],
            series: [
                [230, 750, 450, 300, 280, 240, 200, 190]
            ]
        };

        let optionsCompletedTasksChart = {
            lineSmooth: window.Chartist.Interpolation.cardinal({
                tension: 0
            }),
            low: 0,
            high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
            chartPadding: { top: 0, right: 0, bottom: 0, left: 0}
        }

        var completedTasksChart = new window.Chartist.Line('#firstTimeDonors', dataCompletedTasksChart, optionsCompletedTasksChart);

        // start animation for the Completed Tasks Chart - Line Chart
        window.md.startAnimationForLineChart(completedTasksChart);


    }


    render(){

        return(

          <div>

            <div className="row">

                {/* Form Views Chart */}
                <div className="col-md-4">
                    <div className="card card-chart">
                      <div className="card-header" data-background-color="red" data-header-animation="false">
                        <div className="ct-chart" id="formTraffic" />
                      </div>
                      <div className="card-content">
                        <div className="card-actions">

                          <button type="button" className="btn btn-info btn-simple" rel="tooltip" data-placement="bottom" title="Refresh">
                            <i className="material-icons">refresh</i>
                          </button>

                        </div>
                        <h4 className="card-title">Master Form Traffic</h4>
                        <p className="category">Traffic to master donation form counter by IP Address.</p>
                      </div>
                      <div className="card-footer">
                        <div className="stats">
                          <i className="material-icons">access_time</i> past 7 days performance
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Close Form Views Chart */}


                  {/* Daily Revenue Chart */}
                 <div className="col-md-4">
                    <div className="card card-chart">
                      <div className="card-header" data-background-color="green" data-header-animation="false">
                        <div className="ct-chart" id="dailySalesChart2" />
                      </div>
                      <div className="card-content">
                        <div className="card-actions">

                          <button type="button" className="btn btn-info btn-simple" rel="tooltip" data-placement="bottom" title="Refresh">
                            <i className="material-icons">refresh</i>
                          </button>

                        </div>
                        <h4 className="card-title">Daily Gift Totals</h4>
                        <p className="category">Total gifts one time and initial recurring.</p>
                      </div>
                      <div className="card-footer">
                        <div className="stats">
                          <i className="material-icons">access_time</i> past 7 days performance
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Close Daily Revenue Chart */}


                  {/* Daily First Time Users */}
                  <div className="col-md-4">
                    <div className="card card-chart">
                      <div className="card-header" data-background-color="blue" data-header-animation="false">
                        <div className="ct-chart" id="firstTimeDonors" />
                      </div>
                      <div className="card-content">
                        <div className="card-actions">
                          <button type="button" className="btn btn-info btn-simple" rel="tooltip" data-placement="bottom" title="Refresh">
                            <i className="material-icons">refresh</i>
                          </button>
                        </div>
                        <h4 className="card-title">First Time Donors</h4>
                        <p className="category">Users with no record in Braintree.</p>
                      </div>
                      <div className="card-footer">
                        <div className="stats">
                          <i className="material-icons">access_time</i> past 7 days performance
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Close Daily First Time Users */}

            </div>

            <DataPoints total={this.state.totalVisits} revenue={this.state.totalGifts} average={this.state.averageGift} first={this.state.firstTime}/ >

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

export default connect(mapStateToProps, mapDispatchToProps)(LastWeek);
