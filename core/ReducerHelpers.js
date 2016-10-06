import moment from 'moment';
import _ from 'underscore';
import * as ActionTypes from './ActionTypes';

export const API_DATA_INDIVIDUAL_ITEM_TEMPLATE = {
  is_fetching: false,
  has_data: false,
  data: {}
};

export const API_DATA_SIMPLE_STATE_TEMPLATE = {
  has_data: false,
  is_fetching: false,
  did_invalidate: false,
  api_timestamp: 0,
  error: null,
  data: {}
};

export const FORM_STATE_TEMPLATE = {
  valid: false,
  saving: false,
  data: {}
};

export const API_DATA_STATE_TEMPLATE = {
  ...API_DATA_SIMPLE_STATE_TEMPLATE,
  // For individual
  individual_cache: {},
  current_id: null
};


export function InitialDatasetCommonReducer(state, action, domain, accessor, index_by = null) {
  if (domain == 'rails' && action.type == ActionTypes.INITIAL_RAILS_DATA_FETCHED) {
    console.log('InitialDatasetCommonReducer', domain, action.type, accessor);
    var data = action.data[accessor];

    if (index_by) {
      data = _.indexBy(data, index_by);
    }

    return {
      state: {
        ...state,
        is_fetching: false,
        has_data: true,
        api_timestamp: moment().unix(),
        did_invalidate: false,
        data: {
          ...state.data,
          ...data
        }
      },
      handled: true
    };
  }
  else {
    return {
      handled: false
    }
  }
}

export function APIDatasetCommonReducer({actionFetch, actionSuccess, actionFail, actionReset}, state, action, accessor = null, index_by = null) {
  var new_state = null;

  switch (action.type) {
    case actionFetch:
      new_state = {
        ...state,
        is_fetching: true
      };
      break;

    case actionSuccess:

      var data = (accessor) ? action.data[accessor] : action.data;

      if (index_by) {
        data = _.indexBy(data, index_by);
      }

      new_state = {
        ...state,
        is_fetching: false,
        has_data: true,
        api_timestamp: moment().unix(),
        did_invalidate: false,
        data: {
          ...state.data,
          ...data
        }
      };
      break;

    case actionFail:
      new_state = {
        ...state,
        is_fetching: false,
        error: action.error
      };
      break;

    // Emitted when action is aborted
    case actionReset:
      new_state = {
        ...state,
        is_fetching: false
      };
      break;
  }

  if (new_state) {
    return {
      handled: true,
      state: new_state
    }
  } else {
    return {
      handled: false
    }
  }

}

export function APIIndividualItemCommonReducer({actionFetch, actionSuccess, actionFail, actionReset}, state, action) {
  var new_state = null;
  var item = null;
  var id = null;

  switch (action.type) {
    case actionFetch:
      id = action.request.pathvars.id;
      item = {
        ...API_DATA_INDIVIDUAL_ITEM_TEMPLATE,
        ...state.individual_cache[id],
        is_fetching: true
      };

      new_state = {
        ...state,
        individual_cache: {
          ...state.individual_cache,
          ...{[id]: item}
        }
      };
      break;

    case actionSuccess:

      item = {
        ...API_DATA_INDIVIDUAL_ITEM_TEMPLATE,
        ...state.individual_cache[action.data.id],
        is_fetching: false,
        has_data: true,
        data: action.data
      };

      new_state = {
        ...state,
        individual_cache: {
          ...state.individual_cache,
          ...{[action.data.id]: item}
        }
      };
      break;

    case actionFail:
    case actionReset:
      item = {
        ...API_DATA_INDIVIDUAL_ITEM_TEMPLATE,
        ...state.individual_cache[action.data.id],
        is_fetching: false
      };

      new_state = {
        ...state,
        individual_cache: {
          ...state.individual_cache,
          ...{[action.data.id]: item}
        }
      };
      break;
  }

  if (new_state) {
    return {
      handled: true,
      state: new_state
    }
  } else {
    return {
      handled: false
    }
  }
}
