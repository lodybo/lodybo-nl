import type { LoaderArgs, MetaFunction } from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import PostList from '~/components/PostList';
import { getTagInfo } from '~/models/tags.server';
import { getPostsForTag } from '~/models/posts.server';

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

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return {
      title: 'Lodybo',
    };
  }

  const { tag } = data;

  return {
    title: `Topic ${tag.name} | Lodybo`,
    description: tag.description,
  };
};

export default function TopicPage() {
  const { tag, posts } = useLoaderData<typeof loader>();

  return (
    <div className="mt-10">
      <PostList
        title={tag.name!}
        description={tag.description}
        image={tag.feature_image}
        posts={posts}
      />
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();
  const { data }: { data: ErrorRequest } = caught;
  console.error({ data });

  return (
    <div className="mt-10">
      <h1 className="text-4xl">
        {data.missing === 'topic' && `There's no topic "${data.slug}" known`}
        {data.missing === 'posts' &&
          `There are no posts found with the topic "${data.slug}"`}
      </h1>
    </div>
  );
}
