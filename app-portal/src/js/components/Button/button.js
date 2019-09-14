import React from 'react';
import PropTypes from 'prop-types';

// COMPONENTS & STYLES
import { ButtonWrapper } from './button.styles';

// HELPERS

const Button = (props) => {
  const {
    children,
    iconBefore,
    iconAfter,
    ...rest
  } = props;


  const renderIconBefore = () => {
    if (!iconBefore)
      return null;

    return (<i className={ iconBefore } ></i>)
  }

  const renderIconAfter = () => {
    if (!iconAfter)
      return null;

      return (<i className={ iconAfter } ></i>)
  }

  return (
    <ButtonWrapper
      { ...rest }
    >
      { renderIconBefore() }
      { children }
      { renderIconAfter() }
    </ButtonWrapper>
  );
};

Button.defaultProps = {
  children: '',
  iconBefore: '',
  iconAfter: ''
};

Button.propTypes = {
  children: PropTypes.any,
  iconBefore: PropTypes.string,
  iconAfter: PropTypes.string
};

export default Button;