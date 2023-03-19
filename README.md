# GraphQL demo application

## Server
- `cd` into the server directory
- run `npm install` ... if that doesn't work, please run `npm install --force` as there were some conflicting peer dependencies when setting up the cors package
- To spin up the server execute `node server.js`
- Note: If changes are made on the server, the express server does not hot reload changes, you must stop the server, kill it with `npm run kill` and then spin it back up with `node server.js`

**Key Tools on the Server**
- Express
- Express Graphql
- Graphql
- Cors

The server will make available the GraphQL playground at `localhost:4000/graphql`

## Client
- `cd` into the client directory
- run `npm install`
- `npm start` runs the front end client

**Key Tools on the Client**
- React
- GraphQl
- Apollo Client


To stop either server or client, run `ctrl c` or `ctrl z`



## Resources
- The [initial reference](https://medium.com/codingthesmartway-com-blog/creating-a-graphql-server-with-node-js-and-express-f6dddc5320e1) to build the server
- [Apollo Docs: Resolver Functions](https://www.apollographql.com/docs/apollo-server/data/resolvers/#resolver-arguments)
- [Getting Started with Apollo Client](https://www.apollographql.com/docs/react/get-started/)
- [Apollo Docs: Queries](https://www.apollographql.com/docs/react/data/queries/)
- [Apollo Docs: Caching](https://www.apollographql.com/docs/react/caching/advanced-topics/)
- [React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)