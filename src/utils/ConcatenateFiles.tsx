import { getFileProcessor } from "./processors/getFileProcessor";
import { FileProcessorContext } from "./FileProcessorContext";

export async function concatenateFiles(files: File[]): Promise<string> {
    try {
        const readPromises = files.map(async (file) => {
            //Se obtiene el procesador adecuado para cada archivo
            const processor = getFileProcessor(file);
            const context = new FileProcessorContext(processor);
            return await context.execute(file);
        });
  
      const contents = await Promise.all(readPromises);
      return contents.join('');
    } catch (error) {
      console.error('Error concatenando archivos:', error)
      throw error
    }
}