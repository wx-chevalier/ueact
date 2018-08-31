

import React from "react";
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import SimpleMediaCarousel
  from "../src/carousel/simple_media/SimpleMediaCarousel";
import {
  Example,
  StoryPanel,
  StoryTitle
} from "../.storybook/decorator/stories";

const medium = [
  {
    id: 0,
    type: "image",
    src: "http://userimage2.360doc.com/12/0104/08/8441994_201201040832500197.jpg",
    onClick: () => {}
  },
  {
    id: 1,
    type: "image",
    src: "http://image.1001hao.com/material/2016/10/19/5806e3a670741.jpg",
    onClick: () => {}
  },
  {
    id: 2,
    type: "image",
    src: "http://image.1001hao.com/equipment/2016/10/24/580d62af65d62.jpeg",
    onClick: () => {}
  },
  {
    id: 3,
    type: "image",
    src: "http://image.1001hao.com/material/2016/10/19/5806e3a670741.jpg",
    onClick: () => {}
  }
];

//加载Divider
storiesOf("Carousel", module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo(
    "SimpleMediaCarousel",
    `简单走马灯`,
    () => (
      <StoryPanel>
        <StoryTitle label="SimpleMediaCarousel" description="简单走马灯" />
        <Example label="默认位置，需要父组件指定尺寸">
          <div style={{ height: "25em" }}>
            <SimpleMediaCarousel medium={medium} />
          </div>
        </Example>
      </StoryPanel>
    ),
    { inline: false, propTables: [SimpleMediaCarousel] }
  );
