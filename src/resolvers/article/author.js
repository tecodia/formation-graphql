export default async (parent, args, { dataSources }) => {
  const author = await dataSources.authorDataSources.getAuthorByArticleId(
    parent.id
  );

  return author;
};
