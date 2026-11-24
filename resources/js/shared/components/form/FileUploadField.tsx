import { useEffect, useRef, useState } from 'react';
import {
  FileIcon,
  FileTextIcon,
  ImageIcon,
  UploadIcon,
  XIcon,
} from 'lucide-react';
import {
  useDropzone,
  type Accept,
  type FileError,
  type FileRejection,
} from 'react-dropzone';
import { cn } from 'cn';
import { formatFileSize } from '@/shared/lib/formatFileSize';
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
} from '@/shared/components/ui/attachment';

export type ExistingUploadItem = {
  id: string;
  name: string;
  description?: string;
  url?: string;
};

type FileUploadFieldProps = {
  label: string;
  name?: string;
  accept?: Accept;
  maxFiles?: number;
  maxSize?: number;
  multiple?: boolean;
  files: File[];
  onFilesChange: (files: File[]) => void;
  existing?: ExistingUploadItem[];
  onExistingRemove?: (id: string) => void;
  error?: string;
  hint?: string;
  disabled?: boolean;
  className?: string;
  dropzoneClassName?: string;
  attachmentSize?: 'default' | 'sm' | 'xs';
  attachmentOrientation?: 'horizontal' | 'vertical';
};

const fileKey = (file: File): string =>
  `${file.name}-${file.size}-${file.lastModified}`;

const extensionFromMime = (mime: string): string => {
  const subtype = mime.split('/')[1] ?? '';
  return subtype.replace('+xml', '').toUpperCase() || 'FILE';
};

const fileIconFor = (file: File | ExistingUploadItem) => {
  const mime = 'type' in file ? file.type : '';
  const name = file.name.toLowerCase();

  if (mime.startsWith('image/') || Boolean('url' in file && file.url)) {
    return ImageIcon;
  }

  if (
    mime.includes('pdf') ||
    mime.includes('word') ||
    name.endsWith('.pdf') ||
    name.endsWith('.doc') ||
    name.endsWith('.docx')
  ) {
    return FileTextIcon;
  }

  return FileIcon;
};

const describeRejection = (errors: readonly FileError[]): string => {
  const codes = new Set(errors.map((item) => item.code));

  if (codes.has('file-too-large')) {
    return 'El archivo supera el tamaño maximo permitido';
  }

  if (codes.has('file-invalid-type')) {
    return 'Tipo de archivo no permitido';
  }

  if (codes.has('too-many-files')) {
    return 'Demasiados archivos seleccionados';
  }

  return errors[0]?.message ?? 'No se pudo agregar el archivo';
};

