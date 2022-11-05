import { useEffect } from 'react';
import type { LoaderArgs, MetaDescriptor, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { notFound } from 'remix-utils';
import PageLayout from '~/layouts/Page';
import { getPost } from '~/models/posts.server';
import PostMeta from '~/components/PostMeta';
import { formatDate, formatReadingTime } from '~/utils/formats';
import { getGhostSettings } from '~/models/settings.server';
import type { PostOrPage, SettingsResponse } from '@tryghost/content-api';

export const loader = async ({ params }: LoaderArgs) => {
  const ghostSettings = await getGhostSettings();
  const { slug } = params;

  const post = await getPost(slug!);

  if (!post) {
    throw notFound({});
  }

  return json({ post, ghostSettings });
};

export const meta: MetaFunction = ({ data, location }) => {
  const {
    post,
    ghostSettings,
  }: { post: PostOrPage; ghostSettings: SettingsResponse } = data;
  const post_description = post.excerpt || post.meta_description;
  const url = `${ghostSettings.url}${location.pathname.substring(1)}`;

  const meta: MetaDescriptor = {
    title: `${post.title} | Lodybo`,
    description: post_description,
    'og:site_name': ghostSettings.meta_title,
    'og:type': 'article',
    'og:title': post.og_title || post.title,
    'og:description': post.og_description || post_description,
    'og:url': url,
    'og:image': post.og_image || post.feature_image,
    'article:publisher': ghostSettings.facebook,
    'article:published_time': post.published_at,
    'article:modified_time': post.updated_at,
    'twitter:card': 'summary_large_image',
    'twitter:site': ghostSettings.twitter_title,
    'twitter:title': post.twitter_title || post.title,
    'twitter:description': post.twitter_description || post_description,
    'twitter:url': url,
    'twitter:image': post.twitter_image || post.feature_image,
  };

  if (post.tags && post.tags.length) {
    post.tags.forEach((tag) => {
      meta['article:tag'] = tag.name;
    });
  }

  return meta;
};

export default function Post() {
  const { post } = useLoaderData<typeof loader>();
  const publishedAt = formatDate(post.published_at);
  const readingTime = formatReadingTime(post.reading_time);

  useEffect(() => {
    (window as any).Prism.highlightAll();
  });

  return (
    <PageLayout>
      <div
        className="
        prose
        prose-sm
        sm:prose-base
        md:prose-lg
        xl:prose-2xl
        prose-nord
        dark:prose-invert
        leading-loose
        max-w-5xl
        prose-a:no-underline
        prose-a:border-b-2
        prose-a:pb-1
        prose-a:border-b-nord-frost-1-400
        prose-a:transition-all
        hover:prose-a:border-b-nord-frost-1-600
        mx-auto
        px-4
        sm:px-10
      "
      >
        {post.feature_image && (
          <div className="not-prose kg-width-full">
            <img
              className="w-full"
              src={post.feature_image}
              alt={post.feature_image_alt || post.title}
            />
          </div>
        )}

        <div className="h-8 sm:h-16 lg:h-32" />
        <h1>{post.title}</h1>
        <PostMeta
          mode="full"
          readingTime={readingTime}
          publishedAt={publishedAt}
          updatedAt={post.updated_at}
          tags={post.tags}
        />

        <div dangerouslySetInnerHTML={{ __html: post.html || '' }} />
      </div>
    </PageLayout>
  );
}

export function CatchBoundary() {
  return <h1>Post not found</h1>;
}
