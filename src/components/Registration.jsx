import React, {Component} from 'react';
import {connect} from 'react-redux';

import Form from './Form.jsx';

class Registration extends Component {
  render() {
    return (
      <div>
        <h1>Bli frivillig</h1>
        <p>Her kan vi skrive en veldig bra tekst om hva det kan bety å være frivillig i DNT-systemet.</p>
        <p>Fyll ut skjemaet for å bli frivillig.</p>
        <Form />
      </div>
    );
  }
}


const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
