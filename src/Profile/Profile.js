import React, { Component } from 'react';
import { Panel, ControlLabel, Glyphicon } from 'react-bootstrap';
import './Profile.css';


class Profile extends Component {
  
  
  componentWillMount() {
    
    this.setState({ profile: {} });
    
    const { userProfile, getProfile } = this.props.auth;
    
    if (!userProfile) {
      getProfile((err, profile) => {
        
        if(err){
          console.log(err);
        }
        
        this.setState({ profile });
        this.testRole();
        
      });
    } else {
      
      this.setState({ profile: userProfile });
      
      
    }
    
  }
  
  
  testRole(){
       
      if(this.state.profile["http://one.rkd.io/role"] === 'admin'){
      console.log('This is an admin');
      }
  }
  

  render() {
    const { profile } = this.state;
    
    
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
          <Panel header="Profile">
            <img src={profile.picture} alt="profile" />
            <div>
              <ControlLabel><Glyphicon glyph="user" /> Nickname</ControlLabel>
              <h3>{profile.nickname}</h3>
              
            </div>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
          </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
