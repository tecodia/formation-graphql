import { ApolloServer } from "apollo-server-express";
import { createServer } from "http";
import express from "express";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { SubscriptionServer } from "subscriptions-transport-ws";
import PubSubSingleton from "./config/pubsub";
import { execute, subscribe } from "graphql";

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

(async function () {
  // Create the schema, which will be used separately by ApolloServer and
  // the WebSocket server.
  const schema = makeExecutableSchema({ typeDefs, resolvers });

  // Create an Express app and HTTP server; we will attach both the WebSocket
  // server and the ApolloServer to this HTTP server.
  const app = express();
  const httpServer = createServer(app);

  // Set up ApolloServer.
  const server = new ApolloServer({
    schema,
    context: async () => {
      return { cache: redisCache, pubsub: PubSubSingleton };
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
    cache: redisCache,
  });
  await server.start();
  server.applyMiddleware({ app });

  SubscriptionServer.create(
    { schema, execute, subscribe },
    { server: httpServer, path: server.graphqlPath }
  );

  const PORT = 4000;
  // Now that our HTTP server is fully set up, we can listen to it.
  httpServer.listen(PORT, () => {
    console.log(
      `Server is now running on http://localhost:${PORT}${server.graphqlPath}`
    );
  });
})();
