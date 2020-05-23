import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import Furnitures from './list-furniture';
import history from './history';


function Routes() {
    return (
      <Router history={history}>
          <Switch>
            <Route path="/" component={Furnitures} />
          </Switch>
      </Router>
    );
}

export default Routes;