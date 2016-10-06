import _ from 'underscore';
import * as ActionTypes from './ActionTypes';
import AuthenticatedAPI from './AuthenticatedAPI';
import history from './history';
import braintree from 'braintree-web';

let INVALIDATE = 'INVALIDATE';
let API_REQUEST = 'API_REQUEST';
let API_SUCCESS = 'API_SUCCESS';
let API_FAILURE = 'API_FAILURE';


export function initialRailsDataFetched(data) {
  return {
    type: ActionTypes.INITIAL_RAILS_DATA_FETCHED,
    data
  };
}

export function setToken(token) {
  return function (dispatch) {
    dispatch({
          type: ActionTypes.ACCESS_TOKEN,
          state: API_SUCCESS,
          payload: token
    });
  }
}


export function goToGivingCategory(id) {
  return function (dispatch) {

    dispatch({
      type: ActionTypes.SET_CURRENT_GIVING_CATEGORY_ID,
      id
    });

  }
}

export function setFormValidity(form_key, valid) {
  return {
    type: ActionTypes.SET_FORM_VALIDITY,
    form_key,
    valid
  }
}

export function setFormSaving(form_key, pending) {
  return {
    type: ActionTypes.SET_FORM_SAVING,
    form_key,
    pending
  }
}

export function resetFormData(form_key) {
  return {
    type: ActionTypes.RESET_FORM_DATA,
    form_key
  };
}

export function givingCheckoutSubmitted() {
  return function (dispatch, getState) {
    let {forms, payment_methods} = getState()

    let form_key = 'checkout';
    let form = forms[form_key];
    let form_state = form.data;
    //
    // let validateCard = () => {
    //   if (form_state.payment_method == 'new') {
    //     if (form_state.exp_year && form_state.name && form_state.exp_month && form_state.card_number && form_state.email) {
    //       return true
    //     } else {
    //       alert('Please fill out all fields or select a saved card')
    //       return false
    //     }
    //   } else {
    //     if (payment_methods.current_id) {
    //       return true
    //     } else {
    //       alert('Please select a payment method')
    //       return false
    //     }
    //   }
    // }

    // if (validateCard()) {
      dispatch(setFormSaving(form_key, true));
      dispatch(completeCheckout())
    // }

  }
}

export function setAmountForGivingCategory(id, amount = 0.0) {
  return function (dispatch, getState) {

    var regex = /^(\d+)?(?:\.?\d{0,2})$/
    if (regex.test(amount) || amount == "") {
      dispatch({
        type: ActionTypes.SET_AMOUNT_FOR_GIVING_CATEGORY,
        id,
        amount
      });
      history.goBack();
    } else {
      alert('Please enter a valid number in the field or hit the Back button to cancel')
    }
  }
}

