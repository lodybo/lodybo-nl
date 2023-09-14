import Navigation from '~/components/Navigation';
import MainSection from '~/components/MainSection';
import Prose from '~/components/Prose';
import Document from '~/components/Document';
import { getErrorMessage } from '~/utils/errors';

type Props = {
  error: any;
};

export default function ErrorPage({ error }: Props) {
  const message = getErrorMessage(error);

  console.error(error);
  if (error.stack) console.trace(error.stack);

  return (
    <Document>
      <Navigation />
      <MainSection className="mt-10">
        <Prose isPost>
          <h1>Oops.. Something went wrong!</h1>

          <p>
            It's not you, it's us. We encountered an error and reported it.
            <br />
            If you're curious, this is what it said:
          </p>

          <pre className="language-jsstacktrace">
            <code className="language-jsstacktrace whitespace-normal">
              {message}
            </code>
          </pre>
        </Prose>
      </MainSection>
    </Document>
  );
}
