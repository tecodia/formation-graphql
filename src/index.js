import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { cinemaDataSource } from "./dataSources/cinemaDataSources";
import { scheduleDataSource } from "./dataSources/scheduleDataSources";
import knexConnection from "./config/db";
import { filmDataSources } from "./dataSources/filmDataSources";
import { ActorDataSources } from "./dataSources/actorDataSources";
import SQLPlugin from "./plugins/sql-plugin";
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    cinemaDataSource: new cinemaDataSource(),
    scheduleDataSource: new scheduleDataSource(),
    filmDataSources: new filmDataSources(knexConnection),
    actorDataSources: new ActorDataSources(knexConnection),
  }),
  plugins: [SQLPlugin],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
