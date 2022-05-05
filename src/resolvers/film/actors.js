export default async (parent, _, { dataSources }) => {
  const actors = await dataSources.actorDataSources.getActorByFilmId(parent.id);

  return actors.map((actor) => {
    return {
      ...actor,
      firstName: actor.firstname,
    };
  });
};
