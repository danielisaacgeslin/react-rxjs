import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import * as layouts from './layouts';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="app">
          <div className="app-header">
            <div className="container">
              <div className="row">
                <div className="col">
                  <h2 className="app-title">
                    <img src={logo} className="app-logo" alt="logo" />
                    Some Components with React and RxJs
                  </h2>
                </div>
              </div>
            </div>
          </div>
          <nav className="navbar navbar-toggleable-md navbar-dark bg-faded container">
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={`/${layouts.DTInputLayout.path}`}>Input</Link>
                </li>
                <li>
                  <Link className="nav-link" to={`/${layouts.DTCarrouselLayout.path}`}>Carrousel</Link>
                </li>
                <li>
                  <Link className="nav-link" to={`/${layouts.DTSidebarLayout.path}`}>Sidebar</Link>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Switch>
              <Route path={`/${layouts.DTInputLayout.path}`} component={layouts.DTInputLayout}></Route>
              <Route path={`/${layouts.DTCarrouselLayout.path}`} component={layouts.DTCarrouselLayout}></Route>
              <Route path={`/${layouts.DTSidebarLayout.path}`} component={layouts.DTSidebarLayout}></Route>
              <Route component={layouts.DTInputLayout}></Route>
            </Switch>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
