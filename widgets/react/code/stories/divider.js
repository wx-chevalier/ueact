

import React from "react";
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import TitleDividerAction
  from "../src/shape/divider/title-divider-action/TitleDividerAction";
import Divider from "../src/shape/divider/Divider";
import {Example, StoryPanel, StoryTitle} from "../.storybook/decorator/stories";

//加载Divider
storiesOf("Shape", module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo("Divider", () => (
    <StoryPanel>
      <StoryTitle label="分割线" description="用于显示主操作按钮" />
      <Example label="垂直分割线">

        <div>
          <Divider />
        </div>
      </Example>

      <Example label="标题-分割线-动作">
        <TitleDividerAction />
      </Example>

    </StoryPanel>
  ));
