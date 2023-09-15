import { useMemo } from 'react';
import { useMatches } from '@remix-run/react';
import {
  NavigationBackground,
  NavigationVisibility,
} from '~/components/Navigation';

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(
  id: string,
): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches();
  const route = useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id],
  );
  return route?.data;
}

export function useHiddenNavigation() {
  const matches = useMatches();

  const { handle } = matches[matches.length - 1];

  return handle?.navigationVisibility === NavigationVisibility.HIDDEN || false;
}

export function useSolidNavigation() {
  const matches = useMatches();

  const { handle } = matches[matches.length - 1];

  return handle?.navigationBackground === NavigationBackground.SOLID || false;
}
