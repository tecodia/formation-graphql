import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { cinemaDataSource } from "./dataSources/cinemaDataSources";
import { scheduleDataSource } from "./dataSources/scheduleDataSources";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    cinemaDataSource: new cinemaDataSource(),
    scheduleDataSource: new scheduleDataSource(),
  }),
  mock: true,
  mockEntireSchema: false,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
