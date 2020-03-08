import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { removeToaster } from '../store/actions/uiActions';

export const TOASTER_TYPE_ERROR = 'TOASTER_TYPE_ERROR';
export const TOASTER_TYPE_SUCCESS = ' TOASTER_TYPE_SUCCESS';

class Toaster extends Component {
  constructor() {
    super();

    this.toasterInterval = 0;
  }

  componentDidUpdate = prevProps => {
    if (this.props.toaster.length > 0 && this.toasterInterval === 0) {
      this.toasterInterval = setInterval(() => {
        this.props.removeToaster();
      }, 2000);
    }

    if (this.props.toaster.length === 0 && this.toasterInterval !== 0) {
      clearInterval(this.toasterInterval);
    }
  };

  componentWillUnmount = () => {
    clearInterval(this.toasterInterval);
  };

  render() {
    const { toaster } = this.props;

    if (toaster.length > 0) {
      let t = toaster[0];
      return (
        <div
          className={classnames('Toaster', {
            Toaster__error: t.type === TOASTER_TYPE_ERROR,
            Toaster__success: t.type === TOASTER_TYPE_SUCCESS
          })}
        >
          <p className='Toaster__text'>{t.content}</p>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default connect(null, { removeToaster })(Toaster);
