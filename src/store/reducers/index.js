import { combineReducers } from 'redux';
import decksReducer from './decksReducer';
import flashcardsReducer from './flashcardsReducer';

export default combineReducers({
  Decks: decksReducer,
  Flashcards: flashcardsReducer
});
