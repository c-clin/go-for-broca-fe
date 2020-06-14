import axiosAPI from '../../axios-api';
import { showToaster } from './uiActions';

import {
  TOASTER_TYPE_SUCCESS,
  TOASTER_TYPE_ERROR,
} from '../../components/Toaster';

export const FETCH_FLASHCARDS = 'FETCH_FLASHCARDS';

export const fetchFlashcards = (payload) => (dispatch) => {
  let body = {
    page_number: 1,
    page_size: 20,
    standard_deck_id: '',
    user_deck_id: '',
    ...payload,
  };

  axiosAPI
    .get(
      `/flashcards/?page_number=${body.page_number}&page_size=${body.page_size}&standard_deck_id=${body.standard_deck_id}&user_deck_id=${body.user_deck_id}`
    )
    .then((res) => {
      console.log(res);
    })
    .catch((e) => {});
};

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

      if (type === 'learn') {
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

export const GET_LEARN_FLASHCARD_SUCCESS = 'GET_LEARN_FLASHCARD_SUCCESS';
export const GET_LEARN_FLASHCARD_ERROR = 'GET_LEARN_FLASHCARD_ERROR';
export const CLEAR_LEARN_FLASHCARD = 'CLEAR_LEARN_FLASHCARD';

export const getLearnFlashcard = (user_deck_id) => (dispatch) => {
  dispatch(startFlashcardLoader());
  let id = null;
  if (user_deck_id) id = user_deck_id;
  axiosAPI
    .post('/flashcards/view', { user_deck_id: id })
    .then((res) => {
      if (res.data.flashcard) {
        dispatch({
          type: GET_LEARN_FLASHCARD_SUCCESS,
          payload: res.data.flashcard,
        });
      } else {
        dispatch({
          type: GET_LEARN_FLASHCARD_SUCCESS,
          payload: null,
        });
      }
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
export const clearLearnFlashcard = () => {
  return {
    type: CLEAR_LEARN_FLASHCARD,
  };
};

export const GET_REVIEW_FLASHCARD_SUCCESS = 'GET_REVIEW_FLASHCARD_SUCCESS';
export const GET_REVIEW_FLASHCARD_ERROR = 'GET_REVIEW_FLASHCARD_ERROR';
export const CLEAR_REVIEW_FLASHCARD = 'CLEAR_REVIEW_FLASHCARD';

export const getReviewFlashcard = (user_deck_id) => (dispatch) => {
  dispatch(startFlashcardLoader());
  let id = null;
  if (user_deck_id) id = user_deck_id;
  axiosAPI
    .post('/repetitions', { user_deck_id: id })
    .then((res) => {
      if (res.data.flashcard) {
        res.data.flashcard.repetition = res.data.repetition;
        dispatch({
          type: GET_REVIEW_FLASHCARD_SUCCESS,
          payload: res.data.flashcard,
        });
      } else {
        dispatch({
          type: GET_REVIEW_FLASHCARD_SUCCESS,
          payload: null,
        });
      }
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

export const clearReviewFlashcard = () => {
  return {
    type: CLEAR_REVIEW_FLASHCARD,
  };
};

export const SUBMIT_REPETITION = 'SUBMIT_REPETITION';
export const SUBMIT_REPETITION_SUCCESS = 'SUBMIT_REPETITION_SUCCESS';
export const SUBMIT_REPETITION_ERROR = 'SUBMIT_REPETITION_ERROR';

export const submitRepetition = (repetition_id, score, callback) => (
  dispatch
) => {
  axiosAPI
    .post(`/repetitions/${repetition_id}`, { score })
    .then((res) => {
      if (callback) {
        callback();
      }
    })
    .catch((e) => {});
};

export const START_FLASHCARD_LOADER = 'START_FLASHCARD_LOADER';

export const startFlashcardLoader = () => {
  return {
    type: START_FLASHCARD_LOADER,
  };
};
