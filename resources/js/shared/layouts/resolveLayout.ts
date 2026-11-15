import type { ComponentType, ReactNode } from 'react';
import { PanelLayout } from './PanelLayout';
import { PublicLayout } from './PublicLayout';

export type PageLayout = ComponentType<{ children: ReactNode }>;

/**
 * Maps the first segment of an Inertia page name (`pages/{surface}/...`)
 * to its shell layout.
 */
const SURFACE_LAYOUTS: Record<string, PageLayout> = {
    public: PublicLayout,
    auth: PublicLayout,
    panel: PanelLayout,
};

export const resolveLayout = (name: string): PageLayout | null => {
    const surface = name.split('/')[0] ?? '';

    return SURFACE_LAYOUTS[surface] ?? null;
};