export function completeCheckout() {
  return function (dispatch, getState) {

    let form_key = 'checkout';
    let {forms, cart, } = getState();
    let form = forms[form_key];
    if (form.saving) {

      let {name, email, card_number, exp_month, exp_year, keep_card_on_file} = form.data;

      let line_items = _.map(cart.line_items, (amount, giving_category_id) => ({
        giving_category_id,
        amount: parseFloat(amount)
      }));

      let base_payload = {
        name,
        email,
        line_items
      };

      if (form.data.payment_method === 'new') {
        braintree.client.create({
          authorization: "eyJ2ZXJzaW9uIjoyLCJhdXRob3JpemF0aW9uRmluZ2VycHJpbnQiOiJmODk1ZjMxOGY4ZDAwNWE1N2RiN2NkZDE4YTQyYTNhYjdjOWFlZDIxMTE4ZDkwY2E4OTczMTkxMjM5NTc3MDYzfGNyZWF0ZWRfYXQ9MjAxNi0xMC0wNlQxNjoxOToxOS41OTk0MDU3MTcrMDAwMFx1MDAyNm1lcmNoYW50X2lkPXA5Ymg5dHA5Y2tobXFmdG5cdTAwMjZwdWJsaWNfa2V5PTNzMmhrdDk1dHpiNjc4NGsiLCJjb25maWdVcmwiOiJodHRwczovL2FwaS5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tOjQ0My9tZXJjaGFudHMvcDliaDl0cDlja2htcWZ0bi9jbGllbnRfYXBpL3YxL2NvbmZpZ3VyYXRpb24iLCJjaGFsbGVuZ2VzIjpbXSwiZW52aXJvbm1lbnQiOiJzYW5kYm94IiwiY2xpZW50QXBpVXJsIjoiaHR0cHM6Ly9hcGkuc2FuZGJveC5icmFpbnRyZWVnYXRld2F5LmNvbTo0NDMvbWVyY2hhbnRzL3A5Ymg5dHA5Y2tobXFmdG4vY2xpZW50X2FwaSIsImFzc2V0c1VybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXV0aFVybCI6Imh0dHBzOi8vYXV0aC52ZW5tby5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tIiwiYW5hbHl0aWNzIjp7InVybCI6Imh0dHBzOi8vY2xpZW50LWFuYWx5dGljcy5zYW5kYm94LmJyYWludHJlZWdhdGV3YXkuY29tL3A5Ymg5dHA5Y2tobXFmdG4ifSwidGhyZWVEU2VjdXJlRW5hYmxlZCI6dHJ1ZSwicGF5cGFsRW5hYmxlZCI6dHJ1ZSwicGF5cGFsIjp7ImRpc3BsYXlOYW1lIjoiRmFtaWx5IENvbW11bml0eSBDaHVyY2giLCJjbGllbnRJZCI6bnVsbCwicHJpdmFjeVVybCI6Imh0dHA6Ly9leGFtcGxlLmNvbS9wcCIsInVzZXJBZ3JlZW1lbnRVcmwiOiJodHRwOi8vZXhhbXBsZS5jb20vdG9zIiwiYmFzZVVybCI6Imh0dHBzOi8vYXNzZXRzLmJyYWludHJlZWdhdGV3YXkuY29tIiwiYXNzZXRzVXJsIjoiaHR0cHM6Ly9jaGVja291dC5wYXlwYWwuY29tIiwiZGlyZWN0QmFzZVVybCI6bnVsbCwiYWxsb3dIdHRwIjp0cnVlLCJlbnZpcm9ubWVudE5vTmV0d29yayI6dHJ1ZSwiZW52aXJvbm1lbnQiOiJvZmZsaW5lIiwidW52ZXR0ZWRNZXJjaGFudCI6ZmFsc2UsImJyYWludHJlZUNsaWVudElkIjoibWFzdGVyY2xpZW50MyIsImJpbGxpbmdBZ3JlZW1lbnRzRW5hYmxlZCI6dHJ1ZSwibWVyY2hhbnRBY2NvdW50SWQiOiJyZzJmcnl0a3dtcmN3c3o3IiwiY3VycmVuY3lJc29Db2RlIjoiVVNEIn0sImNvaW5iYXNlRW5hYmxlZCI6ZmFsc2UsIm1lcmNoYW50SWQiOiJwOWJoOXRwOWNraG1xZnRuIiwidmVubW8iOiJvZmYifQ=="
        }, function (err, client) {
          client.request({
            endpoint: 'payment_methods/credit_cards',
            method: 'post',
            data: {
              creditCard: {
                number: '4111111111111111',
                expirationDate: '10/20',
                cvv: '123',
                billingAddress: {
                  postalCode: '12345'
                }
              }
            }
          }, function (err, response) {

              let payment_method_nonce = response.creditCards[0].nonce;
              let payload = {
                ...base_payload,
                payment_method_nonce,
                keep_card_on_file
              };

              let request_data = {body: JSON.stringify(payload)};
              dispatch(AuthenticatedAPI.actions.giving.post({}, request_data));

          });
        });



      } else {
        let payment_method_token = form.data.payment_method;
        let payload = {
          ...base_payload,
          payment_method_token
        };

        let request_data = {body: JSON.stringify(payload)};
        dispatch(AuthenticatedAPI.actions.giving.post({}, request_data));
      }

    }

  }
}