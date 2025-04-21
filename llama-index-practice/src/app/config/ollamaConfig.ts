import { ollama } from "@llamaindex/ollama";
import { Settings } from "llamaindex";

Settings.llm = ollama({
  model: "gemma3:1b",
});
