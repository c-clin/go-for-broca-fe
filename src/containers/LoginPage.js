import React, { Component } from 'react';

class LoginPage extends Component {
  render() {
    return (
      <div className="LoginPage">
        <input type="email" placeholder="E-mail" />
        <input type="password" placeholder="Password" />
      </div>
    );
  }
}

export default LoginPage;
