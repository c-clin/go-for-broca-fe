import { combineReducers } from 'redux';
import flashcardsReducer from './flashcardsReducer';

export default combineReducers({
  flashcards: flashcardsReducer
});
