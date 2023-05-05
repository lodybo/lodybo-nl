import type {
  LinksFunction,
  LoaderArgs,
  MetaDescriptor,
  MetaFunction,
  V2_MetaDescriptor,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import { useCatch, useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import { getPost } from '~/models/posts.server';
import { getGhostSettings } from '~/models/settings.server';
import invariant from 'tiny-invariant';
import AnchorLink from '~/components/AnchorLink';
import { filterInternalTags } from '~/models/tags.server';
import PostContent from '~/components/PostContent';
import Navigation, {
  NavigationBackground,
  NavigationVisibility,
} from '~/components/Navigation';
import Prose from '~/components/Prose';

type MissingPost = {
  slug: string;
};

export const loader = async ({ params }: LoaderArgs) => {
  const ghostSettings = await getGhostSettings();
  const { slug } = params;

  invariant(slug, 'Post slug is required');

  const post = await getPost(slug!);

  if (!post) {
    throw notFound<MissingPost>({
      slug,
    });
  }

  const filteredTags = filterInternalTags(post.tags);

  return json({
    post: {
      ...post,
      tags: filteredTags,
    },
    ghostSettings,
  });
};

export const meta: V2_MetaFunction<typeof loader> = ({ data, location }) => {
  if (!data) {
    return [];
  }

  const { post, ghostSettings } = data;

  const post_description = post.excerpt || post.meta_description;

  const baseMeta: V2_MetaDescriptor[] = [
    { title: `${post.title ?? ''} | Lodybo` },
    { name: 'description', content: post_description },
  ];

  if (!ghostSettings) {
    return baseMeta;
  }

  const url = `${ghostSettings.url}${location.pathname.substring(1)}`;

  baseMeta.push({ name: 'og:type', content: 'article' });
  baseMeta.push({ name: 'og:url', content: url });

  if (ghostSettings.meta_title) {
    baseMeta.push({ name: 'og:site_name', content: ghostSettings.meta_title });
  }

  if (post.og_title || post.title) {
    baseMeta.push({ name: 'og:title', content: post.og_title || post.title });
  }

  if (post.og_description || post_description) {
    baseMeta.push({
      name: 'og:description',
      content: post.og_description || post_description,
    });
  }

  if (post.og_image || post.feature_image) {
    baseMeta.push({
      name: 'og:image',
      content: post.og_image || post.feature_image,
    });
  }

  if (ghostSettings.facebook) {
    baseMeta.push({
      name: 'article:publisher',
      content: ghostSettings.facebook,
    });
  }

  if (post.published_at) {
    baseMeta.push({
      name: 'article:published_time',
      content: post.published_at,
    });
  }

  if (post.updated_at) {
    baseMeta.push({ name: 'article:modified_time', content: post.updated_at });
  }

  if (post.twitter_title) {
    baseMeta.push({
      name: 'twitter:title',
      content: post.twitter_title || post.title,
    });
    baseMeta.push({ name: 'twitter:site', content: post.twitter_title });
    baseMeta.push({ name: 'twitter:card', content: 'summary_large_image' });
    baseMeta.push({
      name: 'twitter:description',
      content: post.twitter_description || post_description,
    });
    baseMeta.push({
      name: 'twitter:image',
      content: post.twitter_image || post.feature_image,
    });
    baseMeta.push({ name: 'twitter:url', content: url });
  }

  if (post.tags && post.tags.length) {
    post.tags.forEach((tag) => {
      baseMeta.push({ name: 'article:tag', content: tag.name });
    });
  }

  return baseMeta;
};

export default function Post() {
  const { post } = useLoaderData<typeof loader>();

  return (
    <>
      <Navigation />
      <PostContent post={post} />
    </>
  );
}

export function CatchBoundary() {
  const { data } = useCatch();
  const { slug } = data as MissingPost;

  return (
    <>
      <Navigation />
      <Prose>
        <h1 className="text-4xl">Post not found</h1>
        <p>
          I'm sorry, but a post with the slug "/posts/{slug}/" could not be
          found.
        </p>

        <p>
          <AnchorLink href="/posts">Go back to the posts page</AnchorLink>
        </p>
      </Prose>
    </>
  );
}

export const handle = {
  navigationVisibility: NavigationVisibility.VISIBLE,
  navigationBackground: NavigationBackground.SOLID,
};
