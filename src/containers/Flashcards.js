import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useQuery } from 'react-query';
import classnames from 'classnames';

import axiosAPI from '../axios-api';
import { fetchUserDecks } from '../store/actions/decksActions';
import { updateFlashcard } from '../store/actions/flashcardActions';

import Flashcard from '../components/Flashcard';
import Loader from '../components/Loader';

function Flashcards(props) {
  const [step, setStep] = useState(1);
  const [deckId, setDeckId] = useState(1);

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

  const onSelectingDeck = (deckId) => {
    setDeckId(deckId);
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
        {status === 'success' &&
          content &&
          content.map((flashcard) => {
            return (
              <Flashcard
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

export default connect(mapStateToProps, { fetchUserDecks, updateFlashcard })(
  Flashcards
);
