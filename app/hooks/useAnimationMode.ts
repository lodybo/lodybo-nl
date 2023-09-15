import { useMatchesData } from '~/utils/matches';
import { useMedia } from '~/hooks/useMedia';

export function useAnimationMode() {
  const data = useMatchesData('root');
  let userEnabled: boolean | undefined = undefined;

  if (data && typeof data.animationEnabled !== 'undefined') {
    userEnabled = data.animationEnabled as boolean;
  }

  const prefersReducedMotion = useMedia(
    ['(prefers-reduced-motion)'],
    [true],
    true,
  );

  const enabled =
    typeof userEnabled !== 'undefined' ? userEnabled : prefersReducedMotion;

  return [enabled];
}
