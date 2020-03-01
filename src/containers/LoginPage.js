import React, { Component } from 'react';

class LoginPage extends Component {
  onSignIn = googleUser => {
    let id_token = googleUser.getAuthResponse().id_token;
    console.log(googleUser);
  };
  render() {
    return (
      <div className='LoginPage'>
        <div class='g-signin2' data-onsuccess={this.onSignIn}></div>
      </div>
    );
  }
}

export default LoginPage;
