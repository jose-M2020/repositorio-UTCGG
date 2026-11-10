import { Head } from '@inertiajs/react';
import {
    HomeContainer,
    type HomeCareer,
    type HomeRepository,
} from '@/features/home';

type HomePageProps = {
    latest: HomeRepository[];
    featured: HomeRepository[];
    homeCareers: HomeCareer[];
};

const HomePage = ({ latest, featured, homeCareers }: HomePageProps) => {
    return (
        <>
            <Head title="Inicio" />
            <HomeContainer
                latest={latest}
                featured={featured}
                homeCareers={homeCareers}
            />
        </>
    );
};

export default HomePage;
