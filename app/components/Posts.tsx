import type { PostOrPage } from '@tryghost/content-api';
import PostList from '~/components/PostList';
import MainSection from '~/components/MainSection';
import ActionLink from '~/components/ActionLink';

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
      <PostList title="Stuff that I've written" posts={posts} grid />

      <div className="mt-10 px-5 flex justify-end">
        <ActionLink to="/posts">Read more here</ActionLink>
      </div>
    </MainSection>
  );
}
