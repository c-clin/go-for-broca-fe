import {
  FETCH_USER_SUCCESS,
  FETCH_USER_ERROR,
  SET_IS_SIGNED_IN,
  AUTH_LOADING_START,
} from '../actions/authActions';

const initState = {
  isLoading: false,
  isSignedIn: null,
};

export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
        isLoading: false,
      };
    case FETCH_USER_ERROR:
      return {
        ...state,
        isLoading: false,
      };
    case SET_IS_SIGNED_IN:
      return {
        ...state,
        isSignedIn: action.payload,
        isLoading: false,
      };
    case AUTH_LOADING_START:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
}
