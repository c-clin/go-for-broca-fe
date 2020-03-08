import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import {
  fetchAllDecks,
  fetchUserDecks,
  forkStandardDeck
} from '../store/actions/decksActions';

class Decks extends Component {
  state = {
    deck: 'standard'
  };
  componentDidMount = () => {
    this.props.fetchAllDecks();
    this.props.fetchUserDecks();
  };

  onSelectDeck = deck => {
    this.setState({
      deck
    });
  };

  render() {
    const { decks, userDecks, forkStandardDeck } = this.props;
    let userDecksIds = userDecks.map(deck => deck.standard_deck_id);

    return (
      <div className='Decks'>
        <div className='Decks__cta-container'>
          <button
            className={classnames('Decks__cta-container--standard', {
              selected: this.state.deck === 'standard'
            })}
            onClick={() => this.onSelectDeck('standard')}
            disabled={this.state.deck === 'standard'}
          >
            Standard
          </button>
          <button
            className={classnames('Decks__cta-container--user', {
              selected: this.state.deck === 'user'
            })}
            onClick={() => this.onSelectDeck('user')}
            disabled={this.state.deck === 'user'}
          >
            User
          </button>
        </div>

        {this.state.deck === 'standard' && (
          <React.Fragment>
            <h1 className='heading-1'>Standard Decks</h1>
            <div className='page-content'>
              <div className='Decks__container'>
                {decks.map(deck => {
                  let added = userDecksIds.indexOf(deck.id) !== -1;
                  return (
                    <div
                      key={deck.id}
                      onClick={added ? null : () => forkStandardDeck(deck.id)}
                      className={classnames('Decks__item', {
                        added
                      })}
                    >
                      {deck.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        )}

        {this.state.deck === 'user' && (
          <React.Fragment>
            <h1 className='heading-1'>User Decks</h1>
            <div className='page-content'>
              <div className='Decks__container'>
                {userDecks.length === 0 && (
                  <p className='text-center'>Your user deck is empty!</p>
                )}
                {userDecks.map(deck => {
                  return (
                    <div key={deck.id} className='Decks__item'>
                      {deck.name}
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ Decks }) => {
  return {
    decks: Decks.decks,
    userDecks: Decks.userDecks
  };
};

export default connect(mapStateToProps, {
  fetchAllDecks,
  fetchUserDecks,
  forkStandardDeck
})(Decks);
