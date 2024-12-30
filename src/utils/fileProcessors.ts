import { XMLParser } from 'fast-xml-parser';

// Procesador para texto plano
export function processPlainText(file: File): Promise<string> {
    return file.text();
}
  
// Procesador para JSON
export function processJSON(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result as string);
          const plainText = processData(data);
          resolve(plainText)
        } catch (error: unknown) {
            if (error instanceof Error) {
                reject('Error al procesar JSON: ' + error.message);
            } else {
                reject('Error desconocido');
            }
        }
      };
      reader.onerror = (error) => reject(error);
      reader.readAsText(file);
    });
}
  
function processData(data: any): string {
    if (Array.isArray(data)) {
        return data.map((item) => processElement(item)).join('\n');
    } else if (typeof data === 'object' && data !== null) {
        return processObject(data);
    }
    return `${data}`;
}

function processElement(element: any): string {
    if (Array.isArray(element)) {
        return element.map(item => processElement(item)).join('\n');
    } else if (typeof element === 'object' && element !== null) {
        return processObject(element);
    } 
    return `${element}`;
}

function processObject(obj: any): string {
    let line = '';
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            if (Array.isArray(value)) {
                line += value.map(item => processElement(item)).join('\n') + '\n';
            }
            else if (typeof value === 'object' && value !== null) {
                line += processObject(value) + '\n';
            } else {
                line += `${value} `;
            }
        }
    }
    return line.trim();
}

////////////////////////////
// Procesador para CSV
export function processCSV(file: File): Promise<string> {
    return file.text();
}
  
// Procesador para XML
export function processXML(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const parser = new XMLParser();
                const result = parser.parse(reader.result as string);
                console.log(result);
                const plainText = processData(result);
                resolve(plainText);
            } catch (error: unknown) {
                if (error instanceof Error) {
                    reject('Error al procesar XML: ' + error.message);
                } else {
                    reject('Error desconocido');
                }
            }
        };
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
    });
}

// Fábrica para seleccionar el procesador adecuado
export function getFileProcessor(file: File) {
    console.log(file.name.split('.').pop()?.toLowerCase())
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
  
    switch (fileExtension) {
      case 'txt':
        return processPlainText;
      case 'json':
        return processJSON;
      case 'csv':
        return processCSV;
      case 'xml':
        return processXML;
      default:
        throw new Error(`Formato de archivo no soportado: ${file.name}`);
    }
  }