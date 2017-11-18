import * as React from 'react';

import { appConstants } from '../../app-constants';
import { EmptyProps, EmptyState } from '../../models';

import './style.scss';

export class Root extends React.Component<EmptyProps, EmptyState> {
  renderDevTool() {
    if (appConstants.isDev) {
      const DevTools = require('mobx-react-devtools').default;

      return (<DevTools />);
    }
  };

  render() {
    return (
      <div className="container">
        {this.props.children}
        {this.renderDevTool()}
      </div>
    );
  }
};
