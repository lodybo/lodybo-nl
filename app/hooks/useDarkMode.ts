import { useMatchesData } from '~/utils/matches';
import { useMedia } from '~/hooks/useMedia';

/**
 * This hook checks and sets the dark mode option.
 * It's heavily inspired from this: https://usehooks.com/useDarkMode/
 */
export function useDarkMode() {
  const data = useMatchesData('root');
  let userEnabled: boolean | undefined = undefined;

  if (data && typeof data.darkModeEnabled !== 'undefined') {
    userEnabled = data.darkModeEnabled as boolean;
  }

  const prefersDarkMode = useMedia(
    ['(prefers-color-scheme: dark)'],
    [true],
    false,
  );

  const enabled =
    typeof userEnabled !== 'undefined' ? userEnabled : prefersDarkMode;

  return [enabled];
}
