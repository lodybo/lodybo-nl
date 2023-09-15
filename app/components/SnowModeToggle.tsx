import Icon from '~/components/Icon';
import { useSnowMode } from '~/hooks/useSnowMode';
import ToggleForm from '~/components/ToggleForm';

const SnowModeToggle = () => {
  const [snowModeIsEnabled] = useSnowMode();

  return (
    <ToggleForm enabled={snowModeIsEnabled} actionType="snowMode">
      <Icon
        className={`text-xl ${
          snowModeIsEnabled ? 'opacity-100' : 'opacity-25'
        }`}
        prefix="far"
        name="snowflake"
      />
    </ToggleForm>
  );
};

export default SnowModeToggle;
