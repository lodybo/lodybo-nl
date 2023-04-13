import { json } from '@remix-run/node';
import type { LoaderArgs } from '@remix-run/node';
import type { MetaFunction } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import PostList from '~/components/PostList';
import { getPosts } from '~/models/posts.server';
import PostPagination from '~/components/Pagination';
import { filterInternalTags } from '~/models/tags.server';
import Navigation from '~/components/Navigation';
import MainSection from '~/components/MainSection';

export const loader = async ({ request }: LoaderArgs) => {
  const pageParam = new URL(request.url).searchParams.get('page') || '1';
  const pageNumber = parseInt(pageParam, 10);

  const posts = await getPosts({ page: pageNumber });

  if (!posts) {
    throw notFound({});
  }

  return json({
    posts: posts.map((post) => ({
      id: post.id,
      tags: filterInternalTags(post.tags),
      published_at: post.published_at,
      excerpt: post.excerpt,
      featured: post.featured,
      feature_image: post.feature_image,
      feature_image_alt: post.feature_image_alt,
      reading_time: post.reading_time,
      slug: post.slug,
      title: post.title,
    })),
    meta: posts.meta,
  });
};

export const meta: MetaFunction = () => ({
  title: 'Posts | Lodybo',
});

export default function PostsPage() {
  const { posts, meta } = useLoaderData<typeof loader>();

  return (
    <>
      <Navigation />
      <MainSection className="mt-10">
        <PostList title="What I've written" posts={posts} />
        {meta.pagination.pages > 1 ? (
          <PostPagination {...meta.pagination} />
        ) : null}
      </MainSection>
    </>
  );
}

export function CatchBoundary() {
  return (
    <>
      <Navigation />
      <div className="mt-10">
        <h1 className="text-4xl">No posts found.</h1>
      </div>
    </>
  );
}
