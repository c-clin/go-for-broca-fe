import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

class Loader extends Component {
  static propTypes = {
    inactive: PropTypes.bool,
    size: PropTypes.oneOf(['s', 'm', 'l'])
  };
  render() {
    return (
      <div
        className={classnames('loader', { inactive: this.props.inactive })}
      />
    );
  }
}

export default Loader;
