import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import axiosAPI from './axios-api';
import {
  setIsSignedIn,
  startAuthLoading,
  fetchUser,
} from './store/actions/authActions';

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
  constructor(props) {
    super();
    this.state = {};

    props.fetchUser();
  }

  // authCheck = (Component, props) => {
  //   console.log('auth check');
  //   return this.props.isSignedIn ? (
  //     <Component {...props} />
  //   ) : (
  //     <Redirect to={'/login'} />
  //   );
  // };

  componentWillUnmount = () => {
    clearInterval(this.googleLoadTimer);
  };

  renderApp = () => {
    if (this.props.isLoading) {
      return <Loader />;
    } else {
      return (
        <div style={{ display: this.props.isLoading ? 'none' : 'block' }}>
          <Toaster toaster={this.props.toaster} />
          <Header isSignedIn={this.props.isSignedIn} />
          {/* [TODO]: move all login logic to App */}
          <div className='app-layout'>
            <Route path='/' exact component={Landing} />
            <Route path='/login' exact component={LoginPage} />
            <Route path='/review' exact component={Review} />
            <Route path='/learn' exact component={Learn} />
            <Route path='/decks' exact component={Decks} />
            <Route path='/flashcards' exact component={Flashcards} />
            <Route render={() => <Redirect to='/' />} />
          </div>
        </div>
      );
    }
  };

  render() {
    return (
      <div className='App'>
        <BrowserRouter>{this.renderApp()}</BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.Auth.isSignedIn,
    isLoading: state.Auth.isLoading,
    toaster: state.UI.toaster,
  };
};

export default connect(mapStateToProps, {
  fetchUser,
  setIsSignedIn,
  startAuthLoading,
})(App);
