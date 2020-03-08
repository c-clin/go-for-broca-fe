import axiosAPI from '../../axios-api';

export const SET_IS_SIGNED_IN = 'SET_IS_SIGNED_IN';

export const setIsSignedIn = payload => {
  return {
    type: SET_IS_SIGNED_IN,
    payload
  };
};

export const AUTH_LOADING_START = 'AUTH_LOADING_START';

export const startAuthLoading = () => {
  return {
    type: AUTH_LOADING_START
  };
};

export const ADD_USER = 'ADD_USER';

export const addUser = email => dispatch => {
  axiosAPI.post('/users', {
    email
  });
};
