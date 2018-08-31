

import React from 'react';
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Pagination from '../src/indicator/pagination/pagination';
import { StoryPanel, StoryTitle, Example } from '../.storybook/decorator/stories.js';
import Pager from '../src/indicator/pagination/pager';

//加载Divider
storiesOf('Pagination', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('Pagination', () => (
    <StoryPanel>
      <StoryTitle label="Pagination" description="常用于列表、网格等多页情况下"/>

      <Example label="基本分页使用">
        <Pagination/>
      </Example>

    </StoryPanel>
  ))
  .add('Pager', () => (
    <StoryPanel>
      <StoryTitle label="Pager" description="分页指示器中的分页页标"/>

      <Example label="基本分页页标">
        <Pager page={1}/>
        <Pager page={2}/>

      </Example>

      <Example label="当前页标">
        <Pager page={1} active={true}/>
        <Pager page={2}/>
      </Example>

    </StoryPanel>
  ));

