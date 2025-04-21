import { HuggingFaceEmbedding } from "@llamaindex/huggingface";
import { Settings } from "llamaindex";

Settings.embedModel = new HuggingFaceEmbedding({
  modelType: "BAAI/bge-small-en-v1.5",
});
