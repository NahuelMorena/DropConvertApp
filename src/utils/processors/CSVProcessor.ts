import { FileProcessor } from './FileProcessor'

export class CSVProcessor implements FileProcessor {
    async process(file: File): Promise<string> {
        return file.text();
    }
}