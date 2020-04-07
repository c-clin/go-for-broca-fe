import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getLearnFlashcard,
  startFlashcardLoader,
  updateFlashcard,
} from '../store/actions/flashcardActions';
import Flashcard from '../components/Flashcard';
import Button, { THEME_BLUE } from '../components/Button';
import Loader from '../components/Loader';

class Learn extends Component {
  constructor(props) {
    super();

    props.startFlashcardLoader();
    props.getLearnFlashcard();
  }

  onNext = () => {
    this.props.getLearnFlashcard();
  };

  render() {
    const { learnCard, updateFlashcard } = this.props;

    if (this.props.loading || learnCard === null) {
      return <Loader />;
    } else {
      return (
        <div className='Learn'>
          <h1 className='heading-1'>Learn</h1>
          <div className='page-content'>
            <div className='Learn__container'>
              <Flashcard
                className='block-center'
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
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ Flashcards }) => {
  return {
    learnCard: Flashcards.learnCard,
    loading: Flashcards.loading,
  };
};

export default connect(mapStateToProps, {
  getLearnFlashcard,
  startFlashcardLoader,
  updateFlashcard,
})(Learn);
