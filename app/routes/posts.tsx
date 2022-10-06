import { json } from '@remix-run/node';
import { useLoaderData, Link, Outlet } from '@remix-run/react';
import { getPosts } from '~/models/posts.server';

export const loader = async () => {
  const posts = await getPosts();

  if (!posts) {
    return json({ noPosts: true, posts: [] });
  }

  return json({ noPosts: false, posts });
};

export default function Post() {
  const { noPosts, posts } = useLoaderData<typeof loader>();

  if (noPosts) {
    return (
      <div className="prose">
        <h1>No posts found.</h1>
      </div>
    );
  }

  return (
    <div className="prose">
      <h1>Posts</h1>

      <div className="flex flex-row gap-5">
        <ul>
          { posts.map(post => (
            <li key={post.id}>
              <Link to={`/posts/${post.slug}`}>{ post.title }</Link>
            </li>
          )) }
        </ul>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
