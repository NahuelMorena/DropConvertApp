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

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        const validFiles = droppedFiles.filter(file =>
            ALLOWED_FILE_TYPES.some(type => file.name.endsWith(type))
        );
        const invalidFiles = droppedFiles.filter(file =>
            !ALLOWED_FILE_TYPES.some(type => file.name.endsWith(type))
        );

        if (invalidFiles.length > 0) {
            showErrorMessage('Formato de archivo no permitido.')
        }

        setFiles((prevFiles) => [...prevFiles, ...validFiles]);
    };

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

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            const validFiles = Array.from(selectedFiles).filter(file =>
                ALLOWED_FILE_TYPES.some(type => file.name.endsWith(type))
            );
            const invalidFiles = Array.from(selectedFiles).filter(file =>
                !ALLOWED_FILE_TYPES.some(type => file.name.endsWith(type))
            );

            if (invalidFiles.length > 0) {
                showErrorMessage('Formato de archivo no permitido.');
            }
            setFiles((prevFiles) => [...prevFiles, ...validFiles]);
        }
    };

    const handleClick = (event: React.MouseEvent) => {
        if ((event.target as HTMLElement).classList.contains('remove-file-button')) {
            return;
        }
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const removeFile = (fileToRemove: File, event: React.MouseEvent) => {
        event.stopPropagation();
        setFiles((prevFiles) => prevFiles.filter(file => file !== fileToRemove))
    }

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