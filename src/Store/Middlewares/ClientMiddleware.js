/* eslint-disable no-console */
import { SUCCESS_DEFAULT, FAILURE_DEFAULT, APOLLO_CLIENT, HTTP_CLIENT } from '../Types';

export default function clientMiddleware(httpClient, apolloClient) {
  return ({ dispatch, getState }) => {
    return (next) => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      const { promise, types, handler = HTTP_CLIENT, ...rest } = action;
      if (!promise) {
        return next(action);
      }
      const [REQUEST, SUCCESS = SUCCESS_DEFAULT, FAILURE = FAILURE_DEFAULT] = types;
      next({ ...rest, type: REQUEST });

      let actionPromise;
      if (handler === APOLLO_CLIENT) {
        actionPromise = promise(apolloClient, { ...getState() });
      } else if (handler === HTTP_CLIENT) {
        actionPromise = promise(httpClient, { ...getState() });
      } else {
        console.error('UNKNOWN/UNCONFIGURED PROMISE HANDLER: ', handler);
        return null;
      }
      actionPromise
        .then(
          (result) => {
            if (result && result.data) {
              next({ ...rest, result: result.data, type: SUCCESS });
            } else if (result && result.error && result.error.message) {
              const error = {
                message: result.error.message,
              };
              next({ ...rest, error, type: FAILURE });
            } else {
              const error = {
                message: 'Unexpected error occured, try again later',
              };
              next({ ...rest, error, type: FAILURE });
            }
          },
          (error) => {
            error.message = 'Unexpected error occured, try again later';
            next({ ...rest, error, type: FAILURE });
          }
        )
        .catch((error) => {
          console.error('MIDDLEWARE ERROR:', error);
        });

      return actionPromise;
    };
  };
}
