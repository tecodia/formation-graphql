import { RedisCache as ApolloRedisCache } from "apollo-server-cache-redis";
import RedisCollector from "./redis-collector";

export class RedisCache extends ApolloRedisCache {
  // eslint-disable-next-line no-useless-constructor
  constructor(options) {
    super(options);
  }

  async set(key, value, options) {
    const { ttl } = { ...this.defaultSetOptions, ...options };

    RedisCollector.addSetInfos({
      cacheId: key,
      ttl,
    });

    return super.set(key, value, options);
  }

  async get(key) {
    RedisCollector.addGetInfos({
      cacheId: key,
    });

    return super.get(key);
  }
}
