import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import * as layouts from './layouts';

export default class App extends Component {
  render() {
    return (
      <div className="app">
        <div className="app-header">
          <img src={logo} className="app-logo" alt="logo" />
          <h2>Some Components with React and RxJs</h2>
        </div>
        <BrowserRouter>
          <Switch>
            <Switch>
              <Route path={`/${layouts.ReactiveInputLayout.path}`} component={layouts.ReactiveInputLayout}></Route>
              <Route component={layouts.ReactiveInputLayout}></Route>
            </Switch>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
