import fetch from 'isomorphic-fetch';
import Raven from 'raven-js';

import {registrationValidator} from '../validators/index.js';

export const REQUEST_ACTIVITIES = 'REQUEST_ACTIVITIES';
export function requestActivities(activities) {
  return {
    type: REQUEST_ACTIVITIES,
  };
}

export const RECEIVE_ACTIVITIES = 'RECEIVE_ACTIVITIES';
export function receiveActivities(activities) {
  return {
    type: RECEIVE_ACTIVITIES,
    activities: activities,
  };
}

export const RECEIVE_ERROR = 'RECEIVE_ERROR';
export function receiveError(error) {
  return {
    type: RECEIVE_ERROR,
    error: error,
  };
}

export function getActivities() {
  let statusCode;
  let serverResponse;

  return (dispatch, getState) => { // eslint-disable-line arrow-body-style
    dispatch(requestActivities());

    return fetch('/api/activity', {
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => {
        statusCode = response.status;
        serverResponse = response;

        return response.json();
      })
      .then((activities) => {
        if (statusCode >= 400 || ((activities.length === undefined) || (activities.length < 1))) {
          dispatch(receiveError('Det skjedde en feil ved henting av registrerinigsskjemaet. Prøv å oppdatere siden, og ta kontakt med oss på hjelp@dnt.no dersom feilen vedvarer.')); // eslint-disable-line max-len

          Raven.captureException('Feil ved henting av aktiviteter', {
            extra: {response: serverResponse},
          });
        } else {
          dispatch(receiveActivities(activities));
        }
      });
  };
}

export const TOGGLE_ACTIVITY = 'TOGGLE_ACTIVITY';
export function toggleActivity(activity, isSelected) {
  return {
    type: TOGGLE_ACTIVITY,
    activity: activity,
    isSelected: isSelected,
  };
}

export const TOGGLE_WHERE = 'TOGGLE_WHERE';
export function toggleWhere(activity, where, isSelected) {
  return {
    type: TOGGLE_WHERE,
    activity: activity,
    where: where,
    isSelected: isSelected,
  };
}

export const SET_FIELD = 'SET_FIELD';
export function setField(field, value) {
  return {
    type: SET_FIELD,
    field: field,
    value: value,
  };
}

export const SET_FORM_VALIDATION = 'SET_FORM_VALIDATION';
export function setFormValidation(errors, warnings) {
  return {
    type: SET_FORM_VALIDATION,
    errors: errors,
    warnings: warnings,
  };
}

export function validateForm(form) {
  return (dispatch, getState) => {
    const state = getState();
    const data = state.form.data;
    const {errors, warnings} = registrationValidator(data);

    dispatch(setFormValidation(errors, warnings));

    return new Promise((resolve, reject) => {
      if (Object.keys(errors).length > 0) {
        reject({message: 'Form contains validation errors', errors: errors});
      } else {
        resolve(form);
      }
    });
  };
}

export const RECEIVE_SEND = 'RECEIVE_SEND';
export function receiveSend(err) {
  return {
    type: RECEIVE_SEND,
    isSent: !err,
    isSending: false,
    error: err ? err.message : undefined,
  };
}

export const REQUEST_SEND = 'REQUEST_SEND';
export function requestSend() {
  return {
    type: REQUEST_SEND,
    isSending: true,
  };
}

export function sendRegistration(form) {
  return (dispatch, getState) => {
    const state = getState();
    const data = state.form.data;

    return dispatch(validateForm(data)).then(() => {
      const crmData = {
        Comments: data.comments,
        UnionId: '2',
        CaseTypeCode: 2,
        Activity: Object.keys(data.activities)
          .filter(id => (data.activities[id].isSelected === true))
          .map(id => (
            {
              CrmId: id,
              Name: data.activities[id].name,
              Place: Object.keys(data.activities[id].where || {})
                .filter(where => (
                  data.activities[id].where[where].isSelected === true
                ))
                .map(where => (
                  data.activities[id].where[where].name
                ))
                .join(', '),
            }
          )),
        UserInfo: {
          FirstName: data.firstName,
          LastName: data.lastName,
          AddressLine1: data.address,
          PostalCode: data.zipcode,
          City: data.city,
          MobilePhone: data.phone,
          Email: data.email,
          DateOfBirth: data.dob || '',
        },
      };

      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(crmData),
      };

      dispatch(requestSend());

      return fetch('/api/incident', options)
        .then((result) => {
          if (result.status >= 400) {
            dispatch(receiveSend(new Error('Det skjedde en feil ved innsending av skjemaet.')));
          } else {
            dispatch(receiveSend());
          }
        });
    }).catch((err) => {
      console.warn('Did not send registration, due to validation errors.'); // eslint-disable-line
    });
  };
}
