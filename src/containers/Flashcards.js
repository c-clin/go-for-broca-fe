import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { useQuery, useMutation, queryCache } from 'react-query';
import classnames from 'classnames';

import axiosAPI from '../axios-api';
import { fetchUserDecks } from '../store/actions/decksActions';
import { showToaster } from '../store/actions/uiActions';
import {
  TOASTER_TYPE_ERROR,
  TOASTER_TYPE_SUCCESS,
} from '../components/Toaster';

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

  const { status, data, error } = useQuery(deckId, fetchFlashcards);

  if (status == 'loading') {
    content = <Loader />;
  }
  if (status == 'error') {
    content = 'error';
  }

  content = data;

  const callErrorToaster = () => {
    props.showToaster({
      type: TOASTER_TYPE_ERROR,
      content: 'Something went wrong.',
    });
  };

  const handleDeleteFlashcard = ({ id }) => {
    axiosAPI
      .delete(`/flashcards/${id}/`)
      .then((res) => {
        let newContent = content.filter((flashcard) => flashcard.id != id);
        queryCache.setQueryData(deckId, newContent);
        props.showToaster({
          type: TOASTER_TYPE_SUCCESS,
          content: 'The flashcard was successfully deleted!',
        });
      })
      .catch((e) => callErrorToaster());
  };

  const handleAddFlashcard = () => {
    const payload = {
      ...values,
      user_deck_id: deckId,
      language_id: 1,
    };
    axiosAPI
      .post(`/flashcards`, { ...payload })
      .then((res) => {
        console.log(res);
        let newContent = content.unshift(res.data.flashcard);
        queryCache.setQueryData(deckId, newContent);
        props.showToaster({
          type: TOASTER_TYPE_SUCCESS,
          content: 'The flashcard was successfully added!',
        });
      })
      .catch((e) => callErrorToaster());
  };

  const handleUpdateFlashcard = (payload) => {
    axiosAPI
      .put(`/flashcards/${payload.id}/`, {
        front: payload.front,
        back: payload.back,
      })
      .then((res) => {
        let newContent = content.map((flashcard) => {
          if (flashcard.id == payload.id) {
            return res.data.flashcard;
          }
          return flashcard;
        });
        queryCache.setQueryData(deckId, newContent);
        props.showToaster({
          type: TOASTER_TYPE_SUCCESS,
          content: 'The flashcard was successfully added!',
        });
      })
      .catch((e) => callErrorToaster());
  };

  const [mutateDelete] = useMutation(handleDeleteFlashcard);
  const [mutateAdd] = useMutation(handleAddFlashcard);
  const [mudateUpdate] = useMutation(handleUpdateFlashcard);

  const clearInputs = () => {
    frontInputRef.current.value = '';
    backInputRef.current.value = '';
  };

  const onSelectingDeck = (deckId) => {
    setDeckId(deckId);
    clearInputs();
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

        {status === 'success' && (
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
              <button className='Flashcards__new--cta' onClick={mutateAdd}>
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
                updateCard={mudateUpdate}
                deleteCard={mutateDelete}
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
  showToaster,
})(Flashcards);
