

import React from 'react';
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import ImageTitleCard from '../src/indicator/card/image_title/image_title_card';
import ImageFloatingTitleCard from '../src/indicator/card/image_floating_title/image_floating_title_card';
import {
  StoryPanel,
  StoryTitle,
  Example
} from '../.storybook/decorator/stories.js';
import ImageTitleOperationCard from '../src/indicator/card/image_title_operation/image_title_operation_card';

//加载Divider
storiesOf('Card', module)
  .addDecorator(story =>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  )
  .addWithInfo(
    'ImageFloatingTitleCard',
    `图片与悬浮标题`,
    () =>
      <StoryPanel>
        <StoryTitle
          label="ImageFloatingTitleCard"
          description="图片与悬浮标题，注意,该卡片的宽高需要由父组件确定"
        />
        <Example label="标题浮动于图片">
          <div style={{ width: '10em', height: '10em' }}>
            <ImageFloatingTitleCard />
          </div>
        </Example>

        <Example label="标题浮动于图片并且完全覆盖">
          <div style={{ width: '10em', height: '10em' }}>
            <ImageFloatingTitleCard covered={true} />
          </div>
        </Example>

        <Example label="标题位于图片下方">
          <div style={{ width: '10em', height: '10em' }}>
            <ImageTitleCard />
          </div>
        </Example>
      </StoryPanel>,
    { inline: false, propTables: [ImageTitleOperationCard] }
  )
  .addWithInfo(
    'ImageTitleOperationCard',
    ``,
    () =>
      <StoryPanel>
        <StoryTitle label="ImageTitleOperationCard" description="图片底部为标题与操作" />
        <section className="examples">
          <Example label="卡片高度由容器决定">
            <div style={{ width: '10em', height: '12em' }}>
              <ImageTitleOperationCard />
            </div>
          </Example>
        </section>
      </StoryPanel>,
    { inline: false, propTables: [ImageTitleOperationCard] }
  );
