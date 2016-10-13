import * as ActionTypes from '../ActionTypes';
import {
  API_DATA_SIMPLE_STATE_TEMPLATE,
  APIDatasetCommonReducer,
  InitialDatasetCommonReducer
} from '../ReducerHelpers';
import AuthenticatedAPI from '../AuthenticatedAPI';

const initialState = {...API_DATA_SIMPLE_STATE_TEMPLATE};

export default function reducer(state = initialState, action) {

  let initial_dataset = InitialDatasetCommonReducer(state, action, 'rails', 'profile');
  if (initial_dataset.handled) {
    return initial_dataset.state;
  }

  let common_dataset = APIDatasetCommonReducer(AuthenticatedAPI.events.profile, state, action);
  if (common_dataset.handled) {
    return common_dataset.state;
  }

  switch (action.type) {

    case   ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;
  }

}
