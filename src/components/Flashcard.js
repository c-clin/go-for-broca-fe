import React, { Component } from 'react';
import classnames from 'classnames';

class Flashcard extends Component {
  state = {
    front: true,
    editing: false,
    frontInput: this.props.front,
    backInput: this.props.back
  };

  onFlipCard = e => {
    if (e.target.id !== 'edit') {
      this.setState({
        front: !this.state.front
      });
    }
  };

  onEdit = () => {
    this.setState({
      editing: true
    });
  };

  finishEditing = () => {
    this.setState({
      editing: false
    });
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { front, back, className } = this.props;

    if (this.state.editing) {
      return (
        <div className={classnames('Flashcard', className)}>
          <div className='Flashcard__content'>
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
          </div>

          <button className='Flashcard__cta' onClick={this.finishEditing}>
            Done
          </button>
        </div>
      );
    } else {
      return (
        <div
          className={classnames('Flashcard', className, {
            Flashcard__front: this.state.front
          })}
          onClick={this.onFlipCard}
        >
          <div className='Flashcard__content'>
            <h3>{this.state.front ? front : back}</h3>
          </div>
          <button id='edit' className='Flashcard__cta' onClick={this.onEdit}>
            ~~edit~~
          </button>
        </div>
      );
    }
  }
}

export default Flashcard;
