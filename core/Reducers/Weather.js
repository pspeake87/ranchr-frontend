import * as ActionTypes from '../ActionTypes';
import {
  API_DATA_SIMPLE_STATE_TEMPLATE,
  APIDatasetCommonReducer,
  InitialDatasetCommonReducer
} from '../ReducerHelpers';
import AuthenticatedAPI from '../AuthenticatedAPI';

const initialState = {
  ...API_DATA_SIMPLE_STATE_TEMPLATE,
};

export default function reducer(state = initialState, action) {

  switch (action.type) {

    case ActionTypes.SET_WEATHER_DATA:
      return {
        ...state,
        has_data: true,
        data: action.data
      };

    case  "sdcds":
      return initialState;

    default:
      return state;
  }

}
