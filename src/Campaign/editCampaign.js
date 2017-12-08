import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Components

//Import UI Components
import CardWithHeaderHalf from '../UI/cardWithHeaderHalf.js';

//Import jquery
const jQuery = require("jquery");

class EditCampaign extends Component {

  constructor(props){
        super(props);

  }

  componentDidMount() {

    //Set Page Name
    this.props.changeInitial('Edit Campaign');

    //Checking that a client was set
    if(this.props.client == 'NONE'){

      window.swal(
        'Error',
         'Please select a client before editing a campaign',
        'warning'
      );

    }

    //Get Campaign
    this.getCampaign();

  }


  login() {
    this.props.auth.login();
  }

  getCampaign(){

    let action = this.props.api + 'getSingleCampaign/' + this.props.client + '/' + this.props.match.params.campaign ;

    jQuery.get(action, (data) =>{


    }).fail((data)=>{


        window.swal(
          'Error',
           'There was an error finding the campaign, please try again.',
          'warning'
        );


    }).done((data)=>{

      let dataFound = data;

      //Populate form data
      jQuery('#description').val(data.Description);
      jQuery('#status').val(data.Status);

    });

  }

  deleteCampaign(){

    window.swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      console.log(result);

      if (result) {
        window.swal(
          'Deleted!',
          'Your campaign has been deleted.',
          'success'
        )
      }
    });

  }


  handleSubmit(event){

      event.preventDefault();

      let formData = jQuery('#newCampaign').serializeArray();

      let action = this.props.api + 'updateCampaign/' + this.props.client + '/' + this.props.match.params.campaign;

      jQuery.post( action, formData, ( data ) => {


      }).fail((data)=>{

        window.swal(
          'Error',
           'There was an error updating the campaign, please try again.',
          'warning'
        );


      }).done((data)=>{

        window.swal(
          'Succcess',
           data,
          'success'
        );

      });


  }

  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
          <div className="container-fluid">

                <div className="row">
                    <form id="newCampaign" onSubmit={this.handleSubmit.bind(this)}>

                         <CardWithHeaderHalf title="Edit Campaign Details" color="red" icon="create_new_folder">
                            <br/>


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
                              <button type="submit" className="btn btn-info btn-fill">Update Campaign</button>
                            </div>

                         </CardWithHeaderHalf>

                    </form>
                </div>
                <div className="row">
                    <div className="col-sm-6">
                          <Link to="/dashboard/campaigns" className="pull-left">
                             <button className="btn btn-success btn-fill">Back to Campaigns</button>
                          </Link>


                          <button onClick={this.deleteCampaign.bind(this)} className="btn btn-danger btn-fill pull-right">Delete Campaign</button>

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

export default connect(mapStateToProps, mapDispatchToProps)(EditCampaign);
