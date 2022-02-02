import React from 'react'
import axios from 'axios'
import './GetWeather.css'
import { GlobalContext } from '../../Context'

const GetWeather = () => {
  const global = React.useContext(GlobalContext)
  const image404 = "/images/banner-404.jpg"

  React.useEffect(() => {
    global.getNavagation()
  }, [])

  React.useEffect(() => {
    if (global.lon != null) {
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${global.lat}&lon=${global.lon}&appid=${process.env.REACT_APP_KEY}&lang=pt_br`
      axios.get(url).then((response) => {
        global.setInfos(response.data)
        let convertTempString = JSON.stringify(response.data.main.temp - 273.15)
        global.setTemp(convertTempString)
        let desc = response.data.weather[0].description
        if (desc == 'nublado') {
          global.setImage("/images/nublado2.jpg")
        } else if (desc.includes('chuva')) {
          global.setImage("/images/chuva.jpg")
        } else if (desc.includes('nuvens')) {
          global.setImage("/images/nublado2.jpg")
        } else if (desc == 'céu limpo') {
          global.setImage("/images/dia-limpo.jpg")
        } else if (desc == 'névoa') {
          global.setImage("/images/nublado2.jpg")
        }
      })
    }
  }, [global.lon])

  return (
    <div id="weather" style={{ backgroundColor: global.statusTheme == true ? '#010101' : '' }}>
      <div className="container-weather"
        style={{ backgroundImage: global.infos && global.infos.weather[0].description ? `url(${global.image})` : `url(${image404})` }}>
        <h1 className="title-city">
          {global.infos ? global.infos.name + ', ' + global.infos.sys.country : 'Cidade não encontrada'}
          <br />
          {global.infos ? '' : <p>Necessário ativar a localização
            <br />
            Ou faça a busca manualmente.</p>}
        </h1>
        <br />
        <div className="circle">
          <h1 className="title-temp">{global.temp && global.temp.substr(0, 2) + ' °C'} </h1>
          <p className="title-temp">{global.infos && global.infos.weather[0].description}</p>
          <p className="hours">{global.infos ? new Date(global.infos.dt * 1000).toLocaleString().substr(10, 12) : ''}</p>
        </div>
      </div>
    </div>
  )
}

export default GetWeather