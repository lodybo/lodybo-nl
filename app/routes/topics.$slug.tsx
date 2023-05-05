import type {
  LoaderArgs,
  MetaFunction,
  V2_MetaFunction,
} from '@remix-run/node';
import { json, redirect } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import PostList from '~/components/PostList';
import { getTagInfo } from '~/models/tags.server';
import { getPostsForTag } from '~/models/posts.server';
import AnchorLink from '~/components/AnchorLink';
import invariant from 'tiny-invariant';
import Navigation from '~/components/Navigation';
import Prose from '~/components/Prose';
import MainSection from '~/components/MainSection';

type NoTopic = {
  missing: 'topic';
  slug: string | undefined;
};

type NoPosts = {
  missing: 'posts';
  slug: string | undefined;
};

type ErrorRequest = NoTopic | NoPosts;

export const loader = async ({ params }: LoaderArgs) => {
  const { slug } = params;

  if (!slug) {
    return redirect('/topics');
  }

  const tag = await getTagInfo(slug);

  if (!tag) {
    throw notFound<NoTopic>({ missing: 'topic', slug });
  }

  if (tag.count?.posts === 0) {
    throw notFound<NoPosts>({ missing: 'posts', slug });
  }

  const posts = await getPostsForTag(tag.slug);
  invariant(posts, 'Posts are required');

  return json({
    tag,
    posts: posts.map((post) => ({
      id: post.id,
      tags: post.tags,
      published_at: post.published_at,
      excerpt: post.excerpt,
      featured: post.featured,
      feature_image: post.feature_image,
      feature_image_alt: post.feature_image_alt,
      reading_time: post.reading_time,
      slug: post.slug,
      title: post.title,
    })),
  });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data }) => {
  if (!data) {
    return [
      {
        title: 'Lodybo',
      },
    ];
  }

  const { tag } = data;

  return [
    { title: `Topic ${tag.name} | Lodybo` },
    { name: 'description', content: tag.description },
  ];
};

export default function TopicPage() {
  const { tag, posts } = useLoaderData<typeof loader>();

  return (
    <>
      <Navigation />
      <MainSection className="mt-10">
        <PostList
          title={tag.name!}
          description={tag.description}
          image={tag.feature_image}
          posts={posts}
        />
      </MainSection>
    </>
  );
}

export function CatchBoundary() {
  const { data } = useCatch();
  const { slug, missing } = data as ErrorRequest;

  return (
    <>
      <Navigation />
      <Prose>
        <h1>Topic not found</h1>
        <p>
          {missing === 'topic' &&
            `I'm sorry, but a topic with the slug "/topics/${slug}/" could not be found.`}
          {missing === 'posts' &&
            `I'm sorry, but there are no posts found with the topic "${slug}"`}
        </p>

        <p>
          <AnchorLink href="/topics">Go back to the topics page</AnchorLink>
        </p>
      </Prose>
    </>
  );
}
