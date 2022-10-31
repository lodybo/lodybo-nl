import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import PostList from '~/components/PostList';
import { getTagInfo } from '~/models/tags.server';
import { getPostsForTag } from '~/models/posts.server';
import ListPageLayout from '~/layouts/ListPage';
import { useEffect } from 'react';

type NoTopic = {
  missing: 'topic';
  slug: string | undefined;
};

type NoPosts = {
  missing: 'posts';
  slug: string | undefined;
};

type ErrorRequest = NoTopic | NoPosts;

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;

  if (!slug) {
    return redirect('/topics');
  }

  const tag = await getTagInfo(slug);

  if (!tag) {
    throw notFound<NoTopic>({ missing: 'topic', slug });
  }

  const posts = await getPostsForTag(tag.slug);

  if (!posts) {
    throw notFound<NoPosts>({ missing: 'posts', slug });
  }

  return json({
    tag,
    posts: posts.map((post) => ({
      id: post.id,
      tags: post.tags,
      published_at: post.published_at,
      excerpt: post.excerpt,
      featured: post.featured,
      feature_image: post.feature_image,
      feature_image_alt: post.feature_image_alt,
      reading_time: post.reading_time,
      slug: post.slug,
      title: post.title,
    })),
  });
};

export const meta: MetaFunction = ({ data }) => ({
  title: `${data.tag ? `Topic "${data.tag.name}" | ` : ''} Lodybo`,
});

export default function TopicPage() {
  const { tag, posts } = useLoaderData<typeof loader>();

  return (
    <ListPageLayout>
      <PostList
        title={tag.name!}
        description={tag.description}
        image={tag.feature_image}
        posts={posts}
      />
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
  const caught = useCatch();
  const data: ErrorRequest = JSON.parse(caught.data);
  console.error({ data });

  return (
    <ListPageLayout>
      <h1 className="text-4xl">
        {data.missing === 'topic' && `There's no topic "${data.slug}" known`}
        {data.missing === 'posts' &&
          `There are no posts found with the topic "${data.slug}"`}
      </h1>
    </ListPageLayout>
  );
}
