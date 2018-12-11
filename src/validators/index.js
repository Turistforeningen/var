export const registrationValidator = (data) => {
  const errors = {};
  const warnings = {};

  if (!data.firstName) {
    errors.firstName = 'Fornavn må fylles ut';
  }

  if (!data.lastName) {
    errors.lastName = 'Etternavn må fylles ut';
  }

  if (!data.address) {
    errors.address = 'Adresse må fylles ut';
  }

  if (!data.zipcode) {
    errors.zipcode = 'Postnummer må fylles ut';
  }

  if (!data.city) {
    errors.city = 'Sted må fylles ut';
  }

  if (data.dob && /\d{4}-\d{2}-\d{2}/.test(data.dob) === false) {
    errors.dob = 'Fødselsdato må fylles ut på formatet DD.MM.ÅÅÅÅ, f.eks. 19.12.1988';
  }

  if (!data.consent) {
    errors.consent = 'Du må lese DNTs personvernerklæring og samtykke til at DNT kan lagre opplysninger';
  }

  const selectedActivities = Object.keys(data.activities || {}).filter(id => (
    data.activities[id].isSelected === true
  ));

  if (selectedActivities.length < 1) {
    errors.activities = 'Du må velge minst én aktivitet';
  }

  if (selectedActivities.length > 2) {
    errors.activities = 'Du kan ikke velge flere enn 2 aktiviteter';
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
