import { PubSub } from "graphql-subscriptions";

class PubSubSingleton {
  static getInstance() {
    if (!PubSubSingleton.instance) {
      PubSubSingleton.instance = new PubSub();
    }

    return PubSubSingleton.instance;
  }
}

export default PubSubSingleton.getInstance();
