import React, { useState } from "react"
import { useStats } from "../utils/useStats"
import { usePop } from "../utils/usePop"

import SelectBox from "../components/SelectBox"

const Stats = ({ selectedCountry }) => {
  const { stats } = useStats(selectedCountry)
  const country = usePop(selectedCountry)
  if (stats === "There was an error")
    return (
      <div>
        <h1>Coronavirus in {selectedCountry}</h1>
        <p>
          No virus information for {selectedCountry}. Please select a different
          country.
        </p>
      </div>
    )
  if (!stats || !stats.data.confirmed) return <p>Loading</p>
  return (
    <div>
      <h1>Coronavirus in {selectedCountry}</h1>
      <p>Confirmed Cases: {stats.data.confirmed.value}</p>
      <p>Number of Recovered: {stats.data.recovered.value}</p>
      <p>Number of Deaths: {stats.data.deaths.value}</p>
      <p>
        Percentage of Population Infected:{" "}
        {((stats.data.confirmed.value / country[0].pop) * 100).toFixed(5) + "%"}{" "}
        <small>(estimated)</small>
      </p>
    </div>
  )
}

export default () => {
  const [country, setCountry] = useState("China")
  function handleChange(newCountry) {
    setCountry(newCountry)
  }
  return (
    <div>
      <Stats selectedCountry={country} />
      <SelectBox value={country} onChange={handleChange} />
    </div>
  )
}
