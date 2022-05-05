export default async ({ filmId }, _, { dataSources }) => {
  const film = await dataSources.filmDataSources.getFilm(filmId % 19);
  if (film.length > 0) {
    return {
      ...film[0],
      __typename: "Film",
    };
  }

  return null;
};
