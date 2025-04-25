import fs from "fs";
import path from "path";
import { Document, LlamaParseReader, Metadata } from "llamaindex";
import { SimpleDirectoryReader } from "@llamaindex/readers/directory";

export function loadDocumentsFromDir(dirPath: string): Document[] {
  const files = fs.readdirSync(dirPath);

  const documents = files.map((file) => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    return new Document({ text: content, metadata: { fileName: file } });
  });

  return documents;
}

export async function autoLoadDocumentsFromDir(
  dirPath: string
): Promise<Document<Metadata>[]> {
  const reader = new SimpleDirectoryReader();
  const documents = await reader.loadData(dirPath);
  return documents;
}

export async function loadDocumentsFromPdf(
  filePath: string
): Promise<Document<Metadata>[]> {
  const reader = new LlamaParseReader();
  const documents = await reader.loadData(filePath);
  return documents;
}
