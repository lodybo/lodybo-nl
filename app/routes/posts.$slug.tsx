import type {
  LoaderArgs,
  V2_MetaDescriptor,
  V2_MetaFunction,
} from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  isRouteErrorResponse,
  useCatch,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
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
import ErrorPage from '~/components/ErrorPage';

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
    { title: `${post.title} | Lodybo` },
    { description: post_description },
  ];

  if (!ghostSettings) {
    return baseMeta;
  }

  const url = `${ghostSettings.url}${location.pathname.substring(1)}`;

  const meta: V2_MetaDescriptor[] = [
    ...baseMeta,
    { 'og:site_name': ghostSettings.meta_title },
    { 'og:type': 'article' },
    { 'og:title': post.og_title || post.title },
    { 'og:description': post.og_description || post_description },
    { 'og:url': url },
    { 'og:image': post.og_image || post.feature_image },
    { 'article:publisher': ghostSettings.facebook },
    { 'article:published_time': post.published_at },
    { 'article:modified_time': post.updated_at },
    { 'twitter:card': 'summary_large_image' },
    { 'twitter:site': ghostSettings.twitter_title },
    { 'twitter:title': post.twitter_title || post.title },
    { 'twitter:description': post.twitter_description || post_description },
    { 'twitter:url': url },
    { 'twitter:image': post.twitter_image || post.feature_image },
  ];

  if (post.tags && post.tags.length) {
    post.tags.forEach((tag) => {
      meta.push({ 'article:tag': tag.name });
    });
  }

  return meta;
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

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    const { data } = error;
    const { slug } = data as MissingPost;

    return (
      <>
        <Navigation />
        <Prose>
          <h1 className="text-4xl">Post not found</h1>
          <p>
            I'm sorry, but a post with the slug {`/posts/${slug}/`} could not be
            found.
          </p>

          <p>
            <AnchorLink href="/posts">Go back to the posts page</AnchorLink>
          </p>
        </Prose>
      </>
    );
  }

  return <ErrorPage error={error} />;
}

export const handle = {
  navigationVisibility: NavigationVisibility.VISIBLE,
  navigationBackground: NavigationBackground.SOLID,
};
