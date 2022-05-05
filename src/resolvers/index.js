import cinemas from "./query/cinemas";
import events from "./query/events";
import schedules from "./query/schedules";
import currentlyPlaying from "./cinema/currentlyPlaying";

export default {
  Query: {
    cinemas,
    events,
    schedules,
  },
  Cinema: {
    currentlyPlaying,
  },
  Event: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
};
