import React, { useCallback, useState } from 'react';
import { Upload, FileText, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from './ui/Button';
import api from '../services/api';

const FileUpload = ({ onUploadSuccess }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const handleDrag = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setIsDragging(true);
        } else if (e.type === 'dragleave') {
            setIsDragging(false);
        }
    }, []);

    const handleDrop = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setError(null);
        }
    }, []);

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setError(null);
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setUploading(true);
        setError(null);

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/files/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.valid) {
                onUploadSuccess();
                setFile(null);
            }
        } catch (err) {
            console.error("Upload Error Details:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else if (err.message) {
                setError(`Error: ${err.message}`);
            } else {
                setError('Upload failed. Unknown error.');
            }
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="w-full">
            <div
                className={cn(
                    "relative border-2 border-dashed rounded-lg p-8 text-center transition-colors",
                    isDragging ? "border-primary-500 bg-primary-50" : "border-slate-200 hover:border-primary-500 hover:bg-slate-50",
                    file ? "bg-slate-50" : ""
                )}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
            >
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleChange}
                    accept=".pdf,.docx,.txt"
                    disabled={uploading}
                />

                <div className="flex flex-col items-center justify-center gap-2">
                    {file ? (
                        <>
                            <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                                <FileText className="h-6 w-6 text-primary-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-900">{file.name}</p>
                            <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </>
                    ) : (
                        <>
                            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center">
                                <Upload className="h-6 w-6 text-slate-600" />
                            </div>
                            <p className="text-sm font-medium text-slate-900">
                                Drop your legal document here, or click to browse
                            </p>
                            <p className="text-xs text-slate-500">
                                Supports PDF, DOCX, TXT
                            </p>
                        </>
                    )}
                </div>
            </div>

            {error && (
                <div className="mt-3 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    {error}
                </div>
            )}

            {file && (
                <div className="mt-4 flex justify-end gap-2">
                    <Button variant="ghost" onClick={() => setFile(null)} disabled={uploading}>
                        Cancel
                    </Button>
                    <Button onClick={handleUpload} isLoading={uploading}>
                        Upload Document
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
