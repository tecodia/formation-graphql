import { DataSource } from "apollo-datasource";

export class ArticleDataSources extends DataSource {
  constructor(knexConnection) {
    super();
    this.knex = knexConnection;
  }

  async getArticles(first) {
    return this.knex.select("*").from("articles").limit(first);
  }
}
