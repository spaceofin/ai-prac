import fs from "fs";
import path from "path";
import { Document } from "llamaindex";

export function loadDocumentsFromDir(dirPath: string): Document[] {
  const files = fs.readdirSync(dirPath);

  const documents = files.map((file) => {
    const filePath = path.join(dirPath, file);
    const content = fs.readFileSync(filePath, "utf-8");
    return new Document({ text: content, metadata: { fileName: file } });
  });

  return documents;
}
