import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';

import {setField, sendRegistration} from '../actions/index.js';

import Field from './Field.jsx';

class Form extends Component {
  @autobind
  handleFirstNameChange(e) {
    this.props.setField('firstName', e.target.value);
  }

  @autobind
  handleLastNameChange(e) {
    this.props.setField('lastName', e.target.value);
  }

  @autobind
  handleAddressChange(e) {
    this.props.setField('address', e.target.value);
  }

  @autobind
  handleRegisterClick(e) {
    this.props.sendRegistration();
  }

  render() {
    const {form} = this.props;

    return (
      <form>
        <fieldset>
          <legend>Navn og adresse</legend>
          <Field
            label="Fornavn"
            name="firstName"
            value={form.firstName || ''}
          />
          <Field
            label="Etternavn"
            name="lastName"
            value={form.lastName || ''}
          />
          <div className="required">
            <label>
              Adresse
            </label>
            <input value={form.address || ''} onChange={this.handleAddressChange} />
          </div>
          <div className="required">
            <label>
              Postnummer
            </label>
            <input />
          </div>
          <div className="required">
            <label>
              Sted
            </label>
            <input />
          </div>
        </fieldset>

        <fieldset>
          <legend>Hva vil du gjøre?</legend>
          <div>
            <input type="checkbox" />
            <label>
              Hyttedugnad
            </label>
          </div>
          <div>
            <input type="checkbox" />
            <label>
              Hyttevakt
            </label>
          </div>
          <div>
            <input type="checkbox" />
            <label>Annet</label>
          </div>
          <div>
            <label>Kommentar</label>
            <textarea></textarea>
          </div>
        </fieldset>

        <fieldset>
          <legend>Ekstra informasjon</legend>
          <div className="required">
            <label>
              Fødselsdato
            </label>
            <input value={form.dob || ''} onChange={this.handleDobChange} />
          </div>
          <div className="required">
            <label>
              Telefon
            </label>
            <input value={form.phone || ''} onChange={this.handlePhoneChange} />
          </div>
          <div className="required">
            <label>
              Epost
            </label>
            <input value={form.email || ''} onChange={this.handlePhoneChange} />
          </div>
        </fieldset>

        <button type="button" onClick={this.handleRegisterClick}>Registrer meg</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
  form: state.form,
});

const mapDispatchToProps = dispatch => ({
  setField: function(field, value) {
    dispatch(setField(field, value));
  },
  sendRegistration: function() {
    dispatch(sendRegistration());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
