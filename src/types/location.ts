export interface Location {
  _id: {
    $oid: string
  }
  type: "CITY" | "COUNTRY"
  country: string
  city?: string
  translations: {
    ru: string
    es: string
    pt: string
  }
  translations_country?: {
    ru: string
    es: string
    pt: string
  }
}

export const defaultLocations = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}
