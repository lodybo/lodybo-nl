import type { LoaderArgs } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  isRouteErrorResponse,
  Link,
  useLoaderData,
  useRouteError,
} from '@remix-run/react';
import { getPage } from '~/models/pages.server';
import { notFound } from 'remix-utils';
import Prose from '~/components/Prose';
import Navigation from '~/components/Navigation';
import MainSection from '~/components/MainSection';
import ErrorPage from '~/components/ErrorPage';

export const loader = async ({ params }: LoaderArgs) => {
  const { pageSlug } = params;

  const page = await getPage(pageSlug!);

  if (!page) {
    throw notFound({});
  }

  return json({ page });
};

export default function Post() {
  const { page } = useLoaderData<typeof loader>();

  return (
    <>
      <Navigation position="relative" />

      <MainSection className="mt-10">
        <Prose>
          <h1>{page.title}</h1>

          <div dangerouslySetInnerHTML={{ __html: page.html || '' }} />
        </Prose>
      </MainSection>
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <>
        <Navigation />
        <MainSection className="mt-10">
          <Prose>
            <h1>Page not found</h1>
            <p>
              I'm sorry, but I couldn't find this page anywhere. You could take
              a look through <Link to="/posts">my posts</Link>. If you're sure
              this is a mistake, then by all means{' '}
              <Link to="/contact">let me know.</Link>
            </p>
          </Prose>
        </MainSection>
      </>
    );
  }

  return <ErrorPage error={error} />;
}
