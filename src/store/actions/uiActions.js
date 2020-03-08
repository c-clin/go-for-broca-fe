export const SHOW_TOASTER = 'SHOW_TOASTER';
export const REMOVE_TOASTER = 'REMOVE_TOASTER';

export const showToaster = payload => dispatch => {
  dispatch({
    type: SHOW_TOASTER,
    payload
  });
};

export const removeToaster = () => {
  return {
    type: REMOVE_TOASTER
  };
};
