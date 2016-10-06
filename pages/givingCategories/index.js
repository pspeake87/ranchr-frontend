/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { connect } from "react-redux";
import Layout from '../../components/Layout';
import s from './styles.css';
import {getCurrentGivingCategory} from '../../core/Selectors';
import {setAmountForGivingCategory} from '../../core/ActionCreators';
import Link from '../../components/Link/Link';
import { title, html } from './index.md';

class GivingCategories extends React.Component {

  constructor() {
     super();
     this.state = {
      amount: 0.00
    };
   }

   componentDidMount() {
     this.updateState(this.props);
   }

   componentWillReceiveProps(newProps) {
     if (newProps.cart != this.props.cart) {
       this.updateState(newProps);
     }
   }

   updateState(props) {
     console.log(props)
     this.setState({
       amount: props.cart.line_items[props.current_giving_category.id]
     });
   }

   onUpdateCart() {
     this.props.dispatch(setAmountForGivingCategory(this.props.current_giving_category.id, this.state.amount))
   }

   handleChange(event) {
    this.setState({amount: event.target.value});
  }

  render() {
    return (
      <Layout className={s.content}>
        <div>{this.props.current_giving_category.name}</div>
        <div>{this.props.current_giving_category.description}</div>
        <div>{this.state.amount || 0.00}</div>
        <input
        type="number"
        value={this.state.amount}
        onChange={this.handleChange.bind(this)}
        />
        <div onClick={() => this.onUpdateCart()}>
          Submit
        </div>
      </Layout>
    );
  }

}

function select(state) {
  return {
    current_giving_category: getCurrentGivingCategory(state),
    cart: state.cart
  };
}

export default connect(select)(GivingCategories);
