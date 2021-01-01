import './App.css';

import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import LoginHook from './component/login';
import Home from './component/home';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './component/routing/PrivateRoutes';
import { Store } from './component/services/store';
import { refreshTokenSetup } from './utils/refreshTokenSetup';
import { service } from './component/services/services';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    const tokenId = Store.getUserToken();

    service
      .login(tokenId)
      .then(res => {
        Store.setUser(res.data.user);
        Store.set('isAuthenticated', res.data.status);
      })
      .catch(err => {
        Store.setUser({});
        Store.set('isAuthenticated', false);
      });
    // refreshTokenSetup(tokenData);
    // const TokenId = Store.setUserToken(res.tokenId);
    // service
    //   .login(res.tokenId)
    //   .then(res => {
    //     Store.setUser(res.data.user);
    //     Store.set('isAuthenticated', res.data.status);
    //   })
    //   .catch(err => console.log(err));
  };
  return (
    <Router>
      <Fragment>
        <Switch>
          <Route exact path='/login' component={LoginHook} />
          <PrivateRoute
            exact
            path='/'
            isAuthenticated={Store.get('isAuthenticated')}
            component={Home}
          />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;
