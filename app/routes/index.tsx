import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import lody from '~/assets/images/lody.svg';

import AnchorLink from '~/components/AnchorLink';
import PostList from '~/components/PostList';
import Icon from '~/components/Icon';
import HomePageLayout from '~/layouts/HomePage';

import { getRecentPosts } from '~/models/posts.server';

export const loader = async () => {
  const posts = await getRecentPosts();

  return json({ posts });
};

export default function Index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <HomePageLayout>
      <div className="my-32 flex flex-row gap-5 h-80">
        <img src={lody} alt="Me" />

        <div className="h-full flex flex-col gap-4 justify-center">
          <h1 className="text-8xl font-black">Hello, I'm Lody</h1>
          <p className="text-3xl leading-relaxed font-light">
            Born and raised in The Netherlands, currently work at{' '}
            <AnchorLink href="https://www.taf.nl">TAF</AnchorLink>, and I
            occasionally{' '}
            <AnchorLink href="https://www.themarch.nl">make</AnchorLink>{' '}
            <AnchorLink href="https://www.borgersfamilie.nl/">music</AnchorLink>{' '}
            too.
          </p>
        </div>
      </div>

      <PostList title="Some recent posts" posts={posts} grid />

      <div className="mt-10 px-5 flex justify-end">
        <AnchorLink to="/posts">
          <span className="flex flex-row items-center gap-2 hover:gap-3 transition-all">
            Read more here <Icon name="arrow-right" />
          </span>
        </AnchorLink>
      </div>
    </HomePageLayout>
  );
}
