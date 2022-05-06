class ActorNotFoundError extends Error {
  constructor(actorId) {
    super(`Actor with id ${actorId} not found`);
    this.name = "ActorNotFoundError";
  }
}

export default async (parent, { film }, context, info) => {
  const { id, title, actors } = film;
  try {
    await Promise.all(
      actors.map(async (actor) => {
        const getActor = await context.dataSources.actorDataSources.getActorId(
          actor
        );

        if (!getActor || getActor.length === 0) {
          throw new ActorNotFoundError(`Actor with id ${id} not found`);
        }
      })
    );

    const newFilm = await context.dataSources.filmDataSources.createFilm(
      id,
      title
    );

    await Promise.all(
      actors.map(async (actor) => {
        await context.dataSources.actorDataSources.addActor(
          newFilm[0].id,
          actor
        );
      })
    );

    return {
      ...newFilm[0],
      __typename: "Film",
    };
  } catch (e) {
    if (e.name == "ActorNotFoundError") {
      return {
        error: e.message,
        __typename: "ActorNotFoundError",
      };
    }
    return {
      error: e.message,
      __typename: "CreateFilmError",
    };
  }
};
