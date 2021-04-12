export const filterObject = (a, condition = a => !a) => {
  const b = {}
  for (const [key, value] of Object.entries(a)) {
    if (condition(value)) continue
    b[key] = value
  }
  return b
}

export const swapItinerary = (values, setter) => {
  const {
    src,
    src_cityid,
    src_countryCode,
    dest,
    dest_cityid,
    dest_countryCode,
  } = values
  setter("src", dest)
  setter("dest", src)
  setter("src_cityid", dest_cityid)
  setter("dest_cityid", src_cityid)
  setter("src_countryCode", dest_countryCode)
  setter("dest_countryCode", src_countryCode)
}

export const getCountryFromCode = (countryCode: string) => {
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
