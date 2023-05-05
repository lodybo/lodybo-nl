import { json, V2_MetaFunction } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import { getTags } from '~/models/tags.server';
import TopicPreview from '~/components/TopicPreview';
import List from '~/components/List';
import Navigation from '~/components/Navigation';
import MainSection from '~/components/MainSection';

export const loader = async () => {
  const topics = await getTags();

  if (!topics) {
    throw notFound({});
  }

  return json({
    topics,
  });
};

export const meta: V2_MetaFunction = () => [
  {
    title: 'Topics | Lodybo',
  },
];

export default function PostsPage() {
  const { topics } = useLoaderData<typeof loader>();

  return (
    <>
      <Navigation />
      <MainSection className="mt-10">
        <List title="Topics I've written about" grid>
          {topics.map((topic) => (
            <TopicPreview key={topic.id} topic={topic} />
          ))}
        </List>
      </MainSection>
    </>
  );
}

export function CatchBoundary() {
  return (
    <>
      <Navigation />
      <div className="mt-10">
        <h1 className="text-4xl">No topics found.</h1>
      </div>
    </>
  );
}
