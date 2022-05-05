import axios from "axios";

export default async (parent, args, context, info) => {
  const response = await context.dataSources.cinemaDataSource.getAllCinemas();

  return response.map((cinema) => {
    return {
      id: cinema.id,
      city: cinema.city,
      name: cinema.name,
    };
  });
};
