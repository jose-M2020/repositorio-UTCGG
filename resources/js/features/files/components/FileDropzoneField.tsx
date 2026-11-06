import { useDropzone } from 'react-dropzone';

type FileDropzoneFieldProps = {
    label: string;
    accept: Record<string, string[]>;
    maxFiles?: number;
    files: File[];
    error?: string;
    onFilesChange: (files: File[]) => void;
};

export const FileDropzoneField = ({
    label,
    accept,
    maxFiles = 5,
    files,
    error,
    onFilesChange,
}: FileDropzoneFieldProps) => {
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        maxFiles,
        onDrop: (accepted) => {
            onFilesChange(accepted.slice(0, maxFiles));
        },
    });

    return (
        <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                {label}
            </p>
            <div
                {...getRootProps()}
                className={`cursor-pointer rounded-xl border border-dashed px-4 py-8 text-center text-sm transition ${
                    isDragActive
                        ? 'border-slate-900 bg-slate-100 dark:border-slate-100 dark:bg-slate-800'
                        : 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-950'
                }`}
                role="button"
                tabIndex={0}
                aria-label={label}
            >
                <input {...getInputProps()} />
                <p>
                    {isDragActive
                        ? 'Suelta los archivos aquí'
                        : 'Arrastra archivos o haz clic para seleccionar'}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                    Máximo {maxFiles} archivos
                </p>
            </div>
            {files.length > 0 ? (
                <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                    {files.map((file) => (
                        <li key={`${file.name}-${file.size}`}>{file.name}</li>
                    ))}
                </ul>
            ) : null}
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </div>
    );
};
