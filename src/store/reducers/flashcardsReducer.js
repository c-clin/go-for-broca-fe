import {
  ADD_FLASHCARD_SUCCESS,
  ADD_FLASHCARD_ERROR,
  GET_LEARN_FLASHCARD_SUCCESS,
  GET_LEARN_FLASHCARD_ERROR,
  GET_REVIEW_FLASHCARD_SUCCESS,
  GET_REVIEW_FLASHCARD_ERROR,
  START_FLASHCARD_LOADER,
  UPDATE_LEARN_FLASHCARD_SUCCESS,
  UPDATE_REVIEW_FLASHCARD_SUCCESS,
  CLEAR_LEARN_FLASHCARD,
  CLEAR_REVIEW_FLASHCARD,
} from '../actions/flashcardActions';

const initState = {
  flashcards: [
    {
      front: 'Hola',
      back: 'Hello',
    },
    {
      front: 'Padre',
      back: 'Father',
    },
  ],
  learnCard: null,
  reviewCard: null,
  loading: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case ADD_FLASHCARD_SUCCESS:
      // let flashcards = [...state.flashcards];
      // flashcards.push(action.payload);

      return {
        ...state,
        // flashcards,
      };

    case GET_LEARN_FLASHCARD_SUCCESS:
      return {
        ...state,
        learnCard: action.payload,
        loading: false,
      };
    case GET_REVIEW_FLASHCARD_SUCCESS:
      return {
        ...state,
        reviewCard: action.payload,
        loading: false,
      };
    case GET_LEARN_FLASHCARD_ERROR:
      return {
        ...state,
        learnCard: null,
        loading: false,
      };
    case GET_REVIEW_FLASHCARD_ERROR:
      return {
        ...state,
        reviewCard: null,
        loading: false,
      };
    case UPDATE_LEARN_FLASHCARD_SUCCESS:
      return {
        ...state,
        learnCard: action.payload,
      };
    case UPDATE_REVIEW_FLASHCARD_SUCCESS:
      action.payload.repetition = state.reviewCard.repetition;
      return {
        ...state,
        reviewCard: action.payload,
      };
    case CLEAR_LEARN_FLASHCARD:
      return {
        ...state,
        learnCard: null,
      };
    case CLEAR_REVIEW_FLASHCARD:
      return {
        ...state,
        reviewCard: null,
      };
    case START_FLASHCARD_LOADER:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}
