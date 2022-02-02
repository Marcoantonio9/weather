/* eslint-disable */
import React, { useContext } from "react";
import './NextDays.css'
import axios from 'axios'
import { GlobalContext } from "../../Context";

const NextDays = () => {
  const global = React.useContext(GlobalContext)
  const urlNextDays = `https://api.openweathermap.org/data/2.5/onecall?lat=${global.lat}&lon=${global.lon}&units=metric&exclude={part}&appid=${process.env.REACT_APP_KEY}&lang=pt_br`
  const [statusLoading, setStatusLoading] = React.useState(true)
  
  React.useEffect(() => {
    if (global.lon != null) {
      axios.get(urlNextDays).then((res) => {
        let arr = []
        let arraySemanal = []
        for (let i = 0; i < 5; i++) {
          arraySemanal.push(res.data.daily[i])
        }
        arr = [...arraySemanal]
        global.setArrNextDays(...global.arrNextDays, arr)
      })
    }
  }, [global.lon])

  React.useEffect(() => {
    setTimeout(() => {
      setStatusLoading(false)
    }, 1000)
  }, [])

  return (
    <div id="container-cards" style={{ backgroundColor: global.statusTheme == true ? '#010101' : '' }}>
      <div className="area-cards">
        {global.arrNextDays.length <= 0 && statusLoading == true &&
          <div className="loading">
            <img src="/images/loading.gif" alt="carregando"></img>
          </div>
        }
        {global.arrNextDays.length > 0 && global.arrNextDays.map((item, i) => (
          <div className="cards" key={i} style={{ backgroundColor: global.statusTheme == true ? '#111' : '', border: 'none' }}>
            <p className="data-title">{new Date(item.dt * 1000).toLocaleString().substr(0, 10)}</p>
            <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}.png`} alt="" />
            <h2>{(item.temp.day).toFixed(0)} °C</h2>
            <h3 className="data-title">{item.weather[0].description}</h3>

            <div className="min_max">
              <p>
                Min: {(item.temp.min).toFixed(0)} °C
              </p>

              <p>
                Max: {(item.temp.max).toFixed(0)} °C
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NextDays