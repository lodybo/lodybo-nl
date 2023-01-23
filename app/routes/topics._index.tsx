import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import ListPageLayout from '~/layouts/ListPage';
import { getTags } from '~/models/tags.server';
import TopicPreview from '~/components/TopicPreview';
import List from '~/components/List';

export const loader = async () => {
  const topics = await getTags();

  if (!topics) {
    throw notFound({});
  }

  return json({
    topics,
  });
};

export const meta: MetaFunction = () => ({
  title: 'Topics | Lodybo',
});

export default function PostsPage() {
  const { topics } = useLoaderData<typeof loader>();

  return (
    <ListPageLayout>
      <List title="Topics I've written about" grid>
        {topics.map((topic) => (
          <TopicPreview key={topic.id} topic={topic} />
        ))}
      </List>
    </ListPageLayout>
  );
}

export function CatchBoundary() {
  return (
    <ListPageLayout>
      <h1 className="text-4xl">No topics found.</h1>
    </ListPageLayout>
  );
}
