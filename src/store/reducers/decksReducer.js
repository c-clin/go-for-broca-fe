import {
  FETCH_ALL_DECKS_SUCCESS,
  FETCH_USER_DECKS_SUCCESS,
  DELETE_USER_DECK_SUCCESS
} from '../actions/decksActions';

const initState = {
  decks: [],
  userDecks: []
};

export default function(state = initState, action) {
  switch (action.type) {
    case FETCH_ALL_DECKS_SUCCESS:
      return {
        ...state,
        decks: action.payload
      };
    case FETCH_USER_DECKS_SUCCESS:
      return {
        ...state,
        userDecks: action.payload
      };
    case DELETE_USER_DECK_SUCCESS:
      let userDecks = state.userDecks.filter(
        deck => deck.id !== action.payload
      );

      return {
        ...state,
        userDecks
      };
    default:
      return state;
  }
}
