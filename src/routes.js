import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import App from './App';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

//Secondary Elements
import TopNav from './Nav/TopNav.js';
import Login from './Login/login.js';

/* Import Redux Elements */
import store from './Store/store.js';
import {Provider} from 'react-redux';


//Start an Auth0 Session
const auth = new Auth();

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication();
  }
};

export const makeMainRoutes = () => {
  return (
    <div>
      <Provider store={store}>
        <Router history={history} component={App}>
            <div>


                <Route path="/dashboard" render={(props) => <App auth={auth} {...props} />} />


                <Route path="/" exact render= {() => <Redirect to="/dashboard/login"/>} />


                <Route path="/login" render={(props) => <Login auth={this.props.auth} {...props} />} />

                <Route path="/topnav" render={(props) => <TopNav auth={auth} {...props} />} />

                <Route path="/callback" render={(props) => {
                  handleAuthentication(props);
                  return <Callback {...props} />;
                }}/>
            </div>
          </Router>
      </Provider>
     </div>
  );
};
