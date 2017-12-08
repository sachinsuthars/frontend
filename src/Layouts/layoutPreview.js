import React, { Component } from 'react';
import history from '../history';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

class LayoutPreview extends Component {

  constructor(props){
        super(props);

        this.state = {

            initial: '',
            clientUrl: ''

        };

  }

  componentWillMount(){

    this.setState({clientUrl: '/dashboard/generateCreative/' + this.props.client + '/' + this.props.values.name})

  }

  componentDidMount(){


  }



  render() {



    return (



        <div className="col-md-4">
          <div className="card card-product">
            <div className="card-image" data-header-animation="true">
                 <img className="img" src={'https://s3.amazonaws.com/give.rkd.io/images/layouts/' + this.props.values.thumbnail}  />
            </div>
            <div className="card-content">
              <div className="card-actions">

                <button type="button" className="btn btn-default btn-simple" rel="tooltip" data-placement="bottom" title="View">
                  <i className="material-icons">art_track</i>
                   &nbsp;View Sample
                </button>

              </div>
              <h4 className="card-title">
                Layout:  {this.props.values.name }
              </h4>
              <div className="card-description">
                 {this.props.values.description}
              </div>
            </div>
            <div className="card-footer text-center">

                <Link to={this.state.clientUrl}>
                    <button className="btn btn-success btn-fill">Choose Layout</button>
                </Link>


            </div>
          </div>
        </div>



    );
  }
}

const mapStateToProps = (state) => {
    return {
        client:  state.client
    };
};

const mapDispatchToProps = (dispatch) => {
    return {

        changeClient : (role) => {
            dispatch(
                {
                    type: "ChangeClient",
                    payload : role
                }
            );
        }

    };
};



export default connect(mapStateToProps, mapDispatchToProps)(LayoutPreview);
