import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-query';
import classnames from 'classnames';

import axiosAPI from '../axios-api';
import { fetchUserDecks } from '../store/actions/decksActions';
import {
  updateFlashcard,
  addFlashcard,
} from '../store/actions/flashcardActions';

import Flashcard from '../components/Flashcard';
import Loader from '../components/Loader';
import { useForm } from '../utils/useForm';

function Flashcards(props) {
  const [deckId, setDeckId] = useState(1);
  const [values, onInputChange] = useForm({ front: '', back: '' });

  const frontInputRef = useRef();
  const backInputRef = useRef();

  useEffect(() => {
    props.fetchUserDecks();
  }, []);

  const fetchFlashcards = async (deck) => {
    const res = await axiosAPI.get(`/flashcards`, {
      params: { user_deck_id: deckId },
    });
    const data = await res.data.flashcards;
    return data;
  };

  let content = null;

  const { status, data, error, refetch } = useQuery(deckId, fetchFlashcards);

  if (status == 'loading') {
    content = <Loader />;
  }
  if (status == 'error') {
    content = 'error';
  }

  content = data;

  const clearInputs = () => {
    frontInputRef.current.value = '';
    backInputRef.current.value = '';
  };

  const onSelectingDeck = (deckId) => {
    setDeckId(deckId);
    clearInputs();
  };

  const onAddingFlashcard = () => {
    clearInputs();
    props.addFlashcard({ ...values, user_deck_id: deckId }, refetch);
  };

  return (
    <div className='Flashcards'>
      <h1 className='heading-1'>Flashcards</h1>
      <div className='Flashcards__buttons'>
        {props.userDecks.map((deck) => {
          return (
            <button
              className={classnames(
                'Flashcards__buttons--cta',
                'button-animation',
                {
                  active: deckId == deck.id,
                }
              )}
              key={deck.id}
              onClick={() => onSelectingDeck(deck.id)}
            >
              {deck.name}
            </button>
          );
        })}
      </div>

      <div className='Flashcards__content'>
        {status === 'loading' && <Loader />}

        {status == 'success' && (
          <div className='Flashcards__new'>
            <div className='Flashcards__new--container'>
              <h3>New Flashcard:</h3>
              <div>
                <input
                  ref={frontInputRef}
                  placeholder='Front'
                  name='front'
                  value={values.frontInput}
                  onChange={onInputChange}
                />
              </div>
              <div>
                <input
                  ref={backInputRef}
                  placeholder='Back'
                  name='back'
                  value={values.backInput}
                  onChange={onInputChange}
                />
              </div>
              <button
                className='Flashcards__new--cta'
                onClick={onAddingFlashcard}
              >
                <i className='fas fa-plus' />
              </button>
            </div>
          </div>
        )}

        {status === 'success' &&
          content &&
          content.map((flashcard) => {
            return (
              <Flashcard
                key={flashcard.id}
                front={flashcard.front}
                back={flashcard.back}
                flashcard={flashcard}
                updateCard={updateFlashcard}
              />
            );
          })}
      </div>
    </div>
  );
}

const mapStateToProps = ({ Decks }) => ({
  userDecks: Decks.userDecks,
});

export default connect(mapStateToProps, {
  fetchUserDecks,
  updateFlashcard,
  addFlashcard,
})(Flashcards);
