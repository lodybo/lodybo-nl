import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { getPosts } from '~/models/posts.server';
import PageLayout from '~/layouts/Page';
import PostPreview from '~/components/PostPreview';

export const loader = async () => {
  const posts = await getPosts();

  if (!posts) {
    return json({ noPosts: true, posts: [] });
  }

  return json({
    noPosts: false,
    posts: posts.map((post) => ({
      id: post.id,
      tags: post.tags,
      published_at: post.published_at,
      excerpt: post.excerpt,
      featured: post.featured,
      reading_time: post.reading_time,
      slug: post.slug,
      title: post.title,
    }))
  });
};

export default function Posts() {
  const { noPosts, posts } = useLoaderData<typeof loader>();

  return (
    <PageLayout>
      <div className="px-20 mx-auto">
        { noPosts ? (
          <h1 className="text-4xl">No posts found.</h1>
        ) : (
          <div className="px-5 lg:px-40">
            <h1 className="text-4xl mb-10">What I've written</h1>
            <ul className="flex flex-col gap-10">
              { posts.map(post => (
                <PostPreview key={post.id} post={ post }/>
              )) }
            </ul>
          </div>
        ) }
      </div>
    </PageLayout>
  );
}
