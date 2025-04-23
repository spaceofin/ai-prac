import { agent } from "llamaindex";
import { divideNumbers, sumNumbers } from "../lib/mathTools";
import { ollama } from "@llamaindex/ollama";

export const mathAgent = agent({
  tools: [sumNumbers, divideNumbers],
  llm: ollama({ model: "llama3.2:1b" }),
  verbose: false,
});
