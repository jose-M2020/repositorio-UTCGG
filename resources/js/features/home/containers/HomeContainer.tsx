import { CareersSection } from '../components/CareersSection';
import { HomeHero } from '../components/HomeHero';
import { RepositoryHighlights } from '../components/RepositoryHighlights';
import { StatsStrip } from '../components/StatsStrip';
import type { HomeCareer, HomeRepository } from '../types';

type HomeContainerProps = {
    latest: HomeRepository[];
    featured: HomeRepository[];
    homeCareers: HomeCareer[];
};

export const HomeContainer = ({
    latest,
    featured,
    homeCareers,
}: HomeContainerProps) => {
    return (
        <>
            <HomeHero />
            <StatsStrip />
            <CareersSection careers={homeCareers} />
            <RepositoryHighlights
                title="Recursos destacados"
                description="Una selección aleatoria de proyectos públicos del repositorio."
                items={featured}
            />
            <RepositoryHighlights
                title="Añadido recientemente"
                description="Los últimos repositorios publicados para consulta abierta."
                items={latest}
            />
        </>
    );
};
