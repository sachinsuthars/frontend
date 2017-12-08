import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components
//import newCampaign from '../Clients/browse.js';

//Import UI Components
import CardWithHeaderHalf from '../UI/cardWithHeaderHalf.js';

//Import jquery
const jQuery = require("jquery");

class NewCampaign extends Component {

  constructor(props){
        super(props);

  }

  componentDidMount() {

    console.log(this.props.role);
    this.props.changeInitial('New Campaign');

    //Checking that a client was set
    if(this.props.client == 'NONE'){

      window.swal(
        'Error',
         'Please select a client before creating a campaign',
        'warning'
      );

    }
  }


  login() {
    this.props.auth.login();
  }


  handleSubmit(event){

      event.preventDefault();

      let formData = jQuery('#newCampaign').serializeArray();

      let action = this.props.api + 'newCampaign';

      jQuery.post( action, formData, ( data ) => {


      }).fail((data)=>{




      }).done((data)=>{

        window.swal(
          'Succcess',
           'Campaign has been created',
          'success'
        );


      });


  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
          <div className="container-fluid">


                <form id="newCampaign" onSubmit={this.handleSubmit.bind(this)}>

                     <CardWithHeaderHalf title="New Campaign Details" color="red" icon="create_new_folder">
                        <br/>

                        <div className="form-group label-floating">
                            <label htmlFor="name" className="control-label">Campaign Name:</label>
                            <input type="text" id="name"  name="name" className="form-control" />
                        </div>

                        <div className="form-group label-floating">
                            <label htmlFor="description" className="control-label">Description:</label>
                            <input type="text" id="description"  name="description" className="form-control" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="status" className="control-label">Status</label>
                            <select className="form-control" name="status" id="status">
                                <option value="preview">Preview</option>
                                <option value="live">Live</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <input type="hidden" value={this.props.client} id="client"  name="client" className="form-control" />
                        </div>


                        <div className="form-footer text-center">
                          <button type="submit" className="btn btn-info btn-fill">Add Campaign</button>
                        </div>

                     </CardWithHeaderHalf>

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
        api: state.api,
        client: state.client
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

export default connect(mapStateToProps, mapDispatchToProps)(NewCampaign);
