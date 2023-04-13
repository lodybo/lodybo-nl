import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPage } from '~/models/pages.server';
import { notFound } from 'remix-utils';
import Prose from '~/components/Prose';
import Navigation from '~/components/Navigation';
import MainSection from '~/components/MainSection';

export const loader = async ({ params }: LoaderArgs) => {
  const { pageSlug } = params;

  const page = await getPage(pageSlug!);

  if (!page) {
    throw notFound({});
  }

  return json({ page });
};

export default function Post() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <>
      <Navigation position="relative" />

      <MainSection className="mt-10">
        <Prose>
          <h1>{page.title}</h1>

          <div dangerouslySetInnerHTML={{ __html: page.html || '' }} />
        </Prose>
      </MainSection>
    </>
  );
}

export function CatchBoundary() {
  return <h1>Page not found</h1>;
}
