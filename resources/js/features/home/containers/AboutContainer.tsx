import { about } from '@/actions/App/Http/Controllers/HomeController';
import { SiteFooter, SiteHeader } from '@/shared/components';
import { AboutContent } from '../components/AboutContent';

export const AboutContainer = () => {
    return (
        <div className="flex min-h-screen flex-col bg-background">
            <SiteHeader aboutUrl={about.url()} />
            <AboutContent />
            <SiteFooter />
        </div>
    );
};
