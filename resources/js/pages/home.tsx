import { Head } from '@inertiajs/react';
import { HomeContainer, type HomeRepository } from '@/features/home';

type HomePageProps = {
    latest: HomeRepository[];
    featured: HomeRepository[];
};

export default function HomePage({ latest, featured }: HomePageProps) {
    return (
        <>
            <Head title="Inicio" />
            <HomeContainer latest={latest} featured={featured} />
        </>
    );
}
