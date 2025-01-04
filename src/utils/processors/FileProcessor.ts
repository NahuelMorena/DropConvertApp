export abstract class FileProcessor {

    //Determinar el ancho de cada columna
    protected calculateColumnWidth(rows: string[][]): number[] {
        return rows.reduce((widths, row) => {
            row.forEach((col, i) => {
                widths[i] = Math.max(widths[i] || 0, col.length);
            });
            return widths;
        }, [] as number[]);
    }

    // Generar las filas formateadas
    protected formatRows(rows: string[][], columnWidths: number[]): string {
        return rows.map(row => {
            return row.map((col, i) => col.padEnd(columnWidths[i])).join('\t');
        }).join('\n');
    }

    // Método común para manejar errores
    protected handleError(error: unknown, reject: (reason?: any) => void, customMessage: string): void {
        if (error instanceof Error) {
            reject(`${customMessage}: ${error.message}`)
        } else {
            reject(`Error desconocido`);
        }
    }
    
    //Metodo que debe implementar las clases hijas
    abstract process(file: File): Promise<string>;
}