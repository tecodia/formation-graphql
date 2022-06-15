import { ApolloServer } from "apollo-server";
import typeDefs from "./src/typedefs";
import resolvers from "./src/resolvers";
import { ArticleDataSources } from "./src/dataSources/articleDataSources";
import { AuthorDataSources } from "./src/dataSources/authorDataSources";
import knexConnection from "./src/config/db";
import sqlPlugin from "./src/plugins/sql-plugin";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    articleDataSources: new ArticleDataSources(knexConnection),
    authorDataSources: new AuthorDataSources(knexConnection),
  }),
  plugins: [sqlPlugin],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
