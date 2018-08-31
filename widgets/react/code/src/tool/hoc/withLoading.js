/** 附带 Loading 状态的请求 */

import React from 'react';
import PropTypes from 'prop-types';
import getDisplayName from 'react-display-name';

function withLoading(isLoadingCB, renderLoadingComponent) {
  return Component => {
    function WihLoadingComponent({ isLoadingProp, ...props }) {
      // 判断是否为加载状态
      const isLoading = isLoadingCB ? isLoadingCB(props) : isLoadingProp;

      if (!isLoading) return <Component {...props} />;

      return renderLoadingComponent ? (
        renderLoadingComponent()
      ) : (
        <p>Be Hold, fetching data may take some time :)</p>
      );
    }

    WihLoadingComponent.propTypes = { isLoadingProp: PropTypes.bool };
    WihLoadingComponent.defaultProps = {
      isLoadingProp: false
    };
    WihLoadingComponent.dissplayName = `withLoading(${getDisplayName(
      Component
    )})`;

    return WihLoadingComponent;
  };
}
export default withLoading;
