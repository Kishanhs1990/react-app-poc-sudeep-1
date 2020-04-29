import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { ApolloLink, Observable } from 'apollo-link';

const cache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GQL_URL,
});

const requestLink = new ApolloLink(
  (operation, forward) =>
    new Observable((observer) => {
      let handle;
      Promise.resolve(operation)
        .then(() => {
          handle = forward(operation).subscribe({
            next: observer.next.bind(observer),
            error: observer.error.bind(observer),
            complete: observer.complete.bind(observer),
          });
        })
        .catch(observer.error.bind(observer));

      return () => {
        if (handle) handle.unsubscribe();
      };
    })
);

const apolloClient = new ApolloClient({
  link: ApolloLink.from([
    requestLink,
    withClientState({
      defaults: {
        isConnected: true,
      },
      resolvers: {
        Mutation: {
          updateNetworkStatus: (_, { isConnected }, { cache: networkCache }) => {
            networkCache.writeData({ data: { isConnected } });
            return null;
          },
        },
      },
      cache,
    }),
    httpLink,
  ]),
  cache,
});

export default apolloClient;
