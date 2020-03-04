import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Header extends Component {
  render() {
    const authLinks = [
      { url: '/', title: 'Go For Broca' },
      {
        url: '/decks',
        title: 'Decks'
      },
      {
        url: '/review',
        title: 'Review'
      },
      {
        url: '/flashcards',
        title: 'Flashcards'
      },
      {
        url: '/login',
        title: 'Logout'
      }
    ];

    const publicLinks = [
      {
        url: '/',
        title: 'Go For Broca'
      },
      {
        url: '/login',
        title: 'Login'
      }
    ];

    let headerLinks = this.props.isSignedIn ? authLinks : publicLinks;
    return (
      <div className='Header'>
        <nav className='Header__nav'>
          <ul>
            {headerLinks.map(link => {
              return (
                <li className='Header__nav--list-item'>
                  <Link to={link.url}>{link.title}</Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;
