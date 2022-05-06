export default async (parent, { convention }, context, info) => {
  const { id, title } = convention;

  try {
    const newConvention =
      await context.dataSources.conventionDataSources.createConvention(
        id,
        title
      );

    context.pubsub.publish("CONVENTION_ADDED", {
      conventionCreated: {
        ...newConvention[0],
        __typename: "Convention",
      },
    });

    return {
      ...newConvention[0],
      __typename: "Convention",
    };
  } catch (e) {
    return {
      error: e.message,
      __typename: "CreateConventionError",
    };
  }
};
