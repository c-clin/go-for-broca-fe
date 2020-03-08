import { SHOW_TOASTER, REMOVE_TOASTER } from '../actions/uiActions';

const initState = {
  toaster: []

  // {
  //   type: ''
  //   content: ''
  // }
};

export default function(state = initState, action) {
  switch (action.type) {
    case SHOW_TOASTER: {
      let toaster = [...state.toaster];
      toaster.push(action.payload);

      return {
        ...state,
        toaster
      };
    }
    case REMOVE_TOASTER: {
      let toaster = state.toaster;
      toaster.shift();

      return {
        ...state,
        toaster: [...state.toaster]
      };
    }
    default:
      return state;
  }
}
