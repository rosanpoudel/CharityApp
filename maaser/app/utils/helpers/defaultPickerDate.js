import moment from 'moment';

const getPickerDate = dateToConvert => {
  const dateConverted = new Date(
    parseInt(dateToConvert, 10),
  ).toLocaleDateString('fr-CA');
  return moment(dateConverted);
};

export default getPickerDate;
