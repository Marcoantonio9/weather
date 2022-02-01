import React from 'react'
import axios from 'axios'
import './GetWeather.css'
import { GlobalContext } from '../../Context'

const GetWeather = () => {

  // const [infos, setInfos] = React.useState(null)
  // const [temp, setTemp] = React.useState(null)
  const [hours, setHours] = React.useState(null)
  // let [image, setImage] = React.useState(null)

  const global = React.useContext(GlobalContext)

  React.useEffect(() => {
    global.getNavagation()
  }, [])

  React.useEffect(() => {
    if (global.lon != null) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${global.lat}&lon=${global.lon}&appid=7cdd176038991a72ee740b15de047dca&lang=pt_br`
      axios.get(url).then((response) => {
        global.setInfos(response.data)
        let convertTempString = JSON.stringify(response.data.main.temp - 273.15)
        global.setTemp(convertTempString)
        let data = new Date()
        setHours(data.getHours() + ':' + data.getMinutes())

        let desc = response.data.weather[0].description
        if (desc == 'nublado') {
          global.setImage("/images/nublado2.jpg")
        } else if (desc.includes('chuva')) {
          global.setImage("/images/chuva.jpg")
        } else if (desc.includes('nuvens')) {
          global.setImage("/images/nublado2.jpg")
        } else if( desc == 'céu limpo') {
          global.setImage("/images/dia-limpo.jpg")
        }
      })
    }
  }, [global.lon])


  return (
    <div id="weather">
      <div className="container-weather"
        style={{ backgroundImage: global.infos && global.infos.weather[0].description ? `url(${global.image})` : '' }}>
        <h1 className="title-city">
          {global.infos ? global.infos.name + ', ' + global.infos.sys.country : 'não'}
        </h1>
        <br />
        <div className="circle">
          <h1 className="title-temp">{global.temp && global.temp.substr(0, 2)} °C</h1>
          <p className="title-temp">{global.infos && global.infos.weather[0].description}</p>
          <p className="hours">{hours}</p>
        </div>
      </div>
    </div>
  )
}

export default GetWeather