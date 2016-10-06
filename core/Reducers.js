import {combineReducers} from 'redux';
import giving_categories from './Reducers/GivingCategories';
import cart from './Reducers/Cart';
import payment_methods from './Reducers/PaymentMethods';
import forms from './Reducers/Forms';
import session from './Reducers/Session';

export default combineReducers({
  giving_categories,
  cart,
  payment_methods,
  forms,
  session
});
