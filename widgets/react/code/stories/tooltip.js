

import React from "react";
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import HoverablePaper from "../src/shape/paper/HoverablePaper";
import {
  StoryPanel,
  StoryTitle,
  Example
} from "../.storybook/decorator/stories.js";
import Tooltip from "../src/dialog/tooltip/HoverableTooltip.js";

//加载Divider
storiesOf("Tooltip", module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo(
    "Tooltip",
    `浮动提示`,
    () => (
      <StoryPanel>
        <StoryTitle label="Tooltip" description="浮动提示" />
        <Example label="默认位置">
          <Tooltip label={"标签"} tip="提示" />
        </Example>
      </StoryPanel>
    ),
    { inline: false, propTables: [HoverablePaper] }
  );
