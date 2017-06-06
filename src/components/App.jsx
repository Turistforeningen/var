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
          <div className="container">
            <div className="logo">Den Norske Turistforening</div>
          </div>
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
