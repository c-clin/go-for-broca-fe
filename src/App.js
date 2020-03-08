import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axiosAPI from './axios-api';
import { setIsSignedIn, startAuthLoading } from './store/actions/authActions';

import LoginPage from './containers/LoginPage';
import Header from './components/Header';
import Landing from './containers/Landing';
import Review from './containers/Review';
import Learn from './containers/Learn';
import Flashcards from './containers/Flashcards';
import Decks from './containers/Decks';
import Loader from './components/Loader';
import Toaster from './components/Toaster';

if (localStorage.token) {
  const token = localStorage.getItem('token');
  axiosAPI.defaults.headers.common['Authorization'] = `bearer ${token}`;
}

class App extends Component {
  constructor() {
    super();
    this.state = {};

    this.googleLoadTimer = 0;
  }

  componentDidMount = () => {
    if (this.props.isSignedIn === null) {
      this.props.startAuthLoading();
      this.googleLoadTimer = setInterval(this.checkGoogleLoader, 90);
    }
  };

  signInChange = val => {
    clearInterval(this.googleLoadTimer);
    this.props.setIsSignedIn(val);
  };

  checkGoogleLoader = () => {
    console.log('check----------');
    if (window.gapi.auth2) {
      setTimeout(() => {
        let isSignedIn = window.gapi.auth2.getAuthInstance().isSignedIn.get();
        this.props.setIsSignedIn(isSignedIn);
        window.gapi.auth2
          .getAuthInstance()
          .isSignedIn.listen(this.signInChange);
      }, 500);

      clearInterval(this.googleLoadTimer);
    }
  };

  authCheck = (Component, props) => {
    return this.props.isSignedIn ? (
      <Component {...props} />
    ) : (
      <Redirect to={'/login'} />
    );
  };

  componentWillUnmount = () => {
    clearInterval(this.googleLoadTimer);
  };

  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          {this.props.isLoading && <Loader />}

          <div style={{ display: this.props.isLoading ? 'none' : 'block' }}>
            <Toaster {...this.props.toaster} />
            <Header isSignedIn={this.props.isSignedIn} />
            {/* [TODO]: move all login logic to App */}
            <div className='app-layout'>
              <Route
                path='/'
                exact
                render={props => this.authCheck(Landing, props)}
              />
              <Route path='/login' exact component={LoginPage} />
              <Route
                path='/review'
                exact
                render={props => this.authCheck(Review, props)}
              />
              <Route
                path='/learn'
                exact
                render={props => this.authCheck(Learn, props)}
              />
              <Route
                path='/decks'
                exact
                render={props => this.authCheck(Decks, props)}
              />
              <Route
                path='/flashcards'
                exact
                render={props => this.authCheck(Flashcards, props)}
              />
            </div>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isSignedIn: state.Auth.isSignedIn,
    isLoading: state.Auth.isLoading,
    toaster: state.UI.toaster
  };
};

export default connect(mapStateToProps, { setIsSignedIn, startAuthLoading })(
  App
);
