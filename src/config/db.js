import knex from "knex";
import logger from "../plugins/knex-logger";

const knexConnection = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "formationGraphql",
    port: 5432,
  },
  options: {
    enableArithAbort: false,
  },
});

export default logger(knexConnection);
