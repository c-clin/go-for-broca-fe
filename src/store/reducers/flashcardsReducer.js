import {
  ADD_FLASHCARD,
  GET_LEARN_FLASHCARD_SUCCESS,
  GET_REVIEW_FLASHCARD_SUCCESS,
  START_FLASHCARD_LOADER
} from '../actions/flashcardActions';

const initState = {
  flashcards: [
    {
      front: 'Hola',
      back: 'Hello'
    },
    {
      front: 'Padre',
      back: 'Father'
    }
  ],
  learnCard: null,
  reviewCard: null,
  loading: false
};

export default function(state = initState, action) {
  switch (action.type) {
    case ADD_FLASHCARD:
      let flashcards = [...state.flashcards];
      flashcards.push(action.payload);

      return {
        ...state,
        flashcards
      };

    case GET_LEARN_FLASHCARD_SUCCESS:
      return {
        ...state,
        learnCard: action.payload,
        loading: false
      };
    case START_FLASHCARD_LOADER:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
