import { useEffect } from 'react';
import ListPageLayout from '~/layouts/ListPage';

const ErrorBoundaryComponent = ({ error }: { error: Error }) => {
  useEffect(() => {
    (window as any).Prism.highlightAll();
  });

  return (
    <ListPageLayout>
      <div className="prose prose-xl max-w-none">
        <h1>Oops.. Something went wrong!</h1>

        <p>
          It's not you, it's us. We encountered an error and reported it.
          <br />
          If you're curious, this is what it said:
        </p>

        <pre className="language-jsstacktrace">
          <code className="language-jsstacktrace">{error.message}</code>
        </pre>
      </div>
    </ListPageLayout>
  );
};

export default ErrorBoundaryComponent;
