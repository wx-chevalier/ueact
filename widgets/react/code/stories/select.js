

import React from "react";
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  Example,
  StoryPanel,
  StoryTitle
} from "../.storybook/decorator/stories.js";
import WheelPicker from "../src/picker/select/wheel_picker/WheelPicker";
import MobileLayout from "../.storybook/decorator/MobileLayout";
import { action } from "../.storybook/decorator/stories";

const options = [
  {
    label: "标签 1",
    value: 0
  },
  {
    label: "标签 2",
    value: "1"
  },
  {
    label: "标签 3",
    value: 2
  },
  {
    label: "标签 4",
    value: "3"
  },
  {
    label: "标签 5",
    value: [4]
  },
  {
    label: "标签 6",
    value: { "5": 5 }
  }
];

storiesOf("Select", module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo("WheelPicker", ``, () => {
    return (
      <StoryPanel>
        <StoryTitle label="WheelPicker" description="类似于 iOS 中的转轮选择器" />
        <Example label="单选项选择">
          <MobileLayout>
            <div
              style={{
                height: "150px",
                position: "absolute",
                bottom: 0,
                width: "100%"
              }}
            >
              <WheelPicker
                value={2}
                options={options}
                onSelect={(value, option) => {
                  action("获得值：" + value + "，将 show 设置为 false 以关闭选择器");
                }}
              />
            </div>
          </MobileLayout>
        </Example>
      </StoryPanel>
    );
  });
