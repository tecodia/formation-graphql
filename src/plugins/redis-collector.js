class RedisCollector {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    this.getInfos = [];
    this.setInfos = [];
  }

  reset() {
    this.initializeData();
  }

  addGetInfos({ cacheId }) {
    this.getInfos.push({
      cacheId,
    });

    return this;
  }

  addSetInfos({ cacheId, ttl }) {
    this.setInfos.push({
      cacheId,
      ttl,
    });

    return this;
  }

  static getInstance() {
    if (!RedisCollector.instance) {
      RedisCollector.instance = new RedisCollector();
    }

    return RedisCollector.instance;
  }
}

export default RedisCollector.getInstance();
