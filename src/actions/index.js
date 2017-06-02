import {registrationValidator} from '../validators/index.js';

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
export function receiveSend() {
  return {
    type: RECEIVE_SEND,
  };
}

export const REQUEST_SEND = 'REQUEST_SEND';
export function requestSend() {
  return {
    type: REQUEST_SEND,
  };
}

export function sendRegistration(form) {
  return (dispatch, getState) => {
    const state = getState();
    const data = state.form.data;

    return dispatch(validateForm(data)).then(() => {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      };

      return fetch('/registrer', options)
        .then((result) => {
          dispatch(receiveSend());
        });
    }).catch((err) => {
      console.warn('Did not send registration, due to validation errors.');
    });
  };
}
