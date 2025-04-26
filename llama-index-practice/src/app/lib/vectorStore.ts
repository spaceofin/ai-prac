import { QdrantVectorStore } from "@llamaindex/qdrant";
import { client } from "./qdrantClient";

export const qdrantVectorStore = new QdrantVectorStore({
  client,
  collectionName: "my_collection",
});
