import { SQLDataSource } from "./sqlDataSource";

export class filmDataSources extends SQLDataSource {
  getAllFilms() {
    return this.knex.select("*").from("film");
  }

  getFilm(filmId) {
    return this.knex.select("*").from("film").where({ id: filmId });
  }
}
