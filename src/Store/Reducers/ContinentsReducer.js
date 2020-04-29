import * as types from '../Types';

const initialState = {
  continents: [],
  selectedContinent: {},
  countriesList: [],
  selectedCountry: {},
  loading: null,
  error: '',
};

const ContinentsReducer = (state = initialState, action) => {
  let result;
  switch (action.type) {
    case types.LOAD_CONTINENTS_LIST:
      return {
        ...state,
        continents: [],
        loading: true,
        error: '',
      };

    case types.LOAD_CONTINENTS_LIST_SUCCESS: {
      result = action.result || [];
      return {
        ...state,
        continents: result.continents,
        loading: false,
      };
    }

    case types.LOAD_CONTINENTS_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    case types.CLEAR_CONTINENTS_LIST:
      return {
        ...state,
        continents: [],
        selectedContinent: {},
        countriesList: [],
      };

    case types.SELECT_CONTINENT: {
      result = action.result || { name: '', code: '?', countries: [] };
      return {
        ...state,
        selectedContinent: { ...result },
        countriesList: result.countries,
      };
    }

    case types.FETCH_COUNTRY_RESULT:
      return {
        ...state,
        selectedCountry: {},
        loading: true,
        error: '',
      };

    case types.FETCH_COUNTRY_RESULT_SUCCESS: {
      result = action.result || [];
      const newCountriesList = state.countriesList.map((country) => {
        if (country.code === result.country.code) return result.country;
        return country;
      });
      return {
        ...state,
        selectedCountry: result.country,
        countriesList: newCountriesList,
        loading: false,
      };
    }

    case types.FETCH_COUNTRY_RESULT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error.message,
      };

    default:
      return state;
  }
};

export default ContinentsReducer;
