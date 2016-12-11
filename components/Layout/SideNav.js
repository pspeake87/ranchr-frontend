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
import s from './SideNav.scss';
import history from '../../core/history';
import FontAwesome from 'react-fontawesome';
import { Col, Nav, NavItem, NavDropdown, MenuItem, Collapse, Well } from 'react-bootstrap';

class SideNav extends React.Component {
  constructor() {
     super();
     this.state = {
       metric_item: false
     };
   }

   handleSelect(eventKey) {
    this.setState({ cattle_item: false, metric_item: false })
    if (eventKey == "metric_item") {
      this.setState({ metric_item: !this.state.metric_item })
    } else {
      history.push(eventKey)
    }



  }

  render() {
      return (
        <div>
          <div className="side">
            <Col bsStyle="Container">
              <Nav stacked onSelect={this.handleSelect.bind(this)}>
                <NavItem eventKey={"/"}><FontAwesome fixedWidth name='dashboard' />Dashboard</NavItem>
                <NavItem eventKey={"/cattle_management"}><FontAwesome fixedWidth name='bell' />Cattle</NavItem>
                <NavItem eventKey={'/fields'}><FontAwesome fixedWidth name='map-marker' />Fields</NavItem>
                <NavItem eventKey={'/markets'}><FontAwesome fixedWidth name='line-chart' />Markets</NavItem>
                <NavItem eventKey={'metric_item'}><FontAwesome fixedWidth name='bar-chart' />Metrics</NavItem>
                <Collapse in={this.state.metric_item}>
                  <div>
                    <Well>
                      <Nav stacked onSelect={this.handleSelect.bind(this)}>
                        <NavItem eventKey={'/metrics/cattle'}>Cattle</NavItem>
                        <NavItem eventKey={'/metrics/feed'}>Feed</NavItem>
                        <NavItem eventKey={'/metrics/revenue'}>Revenue</NavItem>
                      </Nav>
                    </Well>
                  </div>
                </Collapse>
                <NavItem eventKey={'/inventory'}><FontAwesome fixedWidth name='check-square-o' />Inventory</NavItem>
                <hr/>
                <NavItem eventKey={'/settings'}><FontAwesome fixedWidth name='cog' />Settings</NavItem>
                <NavItem eventKey={12}><FontAwesome fixedWidth name='sign-out' />Logout</NavItem>

              </Nav>
            </Col>
          </div>
        </div>
      );

  }

}

export default SideNav;
