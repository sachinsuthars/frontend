import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
import ProductsTblPage from './searchComponents/table.js';

//Import jquery
const jQuery = require("jquery");


class SearchCampaigns extends Component {

  constructor(props){
        super(props);

          this.state = {
            data : ''
          };

  }

  componentWillMount(){

    this.searchCampaigns(this.props.client);

  }

  componentWillReceiveProps(){
    this.searchCampaigns(this.props.client);
  }

  componentDidMount() {

  }

  searchCampaigns(client){

    let chosenClient = client;

    let action = this.props.api + 'getCampaigns/' + chosenClient;

    jQuery.get( action, ( data ) => {


    }).fail((data)=>{


    }).done((data)=>{

      console.log(data);

      this.setState({data: data});

    });

  }



  render() {



    return (

      <div>
          <ProductsTblPage data={this.state.data} />
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchCampaigns);
