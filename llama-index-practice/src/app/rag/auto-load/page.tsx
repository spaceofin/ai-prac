import { agent, VectorStoreIndex } from "llamaindex";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import "../../config/huggingfaceConfig";
import path from "path";
import { ollama } from "@llamaindex/ollama";

export default async function AutoLoadPage() {
  const dirPath = path.resolve(process.cwd(), "data/ai");

  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData(dirPath);
  const index = await VectorStoreIndex.fromDocuments(documents);

  const tools = [
    index.queryTool({
      metadata: {
        name: "about_ai_and_llm_tool",
        description: `This tool can answer detailed questions about ai and llm models.`,
      },
      options: { similarityTopK: 10 },
    }),
  ];

  const ragAgent = agent({ tools, llm: ollama({ model: "llama3.2:1b" }) });

  const question = "가장 인기가 많은 LLM 모델은?";
  let toolResponse = await ragAgent.run(question);

  // console.log(toolResponse);

  const answer = toolResponse.data as unknown as { result: string };

  return (
    <div className="bg-gray-200 rounded-md m-10 py-5 px-8 h-72 w-1/2 ">
      <p className="text-2xl font-bold">{question}</p>
      <p className="py-2">{answer.result}</p>
    </div>
  );
}
