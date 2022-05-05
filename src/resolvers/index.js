import cinemas from "./query/cinemas";
import events from "./query/events";
import schedules from "./query/schedules";
import currentlyPlaying from "./cinema/currentlyPlaying";
import event from "./schedule/event";

export default {
  Query: {
    cinemas,
    events,
    schedules,
  },
  Cinema: {
    currentlyPlaying,
  },
  Schedule: {
    event,
  },
  Event: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
};
