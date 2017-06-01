export const registrationValidator = (data) => {
  const errors = {};
  const warnings = {};

  Object.keys(data).forEach((field) => {
    switch (field) {
      case 'firstName':
        if (!data.firstName) {
          errors.firstName = 'Fornavn er påkrevd';
        }
        break;
      case 'lastName':
        if (!data.lastName) {
          errors.lastName = 'Etternavn er påkrevd';
        }
        break;
      default:
        break;
    }
  });

  return {errors, warnings};
};

const validators = {
  registrationValidator,
};

export default validators;
