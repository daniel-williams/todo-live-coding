/// <reference types="node" />
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserHistory } from 'history';
import { useStrict } from 'mobx';
import { enableLogging } from 'mobx-logger';
import { Provider } from 'mobx-react';
import { Router, Route, Switch } from 'react-router';

import { App, Root } from './containers';
import { RouterStore } from './stores';
import { appConstants } from './app-constants';

// enable MobX strict mode
useStrict(true);

// logger options
enableLogging({
  action: appConstants.logInfo,
  reaction: appConstants.logInfo,
  transaction: appConstants.logInfo,
  compute: appConstants.logInfo,
});


// prepare MobX stores
const history = createBrowserHistory();
const routerStore = new RouterStore(history);
const rootStores = {
  'router': routerStore
};

// render react DOM
ReactDOM.render(
  <Provider {...rootStores} >
    <Root>
      <Router history={history} >
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </Router>
    </Root>
  </Provider >,
  document.getElementById('app')
);