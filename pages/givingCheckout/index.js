/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import AuthenticatedAPI from '../../core/AuthenticatedAPI';
import {getPaymentMethodsFormatted} from '../../core/Selectors';
import { connect } from "react-redux";
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import _ from 'underscore';
import Link from '../../components/Link/Link';
import {givingCheckoutSubmitted} from '../../core/ActionCreators';

class GivingCheckout extends React.Component {

  constructor() {
     super();
     this.state = {
      saved_cards: []
    };
   }

  componentDidMount() {
    document.title = title;
    this.updateState(this.props);
  }

  componentWillReceiveProps(newProps) {
      this.updateState(newProps);
  }

  updateState(props) {
    var array_of_cards = _.toArray(props.payment_methods_formatted)
    this.setState({saved_cards: array_of_cards})
  }

  handleClick(item) {
    console.log(item.token)
  }

  renderList() {
    console.log(this.state.saved_cards)
    return (
      <ol>
        {this.state.saved_cards.map((item, i) =>
          <li key={i}>
            <div onClick={() => this.handleClick(item)}>
              {item.label}
            </div>
          </li>
        )}
      </ol>
    );

  }

  onCheckout() {
    this.props.dispatch(givingCheckoutSubmitted())
  }

  render() {
    return (
      <Layout className={s.content}>
        <h4>Checkout</h4>
        {this.renderList()}
        <div onClick={() => this.onCheckout()}>
          Submit
        </div>
      </Layout>
    );
  }

}


function select(state) {
  return {
    giving_categories: state.giving_categories,
    cart_line_items: state.cart.line_items,
    payment_methods: state.payment_methods,
    payment_methods_formatted: getPaymentMethodsFormatted(state)
  };
}

export default connect(select)(GivingCheckout);
