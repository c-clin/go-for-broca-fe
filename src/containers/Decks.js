import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  fetchAllDecks,
  fetchUserDecks,
  forkStandardDeck
} from '../store/actions/decksActions';

class Decks extends Component {
  componentDidMount = () => {
    this.props.fetchAllDecks();
    this.props.fetchUserDecks();
  };

  render() {
    const { decks, forkStandardDeck } = this.props;
    return (
      <div className='Decks'>
        <h1 className='heading-1'>Standard Decks</h1>
        {decks.map(deck => {
          return (
            <div
              key={deck.id}
              onClick={() => forkStandardDeck(deck.id)}
              className='Decks__item'
            >
              {deck.name}
            </div>
          );
        })}

        <h1 className='heading-1'>User Decks</h1>
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
