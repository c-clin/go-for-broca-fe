import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getLearnFlashcard,
  startFlashcardLoader,
  updateFlashcard,
} from '../store/actions/flashcardActions';
import { fetchUserDecks } from '../store/actions/decksActions';
import Flashcard from '../components/Flashcard';
import Button, { THEME_BLUE } from '../components/Button';
import Loader from '../components/Loader';

class Learn extends Component {
  constructor(props) {
    super();

    props.fetchUserDecks();

    this.state = {
      steps: 1,
      deck_id: null,
    };
  }

  onSelectDeck = (id) => {
    this.setState({
      steps: 2,
      deck_id: id,
    });

    this.props.getLearnFlashcard(id);
  };

  onNext = () => {
    this.props.getLearnFlashcard(this.state.deck_id);
  };

  render() {
    const { learnCard, updateFlashcard, userDecks, loading } = this.props;
    const { steps } = this.state;

    return (
      <div className='Learn'>
        <h1 className='heading-1'>Learn</h1>
        <div className='page-content'>
          {steps == 2 && (
            <button onClick={() => this.setState({ steps: 1 })}>Back</button>
          )}

          {steps === 1 && (
            <div className='Decks__container'>
              {userDecks.map((deck) => {
                return (
                  <div
                    key={deck.id}
                    onClick={() => this.onSelectDeck(deck.id)}
                    className='Decks__item'
                  >
                    {deck.name}
                  </div>
                );
              })}
            </div>
          )}

          {steps === 2 && (
            <div>
              {loading ? (
                <Loader />
              ) : (
                <div className='Learn__container'>
                  <Flashcard
                    front={learnCard.front}
                    back={learnCard.back}
                    flashcard={learnCard}
                    updateCard={updateFlashcard}
                    type={'learn'}
                  />
                  <Button
                    className='block-center'
                    autoWidth
                    theme={THEME_BLUE}
                    onClick={this.onNext}
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Flashcards, Decks }) => {
  return {
    learnCard: Flashcards.learnCard,
    loading: Flashcards.loading,
    userDecks: Decks.userDecks,
  };
};

export default connect(mapStateToProps, {
  getLearnFlashcard,
  startFlashcardLoader,
  updateFlashcard,
  fetchUserDecks,
})(Learn);
