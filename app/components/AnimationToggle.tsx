import Icon from '~/components/Icon';
import ToggleForm from '~/components/ToggleForm';

type Props = {
  enabled: boolean | undefined;
};

export default function AnimationToggle({ enabled }: Props) {
  return (
    <ToggleForm enabled={enabled} actionType="animation">
      <Icon
        className={`text-xl ${
          enabled ? 'opacity-100' : 'opacity-50'
        } transition-opacity duration-300 ease-in-out`}
        name="film"
      />
    </ToggleForm>
  );
}
