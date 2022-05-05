import cinemas from "./query/cinemas";
import events from "./query/events";
import schedules from "./query/schedules";
import currentlyPlaying from "./cinema/currentlyPlaying";
import event from "./schedule/event";
import actors from "./film/actors";

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
  Film: {
    actors,
  },
  Event: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
};
