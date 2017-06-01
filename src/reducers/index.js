import {combineReducers} from 'redux';
import {registrationValidator} from '../validators/index.js';

import {RECEIVE_SEND, REQUEST_SEND, SET_FIELD} from '../actions/index.js';

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
        types: [
          {
            name: 'Hyttedugnad',
            description: 'Lorem',
            selected: false,
          },
          {
            name: 'Hyttevakt',
            description: 'Lorem',
            selected: false,
          }
        ]
      };
  }
}

function formReducer(state = {warnings: {}, errors: {}, touched: {}}, action) {
  switch (action.type) {
    case SET_FIELD:
      const data = {
        ...state.data,
        [action.field]: action.value,
      };

      return {
        ...state,
        data: data,
        errors: registrationValidator(data).errors,
        touched: {
          ...state.touched,
          [action.field]: true,
        },
      };

    case 'ADD_ACTIVITY':
      return {
        ...state,
        activities: [...state.activities, action.activity]
      };

    case 'REMOVE_ACTIVITY':
      return {
        ...state,
        activities: state.activities.filter(activity => activity !== action.activity),
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
