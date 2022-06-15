import { ApolloServer } from "apollo-server";
import typeDefs from "./src/typedefs";
import resolvers from "./src/resolvers";
import { ArticleDataSources } from "./src/dataSources/articleDataSources";
import knex from "knex";

const knexConnection = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "formationGraphql",
    port: 5432,
  },
  options: {
    enableArithAbort: false,
  },
});

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    articleDataSources: new ArticleDataSources(knexConnection),
  }),
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
