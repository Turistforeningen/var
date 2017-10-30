import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';
import moment from 'moment';
import Datetime from 'react-datetime';

import 'react-datetime/css/react-datetime.css';

import {setField, sendRegistration} from '../actions/index.js';

import Activity from './Activity.jsx';
import Field from './Field.jsx';

class Form extends Component {
  @autobind
  handleCommentsChange(e) {
    this.props.setField('comments', e.target.value);
  }

  @autobind
  handleRegisterClick(e) {
    this.props.sendRegistration(this.props.form);
  }

  @autobind
  handleDobChange(date) {
    this.props.setField(
      'dob',
      typeof date.format === 'function' ? date.format('YYYY-DD-MM') : date
    );
  }

  render() {
    const {app, form} = this.props;
    const isMobileDevice = /iPhone|iPad|iPod|Android/.test(navigator.userAgent);

    return (
      <form>
        {
          !!Object.keys(form.errors).length && form.validated &&
          <div className="message error">
            Før skjemaet kan sendes inn, må du rette opp i feltene som er
            markert med feil.
          </div>
        }
        <fieldset>
          <h2>Hva vil du gjøre?</h2>
          {form.data.activities && Object.keys(form.data.activities).map(id => (
            <Activity key={id} type={form.data.activities[id]} />
          ))}
          {
            form.errors.activities && form.validated &&
            <div className="validation error">{form.errors.activities}</div>
          }

          <h2>Kommentarer</h2>
          <div>
            <textarea onChange={this.handleCommentsChange}></textarea>
          </div>
        </fieldset>

        <fieldset>
          <h2>Litt om deg</h2>
          <Field
            label="Fornavn"
            name="firstName"
            value={form.firstName || ''}
            required
          />
          <Field
            label="Etternavn"
            name="lastName"
            value={form.lastName || ''}
            required
          />
          <Field
            label="Adresse"
            name="address"
            value={form.address || ''}
            required
          />
          <Field
            label="Postnummer"
            name="zipcode"
            value={form.zipcode || ''}
            required
          />
          <Field
            label="Sted"
            name="city"
            value={form.city || ''}
            required
          />
          <Field
            label="Fødselsdato"
            type={isMobileDevice ? 'date' : 'text'}
            name="dob"
            value={form.dob || ''}
            input={
              isMobileDevice ?
              null
              :
              <Datetime
                value={form.dob ? moment(form.dob).format('DD.MM.YYYY') : ''}
                dateFormat={'DD.MM.YYYY'}
                utc={true}
                timeFormat={false}
                locale="nb"
                onChange={this.handleDobChange}
                closeOnSelect={true}
              />
            }
          />
          <Field
            label="Telefon"
            type="tel"
            name="phone"
            value={form.phone || ''}
            required
          />
          <Field
            type="email"
            label="Epost"
            name="email"
            value={form.email || ''}
            required
          />
        </fieldset>
        {
          !!Object.keys(form.errors).length && form.validated &&
          <div className="message error">
            Før skjemaet kan sendes inn, må du rette opp i feltene som er markert
            med feil.
          </div>
        }

        {
          (() => {
            if (app.isSending) {
              return (
                <button type="button" disabled>Sender registrering...</button>
              );
            } else if (app.isSent !== true) {
              return (
                <button type="button" onClick={this.handleRegisterClick}>
                  Registrer meg
                </button>
              );
            }
          })()
        }

        {
          app.isSent &&
          <div className="message success">
            Skjemaet er sendt til DNT Oslo og Omegn for behandling.
          </div>
        }
        {
          form.error &&
          <div className="message error">
            Det skjedde en feil ved innsending av skjemaet.
          </div>
        }
      </form>
    );
  }
}

const mapStateToProps = state => ({
  activities: state.activities,
  app: state.app,
  form: state.form,
});

const mapDispatchToProps = dispatch => ({
  setField: function dispatchSetField(field, value) {
    dispatch(setField(field, value));
  },
  sendRegistration: function dispatchSendRegistration() {
    dispatch(sendRegistration());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Form);
