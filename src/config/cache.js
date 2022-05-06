import { RedisCache as ApolloRedisCache } from "apollo-server-cache-redis";

const redisOptions = {
  host: "localhost",
};

export const redisCache = new ApolloRedisCache(redisOptions);
