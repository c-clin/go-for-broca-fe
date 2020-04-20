import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getLearnFlashcard,
  updateFlashcard,
} from '../store/actions/flashcardActions';
import { fetchUserDecks } from '../store/actions/decksActions';
import Flashcard from '../components/Flashcard';
import Button, { THEME_BLUE, THEME_WHITE } from '../components/Button';
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

  renderCard = () => {
    const { learnCard, updateFlashcard } = this.props;

    if (learnCard == null) {
      return (
        <p className='text-center'>
          There are no remaining flashcards to learn at the moment.
        </p>
      );
    } else {
      return (
        <>
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
        </>
      );
    }
  };

  render() {
    const { userDecks, loading } = this.props;
    const { steps } = this.state;

    return (
      <div className='Learn'>
        <h1 className='heading-1'>Learn</h1>
        <div className='page-content'>
          {steps == 2 && (
            <Button
              autoWidth
              pill
              theme={THEME_WHITE}
              onClick={() => this.setState({ steps: 1, deck_id: null })}
            >
              Back
            </Button>
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
                <div className='Learn__container'>{this.renderCard()}</div>
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
  updateFlashcard,
  fetchUserDecks,
})(Learn);
