import * as ActionTypes from '../ActionTypes';
import moment from 'moment';

const initialState = {
  app_initialized: false,
  initial_token_checked: false,
  is_fetching: false,
  user_id: null,
  access_token: null,
  app_active: true,
  network_connected: true,
  guest_mode: false
};

export default function reducer(state = initialState, action = {}) {

  switch (action.type) {

    case ActionTypes.ACCESS_TOKEN:
      switch (action.state) {
        case 'API_SUCCESS':
          return {
            ...state,
            access_token: action.payload,
            initial_token_checked: true,
            is_fetching: false
          };

        default:
          return state;
      }

      case ActionTypes.BRAINTREE_CLIENT_TOKEN:
        return {
          ...state,
          braintree_client_token: action.data.giving_client_token
        };

    default:
      return state;
  }
}
