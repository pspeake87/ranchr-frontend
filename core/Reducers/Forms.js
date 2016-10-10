import * as ActionTypes from '../ActionTypes';
import moment from 'moment';
import _ from 'underscore';


const FORM_STATE_TEMPLATE = {
  valid: false,
  saving: false,
  data: {}
};

const initialState = {
  checkout: {
    ...FORM_STATE_TEMPLATE,
    data: {
      payment_method: '',
      card_number: '',
      exp_month: '',
      exp_year: '',
      name: '',
      email: '',
      keep_card_on_file: false,
      message: '',
      choosing_payment_method: ''
    }
  },
  signUp: {
    ...FORM_STATE_TEMPLATE,
    data: {
      full_name: '',
      email: '',
      password: '',
      verify_password: ''
    }
  },
  resetPassword: {
    ...FORM_STATE_TEMPLATE,
    data: {
      password: '',
      verify_password: '',
      email: '',
      code: ''
    }
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {

    case ActionTypes.SET_FORM_DATA:
      return {
        ...state,
        ...{
          [action.form_key]: {
            ...FORM_STATE_TEMPLATE,
            ...state[action.form_key],
            data: {
              ...state[action.form_key].data,
              ...action.attributes
            }
          }
        }
      };

    case ActionTypes.RESET_FORM_DATA:
      return {
        ...state,
        ...{[action.form_key]: {...initialState[action.form_key]}}
      };

    case ActionTypes.SET_FORM_VALIDITY:
      return {
        ...state,
        ...{
          [action.form_key]: {
            ...FORM_STATE_TEMPLATE,
            ...state[action.form_key],
            valid: action.valid
          }
        }
      };

    case ActionTypes.SET_FORM_SAVING:
      return {
        ...state,
        ...{
          [action.form_key]: {
            ...FORM_STATE_TEMPLATE,
            ...state[action.form_key],
            saving: action.pending
          }
        }
      };

    case ActionTypes.LOGOUT:
      return initialState;

    default:
      return state;


  }


}
