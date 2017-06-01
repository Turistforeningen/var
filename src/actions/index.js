export const SET_FIELD = 'SET_FIELD';
export function setField(field, value) {
  return {
    type: SET_FIELD,
    field: field,
    value: value,
  };
}

export const RECEIVE_SEND = 'RECEIVE_SEND';
export function receiveSend() {
  return {
    type: RECEIVE_SEND,
  };
};

export const REQUEST_SEND = 'REQUEST_SEND';
export function requestSend() {
  return {
    type: REQUEST_SEND,
  };
};

export function sendRegistration(form) {
  return (dispatch, getState) => {
    const options = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    };

    return fetch('https://sjekkut.app.dnt.no/api/v3/', options)
      .then((result) => {
        dispatch(receiveSend());
      });
  };
}
