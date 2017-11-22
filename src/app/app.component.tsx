import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import './mobx-config'; // configure strict mode and logger
import { rootStore } from './stores';
import { Root } from './components';
import './app.style.scss';

const App = () => (
  <Provider {...rootStore}>
    <Root />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
