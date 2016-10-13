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
import {render} from 'react-dom';
import AuthenticatedAPI from '../../core/AuthenticatedAPI';
import { connect } from "react-redux";
import Layout from '../../components/Layout';
import s from './styles.css';
import { title, html } from './index.md';
import _ from 'underscore';
import RectButton from '../../components/RectButton';
import Link from '../../components/Link/Link';
import {setAmountForGivingCategory, goToGivingCategory, setToken} from '../../core/ActionCreators';
import history from '../../core/history';
import Spinner from 'react-activity/lib/Spinner';
import {getCartTotal} from '../../core/Selectors';


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



  handleClick(id) {
    this.props.dispatch(goToGivingCategory(id + 1))
    history.push("/givingCategories");
  }

  renderCategoryList() {
    var colored_text = {
      color: '#39A2F3',
       fontWeight: '600'
    }

    return (
      <div style={{width: screen.width}}>
        {this.state.categories.map((item, i) =>
          <div style={{width: screen.width, height: 60, backgroundColor: (parseFloat(item.amount) > 0) ? '#F0F3F6' : 'white'}} className={s.category_wrapper} onClick={() => this.handleClick(i)}>
            <p style={{width: screen.width - 160, paddingLeft: 20}} className={s.row_text}>
              {item.name}
            </p>
            <p style={{width: 90, textAlign: 'right', paddingRight: 20, color: (parseFloat(item.amount) > 0) ? '#39A2F3' : ''}} className={s.row_text}>${parseFloat(item.amount).toFixed(2)}</p>
            <div style={{width: 30}} className={s.row_text}>
              <div className={s.triangle}></div>
            </div>
          </div>
        )}
      </div>
    );

  }

  renderTotalRow() {
    return(
      <div style={{width: screen.width}}>
          <div style={{width: screen.width, height: 60}} className={s.category_wrapper}>
            <p style={{width: screen.width - 180, paddingLeft: 20}} className={s.row_text}></p>
            <p style={{width: 40}} className={s.row_text}>Total:</p>
            <p style={{width: 100, color: '#39A2F3',fontSize: 16, fontWeight: '600', textAlign: 'right', paddingRight: 20}} className={s.row_text}>${this.state.total.toFixed(2)}</p>
          </div>
      </div>
    )
  }

  checkout() {

    if(this.props.cart_total == 0) {
      alert("Please enter an amount for at least one category before checking out");
    } else {
      history.push("/givingCheckout");
    }
  }


  render() {
    if (this.props.giving_categories.has_data) {
      return (
        <Layout title={'Giving'} className={s.content}>
          <div style={{minHeight: screen.height - 110}}>
            {this.renderCategoryList()}
            {this.renderTotalRow()}
          </div>
          <RectButton bottom={0} backgroundColor='#35464f' onPress={() => this.checkout()} width={screen.width}
              height='50' title={'Submit'}></RectButton>
        </Layout>
      );
    } else {
      return (
        <Spinner color="#727981" size={32} speed={1} />
      );
    }
  }

}


function select(state) {
  return {
    giving_categories: state.giving_categories,
    cart_line_items: state.cart.line_items,
    cart_total: getCartTotal(state)
  };
}

export default connect(select)(Giving);
