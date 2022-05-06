import DataLoader from "dataloader";
import { SQLDataSource } from "./sqlDataSource";

export class ActorDataSources extends SQLDataSource {
  getActorDataloader() {
    if (!this.actorDataloader) {
      this.actorDataloader = this.createActorDataloader();
    }
    return this.actorDataloader;
  }

  createActorDataloader() {
    return new DataLoader(async (ids) => {
      const results = await this.knex
        .select("*")
        .from("actor")
        .join("film_actor", "actor.id", "=", "film_actor.actor_id")
        .whereIn("film_actor.film_id", ids);

      return ids.map((id) => results.filter((result) => result.film_id === id));
    });
  }

  getActorByFilmId(filmId) {
    return this.getActorDataloader().load(filmId);
  }

  getActorId(id) {
    return this.knex.select("*").from("actor").where({ id });
  }

  addActor(filmId, actorId) {
    return this.knex("film_actor").insert({
      film_id: filmId,
      actor_id: actorId,
    });
  }
}
