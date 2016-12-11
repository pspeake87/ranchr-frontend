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
import Dashboard from '../../components/Layout/Dashboard';
import s from './styles.scss';
import { title, html } from './index.md';
import _ from 'underscore';
import FontAwesome from 'react-fontawesome';
import RectButton from '../../components/RectButton';
import Link from '../../components/Link/Link';
import {setFormData} from '../../core/ActionCreators';
import history from '../../core/history';
import Spinner from 'react-activity/lib/Spinner';
import {getCartTotal} from '../../core/Selectors';
import moment from 'moment';
var LineChart = require("react-chartjs").Line;

import { Col, Row, FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';

const FORM_KEY = 'cattle';

class DashboardMain extends React.Component {

  constructor() {
     super();
     this.state = {

     };
   }

  componentDidMount() {
    document.title = "Ranchr Welcome";


  }

  componentWillReceiveProps(newProps) {

  }

  searchCattle(e) {
    let {form, dispatch} = this.props;
    console.log()
    alert("search for cattle number " + form.data.search)
    e.preventDefault();
  }

  renderWeatherIcon(icon) {

    if (icon === "rain") {
      return(
        <FontAwesome size='3x' name='sun-o' style={{color: 'yellow', paddingLeft: 10}} />
      );
    } else if (icon === "partly-cloudy-day") {
      return(
        <FontAwesome size='3x' name='cloud' style={{color: 'white', paddingLeft: 10}} />
      );
    } else {
      return(
        <FontAwesome size='3x' name='sun-o' style={{color: 'yellow', paddingLeft: 10}} />
      );
    }
  }

 renderForecast() {
   if (this.props.weather.has_data) {
     return (
       <Col xs={12}>
         {this.props.weather.data.daily.data.map((item, i) =>
           <div className="weatherCard">
            <p className="weather-temp">High {parseInt(item.temperatureMax)}°</p>
            {this.renderWeatherIcon(item.icon)}
            <p className="weather-temp">Low {parseInt(item.temperatureMin)}°</p>
            <p className="weather-temp">{moment.unix(item.time).format('ddd')}</p>
           </div>
         )}
       </Col>
     )
   } else {
     return (
       <Col xs={12} className="spinner">
        <FontAwesome size='3x' spin name='spinner' fixedWidth style={{color: 'black'}} />
       </Col>
     )
   }
 }

 renderCattleBox() {
   let {form, dispatch} = this.props;
    return (
      <Col className="container-fluid">
        <div className="inner-box">
        <h3>Cattle</h3>
        <form className="search-form" onSubmit={(e) => this.searchCattle(e)}>
          <FormGroup controlId={1}>
           <ControlLabel>Search by Id</ControlLabel>
           <FormControl
           placeholder="Enter ID"
           type="text"
           value={form.data.search}
           onChange={(e) => dispatch(setFormData(FORM_KEY, {search: e.currentTarget.value}))}
           />
         </FormGroup>
         <Button bsStyle="primary" type="submit">
            Search
         </Button>
        </form>
        </div>
      </Col>
    )
 }

 renderMarketBox() {
   let {form, dispatch} = this.props;
   var data = {
     labels: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
     datasets: [{
       label: 'apples',
       data: [12, 19, 3, 17, 6, 3, 7],
       backgroundColor: "rgba(153,255,51,0.4)"
     }, {
       label: 'oranges',
       data: [2, 29, 5, 5, 2, 3, 10],
       backgroundColor: "rgba(255,153,0,0.4)"
     }]
   }
    return (
      <Col className="container-fluid">
        <div className="inner-box">
        <h3>Markets</h3>
        <div className="search-form">
          <h4>Todays numbers</h4>
        </div>
        </div>
      </Col>
    )
 }



  render() {
    return (

      <Dashboard title={'Ranchr'}>
        <Row>
          <div className="weather">
            {this.renderForecast()}
          </div>
        </Row>
        <Row>
          <Col lg={5} md={6} xs={12} className="cattle-box">
            {this.renderCattleBox()}
          </Col>
          <Col lg={5} md={6} xs={12} className="market-box">
            {this.renderMarketBox()}
          </Col>
        </Row>
      </Dashboard>
    );
  }

}


function select(state) {
  return {
    weather: state.weather,
    form: state.forms[FORM_KEY],
  };
}

export default connect(select)(DashboardMain);
