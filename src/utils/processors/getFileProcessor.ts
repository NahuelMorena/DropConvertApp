import { PlainTextProcessor } from "./PlainTextProcessor";
import { JSONProcessor } from "./JSONProcessor";
import { CSVProcessor } from "./CSVProcessor";
import { XMLProcessor } from "./XMLProcessor";
import { ARFFProcessor } from "./ARFFProcessor";

export function getFileProcessor(file: File) {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
    switch (fileExtension) {
      case 'txt':
        return new PlainTextProcessor();
      case 'json':
        return new JSONProcessor();
      case 'csv':
        return new CSVProcessor();
      case 'xml':
        return new XMLProcessor();
      case 'arff':
        return new ARFFProcessor();
      default:
        throw new Error(`Formato de archivo no soportado: ${file.name}`);
    }
}