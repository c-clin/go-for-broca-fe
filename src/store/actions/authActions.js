import axiosAPI from '../../axios-api';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_ERROR = 'FETCH_USER_ERROR';

export const fetchUser = () => (dispatch) => {
  dispatch(startAuthLoading());
  axiosAPI
    .get('/users')
    .then((res) => {
      dispatch({
        type: FETCH_USER_SUCCESS,
      });
    })
    .catch((e) => {
      dispatch(onLogout());
    });
};

export const ON_LOGOUT_SUCCESS = 'ON_LOGOUT_SUCCESS';

export const onLogout = () => (dispatch) => {
  localStorage.removeItem('token');

  dispatch({
    type: ON_LOGOUT_SUCCESS,
  });
};

export const SET_IS_SIGNED_IN = 'SET_IS_SIGNED_IN';

export const setIsSignedIn = (payload) => {
  return {
    type: SET_IS_SIGNED_IN,
    payload,
  };
};

export const AUTH_LOADING_START = 'AUTH_LOADING_START';

export const startAuthLoading = () => {
  return {
    type: AUTH_LOADING_START,
  };
};

export const ADD_USER = 'ADD_USER';

export const addUser = (email) => (dispatch) => {
  axiosAPI.post('/users', {
    email,
  });
};
