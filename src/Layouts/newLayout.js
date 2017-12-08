import React, { Component } from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

//Import jquery
const jQuery = require("jquery");

//Import axios
const axios = require('axios');

//Import UI Components
import CardWithHeaderHalf from '../UI/cardWithHeaderHalf.js';


class NewLayout extends Component {

  constructor(props){
        super(props);

        this.state = {
            dataComplete:{display: 'none'},
            fieldsSchema: 0,
            layoutType: 'donationForm',
            thumbnail: 'none'

        };

  }

  componentWillMount(){
      this.props.changeInitial('Register New Layout');
  }

  componentDidMount() {

    console.log(this.props.role);

  }

  changeLayoutType(event){

      let layoutType = event.currentTarget.value;

      this.setState({layoutType : layoutType});

  }

  //Event when dropzone images are added
  onDrop(acceptedFiles, rejectedFiles){

      //For each file uploaded
      acceptedFiles.forEach(file => {


          let formData = new FormData();
          formData.append('bucketFile', file);


          let url = this.props.api
          + 'layoutThumb';

          //send to server
          jQuery.ajax({

            url: url,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: (data) => {

              console.log(data);

              this.setState({
                thumbnail : data
              });

            }

          });

      });



  }

  handleSubmit(event){

      event.preventDefault();

      let formData = jQuery('#newLayout').serializeArray();


      let action = this.props.api + 'newLayout';


      jQuery.post( action, formData, ( data ) => {


      }).fail((data)=>{



      }).done((data)=>{

        console.log(data);
        window.swal(
          'Succcess',
           data,
          'success'
        );


      });
  }



  login() {
    this.props.auth.login();
  }


  onPress(event){
    event.preventDefault();
    this.setState({fieldsSchema: this.state.fieldsSchema + 1});
  }

  deleteField(event){
    event.preventDefault();
    let value = event.currentTarget;
    jQuery(value).parent().parent().remove();
  }


  render() {

    //const { isAuthenticated } = this.props.auth;

    let uploadArray = [];

    for(let i = 0; i < this.state.fieldsSchema; i += 1){
        uploadArray.push(
        <div className="row" key={i}>

          <div className="col-md-5">
            <label className="control-label">
              Enter Field Label Text
              <small> *</small>
            </label>
            <input className="form-control schemaData" name="formFieldLabel" type="text" required="true" />
          </div>

          <div className="col-md-5">
            <label className="control-label">
              Enter Field Type
              <small> *</small>
            </label>
            <select className="form-control schemaType" name="formFieldType">
              <option value="">Please choose a field type.</option>
              <option value="text">Text</option>
              <option value="color">Color</option>
              <option value="imageSelect">Image Select</option>
              <option value="wysiwyg">Wysiwig</option>
              <option value="array">Array of Values</option>
              <option value="question">Yes or No Question</option>
            </select>
          </div>

          <div className="col-md-2 text-center">
            <label className="control-label">
              Delete this field.
            </label><br/>
            <button className="btn btn-danger btn-fill" onClick={this.deleteField.bind(this)}>X</button>
          </div>

        </div>);
    }

    return (

      <div>
          <div className="container-fluid">
                <div className="row">
                    <form id="newLayout" onSubmit={this.handleSubmit.bind(this)}>


                        <CardWithHeaderHalf title="New Layout" color="red" icon="web">

                            <br/>

                           <div className="form-group label-floating">
                                <label htmlFor="layoutName" className="control-label">What is the name of your layout?</label>
                                <input type="text" id="layoutName"  name="layoutName" className="form-control" />
                           </div>

                           <div className="form-group label-floating">
                                <label htmlFor="layoutDescription" className="control-label">Describe your layout?</label>
                                <textArea  id="layoutDescription"  name="layoutDescription" className="form-control" />
                           </div>

                           <div className="form-group">
                                <label htmlFor="paymentProcessor" className="control-label">Payment Processor</label>
                                <select className="form-control" name="paymentProcessor" id="paymentProcessor">
                                    <option value="stripe">Stripe</option>
                                </select>
                           </div>

                           <div className="form-group">
                                <label htmlFor="layoutType" className="control-label">What is the type of your layout?</label>
                                <select className="form-control" name="layoutType" id="layoutType" onChange={this.changeLayoutType.bind(this)}>
                                    <option value="donationForm">Donation Form</option>
                                    <option value="lightboxForm">Lightbox Form</option>
                                    <option value="landingPage">Landing Page</option>
                                </select>
                           </div>

                           <div className="form-group label-floating">
                                <label htmlFor="status" className="control-label">Publish this layout live or staging mode?</label>
                                <select className="form-control" name="status" id="status">
                                    <option value="staging">Staging</option>
                                    <option value="live">Live</option>
                                </select>
                           </div>

                           <div className="form-group label-floating">
                                <label htmlFor="preview" className="control-label">Preview Url</label>
                                <input type="text" id="preview"  name="preview" className="form-control"  />
                           </div>

                           <div className="form-group label-floating">
                                <label htmlFor="thumbnail" className="control-label">Thumbnail</label>
                                <input type="text" id="thumbnail"  name="thumbnail" className="form-control" value={this.state.thumbnail}  />
                           </div>



                           <label htmlFor="thumbnail" className="control-label">Thumbnail of the layout:</label>
                           <div className="form-group label-floating dropzone">
                             <Dropzone onDrop={this.onDrop.bind(this)}>
                               <p>Click here or drag and drop an image file for your layout thumbnail.</p>
                             </Dropzone>
                           </div>



                        </CardWithHeaderHalf>

                        <CardWithHeaderHalf title="Layout Schema" color="red" icon="web_asset">

                            {this.state.layoutType == 'donationForm' && (

                             <div>
                                 <p>All donation form layouts will ask for these items when building a new creative.</p>

                                 <ul>
                                    <li>Creative Name</li>
                                    <li>Description</li>
                                    <li>Donation Array Copy</li>
                                    <li>Title</li>
                                    <li>Meta information such as OG Tags.</li>
                                 </ul>

                                 <p>If your new layout needs more items such as banner image, mobile image, background color, etc. Please specify that field below.
                                 </p>
                             </div>

                           )}

                            {this.state.layoutType == 'landingPage' && (

                                <div>

                                    Landing Pages are still not a live feature. Please choose another layout type.

                                </div>
                            )}

                            {this.state.layoutType == 'lightboxForm' && (

                                <div>

                                   Lightbox Forms are still not a live feature. Please choose another layout type.

                                </div>
                            )}



                            <div>
                              <button className="btn btn-info btn-fill" onClick={this.onPress.bind(this)}>Add Form Field</button>
                            </div>

                            <div id="schemaHolder">
                                {uploadArray}
                            </div>

                            <hr />

                            <div className="form-footer text-center">
                              <button type="submit" className="btn btn-success btn-fill">Register Layout</button>
                            </div>

                        </CardWithHeaderHalf>

                    </form>
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

export default connect(mapStateToProps, mapDispatchToProps)(NewLayout);
