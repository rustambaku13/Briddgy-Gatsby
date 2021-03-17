import { useEffect, useState } from "react"

export const usePopulateQueryHook = location => {
  const [data, setData] = useState({})
  useEffect(() => {
    const a = new URLSearchParams(location.search)
    const b = {}
    for (const [key, value] of a.entries()) {
      if (!value) continue
      b[key] = value
    }
    setData(b)
  }, [location])
  return data
}
