import _ from 'underscore';
import * as ActionTypes from './ActionTypes';
import AuthenticatedAPI from './AuthenticatedAPI';
import history from './history';
import jsonp from 'jsonp';

let INVALIDATE = 'INVALIDATE';
let API_REQUEST = 'API_REQUEST';
let API_SUCCESS = 'API_SUCCESS';
let API_FAILURE = 'API_FAILURE';


export function InitialDataFetched(data) {
  return {
    type: ActionTypes.SET_CURRENT_GIVING_CATEGORY_ID,
    data
  };
}

export function WeatherDataFetched(data) {
  return {
    type: ActionTypes.SET_WEATHER_DATA,
    data
  };
}


export function FetchWeatherData(data) {
  return function (dispatch, getState) {

    navigator.geolocation.getCurrentPosition(function(position) {
      jsonp('https://api.darksky.net/forecast/a8daf5683208b1b815c5aba017d21503/' + position.coords.latitude + ',' + position.coords.longitude, {}, (err, data) => {
        dispatch(WeatherDataFetched(data));
      })
    });

  };
}



export function login(email, password) {

  return function (dispatch, getState) {

    let {session} = getState();

    // First dispatch: the app state is updated to inform
    // that the API call is starting.
    if (!session.is_fetching) {

      dispatch(accessTokenFetching());

      let request_data = {
        email,
        password,
        grant_type: 'password',
        client_id: Config.OAUTH_CLIENT_ID,
        client_secret: Config.OAUTH_CLIENT_SECRET
      };

      let fetch_options = {
        method: 'post',
        body: JSON.stringify(request_data),
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      //payment succeeded, pass nonce to server
      fetch(Config.TOKEN_URL, fetch_options)
        .then(fetchResponseHelper, fetchErrorHelper)
        .then((responseJSON) => {
          persistentStorage.save('oauth_token', responseJSON);
          dispatch(accessTokenSuccess(responseJSON));

          // TODO: What is this here for?  Seems inappropriate
          dispatch(setFormSaving("signUp", false));
          dispatch(resetFormData("signUp"))

        })
        .catch((error) => {
          alert('There was a problem signing you in. Please check your email and password.');
          console.log('error', error);
          dispatch(accessTokenFailure());
        });
    }
  }
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

export function setFormData(form_key, attributes) {
  return {
    type: ActionTypes.SET_FORM_DATA,
    form_key,
    attributes
  };
}

export function setCurrentCard(token) {
  return function (dispatch) {
    dispatch({
      type: ActionTypes.SET_CURRENT_CARD,
      id: token
    });
  }
}

export function givingCheckoutSubmitted(ref) {
  return function (dispatch, getState) {
    let {forms, payment_methods} = getState()

    let form_key = 'checkout';
    let form = forms[form_key];
    let form_state = form.data;

    let validateCard = () => {
      if (form_state.payment_method == 'new') {
        if (form_state.exp_year && form_state.name && form_state.exp_month && form_state.card_number && form_state.email) {
          return true
        } else {
          alert('Please fill out all fields or select a saved card')
          return false
        }
      } else {
        if (payment_methods.current_id) {
          return true
        } else {
          alert('Please select a payment method')
          return false
        }
      }
    }

    let validateEmail = () => {

      var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (form_state.email && form_state.email.length > 0) {
        if (regex.test(form_state.email)) {
          return true;
        } else {
          alert('Please enter a valid email address');
          return false;
        }
      } else {
        return false;
      }
    };

    if (validateCard() && validateEmail()) {
      dispatch(setFormSaving(form_key, true));
      dispatch(completeCheckout())
    }

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
    let {forms, cart, session} = getState();
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
          authorization: session.braintree_client_token
        }, function (err, client) {
          client.request({
            endpoint: 'payment_methods/credit_cards',
            method: 'post',
            data: {
              creditCard: {
                number: card_number,
                expirationDate: exp_month + '/' + exp_year,
              }
            }
          }, function (err, response) {

            if(err) {
              alert(err);
              dispatch(setFormSaving(form_key, false));
            } else {
              let payment_method_nonce = response.creditCards[0].nonce;
              let payload = {
                ...base_payload,
                payment_method_nonce,
                keep_card_on_file
              };

              let request_data = {body: JSON.stringify(payload)};
              dispatch(AuthenticatedAPI.actions.giving.post({}, request_data));
            }

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
