import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

import AnchorLink from '~/components/AnchorLink';
import PostList from '~/components/PostList';
import Icon from '~/components/Icon';
import Header from '~/components/Header';

import { getRecentPosts } from '~/models/posts.server';
import Navigation, {
  NavigationBackground,
  NavigationVisibility,
} from '~/components/Navigation';
import { useIsColliding } from '~/hooks/useIsColliding';
import { useRef } from 'react';
import { useHiddenNavigation, useSolidNavigation } from '~/utils/matches';

export const loader = async () => {
  const posts = await getRecentPosts();

  return json({ posts });
};

export default function _index() {
  const { posts } = useLoaderData<typeof loader>();

  const mainContentRef: any = useRef<HTMLDivElement>(null);
  const navigationRef: any = useRef<typeof Navigation>(null);
  const isColliding = useIsColliding(mainContentRef, navigationRef);

  let navigationHasBackground: NavigationBackground;
  const navigationIsHidden = useHiddenNavigation();
  const solidNavigation = useSolidNavigation();

  if (solidNavigation) {
    navigationHasBackground = NavigationBackground.SOLID;
  } else {
    navigationHasBackground = NavigationBackground.TRANSLUCENT;

    if (isColliding) {
      navigationHasBackground = NavigationBackground.SOLID;
    }
  }

  return (
    <>
      <Navigation
        ref={navigationRef}
        hidden={navigationIsHidden}
        background={navigationHasBackground}
        position="fixed"
      />
      <Header />

      <div ref={mainContentRef}>
        {posts && (
          <div className="px-5 md:px-10 xl:px-40 mx-auto flex flex-col">
            <PostList title="Some recent posts" posts={posts} grid />

            <div className="mt-10 px-5 flex justify-end">
              <AnchorLink to="/posts">
                <span className="flex flex-row items-center gap-2 hover:gap-3 transition-all">
                  Read more here <Icon name="arrow-right" />
                </span>
              </AnchorLink>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export const handle = {
  navigationVisibility: NavigationVisibility.HIDDEN,
};
