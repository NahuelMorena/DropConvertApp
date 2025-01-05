import { FileProcessor } from './FileProcessor'

export class CSVProcessor extends FileProcessor {
    async process(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                try {
                    const content = reader.result as string;
                    const rows = content.split("\n").map(row => row.trim());

                    const data = rows.slice(1).map(row => {
                        return row.split(',').map(value => value.trim());
                    });

                    const plainText = data.map(row => row.join(' ')).join('\n');
                    resolve(plainText);
                } catch (error: unknown) {
                    this.handleError(error, reject, 'Error al procesar CSV');
                }
            };
            reader.onerror = (error) => this.handleError(error, reject, 'Error al leer archivo CSV');
            reader.readAsText(file);
        });
    }
}