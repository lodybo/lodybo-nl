import type { PostOrPage } from '@tryghost/content-api';
import PostList from '~/components/PostList';
import AnchorLink from '~/components/AnchorLink';
import Icon from '~/components/Icon';
import MainSection from '~/components/MainSection';

type Props = {
  /**
   * A list of posts to display.
   */
  posts?: PostOrPage[];
};

export default function Posts({ posts }: Props) {
  if (!posts) return null;

  return (
    <MainSection>
      <PostList title="Some recent posts" posts={posts} grid />

      <div className="mt-10 px-5 flex justify-end">
        <AnchorLink to="/posts">
          <span className="flex flex-row items-center gap-2 hover:gap-3 transition-all">
            Read more here <Icon name="arrow-right" />
          </span>
        </AnchorLink>
      </div>
    </MainSection>
  );
}
