import * as path from "path";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const typesArray = loadFilesSync(path.join(__dirname, "./"), {
  recursive: true,
  extensions: ["graphql"],
});
const typesMerged = mergeTypeDefs(typesArray, {
  commentDescriptions: true,
});

export default typesMerged;
