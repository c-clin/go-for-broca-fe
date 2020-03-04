import React, { Component } from 'react';
import classnames from 'classnames';

export const TOASTER_TYPE_ERROR = 'TOASTER_TYPE_ERROR';
export const TOASTER_TYPE_SUCCESS = ' TOASTER_TYPE_SUCCESS';

class Toaster extends Component {
  render() {
    const { content, type, toasterOpen } = this.props;

    return (
      <div
        className={classnames('Toaster', {
          Toaster__open: toasterOpen,
          Toaster__error: type === TOASTER_TYPE_ERROR,
          Toaster__success: type === TOASTER_TYPE_SUCCESS
        })}
      >
        <p className='Toaster__text'>{content}</p>
      </div>
    );
  }
}

export default Toaster;
