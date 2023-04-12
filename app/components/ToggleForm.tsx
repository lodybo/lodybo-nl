import type { ReactNode } from 'react';
import { useFetcher, useLocation } from '@remix-run/react';

type Props = {
  enabled: boolean | undefined | null;

  actionType: string;

  children: ReactNode;
};

export default function ToggleForm({ enabled, children, actionType }: Props) {
  const fetcher = useFetcher();
  const location = useLocation();

  return (
    <fetcher.Form
      action="/api/cookies"
      method="post"
      className="flex items-center"
      preventScrollReset={true}
    >
      <input type="hidden" name="actionType" value={actionType} />
      <input
        type="hidden"
        name="actionValue"
        value={enabled ? 'disable' : 'enable'}
      />
      <input type="hidden" name="referrer" value={location.pathname} />

      <button aria-label="toggle-button" type="submit">
        {children}
      </button>
    </fetcher.Form>
  );
}
