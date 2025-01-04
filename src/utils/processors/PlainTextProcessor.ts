import { FileProcessor } from "./FileProcessor";

export class PlainTextProcessor extends FileProcessor {
    async process(file: File): Promise<string> {
        return file.text();
    }
}