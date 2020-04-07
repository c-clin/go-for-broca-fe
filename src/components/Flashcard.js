import React, { Component } from 'react';
import classnames from 'classnames';

class Flashcard extends Component {
  state = {
    front: true,
    editing: false,
    frontInput: this.props.front,
    backInput: this.props.back,
  };

  onFlipCard = (e) => {
    if (e.target.id !== 'edit') {
      this.setState({
        front: !this.state.front,
      });
    }
  };

  onEdit = () => {
    this.setState({
      editing: true,
    });
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
    const { front, back, className } = this.props;

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

              <div className='Flashcard__cta'>
                <button id='edit' onClick={this.onEdit}>
                  <i className='far fa-edit' />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Flashcard;
