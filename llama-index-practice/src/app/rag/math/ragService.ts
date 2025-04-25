import { sumNumbers } from "@/app/lib/mathTools";
import { ollama } from "@llamaindex/ollama";
import {
  agent,
  AgentWorkflow,
  Document,
  Metadata,
  VectorStoreIndex,
} from "llamaindex";

export async function createRagAgentFromDocuments(
  documents: Document<Metadata>[]
) {
  const index = await VectorStoreIndex.fromDocuments(documents);

  const tools = [
    index.queryTool({
      metadata: {
        name: "cat_city_budget_tool",
        description: `This tool can answer detailed questions about the individual components of the budget of Cat City in 2024-2025.`,
      },
      options: { similarityTopK: 10 },
    }),
    sumNumbers,
  ];

  return agent({ tools, llm: ollama({ model: "llama3.2:1b" }) });
}

export async function askQuestions(
  ragAgent: AgentWorkflow,
  questions: string[]
): Promise<string[]> {
  const answers: string[] = [];

  for (const question of questions) {
    const response = await ragAgent.run(question);
    answers.push((response.data as unknown as { result: string }).result);
  }

  return answers;
}
