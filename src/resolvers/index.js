import books from "./query/books";
import contents from "./query/contents";
import author from "./content/author";
import url from "./author/url";
import articles from "./query/articles";
export default {
  Query: {
    books,
    contents,
    articles,
  },
  Author: {
    url,
  },
  Article: {
    author,
  },
  Video: {
    author,
  },
};
