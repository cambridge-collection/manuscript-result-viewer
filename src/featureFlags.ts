/* Build-time feature flags toggling navbar items and route generation between
   the local-dev and SSG builds. Each feature is opt-in: set the matching
   VITE_SHOW_* env var to 'true' to enable it; unset (or anything else) hides it. */

const enabled = (value: string | undefined): boolean => value === 'true'

export const show_homepage = enabled(import.meta.env.VITE_SHOW_HOMEPAGE)
export const show_works = enabled(import.meta.env.VITE_SHOW_WORKS)
export const show_people = enabled(import.meta.env.VITE_SHOW_PEOPLE)
export const show_places = enabled(import.meta.env.VITE_SHOW_PLACES)

const OPTIONAL_TYPES: Record<string, boolean> = {
  work: show_works,
  person: show_people,
  place: show_places,
}

// ?type=… values that are switched off: the guard redirects these away so a
// disabled record type can't be reached by editing the URL directly.
export const disabled_types: string[] = Object.entries(OPTIONAL_TYPES)
  .filter(([, on]) => !on)
  .map(([type]) => type)
