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
          din hjelp! Som frivillig kan du bidra med mye; hyttedugnad,{' '}
          merking av stier, turledelse og vertskap på  møter, foredrag{' '}
          og utendørsarrangementer. Våre styrer og utvalg er også drevet{' '}
          av frivillige. For mer informasjon om aktivitetene våre, se under.
        </p>
        <p>
          Fyll ut kontaktinformasjon og ønsker i skjemaet under, så tar vi{' '}
          kontakt med deg. Alle felt merket med{' '}
          <span className="required">*</span>{' '}
          må fylles ut.
        </p>
        <p>
          Velkommen skal du være!
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
