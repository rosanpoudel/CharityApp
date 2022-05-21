import { countryList } from '../../data/country';

export default function getCountryName(code) {
  const name = countryList.filter(country => country.alpha3 === code);
  return name[0].name;
}
