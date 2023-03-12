import ApolloClient from 'apollo-boost';
import App from './App';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { gql } from "apollo-boost";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

client
  .query({
    query: gql`
      {
       allCourses {
          title
        }
      }
    `
  })
  .then(result => console.log(result));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <App />

  </React.StrictMode>
);