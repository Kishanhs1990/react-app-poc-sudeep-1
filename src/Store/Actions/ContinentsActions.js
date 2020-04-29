import * as types from '../Types';
import { ListAllContinents } from '../Queries/Continents.graphql';
import { CountryDetails as countryDetails } from '../Queries/Countries.graphql';

export function fetchContinentsList() {
  return {
    types: [
      types.LOAD_CONTINENTS_LIST,
      types.LOAD_CONTINENTS_LIST_SUCCESS,
      types.LOAD_CONTINENTS_LIST_FAILURE,
    ],
    handler: types.APOLLO_CLIENT,
    promise: (client) => client.query({ query: ListAllContinents }),
  };
}

export function selectContinent(continent) {
  return {
    type: types.SELECT_CONTINENT,
    result: {
      ...continent,
    },
  };
}

export function fetchCountryDetails(country) {
  return {
    types: [
      types.FETCH_COUNTRY_RESULT,
      types.FETCH_COUNTRY_RESULT_SUCCESS,
      types.FETCH_COUNTRY_RESULT_FAILURE,
    ],
    handler: types.APOLLO_CLIENT,
    promise: (client) => client.query({ query: countryDetails, variables: { code: country.code } }),
  };
}

export function clearContinents() {
  return {
    type: types.CLEAR_CONTINENTS_LIST,
  };
}
