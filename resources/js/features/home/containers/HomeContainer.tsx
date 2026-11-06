import { about } from '@/actions/App/Http/Controllers/HomeController';
import { SiteFooter, SiteHeader } from '@/shared/components';
import { CareersSection } from '../components/CareersSection';
import { HomeHero } from '../components/HomeHero';
import { RepositoryHighlights } from '../components/RepositoryHighlights';
import { StatsStrip } from '../components/StatsStrip';
import type { HomeRepository } from '../types';

type HomeContainerProps = {
    latest: HomeRepository[];
    featured: HomeRepository[];
};

export const HomeContainer = ({ latest, featured }: HomeContainerProps) => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader aboutUrl={about.url()} />
            <HomeHero />
            <StatsStrip />
            <CareersSection />
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
            <SiteFooter />
        </div>
    );
};
