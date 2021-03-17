export const filterObject = (a, condition = a => !a) => {
  const b = {}
  for (const [key, value] of Object.entries(a)) {
    if (condition(value)) continue
    b[key] = value
  }
  return b
}

export const trimCityEmpty = city => {
  if (city?.length) return city + ", "
  return ""
}

export const tripCityAnywhere = city => {
  if (city?.length) return city
  return "Anywhere"
}
