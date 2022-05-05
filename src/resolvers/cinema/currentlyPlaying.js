const findDay = (day) => {
  switch (day % 7) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Saturday";
  }
};

export default async (parent, args, context, info) => {
  const response =
    await context.dataSources.scheduleDataSource.getScheduleByCinema(parent.id);

  return response.map((schedule) => {
    return {
      id: schedule.id,
      day: findDay(schedule.day).toUpperCase(),
      playAt: [schedule.playAt],
      filmId: schedule.filmId,
    };
  });
};
