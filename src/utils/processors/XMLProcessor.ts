import { FileProcessor } from "./FileProcessor";

export class XMLProcessor extends FileProcessor {
    async process(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async () => {
                try {
                    const parser = new DOMParser();
                    const xmlDoc = parser.parseFromString(reader.result as string, "application/xml");
    
                    if (xmlDoc.getElementsByTagName("parsererror").length > 0) {
                        throw new Error("Error al parsear el XML");
                    }
    
                    const plainText = this.processNode(xmlDoc.documentElement);
                    resolve(plainText);
                } catch (error: unknown) {
                    this.handleError(error, reject, 'Error al procesar XML');
                }
            };
            reader.onerror = (error) => this.handleError(error, reject, 'Error al leer archivo JSON');
            reader.readAsText(file);
        });
    }

    private processNode(node: Element): string {
        const rows: string[][] = [];
        let headers: string[] = [];
    
        function traverse(element: Element, context: string[] = []): void {
            const currentRow: string[] = [...context];
    
            Array.from(element.attributes).forEach(attr => {
                headers.push(attr.value);
                currentRow.push(attr.value);
            });
    
            Array.from(element.children).forEach(child => {
                if (child.children.length > 0) {
                    if (currentRow.length > 0){
                        headers.push(currentRow[currentRow.length - 1]);
                    }
                    traverse(child, currentRow);
                } else {
                    const value = child.textContent?.trim();
                    if (value) currentRow.push(value);
                }
            });
    
            if (currentRow.some(item => !headers.includes(item))) {
                rows.push([...currentRow]);
            }
        }
    
        traverse(node);

        return this.formatRows(rows, this.calculateColumnWidth(rows));
    }
}