import {combineReducers} from 'redux';
import {registrationValidator} from '../validators/index.js';
import {
  RECEIVE_SEND,
  REQUEST_SEND,
  SET_FIELD,
  SET_FORM_VALIDATION,
  TOGGLE_ACTIVITY,
  TOGGLE_WHERE,
} from '../actions/index.js';

const activityOptions = [
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
    label: 'Annet – spesifiser i kommentarfeltet',
    name: 'annet',
    description: 'Lorem',
  },
];

const whereOptions = [
  {
    label: 'I nærmiljøet',
    name: 'nærmiljø',
  },
  {
    label: 'I min region / mitt fylke',
    name: 'regionfylke',
  },
  {
    label: 'På fjellet',
    name: 'fjellet',
  },
];

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

function activitiesReducer(state = activityOptions.reduce((acc, curr) => ({
  ...acc,
  [curr.name]: {
    isSelected: false,
    where: whereOptions.reduce((acc2, curr2) => (
      {
        ...acc2,
        [curr2.name]: false,
      }
    ), {}),
  }}), {}), action) {
  switch (action.type) {
    case TOGGLE_ACTIVITY:
      return {
        ...state,
        [action.activity]: {
          ...state[action.activity],
          isSelected: action.isSelected,
        },
      };

    case TOGGLE_WHERE:
      return {
        ...state,
        [action.activity]: {
          ...state[action.activity],
          where: {
            ...state[action.activity].where,
            [action.where]: action.isSelected,
          },
        },
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
  activities: activitiesReducer,
  form: formReducer,
});

export default rootReducer;
