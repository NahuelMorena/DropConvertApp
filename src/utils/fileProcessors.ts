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
    return `${data}\n`;
}

function processElement(element: any): string {
    let result = '';
    if (Array.isArray(element)) {
        element.forEach((item) => {
            result += processElement(item);
        });
    } else if (typeof element === 'object' && element !== null) {
        result += processObject(element);
    } else {
        result += `${element}\n`;
    }
    return result;
}

function processObject(obj: any): string {
    let result = '';
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            const value = obj[key];

            if (Array.isArray(value)) {
                value.forEach((item) => {
                    result += processElement(item);
                });
            }
            else if (typeof value === 'object' && value !== null) {
                result += processObject(value);
            } else {
                result += `${value}\n`;
            }
        }
    }
    return result;
}

////////////////////////////
// Procesador para CSV
export function processCSV(file: File): Promise<string> {
    return file.text();
}
  
// Procesador para XML
export function processXML(file: File): Promise<string> {
    return file.text();
}

// Fábrica para seleccionar el procesador adecuado
export function getFileProcessor(file: File) {
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