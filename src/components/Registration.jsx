import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './Form.jsx';

class Registration extends Component {
  render() {
    return (
      <div className="container">
        <h1>Bli frivillig</h1>
        <p>
          Vil du være frivillig i DNT? Da har du mange muligheter! Som frivillig hos oss
          kan du være med på mye: hyttedugnader, merking og vedlikehold av stier i fjellet
          og nærområdene, vertskap under møter, foredrag og store utendørs arrangementer,
          samt turledelse i fjellet, nærområdene eller på vannet. Du kan også bidra som
          frivillig i våre styrer og utvalg, og dermed påvirke hva DNT som forening skal
          satse på og prioritere.
        </p>
        <p>
          Mesteparten av vårt tilbud driftes av frivillige – og vi vil gjerne ha din hjelp!
          Fyll ut kontaktinformasjon og ønsker i skjemaet under, så tar vi kontakt med deg.
          Velkommen skal du være!
        </p>
        <p>
          Fyll ut skjemaet for å bli frivillig for forening DNT Oslo og Omegn. Alle felt merket med
          <span className="required"> *</span> må fylles ut.
        </p>
        {this.props.app.isFetching === false && <Form />}
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
