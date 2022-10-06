import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPage } from '~/models/pages.server';
import { notFound } from 'remix-utils';

export const loader = async ({ params }: LoaderArgs) => {
  const { pageSlug } = params;

  const page = await getPage(pageSlug!);

  if (!page) {
    throw notFound({});
  }

  return json({ page, });
};

export default function Post() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <div className="prose">
      <h1>{page.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: page.html || '' }} />
    </div>
  );
}

export function CatchBoundary() {
  return (
    <h1>Page not found</h1>
  );
}
