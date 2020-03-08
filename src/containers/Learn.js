import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getLearnFlashcard } from '../store/actions/flashcardActions';

class Learn extends Component {
  componentDidMount = () => {
    this.onNext();
  };

  onNext = () => {
    this.props.getLearnFlashcard();
  };

  render() {
    return (
      <div className='Learn'>
        <h1 className='heading-1'>Learn</h1>
      </div>
    );
  }
}

const mapStateToProps = state => {};

export default connect(null, { getLearnFlashcard })(Learn);
