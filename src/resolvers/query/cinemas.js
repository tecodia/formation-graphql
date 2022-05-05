export default async (parent, args, { dataSources }, info) => {
  const response = await dataSources.cinemaDataSource.getAllCinemas();

  return response.map((cinema) => {
    return {
      id: cinema.id,
      city: cinema.city,
      name: cinema.name,
    };
  });
};
