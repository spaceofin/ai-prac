import { QdrantClient } from "@qdrant/js-client-rest";

export const client = new QdrantClient({ host: "127.0.0.1", port: 6333 });
// const client = new QdrantClient({url: 'http://127.0.0.1:6333'});
