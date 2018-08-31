import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { TodoProps } from './prop-types';

import './todo.scss';
import { RemoveIcon, CompleteIcon } from './svg-icons';

export default class Todos extends PureComponent {
  static propTypes = {
    todos: PropTypes.arrayOf(TodoProps),
    onRemove: PropTypes.func,
    onComplete: PropTypes.func
  };

  static defaultProps = {
    todos: [{ text: 'test-1', status: 0 }, { text: 'test-2', status: 1 }],
    onRemove: todo => todo,
    onComplete: todo => todo
  };

  render() {
    const { todos, onRemove, onComplete } = this.props;

    const Buttons = ({ todo }) => (
      <div className="buttons">
        <button
          className="remove"
          onClick={() => {
            onRemove(todo);
          }}
        >
          <RemoveIcon />
        </button>
        <button
          className="complete"
          onClick={() => {
            onComplete(todo);
          }}
        >
          <CompleteIcon />
        </button>
      </div>
    );

    return (
      <section className="fc-todo-todos">
        <div className="container">
          <ul className="todo" id="todo">
            {todos.filter(todo => todo.status === 0).map(todo => (
              <li>
                {todo.text}
                <Buttons todo={todo} />
              </li>
            ))}
          </ul>
          <ul className="todo" id="completed">
            {todos.filter(todo => todo.status === 1).map(todo => (
              <li>
                {todo.text}
                <Buttons todo={todo} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}
