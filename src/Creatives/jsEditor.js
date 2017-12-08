import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

//Import Helper Modules
import Dropzone from 'react-dropzone';
import TinyMCE from 'react-tinymce';
const jQuery = require("jquery");

//import UI
import CardWithHeaderNoIcon from '../UI/cardWithHeaderNoIcon.js';

class JSEditor extends Component {

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

    this.editor();
  }


  handleEditorChange(event){

  }

  saveJS(){

  }

  saveJSfile(){

  }


  editor(){

    let editor = window.ace.edit("editor");

    editor.setTheme("ace/theme/monokai");
    editor.getSession().setMode("ace/mode/javascript");

    editor.getSession().on('change', (e) =>{
      this.setState({jsComplete: {display: 'none'}});
    });

    editor.on("focus", ()=>{
      jQuery("#editor").get(0).scrollIntoView();
    });

    editor.setOption("wrap", true);
  }

  render() {



    return (

        <CardWithHeaderNoIcon title="Step 06" color="red">
          <h4>Custom Javascript</h4>
          <br/><br/>

          <div className="form-group label-floating">

            <div id="editor">console.log('Insert Your Code Below');</div>
            <div className="text-center">
              <button className="btn btn-success" onClick={this.saveJS.bind(this)}>Submit JS Code</button>
              <button className="btn btn-info" onClick={this.saveJSfile.bind(this)}>Download a Copy</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(JSEditor);
