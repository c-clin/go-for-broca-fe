import axiosAPI from '../../axios-api';
import { showToaster } from './uiActions';

import {
  TOASTER_TYPE_SUCCESS,
  TOASTER_TYPE_ERROR,
} from '../../components/Toaster';

export const ADD_FLASHCARD = 'ADD_FLASHCARD';
export const UPDATE_LEARN_FLASHCARD_SUCCESS = 'UPDATE_LEARN_FLASHCARD_SUCCESS';
export const UPDATE_REVIEW_FLASHCARD_SUCCESS =
  'UPDATE_REVIEW_FLASHCARD_SUCCESS';

export const addFlashcard = (payload) => (dispatch) => {
  dispatch({
    type: ADD_FLASHCARD,
    payload,
  });
};

export const updateFlashcard = (payload, type) => (dispatch) => {
  axiosAPI
    .put(`/flashcards/${payload.id}/`, {
      front: payload.front,
      back: payload.back,
    })
    .then((res) => {
      dispatch(
        showToaster({
          type: TOASTER_TYPE_SUCCESS,
          content: 'Card successfully updated',
        })
      );

      if (type == 'learn') {
        dispatch({
          type: UPDATE_LEARN_FLASHCARD_SUCCESS,
          payload: res.data.flashcard,
        });
      } else {
        dispatch({
          type: UPDATE_REVIEW_FLASHCARD_SUCCESS,
          payload: res.data.flashcard,
        });
      }
    })
    .catch((e) => {
      console.log(e);
    });
};

export const GET_LEARN_FLASHCARD_SUCCESS = 'GET_LEARN_FLASHCARD_SUCCESS';
export const GET_LEARN_FLASHCARD_ERROR = 'GET_LEARN_FLASHCARD_ERROR';

export const getLearnFlashcard = (user_deck_id) => (dispatch) => {
  let id = null;
  if (user_deck_id) id = user_deck_id;
  axiosAPI
    .post('/flashcards/view', { user_deck_id: id })
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_LEARN_FLASHCARD_SUCCESS,
        payload: res.data.flashcard,
      });
    })
    .catch((e) => {
      if (e.response) {
        dispatch(
          showToaster({
            type: TOASTER_TYPE_ERROR,
            content: e.response.data.msg,
          })
        );
      }
    });
};

export const GET_REVIEW_FLASHCARD_SUCCESS = 'GET_REVIEW_FLASHCARD_SUCCESS';
export const GET_REVIEW_FLASHCARD_ERROR = 'GET_REVIEW_FLASHCARD_ERROR';

export const getReviewFlashcard = () => (dispatch) => {
  axiosAPI.post('/repetitions').then((res) => {
    console.log(res);
  });
};

export const START_FLASHCARD_LOADER = 'START_FLASHCARD_LOADER';

export const startFlashcardLoader = () => {
  return {
    type: START_FLASHCARD_LOADER,
  };
};
