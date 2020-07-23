import React, { Component } from 'react';
import classnames from 'classnames';

class Flashcard extends Component {
  state = {
    front: true,
    editing: false,
    frontInput: this.props.front,
    backInput: this.props.back,
  };

  componentDidMount = () => {
    if (window.location.pathname !== '/flashcards') {
      document.addEventListener('keydown', this.handleKey);
    }
  };

  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKey);
  };

  handleKey = (e) => {
    switch (e.keyCode) {
      case 32:
        this.onFlipCard();
        return;
      case 83:
        this.playSound();
        return;
      default:
        return;
    }
  };

  onFlipCard = () => {
    this.setState({
      front: !this.state.front,
    });
  };

  onEdit = (e) => {
    e.stopPropagation();
    this.setState({
      editing: true,
    });
  };

  onDelete = (e) => {
    e.stopPropagation();
    this.props.deleteCard({ id: this.props.flashcard.id });
  };

  finishEditing = () => {
    this.setState({
      editing: false,
    });
  };

  onInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  playSound = (e) => {
    if (e) e.stopPropagation();
    const audio = new Audio(this.props.flashcard.audio_url);
    audio.play();
  };

  componentDidUpdate = (prevProps) => {
    if (
      this.props.front !== prevProps.front ||
      this.props.back !== prevProps.back
    ) {
      this.setState({
        frontInput: this.props.front,
        backInput: this.props.back,
        front: true,
        editing: false,
      });
    }
  };

  updateCard = () => {
    const payload = {
      id: this.props.flashcard.id,
      front: this.state.frontInput,
      back: this.state.backInput,
    };

    this.props.updateCard(payload, this.props.type);
    this.setState({
      front: true,
      editing: false,
    });
  };

  render() {
    const { front, back, className, flashcard } = this.props;

    return (
      <div
        className={classnames('Flashcard', className, {
          Flashcard__front: this.state.front,
        })}
        onClick={this.state.editing ? null : this.onFlipCard}
      >
        <div className='Flashcard__content'>
          {this.state.editing && (
            <div>
              <div>
                <input
                  name='frontInput'
                  value={this.state.frontInput}
                  onChange={this.onInputChange}
                />
              </div>
              <div>
                <input
                  name='backInput'
                  value={this.state.backInput}
                  onChange={this.onInputChange}
                />
              </div>

              <div className='Flashcard__cta'>
                <button onClick={this.updateCard}>
                  <i className='fas fa-check'></i>
                </button>

                <button onClick={this.finishEditing}>
                  <i className='fas fa-times'></i>
                </button>
              </div>
            </div>
          )}

          {!this.state.editing && (
            <div>
              <h3>{this.state.front ? front : back}</h3>

              <audio className='audio-element'>
                <source src={flashcard.audio_url} />
              </audio>

              <div className='Flashcard__cta'>
                {this.state.front && flashcard.audio_url && (
                  <button id='sound' onClick={this.playSound}>
                    <i className='fas fa-volume-up' />
                  </button>
                )}
                <button onClick={this.onEdit}>
                  <i id='edit' className='far fa-edit' />
                </button>

                {this.props.deleteCard && (
                  <button onClick={this.onDelete}>
                    <i id='delete' className='far fa-trash-alt' />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Flashcard;
