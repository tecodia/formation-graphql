export default async (parent, args, context, info) => {
  const result = await context.dataSources.filmDataSources.getAllFilms();

  return result.map((film) => {
    return {
      ...film,
      __typename: "Film",
    };
  });
};
