import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addFlashcard } from '../store/actions/flashcardActions';

import Flashcard from '../components/Flashcard';

class Flashcards extends Component {
  state = {
    front: '',
    back: ''
  };

  onInputChange = e => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  addNewFlashcard = () => {
    this.props.addFlashcard({
      front: this.state.front,
      back: this.state.back
    });

    this.setState({
      front: '',
      back: ''
    });
  };

  render() {
    const { flashcards } = this.props;
    return (
      <div className='Flashcards'>
        <h1 className='heading-1'>Flashcards</h1>

        <div className='Flashcards__container'>
          <div className='Flashcards__new'>
            <div className='Flashcards__new--container'>
              New Card:
              <div>
                <input
                  placeholder='Front'
                  name='front'
                  value={this.state.front}
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <input
                  placeholder='Back'
                  name='back'
                  value={this.state.back}
                  onChange={this.onInputChange}
                />
              </div>
              <button
                disabled={!this.state.front || !this.state.back}
                onClick={this.addNewFlashcard}
              >
                Add
              </button>
            </div>
          </div>
          {flashcards.map(flashcard => (
            <Flashcard front={flashcard.front} back={flashcard.back} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    flashcards: state.Flashcards.flashcards
  };
};

export default connect(mapStateToProps, { addFlashcard })(Flashcards);
