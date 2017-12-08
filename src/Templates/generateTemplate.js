import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import history from '../history';
import {connect} from 'react-redux';
//Import Components Sachin
import ClientsSection from '../Clients/clientSection.js';
import TemplatePreview from './templatePreview.js';
import ToggleDisplay from 'react-toggle-display';
var ReactGridLayout = require('react-grid-layout');

const axios = require('axios');

class GenerateTemplate extends Component {



  constructor(props){
        super(props);

        this.state = {
           posts: [],
           ClientChoose:'',
           clientName: '',
           layout: '',
        }

  }
 

  onUpdate = (val) => {

    this.setState({
      ClientChoose: val
    })
  };

  componentWillMount(){
     
  }

  componentDidMount() {
    this.props.changeInitial('Customize Templates');
      this.setState({clientName: this.props.match.params.clientChosen});
      this.setState({layout: this.props.match.params.layoutChosen});
     let url = this.props.api
          + 'getTemplateLayout';
     axios.get(url)
      .then(res => {
        const posts = res.data.Items;
        this.setState({ posts });
      });

  }

  login() {
    this.props.auth.login();
  }


  render() {

    const { isAuthenticated } = this.props.auth;

    return (

      <div>
          <div className="container-fluid">

                <h3>Customize Layout</h3>

                <br/>
                 

                <div className="row">

                <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200}>
             <div key="a" data-grid={{x: 0, y: 0, w: 1, h: 2, static: true}}>a</div>
          <div key="b" data-grid={{x: 1, y: 0, w: 3, h: 2, minW: 2, maxW: 4}}>b</div>
         <div key="c" data-grid={{x: 4, y: 0, w: 1, h: 2}}>c</div>
      </ReactGridLayout>
                  
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

export default connect(mapStateToProps, mapDispatchToProps)(GenerateTemplate);
