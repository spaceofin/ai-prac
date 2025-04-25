import "../../config/huggingfaceConfig";
import path from "path";
import {
  autoLoadDocumentsFromDir,
  loadDocumentsFromPdf,
} from "@/app/lib/loadDocuments";
import { askQuestions, createRagAgentFromDocuments } from "./ragService";

export default async function RagMathPage() {
  const txtFilesDirPath = path.resolve(process.cwd(), "data/cat-city");
  const pdfFilePath = path.resolve(
    process.cwd(),
    "data/cat-city/cat_city_budget_report_2024-25.pdf"
  );

  const [documentsFromTxts, documentsFromPdf] = await Promise.all([
    autoLoadDocumentsFromDir(txtFilesDirPath),
    loadDocumentsFromPdf(pdfFilePath),
  ]);

  const [txtAgent, pdfAgent] = await Promise.all([
    createRagAgentFromDocuments(documentsFromTxts),
    createRagAgentFromDocuments(documentsFromPdf),
  ]);

  const questions = [
    "What's the budget of Cat City for community health in 2024-25?",
    "What's the budget of Cat City for public protection in 2024-25?",
    "What's the combined budget of Cat City for community health and public protection in 2024-25?",
  ];

  const [txtAnswers, pdfAnswers] = await Promise.all([
    askQuestions(txtAgent, questions),
    askQuestions(pdfAgent, questions),
  ]);

  return (
    <div>
      <div className="bg-gray-200 rounded-md m-10 py-5 px-8 w-1/2 flex flex-col gap-10">
        <h2 className="text-3xl font-bold text-indigo-900 mt-5">From Txts</h2>
        {txtAnswers.map((answer, index) => (
          <div key={index}>
            <p className="text-2xl font-bold">{questions[index]}</p>
            <p className="py-2">{answer}</p>
          </div>
        ))}
      </div>
      <div className="bg-gray-200 rounded-md m-10 py-5 px-8 w-1/2 flex flex-col gap-10">
        <h2 className="text-3xl font-bold text-indigo-900 mt-5">From Pdf</h2>
        {pdfAnswers.map((answer, index) => (
          <div key={index}>
            <p className="text-2xl font-bold">{questions[index]}</p>
            <p className="py-2">{answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
