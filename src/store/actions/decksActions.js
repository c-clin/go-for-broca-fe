import axiosAPI from '../../axios-api';
import { showToaster } from './uiActions';

import {
  TOASTER_TYPE_SUCCESS,
  TOASTER_TYPE_ERROR
} from '../../components/Toaster';

export const FETCH_ALL_DECKS_SUCCESS = 'FETCH_ALL_DECKS_SUCCESS';
export const FETCH_USER_DECKS_SUCCESS = 'FETCH_USER_DECKS_SUCCESS';
export const DELETE_USER_DECK_SUCCESS = 'DELETE_USER_DECK_SUCCESS';

export const fetchAllDecks = () => dispatch => {
  axiosAPI
    .get('/decks/standard/')
    .then(res => {
      dispatch({
        type: FETCH_ALL_DECKS_SUCCESS,
        payload: res.data.decks
      });
    })
    .catch(e => {
      if (e.response) {
        dispatch(
          showToaster({
            type: TOASTER_TYPE_ERROR,
            content: e.response.data.msg
          })
        );
      }
    });
};

export const fetchUserDecks = () => dispatch => {
  axiosAPI
    .get('/decks/user/')
    .then(res => {
      dispatch({
        type: FETCH_USER_DECKS_SUCCESS,
        payload: res.data.decks
      });
    })
    .catch(e => {
      if (e.response) {
        dispatch(
          showToaster({
            type: TOASTER_TYPE_ERROR,
            content: e.response.data.msg
          })
        );
      }
    });
};

export const deleteUserDeck = id => dispatch => {
  axiosAPI.delete(`/decks/user/${id}`).then(res => {
    dispatch({
      type: DELETE_USER_DECK_SUCCESS,
      payload: id
    });

    dispatch(
      showToaster({
        type: TOASTER_TYPE_SUCCESS,
        content: 'Successfully removed deck'
      })
    );
  });
};

export const updateUserDesk = payload => dispatch => {
  axiosAPI.put(`/decks/user/${payload.id}`, {
    name: payload.name,
    active: payload.active
  });
};

export const forkStandardDeck = id => dispatch => {
  axiosAPI.post(`/decks/standard/${id}/fork/`).then(res => {
    dispatch(
      showToaster({
        type: TOASTER_TYPE_SUCCESS,
        content: 'Successfully forked deck'
      })
    );

    dispatch(fetchUserDecks());
  });
};
