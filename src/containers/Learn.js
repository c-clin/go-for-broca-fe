import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  getLearnFlashcard,
  startFlashcardLoader
} from '../store/actions/flashcardActions';
import Flashcard from '../components/Flashcard';
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
    const { learnCard } = this.props;

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
              />
              <button onClick={this.onNext}>Next</button>
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
    loading: Flashcards.loading
  };
};

export default connect(mapStateToProps, {
  getLearnFlashcard,
  startFlashcardLoader
})(Learn);
