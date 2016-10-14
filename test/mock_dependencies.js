import {createStore, applyMiddleware, combineReducers, compose} from 'redux';
import thunk from 'redux-thunk'
import sinon from 'sinon';
import fetchMock from 'fetch-mock';

export default function() {

  let setupSpy, storageGetSpy, storageSaveSpy, storageDeleteSpy;

  let alertSpy;

  let apiRailsDataSpy, apiBibleReadingsSpy, apiPaymentMethodsSpy, apiGivingClientTokenSpy,
    apiGivingCategoriesSpy, apiGivingSpy, apiUserBibleReadingsSpy, apiUserBibleReadingSpy,
    apiPasswordResetSpy, apiValidatePasswordResetTokenSpy, apiResetPasswordSpy,
    apiFavoritesSpy, apiToggleFavoriteSpy, apiCreateUserSpy, apiRegisterDeviceSpy,
    apiProfileSpy;

  let apiDrupalDataSpy, apiAnnouncementsSpy, apiCategoriesSpy, apiLiveStreamInfoSpy,
    apiResourcesSpy, apiResourceSpy, apiEventsSpy, apiEventSpy, apiMediaArchivesSpy,
    apiMediaArchiveSpy, apiMediaTopicsSpy, apiAppSettingsSpy, apiMonthEventsSpy;


  storageGetSpy = sinon.spy();
  storageSaveSpy = sinon.spy();
  storageDeleteSpy = sinon.spy();
  setupSpy = sinon.spy();

  alertSpy = sinon.spy();

  apiRailsDataSpy = sinon.spy();
  apiBibleReadingsSpy = sinon.spy();
  apiPaymentMethodsSpy = sinon.spy();
  apiGivingClientTokenSpy = sinon.spy();
  apiGivingCategoriesSpy = sinon.spy();
  apiGivingSpy = sinon.spy();
  apiUserBibleReadingsSpy = sinon.spy();
  apiUserBibleReadingSpy = sinon.spy();
  apiPasswordResetSpy = sinon.spy();
  apiValidatePasswordResetTokenSpy = sinon.spy();
  apiResetPasswordSpy = sinon.spy();
  apiFavoritesSpy = sinon.spy();
  apiToggleFavoriteSpy = sinon.spy();
  apiCreateUserSpy = sinon.spy();
  apiRegisterDeviceSpy = sinon.spy();
  apiProfileSpy = sinon.spy();

  apiDrupalDataSpy = sinon.spy();
  apiAnnouncementsSpy = sinon.spy();
  apiCategoriesSpy = sinon.spy();
  apiLiveStreamInfoSpy = sinon.spy();
  apiResourcesSpy = sinon.spy();
  apiResourceSpy = sinon.spy();
  apiEventsSpy = sinon.spy();
  apiEventSpy = sinon.spy();
  apiMediaArchivesSpy = sinon.spy();
  apiMediaArchiveSpy = sinon.spy();
  apiMediaTopicsSpy = sinon.spy();
  apiAppSettingsSpy = sinon.spy();
  apiMonthEventsSpy = sinon.spy();

  let spies = {
    apiRailsDataSpy, apiBibleReadingsSpy, apiPaymentMethodsSpy, apiGivingClientTokenSpy,
    apiGivingCategoriesSpy, apiGivingSpy, apiUserBibleReadingsSpy, apiUserBibleReadingSpy,
    apiPasswordResetSpy, apiValidatePasswordResetTokenSpy, apiResetPasswordSpy,
    apiFavoritesSpy, apiToggleFavoriteSpy, apiCreateUserSpy, apiRegisterDeviceSpy,
    apiProfileSpy, alertSpy,
    apiDrupalDataSpy, apiAnnouncementsSpy, apiCategoriesSpy, apiLiveStreamInfoSpy,
    apiResourcesSpy, apiResourceSpy, apiEventsSpy, apiEventSpy, apiMediaArchivesSpy,
    apiMediaArchiveSpy, apiMediaTopicsSpy, apiAppSettingsSpy, apiMonthEventsSpy,
    setupSpy, storageGetSpy, storageSaveSpy, storageDeleteSpy
  };

  let dependencies = {
    'node-fetch': fetchMock,
    'redux-thunk': thunk,
    './AuthenticatedAPI': {
      actions: {
        initial_rails_data: apiRailsDataSpy,
        payment_methods: apiPaymentMethodsSpy,
        giving_client_token: apiGivingClientTokenSpy,
        giving_categories: apiGivingCategoriesSpy,
        giving: {
          post: apiGivingSpy
        },
        profile: apiProfileSpy
      }
    },
    './Components/Braintree': {
      setup: setupSpy
    },
    'react-native': {
      Alert: {
        alert: alertSpy
      }
    }
  };

  return {
    spies,
    dependencies
  }

}
