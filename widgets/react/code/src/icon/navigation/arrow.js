import React from 'react';

export default class Arrow extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg {...this.props} viewBox="0 0 62 30">
        <polygon points="19.8,0.3 0,15.2 19.8,30 19.8,20.9 41.1,20.9 41.1,30 62,15.2 40.9,0 40.9,9.3 19.8,9.3 " />
      </svg>
    );
  }
}
