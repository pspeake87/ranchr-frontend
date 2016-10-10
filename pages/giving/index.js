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
import { connect } from "react-redux";
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import _ from 'underscore';
import Link from '../../components/Link/Link';
import {setAmountForGivingCategory, goToGivingCategory, setToken} from '../../core/ActionCreators';
import history from '../../core/history';



class Giving extends React.Component {

  constructor() {
     super();
     this.state = {
       total: 0,
       categories: []
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

    var items = [];
    var sum = 0
    _.each(props.giving_categories.data, (giving_category) => {
      items.push({
        id: giving_category.id,
        name: giving_category.name,
        amount: props.cart_line_items[giving_category.id] || 0.00
      });

      sum = sum + (parseFloat(props.cart_line_items[giving_category.id]) || 0.00)
    });

    this.setState({
      total: sum,
      categories: items
    });

  }

  handleClick(item) {
    this.props.dispatch(goToGivingCategory(item.id))
  }

  renderList() {
    return (
      <ol>
        {this.state.categories.map((item, i) =>
          <li key={i}>
            <Link to="/givingCategories" onClick={() => this.handleClick(item)}>
              {item.name}   ${parseInt(item.amount).toFixed(2)}
            </Link>
          </li>
        )}
      </ol>
    );

  }


  render() {
    return (
      <Layout title={'Giving'} className={s.content}>
        {this.renderList()}
        <p>
          <br /><br />
        </p>
        <div>Total: ${this.state.total.toFixed(2)}</div>
        <br />

        <Link to="/givingCheckout">
          Submit
        </Link>
      </Layout>
    );
  }

}


function select(state) {
  return {
    giving_categories: state.giving_categories,
    cart_line_items: state.cart.line_items
  };
}

export default connect(select)(Giving);
