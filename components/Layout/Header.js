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
import Navigation from './Navigation';
import Link from '../Link';
import s from './Header.css';
import history from '../../core/history';

class Header extends React.Component {

  onBackArrow() {
    history.goBack();
  }

  renderBackArrow() {
    let path_back = require('../../Assets/Images/back_chevron.png')
    if(this.props.back_button) {
      return(
        <img className={s.back_arrow} src={path_back} onClick={this.onBackArrow}/>
      )
    }
  }

  render() {
    let path_bg = require('../../Assets/Images/Bitmapblurred-bg-sm.png')
      return (
        <div>
          <img className={s.background} src={path_bg} />
          {this.renderBackArrow()}
          <span className={s.title}>
            <p className={s.title_text}>{this.props.title}</p>
          </span>
        </div>
      );

  }

}

export default Header;
