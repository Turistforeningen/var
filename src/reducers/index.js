import {combineReducers} from 'redux';
import {registrationValidator} from '../validators/index.js';

import {RECEIVE_SEND, REQUEST_SEND, SET_FIELD, SET_FORM_VALIDATION} from '../actions/index.js';

function appReducer(state = {isSending: false, isSent: false}, action) {
  switch (action.type) {
    case REQUEST_SEND:
      return {
        ...state,
        isSending: true,
      };

    case RECEIVE_SEND:
      return {
        ...state,
        isSent: true,
        isSending: false,
      };

    default:
      return {
        ...state,
      };
  }
}

function formReducer(state = {data: {}, warnings: {}, errors: {}, touched: {}}, action) {
  const data = {
    ...state.data,
    [action.field]: action.value,
  };

  switch (action.type) {
    case SET_FIELD:
      return {
        ...state,
        data: data,
        errors: registrationValidator(data).errors,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };

    case SET_FORM_VALIDATION:
      return {
        ...state,
        data: data,
        errors: registrationValidator(data).errors,
        validated: true,
      };

    default:
      return {...state};
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  form: formReducer,
});

export default rootReducer;
