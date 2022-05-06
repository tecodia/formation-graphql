export default async (parent, { convention }, context, info) => {
  const { id, title } = convention;

  try {
    const newConvention =
      await context.dataSources.conventionDataSources.createConvention(
        id,
        title
      );

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
