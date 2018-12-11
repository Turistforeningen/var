import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './Form.jsx';

class Registration extends Component {
  render() {
    return (
      <div className="container">
        <h1>Bli frivillig</h1>
        <p>
          Vil du være frivillig i DNT? Mesteparten av vårt tilbud{' '}
          gjennomføres takket være dugnadsinnsats – og vi vil gjerne ha{' '}
          din hjelp!
        </p>
        <div className="message info">
          Dette registreringsskjemaet er under uttesting og det kan derfor oppstå feil.
        </div>
        {
          this.props.app.isFetching &&
          <div className="message info">
            Henter skjema...
          </div>
        }
        {this.props.app.isFetched === false && this.props.app.error && <div className="message error">{this.props.app.error}</div>}
        {this.props.app.isFetched === true && <Form />}
      </div>
    );
  }
}


const mapStateToProps = state => ({
  app: state.app,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
