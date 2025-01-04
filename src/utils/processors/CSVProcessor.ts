import { FileProcessor } from './FileProcessor'

export class CSVProcessor extends FileProcessor {
    async process(file: File): Promise<string> {
        return file.text();
    }
}