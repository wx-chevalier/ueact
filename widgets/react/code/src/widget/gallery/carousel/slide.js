// flow

import React, { Component, PropTypes } from 'react';
import transitions from 'material-ui/styles/transitions';

export default class Slide extends Component {
  static propTypes = {
    children: PropTypes.node,
    style: PropTypes.object
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      style: {
        display: 'inline-block',
        transition: transitions.easeOut(),
        transform: `translate3d(0, -20px, 0)`
      }
    };
  }

  componentWillUnmount() {
    clearTimeout(this.enterTimeout);
    clearTimeout(this.leaveTimeout);
  }

  componentWillEnter(callback) {
    this.componentWillAppear(callback);
  }

  componentWillAppear(callback) {
    this.setState({
      style: {
        opacity: 1,
        display: 'inline-block',
        transition: transitions.easeOut(),
        transform: `translate3d(0, 0, 0)`
      }
    });

    this.enterTimeout = setTimeout(callback, 200); // matches transition duration
  }

  render() {
    const { style, children, ...other } = this.props;

    const { prepareStyles } = this.context.muiTheme;

    //
    return (
      <div
        {...other}
        style={prepareStyles(Object.assign({}, this.state.style, style))}
      >
        {children}
      </div>
    );
  }
}
