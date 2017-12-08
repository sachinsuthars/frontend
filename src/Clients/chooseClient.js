import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import jquery
const jQuery = require("jquery");

class ClientChoose extends Component {

  constructor(props){
        super(props);

  }

  componentWillMount() {

  }

  componentDidMount() {
    jQuery('#clientChoose').val(this.props.client);
  }


  changeClient(event){

    let client = event.currentTarget.value;

    console.log('Component: ' + client);

    this.props.changeClient(client);
  }


  render() {



    return (

        <div className="row">

          <div className="col-sm-6">
            <div className={this.props.alertType}>
              {this.props.children}
            </div>
          </div>

          <div className="col-sm-6">
            <form>
              <select onChange={this.changeClient.bind(this)} className="form-control" name="clientChoose" id="clientChoose" >
                <option value="NONE">Please Choose</option>
                <option value="FBNYC">FBNYC</option>
              </select>
            </form>
          </div>
        </div>

    );
  }
}

const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        role : state.role,
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
        },
        changeClient : (client) => {
            dispatch(
                {
                    type: "ChangeClient",
                    payload : client
                }
            );
        }



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ClientChoose);
