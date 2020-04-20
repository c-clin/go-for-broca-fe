import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUserDecks } from '../store/actions/decksActions';
import {
  getReviewFlashcard,
  updateFlashcard,
  submitRepetition,
  clearReviewFlashcard,
} from '../store/actions/flashcardActions';

import Flashcard from '../components/Flashcard';
import Button, { THEME_WHITE, THEME_BLUE } from '../components/Button';
import Loader from '../components/Loader';

class Review extends Component {
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
      deck_id: id,
      steps: 2,
    });

    this.props.getReviewFlashcard(id);
  };

  submitRepetition = (score) => {
    this.props.submitRepetition(
      this.props.reviewCard.repetition.id,
      score,
      () => this.props.getReviewFlashcard(this.state.deck_id)
    );
  };

  onGoBack = () => {
    this.setState({ steps: 1, deck_id: null });
    this.props.clearReviewFlashcard();
  };

  renderCard = () => {
    const { reviewCard, updateFlashcard } = this.props;
    const scores = [0, 1, 2];

    if (reviewCard == null) {
      return (
        <p className='text-center'>
          There are no remaining flashcards to learn at the moment.
        </p>
      );
    } else {
      return (
        <>
          <Flashcard
            front={reviewCard.front}
            back={reviewCard.back}
            flashcard={reviewCard}
            updateCard={updateFlashcard}
            type={'review'}
          />

          <div className='Review__score-container'>
            {scores.map((score) => {
              return (
                <Button
                  onClick={() => this.submitRepetition(score)}
                  autoWidth
                  pill
                  theme={THEME_BLUE}
                >
                  {score}
                </Button>
              );
            })}
          </div>
        </>
      );
    }
  };

  render() {
    const { steps } = this.state;
    const { userDecks, loading } = this.props;
    return (
      <div className='Review'>
        <h1 className='heading-1'>Review</h1>
        <div className='page-content'>
          {steps == 2 && (
            <Button autoWidth pill theme={THEME_WHITE} onClick={this.onGoBack}>
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

          {steps == 2 && (
            <>
              {loading ? (
                <Loader />
              ) : (
                <div className='Learn__container'>{this.renderCard()}</div>
              )}
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ Decks, Flashcards }) => {
  return {
    userDecks: Decks.userDecks,
    reviewCard: Flashcards.reviewCard,
    loading: Flashcards.loading,
  };
};

export default connect(mapStateToProps, {
  getReviewFlashcard,
  fetchUserDecks,
  updateFlashcard,
  submitRepetition,
  clearReviewFlashcard,
})(Review);
