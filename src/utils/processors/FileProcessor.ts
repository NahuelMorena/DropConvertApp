export interface FileProcessor {
    process(file: File): Promise<string>;
}