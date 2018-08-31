import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import TodoInput from '../src/showcase/todo/TodoInput';
import Todos from '../src/showcase/todo/Todos';

storiesOf('Showcase/Todos', module)
  .add('TodoInput', () => <TodoInput onAdd={action('add')} />)
  .add('Todos', () => (
    <Todos onComplete={action('finish')} onRemove={action('remove')} />
  ));
