import React from 'react';
import LinearProgress from 'material-ui/LinearProgress';

const styles = {
  root: {
    position: 'absolute',
    left: 0,
    zIndex: 1102,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0)',
    width: '100%'
  }
};

export default class Linear extends React.Component {
  static propTypes = {
    style: React.PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      completed: 5
    };
  }

  componentDidMount() {
    this.timer = setTimeout(() => {
      this.progress(70);
      this.timer = setTimeout(() => {
        this.progress(95);
        this.timer = setTimeout(() => {
          this.progress(98);
          this.timer = setTimeout(() => {
            this.progress(99.9);
          }, 1000);
        }, 500);
      }, 50);
    }, 50);
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  progress(completed) {
    this.setState({ completed });
  }

  render() {
    let { style } = this.props;
    style = Object.assign(styles.root, style);
    return (
      <LinearProgress
        style={style}
        mode="determinate"
        value={this.state.completed}
      />
    );
  }
}
