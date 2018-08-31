

import React, { PureComponent } from 'react';
import styled from 'styled-components';

const FixedSizeWrapper = styled.section`
  width: 375px;
  height: 667px;

  position: relative;

  overflow: hidden;

  border: 1px solid;
`;

/**
 * Description 固定外部尺寸
 */
export default class MobileLayout extends PureComponent {
  render() {
    return <FixedSizeWrapper>{this.props.children}</FixedSizeWrapper>;
  }
}
