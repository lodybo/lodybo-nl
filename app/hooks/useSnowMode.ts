import { useMatchesData } from '~/utils/matches';

export function useSnowMode() {
  const data = useMatchesData('root');
  let isEnabled: boolean = true;

  if (data && typeof data.snowModeEnabled !== 'undefined') {
    isEnabled = data.snowModeEnabled as boolean;
  }

  return [isEnabled];
}
