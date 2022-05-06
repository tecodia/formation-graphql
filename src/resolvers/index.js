import cinemas from "./query/cinemas";
import events from "./query/events";
import schedules from "./query/schedules";
import currentlyPlaying from "./cinema/currentlyPlaying";
import event from "./schedule/event";
import actors from "./film/actors";
import films from "./query/films";
import conventions from "./query/conventions";
import createConvention from "./mutation/createConvention";
import createFilm from "./mutation/createFilm";
import PubSubSingleton from "../config/pubsub";

export default {
  Query: {
    cinemas,
    events,
    schedules,
    films,
    conventions,
  },
  Mutation: {
    createConvention,
    createFilm,
  },
  Subscription: {
    conventionAdded: {
      subscribe: () => PubSubSingleton.asyncIterator(["CONVENTION_ADDED"]),
    },
    filmAdded: {
      subscribe: () => PubSubSingleton.asyncIterator(["FILM_ADDED"]),
    },
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
  CreateConventionResponse: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
  CreateFilmResponse: {
    __resolveType(obj) {
      return obj.__typename;
    },
  },
};
