import {combineReducers} from 'redux';
import {registrationValidator} from '../validators/index.js';
import {
  REQUEST_ACTIVITIES,
  RECEIVE_ACTIVITIES,
  RECEIVE_SEND,
  REQUEST_SEND,
  RECEIVE_ERROR,
  SET_FIELD,
  SET_FORM_VALIDATION,
  TOGGLE_ACTIVITY,
  TOGGLE_WHERE,
} from '../actions/index.js';

const whereOptions = [
  {
    id: 'nærmiljø',
    name: 'I nærmiljøet',
  },
  {
    id: 'regionfylke',
    name: 'I min region / mitt fylke',
  },
  {
    id: 'fjellet',
    name: 'På fjellet',
  },
];

function appReducer(state = {
  isFetching: false,
  isFetched: false,
  isSending: false,
  isSent: false,
}, action) {
  switch (action.type) {
    case REQUEST_ACTIVITIES:
      return {
        ...state,
        isFetching: true,
      };
    case RECEIVE_ACTIVITIES:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
      };
    case REQUEST_SEND:
      return {
        ...state,
        isSending: action.isSending,
      };

    case RECEIVE_SEND:
      return {
        ...state,
        isSent: action.isSent,
        isSending: action.isSending,
      };

    case RECEIVE_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: action.error,
      };

    default:
      return {
        ...state,
      };
  }
}

function activitiesReducer(state, action) {
  switch (action.type) {
    case RECEIVE_ACTIVITIES:
      return {
        ...state,
        ...action.activities.reduce((acc, curr) => ({
          ...acc,
          [curr.CrmId]: {
            id: curr.CrmId,
            name: curr.Name,
            isSelected: false,
            description: curr.Description,
            where: whereOptions.reduce((acc2, curr2) => (
              {
                ...acc2,
                [curr2.id]: {...curr2, isSelected: false},
              }
            ), {}),
          }}), {}),
      };
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
            [action.where]: {
              ...state[action.activity].where[action.where],
              isSelected: action.isSelected,
            },
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
  switch (action.type) {
    case SET_FIELD: {
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
    }

    case SET_FORM_VALIDATION: {
      const data = {
        ...state.data,
        [action.field]: action.value,
      };

      return {
        ...state,
        data: data,
        errors: registrationValidator(data).errors,
        validated: true,
      };
    }

    case RECEIVE_ACTIVITIES:
      return {
        ...state,
        data: {
          ...state.data,
          activities: activitiesReducer(state.data.activities, action),
        },
      };

    case TOGGLE_ACTIVITY:
    case TOGGLE_WHERE: {
      const data = {
        ...state.data,
        activities: activitiesReducer(state.data.activities, action),
      };

      return {
        ...state,
        data: data,
        errors: registrationValidator(data).errors,
        touched: {
          ...state.touched,
          activities: true,
        },
      };
    }

    case RECEIVE_SEND:
      if (action.error) {
        return {
          ...state,
          error: action.error,
        };
      }
      return {...state};

    default:
      return {...state};
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  form: formReducer,
});

export default rootReducer;
