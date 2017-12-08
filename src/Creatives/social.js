import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Helper Modules
import Dropzone from 'react-dropzone';
import TinyMCE from 'react-tinymce';
const jQuery = require("jquery");

//import UI
import CardWithHeaderNoIcon from '../UI/cardWithHeaderNoIcon.js';


class Social extends Component {

  constructor(props){
        super(props);



  }


  render() {



    return (

      <CardWithHeaderNoIcon title="Step 04" color="red">
        <h4>Social Sharing</h4>
        <br/><br/>
        <div className="col-md-12">

          <div className="form-group label-floating">
              <label htmlFor="pageTitle" className="control-label">Page Title <small>*</small>:</label>
              <input type="text" id="pageTitle"  name="pageTitle" className="form-control" />
          </div>

          <div className="form-group label-floating">
              <label htmlFor="ogSite" className="control-label">OG Site <small>*</small>:</label>
              <input type="text" id="ogSite"  name="ogSite" className="form-control" />
          </div>

          <div className="form-group label-floating">
              <label htmlFor="ogDescription" className="control-label">OG Description <small>*</small>:</label>
              <input type="text" id="ogDescription"  name="ogDescription" className="form-control" />
          </div>

          <div className="form-group label-floating">
              <label htmlFor="twitterHandle" className="control-label">Twitter Name <small>*</small>:</label>
              <input type="text" id="twitterHandle"  name="twitterHandle" className="form-control" />
          </div>

          <div className="form-group label-floating imageSelect">
            <label className="control-label">Facebook Share Image <small>*</small></label>

            <select className="form-control formData" name="ogImage" required>
              <option value="NONE">None</option>
            </select>

          </div>

        </div>
      </CardWithHeaderNoIcon>

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

export default connect(mapStateToProps, mapDispatchToProps)(Social);
