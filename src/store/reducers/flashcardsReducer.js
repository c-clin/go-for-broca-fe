import { ADD_FLASHCARD } from '../actions/flashcardActions';

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
  review: {}
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
    default:
      return state;
  }
}
