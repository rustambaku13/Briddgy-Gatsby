export const filterObject = (a, condition = a => !a) => {
  const b = {}
  for (const [key, value] of Object.entries(a)) {
    if (condition(value)) continue
    b[key] = value
  }
  return b
}

export const swapItinerary = (values, setter) => {
  const { src, src_id, src_code, dest, dest_id, dest_code } = values
  setter("src", dest)
  setter("dest", src)
  setter("src_id", dest_id)
  setter("dest_id", src_id)
  setter("src_code", dest_code)
  setter("dest_code", src_code)
}

export const getCountryFromCode = (countryCode: string, countries: any[]) => {
  if (countries) {
    const a = countries.filter(item => item.key == countryCode)
    return a?.[0]?.value
  }

  return countryCode
}

export const trimCityEmpty = city => {
  if (city?.length) return city + ", "
  return ""
}

export const tripCityAnywhere = city => {
  if (city?.length) return city
  return "Anywhere"
}
