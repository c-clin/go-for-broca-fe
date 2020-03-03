import React, { Component } from 'react';

import { GoogleLogin } from 'react-google-login';

class LoginPage extends Component {
  responseGoogle = res => {
    console.log('res--- ', res);
    localStorage.setItem('token', res.tokenId);
    this.props.history.push('/decks');
  };

  render() {
    return (
      <div className='LoginPage'>
        <GoogleLogin
          clientId='286378358546-r44p77q6cghvaeddv5713srdf539gjaq.apps.googleusercontent.com'
          buttonText='Login'
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default LoginPage;
