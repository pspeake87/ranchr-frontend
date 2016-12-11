import * as ActionTypes from '../ActionTypes';

const initialState = {
  line_items: {
    bob: "asdf"
  }
};

export default function reducer(state = initialState, action) {

  var new_line_items;

  switch (action.type) {
    case ActionTypes.SET_AMOUNT_FOR_GIVING_CATEGORY:

      new_line_items = {...state.line_items};

      if (action.amount == 0) {
        delete new_line_items[action.id];
      } else {
        new_line_items[action.id] = action.amount;
      }

      return {
        ...state,
        line_items: new_line_items
      };

    case ActionTypes.REMOVE_FROM_CART:

      new_line_items = {...state.line_items};

      delete new_line_items[action.id];

      return {
        ...state,
        line_items: new_line_items
      };

    case ActionTypes.RESET_FORM_DATA:
      return {
        ...state,
        ...initialState
      };

    case "ActionTypes.LOGOUT":
      return initialState;

    default:
      return state;

  }
}
