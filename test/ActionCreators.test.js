import { expect } from 'chai';
import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk'
import sinon from 'sinon';
import proxyquire from 'proxyquire';
import configureMockStore from 'redux-mock-store';


import setupMockDependencies from './mock_dependencies';

import sessionReducer from '../core/Reducers/Session';


const middlewares = [thunk];
const mockStore = configureMockStore(middlewares)

describe('Actions', () => {

  let state, actions, reducers;
  let spies, mock_dependencies;

  beforeEach(() => {

    let setup = setupMockDependencies();
    spies = setup.spies;
    mock_dependencies = setup.dependencies;

    actions = proxyquire
      .noCallThru()
      .load('../core/ActionCreators', mock_dependencies);

    // reducers = proxyquire
    //   .load('../App/Reducers', mockDependencies);

    // state = reducers(undefined, {});

  });

  // it('remove stored access token if failed to run test api request with it', (done) => {
  //   // TODO: build this
  // });


  it('submitting braintree request without a payment method selected', (done) => {
    const store = mockStore({
      forms: {
        checkout: {
          data: {
            payment_method: "new"
          }
        }
      },
      payment_methods: {
        current_id: null
      }
    });
    global.alert = sinon.spy();
    store.dispatch(actions.givingCheckoutSubmitted());
    setTimeout(() => {
      if (global.alert.calledOnce) {
        done();
      } else {
        done('an alert was not called and the submission was allowed through');
      }
    }, 200);
  });

  it('submitting braintree request with a payment method selected', (done) => {
    const store = mockStore({
      forms: {
        checkout: {
          data: {
            payment_method: "6bhj23"
          }
        }
      },
      payment_methods: {
        current_id: '6bhj23'
      }
    });
    var alert = sinon.spy();
    store.dispatch(actions.givingCheckoutSubmitted());
    setTimeout(() => {
      if (!spies.alertSpy.calledOnce) {
        done();
      } else {
        done('an alert was called when it shouldnt be');
      }
    }, 200);
  });
});
