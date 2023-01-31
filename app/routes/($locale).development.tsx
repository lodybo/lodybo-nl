import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import type { PostOrPage } from '@tryghost/content-api';
import invariant from 'tiny-invariant';
import { getPage } from '~/models/pages.server';

export const loader = async ({ params }: LoaderArgs) => {
  let content: PostOrPage | void;

  if (params.locale === 'nl') {
    content = await getPage('development-nl');
  } else {
    content = await getPage('development');
  }

  invariant(content, 'Content not found');

  return json({ content });
};

const DevelopmentPage = () => {
  const { content } = useLoaderData<typeof loader>();

  return (
    <div className="mt-10">
      <h1>{content.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content.html || '' }} />
    </div>
  );
};

export default DevelopmentPage;
