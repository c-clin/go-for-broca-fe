import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

class Header extends Component {
  render() {
    const authLinks = [
      { url: '/', title: 'GoForBroca', logo: true },
      {
        url: '/decks',
        title: 'Decks'
      },
      {
        url: '/review',
        title: 'Review'
      },
      {
        url: '/learn',
        title: 'Learn'
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
        title: 'Go For Broca',
        logo: true
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
            {headerLinks.map((link, i) => {
              return (
                <li
                  key={i}
                  className={classnames('Header__nav--list-item', {
                    logo: link.logo
                  })}
                >
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
