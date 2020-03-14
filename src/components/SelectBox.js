import React, { useEffect, useState } from "react"
import data from "../worldpopulation.json"

import SelectItem from "../components/SelectItems"

const SelectBox = props => {
  function handleChange(event) {
    props.onChange(event.target.value)
  }
  let keyCounter = 0
  const [items, setItems] = useState([])
  useEffect(() => {
    const dataArr = data.map(item => {
      const country = item.country
      return country
    })
    setItems(dataArr)
  }, [])
  return (
    <select
      name="Countries"
      id="countries"
      onChange={handleChange}
      className="country-select"
    >
      {items.map(item => {
        return <SelectItem countryName={item} key={keyCounter++} />
      })}
    </select>
  )
}

export default SelectBox
