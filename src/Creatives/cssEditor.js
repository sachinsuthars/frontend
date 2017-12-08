import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Helper Modules
import Dropzone from 'react-dropzone';
import TinyMCE from 'react-tinymce';
const jQuery = require("jquery");

//import UI
import CardWithHeaderNoIcon from '../UI/cardWithHeaderNoIcon.js';

class CSSEditor extends Component {

  constructor(props){
        super(props);

        this.state = {

            initial: '',
            hideJS : {display: 'none'},
            creativeName : '',
            clientName: '',
            layout: ''

        };

  }

  componentWillMount(){


    //this.setState({clientName: this.props.match.params.clientChosen});
    //this.setState({layout: this.props.match.params.layoutChosen});


  }

  componentDidMount(){

    this.editorCSS();
  }


  handleEditorChange(event){

  }

  saveCSS(){

  }

  saveCSSfile(){

  }


  editorCSS(){

    let editorCSS = window.ace.edit("editorCSS");

    editorCSS.setTheme("ace/theme/monokai");
    editorCSS.getSession().setMode("ace/mode/css");

    editorCSS.getSession().on('change', (e) =>{
      this.setState({jsComplete: {display: 'none'}});
    });

    editorCSS.on("focus", ()=>{
      jQuery("#editorCSS").get(0).scrollIntoView();
    });

    editorCSS.setOption("wrap", true);

  }

  render() {



    return (

        <CardWithHeaderNoIcon title="Step 07" color="red">
          <h4>Custom CSS Styles</h4>
          <br/><br/>

          <div className="form-group label-floating">

            <div id="editorCSS">/* Insert your custom styles here */</div>
            <div className="text-center">
              <button className="btn btn-success" onClick={this.saveCSS.bind(this)}>Submit CSS Code</button>
              <button className="btn btn-info" onClick={this.saveCSSfile.bind(this)}>Download a Copy</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(CSSEditor);
