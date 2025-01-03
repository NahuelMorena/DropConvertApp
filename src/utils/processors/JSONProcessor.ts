import { FileProcessor } from "./FileProcessor";

export class JSONProcessor implements FileProcessor {
    async process(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              try {
                const data = JSON.parse(reader.result as string);
                const plainText = this.processData(data);
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

    private processData(data: any): string {
        const rows: string[][] = [];
        let headers: string[] = [];
        function flatten(item: any, context: string[] = []): void {
            if (Array.isArray(item)) {
                item.forEach(subItem => flatten(subItem, context));
            } else if (typeof item === 'object' && item !== null) {
                let localContext: string[] = [...context];
                for (const [key, value] of Object.entries(item)) {
                    if (Array.isArray(value)) {
                        headers.push(...localContext);
                        value.forEach(subItem => flatten(subItem, [...localContext]));
                    } else if (typeof value === 'object' && value !== null) {
                        flatten(value, [...localContext, key]);
                    } else {
                        localContext.push(String(value));
    
                    }
                }
                if (localContext.some(item => !headers.includes(item))) {
                    rows.push(localContext);
                }
            } else {
                rows.push([...context, String(item)]);
            }
        }
        flatten(data);
    
        // Filtrar filas incompletas o redundantes
        const filteredRows = rows.filter(row => row.some(col => col.trim() !== ''));
    
        // Determinar el ancho de cada columna
        const columnWidths = filteredRows.reduce((widths, row) => {
            row.forEach((col, i) => {
                widths[i] = Math.max(widths[i] || 0, col.length);
            });
            return widths;
        }, [] as number[]);
    
        // Generar las filas formateadas
        return rows.map(row => {
            return row.map((col, i) => col.padEnd(columnWidths[i])).join('\t');
        }).join('\n');        
    }
}