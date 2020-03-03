import React, { Component } from 'react';

import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axiosAPI from '../axios-api';

class LoginPage extends Component {
  onLoginSuccess = res => {
    localStorage.setItem('token', res.tokenId);
    axiosAPI.defaults.headers.common['Authorization'] = `bearer ${res.tokenId}`;
    console.log('res--- ', res);
    this.props.history.push('/decks');
  };

  onLoginFailure = res => {
    localStorage.removeItem('token');
    console.log(res);
  };

  onLoggingOut = () => {
    localStorage.removeItem('token');
  };

  isSignedIn = val => {
    console.log(val);
  };

  render() {
    return (
      <div className='LoginPage'>
        <GoogleLogin
          clientId='286378358546-r44p77q6cghvaeddv5713srdf539gjaq.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={this.onLoginSuccess}
          onFailure={this.onLoginFailure}
          cookiePolicy={'single_host_origin'}
          isSignedIn={this.isSignedIn}
        />

        <GoogleLogout
          clientId='286378358546-r44p77q6cghvaeddv5713srdf539gjaq.apps.googleusercontent.com'
          buttonText='Logout'
          onLogoutSuccess={this.onLoggingOut}
        ></GoogleLogout>
      </div>
    );
  }
}

export default LoginPage;
