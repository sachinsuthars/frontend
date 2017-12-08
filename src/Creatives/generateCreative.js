import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Helper Modules
import Dropzone from 'react-dropzone';
import TinyMCE from 'react-tinymce';
const jQuery = require("jquery");
import moment from 'moment';

//import UI
import CardWithHeaderNoIcon from '../UI/cardWithHeaderNoIcon.js';

//import Features
import CSSEditor from './cssEditor.js';
import JSEditor from './jsEditor.js';
import ImageUpload from './imageUploader.js';
import Social from './social.js';
import ThankYou from './thankyou.js';

//Custom

class GenerateCreative extends Component {

  constructor(props){
        super(props);

        this.state = {

            initial: '',
            hideJS : {display: 'none'},
            creativeName : '',
            clientName: '',
            layout: '',
            formSchema: [],
            currentForm: ''

        };

  }

  componentWillMount(){

    this.props.changeInitial('Creative Form');
    this.setState({clientName: this.props.match.params.clientChosen});
    this.setState({layout: this.props.match.params.layoutChosen});
    this.findLayout();

  }

  componentDidMount(){

    this.searchCampaigns();

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


  //Set the name of the project
  setProjectName(event){
    this.setState({creativeName: event.currentTarget.value});
    console.log(event.currentTarget.value);
  }

  //Find layout schema
  findLayout(){

    let client = this.props.match.params.clientChosen;
    let layout = this.props.match.params.layoutChosen;

    let action = this.props.api + 'layoutFind?layout=' + layout;

    jQuery.get( action, ( data ) => {


    }).fail((data)=>{


    }).done((data)=>{

      console.log(data);
      //this.setState({data: data});
      this.setState({formSchema: data.formSchema});
      this.renderSchema(data.formSchema);

    });

  }

  searchCampaigns(){

    let action = this.props.api + 'getCampaigns/' + this.props.match.params.clientChosen;


    jQuery.get( action, ( data ) => {

        }).fail((data)=>{

        }).done((data)=>{

          let campaigns = jQuery('#campaign');

          for(let x = 0; x < data.length; x++){

            let optionAppend = '<option value="' + data[x].Name + '">' + data[x].Name + '</option>';

            campaigns.append(optionAppend);

          }

    });

  }


  renderSchema(formSchema){

    if(formSchema.length > 0){

      let fieldsRender = formSchema.map((field) => {

        let fieldClassName = 'form-group label-floating ' + field.type;

        if(field.type == 'imageSelect'){

          return(
            <div className={fieldClassName} key={field.name}>
              <label className="control-label">
                {field.label}
                <small> *</small>
              </label>
              <select className="form-control formData" name={field.name} required="true" >
                <option value="None">None</option>
              </select>
            </div>
          );


        } else if(field.type == 'wysiwyg'){

          return(
            <div className={fieldClassName} key={field.name}>
              <label className="control-label">
                  {field.label}
                  <small> *</small>
                </label>
                <br/>
                <TinyMCE
                    id="editorHTML"
                    name={field.name}
                    content=""
                    config={{
                      plugins: 'autolink link image lists print preview'
                    }}
                    onChange={this.handleEditorChange.bind(this)}
                />
            </div>
          );

        } else if(field.type == 'array'){

          return(
            <div className={fieldClassName} key={field.name}>
            <label className="control-label">
                {field.label}
                <small> *</small>
              </label>
              <br/><br/>
              <textarea className="form-control formData" name={field.name} type={field.type}
                required="true"
                placeholder="Insert a list of values, one value per line." ></textarea>
            </div>
          );

        } else if(field.type == 'question'){

          return(
          <div className={fieldClassName} key={field.name}>
            <label className="control-label">
                {field.label}
                <small> *</small>
              </label>
              <select className="form-control formData" name={field.name} required="true" >
                <option value='true'>Yes</option>
                <option value='false'>No</option>
              </select>
          </div>
          );

        } else if(field.type == 'text' || field.type == 'color'){

          return(
            <div className={fieldClassName} key={field.name}>
            <label className="control-label">
                {field.label}
                <small> *</small>
              </label>
              <input className="form-control formData" name={field.name} type={field.type} required="true" />
            </div>
          );

        }


    });
      this.setState({currentForm: fieldsRender });

    } else {

      this.setState({currentForm: ''});

    }


  }

  handleSubmit(event){

    event.preventDefault();

    //Grab all form fields.
    let formData = jQuery('#generateCreative').serializeArray();

    //Push HTML content to the form submit.
    jQuery.each(this.props.htmlContent, ( index, value ) => {

        formData.push({name: index, value: value});

    });

    //Push the creative name to the form submit
    formData.push({name: "creativeName", value: this.state.creativeName});
    formData.push({name: "date", value: moment().format('MM/DD/YYYY')});


    //Submit the form
    let action = this.props.api + 'newCreative';

      jQuery.post( action, formData, ( data ) => {

      }).fail((data)=>{

        window.swal(
          'Error',
           "We could not submit your creative, please try again.",
          'Error'
        );

      }).done((data)=>{

        window.swal(
          'Success',
           data,
          'success'
        );

      });

  }


  render() {



    return (

        <div>

            {/* Step 1 Set The Creative Name */}
            <CardWithHeaderNoIcon title="Step 01" color="red">
              <div className="col-md-6">
                  <h4 className="card-title">Set a creative name: {this.state.creativeName}</h4>
                    <div className="form-group label-floating">
                      <input onKeyUp={this.setProjectName.bind(this)} type="text" className="form-control" id="creativeName"/>
                    </div>
                  <br/>
              </div>
            </CardWithHeaderNoIcon>

            {/* Step 2 Set Upload Images */}
            <ImageUpload creativeName={this.state.creativeName} clientChosen={this.props.client} />

            <form id="generateCreative" onSubmit={this.handleSubmit.bind(this)}>

              {/* Step 3 Creative Details */}
              <CardWithHeaderNoIcon title="Step 03" color="red">
                <h4>Creative Details</h4>
                <br/><br/>

                <div className="col-md-6">

                  <div className="form-group label-floating">
                      <label htmlFor="title" className="control-label">Title:</label>
                      <input type="text" id="title"  name="title" className="form-control" />
                  </div>

                  <div className="form-group label-floating">
                      <label htmlFor="campaign" className="control-label">Campaign:</label>
                      <select type="text" id="campaign"  name="campaign" className="form-control">
                          <option value="NONE">NONE</option>
                      </select>
                  </div>

                  <div className="form-group label-floating">
                      <label htmlFor="campaign" className="control-label">Status:</label>
                      <select type="text" id="status"  name="status" className="form-control">
                          <option value="preview">Preview</option>
                          <option value="live">Live</option>
                      </select>
                  </div>


                  {/* Layout Specific */}
                  {this.state.currentForm}

                </div>

                <div className="col-md-6">
                  <div className="form-group label-floating">
                      <label htmlFor="prefix" className="control-label">Prefix <small>*</small>:</label>
                      <input type="text" id="prefix"  name="prefix" className="form-control" />
                  </div>

                  <div className="form-group label-floating">
                      <label htmlFor="suffix" className="control-label">Suffix <small>*</small>:</label>
                      <input type="text" id="suffix"  name="suffix" className="form-control" />
                  </div>

                  <div className="form-group label-floating">
                      <label htmlFor="monthlySuffix" className="control-label">Monthly Suffix <small>*</small>:</label>
                      <input type="text" id="monthlySuffix"  name="monthlySuffix" className="form-control" />
                  </div>

                  <div className="form-group label-floating hidden">
                      <label htmlFor="acronym" className="control-label">Client Acronym <small>*</small>:</label>
                      <input type="text" value={this.state.clientName} id="acronym"  name="acronym" className="form-control" />
                  </div>

                  <div className="form-group label-floating hidden">
                      <label htmlFor="layout" className="control-label">Layout Chosen <small>*</small>:</label>
                      <input type="text" value={this.state.layout} id="layout"  name="layout" className="form-control" />
                  </div>

                </div>

              </CardWithHeaderNoIcon>


              {/* Step 4 Social Details */}
              <Social />

              {/* Step 5 Thank You Page */}
              <ThankYou />

              <div className="form-footer text-center">
                <button type="submit" className="btn btn-primary btn-fill">Submit Creative</button>
              </div>

           </form>

            {/* Step 6 JS Editor */}
            <JSEditor />

            {/* Step 7 CSS Editor */}
            <CSSEditor />


        </div>



    );
  }
}



const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        role : state.role,
        api: state.api,
        htmlContent: state.htmlContent,
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
        },
        changeHTML : (html) => {
            dispatch(
                {
                    type: "ChangeHTML",
                    payload : html
                }
            );
        }



    };
};

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCreative);
