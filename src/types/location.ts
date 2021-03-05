export interface Location {
  city: string
  country_en: string
  id: number
}
export interface Locations {
  count: number
  next: null | string
  previous: null | string
  results: Location[]
}
export const defaultLocations = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}
