import { CareersSection } from '../components/landing/CareersSection';
import { HomeHero } from '../components/landing/HomeHero';
import { RepositoryHighlights } from '../components/landing/RepositoryHighlights';
import { StatsStrip } from '../components/landing/StatsStrip';
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
