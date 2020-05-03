import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { GoogleLogin, GoogleLogout } from 'react-google-login';

import { fetchUser, addUser, onLogout } from '../store/actions/authActions';

import keys from '../config/keys';
import axiosAPI from '../axios-api';

import classnames from 'classnames';

class Header extends Component {
  onLoginSuccess = (res) => {
    localStorage.setItem('token', res.tokenId);
    axiosAPI.defaults.headers.common['Authorization'] = `bearer ${res.tokenId}`;
    this.props.fetchUser();
    this.props.addUser(res.profileObj.email);
    this.props.history.push('/decks');
  };

  onLoginFailure = (res) => {
    console.log('LOGOUT FAIL');
    localStorage.removeItem('token');
  };

  onLoggingOut = () => {
    console.log('LOGOUT ');
    this.props.onLogout();
    this.props.history.push('/');
  };

  render() {
    const authLinks = [
      { url: '/', title: 'GoForBroca', logo: true },
      {
        url: '/decks',
        title: 'Decks',
      },
      {
        url: '/review',
        title: 'Review',
      },
      {
        url: '/learn',
        title: 'Learn',
      },
      {
        url: '/flashcards',
        title: 'Flashcards',
      },
      {
        component: (
          <GoogleLogout
            clientId={`${keys.GOOGLE_CLIENT_ID}`}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Logout
              </button>
            )}
            buttonText='Logout'
            onLogoutSuccess={this.onLoggingOut}
          />
        ),
      },
    ];

    const publicLinks = [
      {
        url: '/',
        title: 'Go For Broca',
        logo: true,
      },
      {
        component: (
          <GoogleLogin
            clientId={`${keys.GOOGLE_CLIENT_ID}`}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                Login
              </button>
            )}
            buttonText='Login'
            onSuccess={this.onLoginSuccess}
            onFailure={this.onLoginFailure}
            cookiePolicy={'single_host_origin'}
          />
        ),
      },
    ];

    let headerLinks = this.props.isSignedIn ? authLinks : publicLinks;
    return (
      <div className='Header'>
        <nav className='Header__nav'>
          <ul>
            {headerLinks.map((link, i) => {
              if (link.component) {
                return (
                  <li key={i} className='Header__nav--list-item'>
                    {link.component}
                  </li>
                );
              } else {
                return (
                  <li
                    key={i}
                    className={classnames('Header__nav--list-item', {
                      logo: link.logo,
                    })}
                  >
                    <Link to={link.url}>{link.title}</Link>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

export default connect(null, { fetchUser, addUser, onLogout })(
  withRouter(Header)
);
