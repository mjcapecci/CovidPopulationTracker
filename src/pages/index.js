import React, { useState } from "react"
import { useStats } from "../utils/useStats"
import { usePop } from "../utils/usePop"
import moment from "moment"

import SelectBox from "../components/SelectBox"

import "./app.scss"

const Stats = ({ selectedCountry }) => {
  const { stats } = useStats(selectedCountry)
  const country = usePop(selectedCountry)
  if (stats === "There was an error")
    return (
      <div>
        <div className="no-info">
          <p style={{ textAlign: "center" }}>
            There is no virus information for{" "}
            <span style={{ color: "darkred" }}>{selectedCountry}</span> at this
            time. Please select a different country.
          </p>
        </div>
      </div>
    )
  if (!stats || !stats.data.confirmed)
    return <p style={{ color: "white" }}>Loading</p>
  let time = stats
    ? moment(stats.data.lastUpdate).format("M/D/YYYY - LT") + " CST"
    : null
  console.log(stats)
  return (
    <div>
      <div className="container">
        <div className="data data-country">
          <p className="center">
            <h2 style={{ color: "darkred" }}>{selectedCountry}</h2>
          </p>
        </div>
        <div className="data">
          <p className="center">
            Confirmed Cases: {stats.data.confirmed.value}
          </p>
        </div>
        <div className="data">
          <p className="center">
            Number of Recovered: {stats.data.recovered.value}
          </p>
        </div>
        <div className="data">
          <p className="center">Number of Deaths: {stats.data.deaths.value}</p>
        </div>
        <div className="data">
          <p className="center">Percentage of Pop. Infected:</p>
          <p className="center">
            {((stats.data.confirmed.value / country[0].pop) * 100).toFixed(5) +
              "%"}{" "}
            <small>(estimated)</small>
          </p>
        </div>
        <div className="data">
          <p className="center">Last Updated: {time}</p>
        </div>
      </div>
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
      <h1 style={{ textAlign: "center" }}>Coronavirus Population Tracker</h1>
      <Stats selectedCountry={country} />
      <div className="flex-center">
        <SelectBox value={country} onChange={handleChange} />
      </div>
    </div>
  )
}
