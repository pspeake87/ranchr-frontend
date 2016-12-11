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
import cx from 'classnames';
import Header from './Header';
import SideNav from './SideNav';

import s from './Dashboard.css';

import { Col, Nav, NavItem, MenuItem, NavDropdown, Navbar } from 'react-bootstrap';


class Dashboard extends React.Component {

  static propTypes = {
    className: PropTypes.string,
  };

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
       <div ref={node => (this.root = node)}>
        <Col bsStyle="Container">
          <Header/>
          <SideNav/>
          <div {...this.props} className={s.content}>

          </div>
        </Col>
      </div>
    );
  }
}

export default Dashboard;
