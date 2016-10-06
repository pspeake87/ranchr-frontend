import * as ActionTypes from '../ActionTypes';
import {
  API_DATA_STATE_TEMPLATE,
  APIDatasetCommonReducer,
  InitialDatasetCommonReducer
} from '../ReducerHelpers';
import AuthenticatedAPI from '../AuthenticatedAPI';

const initialState = {...API_DATA_STATE_TEMPLATE};

export default function reducer(state = initialState, action) {

  let initial_dataset = InitialDatasetCommonReducer(state, action, 'rails', 'payment_methods');
  if (initial_dataset.handled) {
    return initial_dataset.state;
  }

  let common_dataset = APIDatasetCommonReducer(AuthenticatedAPI.events.payment_methods, state, action, 'data', 'token');
  if (common_dataset.handled) {
    return common_dataset.state;
  }

  switch (action.type) {


    case ActionTypes.SET_CURRENT_CARD:

      return {
        ...state,
        current_id: action.id,
      };

    case   ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }

}
