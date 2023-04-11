import MainSection from '~/components/MainSection';
import Project from './Project';

export default function Projects() {
  return (
    <MainSection className="space-y-5">
      <h1 className="text-4xl">Projects</h1>

      <div className="grid grid-cols-2 gap-4">
        <Project
          name="Borgers website"
          description="The website for my family band."
          url="https://www.borgersfamilie.nl"
          image="/image/borgers-website.webp"
          type="website"
        />

        <Project
          name="THE MARCH"
          description="The website for my own band."
          url="https://www.themarch.nl"
          image="/image/the-march.webp"
          type="website"
        />
      </div>
    </MainSection>
  );
}
