import React, {Component} from 'react';
import {connect} from 'react-redux';
import {BrowserRouter as Switch, Route} from 'react-router-dom';

import Registration from './Registration.jsx';

require('../styles/app.scss');

class App extends Component {
  render() {
    return (
      <Switch basename="/">
        <div>
          <header>
            <div className="container">
              <a href="https://www.dntoslo.no" className="logo">DNT Oslo og Omegn</a>
            </div>
          </header>
          <Route exact path="/" component={Registration} />
        </div>
      </Switch>
    );
  }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
