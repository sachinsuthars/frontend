import React, { Component } from 'react';
import {connect} from 'react-redux';
import Dropzone from 'react-dropzone';

//Import jquery
const jQuery = require("jquery");

//Import axios
const axios = require('axios');

//Import UI Components
import CardWithHeaderHalf from '../UI/cardWithHeaderHalf.js';


class NewClient extends Component {
  
  constructor(props){
        super(props);
        
        this.state = {
            dataComplete:{display: 'none'},
            fieldsSchema: 0,
            layoutType: 'donationForm'

        };
        
  }
  
  componentWillMount(){
      this.props.changeInitial('Register New Client');
  }
  
  componentDidMount() {
    
    console.log(this.props.role);
    
  }
  
  changeLayoutType(event){
      
      let layoutType = event.currentTarget.value;
      
      this.setState({layoutType : layoutType});
      
  }
  
  handleSubmit(event){
      
      event.preventDefault();
      console.log('Form has submitted');
  }

  
  
  login() {
    this.props.auth.login();
  }
  
  toLowerCamelCase(str) {
      return str.replace(/[^A-Za-z0-9]/g, ' ').replace(/^\w|[A-Z]|\b\w|\s+/g, function (match, index) {
          if (+match === 0 || match === '-' || match === '.' ) {
              return ""; // or if (/\s+/.test(match)) for white spaces
          }
          return index === 0 ? match.toLowerCase() : match.toUpperCase();
      });
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
    

    return (
      
      <div>
          <div className="container-fluid">
                <div className="row">
                    <form id="newLayout" onSubmit={this.handleSubmit.bind(this)}>
                    
                        
                        <CardWithHeaderHalf title="New Client Details" color="red" icon="account_box">
                            
                           <br/>
                           
                           <p>Please note that all details except the acronym can be updated at any time.</p>
                        
                           <div className="form-group label-floating">
                                <label htmlFor="acronym" className="control-label">Client Acronym:</label>
                                <input type="text" id="acronym"  name="acronym" className="form-control" />
                           </div>
                           
                           <div className="form-group label-floating">
                                <label htmlFor="websiteURL" className="control-label">Website Url:</label>
                                <input type="text" id="websiteURL"  name="websiteURL" className="form-control" />
                           </div>
                          
                           <div className="form-group label-floating">
                                <label htmlFor="fullName" className="control-label">Full Name:</label>
                                <input type="text" id="fullName"  name="fullName" className="form-control" />
                           </div>
            
                           
                           <div className="form-group label-floating">
                                <label htmlFor="logoURL" className="control-label">Logo URL:</label>
                                <input type="text" id="logoURL"  name="logoURL" className="form-control" />
                           </div>
                           
                           <div className="form-group label-floating">
                                <label htmlFor="address" className="control-label">Address:</label>
                                <input type="text" id="address"  name="address" className="form-control" />
                           </div>
                           
                           <div className="form-group label-floating">
                                <label htmlFor="idNumber" className="control-label">Non-Profit ID Number:</label>
                                <input type="text" id="idNumber"  name="idNumber" className="form-control" />
                           </div>
                           
                           <div className="form-group label-floating">
                                <label htmlFor="phone" className="control-label">Phone Number:</label>
                                <input type="text" id="phone"  name="phone" className="form-control" />
                           </div>
                           
                           <div className="form-group label-floating">
                                <label htmlFor="fax" className="control-label">Fax Number:</label>
                                <input type="text" id="fax"  name="fax" className="form-control" />
                           </div>
                           
                           <div className="form-group label-floating">
                                <label htmlFor="policies" className="control-label">Link to privacy/policies page:</label>
                                <input type="text" id="policies"  name="policies" className="form-control" />
                           </div>
                           
                           <div className="form-group label-floating">
                                <label htmlFor="googleID" className="control-label">Google Analytics ID:</label>
                                <input type="text" id="googleID"  name="googleID" className="form-control" required />
                           </div>
                           

                           <p>If your client uses MailChimp, please enter their api key below</p>
                           
                           <div className="form-group label-floating">
                                <label htmlFor="mailChimpKey" className="control-label">MailChimp Key:</label>
                                <input type="text" id="mailChimpKey"  name="mailChimpKey" className="form-control" />
                           </div>
                           
                            
                        </CardWithHeaderHalf>
                        
                        <CardWithHeaderHalf title="Upload Images" color="red" icon="add_to_photos">
                        
                             <h2>Client Color choices</h2>
                            
                             <div className="form-group label-floating">
                                <label htmlFor="mainColor" className="control-label">Main Color:</label>
                                <input type="color" id="mainColor"  name="mainColor" className="form-control" />
                             </div>
                             
                             <div className="form-group label-floating">
                                <label htmlFor="secondaryColor" className="control-label">Secondary Color:</label>
                                <input type="color" id="secondaryColor"  name="secondaryColor" className="form-control" />
                             </div>
                             
                             <p>This will be the color of monthly and one time buttons on donations forms.</p>
                             
                             <div className="form-group label-floating">
                                <label htmlFor="frequencyColor" className="control-label">Frequency Color:</label>
                                <input type="color" id="frequencyColor"  name="frequencyColor" className="form-control" />
                             </div>
                            
                             <hr />
                             
                             <div>
                                 <p>If you would like to store your client logo on our platform please upload it below.</p> 
                             </div>
                            
                             <label htmlFor="thumbnail" className="control-label">Client Logo:</label>
                             
                               <div className="form-group label-floating dropzone">
                                 <Dropzone>
                                   <p>Click here or drag and drop image files for your layout thumbnail.</p>
                                 </Dropzone>
                               </div>
                           
                            
                            <hr />
                            
                            <div className="form-footer text-center">
                              <button type="submit" className="btn btn-success btn-fill">Register Client</button>
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
        role : state.role
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

export default connect(mapStateToProps, mapDispatchToProps)(NewClient);
