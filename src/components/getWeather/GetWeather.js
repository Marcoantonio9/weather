import React from 'react'
import axios from 'axios'
import './GetWeather.css'

const GetWeather = () => {

  const [infos, setInfos] = React.useState(null)
  //const url = `https://api.openweathermap.org/data/2.5/weather?lat=-23,6791&lon=-46,6353&appid=7cdd176038991a72ee740b15de047dca`  
  const [lat, setLat] = React.useState(null)
  const [lon, setLon] = React.useState(null)
  const [temp, setTemp] = React.useState(null)

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(function (position) {
      //console.log(position)
      setLat(position.coords.latitude)
      setLon(position.coords.longitude)
    })
  }, [])

  React.useEffect(() => {
    if (lon != null) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`
      axios.get(url).then((response) => {
        setInfos(response.data)
        let convertTempString = JSON.stringify(response.data.main.temp - 273.15)
        setTemp(convertTempString)
        console.log(response)
      })
    }
  }, [lon])


  return (
    <div id="weather">
      <h1 className="title-city">
        {infos ? infos.name + ', ' + infos.sys.country : 'não'}
      </h1>
      <br />
      <div className="circle">
        <h1>{temp && temp.substr(0, 2)} °C</h1>
        <p>{infos && infos.weather[0].description}</p>
      </div>
    </div>
  )
}

export default GetWeather