import { useLocation } from '@remix-run/react';
import Icon from '~/components/Icon';
import classnames from 'classnames';

type Props = {
  enabled: boolean | undefined;
};

const SnowModeToggle = ({ enabled }: Props) => {
  const location = useLocation();

  return (
    <form action="/api/cookies" method="post" className="flex items-center">
      <input type="hidden" name="actionType" value="snowMode" />
      <input
        type="hidden"
        name="actionValue"
        value={enabled ? 'disable' : 'enable'}
      />
      <input type="hidden" name="referrer" value={location.pathname} />

      <button type="submit">
        <Icon
          className={classnames('text-xl', {
            'opacity-25': !enabled,
          })}
          prefix="far"
          name="snowflake"
        />
      </button>
    </form>
  );
};

export default SnowModeToggle;
