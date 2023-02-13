import Icon from '~/components/Icon';
import { useFetcher, useLocation } from '@remix-run/react';

type Props = {
  enabled: boolean | undefined;
};

const DarkModeToggle = ({ enabled }: Props) => {
  const fetcher = useFetcher();
  const location = useLocation();

  return (
    <fetcher.Form
      action="/api/cookies"
      method="post"
      className="flex items-center"
    >
      <input type="hidden" name="actionType" value="darkMode" />
      <input
        type="hidden"
        name="actionValue"
        value={enabled ? 'disable' : 'enable'}
      />
      <input type="hidden" name="referrer" value={location.pathname} />

      <button aria-label="dark-mode-toggle" type="submit">
        <Icon className="text-xl" name={enabled ? 'moon' : 'sun'} />
      </button>
    </fetcher.Form>
  );
};

export default DarkModeToggle;
