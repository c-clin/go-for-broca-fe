import React, { Component } from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
// import Loader from '../Loader';

export const THEME_BLACK = 'black';
export const THEME_BLUE = 'blue';
export const THEME_WHITE = 'white';

class Button extends Component {
  static defaultProps = {
    autoWidth: false,
    className: '',
    disabled: false,
    isLoading: false,
    noOutline: false,
    onClick: () => {},
    to: '',
    component: 'button',
    type: 'button'
  };

  static propTypes = {
    autoWidth: PropTypes.bool,
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
      PropTypes.node,
      PropTypes.shape({})
    ]),
    className: PropTypes.string,
    disabled: PropTypes.bool,
    isLoading: PropTypes.bool,
    noOutline: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    pill: PropTypes.bool,
    to: PropTypes.string,
    theme: PropTypes.oneOf([THEME_BLACK, THEME_BLUE, THEME_WHITE]),
    type: PropTypes.oneOf(['button', 'submit', 'reset'])
  };

  render() {
    const {
      autoWidth,
      children,
      className,
      component,
      disabled,
      isLoading,
      noOutline,
      onClick,
      onSubmit,
      pill,
      theme,
      to,
      type
    } = this.props;

    const Component = component;

    return (
      <Component
        className={classNames('Button', `Button__${theme}`, className, {
          'Button--autoWidth': autoWidth,
          'Button--rounded': pill,
          'Button--loading': isLoading,
          'Button--disabled': disabled,
          'Button--no-outline': noOutline
        })}
        disabled={disabled}
        onClick={onClick}
        onSubmit={onSubmit}
        to={to}
        type={type}
      >
        {children}
        {/* {isLoading ? <Loader /> : children} */}
      </Component>
    );
  }
}

export default Button;
