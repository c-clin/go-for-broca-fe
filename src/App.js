import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import LoginPage from './containers/LoginPage';
import Header from './components/Header';
import Landing from './containers/Landing';
import Review from './containers/Review';
import Flashcards from './containers/Flashcards';
import Decks from './containers/Decks';

class App extends Component {
  render() {
    return (
      <div className='App'>
        <BrowserRouter>
          <Header />
          <Route path='/login' exact component={LoginPage} />
          <Route path='/' exact component={Landing} />
          <Route path='/review' exact component={Review} />
          <Route path='/flashcards' exact component={Flashcards} />
          <Route path='/decks' exact component={Decks} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
