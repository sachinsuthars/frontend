import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

//Components

import Lists from './emails/lists.js';
import Preview from './emails/preview.js';
import Update from './emails/editList.js';

class Emails extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            dataRows: [],
            activeTemplate: '',
        }
    }

    componentWillMount(){
          this.props.changeInitial('Email Manager');
    }

    componentDidMount(){

    }


    render(){



        return(
            <div className="col-md-12">

                      <div className="row">

                               <Lists />

                               <Preview />

                               {/*  <Update /> */}

                       </div>

            </div>


        );
    }
}

const mapStateToProps = (state) => {
    return {
        initial : state.initial,
        allClients : state.allClients,
        apiURL: state.apiURL,
        reportAPI : state.reportAPI
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


    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Emails);
