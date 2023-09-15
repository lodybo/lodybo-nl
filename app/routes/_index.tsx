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
import Bio from '~/components/Bio';
import Posts from '~/components/Posts';
import Music from '~/components/Music';
import Projects from '~/components/Projects';

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

      <div className="h-16" />

      <main ref={mainContentRef} className="space-y-20">
        <Bio />

        <Music />

        <Projects />

        <Posts posts={posts} />
      </main>
    </>
  );
}

export const handle = {
  navigationVisibility: NavigationVisibility.HIDDEN,
};
