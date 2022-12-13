import { useMatchesData } from '~/utils/matches';

export function useSnowMode() {
  const data = useMatchesData('root');
  let isEnabled: boolean | undefined = undefined;

  if (data && data.snowModeEnabled !== 'undefined') {
    isEnabled = data.snowModeEnabled as boolean;
  }

  return [isEnabled];
}
