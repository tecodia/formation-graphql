import cinemas from "./query/cinemas";
import events from "./query/events";
import schedules from "./query/schedules";
import currentlyPlaying from "./cinema/currentlyPlaying";
import event from "./schedule/event";
import actors from "./film/actors";
import films from "./query/films";
import conventions from "./query/conventions";

export default {
  Query: {
    cinemas,
    events,
    schedules,
    films,
    conventions,
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
