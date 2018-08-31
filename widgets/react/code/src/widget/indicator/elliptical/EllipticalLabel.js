
import React from 'react';
import PropTypes from 'prop-types';

import Tooltip from '../../../dialog/tooltip/HoverableTooltip';
import './EllipticalLabel.scss';

const EllipticalLabel = ({
  label = '我很长很长很长很长很长很长很长很长',
  tip = label,
  verticalPosition = 'top',
  horizontalPosition = 'center'
}) =>
  (<section className="elliptical_label__container">
    <Tooltip
      label={
        <span className="elliptical_label">
          {label}
        </span>
      }
      tip={
        <span className="elliptical_tip">
          {tip}
        </span>
      }
      verticalPosition={verticalPosition}
      horizontalPosition={horizontalPosition}
    />
   </section>);

EllipticalLabel.propTypes = {
  label: PropTypes.node.isRequired,

  tip: PropTypes.node.isRequired,

  horizontalPosition: PropTypes.oneOf(['left', 'center', 'right']),

  verticalPosition: PropTypes.oneOf(['top', 'center', 'bottom']),

  // 是否使用HTML原生提示
  native: PropTypes.bool
};

EllipticalLabel.defaultProps = {
  horizontalPosition: 'center',
  verticalPosition: 'bottom',
  native: true
};

export default EllipticalLabel;
