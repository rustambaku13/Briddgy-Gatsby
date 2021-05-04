export interface Location {
  countryCode: string
  id: string
  details: [
    {
      en: {
        city: string
        country: string
      }
    }
  ]
}
export interface ApiLocation {
  value: string
  key: string
  iso_a2?: string
  iso_a3?: string
}

export const defaultLocations = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}
