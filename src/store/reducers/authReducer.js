import {
  FETCH_USER_SUCCESS,
  SET_IS_SIGNED_IN,
  AUTH_LOADING_START,
  ON_LOGOUT_SUCCESS,
} from '../actions/authActions';

const initState = {
  isLoading: false,
  isSignedIn: false,
};

export default function (state = initState, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        isSignedIn: true,
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
    case ON_LOGOUT_SUCCESS:
      return {
        ...state,
        isSignedIn: false,
        isLoading: false,
      };
    default:
      return state;
  }
}
