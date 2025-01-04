import { FileProcessor } from "./FileProcessor";

export class JSONProcessor extends FileProcessor {
    async process(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const data = JSON.parse(reader.result as string);
                    const plainText = this.processData(data);
                    resolve(plainText)
                } catch (error: unknown) {
                    this.handleError(error, reject, 'Error al procesar JSON');
                }
            };
            reader.onerror = (error) => this.handleError(error, reject, 'Error al leer archivo JSON');
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
        
        return this.formatRows(rows, this.calculateColumnWidth(rows));
    }
}