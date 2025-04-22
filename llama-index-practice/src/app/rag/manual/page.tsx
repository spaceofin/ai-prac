import { VectorStoreIndex } from "llamaindex";
import { loadDocumentsFromDir } from "@/app/lib/loadDocuments";

export default async function ManualPage() {
  const question = "LLM의 종류에는 어떤 것들이 있습니까?";

  const documents = loadDocumentsFromDir("data");
  const index = await VectorStoreIndex.fromDocuments(documents);
  const query_engine = index.asQueryEngine();
  const response = await query_engine.query({
    query: question,
  });
  const answer = response.message.content;
  // console.log(documents);
  // console.log(response);

  return (
    <div className="bg-gray-200 rounded-md m-10 py-5 px-8 h-72 w-1/2 ">
      <p className="text-2xl font-bold">{question}</p>
      <p className="py-2">{typeof answer === "string" ? answer : ""}</p>
    </div>
  );
}
