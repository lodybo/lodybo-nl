import { json } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import PostList from '~/components/PostList';
import { getPosts } from '~/models/posts.server';
import ListPageLayout from '~/layouts/ListPage';

export const loader = async () => {
  const posts = await getPosts();

  if (!posts) {
    throw notFound({});
  }

  return json({
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

export const meta: MetaFunction = () => ({
  title: 'Posts | Lodybo',
});

export default function PostsPage() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <ListPageLayout>
      <PostList title="What I've written" posts={posts} />
    </ListPageLayout>
  );
}

export function CatchBoundary() {
  return (
    <ListPageLayout>
      <h1 className="text-4xl">No posts found.</h1>
    </ListPageLayout>
  );
}
