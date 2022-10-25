import type { Nullable, PostOrPage } from '@tryghost/content-api';
import PostPreview from '~/components/PostPreview';
import List from '~/components/List';

type Props = {
  title: string;
  description?: Nullable<string>;
  image?: Nullable<string>;
  posts: PostOrPage[];
  grid?: boolean;
};

const PostList = ({ title, description, image, posts, grid }: Props) => (
  <List title={title} description={description} image={image} grid={grid}>
    {posts.map((post) => (
      <PostPreview key={post.id} post={post} grid={grid} />
    ))}
  </List>
);

export default PostList;
