export const careers: Record<string, string> = {
    TIC: 'Tecnologías de la Información y Comunicación',
    G: 'Gastronomía',
    MM: 'Metal Mecánica',
    ER: 'Energías Renovables',
    PA: 'Procesos Alimentarios',
    LI: 'Logística Internacional',
    MI: 'Mantenimiento Industrial',
    GCH: 'Gestión del Capital Humano',
    GDT: 'Gestión y Desarrollo Turístico',
};

export const academicDegrees: Record<string, string> = {
    TSU: 'Técnico Superior Universitario',
    Ingeniería: 'Ingeniería',
};

export const projectTypes = [
    'Integradora',
    'Estadía',
    'Proyecto Especial',
] as const;

export const homeCareers = [
    {
        code: 'LI',
        name: 'Logística Internacional',
        image: '/img/carrerasBG/DIE.jpg',
    },
    {
        code: 'ER',
        name: 'Energías Renovables',
        image: '/img/carrerasBG/ER.jpg',
    },
    {
        code: 'G',
        name: 'Gastronomía',
        image: '/img/carrerasBG/G.jpg',
    },
    {
        code: 'MI',
        name: 'Mantenimiento Industrial',
        image: '/img/carrerasBG/MI.jpg',
    },
    {
        code: 'MM',
        name: 'Metal Mecánica',
        image: '/img/carrerasBG/MM.jpg',
    },
    {
        code: 'TIC',
        name: 'Tecnologías de la Información',
        image: '/img/carrerasBG/TI.jpg',
    },
] as const;

export type RepositoryCatalog = {
    careers: Record<string, string>;
    types: string[];
    levels: Record<string, string>;
};
