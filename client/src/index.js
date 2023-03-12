import { ApolloClient, ApolloProvider, InMemoryCache, gql } from '@apollo/client';

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
});

//The code block below is a test that the client has access to the GraphQL API

// client
//   .query({
//     query: gql`
//       {
//        allCourses {
//           title
//         }
//       }
//     `
//   })
//   .then(result => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);