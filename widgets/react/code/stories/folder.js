/**
 * Created by apple on 16/10/21.
 */
import React from 'react';
import { storiesOf } from '@storybook/react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StoryPanel, StoryTitle, Example } from '../.storybook/decorator/stories.js';
import ParentFolderCard from '../src/folder/grid/cards/folder/parent_folder_card';
import NewFolderCard from '../src/folder/grid/cards/folder/new_folder_card';
import FolderCard from '../src/folder/grid/cards/folder/folder_card';
import FolderViewEntity from '../src/folder/entity/folder_view_entity';
import FileCard from '../src/folder/grid/cards/file/file_card';
import FolderGrid from '../src/folder/grid/folder_grid';
import FileViewEntity from '../src/folder/entity/file_view_entity';
//加载SVG ICONs
storiesOf('Folder', module)
  .addDecorator(story => (
    <MuiThemeProvider muiTheme={getMuiTheme()}>
      {story()}
    </MuiThemeProvider>
  ))
  .add('FolderCard', () => (
    <StoryPanel>
      <StoryTitle
        label="FolderCard"
        description="用于在某个文件夹视图中显示不同类型的文件夹卡片"
      />


      <Example label="返回上一级文件夹">
        <ParentFolderCard/>
      </Example>

      <Example label="创建新文件夹">
        <NewFolderCard/>
      </Example>

      <Example label="文件夹">
        <FolderCard folder={new FolderViewEntity({name:'Full Mode'})}/>
        <br/>
        <FolderCard folder={new FolderViewEntity({name:'默认选中'})} selected={true}/>
        <br/>
        <FolderCard folder={new FolderViewEntity({name:'Select Mode'})} mode={'select'}/>
        <br/>


      </Example>


    </StoryPanel>
  ))
  .add('FileCard', () => (
    <StoryPanel>
      <StoryTitle
        label="FileCard"
        description="用于在某个文件夹视图中显示文件"
      />

      <Example label="文件卡片">
        <FileCard/>
      </Example>


    </StoryPanel>
  ))
  .addWithInfo(
    'FolderGrid',
    `
      网格状文件夹
    `,
    () => {

      let folder = new FolderViewEntity();

      //添加子文件夹
      folder.children = [new FolderViewEntity(), new FolderViewEntity()];

      //添加子文件
      folder.files = [new FileViewEntity(), new FileViewEntity()];

      //存在父文件夹的文件夹
      let subAndSelectModeFolder = new FolderViewEntity(folder);

      subAndSelectModeFolder.parent = new FolderViewEntity();

      return <StoryPanel>
        <StoryTitle label="FolderGrid" description="网格状文件夹"/>
        <section className="examples">
          <Example label="顶层文件夹">
            <FolderGrid folder={folder}/>
          </Example>
          <Example label="子层选择模式下文件夹">
            <FolderGrid folder={subAndSelectModeFolder} mode={'select'}/>
          </Example>
        </section>
      </StoryPanel>
    },
    {inline: false, propTables: [FolderGrid]});


