import './Dropzone.css';
import { useState, useRef } from 'react';

const Dropzone = (): JSX.Element => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles(droppedFiles)
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const processFiles = () => {
        files.forEach((file) => {
            console.log(`Procesando : ${file.name}`);
        });
    };

    const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = event.target.files;
        if (selectedFiles) {
            setFiles(Array.from(selectedFiles));
        }
    };

    const handleClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <div className='dropzone-container'>
            <div
                className="dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={handleClick}
            >
                <p className='dropzone-text'>
                    Arrastra tus archivos aquí o haz clic para seleccionarlos
                </p>
                <input
                    type="file"
                    className="file-input"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileInputChange}
                />
            </div>

            {files.length > 0 && (
                <ul className="file-list">
                    {files.map((file, index) => (
                        <li key={index}>{file.name}</li>
                    ))}
                </ul>
            )}
            <button className="process-button" onClick={processFiles}>
                Procesar Archivos
            </button>
        </div>
    );
};

export default Dropzone;