import React, { Component } from 'react';


class CardWithHeaderNoIcon extends Component {
  
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
                        <h3>{this.props.title}</h3>
                    </div>

                    <div className="card-content">
                     
                      {this.props.children}
                      
                    </div>
                    
                </div>
            </div>
        </div>
      

    );
  }
}



export default (CardWithHeaderNoIcon);

