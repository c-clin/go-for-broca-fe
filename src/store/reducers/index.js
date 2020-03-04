import { combineReducers } from 'redux';
import authReducer from './authReducer';
import decksReducer from './decksReducer';
import flashcardsReducer from './flashcardsReducer';
import uiReducer from './uiReducer';

export default combineReducers({
  Auth: authReducer,
  Decks: decksReducer,
  Flashcards: flashcardsReducer,
  UI: uiReducer
});
