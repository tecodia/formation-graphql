import { DataSource } from "apollo-datasource";

export class SQLDataSource extends DataSource {
  constructor(knexConnection) {
    super();
    this.knex = knexConnection;
  }

  initialize(config) {
    this.context = config.context;
    this.cache = config.cache;
  }
}
