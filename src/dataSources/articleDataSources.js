import { DataSource } from "apollo-datasource";

export class ArticleDataSources extends DataSource {
  constructor(knexConnection) {
    super();
    this.knex = knexConnection;
  }

  initialize(config) {
    this.context = config.context;
    this.cache = config.cache;
  }

  async getArticles(first) {
    const responseCache = await this.cache
      .get(`articles:${first}`)
      .then((item) => item && JSON.parse(item));

    if (responseCache) {
      return responseCache;
    }

    const articles = await this.knex.select("*").from("articles").limit(first);

    if (articles) {
      this.cache.set(`articles:${first}`, JSON.stringify(articles), {
        ttl: 10,
      });
    }

    return articles;
  }
}
