
import React from 'react';
import reduxApi, {transformers} from 'redux-api';
import adapterFetch from 'redux-api/lib/adapters/fetch';
import {initialRailsDataFetched} from './ActionCreators';
import {setFormSaving, resetFormData} from './ActionCreators';
import history from './history';

export default reduxApi({
  initial_rails_data: {
    url: '/initial_data',
    postfetch: [
      function ({data, actions, dispatch, getState, request}) {
        dispatch(initialRailsDataFetched(data));
      }
    ]
  },
  payment_methods: {url: '/payment_methods'},
  giving_categories: {url: '/giving_categories'},
  giving: {
    url: '/giving',
    crud: true,
    postfetch: [
      function ({data, actions, dispatch, getState, request}) {
        if (data.success == true) {
          history.push({
            pathname: '/givingCheckoutConfirmation',
            search: '?the=query',
            state: { some: 'state' }
          });
          // Actions.givingCheckoutConfirmation({donation_id: data.donation_id, transaction_id: data.transaction_id});
          dispatch(resetFormData('checkout'));
          dispatch(resetFormData('cart'));
          dispatch(actions.initial_rails_data());
        } else {
          console.log({data, request});
          alert("There was a problem processing your card.");
        }
        dispatch(setFormSaving("checkout", false));
      }
    ]
  }
})
  .use("options", (url, params, getState)=> {
    const state = getState();
    let token = state.session.access_token;
    // Add token to header request
    const headers = {
      "Accept": "application/json",
      "Content-Type": "application/json"
    };
    if (token) {
      return {headers: {...headers, Authorization: `Bearer ${token}`}};
    } else {
      return {headers, mode: 'cors'};
    }
  })
  .use("fetch", adapterFetch(fetch))
  .use("rootUrl", "http://localhost:3000/api/v1/");
