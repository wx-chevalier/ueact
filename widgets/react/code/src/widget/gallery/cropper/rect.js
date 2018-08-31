/*eslint-disable */
import React, {PropTypes, Component} from 'react';
import ReactDOM from 'react-dom';
import {multiply} from './utils';

export default class Rect extends Component {

  static propTypes = {
    canvasWidth: PropTypes.number.isRequired,
    canvasHeight: PropTypes.number.isRequired,
    handlerSize: PropTypes.number.isRequired,
    borderColor: PropTypes.string.isRequired,
    pixelRatio: PropTypes.number.isRequired,
  };

  constructor(props) {
    super(props);
  }

  paint = (coords) => {
    let {handlerSize, pixelRatio} = this.props;
    if (pixelRatio > 1) {
      coords = multiply(coords, pixelRatio);
      handlerSize = handlerSize * pixelRatio;
    }
    let {x, y, width, height} = coords;
    let {canvasWidth, canvasHeight} = this.props;
    let node = ReactDOM.findDOMNode(this);
    let context = node.getContext('2d');
    context.clearRect(0, 0, node.width, node.height);
    if (!width || !height) {
      return;
    }
    context.strokeStyle = this.props.borderColor;
    context.fillStyle = 'rgba(0, 0, 0, 0.3)';
    context.beginPath();
    context.rect(x, y, width, height);
    context.stroke();
    context.rect(node.width, 0, -node.width, node.height);
    // credit: http://stackoverflow.com/a/11770000/337480
    // fix for safari
    context.fill('evenodd');
    context.fillStyle = this.props.borderColor;
    context.fillRect(x + width - handlerSize,
                     y + height - handlerSize,
                     handlerSize,
                     handlerSize);
  }

  componentDidUpdate() {
    let {x, y, height, width} = this.props;
    if (x !== null && y !== null) {
      this.paint({
        x,
        y,
        width,
        height
      });
    }
  }

  render() {
    let {canvasWidth, canvasHeight, pixelRatio} = this.props;
    let props = {
      width: canvasWidth * pixelRatio,
      height: canvasHeight * pixelRatio
    };
    if (pixelRatio > 1) {
      props.style = {
        width: canvasWidth,
        height: canvasHeight
      }
    }
    return <canvas {...props} />;
  }
}
/* eslint-enable */
