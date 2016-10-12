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
import RectButton from '../../components/RectButton';

import {getCurrentGivingCategory} from '../../core/Selectors';
import {setAmountForGivingCategory} from '../../core/ActionCreators';
import Link from '../../components/Link/Link';
import { title, html } from './index.md';

class GivingCategories extends React.Component {

  constructor() {
     super();
     this.state = {
      amount: ""
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

  renderImage() {
    if (this.props.current_giving_category.image_url) {
      if (this.props.current_giving_category.image_url == "/images/original/missing.png") {
        var img_path = require('../../Assets/Images/giving-category-placeholder.jpg')
        return (
          <div>
            <img className={s.background} src={img_path}/>
            <p className={s.title} >
              {this.props.current_giving_category.name}
            </p>
          </div>
        );
      } else {
        var img_path = this.props.current_giving_category.image_url
        return (
          <div>
            <img className={s.background} src={img_path}/>
            <p className={s.title} >
              {this.props.current_giving_category.name}
            </p>
          </div>
        );
      }
    }
  }

  render() {
    return (
      <Layout title={'Giving'} back_button={true} className={s.content}>
        <div style={{minHeight: screen.height - 125}}>
          {this.renderImage()}
          <div className={s.description}>{this.props.current_giving_category.description}</div>
          <p style={{paddingLeft: 15}}>amount:</p>
          <div>
            <div>
              <p style={{fontSize: 20, marginLeft: 25}} className={s.text_inline}>$</p>
              <input type="number"
              className={s.text_inline}
              style={{marginLeft: 10, fontSize: 20, width: screen.width - 75}}
              value={this.state.amount}
              placeholder={'0.00'}
              onChange={this.handleChange.bind(this)}
              />
            </div>
            <div className={s.underline} style={{width: screen.width - 60}}/>
          </div>
        </div>

        <RectButton bottom={0} backgroundColor='#35464f' onPress={() => this.onUpdateCart()} width={screen.width}
            height='50' title={'Update Cart'}></RectButton>
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
