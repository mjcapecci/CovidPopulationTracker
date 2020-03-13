import { useEffect, useState } from "react"
import axios from "axios"

export function useStats(ctry) {
  const [stats, setStats] = useState()
  useEffect(() => {
    async function getStats() {
      try {
        const response = await axios.get(
          `https://covid19.mathdro.id/api/countries/${ctry}`
        )
        setStats(response)
      } catch (error) {
        console.log(error)
        setStats("There was an error")
      }
    }
    getStats()
  }, [ctry])
  return {
    stats,
  }
}
