import React from 'react';
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  StoryPanel,
  StoryTitle,
  Example
} from '../.storybook/decorator/stories.js';
import DigitalLabel from '../src/indicator/label/digital/DigitalLabel';
import DecoratorLabel from '../src/indicator/label/decorator/DecoratorLabel';
import EllipticalLabel from '../src/indicator/label/elliptical/EllipticalLabel';
storiesOf('Label', module)
  .addDecorator(story =>
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  )
  .addWithInfo(
    'DigitalLabel',
    `
      数字显示标签
    `,
    () =>
      <StoryPanel>
        <StoryTitle label="DigitalLabel" description="数字显示标签" />
        <section className="examples">
          <Example label="中文">
            <DigitalLabel digital={1} />

            <DigitalLabel digital={2} />
          </Example>
        </section>
      </StoryPanel>,
    { inline: false, propTables: [DigitalLabel] }
  )
  .addWithInfo(
    'DecoratorLabel',
    `
      附带其他装饰效果的标签
    `,
    () =>
      <StoryPanel>
        <StoryTitle label="DecoratorLabel" description="附带其他装饰效果的标签" />
        <section className="examples">
          <Example label="Required">
            <DecoratorLabel required />
          </Example>
        </section>
      </StoryPanel>,
    { inline: false, propTables: [DigitalLabel] }
  )
  .addWithInfo(
    'EllipticalLabel',
    `
    自动省略悬浮提示的标签    
  `,
    () =>
      <StoryPanel>
        <StoryTitle label="EllipticalLabel" description="自动省略悬浮提示的标签" />
        <section className="examples">
          <Example label="固定长度，超出则省略提示">
            <div style={{ width: '10em' }}>
              <EllipticalLabel
                label={'我是一个非常非常非常非常非常非常非常非常长的标签我是一个非常非常非常非常非常非常非常非常长的标签'}
              />
            </div>
          </Example>
        </section>
      </StoryPanel>,
    { inline: false, propTables: [EllipticalLabel] }
  );
