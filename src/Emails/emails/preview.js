import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

//Components


class Preview extends React.Component{
    constructor(props){
      super(props);

        this.state = {
            dataRows: [],
        };
    }

    componentWillMount(){

    }

    componentDidMount(){

    }



    render(){



        return(

            <div className="col-md-12">
                <div className="card">
                  <div className="card-header">
                    <h4 className="card-title">Transactional Email Preview<br/>
                      <small className="category"> Please choose an email to view.</small>
                    </h4>
                  </div>


                  <div className="card-content">
                    <div className="row">


                      <div className="col-md-12">

                        <div id="emailLoad">
                            <h2 className="text-center"><i className="material-icons">email</i> Email Preview </h2>
                        </div>

                      </div>

                    </div>
                  </div>
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
        reportAPI : state.reportAPI,
        activeEmailTemplate :  state.activeEmailTemplate
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

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
