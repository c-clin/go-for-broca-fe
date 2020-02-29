import React, { Component } from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div className='LoginPage'>
        <div class='g-signin2' data-onsuccess='onSignIn'></div>
      </div>
    );
  }
}

export default LoginPage;
