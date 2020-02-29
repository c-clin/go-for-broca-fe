export const ADD_FLASHCARD = 'ADD_FLASHCARD';

export const addFlashcard = payload => dispatch => {
  dispatch({
    type: ADD_FLASHCARD,
    payload
  });
};
