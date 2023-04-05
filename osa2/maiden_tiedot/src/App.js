import { useState, useEffect } from 'react'
import axios from 'axios'

const CountryInfo=({data})=>{
  return(
    <div>
      <h2>{data.name.common}</h2>
      <p>capital: {data.capital}</p>
      <p>area: {data.area} km²</p>
      <h3>languages</h3>
      <ul>
      {Object.values(data.languages).map(x => <li>{x}</li>)}
      </ul>
      <img src={data.flags.png} alt={data.flags.alt} width="200px"></img>
    </div>
  )
}
const CountryDisplay=({data, tooMany, disco})=>{
  return (
    <div>{ tooMany ? "Too many matches, specify another filter": <div>{data ? data.map(
      x=><form onSubmit={disco}><p>{x.name.common}<input type='hidden' name="country" value={JSON.stringify(x, null, 2)} /><button>show</button></p></form>
      ) : ""}</div>}</div>
  
  )
}


const App = () => {
  const [value, setValue] = useState('')
  const [data, setData] = useState()
  const [country, setCountry] = useState(null)
  const [tooMany, setTooMany] = useState(false)

  // useEffect(() => {
  //   console.log('effect run, currency is now', country)

  //   // skip if currency is not defined
  //   if (country) {
  //     console.log('fetching exchange rates...')
  //     axios
  //       .get(`https://restcountries.com/v3.1/all`)
  //       .then(response => {
  //         setData(response.data)
  //       })
  //   }
  // }, [country])

  const handleChange = (event) => {
    setValue(event.target.value)
    setCountry(null)
    if(event.target.value == ""){
      setData()
      setTooMany(false)
      return
    }
    axios
        .get(`https://restcountries.com/v3.1/all`)
        .then(response => {
          const countries = response.data.filter(x => x.name.common.toLowerCase().includes(event.target.value.toLowerCase()))
          setData(countries)
          console.log(countries)
          if(countries.length>10){
            setTooMany(true)
            return
          }
          if (countries.length==1){setCountry(countries)}
          console.log(country)
          setTooMany(false)
        })
  }
  const SetDisplayCountry =(event)=>{
    event.preventDefault()
    setCountry([JSON.parse(event.target.country.value)])
    console.log(country)
  }


  return (
    <div>
      <form>
        country: <input value={value} onChange={handleChange} />
      </form>
      {country != null? <CountryInfo data={country[0]}/>:<CountryDisplay data = {data} tooMany = {tooMany} disco={SetDisplayCountry} />}
      
    </div>
  )
}

export default App;
