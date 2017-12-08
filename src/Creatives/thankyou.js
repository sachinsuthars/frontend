import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Helper Modules
import Dropzone from 'react-dropzone';
import TinyMCE from 'react-tinymce';
const jQuery = require("jquery");

//import UI
import CardWithHeaderNoIcon from '../UI/cardWithHeaderNoIcon.js';


class ThankYou extends Component {

  constructor(props){
        super(props);

  }

  handleEditorChange(event){

    //Get id of html editor and content
    let getID = event.target.id;
    let getContent = event.target.getContent();

    //Get global html content object and copy it
    let getCurrentHTMLContent = this.props.htmlContent;

    //Add current content to it
    getCurrentHTMLContent[getID] = getContent;

    //Set the current global html object to the copy
    this.props.changeHTML(getCurrentHTMLContent);

  }


  render() {



    return (

      <CardWithHeaderNoIcon title="Step 05" color="red">
        <h4>Thank You Page</h4>
        <br/><br/>

        <div className="form-group label-floating wysiwyg">
            <label className="control-label">
              Thank You Page Intro
              <small> *</small>
            </label>
            <br/>
            <TinyMCE
                id="thankyoupageIntro"
                content=""
                config={{
                  plugins: 'autolink link image lists print preview'
                }}
                onChange={this.handleEditorChange.bind(this)}
            />
        </div>

        <br/>

        <div className="form-group label-floating wysiwyg">
            <label className="control-label">
              Thank You Page Footer
              <small> *</small>
            </label>
            <br/>
            <TinyMCE
                id="thankyoupageFooter"
                content=""
                config={{
                  plugins: 'autolink link image lists print preview'
                }}
                onChange={this.handleEditorChange.bind(this)}
            />
        </div>


      </CardWithHeaderNoIcon>

    );
  }
}



const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        role : state.role,
        api: state.api,
        htmlContent: state.htmlContent
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
        changeHTML: (html) => {
            dispatch(
                {
                    type: "ChangeHTML",
                    payload : html
                }
            );
        }



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThankYou);
