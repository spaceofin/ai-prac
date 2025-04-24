import { agent, LlamaParseReader, VectorStoreIndex } from "llamaindex";
// import { SimpleDirectoryReader } from "@llamaindex/readers/directory";
import "../../config/huggingfaceConfig";
import path from "path";
import { ollama } from "@llamaindex/ollama";
import { sumNumbers } from "@/app/lib/mathTools";

export default async function RagMathPage() {
  // const dirPath = path.resolve(process.cwd(), "data/cat-city");
  // const reader = new SimpleDirectoryReader();
  // const documents = await reader.loadData(dirPath);

  const filePath = path.resolve(
    process.cwd(),
    "data/cat-city/cat_city_budget_report_2024-25.pdf"
  );
  const reader = new LlamaParseReader();
  const documents = await reader.loadData(filePath);

  console.log(documents);

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

  const ragAgent = agent({ tools, llm: ollama({ model: "llama3.2:1b" }) });

  const questions = [
    "What's the budget of Cat City for community health in 2024-25?",
    "What's the budget of Cat City for public protection in 2024-25?",
    "What's the combined budget of Cat City for community health and public protection in 2024-25?",
  ];

  const answers = [];

  for (const question of questions) {
    const response = await ragAgent.run(question);
    // console.log(response);
    answers.push(response.data as unknown as { result: string });
  }

  return (
    <div className="bg-gray-200 rounded-md m-10 py-5 px-8 w-1/2 flex flex-col gap-10">
      {answers.map((answer, index) => (
        <div key={index}>
          <p className="text-2xl font-bold">{questions[index]}</p>
          <p className="py-2">{answer.result}</p>
        </div>
      ))}
    </div>
  );
}
