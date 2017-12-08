import React, { Component } from 'react';


class CardWithHeader extends Component {

  constructor(props){
        super(props);

        this.state = {

            initial: ''


        };

  }

  componentWillMount(){


  }

  componentDidMount(){


  }



  render() {



    return (



        <div className="row">
            <div className="col-md-12">
                <div className="card">

                    <div className="card-header card-header-icon" data-background-color={this.props.color}>
                        <i className="material-icons">{this.props.icon}</i>
                    </div>


                    <div className="card-content">
                      <h4 className="card-title">{this.props.title}</h4>

                      {this.props.children}

                    </div>

                </div>
            </div>
        </div>


    );
  }
}



export default (CardWithHeader);
