import DataLoader from "dataloader";
import { SQLDataSource } from "./sqlDataSource";

export class filmDataSources extends SQLDataSource {
  getFilmDataloader() {
    if (!this.filmDataloader) {
      this.filmDataloader = this.createFilmDataloader();
    }
    return this.filmDataloader;
  }

  createFilmDataloader() {
    return new DataLoader(async (ids) => {
      const results = await this.knex
        .select("*")
        .from("film")
        .whereIn("id", ids);

      return ids.map((id) => results.find((result) => result.id === id));
    });
  }

  getAllFilms() {
    return this.knex.select("*").from("film");
  }

  getFilm(filmId) {
    return this.getFilmDataloader().load(filmId);
  }

  getFilms(limit, offset) {
    return this.knex.select("*").from("film").limit(limit).offset(offset);
  }
}
