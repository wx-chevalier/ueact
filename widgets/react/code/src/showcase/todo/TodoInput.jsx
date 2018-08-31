import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { AddIcon } from './svg-icons';
import './todo.scss';

/** TODO 的输入框 */
export default class TodoInput extends PureComponent {
  static propTypes = {
    onAdd: PropTypes.func
  };

  static defaultProps = {
    onAdd: text => text
  };

  state = {
    text: undefined
  };

  render() {
    const { onAdd } = this.props;
    const { text } = this.state;
    return (
      <section className="fc-todo-input">
        <header>
          <input
            id="item"
            type="text"
            value={text}
            placeholder="Enter an activity.."
            onChange={e => {
              this.setState({
                text: e.target.value
              });
            }}
          />
          <button
            id="add"
            onClick={() => {
              onAdd(text);
            }}
          >
            <AddIcon />
          </button>
        </header>
      </section>
    );
  }
}
