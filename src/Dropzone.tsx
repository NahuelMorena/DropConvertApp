import './Dropzone.css';
import { useState, useRef } from 'react';
import { FaFileAlt } from 'react-icons/fa';
import { concatenateFiles } from './utils/ConcatenateFiles';

// Lista de formatos permitidos
const ALLOWED_FILE_TYPES = ['.txt', '.csv', '.json', '.xml', '.arff'];

const Dropzone = (): JSX.Element => {
    const [files, setFiles] = useState<File[]>([]);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    /**
     * Filtra los archivos seleccionados en válidos e inválidos según los formatos permitidos.
     * Muestra un mensaje de error si hay archivos inválidos.
     * @param inputFiles Archivo a procesar.
     * @returns Archivos válidos.
     */
    const filterFiles = (inputFiles: FileList | File[]): File[] => {
        const fileArray = Array.isArray(inputFiles) ? inputFiles : Array.from(inputFiles);
        const invalidFiles = fileArray.filter(file => 
            !ALLOWED_FILE_TYPES.some(type => file.name.endsWith(type))
        );

        if (invalidFiles.length > 0) {
            showErrorMessage('Formato de archivo no permitido.');
        }

        const validFiles = fileArray.filter(file => 
            ALLOWED_FILE_TYPES.some(type => file.name.endsWith(type))
        );

        return validFiles;
    };

    /**
     * Maneja el evento de arrastrar y soltar archivos en el área designada.
     * Filtrar los archivos por su tipo permitido y actualizar la lista de archivos válidos.
     * Muestra un mensaje de error si se detectan archivos no válidos.
     * @param event Evento de arrastre (DragEvent) que contiene los archivos arrastrados.
     */
    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const validFiles = filterFiles(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    };

     /**
     * Maneja el cambio en el selector de archivos, filtrando por tipos permitidos.
     * Actualiza la lista de archivos válidos y muestra un mensaje de error para los archivos no válidos.
     * @param event Evento de cambio (ChangeEvent) que contiene los archivos seleccionados.
     */
     const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const validFiles = filterFiles(event.target.files)
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        }
    };

    /**
     * Procesa los archivos seleccionados, concatenándolos en un archivo de texto plano.
     * Descarga el archivo resultante o muestra un mensaje de error en caso de fallo.
     */
    const processFiles = async () => {
        if (files.length === 0) {
            showErrorMessage('No hay archivos para procesar');
            return;
        }

        try {
            const concatenatedContent = await concatenateFiles(files);
            console.log('Archivo concatenado:', concatenatedContent)
            
            const blob = new Blob([concatenatedContent], {type: 'text/plain'});
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'concatenated_files.txt';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
            console.log('Archivo descargado exitosamente')
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error desconocido al procesar los archivos';
            showErrorMessage(errorMessage);
        }
    };

    /**
     * Maneja el clic sobre el contenedor, abriendo el selector de archivos a menos que 
     * se haga clic en un botón de eliminación.
     * @param event Evento de clic (MouseEvent) capturado en el contenedor.
     */
    const handleClick = (event: React.MouseEvent) => {
        if ((event.target as HTMLElement).classList.contains('remove-file-button')) {
            return;
        }
        fileInputRef.current?.click();
    };

    /**
     * Elimina un archivo específico de la lista de archivos seleccionados.
     * @param fileToRemove Archivo que será eliminado.
     * @param event Evento de clic (MouseEvent) que desencadena la eliminación.
     */
    const removeFile = (fileToRemove: File, event: React.MouseEvent) => {
        event.stopPropagation();
        setFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove))
    }

    /**
     * Muestra un mensaje de error en la interfaz durante un tiempo determinado.
     * @param message Mensaje de error a mostrar.
     */
    const showErrorMessage = (message: string) => {
        setErrorMessage(message);
        setTimeout(() => setErrorMessage(null), 3000)
    };

    return (
        <div className='dropzone-container'>
            <div
                className="dropzone"
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                onClick={handleClick}
            >
                {files.length === 0 ? (
                    <p className='dropzone-text'>
                        Arrastra tus archivos aquí o haz clic para seleccionarlos
                    </p>
                ) : (
                    <div className="file-icons-preview">
                        {files.map((file, index) => (
                            <div key={index} className="file-icon">
                                <button
                                    className='remove-file-button'
                                    onClick={(event) => removeFile(file, event)}
                                >
                                    x
                                </button>
                                <FaFileAlt style={{ fontSize: '60px', color: '#007bff' }} className="file-icon-image" />
                                <span className='file-icon-name'>{file.name}</span>
                            </div>
                        ))}
                    </div>
                )}
               
                <input
                    type="file"
                    className="file-input"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                    accept={ALLOWED_FILE_TYPES.join(',')}
                />
            </div>
            
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="process-button" onClick={processFiles}>
                Procesar Archivos
            </button>
        </div>
    );
};

export default Dropzone;