import {createSelector} from 'reselect';
import _ from 'underscore';
import sprintf from 'sprintf';
import moment from 'moment';

const givingCategoriesSelector = state => state.giving_categories;
const paymentMethodsSelector = state => state.payment_methods;
const cartSelector = state => state.cart;

export const getCurrentGivingCategory = createSelector(
  givingCategoriesSelector,
  (giving_categories) => {
    return giving_categories.data[giving_categories.current_giving_category_id - 1]
  }
);

export const getCartTotal = createSelector(
  givingCategoriesSelector, cartSelector,
  (giving_categories, cart) => {
    var sum = 0
    _.each(giving_categories.data, (giving_category) => {
      sum = sum + (parseFloat(cart.line_items[giving_category.id]) || 0.00)
    });
    return sum
  }
);


export const getPaymentMethodsFormatted = createSelector(
  [paymentMethodsSelector],
  payment_methods => (

    _.indexBy(
      _.map(payment_methods.data, payment_method => ({
        label: sprintf("%s ending in %s", payment_method.card_type, payment_method.last_4),
        token: payment_method.token
      })), 'token'
    )
  )
);
