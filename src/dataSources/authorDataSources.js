import { DataSource } from "apollo-datasource";

export class AuthorDataSources extends DataSource {
  constructor(knexConnection) {
    super();
    this.knex = knexConnection;
  }

  async getAuthorByArticleId(id) {
    return this.knex.select("*").from("authors").where({ article_id: id });
  }
}
