import { getFileProcessor } from './fileProcessors';

export async function concatenateFiles(files: File[]) {
    try {
      const readPromises = files.map((file) => {
        //Se obtiene el procesador adecuado para cada archivo
        const processFile = getFileProcessor(file);
        return processFile(file);
      });
  
      const contents = await Promise.all(readPromises)
      const concatenatedContent = contents.join('')
      return concatenatedContent
    } catch (error) {
      console.error('Error concatenando archivos:', error)
      throw error
    }
  }