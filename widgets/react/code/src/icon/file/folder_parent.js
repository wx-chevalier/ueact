import React from 'react';

export default class ParentFolder extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <svg {...this.props} viewBox="0 0 40 32">
        <path d="M20,4H36a4,4,0,0,1,4,4V28a4,4,0,0,1-4,4H4a4,4,0,0,1-4-4L0,4A4,4,0,0,1,4,0H16Zm9,12.58H14.8L18.4,13,17,11.58l-6,6,6,6,1.4-1.4-3.6-3.6H29v-2Z" />
      </svg>
    );
  }
}
