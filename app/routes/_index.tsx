import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import lody from '~/assets/images/lody.svg';

import AnchorLink from '~/components/AnchorLink';
import PostList from '~/components/PostList';
import Icon from '~/components/Icon';

import { getRecentPosts } from '~/models/posts.server';

export const loader = async () => {
  const posts = await getRecentPosts();

  return json({ posts });
};

export default function _index() {
  const { posts } = useLoaderData<typeof loader>();

  return (
    <>
      <div className="mb-16 mt-0 sm:mb-32 md:mt-32 flex flex-col md:flex-row gap-10 md:gap-5 h-full md:h-80">
        <img
          className="w-2/3 max-w-[20rem] md:w-auto mx-auto"
          src={lody}
          alt="Me"
        />

        <div className="h-full flex flex-col gap-4 justify-center text-center md:text-left">
          <h1 className="text-4xl sm:text-6xl xl:text-8xl font-black">
            Hello, I'm Lody
          </h1>
          <p className="text-xl sm:text-3xl leading-relaxed font-light">
            Born and raised in The Netherlands, currently work at{' '}
            <AnchorLink href="https://www.taf.nl">TAF</AnchorLink>, and I
            occasionally{' '}
            <AnchorLink href="https://www.themarch.nl">make</AnchorLink>{' '}
            <AnchorLink href="https://www.borgersfamilie.nl/">music</AnchorLink>{' '}
            too.
          </p>
        </div>
      </div>

      {posts && (
        <>
          <PostList title="Some recent posts" posts={posts} grid />

          <div className="mt-10 px-5 flex justify-end">
            <AnchorLink to="/posts">
              <span className="flex flex-row items-center gap-2 hover:gap-3 transition-all">
                Read more here <Icon name="arrow-right" />
              </span>
            </AnchorLink>
          </div>
        </>
      )}
    </>
  );
}
