export type RepositoryFile = {
    id: number;
    original_name: string;
    file_type: string;
    is_public: boolean;
};

export type RepositoryUploadTarget = {
    id: number;
    nombre_rep: string;
    slug: string;
};
