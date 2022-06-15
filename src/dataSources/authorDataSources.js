import { DataSource } from "apollo-datasource";
import DataLoader from "dataloader";

export class AuthorDataSources extends DataSource {
  constructor(knexConnection) {
    super();
    this.knex = knexConnection;
  }

  getAuthorByArticleIdDataloader() {
    if (!this.authorDataloader) {
      this.authorDataloader = this.createGetAuthorByArticleIdDataloader();
    }
    return this.authorDataloader;
  }

  createGetAuthorByArticleIdDataloader() {
    return new DataLoader(async (ids) => {
      const results = await this.knex
        .select("*")
        .from("authors")
        .whereIn("article_id", ids);

      return ids.map((id) =>
        results.find((result) => result.article_id === id)
      );
    });
  }

  async getAuthorByArticleId(id) {
    return this.getAuthorByArticleIdDataloader().load(id);
  }
}
