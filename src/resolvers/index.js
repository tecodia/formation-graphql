import books from "./query/books";
import contents from "./query/contents";
import author from "./content/author";
import url from "./author/url";
import articles from "./query/articles";
import authorArticle from "./article/author";
export default {
  Query: {
    books,
    contents,
    articles,
  },
  Article: {
    author: authorArticle,
  },
  Author: {
    url,
  },

  Video: {
    author,
  },
};
