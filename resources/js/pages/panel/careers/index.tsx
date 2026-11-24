import { Head } from '@inertiajs/react';
import {
  CareersIndexContainer,
  type PaginatedCareers,
} from '@/features/careers';

type CareersIndexPageProps = {
  careers: PaginatedCareers;
};

const CareersIndexPage = ({ careers }: CareersIndexPageProps) => {
  return (
    <>
      <Head title="Carreras" />
      <CareersIndexContainer careers={careers} />
    </>
  );
};

export default CareersIndexPage;
