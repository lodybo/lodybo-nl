import { useFetcher, useLocation } from '@remix-run/react';
import Icon from '~/components/Icon';

type Props = {
  enabled: boolean | undefined;
};

export default function AnimationToggle({ enabled }: Props) {
  const fetcher = useFetcher();
  const location = useLocation();

  return (
    <fetcher.Form
      action="/api/cookies"
      method="post"
      className="flex items-center"
    >
      <input type="hidden" name="actionType" value="animation" />
      <input
        type="hidden"
        name="actionValue"
        value={enabled ? 'disable' : 'enable'}
      />
      <input type="hidden" name="referrer" value={location.pathname} />

      <button aria-label="animation-toggle" type="submit">
        <Icon
          className={`text-xl ${
            enabled ? 'opacity-100' : 'opacity-50'
          } transition-opacity duration-300 ease-in-out`}
          name="film"
        />
      </button>
    </fetcher.Form>
  );
}
