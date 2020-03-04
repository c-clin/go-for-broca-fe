import React, { Component } from 'react';
import { connect } from 'react-redux';

import { setIsSignedIn, addUser } from '../store/actions/authActions';
import keys from '../config/keys';
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import axiosAPI from '../axios-api';

class LoginPage extends Component {
  onLoginSuccess = res => {
    localStorage.setItem('token', res.tokenId);
    axiosAPI.defaults.headers.common['Authorization'] = `bearer ${res.tokenId}`;
    console.log('res--- ', res);
    this.props.addUser(res.profileObj.email);
    this.props.history.push('/decks');
  };

  onLoginFailure = res => {
    localStorage.removeItem('token');
  };

  onLoggingOut = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  };

  render() {
    const { isSignedIn } = this.props;
    return (
      <div className='LoginPage'>
        {isSignedIn ? (
          <GoogleLogout
            clientId={`${keys.GOOGLE_CLIENT_ID}`}
            buttonText='Logout'
            onLogoutSuccess={this.onLoggingOut}
          />
        ) : (
          <GoogleLogin
            clientId={`${keys.GOOGLE_CLIENT_ID}`}
            buttonText='Login'
            onSuccess={this.onLoginSuccess}
            onFailure={this.onLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.Auth.isSignedIn
  };
};

export default connect(mapStateToProps, { setIsSignedIn, addUser })(LoginPage);
