import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

//import ChartistGraph from '../index';

class DataPoints extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataRows: [],
        }
    }

    componentWillMount(){

    };

    componentDidMount(){



    };


    render(){

        return(

          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header" data-background-color="red">
                  <i className="material-icons">check_circle</i>
                </div>
                <div className="card-content">
                  <p className="category">Total Visits</p>
                  <h3 className="card-title">{this.props.total}</h3>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">access_time</i>
                    Total visits in the past 7 days.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header" data-background-color="green">
                  <i className="material-icons">attach_money</i>
                </div>
                <div className="card-content">
                  <p className="category">Gifts Total</p>
                  <h3 className="card-title">${this.props.revenue}</h3>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">access_time</i>
                    Total donations in the past 7 days.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header" data-background-color="orange">
                  <i className="material-icons">attach_money</i>
                </div>
                <div className="card-content">
                  <p className="category">Average Donation</p>
                  <h3 className="card-title">${this.props.average}</h3>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">access_time</i>
                    Average donation in the past 7 days.
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="card card-stats">
                <div className="card-header" data-background-color="blue">
                    <i className="material-icons">account_circle</i>

                </div>
                <div className="card-content">
                  <p className="category">First Time Donors</p>
                  <h3 className="card-title">{this.props.first}</h3>
                </div>
                <div className="card-footer">
                  <div className="stats">
                    <i className="material-icons">access_time</i>
                    Total first time donors in the past 7 days.
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

export default connect(mapStateToProps, mapDispatchToProps)(DataPoints);
