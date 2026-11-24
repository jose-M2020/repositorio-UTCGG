import { Head } from '@inertiajs/react';
import {
  EducationLevelsIndexContainer,
  type PaginatedEducationLevels,
} from '@/features/education-levels';

type EducationLevelsIndexPageProps = {
  educationLevels: PaginatedEducationLevels;
};

const EducationLevelsIndexPage = ({
  educationLevels,
}: EducationLevelsIndexPageProps) => {
  return (
    <>
      <Head title="Niveles educativos" />
      <EducationLevelsIndexContainer educationLevels={educationLevels} />
    </>
  );
};

export default EducationLevelsIndexPage;
