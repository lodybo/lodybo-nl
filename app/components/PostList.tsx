import type { Nullable, PostOrPage } from '@tryghost/content-api';
import PostPreview from '~/components/PostPreview';
import List from '~/components/List';

type Props = {
  title: string;
  description?: Nullable<string>;
  image?: Nullable<string>;
  posts: PostOrPage[];
};

const PostList = ({ title, description, image, posts }: Props) => (
  <List title={title} description={description} image={image}>
    {posts.map((post) => (
      <PostPreview key={post.id} post={post} />
    ))}
  </List>
);

export default PostList;
