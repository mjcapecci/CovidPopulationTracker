import data from "../worldpopulation.json"

export function usePop(filterCountry) {
  const dataArr = data.map(item => {
    const country = item.country
    const pop = item.population
    return { country, pop }
  })
  return dataArr.filter(item => item.country === filterCountry)
}
