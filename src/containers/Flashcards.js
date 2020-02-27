import React, { Component } from 'react';

class Flashcards extends Component {
  render() {
    return (
      <div className="Flashcards">
        <h1>Flashcards</h1>

        <input placeholder="Front" />
        <input placeholder="Back" />
        <button>Add Flashcard</button>
      </div>
    );
  }
}

export default Flashcards;
