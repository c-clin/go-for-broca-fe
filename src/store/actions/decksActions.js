import axiosAPI from '../../axios-api';

export const FETCH_ALL_DECKS_SUCCESS = 'FETCH_ALL_DECKS_SUCCESS';
export const FETCH_USER_DECKS_SUCCESS = 'FETCH_USER_DECKS_SUCCESS';

export const fetchAllDecks = () => dispatch => {
  axiosAPI
    .get('/decks/standard/')
    .then(res => {
      dispatch({
        type: FETCH_ALL_DECKS_SUCCESS,
        payload: res.data.decks
      });
    })
    .catch(e => console.log(e));
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
    .catch(e => console.log(e));
};

export const forkStandardDeck = id => dispatch => {
  axiosAPI.post(`/decks/standard/${id}/fork/`).then(res => {
    console.log(res);
  });
};
