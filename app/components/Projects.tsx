import MainSection from '~/components/MainSection';
import Project from './Project';

export default function Projects() {
  return (
    <MainSection className="space-y-5">
      <h1 className="text-4xl">Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Project
          name="Borgers website"
          description="My taste for music makes sense if you know that most of my family are musicians. So, of course, we have a family band! I built the website using React and Gatsby, but I'm already planning a rebuild with Remix!"
          url="https://www.borgersfamilie.nl"
          image="/image/borgers-website.webp"
          type="website"
        />

        <Project
          name="THE MARCH"
          description="When I'm not developing, I'm making music. I built the website for my band in Next.js with a Notion database as back-end for the live shows."
          url="https://www.themarch.nl"
          image="/image/the-march.webp"
          type="website"
        />
      </div>
    </MainSection>
  );
}
