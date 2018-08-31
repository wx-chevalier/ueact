import PropTypes from 'prop-types';

export const TodoProps = PropTypes.shape({
  text: PropTypes.string.isRequired,
  status: PropTypes.oneOf([0, 1]).isRequired
});
