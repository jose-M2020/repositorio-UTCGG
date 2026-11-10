import { useState } from 'react';
import { cn } from '@/shared/lib/cn';
import { RepositoryPublicView } from '../../public/components/RepositoryPublicView';
import { RepositoryFilesPanel } from '../../shared/components/RepositoryFilesPanel';
import type { Repository } from '../../shared/types';
import { RepositorySettingsSection } from './RepositorySettingsSection';

const REPOSITORY_DETAIL_SECTIONS = {
    PREVIEW: 'preview',
    FILES: 'files',
    SETTINGS: 'settings',
} as const;

type RepositoryDetailSection =
    (typeof REPOSITORY_DETAIL_SECTIONS)[keyof typeof REPOSITORY_DETAIL_SECTIONS];

const SECTION_ITEMS = [
    {
        id: REPOSITORY_DETAIL_SECTIONS.PREVIEW,
        label: 'Vista previa',
    },
    {
        id: REPOSITORY_DETAIL_SECTIONS.FILES,
        label: 'Archivos',
    },
    {
        id: REPOSITORY_DETAIL_SECTIONS.SETTINGS,
        label: 'Configuración',
    },
] as const;

type RepositoryDetailsProps = {
    repositorio: Repository;
};

export const RepositoryDetails = ({ repositorio }: RepositoryDetailsProps) => {
    const [section, setSection] = useState<RepositoryDetailSection>(
        REPOSITORY_DETAIL_SECTIONS.PREVIEW,
    );

    return (
        <div className="space-y-6">
            <div
                role="tablist"
                aria-label="Secciones del repositorio"
                className="flex flex-wrap gap-2 border-b border-border pb-3"
            >
                {SECTION_ITEMS.map((item) => {
                    const isActive = section === item.id;

                    return (
                        <button
                            key={item.id}
                            type="button"
                            role="tab"
                            id={`repo-tab-${item.id}`}
                            aria-selected={isActive}
                            aria-controls={`repo-panel-${item.id}`}
                            tabIndex={isActive ? 0 : -1}
                            onClick={() => setSection(item.id)}
                            className={cn(
                                'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
                                isActive
                                    ? 'bg-primary text-primary-foreground'
                                    : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                            )}
                        >
                            {item.label}
                        </button>
                    );
                })}
            </div>

            <div
                role="tabpanel"
                id={`repo-panel-${REPOSITORY_DETAIL_SECTIONS.PREVIEW}`}
                aria-labelledby={`repo-tab-${REPOSITORY_DETAIL_SECTIONS.PREVIEW}`}
                hidden={section !== REPOSITORY_DETAIL_SECTIONS.PREVIEW}
            >
                <RepositoryPublicView repositorio={repositorio} />
            </div>

            <div
                role="tabpanel"
                id={`repo-panel-${REPOSITORY_DETAIL_SECTIONS.FILES}`}
                aria-labelledby={`repo-tab-${REPOSITORY_DETAIL_SECTIONS.FILES}`}
                hidden={section !== REPOSITORY_DETAIL_SECTIONS.FILES}
            >
                <RepositoryFilesPanel
                    slug={repositorio.slug}
                    files={repositorio.files}
                    imagenes={repositorio.imagenes}
                    imagenUrls={repositorio.imagen_urls}
                    canManage
                />
            </div>

            <div
                role="tabpanel"
                id={`repo-panel-${REPOSITORY_DETAIL_SECTIONS.SETTINGS}`}
                aria-labelledby={`repo-tab-${REPOSITORY_DETAIL_SECTIONS.SETTINGS}`}
                hidden={section !== REPOSITORY_DETAIL_SECTIONS.SETTINGS}
            >
                <RepositorySettingsSection repositorio={repositorio} />
            </div>
        </div>
    );
};
