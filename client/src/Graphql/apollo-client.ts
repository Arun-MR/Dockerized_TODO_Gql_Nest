// import { ApolloClient, InMemoryCache } from '@apollo/client';

// const client = new ApolloClient({
//   uri: 'http://localhost:8000/graphql', // replace with your GraphQL endpoint
//   cache: new InMemoryCache(),
// });

// export default client;


import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const httpLink = createHttpLink({
  uri: 'http://localhost:8000/graphql', // replace with your GraphQL endpoint
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from wherever you store it
  const token = localStorage.getItem('user'); // Example: using localStorage for token storage

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `${token}` : '',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
