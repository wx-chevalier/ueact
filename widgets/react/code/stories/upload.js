/**
 * Created by apple on 16/10/21.
 */
import React from "react";
import { storiesOf, action } from '@storybook/react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import UploadChooser from "../src/folder/chooser/chooser";
import {
  StoryPanel,
  StoryTitle,
  Example
} from "../.storybook/decorator/stories.js";
import Avatar from "material-ui/Avatar";

var Highlight = require("react-highlight");
//加载SVG ICONs
storiesOf("Upload", module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo("UploadChooser", ``, () => (
    <StoryPanel>
      <StoryTitle label="UploadChooser" />

      <Example label="无限制选择文件，不进行 MD5 操作">
        <UploadChooser
          md5={false}
          multiple={true}
          onChange={(files: [object]) => {
            action("选择的文件")([...files]);
          }}
        />
      </Example>

      <Example label="自定义选择按钮">
        <UploadChooser
          md5={false}
          onChange={(files: [object]) => {
            action("选择的文件")([...files]);
          }}
        >
          <Avatar src="http://image.1001hao.com/material/2016/11/21/5832d83946139.png?imageMogr2/crop/!624x624a0a0" />
        </UploadChooser>
      </Example>

      <Example label="无限制选择文件，进行MD5操作">
        <UploadChooser
          md5={true}
          onChange={(files: [object]) => {
            action("选择的文件")([...files]);
          }}
        />
      </Example>

      <Example label="文件类型参考" />

      <Example label="Component PropTypes">
        <Highlight className="js">
          {`
          {
            //上传按钮显示的名称
            label: PropTypes.string,
            //文件类型
            types: PropTypes.arrayOf(PropTypes.string),
            //已存在的文件名
            existedFiles: PropTypes.arrayOf(PropTypes.string),
            //判断是否需要进行MD5操作
            md5: PropTypes.bool,
            //选择成功之后的回调事件
            //onChange的函数参数为:files: [{file:object,md5:string}]
            onChange: PropTypes.func
         }
        `}
        </Highlight>
      </Example>

    </StoryPanel>
  ));
