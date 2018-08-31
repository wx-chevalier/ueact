
import React, { Component, PropTypes } from "react";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import Paper from "material-ui/Paper";
import { message, Button } from "antd";
import "antd/dist/antd.css";
const Highlight = require("react-highlight");
require("./stories.scss");

/**
 * @function 包裹每个Story的父层组件
 * @return {XML}
 * @constructor
 */
export const StoryPanel = ({ children }) => {
  return (
    <section className="story_panel__container">
      {children}
    </section>
  );
};

StoryPanel.displayName = "StoryPanel";

/**
 * @function 组件级别的标题
 * @param label
 * @param description
 * @constructor
 */
export const StoryTitle = ({ label, description = "" }) => {
  return (
    <div className="story_title__container">
      <a
        target="__blank"
        href="https://github.com/wxyyxc1992/Web-Development-And-Engineering-Practices"
        className="github-corner"
        aria-label="View source on Github"
      >
        <svg
          width="80"
          height="80"
          viewBox="0 0 250 250"
          style={{
            fill: "#70B7FD",
            color: "#fff",
            position: "fixed",
            top: "0",
            border: "0",
            left: "0",
            transform: "scale(-1, 1)"
          }}
          aria-hidden="true"
        >
          <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
          <path
            d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
            fill="currentColor"
            style={{ transformOrigin: "130px 106px" }}
            className="octo-arm"
          />
          <path
            d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
            fill="currentColor"
            className="octo-body"
          />
        </svg>
      </a>
      <h2>
        <div className="label">
          {label}
        </div>
        <div className="right">
          <div className="source">
            <a
              target="__blank"
              href="https://github.com/wxyyxc1992/fractal-components"
            >
              点击查看源代码
            </a>
          </div>

          <div className="story-source">
            点击右上角查看 Story 源代码
          </div>
        </div>

      </h2>
      <div className="description">
        {description}
      </div>
    </div>
  );
};

StoryTitle.displayName = "StoryTitle";

/**
 * @function 每个例子的容器
 * @param label
 * @param children
 * @param dependences
 * @return {XML}
 * @constructor
 */
export const Example = ({ label, children, dependencies }) => {
  return (
    <section className="example__container">
      <Paper>
        <div className="example_title">
          <span className="label">
            {label}
          </span>
          <span className="dependencies">

          </span>
        </div>
        <div className="children">
          {children}
        </div>
      </Paper>
    </section>
  );
};

Example.displayName = "Example";

/**
 * @function 显示元素的Props
 */
export const Props = ({ label, props = [] }) => (
  <section className="props__container">
    <h2>
      类名:{label}
    </h2>
    <PropTypesTable props={props} />
  </section>
);

Props.displayName = "Props";

/**
 * 组件PropTypesTable
 */
export default class PropTypesTable extends Component {
  static displayName = "PropTypesTable";

  static propTypes = {
    props: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        type: PropTypes.string,
        description: PropTypes.string,
        value: PropTypes.string
      })
    )
  };

  static defaultProps = {};

  /**
   * @function 默认构造函数
   * @param props
   */
  constructor(props) {
    super(props);
  }

  /**
   * @function 组件挂载完成回调
   */
  componentDidMount() {}

  /**
   * @function 默认渲染函数
   */
  render() {
    return (
      <section className="prop_types_table__container">

        <Table fixedHeader={true} selectable={false} multiSelectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn style={{ width: "12rem" }}>
                Name
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "5rem" }}>
                Type
              </TableHeaderColumn>
              <TableHeaderColumn style={{ width: "20rem" }}>
                Description
              </TableHeaderColumn>
              <TableHeaderColumn>Example Value</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.props.props.map((prop, index) => (
              <TableRow key={index}>
                <TableRowColumn style={{ width: "12rem" }}>
                  {prop.name}
                </TableRowColumn>
                <TableRowColumn style={{ width: "5rem" }}>
                  {prop.type}
                </TableRowColumn>
                <TableRowColumn style={{ width: "20rem" }}>
                  {prop.description}
                </TableRowColumn>
                <TableRowColumn>{prop.value}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </section>
    );
  }
}

/**
 * Description 将消息
 * @param message
 */
export function action(msg: any) {
  message.info(msg);
}
