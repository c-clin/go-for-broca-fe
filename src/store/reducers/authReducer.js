import { SET_IS_SIGNED_IN, AUTH_LOADING_START } from '../actions/authActions';

const initState = {
  isLoading: false,
  isSignedIn: null
};

export default function(state = initState, action) {
  switch (action.type) {
    case SET_IS_SIGNED_IN:
      return {
        ...state,
        isSignedIn: action.payload,
        isLoading: false
      };
    case AUTH_LOADING_START:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
}
