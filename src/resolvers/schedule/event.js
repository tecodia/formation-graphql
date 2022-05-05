export default async ({ filmId }, _, { dataSources }) => {
  const film = await dataSources.filmDataSources.getFilm(filmId % 19);
  if (film) {
    return {
      ...film,
      __typename: "Film",
    };
  }

  return null;
};
