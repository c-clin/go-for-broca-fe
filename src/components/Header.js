import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <Link to="/">Home</Link>
        <Link to="/review">Review</Link>
        <Link to="/flashcards">Flashcards</Link>
        <a href="#">Logout</a>
      </div>
    );
  }
}

export default Header;
