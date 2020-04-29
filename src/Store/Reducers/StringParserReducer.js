import * as types from '../Types';
import performCustomStringParse from '../../Services/CustomStringParserService';

const initialState = {
  parsedResultJSON: '',
  error: '',
};

const StringParserReducer = (state = initialState, action) => {
  let result;
  switch (action.type) {
    case types.CLEAR_PARSER_INPUTS:
      return {
        ...state,
        parsedResultJSON: '',
      };

    case types.FETCH_PARSER_RESULT: {
      result = action.result || { textToParse: '', accumulator: 'and' };
      let error = '';
      const parsedResultJSON = performCustomStringParse(result.textToParse, result.accumulator);
      if (parsedResultJSON === 'null') error = 'Error parsing String!';
      return {
        ...state,
        parsedResultJSON,
        error,
      };
    }

    default:
      return state;
  }
};

export default StringParserReducer;
