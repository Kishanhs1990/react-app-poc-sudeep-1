import * as types from '../Types';

export function parseToJSON(textToParse, accumulator) {
  return {
    type: types.FETCH_PARSER_RESULT,
    result: {
      textToParse,
      accumulator,
    },
  };
}

export function clearOutcome() {
  return {
    type: types.CLEAR_PARSER_INPUTS,
  };
}
