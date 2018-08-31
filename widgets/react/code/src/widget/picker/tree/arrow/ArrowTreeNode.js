

import React, { Component, PropTypes } from "react";
import IconButton from "material-ui/IconButton";
import NavigationArrowDropDown
  from "material-ui/svg-icons/navigation/arrow-drop-down";
import NavigationArrowDropRight
  from "../../../shape/svg-icon/navigation/drop_down_right";
import FlatButton from "material-ui/FlatButton";
import { grey900 } from "material-ui/styles/colors";
import ArrowTree from "./ArrowTree";

/**
 * @function 树形节点
 */
export default class ArrowTreeNode extends Component {
  static propTypes = {
    // 节点名
    name: PropTypes.string,

    // 节点是否展开
    expanded: PropTypes.bool,

    // 节点点击事件
    onClick: PropTypes.func,

    // 节点伸缩修改
    toggleCollapse: PropTypes.func,

    // 节点子元素
    children: PropTypes.array,

    // 判断当前节点同级别是否含有子元素
    hasChildInThisLayer: PropTypes.bool
  };

  static defaultProps = {
    // 节点名
    name: "节点",

    // 节点是否展开
    expanded: false,

    // 节点点击事件
    onClick: name => {
      console.log("Click");
    },

    toggleCollapse: name => {
      console.log("Toggle");
    },

    // 节点子元素
    children: null
  };

  /**
   * @function 默认构造函数
   */
  constructor(props) {
    super(props);
  }

  /**
   * @function 默认渲染函数
   * @return {XML}
   */
  render() {
    const {
      name,
      onClick,
      toggleCollapse,
      expanded,
      children,
      hasChildInThisLayer
    } = this.props;

    // 根据是否有子元素判断是否需要展示箭头
    const navigationArrow = !children && !hasChildInThisLayer
      ? <div />
      : (<IconButton
        onTouchTap={() => {
            toggleCollapse(name);
          }}
        style={styles.iconButton}
        iconStyle={styles.icon}
      >
        {/* 根据是否处于伸缩状态判断是否展示右箭头还是下箭 */}
        {!expanded
            ? <NavigationArrowDropRight />
            : <NavigationArrowDropDown />}
      </IconButton>);

    return (
      <section className="tree_node__container">

        {navigationArrow}

        {/* 当前节点名 */}
        <FlatButton
          label={name}
          title={name}
          style={styles.labelButtonWithMargin}
          labelStyle={styles.label}
          onTouchTap={onClick}
        />

        {/* 当前节点的子元素 */}
        <div
          className={!expanded ? "collapsed" : "expand"}
          style={!expanded ? styles.collapsed : styles.expand}
        >
          {(() => {
            if (children) {
              return <ArrowTree treeData={children} style={styles.child} />;
            }
          })()}
        </div>

      </section>
    );
  }
}

const styles = {
  childrenStyles: {
    color: grey900
  },
  collapsed: {
    display: "none"
  },
  expand: {
    display: "block",
    paddingLeft: "4.5em",
    fontSize: "0.875em"
  },
  iconButton: {
    width: "2.25em",
    height: "2.25em",
    padding: "0.375em",
    fontSize: "1em"
  },
  icon: {
    color: "#4a4a4a"
  },
  labelButton: {
    marginLeft: "-0.75em",
    textAlign: "left",
    verticalAlign: "top"
  },
  labelButtonWithMargin: {
    marginLeft: "-0.75em",
    minWidth: "2em",
    textAlign: "left",
    verticalAlign: "top"
  },
  label: {
    height: "2em",
    lineHeight: 2,
    fontSize: "1em",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
    color: "#4a4a4a"
  },
  child: {
    paddingLeft: "1.25em"
  }
};
