# GraphQL demo application

## Server
- run `npm install` ... if that doesn't work, please run `npm install --force` as there were some conflicting peer dependencies when setting up the cors package
- To spin up the server execute `node server.js`
- Note: If changes are made on the server, the express server does not hot reload changes, you must stop the server, kill it with `npm run kill` and then spin it back up with `node server.js`

The server will make available the GraphQL playground at `localhost:4000/graphql`

## Client
- run `npm install`
- `npm start` runs the front end client


To stop either server or client, run `ctrl c` or `ctrl z`



## Resources
- The [initial reference](https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1) to build the server
- [Getting Started with Apollo Client](https://www.apollographql.com/docs/react/get-started/)