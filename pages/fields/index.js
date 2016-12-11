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
import Dashboard from '../../components/Layout/Dashboard';
import s from './styles.css';
import RectButton from '../../components/RectButton';
import history from '../../core/history';
import {getCurrentGivingCategory} from '../../core/Selectors';
import {setAmountForGivingCategory} from '../../core/ActionCreators';
import Link from '../../components/Link/Link';
import { title, html } from './index.md';
const FORM_KEY = 'cattle';

class Fields extends React.Component {

  constructor() {
     super();
     this.state = {

    };
   }

   componentDidMount() {
     console.log(history)
   }

   componentWillReceiveProps(newProps) {

   }



   handleChange(event) {
    this.setState({amount: event.target.value});
  }



  render() {
    return (
      <Dashboard title={'Ranchr'} className={s.content}>
        <h3>Fields</h3>
      </Dashboard>
    );
  }

}

function select(state) {
  return {
    form: state.forms[FORM_KEY],
  };
}

export default connect(select)(Fields);
