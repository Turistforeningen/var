export const registrationValidator = (data) => {
  const errors = {};
  const warnings = {};

  if (!data.firstName) {
    errors.firstName = 'Fornavn må fylles ut';
  }

  if (!data.lastName) {
    errors.lastName = 'Etternavn må fylles ut';
  }

  if (!data.zipcode) {
    errors.zipcode = 'Postnummer må fylles ut';
  }

  if (!data.city) {
    errors.city = 'Sted må fylles ut';
  }

  const selectedActivities = Object.keys(data.activities || {}).filter(id => (
    data.activities[id].isSelected === true
  ));

  if (selectedActivities.length < 1) {
    errors.activities = 'Du må velge minst en aktivitet';
  }

  errors.where = selectedActivities.reduce((acc, curr) => {
    if (Object.keys(data.activities[curr].where).filter(id => (
      data.activities[curr].where[id].isSelected === true
    )) < 1) {
      return {...acc, [curr]: 'Du må velge minst ett sted'};
    }
    return acc;
  }, {});

  if (Object.keys(errors.where).length === 0) {
    delete errors.where;
  }

  if (!data.phone) {
    errors.phone = 'Telefonnummer må fylles ut';
  }

  if (!data.email) {
    errors.email = 'Epost må fylles ut';
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Epost må være en gyldig epostadresse';
  }

  return {errors, warnings};
};

const validators = {
  registrationValidator,
};

export default validators;
