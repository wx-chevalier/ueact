// /**
//  * Created by apple on 16/10/21.
//  */
// import React from 'react';
// import { storiesOf, action } from '@storybook/react';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import IconMenuList from '../src/list/icon-menu/IconMenuList';
// import { StoryPanel, StoryTitle, Example, Props } from '../.storybook/decorator/stories.js';
// import DynamicList from '../src/list/dynamic/DynamicList';
// import TextField from 'material-ui/TextField';
// import MassiveListDemo from '../src/list/massive-list/demo/MassiveListDemo';
//
// const testData_items = [1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => {
//
//   return {
//     name: `Type something${i}.stl`,
//     onClick: () => {
//     }
//   };
//
// });
//
// function renderTwoTextFieldsInputComponent(index, value, onRowChange) {
//
//   return <div style={{display:'flex'}}>
//     <TextField
//       value={value['field1']}
//       onChange={
//         (event,newValue)=>{
//           onRowChange(index,Object.assign({},value,{field1:newValue}))}
//       }
//     />
//     <TextField
//       value={value['field2']}
//       onChange={
//         (event,newValue)=>{
//           onRowChange(index,Object.assign({},value,{field2:newValue}))}
//       }
//     />
//   </div>
//
// }
// //加载Divider
// storiesOf('List', module)
//   .addDecorator(story => (
//     <MuiThemeProvider muiTheme={getMuiTheme()}>
//       {story()}
//     </MuiThemeProvider>
//   ))
//   .addWithInfo('IconMenuList',
//     `
//     显示固定内容可扩展的列表
//     `,
//
//     () => (
//       <StoryPanel>
//         <StoryTitle label='IconMenuList' description='显示固定内容可扩展的列表'/>
//         <Example label='固定长度'>
//           <div style={{width:'20em'}}>
//             <IconMenuList items={testData_items} max={2}/>
//           </div>
//         </Example>
//       </StoryPanel>
//     ))
//   .addWithInfo(
//     'DynamicList',
//     `可动态增删内容的列表`,
//     () => (
//       <StoryPanel>
//         <StoryTitle label='DynamicList' description='可动态增删内容的列表'/>
//         <section className="examples">
//           <Example label='简单的TextField封装'>
//             <div style={{width:'20em'}}>
//               <DynamicList
//                 onSubmit={(values)=>{action('提交')(values)}}
//               />
//             </div>
//           </Example>
//
//           <Example label='混合组件封装'>
//             <div style={{width:'50em'}}>
//               <DynamicList
//                 renderRowLabel={(index)=>(`序号${index}`)}
//                 renderInputComponent={renderTwoTextFieldsInputComponent}
//                 emptyValue={{field1:'初始值1',field2:'初始值2'}}
//                 onSubmit={(values)=>{action('提交')(values)}}
//               />
//             </div>
//           </Example>
//
//           <Example label='带验证的字典型自定义值'>
//             <div style={{width:'50em'}}>
//               <DynamicList
//                 renderRowLabel={(index)=>(`序号${index}`)}
//                 renderInputComponent={renderTwoTextFieldsInputComponent}
//                 emptyValue={{field1:'初始值1',field2:'初始值2'}}
//                 validateRules={{field1:'required',field2:'required'}}
//                 onSubmit={(values)=>{action('提交')(values)}}
//                 onError={(error)=>{action('校验失败')(error)}}
//               />
//             </div>
//           </Example>
//         </section>
//
//
//         <Props
//           label="DynamicList"
//           props={[
//
//           {
//             name:'renderRowLabel',
//             type:'func',
//             description:'用于渲染每行的列表标签',
//             value:'(index) => (index)'
//           },
//           {
//             name:'renderInputComponent',
//             type:'func',
//             description:'控制每一行输入的元素类别',
//             value:`(index, value, onChange) => {}`
//           },
//         {
//           name:'emptyValue',
//             type:'any',
//             description:'输入的每一行的初始数据',
//             value:'初始值'
//           },
//         {
//           name:'onCancel',
//             type:'func',
//             description:'点击取消的回调',
//             value:`(values) => {
//                     console.log(values);
//                   }`
//           },
//         {
//           name:'onSubmit',
//             type:'func',
//             description:'点击确定提交的回调',
//             value:`(values) => {
//                     console.log(values);
//                   }`
//           },
//         {
//           name:'maxRows',
//             type:'number',
//             description:'最大行数限制',
//             value:'-1(表示无限制)'
//           },
//         ]}
//         />
//
//       </StoryPanel>
//     ))
//   .addWithInfo(
//     'MassiveList',
//     '海量列表、上拉加载、下拉刷新',
//     () => (
//       <StoryPanel>
//         <StoryTitle label='MassiveList' description='海量列表、上拉加载、下拉刷新'/>
//         <section className="examples">
//           <Example label='用户列表'>
//             <MassiveListDemo/>
//           </Example>
//         </section>
//       </StoryPanel>
//     )
//   )
// ;
//
