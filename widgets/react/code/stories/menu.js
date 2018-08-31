import React from "react";
import { storiesOf, action } from '@storybook/react';
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import {
  StoryPanel,
  StoryTitle,
  Example
} from "../.storybook/decorator/stories.js";
import BreadCrumb from "../src/picker/menu/bread_crumb/bread_crumb";
import NavigationDropDownMenu
  from "../src/picker/menu/navigation_drop_down/navigation_drop_down_menu";

const menus = [
  {
    name: "导航一",
    onClick: () => {
      action("点击导航")("导航一");
    }
  },
  {
    name: "导航二",
    onClick: () => {
      action("点击导航")("导航二");
    }
  }
];

//加载Divider
storiesOf("Menu", module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .addWithInfo(
    "BreadCrumb",
    `面包屑导航`,
    () => (
      <StoryPanel>
        <StoryTitle label="BreadCrumb" description="面包屑导航" />
        <Example label="多个导航">
          <BreadCrumb
            crumbs={menus}
          />
        </Example>
      </StoryPanel>
    ),
    { inline: false, propTables: [BreadCrumb] }
  )
  .addWithInfo(
    "NavigationDropDownMenu",
    `下拉导航菜单`,
    () => (
      <StoryPanel>
        <StoryTitle label="NavigationDropDownMenu" description="下拉导航菜单" />
        <Example label="多个导航">
          <NavigationDropDownMenu
            label={"导航按钮"}
            menus={menus}
          />
        </Example>
        <Example label="多个导航">
          <NavigationDropDownMenu
            label={<div style={{color:"blue"}}>
              自定义导航按钮
            </div>}
            menus={menus}
          />
        </Example>
      </StoryPanel>
    ),
    { inline: false, propTables: [NavigationDropDownMenu] }
  );
