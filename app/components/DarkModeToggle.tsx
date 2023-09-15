import Icon from '~/components/Icon';
import ToggleForm from '~/components/ToggleForm';

type Props = {
  enabled: boolean | undefined;
};

const DarkModeToggle = ({ enabled }: Props) => {
  return (
    <ToggleForm enabled={enabled} actionType="darkMode">
      <Icon className="text-xl" name={enabled ? 'moon' : 'sun'} />
    </ToggleForm>
  );
};

export default DarkModeToggle;
