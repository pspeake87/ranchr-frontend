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
import RectButton from '../../components/RectButton';
import Link from '../../components/Link/Link';
import {givingCheckoutSubmitted, setFormData, setCurrentCard} from '../../core/ActionCreators';


const FORM_KEY = 'checkout';

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

  calculateTotal() {
    var total = 0;
    _.forEach(this.props.cart_line_items, function (val) {
      total += parseFloat(val);
    });
    return total.toFixed(2);
  }

  updateState(props) {
    var array_of_cards = _.toArray(props.payment_methods_formatted)
    this.setState({saved_cards: array_of_cards})
  }

  handleClick(item) {
    console.log(item.token)
  }

  onCardSelected(token) {

    let {dispatch, payment_methods} = this.props;
    if (payment_methods.current_id != token) {
      dispatch(setCurrentCard(token));
      dispatch(setFormData(FORM_KEY, {payment_method: token}));
    } else if (payment_methods.current_id == token) {
      dispatch(setCurrentCard(''));
      dispatch(setFormData(FORM_KEY, {payment_method: ''}));
    }
  }

  addCardButtonPressed(value) {
    let {form, dispatch} = this.props;
    dispatch(setCurrentCard(''));
    dispatch(setFormData(FORM_KEY, {payment_method: value}));
    dispatch(setFormData(FORM_KEY, {choosing_payment_method: !form.data.choosing_payment_method}));

  }

  renderAmountHeader() {
    return(
      <div style={{height: 150, width: screen.width, backgroundColor: '#eef3f6'}}>
        <p
          style={{paddingTop: 35, paddingLeft: 25, fontSize: 20, backgroundColor: 'transparent', color: '#8296a4'}}>Giving
          Total:</p>
        <p
          style={{paddingLeft: 25, fontWeight: 'bold', fontSize: 50, backgroundColor: 'transparent', color: '#35464f'}}>${this.calculateTotal()}</p>
      </div>
    )
  }

  renderCardList() {
    console.log(this.state.saved_cards)
    let checked_path = require('../../Assets/Images/checked-circle.png');
    let unchecked_path = require('../../Assets/Images/hollow-circle.png');
    return (
      <div>
        {this.state.saved_cards.map((item, i) =>
          <div className={s.card_wrapper}>
            <img className={s.card_image} src={(item.token === this.props.payment_methods.current_id) ? checked_path : unchecked_path}/>
            <p style={{paddingRight: screen.width - 200}} className={s.card_text} onClick={() => this.onCardSelected(item.token)}>
              {item.label}
            </p>
          </div>
        )}
      </div>

    );

  }

  renderCreditCardForm() {
    let {form, dispatch} = this.props;
    if (form.data.payment_method == 'new') {
      return(
        <div>
          <div className={s.inputTitle}>
            Name
          </div>

          <div>
            <input type="text"
            style={{paddingLeft: 25}}
            value={form.data.name}
            onChange={(e) => dispatch(setFormData(FORM_KEY, {name: e.currentTarget.value}))}
            />
          </div>

          <div className={s.underline} style={{width: screen.width - 60}}/>

          <div className={s.inputTitle}>
            Email
          </div>

          <div>
            <input type="text"
            style={{paddingLeft: 25}}
            value={form.data.email}
            onChange={(e) => dispatch(setFormData(FORM_KEY, {email: e.currentTarget.value}))}
            />
          </div>

          <div className={s.underline} style={{width: screen.width - 60}}/>

          <div className={s.inputTitle}>
            Card Number
          </div>

          <div>
            <input type="text"
            style={{paddingLeft: 25}}
            value={form.data.card_number}
            onChange={(e) => dispatch(setFormData(FORM_KEY, {card_number: e.currentTarget.value}))}
            />
          </div>

          <div className={s.underline} style={{width: screen.width - 60}}/>

          <div className={s.inputTitle}>
            Exp Month
          </div>

          <div>
            <input type="text"
            style={{paddingLeft: 25}}
            value={form.data.exp_month}
            onChange={(e) => dispatch(setFormData(FORM_KEY, {exp_month: e.currentTarget.value}))}
            />
          </div>

          <div className={s.underline} style={{width: screen.width - 60}}/>

          <div className={s.inputTitle}>
            Exp Year
          </div>

          <div>
            <input type="text"
            style={{paddingLeft: 25}}
            value={form.data.exp_year}
            onChange={(e) => dispatch(setFormData(FORM_KEY, {exp_year: e.currentTarget.value}))}
            />
          </div>
          <div className={s.underline} style={{width: screen.width - 60}}/>
          <br/>
          {this.renderSaveCardOption()}

        </div>
      )
    }
  }

  renderSaveCardOption() {

    let {dispatch, session, form} = this.props
    if(session.access_token) {
      let checked_path = require('../../Assets/Images/checked-circle.png');
      let unchecked_path = require('../../Assets/Images/hollow-circle.png');
      return(
        <div className={s.card_wrapper}>
          <img className={s.card_image} src={(form.data.keep_card_on_file === true) ? checked_path : unchecked_path}/>
          <p className={s.text_inline} onClick={() => dispatch(setFormData(FORM_KEY, {keep_card_on_file: !form.data.keep_card_on_file}))}>
            Save card for future transactions
          </p>
        </div>
      );
    }
  }

  renderAddCardButton() {
    return(
      <div onClick={() => this.addCardButtonPressed('new')}>
        <div className={s.addWrapper}>
          <p className={s.addPlusSign}>+</p>
        </div>
        <p className={s.addText}>
          use a different credit card
        </p>
      </div>
    )
  }

  onCheckout() {
    this.props.dispatch(givingCheckoutSubmitted())
  }

  render() {
    let {form, dispatch} = this.props;
    return (
      <Layout title={'Checkout'} className={s.content}>
        <div style={{minHeight: screen.height - 120}}>
        {this.renderAmountHeader()}
        <br/>
        {this.renderCardList()}
        <br/>
        {this.renderAddCardButton()}
        <br/>
        {this.renderCreditCardForm()}

        <br/>
        </div>
        <RectButton bottom={25} backgroundColor='#35464f' onPress={() => this.onCheckout()} width={screen.width}
            height='50' title={'Submit'}></RectButton>
      </Layout>
    );
  }

}


function select(state) {
  return {
    session: state.session,
    form: state.forms[FORM_KEY],
    giving_categories: state.giving_categories,
    cart_line_items: state.cart.line_items,
    payment_methods: state.payment_methods,
    payment_methods_formatted: getPaymentMethodsFormatted(state)
  };
}

export default connect(select)(GivingCheckout);
