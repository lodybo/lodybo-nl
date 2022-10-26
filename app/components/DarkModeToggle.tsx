import Icon from '~/components/Icon';
import { useFetcher, useLocation } from '@remix-run/react';

type Props = {
  enabled: boolean;
};

const DarkModeToggle = ({ enabled }: Props) => {
  const fetcher = useFetcher();
  const location = useLocation();

  return (
    <fetcher.Form action="/api/cookies" method="post">
      <input
        type="hidden"
        name="action"
        value={enabled ? 'disable' : 'enable'}
      />
      <input type="hidden" name="referrer" value={location.pathname} />

      <button type="submit">
        <Icon
          className="text-xl"
          prefix={enabled ? 'fas' : 'far'}
          name={enabled ? 'moon' : 'sun'}
        />
      </button>
    </fetcher.Form>
  );
};

export default DarkModeToggle;
