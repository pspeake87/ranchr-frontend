import * as ActionTypes from '../ActionTypes';
import {
  API_DATA_SIMPLE_STATE_TEMPLATE,
  APIDatasetCommonReducer,
  InitialDatasetCommonReducer
} from '../ReducerHelpers';
import AuthenticatedAPI from '../AuthenticatedAPI';

const initialState = {
  ...API_DATA_SIMPLE_STATE_TEMPLATE,
  current_giving_category_id: null,
};

export default function reducer(state = initialState, action) {

  let initial_dataset = InitialDatasetCommonReducer(state, action, 'rails', 'giving_categories');
  if (initial_dataset.handled) {
    return initial_dataset.state;
  }

  let common_dataset = APIDatasetCommonReducer(AuthenticatedAPI.events.giving_categories, state, action, 'data');
  if (common_dataset.handled) {
    return common_dataset.state;
  }
  switch (action.type) {

    case ActionTypes.SET_CURRENT_GIVING_CATEGORY_ID:
      return {
        ...state,
        current_giving_category_id: action.id
      };

    case  "sdcds":
      return initialState;

    default:
      return state;
  }

}
