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

  onLoginFailure = res => console.log(res);

  onLoggingOut = () => {
    localStorage.removeItem('token');
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
