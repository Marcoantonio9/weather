import React from 'react'
import axios from 'axios'
import './GetWeather.css'

const GetWeather = () => {

  const [infos, setInfos] = React.useState(null)
  //const url = `https://api.openweathermap.org/data/2.5/weather?lat=-23,6791&lon=-46,6353&appid=7cdd176038991a72ee740b15de047dca`  
  const [lat, setLat] = React.useState(null)
  const [lon, setLon] = React.useState(null)
  const [temp, setTemp] = React.useState(null)
  const [hours, setHours] = React.useState(null)
  let [image, setImage] = React.useState(null)

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
        let data = new Date()
        setHours(data.getHours() + ':' + data.getMinutes())
        let desc = response.data.weather[0].description
        
        console.log(desc)
        if(desc == 'nublado'){
          setImage("/images/nublado2.jpg")          
        }else if(desc.includes('chuva')){
          setImage("/images/chuva.jpg")
        } else if(desc.includes('nuvens')){
          setImage("/images/nublado2.jpg")    
        }
      })
    }
  }, [lon])


  return (
    <div id="weather">
      <div className="container-weather"
          style={{ backgroundImage: infos && infos.weather[0].description ? `url(${image})` : '' }}>
        <h1 className="title-city">
          {infos ? infos.name + ', ' + infos.sys.country : 'não'}
        </h1>
        <br />
        <div className="circle">
          <h1 className="title-temp">{temp && temp.substr(0, 2)} °C</h1>
          <p className="title-temp">{infos && infos.weather[0].description}</p>
          <p className="hours">{hours}</p>
        </div>
      </div>
    </div>
  )
}

export default GetWeather