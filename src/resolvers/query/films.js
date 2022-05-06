export const encode = (stringToEncode = "") =>
  Buffer.from(stringToEncode).toString("base64");

export const decode = (stringToDecode = "") =>
  Buffer.from(stringToDecode, "base64").toString();

export default async (parent, args, context, info) => {
  const { first } = args;

  const after = args.after ? parseInt(decode(args.after), 10) + 1 : 0;

  const films = await context.dataSources.filmDataSources.getFilms(
    first + 1,
    parseInt(after, 10)
  );

  const edges = films.slice(0, first).map((film, index) => {
    return {
      node: film,
      cursor: encode((index + parseInt(after, 10)).toString()),
    };
  });

  return {
    edges,
    pageInfo: {
      hasNextPage: films.length > first,
      endCursor: edges[edges.length - 1].cursor,
    },
    __typename: "FilmsConnection",
  };
};
