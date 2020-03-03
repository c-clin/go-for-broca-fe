import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    return (
      <div className='Header'>
        <nav className='Header__nav'>
          <ul>
            <li className='Header__nav--list-item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='Header__nav--list-item'>
              <Link to='/flashcards'>Flashcards</Link>
            </li>
            <li className='Header__nav--list-item'>
              <Link to='/review'>Review</Link>
            </li>
            <li className='Header__nav--list-item'>
              <Link to='/decks'>Decks</Link>
            </li>
            <li className='Header__nav--list-item'>
              <Link to='/login'>Log In</Link>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
