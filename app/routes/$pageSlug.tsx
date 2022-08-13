import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPage } from '~/api/pages';
import invariant from 'tiny-invariant';

export const loader = async ({ params }: LoaderArgs) => {
  const { pageSlug } = params;
  invariant(!!pageSlug, 'Slug is required');

  const page = await getPage(pageSlug);
  invariant(!!page, `No page found with slug ${pageSlug}`);

  return json({ page, });
};

export default function Post() {
  const { page } = useLoaderData<typeof loader>();

  if (page === undefined) {
    return (
      <div className="prose">
        <h1>No post found.</h1>
      </div>
    );
  }

  return (
    <div className="prose">
      <h1>{page.title}</h1>

      <div dangerouslySetInnerHTML={{ __html: page.html || '' }} />
    </div>
  );
}
