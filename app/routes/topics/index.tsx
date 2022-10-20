import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import ListPageLayout from '~/layouts/ListPage';
import { getTags } from '~/models/tags.server';
import TopicPreview from '~/components/TopicPreview';
import { useEffect } from 'react';
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

export default function PostsPage() {
  const { topics } = useLoaderData<typeof loader>();

  return (
    <ListPageLayout>
      <List title="Topics I've written about">
        {topics.map((topic) => (
          <TopicPreview key={topic.id} topic={topic} />
        ))}
      </List>
    </ListPageLayout>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  useEffect(() => {
    (window as any).Prism.highlightAll();
  });

  return (
    <ListPageLayout>
      <div className="prose prose-xl max-w-none">
        <h1>Oops.. Something went wrong!</h1>

        <p>
          It's not you, it's us. We encountered an error and reported it.
          <br />
          If you're curious, this is what it said:
        </p>

        <pre className="language-jsstacktrace">
          <code className="language-jsstacktrace">{error.stack}</code>
        </pre>
      </div>
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
