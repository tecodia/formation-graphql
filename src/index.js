import { ApolloServer } from "apollo-server";
import typeDefs from "./typeDefs";
import resolvers from "./resolvers";
import { cinemaDataSource } from "./dataSources/cinemaDataSources";
import { scheduleDataSource } from "./dataSources/scheduleDataSources";
import knexConnection from "./config/db";
import { filmDataSources } from "./dataSources/filmDataSources";
import { ActorDataSources } from "./dataSources/actorDataSources";
import SQLPlugin from "./plugins/sql-plugin";
import RedisPlugin from "./plugins/redis-plugin";
import { ConventionsDataSources } from "./dataSources/conventionDataSources";
import { redisCache } from "./config/cache";

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async () => {
    return { cache: redisCache };
  },
  cache: redisCache,
  dataSources: () => ({
    cinemaDataSource: new cinemaDataSource(),
    scheduleDataSource: new scheduleDataSource(),
    filmDataSources: new filmDataSources(knexConnection),
    actorDataSources: new ActorDataSources(knexConnection),
    conventionDataSources: new ConventionsDataSources(knexConnection),
  }),
  plugins: [SQLPlugin, RedisPlugin],
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
