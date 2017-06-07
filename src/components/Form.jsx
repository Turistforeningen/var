import React, {Component} from 'react';
import {connect} from 'react-redux';
import {autobind} from 'core-decorators';

import {setField, sendRegistration} from '../actions/index.js';

import Field from './Field.jsx';

const types = [
  {
    label: 'Hyttedugnad',
    name: 'hyttedugnad',
    description: 'Lorem',
  },
  {
    label: 'Hyttevakt',
    name: 'hyttevakt',
    description: 'Lorem',
  },
  {
    label: 'Stimerking',
    name: 'stimerking',
    description: 'Lorem',
  },
  {
    label: 'Turledelse og -instruksjon',
    name: 'turledelse-og-instruksjon',
    description: 'Lorem',
  },
  {
    label: 'Frivillig på arrangement',
    name: 'frivillig-pa-arrangement',
    description: 'Lorem',
  },
  {
    label: 'Informasjons- og kommunikasjonsarbeid',
    name: 'info-komm-arbeid',
    description: 'Lorem',
  },
  {
    label: 'Verv og organisasjonsarbeid',
    name: 'verv-org-arbeid',
    description: 'Lorem',
  },
  {
    label: 'Annet',
    name: 'annet',
    description: 'Lorem',
  },
];

class Form extends Component {
  @autobind
  handleActivitiesChange(e) {
    const activities = [...this.props.form.data.activities || []];

    if (e.target.checked) {
      this.props.setField('activities', [...activities, e.target.value]);
    } else {
      this.props.setField('activities', activities.filter(activity => activity !== e.target.value));
    }
  }

  @autobind
  handleWhereChange(e) {
    const where = [...this.props.form.data.where || []];

    if (e.target.checked) {
      this.props.setField('where', [...where, e.target.value]);
    } else {
      this.props.setField('where', where.filter(place => place !== e.target.value));
    }
  }

  @autobind
  handleCommentsChange(e) {
    this.props.setField('comments', e.target.value);
  }

  @autobind
  handleRegisterClick(e) {
    this.props.sendRegistration(this.props.form);
  }

  render() {
    const {form} = this.props;

    return (
      <form>
        <fieldset>
          <h2>Navn og adresse</h2>
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
        </fieldset>

        <fieldset>
          <h2>Hva vil du gjøre?</h2>
          {types.map(type => (
            <div className="checkbox" key={type.name}>
              <label>
                <input
                  type="checkbox"
                  name="type"
                  value={type.name}
                  onChange={this.handleActivitiesChange}
                  checked={!!(this.props.form.data.activities || [])
                    .find(activity => activity === type.name)}
                />
                {type.label}
              </label>
            </div>
          ))}

          <h2>Hvor ønsker du å gjøre en innsats?</h2>
          <div className="checkbox">
            <input
              type="checkbox"
              name="where"
              value="nærmiljø"
              onChange={this.handleWhereChange}
              checked={!!(this.props.form.data.where || [])
                .find(place => place === 'nærmiljø')}
            />
            <label>I mitt nærmiljø</label>
          </div>
          <div className="checkbox">
            <input
              type="checkbox"
              name="where"
              value="fjellet"
              onChange={this.handleWhereChange}
              checked={!!(this.props.form.data.where || [])
                .find(place => place === 'fjellet')}
            />
            <label>På fjellet</label>
          </div>

          <h2>Kommentarer</h2>
          <div>
            <textarea onChange={this.handleCommentsChange}></textarea>
          </div>
        </fieldset>

        <fieldset>
          <h2>Kontaktinformasjon</h2>
          <Field
            label="Fødselsdato"
            name="dob"
            value={form.dob || ''}
          />
          <Field
            label="Telefon"
            name="phone"
            value={form.phone || ''}
            required
          />
          <Field
            label="Epost"
            name="email"
            value={form.email || ''}
            required
          />
        </fieldset>
        {
          !!Object.keys(form.errors).length &&
          <div>
            Før skjemaet kan sendes inn, må du rette opp i feltene som er markert
            med feil
          </div>
        }

        <button type="button" onClick={this.handleRegisterClick}>Registrer meg</button>
      </form>
    );
  }
}

const mapStateToProps = state => ({
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
