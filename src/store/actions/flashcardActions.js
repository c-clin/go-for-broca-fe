import axiosAPI from '../../axios-api';

export const ADD_FLASHCARD = 'ADD_FLASHCARD';

export const addFlashcard = payload => dispatch => {
  dispatch({
    type: ADD_FLASHCARD,
    payload
  });
};

export const GET_LEARN_FLASHCARD_SUCCESS = 'GET_LEARN_FLASHCARD_SUCCESS';

export const getLearnFlashcard = user_deck_id => dispatch => {
  let id = null;
  if (user_deck_id) id = user_deck_id;
  axiosAPI.post('/learn/', { user_deck_id: id }).then(res => {
    console.log(res);
  });
};

export const GET_REVIEW_FLASHCARD_SUCCESS = 'GET_REVIEW_FLASHCARD_SUCCESS';

export const getReviewFlashcard = () => dispatch => {
  axiosAPI.post('/review').then(res => {
    console.log(res);
  });
};
