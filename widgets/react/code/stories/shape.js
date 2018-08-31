
import React from "react";
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import HoverablePaper from "../src/shape/paper/HoverablePaper";
import {
  Example,
  StoryPanel,
  StoryTitle
} from "../.storybook/decorator/stories";

//加载SVG ICONs
storiesOf("Shape", module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo(
    "Paper",
    `纸片效果`,
    () => (
      <StoryPanel>
        <StoryTitle label="HoverablePaper" description="纸片效果" />
        <Example label="带浮动效果的 Paper">
          <div style={{ width: "15em", height: "10em" }}>
            <HoverablePaper>
              <div style={{}}>王下邀月熊</div>
            </HoverablePaper>
          </div>
        </Example>
      </StoryPanel>
    ),
    { inline: false, propTables: [HoverablePaper] }
  )
  .add("指示类", () => (
    <StoryPanel>
      <StoryTitle label="SVG Icons" description="自定义 SVG 图标" />
      <Example label="指示类">
        <Bulb />
      </Example>
      <Example label="动作类指向类图标">
        <h3>金钱/购买</h3>
        <Money />
        <Money color="red" />
      </Example>
      <Example label="导航类">
        <TwoWayHalfArrow />

      </Example>
    </StoryPanel>
  ));
