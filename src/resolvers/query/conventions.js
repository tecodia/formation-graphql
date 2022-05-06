export const encode = (stringToEncode = "") =>
  Buffer.from(stringToEncode).toString("base64");

export const decode = (stringToDecode = "") =>
  Buffer.from(stringToDecode, "base64").toString();

export default async (parent, args, context, info) => {
  const { first } = args;

  const after = args.after ? parseInt(decode(args.after), 10) + 1 : 0;

  const conventions =
    await context.dataSources.conventionDataSources.getConventions(
      first + 1,
      parseInt(after, 10)
    );

  const edges = conventions.slice(0, first).map((convention, index) => {
    return {
      node: convention,
      cursor: encode((index + parseInt(after, 10)).toString()),
    };
  });

  return {
    edges,
    pageInfo: {
      hasNextPage: conventions.length > first,
      endCursor: edges[edges.length - 1].cursor,
    },
    __typename: "ConventionsConnection",
  };
};
