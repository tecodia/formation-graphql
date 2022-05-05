import knex from "knex";

const knexConnection = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "root",
    password: "root",
    database: "formationGraphql",
    port: parseInt(process.env.VIDEO_DB_PORT, 10),
  },
  options: {
    enableArithAbort: false,
  },
});

export default knexConnection;
