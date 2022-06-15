export default async (_, { first, after }, { dataSources }) => {
  const articles = await dataSources.articleDataSources.getArticles(first);

  console.log(articles);
  return {
    edges: articles.map((article) => {
      return {
        node: article,
      };
    }),
  };
};
