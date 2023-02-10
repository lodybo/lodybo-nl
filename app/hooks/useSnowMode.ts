import { useMatchesData } from '~/utils/matches';

export type SnowModeSetting = boolean | undefined | null;

export function useSnowMode() {
  const data = useMatchesData('root');
  let isEnabled: boolean | null = true;

  if (data && data.snowModeEnabled === null) {
    isEnabled = null;
  }

  if (data && typeof data.snowModeEnabled !== 'undefined') {
    isEnabled = data.snowModeEnabled as boolean;
  }

  return [isEnabled];
}
