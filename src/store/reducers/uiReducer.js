import { SHOW_TOASTER, REMOVE_TOASTER } from '../actions/uiActions';

const initState = {
  toaster: {
    toasterOpen: false,
    type: null,
    content: ''
  }
};

export default function(state = initState, action) {
  switch (action.type) {
    case SHOW_TOASTER: {
      return {
        ...state,
        toaster: { ...action.payload, toasterOpen: true }
      };
    }
    case REMOVE_TOASTER: {
      return {
        ...state,
        toaster: { ...state.toaster, toasterOpen: false, content: '' }
      };
    }
    default:
      return state;
  }
}
