import { useLocation } from '@remix-run/react';
import Icon from '~/components/Icon';
import classnames from 'classnames';
import { useSnowMode } from '~/hooks/useSnowMode';

const SnowModeToggle = () => {
  const location = useLocation();
  const [snowModeIsEnabled] = useSnowMode();

  return (
    <form action="/api/cookies" method="post" className="flex items-center">
      <input type="hidden" name="actionType" value="snowMode" />
      <input
        type="hidden"
        name="actionValue"
        value={snowModeIsEnabled ? 'disable' : 'enable'}
      />
      <input type="hidden" name="referrer" value={location.pathname} />

      <button type="submit">
        <Icon
          className={classnames('text-xl', {
            'opacity-25': !snowModeIsEnabled,
          })}
          prefix="far"
          name="snowflake"
        />
      </button>
    </form>
  );
};

export default SnowModeToggle;
