import { RedisCache } from "../plugins/redis-cache";

const redisOptions = {
  host: "localhost",
};

export const redisCache = new RedisCache(redisOptions);
