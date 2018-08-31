import React from 'react';

export default class ShoppingCartNone extends React.Component {
  static propTypes = {};

  render() {
    return (
      <svg {...this.props}>
        <path d="M7.9,18c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S9,18,7.9,18z M17.9,18c-1.1,0-2,0.9-2,2 s0.9,2,2,2s2-0.9,2-2S19,18,17.9,18z M19.3,6l-2.8,5h-7l-0.1-0.3L7.1,6H19.3 M20.3,4L20.3,4 M6.1,4L5.3,2H2v2h2l3.6,7.6L6.2,14 c-0.2,0.3-0.3,0.6-0.3,1c0,1.1,0.9,2,2,2h12v-2H8.3c-0.1,0-0.2-0.1-0.2-0.3v-0.1L9,13h7.4c0.8,0,1.4-0.4,1.8-1L22,5l-1.7-1H6.1z" />
      </svg>
    );
  }
}
