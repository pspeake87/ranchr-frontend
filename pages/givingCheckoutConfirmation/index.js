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
import S from 'string';
import { title, html } from './index.md';
import _ from 'underscore';
import Link from '../../components/Link/Link';
import {givingCheckoutSubmitted} from '../../core/ActionCreators';
import history from '../../core/history';

const styles = {
 text_title: {
   marginTop: 60,
   marginLeft: 30,
   color: '#35464f',
   fontSize: 36,
   fontWeight: 'bold'
 },
 text_row: {
   fontSize: 16,
   paddingLeft: 30,
   paddingRight: 20,
   color: '#8296a4',
 },
 confirmation_text: {
   marginLeft: 30,
   fontSize: 26,
   marginTop: 20,
   color: '#35464f',
   fontWeight: 'bold'
 }
}

class GivingCheckoutConfirmation extends React.Component {

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
      <Layout title={'Confirmation'} className={s.content}>
      <div>
        <p style={styles.text_title}>Thank you!</p>
        <br/>
        <p style={styles.text_row}>Thank you for the seed you've sown.<br/>
        A receipt of your gift has been sent to your email.</p>
        <br/>
        <p style={styles.text_row}>Your confirmation number:</p>
        <p style={styles.confirmation_text}>{S(this.props.session.donation_id).padLeft(8, '0').s}</p>
      </div>

      </Layout>
    );
  }

}


function select(state) {
  return {
    session: state.session,
    giving_categories: state.giving_categories,
  };
}

export default connect(select)(GivingCheckoutConfirmation);
