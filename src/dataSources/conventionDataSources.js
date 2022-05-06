import { SQLDataSource } from "./sqlDataSource";

export class ConventionsDataSources extends SQLDataSource {
  getConventions(limit, offset) {
    return this.knex.select("*").from("convention").limit(limit).offset(offset);
  }
}
