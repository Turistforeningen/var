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

  if (!data.activities || !data.activities.length) {
    errors.activities = 'Du må velge minst en aktivitet';
  }

  if (!data.where || !data.where.length) {
    errors.where = 'Du må velge minst ett sted';
  }

  if (!data.phone) {
    errors.phone = 'Telefonnummer må fylles ut';
  }

  if (!data.email) {
    errors.email = 'Epost må fylles ut';
  }

  return {errors, warnings};
};

const validators = {
  registrationValidator,
};

export default validators;
