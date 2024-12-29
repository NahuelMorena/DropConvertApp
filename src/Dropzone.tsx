import './Dropzone.css';
import { useState, useRef } from 'react';
import { FaFileAlt } from 'react-icons/fa';

const Dropzone = (): JSX.Element => {
    const [files, setFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const droppedFiles = Array.from(event.dataTransfer.files);
        setFiles((prevFiles) => [...prevFiles, ...droppedFiles]);
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
            setFiles((prevFiles) => [...prevFiles, ...Array.from(selectedFiles)]);
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

    return (
        <div className='dropzone-container'>
            <div
                className="dropzone"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
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
                />
            </div>
            
            <button className="process-button" onClick={processFiles}>
                Procesar Archivos
            </button>
        </div>
    );
};

export default Dropzone;