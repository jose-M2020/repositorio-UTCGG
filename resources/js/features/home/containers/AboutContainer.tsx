import { about } from '@/actions/App/Http/Controllers/HomeController';
import { SiteHeader } from '@/shared/components';
import { AboutContent } from '../components/AboutContent';

export const AboutContainer = () => {
    return (
        <div className="min-h-screen bg-stone-50 dark:bg-slate-950">
            <SiteHeader aboutUrl={about.url()} />
            <AboutContent />
        </div>
    );
};
