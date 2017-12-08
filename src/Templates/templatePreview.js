import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { CONFIG } from '../data/config';


class TemplatePreview extends Component {

  constructor(props){
        super(props);
        // super();
        this.state = {
            initial: '',
            clientUrl: '',
            template_path:CONFIG.template_path,
            donationUrl:CONFIG.template_path+this.props.postData.backImg,
            thumbUrl:CONFIG.template_path+this.props.postData.thumbImg,
            templUrl:'',
            isDisabled:true
            
        };
  }



  componentWillMount(){}

  componentDidMount(){}

  componentWillReceiveProps(newProps) {    
     if(newProps.passedVal !="NONE")
     {
       this.setState({isDisabled:false});
        this.setState({templUrl: '/generateTemplate/' + newProps.passedVal + '/'  + this.props.postData.name  });
     }
     else
     {
       this.setState({isDisabled:true});
       // 
      
     }
   }


  render() {
    var data = this.props.postData
    return (

        <div className="col-md-4 col-sm-12 cl-template" >
          <div className="card card-product">
            <div className="card-image" data-header-animation="true">
              <a href={this.state.donationUrl}>
                <img className="img" src={this.state.thumbUrl} />
              </a>
            </div>
            <div className="card-content">
              <div className="card-actions">

                <a  href={this.state.donationUrl} className="btn btn-default btn-simple" rel="tooltip" data-placement="bottom" title="View">
                  <i className="material-icons">art_track</i>
                   &nbsp;View Sample
                </a>

              </div>
              <h4 className="card-title">
               {data.title}
               </h4>
              <div className="card-description">
                {data.desc.substring(0,200)}
              </div>
            </div>
            <div className="card-footer text-center">

                <Link to={this.state.templUrl}>
                    <button disabled={this.state.isDisabled} className="btn btn-success btn-fill">Choose Layout</button>
                </Link>


            </div>
          </div>
        </div>



    );
  }
}



export default (TemplatePreview);
