import { FileProcessor } from "./FileProcessor";

export class PlainTextProcessor implements FileProcessor {
    async process(file: File): Promise<string> {
        return file.text();
    }
}