export const FileUploadField = ({
  label,
  name,
  accept,
  maxFiles = 1,
  maxSize,
  multiple = maxFiles > 1,
  files,
  onFilesChange,
  existing = [],
  onExistingRemove,
  error,
  hint,
  disabled = false,
  className,
  dropzoneClassName,
  attachmentSize = 'default',
  attachmentOrientation = 'horizontal',
}: FileUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [rejectionMessage, setRejectionMessage] = useState<string | null>(null);
  const [previewUrls, setPreviewUrls] = useState<Record<string, string>>({});

  const canAddMore = files.length < maxFiles;
  const showDropzone = canAddMore && !disabled;

  useEffect(() => {
    const next: Record<string, string> = {};

    for (const file of files) {
      if (file.type.startsWith('image/')) {
        next[fileKey(file)] = URL.createObjectURL(file);
      }
    }

    setPreviewUrls(next);

    return () => {
      for (const url of Object.values(next)) {
        URL.revokeObjectURL(url);
      }
    };
  }, [files]);

  useEffect(() => {
    if (!inputRef.current || !name) {
      return;
    }

    const dataTransfer = new DataTransfer();
    for (const file of files) {
      dataTransfer.items.add(file);
    }
    inputRef.current.files = dataTransfer.files;
  }, [files, name]);

  const handleDrop = (accepted: File[], rejections: FileRejection[]) => {
    if (rejections.length > 0) {
      setRejectionMessage(describeRejection(rejections[0]?.errors ?? []));
    } else {
      setRejectionMessage(null);
    }

    if (accepted.length === 0) {
      return;
    }

    if (maxFiles === 1) {
      onFilesChange(accepted.slice(0, 1));
      return;
    }

    onFilesChange([...files, ...accepted].slice(0, maxFiles));
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } =
    useDropzone({
      accept,
      maxFiles,
      maxSize,
      multiple,
      disabled: disabled || !canAddMore,
      onDrop: handleDrop,
    });

  const handleRemoveFile = (index: number) => {
    onFilesChange(files.filter((_, fileIndex) => fileIndex !== index));
    setRejectionMessage(null);
  };

  const fieldError = error ?? rejectionMessage;
  const hasAttachments = existing.length > 0 || files.length > 0;
  const selectLabel =
    maxFiles === 1 ? 'Seleccionar archivo' : 'Seleccionar archivos';
  const dropHint =
    maxFiles === 1
      ? 'o arrastra y suelta el archivo aqui'
      : 'o arrastra y suelta los archivos aqui';
  const limitsHint =
    hint ??
    `Maximo ${maxFiles} ${maxFiles === 1 ? 'archivo' : 'archivos'}${
      maxSize ? ` · hasta ${formatFileSize(maxSize)}` : ''
    }`;

  return (
    <div className={cn('space-y-2', className)}>
      <p className="text-sm font-medium">{label}</p>

      {name ? (
        <input
          ref={inputRef}
          type="file"
          name={name}
          multiple={multiple}
          className="sr-only"
          tabIndex={-1}
          aria-hidden
        />
      ) : null}

      {showDropzone ? (
        <div
          {...getRootProps()}
          className={cn(
            'group/dropzone relative flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-4 py-6 text-center transition-[border-color,background-color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
            isDragReject || fieldError
              ? 'border-destructive bg-destructive/5'
              : isDragActive
                ? 'border-foreground bg-muted shadow-[inset_0_0_0_1px] shadow-foreground/10'
                : 'border-muted-foreground/35 bg-muted/40 hover:border-muted-foreground/60 hover:bg-muted/70',
            dropzoneClassName,
          )}
          role="button"
          tabIndex={0}
          aria-label={`${label}. ${selectLabel}. ${dropHint}`}
          aria-invalid={Boolean(fieldError)}
        >
          <input {...getInputProps()} />

          <span
            className={cn(
              'flex size-9 items-center justify-center rounded-full border border-dashed transition-colors',
              isDragReject || fieldError
                ? 'border-destructive/50 bg-destructive/10 text-destructive'
                : isDragActive
                  ? 'border-foreground/40 bg-background text-foreground'
                  : 'border-muted-foreground/30 bg-background text-muted-foreground group-hover/dropzone:border-muted-foreground/50 group-hover/dropzone:text-foreground',
            )}
            aria-hidden
          >
            <UploadIcon
              className={cn(
                'size-4 transition-transform',
                isDragActive && !isDragReject
                  ? 'translate-y-0.5 scale-110'
                  : null,
              )}
            />
          </span>

          <div className="space-y-0.5">
            {isDragActive ? (
              <p
                className={cn(
                  'text-sm font-medium',
                  isDragReject ? 'text-destructive' : 'text-foreground',
                )}
              >
                {isDragReject
                  ? 'Tipo de archivo no valido'
                  : 'Suelta para subir'}
              </p>
            ) : (
              <>
                <p className="text-sm font-medium text-foreground">
                  <span className="underline decoration-muted-foreground/60 underline-offset-4 group-hover/dropzone:decoration-foreground">
                    {selectLabel}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">{dropHint}</p>
              </>
            )}
            <p className="text-xs text-muted-foreground">{limitsHint}</p>
          </div>
        </div>
      ) : null}

      {hasAttachments ? (
        <AttachmentGroup className="flex-wrap overflow-visible">
          {existing.map((item) => {
            const Icon = fileIconFor(item);
            const isImage = Boolean(item.url);

            return (
              <Attachment
                key={item.id}
                state="done"
                size={attachmentSize}
                orientation={attachmentOrientation}
              >
                <AttachmentMedia variant={isImage ? 'image' : 'icon'}>
                  {isImage && item.url ? (
                    <img src={item.url} alt={item.name} />
                  ) : (
                    <Icon />
                  )}
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{item.name}</AttachmentTitle>
                  <AttachmentDescription>
                    {item.description ?? 'Archivo actual'}
                  </AttachmentDescription>
                </AttachmentContent>
                {onExistingRemove ? (
                  <AttachmentActions>
                    <AttachmentAction
                      type="button"
                      aria-label={`Quitar ${item.name}`}
                      onClick={() => onExistingRemove(item.id)}
                    >
                      <XIcon />
                    </AttachmentAction>
                  </AttachmentActions>
                ) : null}
              </Attachment>
            );
          })}

          {files.map((file, index) => {
            const key = fileKey(file);
            const previewUrl = previewUrls[key];
            const Icon = fileIconFor(file);
            const isImage = Boolean(previewUrl);

            return (
              <Attachment
                key={key}
                state="done"
                size={attachmentSize}
                orientation={attachmentOrientation}
              >
                <AttachmentMedia variant={isImage ? 'image' : 'icon'}>
                  {isImage && previewUrl ? (
                    <img src={previewUrl} alt={file.name} />
                  ) : (
                    <Icon />
                  )}
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>{file.name}</AttachmentTitle>
                  <AttachmentDescription>
                    {extensionFromMime(file.type)} · {formatFileSize(file.size)}
                  </AttachmentDescription>
                </AttachmentContent>
                <AttachmentActions>
                  <AttachmentAction
                    type="button"
                    aria-label={`Quitar ${file.name}`}
                    onClick={() => handleRemoveFile(index)}
                  >
                    <XIcon />
                  </AttachmentAction>
                </AttachmentActions>
              </Attachment>
            );
          })}
        </AttachmentGroup>
      ) : null}

      {fieldError ? (
        <p className="text-sm text-destructive">{fieldError}</p>
      ) : null}
    </div>
  );
};
