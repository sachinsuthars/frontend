import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Helper Modules
import Dropzone from 'react-dropzone';
import TinyMCE from 'react-tinymce';
const jQuery = require("jquery");

//Global Variables
let imagesReturned = [];
let imagesFound;

//import UI
import CardWithHeaderNoIcon from '../UI/cardWithHeaderNoIcon.js';


class ImageUpload extends Component {

  constructor(props){
        super(props);

        this.state = {

            creativeName : '',
            imageReturnRender: '',
            imageComplete: {display: 'none'},
            imagesFound: [],

        };

  }

  componentWillMount(){
    this.setState({creativeName: this.props.creativeName});

    imagesReturned = [];
    imagesFound = '';
  }

  componentWillReceiveProps(){

    setTimeout(()=>{
        this.setState({creativeName: this.props.creativeName});
    }, 300);

  }

  componentDidMount(){
    this.setState({creativeName: this.props.creativeName});
  }


  //Event when dropzone images are added
  onDrop(acceptedFiles, rejectedFiles){

      //Check to make sure a creative name was set
      if (this.state.creativeName == '') {

        window.swal({
          title: "Error!",
          text: "Please choose a client and enter a form name.",
          type: "error",
          buttonsStyling: false,
          confirmButtonClass: "btn btn-danger"
        });

      } else {


        //For each file uploaded
        acceptedFiles.forEach(file => {

            console.log(file);

            let formData = new FormData();

            formData.append('bucketFile', file);


            let url = this.props.api
            + 'uploadCreativeImages/'
            + this.props.client
            + '/' + this.state.creativeName;

            console.log(url);

            //send to server
            jQuery.ajax({

              url: url,
              type: 'POST',
              data: formData,
              processData: false,
              contentType: false,
              success: (data) => {

                console.log(data);
                imagesReturned.push(data);
                let imageReturnRender = imagesReturned.map((image) => {

                  return ( <span key={image}><b> Image Uploaded - </b> https://s3.amazonaws.com/give.rkd.io/{this.props.client}/{this.state.creativeName}/{image} </span>);

                });

                this.setState({
                  imageReturnRender: imageReturnRender
                });

                this.setState({imageComplete: {display: 'block', clear: 'both'}});

                this.imageSearchPopulate(this.state.creativeName);


              }

            });

        });

      }

  }

  //Finds project images and adds them to image dropdowns
  imageSearchPopulate(projectNameValue){

    let imageURL = this.props.api + 'imageSearch/' + this.props.client + '/' + projectNameValue

    let jqxhr = jQuery.get( imageURL, (data) => {

               })
               .done((data) =>{

                  let removeData =  'clients/' + this.props.client + '/' + projectNameValue + '/';

                  this.setState({imagesFound: data});

                  imagesFound = '';

                  for(let j = 0; j < data.length; j++){
                    imagesFound += '<option value="' + data[j].replace(removeData, '') + '">' + data[j].replace(removeData, '') + '</option>';
                  }

                  jQuery('.imageSelect select').append(imagesFound);

               })
               .fail(function(error) {
                 console.log( "No Images or no project present" );
                 console.log(error);
                 console.log(imageURL);
               });

  }



  render() {



    return (


            <CardWithHeaderNoIcon title="Step 02" color="red">
              <h4 className="card-title">Add images to your creative if needed</h4>
              <br/><br/>
              <div className="col-md-12 dropzone">
                    <Dropzone onDrop={this.onDrop.bind(this)}>
                      <p>Click here or drag and drop image files for your project here.</p>
                    </Dropzone>
                  <br/>
              </div>
              <div className="alert alert-success" style={this.state.imageComplete}>
                  {this.state.imageReturnRender}
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageUpload);
